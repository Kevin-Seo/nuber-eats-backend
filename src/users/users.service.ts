import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { User } from "./entities/user.entity";
import { JwtService } from "src/jwt/jwt.service";
import { UserProfileInput, UserProfileOutput } from "./dtos/user-profile.dto";
import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";
import { Verification } from "./entities/verfication.entity";
import { VerifiyEmailOutput } from "./dtos/verify-email.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification) private readonly verifications: Repository<Verification>,
    // private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({email, password, role}: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        return { ok: false, error: 'There is a user with that email already.' };
      }
      const user = await this.users.save(this.users.create({ email, password, role }));
      // create 는 인스턴스만 만들고 DB 에 저장하지는 않는다. save 까지 해야 DB 에 저장된다.

      await this.verifications.save(this.verifications.create({
        // code: 12121212,
        user
      }))

      return { ok: true };
    } catch (e) {
      return { ok: false, error: 'Couldn\'t create account'};
    }
    // hash the password
    
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne({ email }, { select: ['id', 'password']});
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Wrong password',
        };
      }
      console.log(user);
      // const token = jwt.sign({id: user.id}, process.env.SECRET_KEY);
      // const token = jwt.sign({id: user.id, password: user.password}, this.config.get('SECRET_KEY'));
      const token = this.jwtService.sign(user.id);
      console.log(token);
      return {
        ok: true,
        token,
      }
    } catch (error) {
      return {
        ok: false,
        error
      }
    }
  }

  async findById(id: number): Promise<UserProfileOutput> {
    try {
      const user = await this.users.findOne({ id });
      if (user) {
        return {
          ok: true,
          user: user,
        };
      }
    } catch (error) {
      return { ok: false, error: 'User Not Found'}
    }
  }

  async editProfile(userId: number, {email, password}: EditProfileInput): Promise<EditProfileOutput> {
    try {
      const user = await this.users.findOne(userId);
      if (email) {
        user.email = email;
        user.verified = false;
        await this.verifications.save(this.verifications.create({ user }));
      }
      if (password) user.password = password;
      await this.users.save(user);
      return {
        ok: true,
      }
    } catch (error) {
      return { ok: false, error: 'Could not update profile.'};
    }
  }

  async verifyEmail(code: string): Promise<VerifiyEmailOutput> {
    try {
      const verification = await this.verifications.findOne(
        { code },
        { relations: ['user'] }, // User정보를 통째로 가져오기
      );
      if (verification) {
        // console.log(verification);
        verification.user.verified = true;
        console.log(verification.user);
        this.users.save(verification.user);
        return { ok: true };
      } 
      return { ok: false, error: 'Verification not found.' };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
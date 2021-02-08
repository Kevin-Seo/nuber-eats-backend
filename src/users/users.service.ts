import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountInput } from "./dtos/create-account.dto";
import { LoginInput } from "./dtos/login.dto";
import { User } from "./entities/user.entity";
import { JwtService } from "src/jwt/jwt.service";
import { UserProfileInput } from "./dtos/user-profile.dto";
import { EditProfileInput } from "./dtos/edit-profile.dto";
import { Verification } from "./entities/verfication.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification) private readonly verifications: Repository<Verification>,
    // private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({email, password, role}: CreateAccountInput): Promise<{ok: boolean, error?: string}> {
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

  async login({ email, password }: LoginInput): Promise<{ok: boolean, error?: string, token?: string}> {
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

  async findById(id: number): Promise<User> {
    return this.users.findOne({ id });
  }

  async editProfile(userId: number, {email, password}: EditProfileInput): Promise<User> {
    const user = await this.users.findOne(userId);
    if (email) {
      user.email = email;
      user.verified = false;
      await this.verifications.save(this.verifications.create({ user }));
    }
    if (password) user.password = password;
    return this.users.save(user);
  }

  async verifyEmail(code: string): Promise<boolean> {
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
        return true;
      } 
      throw new Error();
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
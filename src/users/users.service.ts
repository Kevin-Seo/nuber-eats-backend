import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountInput } from "./dtos/create-account.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>
  ) {}

  async createAccount({email, password, role}: CreateAccountInput): Promise<{ok: boolean, error?: string}> {
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        return { ok: false, error: 'There is a user with that email already.' };
      }
      await this.users.save(this.users.create({ email, password, role }));
      // create 는 인스턴스만 만들고 DB 에 저장하지는 않는다. save 까지 해야 DB 에 저장된다.
      return { ok: true };
    } catch (e) {
      return { ok: false, error: 'Couldn\'t create account'};
    }
    // hash the password
    
  }
}
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { JwtService } from "src/jwt/jwt.service";
import { MailService } from "src/mail/mail.service";
import { User } from "./entities/user.entity";
import { Verification } from "./entities/verfication.entity";
import { UsersService } from "./users.service";

const mockRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
}

const mockJwtService = {
  sign: jest.fn(),
  verify: jest.fn(),
}

const mockMailService = {
  sendVerificationEmail: jest.fn(),
}

describe('UserService', () => {

  let service: UsersService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [UsersService, {
        // mock 은 가짜라는 의미. Test 에 필요한 가짜 Repository 와 Service 를 만들어서 provide 해준다.
        provide: getRepositoryToken(User),
        useValue: mockRepository,
      }, {
        provide: getRepositoryToken(Verification),
        useValue: mockRepository,
      }, {
        provide: JwtService,
        useValue: mockJwtService,
      }, {
        provide: MailService,
        useValue: mockMailService,
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.todo('createAccount');
  it.todo('login');
  it.todo('findById');
  it.todo('editProfile');
  it.todo('verifyEmail');
})
import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { type } from "os";
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, Column, Entity } from "typeorm";
import * as bcrypt from "bcrypt";
import { InternalServerErrorException } from "@nestjs/common";

// TypeScript Enum 타입 만들기
enum UserRole {
  Client,
  Owner,
  Delivery,
}

// GraphQL 에 Enum 만들기
registerEnumType(UserRole, { name: 'UserRole' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field(type => String)
  email: string;

  @Column()
  @Field(type => String)
  password: string;
  
  @Column(
    { type: 'enum', enum: UserRole }
  )
  @Field(type => UserRole)
  role: UserRole;

  // TypeORM Listener : https://typeorm.io/#/listeners-and-subscribers/beforeinsert
  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
      // 강의에서 npm i @types/bcrypt --dev-only 해주는데, 그걸 해야 vscode 에서 hash 함수 설명(F12)이 뜨는 것 같다.
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
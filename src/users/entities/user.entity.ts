import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from "typeorm";
import * as bcrypt from "bcrypt";
import { InternalServerErrorException } from "@nestjs/common";
import { IsBoolean, IsEmail, IsEnum, IsString } from "class-validator";
import { Restaurant } from "src/restaurants/entities/restaurant.entity";

// TypeScript Enum 타입 만들기
export enum UserRole {
  Client = 'CLIENT',
  Owner = 'OWNER',
  Delivery = 'DELIVERY',
}

// GraphQL 에 Enum 만들기
registerEnumType(UserRole, { name: 'UserRole' });

// InputType과 ObjectType 이 같은 이름을 사용하게 되면 에러가 발생하므로, InputType의 이름을 지정해서 해결해준다.
// 이렇게되면 GraphQL Playground 의 Schema 에 UserInputType, User 가 따로 생기게 된다.
@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column({ unique: true })
  @Field(type => String)
  @IsEmail()
  email: string;

  @Column({ select: false })
  @Field(type => String)
  @IsString()
  password: string;
  
  @Column(
    { type: 'enum', enum: UserRole }
  )
  @Field(type => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @Column({ default: false })
  @Field(type => Boolean)
  @IsBoolean()
  verified: boolean;

  @Field(type => [Restaurant])
  @OneToMany(type => Restaurant, restaurant => restaurant.owner)
  restaurants: Restaurant[];

  // TypeORM Listener : https://typeorm.io/#/listeners-and-subscribers/beforeinsert
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
        // 강의에서 npm i @types/bcrypt --dev-only 해주는데, 그걸 해야 vscode 에서 hash 함수 설명(F12)이 뜨는 것 같다.
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
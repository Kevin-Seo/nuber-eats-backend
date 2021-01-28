import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { type } from "os";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity } from "typeorm";

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
}
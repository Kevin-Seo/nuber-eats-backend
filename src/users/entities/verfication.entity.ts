import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { User } from "./user.entity";

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Verification extends CoreEntity {
  @Column()
  @Field(type => String)
  code: string;

  // OneToOne 은 1:1 관계를 의미한다. 
  // OneToOne Decorator 는 둘 중에 한쪽에 써주면 되고,
  // JoinColumn Decorator 는 접근하는 쪽에 써준다. (이 경우는 Verification 에서 User 에 접근하고자 함.)
  @OneToOne(type => User)
  @JoinColumn()
  user: User;
}
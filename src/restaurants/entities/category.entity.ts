import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString, Length } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Restaurant } from "./restaurant.entity";

@InputType('CategoryInputType', { isAbstract: true })
@ObjectType() // 자동으로 스키마를 빌드하기 위해 사용하는 GraphQL decorator
@Entity() // TypeORM 이 DB 에 아래 내용을 저장하게 해주는 decorator
export class Category extends CoreEntity {
  @Field(type => String) // For GraphQL
  @Column({ unique: true }) // For TypeORM
  @IsString()
  @Length(5)
  name: string;

  @Field(type => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  coverImg: string;

  @Field(type => String)
  @Column({ unique: true })
  @IsString()
  slug: string;

  @Field(type => [Restaurant])
  @OneToMany(type => Restaurant, restaurant => restaurant.category)
  restaurants: Restaurant[];
}

// Ref. https://typeorm.io/#/active-record-data-mapper
// Active Record 와 Data Mapper 패턴 중 Data Mapper를 사용할 것이다.
// 이유는 대용량 앱에 유리하고, TypeORM 과 NestJS 에서 동시에 쓸 수 있고,
// NestJS 에서 Repository(Data Mapper 에서 사용하는 DB 연결고리)를 편리하게 쓸 수 있는 기능이 이미 있고,
// 테스트에도 활용할 수 있기 때문이다.
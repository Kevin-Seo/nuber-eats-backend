import { Field, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsString, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType() // 자동으로 스키마를 빌드하기 위해 사용하는 GraphQL decorator
@Entity() // TypeORM 이 DB 에 아래 내용을 저장하게 해주는 decorator
export class Restaurant {
  @Field(type => Number)
  @PrimaryGeneratedColumn()
  id: Number;

  @Field(type => String) // For GraphQL
  @Column() // For TypeORM
  @IsString()
  @Length(5)
  name: String;

  @Field(type => Boolean)
  @Column()
  @IsBoolean()
  isVegan: Boolean;

  @Field(type => String)
  @Column()
  @IsString()
  address: String;

  @Field(type => String)
  @Column()
  @IsString()
  ownerName: String;

  @Field(type => String)
  @Column()
  @IsString()
  categoryName: String;
}

// Ref. https://typeorm.io/#/active-record-data-mapper
// Active Record 와 Data Mapper 패턴 중 Data Mapper를 사용할 것이다.
// 이유는 대용량 앱에 유리하고, TypeORM 과 NestJS 에서 동시에 쓸 수 있고,
// NestJS 에서 Repository(Data Mapper 에서 사용하는 DB 연결고리)를 편리하게 쓸 수 있는 기능이 이미 있고,
// 테스트에도 활용할 수 있기 때문이다.
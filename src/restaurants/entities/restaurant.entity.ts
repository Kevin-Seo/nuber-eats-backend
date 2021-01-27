import { Field, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType() // 자동으로 스키마를 빌드하기 위해 사용하는 GraphQL decorator
@Entity() // TypeORM 이 DB 에 아래 내용을 저장하게 해주는 decorator
export class Restaurant {
  @Field(type => Number)
  @PrimaryGeneratedColumn()
  id: number;
  // Ref. https://feel5ny.github.io/2017/11/17/Typescript_04/
  // number vs. Number 그리고 string vs. String 등, wrapper class(interface) 와 primitive 타입 구분할 줄 알기
  // typescript 에서는 주로 소문자를 권장한다!

  @Field(type => String) // For GraphQL
  @Column() // For TypeORM
  @IsString()
  @Length(5)
  name: string;

  @Field(type => Boolean, {nullable: true})
  @Column({default: true})
  @IsOptional()
  @IsBoolean()
  isVegan: boolean;

  @Field(type => String, {defaultValue: 'Gangnam'})
  @Column()
  @IsString()
  address: string;
}

// Ref. https://typeorm.io/#/active-record-data-mapper
// Active Record 와 Data Mapper 패턴 중 Data Mapper를 사용할 것이다.
// 이유는 대용량 앱에 유리하고, TypeORM 과 NestJS 에서 동시에 쓸 수 있고,
// NestJS 에서 Repository(Data Mapper 에서 사용하는 DB 연결고리)를 편리하게 쓸 수 있는 기능이 이미 있고,
// 테스트에도 활용할 수 있기 때문이다.
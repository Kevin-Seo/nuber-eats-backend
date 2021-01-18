import { ArgsType, Field } from "@nestjs/graphql";
import { IsBoolean, IsString, Length } from "class-validator";

//@InputType()
@ArgsType()
export class CreateRestaurantDto {
  @Field(_ => String)
  @IsString()
  @Length(5, 10)
  name: String;

  @Field(_ => Boolean)
  @IsBoolean()
  isVegan: Boolean;

  @Field(_ => String)
  @IsString()
  address: String;

  @Field(_ => String)
  @IsString()
  ownersName: String;
}
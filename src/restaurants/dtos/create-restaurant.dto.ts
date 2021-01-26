import { ArgsType, Field, InputType, OmitType } from "@nestjs/graphql";
import { IsBoolean, IsString, Length } from "class-validator";
import { Restaurant } from "../entities/restaurant.entity";

// @ArgsType()
@InputType()
export class CreateRestaurantDto extends OmitType(Restaurant, ['id'], InputType) {} // Restaurant 가 ObjectType 이기 때문에 3번째 파라미터로 InputType을 명시해준다.
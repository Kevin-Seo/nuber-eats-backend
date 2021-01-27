import { ArgsType, Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateRestaurantDto } from "./create-restaurant.dto";

@InputType()
export class UpdateResaurantInputType extends PartialType(CreateRestaurantDto) {}
// PartialType 을 Restaurant로 하지 않고 CreateRestaurantDto 로 하는 이유는 id 가 반드시 필요하기 때문.
// PartialType 은 전부 Optional 인 상태로 Extend 하기 때문에 id 를 필수값으로 설정하지 못한다.

@InputType()
export class UpdateResaurantDto {
  @Field(type => Number)
  id: Number;

  @Field(type => UpdateResaurantInputType)
  data: UpdateResaurantInputType;
}
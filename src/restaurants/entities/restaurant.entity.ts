import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Restaurant {
  @Field(_ => String)
  name: string;

  @Field(_ => Boolean)
  isVegan: Boolean;

  @Field(_ => String)
  address: String;

  @Field(_ => String)
  ownerName: String;
}
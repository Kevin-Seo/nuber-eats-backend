import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { User } from "src/users/entities/user.entity";
import { CreateRestaurantOutput } from "./dtos/create-restaurant.dto";
import { CreateRestaurantInput } from "./dtos/create-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";
import { RestaurantService } from "./restaurants.service";

@Resolver(of => Restaurant) // Graphql 쿼리를 사용하는 Resolver.
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {} // Resolver 는 Service와 연결되어 있고,

  @Mutation(returns => CreateRestaurantOutput)
  async createRestaurant(
    @AuthUser() authUser: User,
    @Args('input') createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    return this.restaurantService.createRestaurant(authUser, createRestaurantInput);
  }
}
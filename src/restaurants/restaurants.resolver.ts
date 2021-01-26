import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";
import { RestaurantService } from "./restaurants.service";

@Resolver(of => Restaurant) // Graphql 쿼리를 사용하는 Resolver.
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {} // Resolver 는 Service와 연결되어 있고,

  @Query(_ => [Restaurant])
  restaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAll(); // 이 Service는 내부에서 DB 에 접근한다.
  }

  @Mutation(_ => Boolean)
  createRestaurant(
    @Args() createRestaurantDto: CreateRestaurantDto,
  ): Boolean {
    console.log(createRestaurantDto)
    return true;
  }
}
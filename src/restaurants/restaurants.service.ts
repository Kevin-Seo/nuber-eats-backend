import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateRestaurantOutput } from "./dtos/create-restaurant.dto";
import { CreateRestaurantInput } from "./dtos/create-restaurant.dto";{}
import { Restaurant } from "./entities/restaurant.entity";

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant) // Restaurant Service 는 Restaurant Entity의 Repository를 inject 하고 있고, ( == "const userRepository = connection.getRepository(User);")
    private readonly restaurants: Repository<Restaurant> // 그 이름은 restaurants 고, class 는 Restaurant Entity를 가진 Repository 이다.
  ) {}

  async createRestaurant(
    owner: User,
    createRestaurantInput: CreateRestaurantInput
  ): Promise<CreateRestaurantOutput> {
    try {
      const newRestaurant = this.restaurants.create(createRestaurantInput);
      await this.restaurants.save(newRestaurant);
      return {
        ok: true,
      }
    } catch {
      return {
        ok: false,
        error: 'Could not craete restaurant',
      }
    }
  }
}
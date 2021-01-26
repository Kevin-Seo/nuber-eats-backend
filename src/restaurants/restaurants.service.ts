import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Restaurant } from "./entities/restaurant.entity";

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant) // Restaurant Entity의 Repository를 inject 하고 있고,
    private readonly restaurants: Repository<Restaurant> // 그 이름은 restaurants 고, class 는 Restaurant Entity를 가진 Repository 이다.
  ) {}
  getAll(): Promise<Restaurant[]> {
    return this.restaurants.find();
  }
}
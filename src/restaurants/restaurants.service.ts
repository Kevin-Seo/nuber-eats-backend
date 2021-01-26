import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Restaurant } from "./entities/restaurant.entity";

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant) // Restaurant Service 는 Restaurant Entity의 Repository를 inject 하고 있고, ( == "const userRepository = connection.getRepository(User);")
    private readonly restaurants: Repository<Restaurant> // 그 이름은 restaurants 고, class 는 Restaurant Entity를 가진 Repository 이다.
  ) {}
  getAll(): Promise<Restaurant[]> {
    return this.restaurants.find(); // 위와 같이 설정하면 restaurants 를 사용해서 모든 repository의 옵션들을 사용할 수 있음.
  }
}
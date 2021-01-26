import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantResolver } from './restaurants.resolver';
import { RestaurantService } from './restaurants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])], // TypeORM을 이용하여 Restaurant Repository를 import
  providers: [RestaurantResolver, RestaurantService],
})
export class RestaurantsModule {}

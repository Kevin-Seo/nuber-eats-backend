import { Module } from '@nestjs/common';
// Joi 는 Javascript 로 이루어진 패키지다. Javascript로 이루어진 패키지를 첨부할때는 아래와 같이 해야한다. (export 되어있지 않아서?)
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { Restaurant } from './restaurants/entities/restaurant.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      })
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: true,
      synchronize: process.env.NODE_ENV !== 'prod', // prod 상태에서는 DB 를 재구성하지 않도록 설정
      entities: [Restaurant]
    }),
    GraphQLModule.forRoot({
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      autoSchemaFile: true,
    }),
    RestaurantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
// AppModule 은 main.ts 로 import 되는 유일한 모듈
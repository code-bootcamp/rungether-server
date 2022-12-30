import { CacheModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./apis/Users/users.module";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { BoardModule } from "./apis/Boards/board.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RegionsModule } from "./apis/Region/regions.module";
import { PrefersModule } from "./apis/Prefers/prefers.module";
import { FilesModule } from "./files/files.module";
import * as redisStore from "cache-manager-redis-store";
import { RedisClientOptions } from "redis";
import { LikesModule } from "./apis/likes/likes.module";
import { AttendsModule } from "./apis/attend/attends.module";

@Module({
  imports: [
    AttendsModule,
    BoardModule,
    FilesModule,
    RegionsModule,
    LikesModule,
    PrefersModule,
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "src/commons/graphql/schema.gql",
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin: ["http://localhost:3000"],
        credentials: true,
        exposedHeaders: ["Set-Cookie", "Cookie"],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: [
          "Access-Control-Allow-Headers",
          "Authorization",
          "X-Requested-With",
          "Content-Type",
          "Accept",
        ],
      },
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as "mysql",
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + "/apis/**/*.entity.*"],
      synchronize: true,
      logging: true,
    }),

    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: "redis://my-redis:6379",
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

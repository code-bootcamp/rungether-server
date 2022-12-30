import { CacheModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./apis/users/users.module";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { BoardModule } from "./apis/boards/board.module";
import { AppController } from "./app.controller";
import { EmailModule } from "./apis/mails/mails.module";
import { RedisClientOptions } from "redis";
import * as redisStore from "cache-manager-redis-store";
import { AppService } from "./app.service";
import { AttendsModule } from "./apis/attend/attends.module";
import { FilesModule } from "./apis/files/files.module";
import { RegionsModule } from "./apis/region/regions.module";
import { PrefersModule } from "./apis/prefers/prefers.module";
import { CommentsModule } from "./apis/comments/comments.module";
import { NestedCommentsModule } from "./apis/nestedComments/nestedComments.module";
import { GradesModule } from "./apis/grade/grades.module";
import { PicksModule } from "./apis/picks/picks.module";

@Module({
  imports: [
    AttendsModule,
    BoardModule,
    CommentsModule,
    NestedCommentsModule,
    EmailModule,
    FilesModule,
    GradesModule,
    PicksModule,
    PrefersModule,
    RegionsModule,
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
      url: "redis://my-redis:6379", // 도커 Redis
      // url: "redis://10.112.81.3:6379", // 쿠버네티스 Redis
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

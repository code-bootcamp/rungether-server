import { CacheModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./apis/users/users.module";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { BoardModule } from "./apis/boards/boards.module";
import { EmailModule } from "./apis/mails/mails.module";
import { RedisClientOptions } from "redis";
import * as redisStore from "cache-manager-redis-store";
import { AppService } from "./app.service";
import { FilesModule } from "./apis/files/files.module";
import { PicksModule } from "./apis/picks/picks.module";
import { AuthModule } from "./apis/auth/auth.module";
import { CommentsModule } from "./apis/comments/comments.module";
import { NestedCommentsModule } from "./apis/nestedComments/nestedComments.module";
import { JwtAccessStrategy } from "./commons/auth/jwt-access.strategy";
import { JwtRefreshStrategy } from "./commons/auth/jwt-refresh.strategy";
import { ReviewBoardsModule } from "./apis/reviewBoards/reviewBoards.module";
import { ReviewCommentsModule } from "./apis/reviewComments/reviewComments.module";
import { LikeModule } from "./apis/like/like.module";
import { AttendListModule } from "./apis/attendList/attendList.module";
import { ReviewsImagesModule } from "./apis/reviewImage/reviewsImages.module";
import { AppController } from "./app.controller";
import { FollowModule } from "./apis/follow/follow.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ReviewNestedCommentsModule } from "./apis/reviewNestedComments/reviewNestedComments.module";
import { ChatModule } from "./gateways/chat.module";
import { ChatHistoryModule } from "./apis/chatHistory/chatHistory.module";

@Module({
  imports: [
    AttendListModule,
    AuthModule,
    BoardModule,
    ChatModule,
    ChatHistoryModule,
    CommentsModule,
    EmailModule,
    FilesModule,
    FollowModule,
    LikeModule,
    NestedCommentsModule,
    ReviewBoardsModule,
    ReviewCommentsModule,
    ReviewNestedCommentsModule,
    ReviewsImagesModule,
    PicksModule,
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "src/commons/graphql/schema.gql",
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin: ["http://localhost:3000", 'https://rungether.shop'],
        credential: true,
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
      timezone: '-09:00',
      synchronize: true,
      logging: true,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: "redis://my-redis:6379", // 도커 Redis
      isGlobal: true,
      // url: "redis://10.112.81.3:6379", // 쿠버네티스/ Redis
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  controllers: [AppController],
  providers: [AppService, JwtAccessStrategy, JwtRefreshStrategy],
})
export class AppModule {}

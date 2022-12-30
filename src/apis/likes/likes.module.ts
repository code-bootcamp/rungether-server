import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "src/apis/boards/entities/board.entity";
import { User } from "src/apis/users/entities/user.entity";
import { Like } from "./entities/like.entity";
import { LikesResolver } from "./likes.resolver";
import { LikesService } from "./likes.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Like, //
      User,
      Board,
    ]),
  ],

  providers: [
    LikesResolver, //
    LikesService,
  ],
})
export class LikesModule {}

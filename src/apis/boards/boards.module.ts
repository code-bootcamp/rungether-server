import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AttendList } from "../attendList/entities/attendList.entity";
import { CommentsService } from "../comments/comments.service";
import { Comment } from "../comments/entity/comment.entity";
import { Image } from "../Image/entities/image.entity";
import { Location } from "../location/entities/location.entity";
import { Pick } from "../picks/entities/pick.entity";
import { PicksService } from "../picks/picks.service";
import { User } from "../users/entities/user.entity";
import { BoardsResolver } from "./boards.resolver";
import { BoardsService } from "./boards.service";
import { Board } from "./entities/board.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Board, //
      Image,
      User,
      Pick,
      Location,
      Comment,
      AttendList,
    ]),
  ],

  providers: [
    BoardsResolver, //
    BoardsService,
    PicksService,
    CommentsService,
  ],
})
export class BoardModule {}

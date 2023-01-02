import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "src/apis/boards/entities/board.entity";
import { User } from "src/apis/users/entities/user.entity";
import { AttendList } from "../attendList/entities/attendList.entity";
import { BoardsService } from "../boards/boards.service";
import { Image } from "../Image/entities/image.entity";
import { Comment } from "../comments/entity/comment.entity";
import { StartingPoint } from "../startingPoint/entities/startingPoint.entity";
import { Pick } from "./entities/pick.entity";
import { PicksResolver } from "./picks.resolver";
import { PicksService } from "./picks.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pick, //
      User,
      Board,
      Image,
      AttendList,
      StartingPoint,
      Comment,
    ]),
  ],

  providers: [
    PicksResolver, //
    PicksService,
    BoardsService,
  ],
})
export class PicksModule {}

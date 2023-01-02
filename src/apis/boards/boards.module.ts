import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardsImagesService } from "../boardsImages/boardsImages.service";
import { BoardImage } from "../boardsImages/entities/boardImage.entity";
import { CommentsService } from "../comments/comments.service";
import { Comment } from "../comments/entity/comment.entity";
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
      BoardImage,
      User,
      Pick,
      Comment,
    ]),
  ],

  providers: [
    BoardsResolver, //
    BoardsService,
    BoardsImagesService,
    PicksService,
    CommentsService,
  ],
})
export class BoardModule {}

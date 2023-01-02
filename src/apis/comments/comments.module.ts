import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "../boards/entities/board.entity";
import { User } from "../users/entities/user.entity";
import { CommentsResolver } from "./comments.resolver";
import { CommentsService } from "./comments.service";
import { Comment } from "./entity/comment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Board])],
  providers: [CommentsResolver, CommentsService],
})
export class CommentsModule {}

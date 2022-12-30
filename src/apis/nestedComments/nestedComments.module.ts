import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "../comments/entity/comment.entity";
import { User } from "../users/entities/user.entity";
import { NestedComment } from "./entity/nestedComment.entity";
import { NestedCommentsResolver } from "./nestedComments.resolver";
import { NestedCommentsService } from "./nestedComments.service";

@Module({
  imports: [TypeOrmModule.forFeature([NestedComment, User, Comment])],
  providers: [NestedCommentsResolver, NestedCommentsService],
})
export class NestedCommentsModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentsResolver } from "./comments.resolver";
import { CommentsService } from "./comments.service";
import { Comment } from "./entity/comment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentsResolver, CommentsService],
})
export class CommentsModule {}

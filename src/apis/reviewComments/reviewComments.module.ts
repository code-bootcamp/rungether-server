import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReviewBoard } from "../reviewBoards/entities/reviewBoard.entity";
import { User } from "../users/entities/user.entity";
import { ReviewComment } from "./entities/reviewComment.entity";
import { ReviewCommentsResolver } from "./reviewComments.resolver";
import { ReviewCommentsService } from "./reviewComments.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, ReviewComment, ReviewBoard])],
  providers: [ReviewCommentsResolver, ReviewCommentsService],
})
export class ReviewCommentsModule {}

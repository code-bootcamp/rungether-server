import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReviewComment } from "../reviewComments/entities/reviewComment.entity";
import { User } from "../users/entities/user.entity";
import { ReviewNestedComment } from "./entities/reviewNestedComments.entity";
import { ReviewNestedCommentsResolver } from "./reviewNestedComments.resolver";
import { ReviewNestedCommentsService } from "./reviewNestedComments.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ReviewNestedComment, ReviewComment]),
  ],
  providers: [ReviewNestedCommentsResolver, ReviewNestedCommentsService],
})
export class ReviewNestedCommentsModule {}

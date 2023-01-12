import { UseGuards } from "@nestjs/common";
import { Args, Context, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { ReviewNestedComment } from "./entities/reviewNestedComments.entity";
import { ReviewNestedCommentsService } from "./reviewNestedComments.service";

@Resolver()
export class ReviewNestedCommentsResolver {
  constructor(
    private readonly reviewNestedCommentsService: ReviewNestedCommentsService
  ) {}

  @Query(() => [ReviewNestedComment])
  fetchReviewNestedComments(
    @Args("reviewCommentId") reviewCommentId: string,
    @Args("page", { nullable: true, type: () => Int }) page: number
  ) {
    return this.reviewNestedCommentsService.findAll({ reviewCommentId, page });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => ReviewNestedComment)
  createReviewNestedComment(
    @Args("reviewCommentId") reviewCommentId: string,
    @Args("reviewNestedComment") reviewNestedComment: string,
    @Context() context: IContext
  ) {
    const user = context.req.user.id;
    return this.reviewNestedCommentsService.create({
      user,
      reviewCommentId,
      reviewNestedComment,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteReviewNestedComment(
    @Context() context: IContext,
    @Args("reviewNestedCommentId") reviewNestedCommentId: string
  ) {
    const user = context.req.user.id;
    return this.reviewNestedCommentsService.delete({
      reviewNestedCommentId,
      user,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => ReviewNestedComment)
  async updateReviewNestedComment(
    @Context() context: IContext,
    @Args("reviewNestedCommentId") reviewNestedCommentId: string,
    @Args("updateReviewNestedComment") updateReviewNestedComment: string
  ) {
    const user = context.req.user.id;

    return this.reviewNestedCommentsService.update({
      reviewNestedCommentId,
      updateReviewNestedComment,
      user,
    });
  }
}

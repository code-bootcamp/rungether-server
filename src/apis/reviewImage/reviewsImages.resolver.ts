import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { ReviewImage } from "./entities/reviewImage.entity";
import { ReviewsImagesService } from "./reviewsImages.service";

@Resolver()
export class ReviewsImagesResolver {
  constructor(
    private readonly reviewsImagesService: ReviewsImagesService //
  ) {}

  @Query(() => [ReviewImage])
  fetchReviewBoardImage(
    @Args("reviewBoardId") reviewBoardId: string //
  ) {
    return this.reviewsImagesService.findOneById({ reviewBoardId });
  }

  @Query(() => [ReviewImage])
  fetchAllReviewBoardImages() {
    return this.reviewsImagesService.findAll();
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteReviewBoardImage(
    @Context() context: IContext, //
    @Args("reviewImageId") reviewImageId: string,
    @Args("reviewBoardId") reviewBoardId: string
  ) {
    const userId = context.req.user.id;
    return this.reviewsImagesService.delete({
      reviewImageId,
      reviewBoardId,
      userId,
    });
  }
}

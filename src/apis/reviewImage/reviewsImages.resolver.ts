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

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => ReviewImage)
  deleteReviewBoardImage(
    @Context() context: IContext, //
    @Args("reviewImageId") reviewImage: string
  ) {}
}

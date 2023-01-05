import { UseGuards } from "@nestjs/common";
import { Args, Context, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { CreateReviewBoardInput } from "./dto/createReviewBoard.input";
import { UpdateReviewBoardInput } from "./dto/updateReviewBoard.input";
import { ReviewBoard } from "./entities/reviewBoard.entity";
import { ReviewBoardsService } from "./reviewBoards.service";

@Resolver()
export class ReviewBoardsResolver {
  constructor(private readonly reviewBoardsService: ReviewBoardsService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => ReviewBoard)
  async createReviewBoard(
    @Context() context: IContext,
    @Args("createReviewBoardInput")
    createReviewBoardInput: CreateReviewBoardInput,
    @Args("attendListId") attendListId: string
  ) {
    const userId = context.req.user.id;
    const result = await this.reviewBoardsService.create({
      userId,
      attendListId,
      createReviewBoardInput,
    });
    return result;
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => ReviewBoard)
  async updateReviewBoard(
    @Context() context: IContext,
    @Args("reviewBoardId") reviewBoardId: string,
    @Args("updateReviewBoardInput")
    updateReviewBoardInput: UpdateReviewBoardInput
  ) {
    const userId = context.req.user.id;

    const result = await this.reviewBoardsService.update({
      reviewBoardId,
      userId,
      updateReviewBoardInput,
    });

    return result;
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteReviewBoard(
    @Args("reviewBoardId") reviewBoardId: string,
    @Context() context: IContext
  ) {
    const userId = context.req.user.id;
    return this.reviewBoardsService.delete({
      userId,
      reviewBoardId,
    });
  }

  @Query(() => ReviewBoard)
  fetchReviewBoard(@Args("reviewBoardId") reviewBoardId: string) {
    return this.reviewBoardsService.findOne({ reviewBoardId });
  }

  @Query(() => [ReviewBoard])
  fetchAllReviewBoards(
    @Args("page", { nullable: true, type: () => Int }) page: number
  ) {
    return this.reviewBoardsService.findAll(page);
  }
}

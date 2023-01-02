import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { CreateReviewBoardInput } from "./dto/createReviewBoard.input";
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
    // @Args({ name: "imgURL", type: () => [String] }) imgURL?: string[]
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
  @Mutation(() => String)
  async deleteReviewBoard(
    @Args("reviewBoardId") reviewBoardId: string,
    @Context() context: IContext
  ) {
    const userId = context.req.user.id;
    return this.reviewBoardsService.delete({ userId, reviewBoardId });
  }

  @Query(() => ReviewBoard)
  fetchReviewBoard(@Args("reviewBoardId") reviewBoardId: string) {
    return this.reviewBoardsService.findOne({ reviewBoardId });
  }
}

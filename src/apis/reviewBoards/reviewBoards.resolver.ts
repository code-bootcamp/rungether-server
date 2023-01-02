import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { CreateBoradInput } from "../boards/dto/createBoard.input";
import { CreateReviewBoardInput } from "./dto/createReviewBoard.input";
import { ReviewBoard } from "./entities/reviewBoard.entity";
import { ReviewBoardsService } from "./reviewBoards.service";

@Resolver()
export class ReviewBoardsResolver {
  constructor(private readonly reviewBoardsService: ReviewBoardsService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async createReviewBoard(
    @Context() context: IContext,
    @Args("createReviewBoardInput")
    createReviewBoardInput: CreateReviewBoardInput
    // @Args("attendId") attendId: string
    // @Args({ name: "imgURL", type: () => [String] }) imgURL?: string[]
  ) {
    const userId = context.req.user.id;

    const result = await this.reviewBoardsService.create({
      userId,
      // attendId,
      createReviewBoardInput,
    });
    return result;
  }

  @Query(() => ReviewBoard)
  fetchReviewBoard(@Args("reviewBoardId") reviewBoardId: string) {
    return this.reviewBoardsService.findOne({ reviewBoardId });
  }
}

import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { BoardsImagesService } from "../boardsImages/boardsImages.service";
import { PicksService } from "../picks/picks.service";
import { BoardsService } from "./boards.service";
import { CreateBoradInput } from "./dto/createBoard.input";
import { UpdateBoardInput } from "./dto/updateBoard.input";
import { Board } from "./entities/board.entity";

@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService, //
    private readonly boardsImageService: BoardsImagesService,
    private readonly picksService: PicksService
  ) {}

  @Query(() => Board)
  fetchBoard(
    @Args("boardId") boardId: string //
  ) {
    return this.boardsService.findOneById({ boardId });
  }

  @Query(() => [Board])
  fetchAllBoards() {
    return this.boardsService.findAll();
  }

  @Query(() => [Board])
  fetchAllBoardsWithDelete() {
    return this.boardsService.findAllBoardsWithDeleted();
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Board)
  async createBoard(
    @Args("createBoardInput") createBoardInpit: CreateBoradInput,
    @Args({ name: "imgUrl", type: () => [String] }) imgUrl: string[],
    @Context() context: IContext
  ) {
    const userId = context.req.user.id;

    const result = await this.boardsService.create({
      userId,
      createBoardInpit,
    });

    const boardId = result.id;
    await this.boardsImageService.upload({ imgUrl, boardId });
    return result;
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Board)
  updateBoard(
    @Args("boardId") boardId: string,
    @Args("updateBoardInput") updateBoardInput: UpdateBoardInput,
    @Args({ name: "imgUrl", type: () => [String] }) imgUrl: string[]
  ) {
    const reuslt = this.boardsService.update({
      boardId,
      updateBoardInput,
    });
    if (imgUrl) {
      this.boardsImageService.upload({ imgUrl, boardId });
    }
    return reuslt;
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteBoard(
    @Args("boardId") boardId: string //
  ) {
    // this.picksService.delete({ boardId });
    return this.boardsService.delete({ boardId });
  }
}

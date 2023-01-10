import { UseGuards } from "@nestjs/common";
import { Args, Context, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type } from "os";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { PicksService } from "../picks/picks.service";
import { BoardsService } from "./boards.service";
import { CreateBoardInput } from "./dto/createBoard.input";
import { UpdateBoardInput } from "./dto/updateBoard.input";
import { Board } from "./entities/board.entity";

@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService, //
    private readonly picksService: PicksService
  ) {}

  @Query(() => Board)
  fetchBoard(
    @Args("boardId") boardId: string //
  ) {
    return this.boardsService.findOneById({ boardId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => Board)
  fetchMyBoard(
    @Context() context: IContext, //
    @Args("boardId") boardId: string
  ) {
    const userId = context.req.user.id;
    return this.boardsService.findMyUserId({ userId, boardId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Board])
  fetchMyAllBoards(
    @Context() context: IContext,
    @Args("page", { nullable: true, type: () => Int }) page: number
  ) {
    const userId = context.req.user.id;
    return this.boardsService.findAllMyUserId({ userId, page });
  }

  @Query(() => [Board])
  fetchAllBoards(
    @Args("page", { nullable: true, type: () => Int }) page: number
  ) {
    return this.boardsService.findAll(page);
  }

  @Query(() => [Board])
  fetchAllBoardsWithPickCount(
    @Args("page", { nullable: true, type: () => Int }) page: number
  ) {
    return this.boardsService.findAllWithPickCount(page);
  }

  @Query(() => [Board])
  fetchAllBoardsWithDelete() {
    return this.boardsService.findAllBoardsWithDeleted();
  }

  @Query(() => [Board])
  serchBoards(
    @Args("word") word: string //
  ) {
    return this.boardsService.serchAllBoards({ word });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Board)
  async createBoard(
    @Context() context: IContext,
    @Args("createBoardInput") createBoardInput: CreateBoardInput
  ) {
    const userId = context.req.user.id;

    const result = await this.boardsService.create({
      userId,
      createBoardInput,
    });

    return result;
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Board)
  async updateBoard(
    @Context() context: IContext,
    @Args("boardId") boardId: string,
    @Args("updateBoardInput") updateBoardInput: UpdateBoardInput
  ) {
    const userId = context.req.user.id;

    const reuslt = await this.boardsService.update({
      boardId,
      userId,
      updateBoardInput,
    });

    return reuslt;
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteBoard(
    @Context() context: IContext, //
    @Args("boardId") boardId: string
  ) {
    const userId = context.req.user.id;
    this.picksService.delete({ boardId, userId });
    return this.boardsService.delete({ userId, boardId });
  }
}

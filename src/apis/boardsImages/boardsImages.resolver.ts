import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { BoardsImagesService } from "./boardsImages.service";
import { BoardImage } from "./entities/boardImage.entity";

@Resolver()
export class BoardsImagesResolver {
  constructor(
    private readonly boardsImagesService: BoardsImagesService //
  ) {}

  @Query(() => [BoardImage])
  fetchBoardImage(
    @Args("boardId") boardId: string //
  ) {
    return this.boardsImagesService.find({ boardId });
  }

  @Query(() => [BoardImage])
  fetchAllBoardImages() {
    return this.boardsImagesService.findAll();
  }

  @Mutation(() => [BoardImage])
  async uploadBoardImage(
    @Args({ name: "imgUrl", type: () => [String] }) imgUrl: string[],
    @Args("boardId") boardId: string
  ) {
    return this.boardsImagesService.upload({ imgUrl, boardId });
  }
}

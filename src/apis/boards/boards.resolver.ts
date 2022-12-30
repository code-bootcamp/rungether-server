import { Query, Resolver } from "@nestjs/graphql";
import { BoardService } from "./boards.service";

@Resolver()
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService, //
    private readonly boardImageService: BoardImageSer
  ) {}

  @Query(() => String)
  getHello() {
    return this.boardService.aaa();
  }
}

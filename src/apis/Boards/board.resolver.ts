import { Query, Resolver } from "@nestjs/graphql";
import { BoardsService } from "./board.service";

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardService: BoardsService) {}

  @Query(() => String)
  getHello() {
    return this.boardService.aaa();
  }
}

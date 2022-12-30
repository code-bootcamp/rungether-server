import { Resolver } from "@nestjs/graphql";
import { BoardsImagesService } from "./boardsImages.service";

@Resolver()
export class BoardsImagesResolver {
  constructor(
    private readonly boardsImagesService: BoardsImagesService //
  ) {}
}

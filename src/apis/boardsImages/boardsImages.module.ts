import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardsImagesResolver } from "./boardsImages.resolver";
import { BoardsImagesService } from "./boardsImages.service";
import { BoardImage } from "./entities/boardImage.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BoardImage])],
  providers: [
    BoardsImagesResolver, //
    BoardsImagesService,
  ],
})
export class BoardsImagesModule {}

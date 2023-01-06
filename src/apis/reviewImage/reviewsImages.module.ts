import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReviewBoard } from "../reviewBoards/entities/reviewBoard.entity";
import { ReviewImage } from "./entities/reviewImage.entity";
import { ReviewsImagesResolver } from "./reviewsImages.resolver";
import { ReviewsImagesService } from "./reviewsImages.service";

@Module({
  imports: [TypeOrmModule.forFeature([ReviewImage, ReviewBoard])],

  providers: [
    ReviewsImagesResolver, //
    ReviewsImagesService,
  ],
})
export class ReviewsImagesModule {}

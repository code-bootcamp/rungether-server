import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ReviewBoard } from "../reviewBoards/entities/reviewBoard.entity";
import { ReviewImage } from "./entities/reviewImage.entity";

@Injectable()
export class ReviewsImagesService {
  constructor(
    @InjectRepository(ReviewBoard)
    private readonly reviewsBoardsRepository: Repository<ReviewBoard>,

    @InjectRepository(ReviewImage)
    private readonly reviewsImagesRepository: Repository<ReviewImage>
  ) {}

  findOneById({ reviewBoardId }) {
    return this.reviewsImagesRepository.find({
      where: { reviewBoard: { id: reviewBoardId } },
      relations: ["reviewBoard"],
    });
  }
}

import { Injectable, UnprocessableEntityException } from "@nestjs/common";
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

  async findAll() {
    return await this.reviewsImagesRepository.find({});
  }

  async delete({ reviewImageId, reviewBoardId, userId }) {
    const Board = await this.reviewsBoardsRepository.findOne({
      where: { id: reviewBoardId },
      relations: ["user"],
    });

    if (userId !== Board.user.id) {
      throw new Error("삭제 권한이 없습니다.");
    }

    const result = await this.reviewsImagesRepository.softDelete({
      id: reviewImageId,
    });

    const resultImage = await this.reviewsImagesRepository.find({
      where: {
        reviewBoard: { id: reviewBoardId },
      },
      relations: ["reviewBoard"],
    });

    for (let i = 0; i < resultImage.length; i++) {
      await this.reviewsImagesRepository.save({
        id: resultImage[i].id,
        imgUrl: resultImage[i].imgUrl,
        isMain: i === 0 ? true : false,
        reviewBoard: {
          ...Board,
        },
      });
    }

    return result.affected ? true : false;
  }
}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { ReviewBoard } from "./entities/reviewBoard.entity";

@Injectable()
export class ReviewBoardsService {
  constructor(
    @InjectRepository(ReviewBoard)
    private readonly reviewBoardsRepository: Repository<ReviewBoard>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  findOne({ reviewBoardId }) {
    return this.reviewBoardsRepository.findOne({
      where: { id: reviewBoardId },
      relations: [
        "user",
        // "attend"
      ],
    });
  }

  async create({
    userId,
    // attendId,
    createReviewBoardInput,
  }) {
    const findReview = await this.reviewBoardsRepository.find({
      where: {
        user: { id: userId },
        // attend: { id: attendId },
      },
      relations: ["user", "attend"],
    });

    if (findReview.length !== 0) {
      throw new Error("이미 리뷰가 존재합니다.");
    }

    const user = await this.reviewBoardsRepository.findOne({
      where: { id: userId },
    });

    const { ...reviewBoard } = createReviewBoardInput;

    this.reviewBoardsRepository.save({
      ...reviewBoard,
      user: { id: userId },
      // attend: { id: attendId },
    });
    return "게시물 등록 완료";
  }
}

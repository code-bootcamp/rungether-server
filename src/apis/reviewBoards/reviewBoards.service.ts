import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AttendList } from "../attendList/entities/attendList.entity";
import { ReviewComment } from "../reviewComments/entities/reviewComment.entity";
import { User } from "../users/entities/user.entity";
import { ReviewBoard } from "./entities/reviewBoard.entity";

@Injectable()
export class ReviewBoardsService {
  constructor(
    @InjectRepository(ReviewBoard)
    private readonly reviewBoardsRepository: Repository<ReviewBoard>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(AttendList)
    private readonly attendListRepository: Repository<AttendList>,

    @InjectRepository(ReviewComment)
    private readonly reviewCommentRepository: Repository<ReviewComment>
  ) {}

  findOne({ reviewBoardId }) {
    return this.reviewBoardsRepository.findOne({
      where: { id: reviewBoardId },
      relations: ["user", "attendList"],
    });
  }

  async create({ userId, attendListId, createReviewBoardInput }) {
    const findReview = await this.reviewBoardsRepository.find({
      where: {
        user: { id: userId },
        attendList: { id: attendListId },
      },
      relations: ["user", "attendList"],
    });

    console.log(findReview);

    if (findReview.length !== 0) throw new Error("이미 리뷰가 존재합니다.");

    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    const attendList = await this.attendListRepository.findOne({
      where: { id: attendListId },
    });

    const result = await this.reviewBoardsRepository.save({
      ...createReviewBoardInput,
      user,
      attendList,
    });
    return result;
  }

  async delete({ userId, reviewBoardId }) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    this.reviewCommentRepository.delete({
      reviewBoard: { id: reviewBoardId },
    });

    const result = await this.reviewBoardsRepository.delete({
      id: reviewBoardId,
    });

    return result.affected ? true : false;
  }
}

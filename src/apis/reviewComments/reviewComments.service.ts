import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ReviewBoard } from "../reviewBoards/entities/reviewBoard.entity";
import { User } from "../users/entities/user.entity";
import { ReviewComment } from "./entities/reviewComment.entity";

@Injectable()
export class ReviewCommentsService {
  constructor(
    @InjectRepository(ReviewComment)
    private readonly reviewCommentRepository: Repository<ReviewComment>,

    @InjectRepository(ReviewBoard)
    private readonly reviewBoardRepository: Repository<ReviewBoard>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll({ reviewBoardId, page }) {
    return await this.reviewCommentRepository.find({
      where: { reviewBoard: { id: reviewBoardId } },
      relations: ["reviewBoard", "user", "user.image"],
      order: { createdAt: "ASC" },
      take: 4,
      skip: page ? (page - 1) * 4 : 0,
    });
  }

  async create({ user, reviewBoardId, reviewComment }) {
    const findId = await this.reviewBoardRepository.findOne({
      where: { id: reviewBoardId },
    });

    const findUser = await this.userRepository.findOne({
      where: { id: user },
    });

    return await this.reviewCommentRepository.save({
      reviewComment,
      reviewBoard: findId,
      user: findUser,
    });
  }

  async delete({ reviewCommentId, user }) {
    const findUser = await this.userRepository.findOne({
      where: { id: user },
    });

    const findReviewComment = await this.reviewCommentRepository.findOne({
      where: { id: reviewCommentId },
      relations: ["user", "reviewBoard"],
    });

    if (findUser.id !== findReviewComment.user.id)
      throw new ConflictException("권한이 없습니다.");

    const result = await this.reviewCommentRepository.softDelete({
      id: reviewCommentId,
    });

    return result.affected ? true : false;
  }

  async update({ reviewCommentId, updateReviewComment, user }) {
    const findUser = await this.userRepository.findOne({
      where: { id: user },
    });

    const findReviewComment = await this.reviewCommentRepository.findOne({
      where: { id: reviewCommentId },
      relations: ["user", "reviewBoard"],
    });

    if (user !== findReviewComment.user.id)
      throw new ConflictException("권한이 없습니다.");

    return await this.reviewCommentRepository.save({
      ...findReviewComment,
      user: findUser,
      reviewComment: updateReviewComment,
    });
  }
}

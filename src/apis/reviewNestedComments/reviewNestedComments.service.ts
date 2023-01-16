import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ReviewComment } from "../reviewComments/entities/reviewComment.entity";
import { User } from "../users/entities/user.entity";
import { ReviewNestedComment } from "./entities/reviewNestedComments.entity";

@Injectable()
export class ReviewNestedCommentsService {
  constructor(
    @InjectRepository(ReviewNestedComment)
    private readonly reviewNestedCommentRepository: Repository<ReviewNestedComment>,

    @InjectRepository(ReviewComment)
    private readonly reviewCommentRepository: Repository<ReviewComment>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll({ reviewCommentId, page }) {
    return await this.reviewNestedCommentRepository.find({
      where: { reviewComment: { id: reviewCommentId } },
      relations: ["reviewComment", "user", "user.image"],
      order: { createAt: "ASC" },
      take: 4,
      skip: page ? (page - 1) * 4 : 0,
    });
  }

  async create({ user, reviewCommentId, reviewNestedComment }) {
    const findId = await this.reviewCommentRepository.findOne({
      where: { id: reviewCommentId },
    });

    const findUser = await this.userRepository.findOne({
      where: { id: user },
    });

    return await this.reviewNestedCommentRepository.save({
      reviewNestedComment,
      reviewComment: findId,
      user: findUser,
    });
  }

  async delete({ reviewNestedCommentId, user }) {
    const findUser = await this.userRepository.findOne({
      where: { id: user },
    });

    const findReviewNestedComment =
      await this.reviewNestedCommentRepository.findOne({
        where: { id: reviewNestedCommentId },
        relations: ["user", "reviewComment"],
      });

    if (findUser.id !== findReviewNestedComment.user.id)
      throw new ConflictException("권한이 없습니다.");

    const result = await this.reviewNestedCommentRepository.softDelete({
      id: reviewNestedCommentId,
    });

    return result.affected ? true : false;
  }

  async update({ reviewNestedCommentId, updateReviewNestedComment, user }) {
    const findUser = await this.userRepository.findOne({
      where: { id: user },
    });

    const findReviewNestedComment =
      await this.reviewNestedCommentRepository.findOne({
        where: { id: reviewNestedCommentId },
        relations: ["user", "reviewComment"],
      });

    if (user !== findReviewNestedComment.user.id)
      throw new ConflictException("권한이 없습니다.");

    return await this.reviewNestedCommentRepository.save({
      ...findReviewNestedComment,
      user: findUser,
      reviewNestedComment: updateReviewNestedComment,
    });
  }
}

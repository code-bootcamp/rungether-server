import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AttendList } from "../attendList/entities/attendList.entity";
import { ReviewComment } from "../reviewComments/entities/reviewComment.entity";
import { ReviewImage } from "../reviewImage/entities/reviewImage.entity";
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
    private readonly reviewCommentRepository: Repository<ReviewComment>,

    @InjectRepository(ReviewImage)
    private readonly reviewImageRepository: Repository<ReviewImage>
  ) {}

  findOne({ reviewBoardId }) {
    return this.reviewBoardsRepository.findOne({
      where: { id: reviewBoardId },
      relations: ["user", "attendList", "reviewImage"],
    });
  }

  findAll(page) {
    return this.reviewBoardsRepository.find({
      relations: ["user", "attendList", "reviewImage"],
      order: { createdAt: "DESC" },
      take: 9,
      skip: page ? (page - 1) * 9 : 0,
    });
  }

  async create({ userId, attendListId, createReviewBoardInput }) {
    const { reviewImage, ...reviewBoard } = createReviewBoardInput;
    console.log(reviewImage);
    const findReview = await this.reviewBoardsRepository.find({
      where: {
        user: { id: userId },
        attendList: { id: attendListId },
      },
      relations: ["user", "attendList"],
    });

    if (findReview.length !== 0) throw new Error("이미 리뷰가 존재합니다.");

    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    const attendList = await this.attendListRepository.findOne({
      where: { id: attendListId },
    });

    if (!reviewImage) {
      throw new UnprocessableEntityException("등록된 이미지가 없습니다.");
    }

    const result = await this.reviewBoardsRepository.save({
      user: { ...user },
      attendList: { ...attendList },
      ...reviewBoard,
    });

    await Promise.all(
      reviewImage.map((el, i) => {
        return new Promise(async (resolve, reject) => {
          try {
            const newImage = await this.reviewImageRepository.save({
              imgUrl: el,
              isMain: i === 0 ? true : false,
              reviewBoard: { ...result },
            });
            resolve(newImage);
          } catch (error) {
            reject(error);
          }
        });
      })
    );

    return result;
  }

  async update({ reviewBoardId, userId, updateReviewBoardInput }) {
    const { reviewImage, ...reviewBoard } = updateReviewBoardInput;

    const findReviewBoard = await this.reviewBoardsRepository.findOne({
      where: { id: reviewBoardId },
      relations: ["user", "reviewImage"],
    });

    if (userId !== findReviewBoard.user.id) {
      throw new ConflictException("수정 권한이 없습니다");
    }

    if (!reviewImage) {
      throw new UnprocessableEntityException(
        "리뷰 게시글에는 최소 하나의 이미지가 필요합니다."
      );
    }

    const result = await this.reviewBoardsRepository.save({
      ...findReviewBoard,
      ...reviewBoard,
    });

    if (reviewImage) {
      await this.reviewImageRepository.delete({
        reviewBoard: { id: reviewBoardId },
      });

      await Promise.all(
        reviewImage.map((el, i) => {
          return new Promise(async (resolve, reject) => {
            try {
              const newImage = await this.reviewImageRepository.save({
                imgUrl: el,
                isMain: i === 0 ? true : false,
                reviewBoard: { ...result },
              });
              resolve(newImage);
            } catch (error) {
              reject(error);
            }
          });
        })
      );
    }

    return result;
  }

  async delete({ userId, reviewBoardId }) {
    const reviewBoard = await this.reviewBoardsRepository.findOne({
      where: { id: reviewBoardId },
      relations: ["user"],
    });

    if (userId !== reviewBoard.user.id) throw new Error("권한이 없습니다.");

    this.reviewImageRepository.delete({
      reviewBoard: { id: reviewBoardId },
    });

    this.reviewCommentRepository.delete({
      reviewBoard: { id: reviewBoardId },
    });

    const result = await this.reviewBoardsRepository.delete({
      id: reviewBoardId,
      user: { id: userId },
    });

    return result.affected ? true : false;
  }
}

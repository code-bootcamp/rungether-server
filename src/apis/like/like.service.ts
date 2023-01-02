import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ReviewBoard } from "../reviewBoards/entities/reviewBoard.entity";
import { User } from "../users/entities/user.entity";
import { Like } from "./entities/like.entity";
@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(ReviewBoard)
    private readonly reviewBoardRepository: Repository<ReviewBoard>,

    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async like({ user, reviewBoardId }) {
    const findUser = await this.userRepository.findOne({
      where: { email: user },
    });

    const findLike = await this.likeRepository.findOne({
      where: { reviewBoard: { id: reviewBoardId }, user: { id: findUser.id } },
      relations: ["reviewBoard", "user"],
    });

    if (findLike) {
      await this.likeRepository.delete({
        reviewBoard: { id: reviewBoardId },
        user: { id: findUser.id },
      });

      const reviewBoard = await this.reviewBoardRepository.findOne({
        where: { id: reviewBoardId },
      });

      await this.reviewBoardRepository.update(
        { id: reviewBoardId },
        { like: reviewBoard.like - 1 }
      );
      return "좋아요 취소";
    } else {
      await this.likeRepository.save({
        reviewBoard: { id: reviewBoardId },
        user: { id: findUser.id },
      });

      const reviewBoard = await this.reviewBoardRepository.findOne({
        where: { id: reviewBoardId },
      });
      await this.reviewBoardRepository.update(
        { id: reviewBoardId },
        { like: reviewBoard.like + 1 }
      );
      return "좋아요 추가";
    }
  }
}

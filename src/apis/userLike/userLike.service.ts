import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { UserLike } from "./entities/userLike.entity";

@Injectable()
export class UserLikeService {
  constructor(
    @InjectRepository(UserLike)
    private readonly userLikeRepository: Repository<UserLike>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async like({ fromUser, userId }) {
    const from = await this.userRepository.findOne({
      where: { id: fromUser },
    });
    console.log("==================");
    console.log("==================");
    console.log(from);
    console.log("==================");
    console.log("==================");

    if (from.id === userId) throw new Error("자추 불가능");

    const findLike = await this.userLikeRepository.findOne({
      where: { user1: { id: from.id }, user2: { id: userId } },
    });

    if (findLike) {
      await this.userLikeRepository.delete({
        user1: { id: from.id },
        user2: { id: userId },
      });

      const toUser = await this.userRepository.findOne({
        where: { id: userId },
      });

      await this.userRepository.update(
        { id: userId },
        { userLikeCount: toUser.userLikeCount - 1 }
      );
      return "좋아요 취소";
    } else {
      await this.userLikeRepository.save({
        user1: { id: from.id },
        user2: { id: userId },
      });

      const toUser = await this.userRepository.findOne({
        where: { id: userId },
      });

      await this.userRepository.update(
        { id: userId },
        { userLikeCount: toUser.userLikeCount + 1 }
      );
      return "좋아요 추가";
    }
  }
}

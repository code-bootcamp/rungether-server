import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FollowCount } from "../followCounts/followCount.entity";
import { User } from "../users/entities/user.entity";
import { Follow } from "./entities/follow.entity";

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,

    @InjectRepository(FollowCount)
    private readonly followCountRepository: Repository<FollowCount>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async follow({ fromUserId, userId }) {
    const followingUserCount = await this.followCountRepository.findOne({
      where: { user: { id: fromUserId } },
    });

    const followerUserCount = await this.followCountRepository.findOne({
      where: { user: { id: userId } },
    });

    const findFollow = await this.followRepository.findOne({
      where: { user1: { id: fromUserId }, user2: { id: userId } },
    });

    if (!findFollow) {
      await this.followRepository.save({
        user1: { id: fromUserId },
        user2: { id: userId },
      });

      if (!followingUserCount) {
        await this.followCountRepository.save({
          user: { id: fromUserId },
        });
      }

      if (!followerUserCount) {
        await this.followCountRepository.save({
          user: { id: userId },
        });
      }
      await this.followCountRepository.update(
        { user: { id: fromUserId } },
        { followCount: +1 }
      );

      await this.followCountRepository.update(
        { user: { id: userId } },
        { followerCount: +1 }
      );
      return "팔로우 완료";
    } else {
      await this.followRepository.delete({
        user1: { id: fromUserId },
        user2: { id: userId },
      });
      await this.followCountRepository.update(
        { user: { id: fromUserId } },
        { followCount: followingUserCount.followCount - 1 }
      );
      await this.followCountRepository.update(
        { user: { id: userId } },
        { followerCount: followerUserCount.followerCount - 1 }
      );
      return "팔로우 취소";
    }
  }

  async findUserFollower({ userId }) {
    const findFollower = await this.followRepository
      .createQueryBuilder("follow")
      .leftJoinAndSelect("follow.user2", "user")
      .where("follow.user2 = :id", { id: userId })
      .getMany();
    return findFollower;
  }

  async findUserFollowing({ userId }) {
    const findUserFollowing = await this.followRepository
      .createQueryBuilder("follow")
      .leftJoinAndSelect("follow.user2", "user")
      .where("follow.user1 = :id", { id: userId })
      .getMany();

    return findUserFollowing;
  }
}

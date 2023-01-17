import { BadRequestException, Injectable } from "@nestjs/common";
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
    if (fromUserId === userId) throw new BadRequestException();

    const existUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!existUser) throw new BadRequestException("존재하지 않는 유저 입니다.");

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

  async findUserFollower({ userId, page }) {
    // const findFollower = await this.followRepository
    //   .createQueryBuilder("follow")
    //   .leftJoinAndSelect("follow.user2", "user")
    //   .where("follow.user2 = :id", { id: userId })
    //   .leftJoinAndSelect('user.image', 'image')
    //   .where('user.image')
    //   .skip((page - 1) * 8)
    //   .take(8)
    //   .getMany();
    const findFollower = await this.followRepository.find({
      where: { user2: { id: userId } },
      relations: ["user1", "user1.image"],
      take: 8,
      skip: page ? (page - 1) * 8 : 0,
    });
    return findFollower;
  }

  async findUserFollowing({ userId, page }) {
    // const findUserFollowing = await this.followRepository
    //   .createQueryBuilder("follow")
    //   .leftJoinAndSelect("follow.user2", "user")
    //   .where("follow.user1 = :id", { id: userId })
    //   .leftJoinAndSelect('user.image', 'image')
    //   .where('user.image')
    //   .skip((page - 1) * 8)
    //   .take(8)
    //   .getMany();
    const findUserFollowing = await this.followRepository.find({
      where: { user1: { id: userId } },
      relations: ["user2", "user2.image"],
      take: 8,
      skip: page ? (page - 1) * 8 : 0,
    });

    return findUserFollowing;
  }

  async findFollowCount({ userId }) {
    const result = await this.followCountRepository.findOne({
      where: { user: { id: userId } },
      relations: ["user"],
    });
    return result;
  }
}

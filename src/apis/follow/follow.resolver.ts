import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { FollowCount } from "../followCounts/followCount.entity";
import { FollowerList } from "./dto/followerList.output";
import { FollowingList } from "./dto/followingList.output";
import { FollowService } from "./follow.service";

@Resolver()
export class FollowResolver {
  constructor(
    private readonly followService: FollowService //
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  followUser(@Context() context: IContext, @Args("userId") userId: string) {
    const fromUserId = context.req.user.id;
    return this.followService.follow({ fromUserId, userId });
  }

  @Query(() => [FollowerList])
  fetchFollower(
    @Args("userId") userId: string //
  ) {
    return this.followService.findUserFollower({ userId });
  }

  @Query(() => [FollowingList])
  fetchFollowing(
    @Args("userId") userId: string //
  ) {
    return this.followService.findUserFollowing({ userId });
  }

  @Query(() => FollowCount)
  fetchFollowCount(
    @Args("userId") userId: string //
  ) {
    return this.followService.findFollowCount({ userId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => FollowCount)
  fetchMyFollowCount(
    @Context() context: IContext //
  ) {
    const userId = context.req.user.id;
    return this.followService.findFollowCount({ userId });
  }
}

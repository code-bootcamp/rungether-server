import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { UserLikeService } from "./userLike.service";

@Resolver()
export class UserLikeResolver {
  constructor(
    private readonly userLikeService: UserLikeService //
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  likeUser(@Context() context: IContext, @Args("userId") userId: string) {
    const fromUser = context.req.user.id;
    return this.userLikeService.like({ fromUser, userId });
  }
}

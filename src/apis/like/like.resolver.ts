import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { LikeService } from "./like.service";

@Resolver()
export class LikeResolver {
  constructor(
    private readonly likeService: LikeService //
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  likeReviewBoard(
    @Context() context: IContext,
    @Args("reviewBoardId") reviewBoardId: string
  ) {
    const user = context.req.user.id;
    return this.likeService.like({ user, reviewBoardId });
  }
}

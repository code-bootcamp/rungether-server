import { UseGuards } from "@nestjs/common";
import { Args, Context, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { NestedComment } from "./entity/nestedComment.entity";
import { NestedCommentsService } from "./nestedComments.service";

@Resolver()
export class NestedCommentsResolver {
  constructor(
    private readonly nestedCommentsService: NestedCommentsService //
  ) {}

  @Query(() => [NestedComment])
  fetchNestedComments(
    @Args("commentId") commentId: string, //
    @Args("page", { nullable: true, type: () => Int }) page: number
  ) {
    return this.nestedCommentsService.findAll({ commentId, page });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => NestedComment)
  createNestedComment(
    @Args("commentId") commentId: string, //
    @Args("nestedComment") nestedComment: string,
    @Context() context: IContext
  ) {
    const user = context.req.user.id;
    return this.nestedCommentsService.create({
      user,
      commentId,
      nestedComment,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteNestedComment(
    @Context() context: IContext,
    @Args("nestedCommentId") nestedCommentId: string
  ) {
    const user = context.req.user.id;
    return this.nestedCommentsService.delete({ nestedCommentId, user });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => NestedComment)
  async updateNestedComment(
    @Context() context: IContext,
    @Args("nestedCommentId") nestedCommentId: string,
    @Args("updateNestedComment") updateNestedComment: string
  ) {
    const user = context.req.user.id;

    return this.nestedCommentsService.update({
      nestedCommentId,
      updateNestedComment,
      user,
    });
  }
}

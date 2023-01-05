import { UseGuards } from "@nestjs/common";
import { Args, Context, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { CommentsService } from "./comments.service";
import { Comment } from "./entity/comment.entity";

@Resolver()
export class CommentsResolver {
  constructor(
    private readonly commentsService: CommentsService //
  ) {}

  @Query(() => [Comment])
  fetchComments(
    @Args("boardId") boardId: string, //
    @Args("page", { nullable: true, type: () => Int }) page: number
  ) {
    return this.commentsService.findAll({ boardId, page });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Comment)
  createComment(
    @Args("boardId") boardId: string, //
    @Args("comment") comment: string,
    @Context() context: IContext
  ) {
    const user = context.req.user.id;
    return this.commentsService.create({
      user,
      boardId,
      comment,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteComment(
    @Context() context: IContext,
    @Args("commentId") commentId: string
  ) {
    const user = context.req.user.id;
    return this.commentsService.delete({ commentId, user });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Comment)
  async updateComment(
    @Context() context: IContext,
    @Args("commentId") commentId: string,
    @Args("updateComment") updateComment: string
  ) {
    const user = context.req.user.id;

    return this.commentsService.update({
      commentId,
      updateComment,
      user,
    });
  }
}

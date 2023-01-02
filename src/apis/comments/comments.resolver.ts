import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { Repository } from "typeorm";
import { CommentsService } from "./comments.service";
import { CreateCommentInput } from "./dto/createComment.input";
import { UpdateCommentInput } from "./dto/updateComment.input";
import { Comment } from "./entity/comment.entity";

@Resolver()
export class CommentsResolver {
  constructor(
    private readonly commentsService: CommentsService,

    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Comment)
  createComment(
    @Context() context: IContext,
    @Args("createCommentInput") createCommentInput: CreateCommentInput
  ) {
    const user = context.req.user.id;
    return this.commentsService.create({ createCommentInput, user });
  }

  @Query(() => Comment)
  fetchComment(@Args("commentId") commentId: string) {
    return this.commentsService.findOne({ id: commentId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteComment(
    @Context() context: IContext,
    @Args("commentId") commentId: string
  ): Promise<boolean> {
    return this.commentsService.delete({ id: commentId, context });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Comment)
  async updateComment(
    @Context() context: IContext,
    @Args("commentId") commentId: string,
    @Args("UpdateCommentInput") updateCommentInput: UpdateCommentInput
  ): Promise<Comment> {
    const user = context.req.user.id;
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });

    return this.commentsService.update({ comment, updateCommentInput, user });
  }
}

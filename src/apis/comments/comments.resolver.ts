import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
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

  @Mutation(() => Comment)
  createComment(
    @Args("createCommentInput") createCommentInput: CreateCommentInput
  ) {
    return this.commentsService.create({ createCommentInput });
  }

  @Query(() => Comment)
  fetchComment(@Args("id") id: string) {
    return this.commentsService.findOne({ id });
  }

  @Mutation(() => Boolean)
  deleteComment(@Args("id") id: string): Promise<boolean> {
    return this.commentsService.delete({ id });
  }

  @Mutation(() => Comment)
  async updateComment(
    @Args("id") id: string,
    @Args("UpdateCommentInput") updateCommentInput: UpdateCommentInput
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id } });

    return this.commentsService.update({ comment, updateCommentInput });
  }
}

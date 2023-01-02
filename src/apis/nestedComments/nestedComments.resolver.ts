import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { Repository } from "typeorm";
import { CreateNestedCommentInput } from "./dto/createNestedComment.input";
import { UpdateNestedCommentInput } from "./dto/updateNestedComment.input";
import { NestedComment } from "./entity/nestedComment.entity";
import { NestedCommentsService } from "./nestedComments.service";

@Resolver()
export class NestedCommentsResolver {
  constructor(
    private readonly nestedCommentsService: NestedCommentsService,

    @InjectRepository(NestedComment)
    private readonly nestedCommentRepository: Repository<NestedComment>
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => NestedComment)
  createNestedComment(
    @Context() context: IContext,
    @Args("createNestedCommentInput")
    createNestedCommentInput: CreateNestedCommentInput
  ) {
    const user = context.req.user.id;
    return this.nestedCommentsService.create({
      createNestedCommentInput,
      user,
    });
  }

  @Query(() => NestedComment)
  fetchNestedComment(@Args("nestedCommentId") nestedCommentId: string) {
    return this.nestedCommentsService.findOne({ nestedCommentId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteNestedComment(
    @Context() context: IContext,
    @Args("nestedCommentId") nestedCommentId: string
  ): Promise<boolean> {
    const user = context.req.user.id;
    return this.nestedCommentsService.delete({ nestedCommentId, user });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => NestedComment)
  async updateNestedComment(
    @Context() context: IContext,
    @Args("nestedCommentId") nestedCommentId: string,
    @Args("UpdateNestedCommentInput")
    updateNestedCommentInput: UpdateNestedCommentInput
  ): Promise<NestedComment> {
    const user = context.req.user.id;

    return this.nestedCommentsService.update({
      nestedCommentId,
      updateNestedCommentInput,
      user,
    });
  }
}

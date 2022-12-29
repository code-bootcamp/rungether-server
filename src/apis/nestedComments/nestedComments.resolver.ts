import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateNestedCommentInput } from "./dto/createNestedComment.input";
import { UpdateNestedCommentInput } from "./dto/updateNestedComment.input";
import { NestedComment } from "./entity/nestedComments.entity";
import { NestedCommentsService } from "./nestedComments.service";

@Resolver()
export class NestedCommentsResolver {
  constructor(
    private readonly nestedCommentsService: NestedCommentsService,

    @InjectRepository(NestedComment)
    private readonly nestedCommentRepository: Repository<NestedComment>
  ) {}

  @Mutation(() => NestedComment)
  createNestedComment(
    @Args("createNestedCommentInput")
    createNestedCommentInput: CreateNestedCommentInput
  ) {
    return this.nestedCommentsService.create({ createNestedCommentInput });
  }

  @Query(() => NestedComment)
  fetchNestedComment(@Args("id") id: string) {
    return this.nestedCommentsService.findOne({ id });
  }

  @Mutation(() => Boolean)
  deleteNestedComment(@Args("id") id: string): Promise<boolean> {
    return this.nestedCommentsService.delete({ id });
  }

  @Mutation(() => NestedComment)
  async updateNestedComment(
    @Args("id") id: string,
    @Args("UpdateNestedCommentInput")
    updateNestedCommentInput: UpdateNestedCommentInput
  ): Promise<NestedComment> {
    const nestedComment = await this.nestedCommentRepository.findOne({
      where: { id },
    });
    return this.nestedCommentsService.update({
      nestedComment,
      updateNestedCommentInput,
    });
  }
}

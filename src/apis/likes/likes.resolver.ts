import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { IContext } from "src/commons/type/context";
import { LikesService } from "./likes.service";

@Resolver()
export class LikesResolver {
  constructor(
    private readonly likesService: LikesService //
  ) {}

  @Mutation(() => String)
  likeBoard(
    @Args("boardId") boardId: string, //
    @Context() context: IContext
  ) {
    const user = context.req.user.email;
    return this.likesService.like({ boardId, user });
  }
}

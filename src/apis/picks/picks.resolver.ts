import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { Pick } from "./entities/pick.entity";
import { PicksService } from "./picks.service";

@Resolver()
export class PicksResolver {
  constructor(
    private readonly picksService: PicksService //
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Pick])
  fetchMyPick(@Context() context: IContext) {
    const userId = context.req.user.id;
    return this.picksService.find({ userId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  pickBoard(
    @Args("boardId") boardId: string, //
    @Context() context: IContext
  ) {
    const userId = context.req.user.id;
    return this.picksService.pick({ boardId, userId });
  }
}

import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { IContext } from "src/commons/type/context";
import { PicksService } from "./picks.service";

@Resolver()
export class PicksResolver {
  constructor(
    private readonly picksService: PicksService //
  ) {}

  @Mutation(() => String)
  pickBoard(
    @Args("boardId") boardId: string, //
    @Context() context: IContext
  ) {
    const user = context.req.user.email;
    return this.picksService.pick({ boardId, user });
  }
}

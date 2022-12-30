import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { IContext } from "src/commons/type/context";
import { AttendsService } from "./attends.service";

@Resolver()
export class AttendsResolver {
  constructor(
    private readonly attendsService: AttendsService //
  ) {}

  @Mutation(() => String)
  attendBoard(
    @Args("boardId") boardId: string, //
    @Context() context: IContext
  ) {
    const user = context.req.user.email;
    return this.attendsService.attend({ boardId, user });
  }
}

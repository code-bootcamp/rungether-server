import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { Repository } from "typeorm";
import { Board } from "../boards/entities/board.entity";
import { User } from "../users/entities/user.entity";
import { AttendListService } from "./attendList.service";
import { AttendList } from "./entities/attendList.entity";

@Resolver()
export class AttendListResolver {
  constructor(private readonly attendListService: AttendListService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async attendList(
    @Context() context: IContext,
    @Args("boardId") boardId: string
  ) {
    return this.attendListService.enterAttendList({ context, boardId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [AttendList])
  fetchAttendList(@Context() context: IContext) {
    const userId = context.req.user.id;
    return this.attendListService.findAll({ userId });
  }
}
//푸쉬용

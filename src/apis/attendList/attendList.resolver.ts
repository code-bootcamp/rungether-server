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
  constructor(
    private readonly attendListService: AttendListService,

    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async attendList(
    @Context() context: IContext,
    @Args("boardId") boardId: string
  ) {
    const userId = context.req.user.id;
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    const board = await this.boardRepository.findOne({
      where: { id: boardId },
      relations: ["user"],
    });

    const checkDuplicate = await this.attendListService.findUserList({
      userId,
      boardId,
    });

    if (checkDuplicate.length !== 0) {
      await this.boardRepository.update(
        { id: boardId },
        { attendCount: board.attendCount - 1 }
      );
      await this.attendListService.delete({ user, board });
      return "참가 취소";
    }

    await this.boardRepository.update(
      { id: boardId },
      { attendCount: board.attendCount + 1 }
    );

    this.attendListService.create({ user, board });

    return "참가 완료";
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [AttendList])
  fetchAttendList(@Context() context: IContext) {
    const userId = context.req.user.id;
    return this.attendListService.findAll({ userId });
  }
}
//푸쉬용

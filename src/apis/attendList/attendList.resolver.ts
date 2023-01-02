import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { Repository } from "typeorm";
import { Board } from "../boards/entities/board.entity";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";
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
  @Mutation(() => AttendList)
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
      throw new Error("이미 신청한 게시글 입니다.");
    }

    await this.boardRepository.update(
      { id: boardId },
      { attendCount: board.attendCount + 1 }
    );

    return this.attendListService.create({ user, board });
  }

  @Query(() => AttendList)
  fetchAttendList(@Args("boardId") boardId: string) {
    return this.attendListService.findOne({ boardId });
  }
}
//푸쉬용

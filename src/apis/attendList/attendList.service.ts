import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Board } from "../boards/entities/board.entity";
import { User } from "../users/entities/user.entity";
import { AttendList } from "./entities/attendList.entity";

@Injectable()
export class AttendListService {
  constructor(
    @InjectRepository(AttendList)
    private readonly attendListRepository: Repository<AttendList>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>
  ) {}

  async enterAttendList({ context, boardId }) {
    const userId = context.req.user.id;
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    const board = await this.boardRepository.findOne({
      where: { id: boardId },
      relations: ["user"],
    });

    if (board.user.id === userId) throw new BadRequestException();

    const checkDuplicate = await this.attendListRepository.find({
      where: {
        board: { id: boardId },
        user: { id: userId },
      },
    });

    if (checkDuplicate.length !== 0) {
      await this.boardRepository.update(
        { id: boardId },
        { attendCount: board.attendCount - 1 }
      );
      await this.attendListRepository.delete({ user, board });
      return "참가 취소";
    }

    await this.boardRepository.update(
      { id: boardId },
      { attendCount: board.attendCount + 1 }
    );

    this.attendListRepository.save({
      board: boardId,
      user: userId,
    });

    return "참가 완료";
  }

  async create({ user, board }) {
    return await this.attendListRepository.save({
      user,
      board,
    });
  }

  async delete({ user, board }) {
    return await this.attendListRepository.delete({
      user,
      board,
    });
  }

  async findUserList({ userId, boardId }) {
    return await this.attendListRepository.find({
      where: {
        board: { id: boardId },
        user: { id: userId },
      },
    });
  }

  async findAll({ userId }) {
    const result = await this.attendListRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "board"],
    });

    console.log(result);

    return result;
  }
}

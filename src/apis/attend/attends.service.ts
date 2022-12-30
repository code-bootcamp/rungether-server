import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "src/apis/boards/entities/board.entity";
import { User } from "src/apis/users/entities/user.entity";
import { Repository } from "typeorm";
import { Attend } from "./entities/attend.entity";

@Injectable()
export class AttendsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Attend)
    private readonly attendsRepository: Repository<Attend>
  ) {}

  async attend({ boardId, user }) {
    const findUser = await this.usersRepository.findOne({
      where: { email: user },
    });

    const findAttend = await this.attendsRepository.findOne({
      where: {
        board: { id: boardId },
        user: { id: findUser.id },
      },
      relations: ["board", "user"],
    });

    if (findAttend) {
      await this.attendsRepository.delete({
        board: { id: boardId },
        user: { id: findUser.id },
      });

      const findBoard = await this.boardsRepository.findOne({
        where: { id: boardId },
      });

      await this.boardsRepository.update(
        { id: boardId },
        { attend: findBoard.attend - 1 }
      );

      return "참가 취소";
    } else {
      await this.attendsRepository.save({
        board: { id: boardId },
        user: { id: findUser.id },
      });

      const findBoard = await this.boardsRepository.findOne({
        where: { id: boardId },
      });

      await this.boardsRepository.update(
        { id: boardId },
        { attend: findBoard.attend + 1 }
      );

      return "참가 등록";
    }
  }
}

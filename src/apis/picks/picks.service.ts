import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "src/apis/boards/entities/board.entity";
import { User } from "src/apis/users/entities/user.entity";
import { Repository } from "typeorm";
import { Pick } from "./entities/pick.entity";

@Injectable()
export class PicksService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Pick)
    private readonly picksRepository: Repository<Pick>
  ) {}

  async pick({ boardId, user }) {
    const findUser = await this.usersRepository.findOne({
      where: { email: user },
    });

    const findPick = await this.picksRepository.findOne({
      where: {
        board: { id: boardId },
        user: { id: findUser.id },
      },
      relations: ["board", "user"],
    });

    if (findPick) {
      await this.picksRepository.delete({
        board: { id: boardId },
        user: { id: findUser.id },
      });

      const board = await this.boardsRepository.findOne({
        where: { id: boardId },
      });

      await this.boardsRepository.update(
        { id: boardId },
        { pick: board.pick - 1 }
      );

      return "찜 취소";
    } else {
      await this.picksRepository.save({
        board: { id: boardId },
        user: { id: findUser.id },
      });

      const boards = await this.boardsRepository.findOne({
        where: { id: boardId },
      });

      await this.boardsRepository.update(
        { id: boardId },
        { pick: boards.pick + 1 }
      );

      return "찜 추가";
    }
  }
}

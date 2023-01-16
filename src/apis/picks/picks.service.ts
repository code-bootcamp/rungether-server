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

  async find({ userId, page }) {
    const result = await this.picksRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "board", "user.image", 'board.user.image'],
      order: { createdAt: "DESC" },
      take: 5,
      skip: page ? (page - 1) * 5 : 0,
    });
    return result;
  }

  async pick({ boardId, userId }) {
    const findUser = await this.usersRepository.findOne({
      where: { id: userId },
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
        { pickCount: board.pickCount - 1 }
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
        { pickCount: boards.pickCount + 1 }
      );

      return "찜 추가";
    }
  }

  async delete({ boardId, userId }) {
    return await this.picksRepository.delete({
      board: boardId,
      user: userId,
    });
  }
}

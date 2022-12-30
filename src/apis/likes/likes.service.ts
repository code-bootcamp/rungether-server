import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "src/apis/Boards/entities/board.entity";
import { User } from "src/apis/Users/entities/user.entity";
import { Repository } from "typeorm";
import { Like } from "./entities/like.entity";

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Like)
    private readonly likesRepository: Repository<Like>
  ) {}

  async like({ boardId, user }) {
    const findUser = await this.usersRepository.findOne({
      where: { email: user },
    });

    const findLike = await this.likesRepository.findOne({
      where: {
        board: { id: boardId },
        user: { id: findUser.id },
      },
      relations: ["board", "user"],
    });

    if (findLike) {
      await this.likesRepository.delete({
        board: { id: boardId },
        user: { id: findUser.id },
      });

      const board = await this.boardsRepository.findOne({
        where: { id: boardId },
      });

      await this.boardsRepository.update(
        { id: boardId },
        { like: board.like - 1 }
      );

      return "좋아요 취소";
    } else {
      await this.likesRepository.save({
        board: { id: boardId },
        user: { id: findUser.id },
      });

      const boards = await this.boardsRepository.findOne({
        where: { id: boardId },
      });

      await this.boardsRepository.update(
        { id: boardId },
        { like: boards.like + 1 }
      );

      return "좋아요 추가";
    }
  }
}

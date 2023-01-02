import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { throws } from "assert";
import { Repository } from "typeorm";
import { BoardImage } from "../boardsImages/entities/boardImage.entity";
import { Comment } from "../comments/entity/comment.entity";
import { Pick } from "../picks/entities/pick.entity";
import { User } from "../users/entities/user.entity";
import { Board } from "./entities/board.entity";

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(BoardImage)
    private readonly boardsImagesRepository: Repository<BoardImage>,

    @InjectRepository(Pick)
    private readonly picksRepository: Repository<Pick>,

    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>
  ) {}

  findOneById({ boardId }) {
    return this.boardsRepository.findOne({
      where: { id: boardId },
      relations: ["user"],
    });
  }

  findAllByUserId({ userId }) {
    return this.boardsRepository.find({
      where: { user: { id: userId } },
    });
  }

  findAll() {
    return this.boardsRepository.find({
      relations: ["user"],
    });
  }

  findAllBoardsWithDeleted() {
    return this.boardsRepository.find({
      withDeleted: true,
      relations: ["user"],
    });
  }

  async create({ userId, createBoardInpit }) {
    const { ...board } = createBoardInpit;

    const checkCountBoard = await this.findAllByUserId({ userId });
    if (checkCountBoard.length >= 5) {
      throw new Error("게시글은 5개까지만 작성 가능합니다.");
    }

    const result = await this.boardsRepository.save({
      ...board,
      user: { id: userId },
    });

    return result;
  }

  async update({ boardId, updateBoardInput }) {
    const board = await this.findOneById({ boardId });
    return this.boardsRepository.save({
      ...board,
      id: boardId,
      ...updateBoardInput,
    });
  }

  async delete({ boardId }) {
    const result = await this.boardsRepository.softDelete({
      id: boardId,
    });

    this.commentsRepository.softDelete({ board: { id: boardId } });

    this.boardsImagesRepository.softDelete({
      board: { id: boardId },
    });

    this.boardsImagesRepository.softDelete({ board: boardId });
    return result.affected ? true : false;
  }
}

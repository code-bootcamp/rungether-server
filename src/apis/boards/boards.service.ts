import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Image } from "../Image/entities/image.entity";
import { User } from "../users/entities/user.entity";
import { Board } from "./entities/board.entity";

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,

    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  findOneById({ boardId }) {
    return this.boardsRepository.findOne({
      where: { id: boardId },
      relations: ["user", "image"],
    });
  }

  findAllByUserId({ userId }) {
    return this.boardsRepository.find({
      where: { user: { id: userId } },
    });
  }

  findAll(page) {
    return this.boardsRepository.find({
      relations: ["user", "image"],
      order: { createdAt: "DESC" },
      take: 9,
      skip: page ? (page - 1) * 9 : 0,
    });
  }

  findAllWhitPickCount(page) {
    return this.boardsRepository.find({
      relations: ["user", "image"],
      order: { pickCount: "DESC" },
      take: 9,
      skip: page ? (page - 1) * 9 : 0,
    });
  }

  findAllBoardsWithDeleted() {
    return this.boardsRepository.find({
      withDeleted: true,
      relations: ["user"],
    });
  }

  async serchAllBoards({ word }) {
    return await this.boardsRepository.findBy({
      title: Like(`%${word}%`),
    });
  }

  async create({ userId, createBoardInput }) {
    const { image, ...board } = createBoardInput;

    const User = await this.usersRepository.findOne({
      where: { id: userId },
    });

    let Image = null;

    if (image) {
      Image = await this.imagesRepository.save({
        ...image,
      });
    }

    const checkCountBoard = await this.findAllByUserId({ userId });
    if (checkCountBoard.length >= 20) {
      throw new Error("게시글은 20개까지만 작성 가능합니다.");
    }

    const result = await this.boardsRepository.save({
      ...board,
      image: Image,
      user: { ...User },
    });

    return result;
  }

  async update({ boardId, userId, updateBoardInput }) {
    const { image, ...board } = updateBoardInput;

    const Board = await this.findOneById({ boardId });

    const Image = await this.imagesRepository.save({
      ...image,
    });

    const User = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!Board) {
      throw new UnprocessableEntityException("존재하지 않는 게시글 입니다!");
    }

    if (userId !== Board.user.id) {
      throw new UnprocessableEntityException("게시글 수정 권한이 없습니다!");
    }

    return this.boardsRepository.save({
      ...Board,
      ...updateBoardInput,
      image: Image,
      id: boardId,
      user: { ...User },
    });
  }

  async delete({ boardId, userId }) {
    const User = await this.usersRepository.findOne({
      where: { id: userId },
    });

    const Board = await this.boardsRepository.findOne({
      where: { id: boardId },
      relations: ["user"],
    });

    if (userId !== Board.user.id) {
      throw new UnprocessableEntityException("삭제 권한이 없습니다!");
    }

    const result = await this.boardsRepository.softDelete({
      id: boardId,
      user: { id: userId },
    });

    return result.affected ? true : false;
  }
}

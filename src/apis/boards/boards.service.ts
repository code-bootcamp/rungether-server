import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { title } from "process";
import { Like, Repository } from "typeorm";
import { AttendList } from "../attendList/entities/attendList.entity";
import { Image } from "../Image/entities/image.entity";
import { Location } from "../location/entities/location.entity";
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
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Location)
    private readonly locationsRepository: Repository<Location> // @InjectRepository(AttendList) // private readonly attendListRepository: Repository<AttendList>
  ) {}

  async findOneById({ boardId }) {
    const boardUser = await this.boardsRepository.findOne({
      where: { id: boardId },
      relations: [
        "user",
        "image",
        "location",
        "attendList",
        "attendList.user",
        "attendList.user.image",
        "user.image",
      ],
    });

    return boardUser;
  }

  findAllByUserId({ userId }) {
    return this.boardsRepository.find({
      where: { user: { id: userId } },
    });
  }

  async findMyUserId({ userId, boardId }) {
    const result = await this.boardsRepository.findOne({
      where: {
        id: boardId,
        user: { id: userId },
      },
      relations: ["user"],
    });

    return result;
  }

  findAllMyUserId({ userId, page }) {
    return this.boardsRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "image", "location", "attendList", "attendList.user"],
      order: { createdAt: "DESC" },
      take: 5,
      skip: page ? (page - 1) * 5 : 0,
    });
  }

  findAll(page) {
    return this.boardsRepository.find({
      relations: ["user", "image", "location", "user.image"],
      order: { createdAt: "DESC" },
      take: 8,
      skip: page ? (page - 1) * 8 : 0,
    });
  }

  findAllWithPickCount(page) {
    return this.boardsRepository.find({
      relations: ["user", "image", "location"],
      order: { pickCount: "DESC" },
      take: 8,
      skip: page ? (page - 1) * 8 : 0,
    });
  }

  findAllBoardsWithDeleted() {
    return this.boardsRepository.find({
      withDeleted: true,
      relations: ["user"],
    });
  }

  async searchAllBoards({ word, page }) {
    const findBoard = await this.boardsRepository.find({
      where: { title: Like(`%${word}%`) },
      relations: ["user", "user.image", "image"],
      order: { createdAt: "DESC" },
      take: 8,
      skip: page ? (page - 1) * 8 : 0,
    });

    return findBoard;
  }

  async create({ userId, createBoardInput }) {
    const { image, location, ...board } = createBoardInput;

    const User = await this.usersRepository.findOne({
      where: { id: userId },
    });

    let Image = null;

    if (image) {
      Image = await this.imagesRepository.save({
        imgUrl: image,
      });
    }

    if (!location) {
      throw new UnprocessableEntityException("?????? ????????? ??????????????????");
    }

    const Location = await this.locationsRepository.save({
      ...location,
    });

    const checkCountBoard = await this.findAllByUserId({ userId });
    if (checkCountBoard.length >= 20) {
      throw new Error("???????????? 20???????????? ?????? ???????????????.");
    }

    const result = await this.boardsRepository.save({
      ...board,
      location: Location,
      image: Image,
      user: { ...User },
    });

    return result;
  }

  async update({ boardId, userId, updateBoardInput }) {
    const { image, location, ...board } = updateBoardInput;

    const findUser = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ["image"],
    });

    const findBoard = await this.boardsRepository.findOne({
      where: { id: boardId },
      relations: ["user", "image", "location"],
    });

    if (userId !== findBoard.user.id) {
      throw new ConflictException("?????? ????????? ????????????.");
    }

    let Location = {};

    if (location) {
      await this.locationsRepository.softDelete({ id: findBoard.location.id });
      Location = await this.locationsRepository.save({ ...location });
    }

    let Image = {};

    if (image) {
      await this.imagesRepository.softDelete({ id: findBoard.image.id });
      Image = await this.imagesRepository.save({ imgUrl: image });
    }

    return await this.boardsRepository.save({
      ...findBoard,
      ...board,
      user: findUser,
      location: { ...Location },
      image: { ...Image },
    });
  }

  async delete({ boardId, userId }) {
    const Board = await this.boardsRepository.findOne({
      where: { id: boardId },
      relations: ["user", "image", "location"],
    });

    console.log("????????? ???????????????", Board);

    if (userId !== Board.user.id) {
      throw new UnprocessableEntityException("?????? ????????? ????????????!");
    }

    await this.boardsRepository.save({
      id: boardId,
      image: null,
      location: null,
    });

    await this.imagesRepository.delete({ id: Board.image.id });

    await this.locationsRepository.delete({ id: Board.location.id });

    const result = await this.boardsRepository.delete({
      id: boardId,
      user: { id: userId },
    });

    return result.affected ? true : false;
  }
}

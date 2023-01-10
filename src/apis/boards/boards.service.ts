import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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
    private readonly locationsRepository: Repository<Location>
  ) // @InjectRepository(AttendList)
  // private readonly attendListRepository: Repository<AttendList>
  {}

  findOneById({ boardId }) {
    return this.boardsRepository.findOne({
      where: { id: boardId },
      relations: ["user", "image", "location", "attendList", "attendList.user"],
    });
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

  // //보드수정
  // async findMyUserIdWithAttendListId({ userId, boardId, attendListId }) {
  //   const result = await this.boardsRepository.findOne({
  //     where: {
  //       id: boardId,
  //       user: { id: userId },
  //     },
  //     relations: ["user"],
  //   });
  //   const result2 = await this.attendListRepository.findOne({
  //     where: {
  //       board: { id: result.id },
  //     },
  //     relations: ["board"],
  //   });
  //   return result2;
  // }
  // //보드수정

  findAllMyUserId({ userId, page }) {
    return this.boardsRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "image", "location"],
      order: { createdAt: "DESC" },
      take: 5,
      skip: page ? (page - 1) * 5 : 0,
    });
  }

  findAll(page) {
    return this.boardsRepository.find({
      relations: ["user", "image", "location"],
      order: { createdAt: "DESC" },
      take: 9,
      skip: page ? (page - 1) * 9 : 0,
    });
  }

  findAllWithPickCount(page) {
    return this.boardsRepository.find({
      relations: ["user", "image", "location"],
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
      throw new UnprocessableEntityException("위치 정보를 지정해주세요");
    }

    const Location = await this.locationsRepository.save({
      ...location,
    });

    const checkCountBoard = await this.findAllByUserId({ userId });
    if (checkCountBoard.length >= 20) {
      throw new Error("게시글은 20개까지만 작성 가능합니다.");
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
      throw new ConflictException("수정 권한이 없습니다.");
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

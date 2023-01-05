import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Board } from "../boards/entities/board.entity";
import { User } from "../users/entities/user.entity";
import { Comment } from "./entity/comment.entity";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>
  ) {}

  async findAll({ boardId, page }) {
    return await this.commentRepository.find({
      where: { board: { id: boardId } },
      relations: ["board", "user"],
      order: { createdAt: "ASC" },
      take: 9,
      skip: page ? (page - 1) * 9 : 0,
    });
  }

  async create({ user, boardId, comment }) {
    const findId = await this.boardRepository.findOne({
      where: { id: boardId },
    });

    const findUser = await this.userRepository.findOne({
      where: { id: user },
    });

    return await this.commentRepository.save({
      comment,
      board: findId,
      user: findUser,
    });
  }

  async delete({ commentId, user }) {
    const findUser = await this.userRepository.findOne({
      where: { id: user },
    });

    const findComment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ["user", "board"],
    });

    if (findUser.id !== findComment.user.id)
      throw new ConflictException("권한이 없습니다.");

    const result = await this.commentRepository.softDelete({
      id: commentId,
    });
    return result.affected ? true : false;
  }

  async update({ commentId, updateComment, user }) {
    const findUser = await this.userRepository.findOne({
      where: { id: user },
    });

    const findComment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ["user", "board"],
    });

    if (user !== findComment.user.id)
      throw new ConflictException("권한이 없습니다.");

    return await this.commentRepository.save({
      ...findComment,
      user: findUser,
      comment: updateComment,
    });
  }
}

import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Board } from "../boards/entities/board.entity";
import { User } from "../users/entities/user.entity";
import { Comment } from "./entity/comment.entity";
import {
  ICommentServiceDelete,
  ICommentServiceUpdate,
  ICreateCommentInput,
} from "./interface/comment.service.interface";

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

  async create({ createCommentInput, user }: ICreateCommentInput) {
    const { boardId, content } = createCommentInput;
    const findUser = await this.userRepository.findOne({ where: { id: user } });
    const findBoard = await this.boardRepository.findOne({
      where: { id: boardId },
    });

    const result = await this.commentRepository.save({
      content,
      user: findUser,
      board: findBoard,
    });

    return result;
  }

  findOne({ commentId }) {
    return this.commentRepository.findOne({
      where: { id: commentId },
      relations: ["user", "board"],
    });
  }

  async delete({ commentId, user }: ICommentServiceDelete): Promise<boolean> {
    const findUser = await this.userRepository.findOne({
      where: { id: user },
    });

    const findComment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ["user", "board"],
    });

    if (findUser.id !== findComment.user.id)
      throw new ConflictException("권한이 없습니다.");

    const result = await this.commentRepository.softDelete({ id: commentId });

    return result.affected ? true : false;
  }

  async update({
    commentId,
    updateCommentInput,
    user,
  }: ICommentServiceUpdate): Promise<Comment> {
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
      ...updateCommentInput,
    });
  }
}

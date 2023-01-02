import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "../comments/entity/comment.entity";
import { User } from "../users/entities/user.entity";
import { NestedComment } from "./entity/nestedComment.entity";
import {
  ICreateNestedCommentInput,
  INestedCommentServiceDelete,
  INestedCommentServiceUpdate,
} from "./interface/nestedComment.service.interface";

@Injectable()
export class NestedCommentsService {
  constructor(
    @InjectRepository(NestedComment)
    private readonly nestedCommentRepository: Repository<NestedComment>,

    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create({ createNestedCommentInput, user }: ICreateNestedCommentInput) {
    const { commentId, content } = createNestedCommentInput;
    const findComment = await this.commentRepository.findOne({
      where: { id: commentId },
    });
    const findUser = await this.userRepository.findOne({
      where: { id: user },
    });
    const result = await this.nestedCommentRepository.save({
      content,
      user: findUser,
      comment: findComment,
    });
    return result;
  }

  findOne({ nestedCommentId }) {
    return this.commentRepository.findOne({
      where: { id: nestedCommentId },
      relations: ["user", "comment"],
    });
  }

  async delete({
    nestedCommentId,
    user,
  }: INestedCommentServiceDelete): Promise<boolean> {
    const findUser = await this.userRepository.findOne({
      where: { id: user },
    });

    const findNestedComment = await this.nestedCommentRepository.findOne({
      where: { id: nestedCommentId },
      relations: ["user", "comment"],
    });

    if (findUser.id !== findNestedComment.user.id)
      throw new ConflictException("권한이 없습니다.");

    const result = await this.nestedCommentRepository.softDelete({
      id: nestedCommentId,
    });

    return result.affected ? true : false;
  }

  async update({
    nestedCommentId,
    updateNestedCommentInput,
    user,
  }: INestedCommentServiceUpdate): Promise<NestedComment> {
    const findUser = await this.nestedCommentRepository.findOne({
      where: { id: user },
    });
    const findNestedComment = await this.nestedCommentRepository.findOne({
      where: { id: nestedCommentId },
      relations: ["user", "comment"],
    });

    if (user !== findNestedComment.user.id)
      throw new ConflictException("권한이 없습니다.");

    return await this.nestedCommentRepository.save({
      ...findNestedComment,
      user: findUser,
      ...updateNestedCommentInput,
    });
  }
}

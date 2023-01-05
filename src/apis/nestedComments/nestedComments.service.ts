import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "../comments/entity/comment.entity";
import { User } from "../users/entities/user.entity";
import { NestedComment } from "./entity/nestedComment.entity";

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

  async findAll({ commentId, page }) {
    return await this.nestedCommentRepository.find({
      where: { comment: { id: commentId } },
      relations: ["board", "user"],
      order: { createdAt: "ASC" },
      take: 9,
      skip: page ? (page - 1) * 9 : 0,
    });
  }

  async create({ user, commentId, nestedComment }) {
    const findId = await this.commentRepository.findOne({
      where: { id: commentId },
    });

    const findUser = await this.userRepository.findOne({
      where: { id: user },
    });

    return await this.nestedCommentRepository.save({
      nestedComment,
      comment: findId,
      user: findUser,
    });
  }

  async delete({ nestedCommentId, user }) {
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

  async update({ nestedCommentId, updateNestedComment, user }) {
    const findUser = await this.userRepository.findOne({
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
      comment: updateNestedComment,
    });
  }
}

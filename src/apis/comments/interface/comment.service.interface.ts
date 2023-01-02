import { IContext } from "src/commons/type/context";
import { CreateCommentInput } from "../dto/createComment.input";
import { UpdateCommentInput } from "../dto/updateComment.input";
import { Comment } from "../entity/comment.entity";

export interface ICreateCommentInput {
  createCommentInput: CreateCommentInput;
  user: string;
}

export interface ICommentServiceFindOne {
  id: string;
}

export interface ICommentServiceDelete {
  id: string;
  context: IContext;
}
export interface ICommentServiceUpdate {
  commentId: Comment;
  updateCommentInput: UpdateCommentInput;
  user: string;
}

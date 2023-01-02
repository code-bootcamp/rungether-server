import { IContext } from "src/commons/type/context";
import { CreateCommentInput } from "../dto/createComment.input";
import { UpdateCommentInput } from "../dto/updateComment.input";

export interface ICreateCommentInput {
  createCommentInput: CreateCommentInput;
  user: string;
}

export interface ICommentServiceDelete {
  commentId: string;
  user: string;
}
export interface ICommentServiceUpdate {
  commentId: string;
  updateCommentInput: UpdateCommentInput;
  user: string;
}

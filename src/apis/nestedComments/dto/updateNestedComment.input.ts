import { InputType, PartialType } from "@nestjs/graphql";
import { CreateNestedCommentInput } from "./createNestedComment.input";

@InputType()
export class UpdateNestedCommentInput extends PartialType(
  CreateNestedCommentInput
) {}

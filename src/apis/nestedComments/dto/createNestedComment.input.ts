import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateNestedCommentInput {
  @Field(() => String)
  commentId: string;

  @Field(() => String)
  content: string;
}

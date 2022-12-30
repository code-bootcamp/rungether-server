import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateNestedCommentInput {
  @Field(() => String)
  content: string;

  @Field(() => String)
  commentId: string;

  @Field(() => String)
  userId: string;
}

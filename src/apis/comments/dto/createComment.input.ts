import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  content: string;
}

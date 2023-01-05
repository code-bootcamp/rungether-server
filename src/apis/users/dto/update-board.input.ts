import { Field, InputType, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  nickname: string;

  @Field({ nullable: true })
  age: string;

  @Field({ nullable: true })
  gender: string;

  @Field(() => String, { nullable: true })
  image: string;

  @Field({ nullable: true })
  region: string;

  @Field({ nullable: true })
  prefer: string;

  @Field({ nullable: true })
  grade: string;
}

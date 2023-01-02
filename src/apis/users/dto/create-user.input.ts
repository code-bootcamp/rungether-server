import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  nickname: string;

  @Field()
  password: string;

  @Field()
  age: string;

  @Field()
  gender: string;

  @Field({ nullable: true })
  profileUrl: string;

  @Field()
  region: string;

  @Field()
  prefer: string;

  @Field()
  grade: string;
}

import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  nickName: string;

  @Field()
  password: string;

  @Field()
  region: string;

  @Field()
  level: string;

  @Field()
  gender: string;

  @Field()
  age: string;
}

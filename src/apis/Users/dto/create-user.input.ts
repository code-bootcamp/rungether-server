import { Field, InputType } from "@nestjs/graphql";
import { Prefer } from "src/apis/Prefers/entities/prefer.entity";

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  nickName: string;

  @Field()
  password: string;

  @Field()
  rePassword: string;

  @Field()
  region: string;

  @Field()
  level: string;

  @Field()
  gender: string;

  @Field()
  age: string;
}

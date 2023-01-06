import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "src/apis/users/entities/user.entity";

@ObjectType()
export class BoardAndUser {
  @Field(() => String)
  title: string;

  @Field(() => String)
  date: string;

  @Field(() => String)
  dateTime: string;

  @Field(() => String)
  address: string;

  @Field(() => String)
  addressDetail: string;

  @Field(() => Int)
  dues: number;

  @Field(() => String)
  description: string;

  @Field(() => String)
  gender: string;

  @Field(() => Int)
  recruitPeople: number;

  @Field(() => String)
  thumbnail: string;

  @Field(() => User)
  user: User;

  @Field(() => [User])
  pickUsers: User[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  deletedAt: Date;
}

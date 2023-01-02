import { Field, ObjectType } from "@nestjs/graphql";
import { BoardAndUser } from "src/apis/boards/dto/boardAndUser.output";
import { User } from "src/apis/users/entities/user.entity";

@ObjectType()
export class PicksWithBoard {
  @Field(() => String)
  id: string;

  @Field(() => User)
  user: User;

  @Field(() => BoardAndUser)
  board: BoardAndUser;
}

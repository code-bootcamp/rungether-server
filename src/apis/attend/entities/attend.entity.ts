import { Field, ObjectType } from "@nestjs/graphql";
import { Board } from "src/apis/Boards/entities/board.entity";
import { User } from "src/apis/Users/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Attend {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @ManyToOne(() => Board)
  @Field(() => Board)
  board: Board;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}

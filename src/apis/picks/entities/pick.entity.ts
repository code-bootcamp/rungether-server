import { Field, ObjectType } from "@nestjs/graphql";
import { Board } from "src/apis/boards/entities/board.entity";
import { User } from "src/apis/users/entities/user.entity";
import {
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class Pick {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @ManyToOne(() => Board)
  @Field(() => Board)
  board: Board;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @DeleteDateColumn()
  deletedAt: Date;
}

import { Field, ObjectType } from "@nestjs/graphql";
import { Board } from "src/apis/boards/entities/board.entity";
import { ReviewBoard } from "src/apis/reviewBoards/entities/reviewBoard.entity";
import { User } from "src/apis/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class AttendList {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @JoinTable()
  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinTable()
  @ManyToOne(() => Board)
  @Field(() => Board)
  board: Board;

  @JoinColumn()
  @OneToOne(() => ReviewBoard)
  reviewBoard: ReviewBoard;

  // @Column()
  // @Field(() => String)
  // status: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}

import { Field, ObjectType } from "@nestjs/graphql";
import { ReviewBoard } from "src/apis/reviewBoards/entities/reviewBoard.entity";
import { User } from "src/apis/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Like {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Field(() => User)
  @ManyToOne(() => User)
  user: User;

  @Field(() => ReviewBoard)
  @ManyToOne(() => ReviewBoard)
  reviewBoard: ReviewBoard;
}

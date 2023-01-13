import { Field, ObjectType } from "@nestjs/graphql";
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ReviewBoard } from "src/apis/reviewBoards/entities/reviewBoard.entity";

@Entity()
@ObjectType()
export class ReviewImage {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  imgUrl: string;

  @Column()
  @Field(() => Boolean)
  isMain: boolean;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;

  @ManyToOne(() => ReviewBoard, { onDelete: "CASCADE" })
  @Field(() => ReviewBoard)
  reviewBoard: ReviewBoard;
}

import { Field, ObjectType } from "@nestjs/graphql";
import { ReviewBoard } from "src/apis/reviewBoards/entities/reviewBoard.entity";
import { ReviewNestedComment } from "src/apis/reviewNestedComments/entities/reviewNestedComments.entity";
import { User } from "src/apis/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class ReviewComment {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column({ type: "varchar", length: 255 })
  @Field(() => String)
  reviewComment: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @ManyToOne(() => ReviewBoard, { onDelete: "CASCADE" })
  @Field(() => ReviewBoard)
  reviewBoard: ReviewBoard;

  @JoinColumn()
  @OneToMany(
    () => ReviewNestedComment,
    (reviewNestedComment) => reviewNestedComment.reviewComment,
    { cascade: true }
  )
  reviewNestedComment: ReviewNestedComment;
}

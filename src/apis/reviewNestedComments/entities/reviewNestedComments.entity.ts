import { Field, ObjectType } from "@nestjs/graphql";
import { ReviewComment } from "src/apis/reviewComments/entities/reviewComment.entity";
import { User } from "src/apis/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class ReviewNestedComment {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column({ type: "varchar", length: 255 })
  @Field(() => String)
  reviewNestedComment: string;

  @CreateDateColumn()
  @Field(() => Date)
  createAt: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @ManyToOne(() => ReviewComment, { onDelete: "CASCADE" })
  @Field(() => ReviewComment)
  reviewComment: ReviewComment;
}

import { Field, ObjectType } from "@nestjs/graphql";
import { Comment } from "src/apis/comments/entity/comment.entity";
import { User } from "src/apis/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class NestedComment {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  content: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;

  @JoinTable()
  @ManyToOne(() => Comment)
  @Field(() => Comment)
  comment: Comment;

  @JoinTable()
  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}

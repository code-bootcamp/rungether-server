import { Field, Int, ObjectType } from "@nestjs/graphql";
import { AttendList } from "src/apis/attendList/entities/attendList.entity";
import { Like } from "src/apis/like/entities/like.entity";
import { ReviewComment } from "src/apis/reviewComments/entities/reviewComment.entity";
import { ReviewImage } from "src/apis/reviewImage/entities/reviewImage.entity";
import { User } from "src/apis/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class ReviewBoard {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column("text")
  @Field(() => String)
  content: string;

  @Column({ default: 0 })
  @Field(() => Int)
  likeCount: number;

  @JoinTable()
  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinTable()
  @ManyToOne(() => AttendList, { onDelete: "CASCADE" })
  attendList: AttendList;

  @JoinColumn()
  @OneToMany(() => ReviewImage, (reviewImage) => reviewImage.reviewBoard, {
    cascade: true,
  })
  reviewImage: ReviewImage[];

  @JoinColumn()
  @OneToMany(
    () => ReviewComment,
    (reviewComment) => reviewComment.reviewBoard,
    {
      cascade: true,
    }
  )
  reviewComment: ReviewComment;

  @OneToMany(() => Like, (like) => like.reviewBoard, { cascade: true })
  @Field(() => [Like])
  like: Like[];

  @Column()
  @Field(() => String)
  thumbnail: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;
}

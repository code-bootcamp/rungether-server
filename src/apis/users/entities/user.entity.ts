import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Board } from "src/apis/boards/entities/board.entity";
import { Image } from "src/apis/Image/entities/image.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column({ unique: true })
  @Field()
  nickname: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  @Field()
  age: string;

  @Column({ nullable: true })
  @Field()
  gender: string;

  @Column({ nullable: true })
  @Field()
  region: string;

  @Column({ nullable: true })
  @Field()
  prefer: string;

  @Column({ nullable: true })
  @Field()
  grade: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @JoinColumn()
  @Field(() => Image, { nullable: true })
  @OneToOne(() => Image, { nullable: true })
  image: Image;
}

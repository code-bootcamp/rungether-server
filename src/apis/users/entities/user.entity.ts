import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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

  @Column()
  password: string;

  @Column()
  @Field()
  age: string;

  @Column()
  @Field()
  gender: string;

  @Column({ nullable: true })
  @Field()
  profileUrl: string;

  @Column()
  @Field()
  region: string;

  @Column()
  @Field()
  prefer: string;

  @Column()
  @Field()
  grade: string;

  @Column({ default: 0 })
  @Field(() => Int)
  friendshipCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

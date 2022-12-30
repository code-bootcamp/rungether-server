import { Field, ObjectType } from "@nestjs/graphql";
import { Board } from "src/apis/boards/entities/board.entity";
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class BoardImage {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String, { nullable: true })
  image_url: string;

  @Column()
  @Field(() => Boolean)
  isMain: boolean;

  @ManyToOne(() => Board)
  @Field(() => Board)
  board: Board;

  @DeleteDateColumn()
  deletedAt: Date;
}

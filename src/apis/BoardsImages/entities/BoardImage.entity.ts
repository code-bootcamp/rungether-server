import { Field, ObjectType } from "@nestjs/graphql";
import { Board } from "src/apis/Boards/entities/board.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class BoardImage {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  image_url: string;

  @Column()
  @Field(() => Boolean)
  isMain: boolean;

  @ManyToOne(() => Board)
  @Field(() => Board)
  board: Board;
}

import { Field, ObjectType } from "@nestjs/graphql";
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Location {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column({ type: "text" })
  @Field(() => String)
  center: string;

  @Column({ type: "text" })
  @Field(() => String)
  path: string;

  @DeleteDateColumn()
  deletedAt: Date;
}

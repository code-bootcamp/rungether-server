import { Field, Float, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Coordinate {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column({ type: "decimal", precision: 9, scale: 6 })
  @Field(() => Float)
  latitude: number;

  @Column({ type: "decimal", precision: 9, scale: 6 })
  @Field(() => Float)
  longitude: number;
}

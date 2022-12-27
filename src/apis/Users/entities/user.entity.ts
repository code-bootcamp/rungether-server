import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Prefer } from "src/apis/Prefers/entities/prefer.entity";
import { Column, Entity, JoinTable, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  nickName: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field()
  region: string;

  @Column({ default: 0 })
  @Field(() => Int)
  like: number;

  @Column()
  @Field()
  gender: string;

  @Column()
  @Field()
  age: string;
}

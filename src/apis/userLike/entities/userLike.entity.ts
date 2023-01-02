import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/apis/users/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class UserLike {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Field(() => User)
  @ManyToOne(() => User)
  user1: User;

  @Field(() => User)
  @ManyToOne(() => User)
  user2: User;
}

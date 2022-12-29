import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/apis/Users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Friendship {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  email: string;

  @Field(() => User)
  @ManyToOne(() => User)
  user: User;
}

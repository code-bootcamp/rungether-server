import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/apis/Users/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Prefer {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  // @Column()
  // @Field(() => [User])
  // users: User[];
}

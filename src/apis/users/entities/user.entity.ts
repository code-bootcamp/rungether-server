import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Image } from "src/apis/Image/entities/image.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
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

  @Column()
  password: string;

  @Column()
  @Field()
  age: string;

  @Column()
  @Field()
  gender: string;

  @Column()
  @Field()
  region: string;

  @Column()
  @Field()
  prefer: string;

  @Column()
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

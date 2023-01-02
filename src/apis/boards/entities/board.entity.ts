import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Image } from "src/apis/Image/entities/image.entity";
import { User } from "src/apis/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  content: string;

  @Column({ default: 1 })
  @Field(() => Int)
  attendCount: number;

  @Column({ default: 0 })
  @Field(() => Int)
  pickCount: number;

  @Column()
  @Field(() => String)
  appointment: string;

  @Column()
  @Field(() => String)
  recruitRegion: string;

  @Column()
  @Field(() => String)
  recruitGrade: string;

  @Column()
  @Field(() => String)
  recruitSports: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;

  @JoinTable()
  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinColumn()
  @Field(() => Image, { nullable: true })
  @OneToOne(() => Image, { nullable: true })
  image: Image;
}

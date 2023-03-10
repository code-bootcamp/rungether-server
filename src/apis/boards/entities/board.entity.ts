import { Field, Int, ObjectType } from "@nestjs/graphql";
import { AttendList } from "src/apis/attendList/entities/attendList.entity";
import { Image } from "src/apis/Image/entities/image.entity";
import { Location } from "src/apis/location/entities/location.entity";
import { Pick } from "src/apis/picks/entities/pick.entity";
import { User } from "src/apis/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
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

  @Column()
  @Field(() => Int)
  recruitPeople: number;

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

  @JoinColumn()
  @Field(() => Location, { nullable: true })
  @OneToOne(() => Location, { nullable: true })
  location: Location;

  @OneToMany(() => AttendList, (attendList) => attendList.board, {
    cascade: true,
  })
  @Field(() => [AttendList])
  attendList: AttendList[];

  @OneToMany(() => Pick, (pick) => pick.board, { cascade: true })
  @Field(() => [Pick])
  pick: Pick[];
}

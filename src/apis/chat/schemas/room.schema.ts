import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ChatRoomDocument = ChatRoom & Document;

@Schema()
@ObjectType()
export class ChatRoom {
  @Prop()
  @Field(() => String)
  roomName: string;

  @Prop()
  @Field(() => String)
  roomId: string;

  @Prop()
  @Field(() => String)
  userId: string;

  @Prop()
  @Field(() => String)
  userName: string;

  @Prop({ default: false })
  @Field(() => Boolean)
  isHost: boolean;

  @Prop()
  @Field(() => Date)
  createdAt: Date;
}

export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);

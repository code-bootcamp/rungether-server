import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ChatUserDocument = ChatUser & Document;

@Schema()
export class ChatUser {
  @Prop()
  socketId: string;

  @Prop()
  id: string;

  @Prop()
  name: string;
}

export const ChatUserSchema = SchemaFactory.createForClass(ChatUser);

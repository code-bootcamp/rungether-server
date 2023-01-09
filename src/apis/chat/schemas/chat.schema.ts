import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ChatLogDocument = ChatLog & Document;

@Schema()
export class ChatLog {
  @Prop()
  roomId: string;

  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  chat: string;

  @Prop()
  createdAt: Date;
}

export const ChatLogSchema = SchemaFactory.createForClass(ChatLog);

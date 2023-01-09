import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { ChatLog, ChatLogDocument } from "./schemas/chat.schema";
import { ChatRoom, ChatRoomDocument } from "./schemas/room.schema";
import { ChatUser, ChatUserDocument } from "./schemas/user.schema";

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(ChatRoom.name)
    private readonly chatRoomModel: mongoose.Model<ChatRoomDocument>,

    @InjectModel(ChatLog.name)
    private readonly chatLogModel: mongoose.Model<ChatLogDocument>,

    @InjectModel(ChatUser.name)
    private readonly chatUserModel: mongoose.Model<ChatUserDocument>
  ) {}

  async fetchMyRoom({ userId }) {
    return await this.chatRoomModel.find({ userId });
  }

  async fetchRooms() {
    return await this.chatRoomModel.find({ isHost: true });
  }

  async fetchRoomChatUsers({ roomId }) {
    return await this.chatRoomModel.find({ roomId });
  }

  async fetchRoomLog({ roomId, userId }) {
    const user = await this.chatRoomModel.findOne({ roomId });
    if (user === null) {
      return null;
    }
    return await this.chatLogModel
      .find({ roomId, created: { $gt: user.createdAt } })
      .sort({ created: -1 });
  }

  async createRoom({ roomId, userId, roomName, userName }) {
    const result = await this.chatRoomModel.create({
      roomId,
      userId,
      userName,
      roomName,
      isHost: true,
      createdAt: new Date(),
    });
    return result;
  }

  async saveLog({ roomId, id, name, chat }) {
    const createdChat = new this.chatLogModel({
      roomId,
      id,
      name,
      chat,
      created: new Date(),
    });
    return await createdChat.save();
  }

  async isUserInRoom({ roomId, userId }) {
    const user = await this.chatRoomModel.findOne({ roomId, userId });
    console.log(user);
    if (!user) {
      return false;
    }
    return true;
  }

  async createUserAtRoom({ roomId, userId, roomName, userName }) {
    const result = await this.chatRoomModel.create({
      roomId,
      userId,
      userName,
      roomName,
      created: new Date(),
    });
    console.log(result);
    return result;
  }

  async deleteUser({ roomId, userId }) {
    return await this.chatRoomModel.deleteOne({ roomId, userId });
  }

  async updateSocketId({ socketId, id, name }) {
    const user = await this.chatUserModel.findOne({ id });
    if (user) {
      return await this.chatUserModel.updateOne({ id }, { $set: { socketId } });
    }
    const createdUser = new this.chatUserModel({
      socketId,
      id,
      name,
    });

    const result = await createdUser.save();
    return result;
  }
}

import mongoose, { Document, Schema, Types } from 'mongoose';

// Interface for Room (Discussion)
export interface IRoom {
    courseId: string; // Store course ID as string (from course service)
    participantIds: string[]; // Array of user IDs as strings (from user service)
    lastMessage: Types.ObjectId | string; // Last message sent
    lastMessageTime: Date; // Time when the last message was sent
  }
  

export interface IRoomDocument extends IRoom, Document {}

// Schema for Room
const roomSchema: Schema = new Schema({
    courseId: {
      type: String,
      required: true,
    },
    participantIds: [{
      type: String,
      required: true,
    }],
    lastMessage:  {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Message' 
    },
    lastMessageTime: {
      type: Date,
      default: Date.now,
    },
  }, {
    timestamps: true,
  });
  
  export const Room = mongoose.model<IRoomDocument>('Room', roomSchema);
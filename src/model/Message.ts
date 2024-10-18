import mongoose, { Document, Schema, Types } from 'mongoose';

// Interface for Message
export interface IMessage {
  roomId: Types.ObjectId; 
  userId: Types.ObjectId; 
  content: string; 
  createdAt: Date; 
}

export interface IMessageDocument extends IMessage, Document {}

// Schema for Message with ref to Room
const messageSchema: Schema = new Schema({
  roomId: {
    type: Schema.Types.ObjectId,
    ref: 'Room', // Reference to the Room collection
    required: true,
  },
  userId: {
    type: String,
    required: true, 
    
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

export const Message = mongoose.model<IMessageDocument>('Message', messageSchema);

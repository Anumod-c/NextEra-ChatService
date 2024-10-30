import { Message } from '../../model/Message'

import { Room } from '../../model/Room'


import { IRoom } from '../../model/Room'
import { IMessage } from '../../model/Message'
import { ChatMessage } from '../../interface/chatController';

export class ChatRepository {
    async createRoom(UserId: string, courseId: string) {
        try {


            // Step 1: Check if a room for this course already exists
            const existingRoom = await Room.findOne({ courseId });

            if (existingRoom) {
                console.log(`Room for course ${courseId} already exists.`);

                // Step 2: Check if the user is already in the room (in the participantIds array)
                if (!existingRoom.participantIds.includes(UserId)) {
                    // Step 3: Add the user to the room if they aren't already present
                    existingRoom.participantIds.push(UserId);
                    await existingRoom.save();
                    console.log(`User ${UserId} added to the room for course ${courseId}.`);
                    return { success: true, message: "userId added to the room", existingRoom }
                } else {
                    console.log(`User ${UserId} is already in the room for course ${courseId}.`);
                    return { success: false, message: "User alredy exist in room" }
                }
            } else {
                // Step 4: If the room doesn't exist, create a new one
                const newRoom = new Room({
                    courseId: courseId,
                    participantIds: [UserId],  // Add the user to the new room
                });

                await newRoom.save();
                console.log(`New room created for course ${courseId}, and user ${UserId} added.`);
                return { succes: true, message: "Room created and   added the userId" }
            }
        } catch (error) {
            console.error(`Error in creating or updating room for course ${courseId}:`, error);
            throw error;
        }
    }

    async saveMessage(message: ChatMessage) {
        try {
            console.log(message);
            const newMessage = new Message({
                roomId: message.courseId,  // Reference to Room's courseId
                userId: message.userId,
                content: message.text,
            });
            const savedMessage = await newMessage.save();
            console.log('savedMessages',savedMessage._id)
            // Update the Room with the last message reference (ObjectId) and timestamp

            await Room.findOneAndUpdate(
                { courseId: message.courseId },
                {
                    lastMessage: savedMessage._id, // Store ObjectId of the last message
                    lastMessageTime: new Date()
                },
                { new: true }
            );
            console.log('Message saved to DB successfully:', savedMessage);
            return {success:true, message:'Chat saved successfully'}
        } catch (error) {
            console.log("Error in saving  the message in  room db", error)
            return {success:false,message:"Error in saving chat to db"}
        }
    }
    async saveImageMessage(message: ChatMessage) {
        try {
            console.log(message);
            const newMessage = new Message({
                roomId: message.courseId,  // Reference to Room's courseId
                userId: message.userId,
                image: message.image,
            });
            const savedMessage = await newMessage.save();
            console.log('savedMessages',savedMessage._id)
            // Update the Room with the last message reference (ObjectId) and timestamp

            await Room.findOneAndUpdate(
                { courseId: message.courseId },
                {
                    lastMessage: savedMessage._id, // Store ObjectId of the last message
                    lastMessageTime: new Date()
                },
                { new: true }
            );
            console.log('Message saved to DB successfully:', savedMessage);
            return {success:true, message:'Chat saved successfully'}
        } catch (error) {
            console.log("Error in saving  the message in  room db", error)
            return {success:false,message:"Error in saving chat to db"}
        }
    }
    async loadPreviousMessages(courseId:string){
        try {
            // Fetch messages from DB where courseId matches
            const result =  await Message.find({ roomId:courseId }).sort({ createdAt: 1 }).lean();
            if(!result){
                return {success:false, message:"Start sharing your doubnt here"};
            }
            console.log('result',result)
            return {success:true,message:"Successfully fetched the messages",result}
        } catch (error) {
            console.log(`erorr in fetching the chat of course${courseId}`,error)
        }
    }
}

import { ChatRepository } from "../domain/repository/ChatRepository";
import { ChatMessage } from "../interface/chatController";

export class ChatService {
    private chatRepo: ChatRepository;

    constructor() {
        this.chatRepo = new ChatRepository();
    }

    async createRoom(userId: string, courseId: string) {
        try {
            const result = await this.chatRepo.createRoom(userId, courseId);
            return result;
            
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating room:${error.message}`)
            }
        }
    }
    async saveMessage(message:ChatMessage){
        try{
            const result = await this.chatRepo.saveMessage(message);
            return result
        }catch(error){
            console.log("Error in saveMessage in  chat.ts",error)
        }
    }
    async saveImageMessage(message:ChatMessage){
        try{
            const result = await this.chatRepo.saveImageMessage(message);
            return result
        }catch(error){
            console.log("Error in saveMessage in  chat.ts",error)
        }
    }

    
    async loadPreviousMessages(courseId:string){
        try {
            const result = await this.chatRepo.loadPreviousMessages(courseId);
            return result
        } catch (error) {
            console.log("Error in loadPreviousMessages in chat.ts",error)
        }
    }
}
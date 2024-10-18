import { ChatService } from "../application/chat";
export interface ChatMessage {
    userId: string;
    text: string;
    courseId?: string;  // If needed for tracking
  }
class ChatController{
    private chatService :  ChatService;

    constructor(){
        this.chatService = new ChatService();
    }
    async createRoom(data:{userId:string;courseId:string}){
        try {
            const {userId,courseId} =data;
            console.log('Creating or adding user to room with:', userId, courseId);
            const result= this.chatService.createRoom(userId,courseId);
            return result

        } catch (error) {
            console.log("Error chatcontroller in  creating room ",error)
        }
    }   
    async saveMessage(message:ChatMessage){
        try {
            console.log('message in chat service',message)
            const result =await this.chatService.saveMessage(message);
            return result;
        } catch (error) {
            console.log("Error in saving message in db",error)
        }
    }
    async loadPreviousMessages(courseId:string){
        try {
            const result = await this.chatService.loadPreviousMessages(courseId);
            return result;
        } catch (error) {
            console.log("Error in loadPreviousMessages",error)
        }
    }
}

export const chatController = new ChatController();
import { channel } from 'diagnostics_channel';
import  RabbitMQClient from './client';
import { chatController } from '../../interface/chatController';

export default class MessageHandler{
    static async handle(
        operation:string,
        data:any,
        correlationId:string,
        replyTo:string
    ){
        let response;
        switch(operation){
            case 'create_or_add_user_to_room':
                response = await chatController.createRoom(data);
            console.log('haiiii');
            break;
        case 'save-message':
            response = await chatController.saveMessage(data);
            break;
        case 'save-image-message':
            response= await chatController.saveImageMessage(data);
            break;
        case 'loadPreviousMessages':
            response = await chatController.loadPreviousMessages(data);
            break;
        }
            
        await RabbitMQClient.produce(response,correlationId,replyTo);
    }
}

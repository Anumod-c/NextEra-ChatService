import config from "./config";

interface RabbitMQconfig{
    rabbitMQ:{
        url:string;
        queues:{
            ChatQueue:string
        };
    };
}

const RabbitMQconfig:RabbitMQconfig={
    rabbitMQ:{
        url : config.RABBITMQ_URL,
        queues:{
            ChatQueue:'chat_queue',
        }
    }
}

export default RabbitMQconfig
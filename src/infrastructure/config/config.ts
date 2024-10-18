import dotenv from 'dotenv';

dotenv.config()


const config = {
    port :parseInt(process.env.PORT as string)||5006,
    RABBITMQ_URL :process.env.RABBITMQ_URL || 'amqp://localhost',

    DATABASE_URL :process.env.DATABASE_URL || 'mongodb://0.0.0.0:27017/NextEra-ChatService',
}

export default config
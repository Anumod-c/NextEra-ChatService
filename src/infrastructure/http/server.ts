import express from  'express';
import RabbitMQClient from  '../rabbitMQ/client'
import config from '../config/config';
import {databaseConnection} from '../database/mongodb'
const app = express();
app.use(express.json());

const startServer = async ()=>{
    try {
        await databaseConnection();
        const port = config.port;
        RabbitMQClient.initialize();
        
        

        app.listen(port, () => {
            console.log("chat service running on port", port);
          });
    } catch (error) {
        console.log("Error in starting chat service");
    }
}

startServer()
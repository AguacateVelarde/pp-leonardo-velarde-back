import 'module-alias/register';
import 'reflect-metadata';

import TokenController from '@api/token/controller';
import UserController from '@api/user/controller';
import { register as registerRoutes } from '@shared/registerRoutes';
import cors from 'cors';
import express, { Response } from 'express';
import http from 'http';
import mongoose from 'mongoose';

import './inversify.config.ts';

const PORT = +process.env.PORT || 9000;
const app = express();

app.use(express.json());
app.use(cors());

registerRoutes(app, Array.from([
    UserController,
    TokenController
]));

const server = http.createServer(app);
mongoose.connect;
mongoose.connect(
    process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'pp'
    }
).then(() => console.log('connected to mongo...'));

server.on('listening', (): void => {
    console.log( `Server run at port ${ PORT } 🤖` );
}).listen(PORT);

export default app;

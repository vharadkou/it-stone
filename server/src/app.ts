import 'reflect-metadata';

import { InversifyExpressServer } from 'inversify-express-utils';

import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import express from 'express';
import path from 'path';
import SocketIO from 'socket.io';

import './controller';
import { CONTAINER } from './service/services-registration';
import { SocketService } from 'service/socket';

const server = new InversifyExpressServer(CONTAINER);

server.setConfig((app) => {
    app.use(morgan('dev'));
    app.use(cors());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
});

const application = server.build();

const port = process.env.PORT || 3030;
const serverInstance = application.listen(port, () => {
    console.log('Press CTRL+C to stop\n');
});

const socketService: SocketService = SocketService.getInstance();
socketService.setSocket(SocketIO(serverInstance));

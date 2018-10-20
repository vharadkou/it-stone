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

// const ngrok = require('ngrok');

const server = new InversifyExpressServer(CONTAINER);

server.setConfig((app) => {
    app.use(morgan('dev'));
    app.use(cors());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    // app.use(express.static(path.join(__dirname, '../../client/dist/client')));
});

const application = server.build();

const port = process.env.PORT || 9669;
const serverInstance = application.listen(port, async () => {
    console.log('Press CTRL+C to stop\n');

    //  ngrok.connect(port, function (err: any, url: any) {
    //     console.log(`Node.js local server is publicly-accessible at ${url}`);
    // });

    // const url = await ngrok.connect(port);
    // console.log(url);
});

const socketService: SocketService = SocketService.getInstance();
socketService.setSocket(SocketIO(serverInstance));

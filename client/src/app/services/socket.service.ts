import * as openSocket from 'socket.io-client';

export class SocketService {

    private socket: SocketIOClient.Socket;

    public constructor () {}

    getSocket() {
        if (!this.socket) {
            this.socket = openSocket('http://localhost:9669');

        }

        return this.socket;
    }
}

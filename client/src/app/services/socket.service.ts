import * as openSocket from 'socket.io-client';

export class SocketService {

    private socket: SocketIOClient.Socket;

    public constructor () {}

    getSocket() {
        if (!this.socket) {
            this.socket = openSocket('https://f605d263.ngrok.io');

        }

        return this.socket;
    }
}

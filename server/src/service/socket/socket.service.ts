import { injectable } from 'inversify';
import SocketIO from 'socket.io';

interface GameStepData {
    fields: [{
        id: 1 | 2 | 3 | 4,
        cards: any[]
    }];
    myHp: number;
    enemyHp: number;
}

@injectable()
export class SocketService {
    private static instance: SocketService;
    private clients: SocketIO.Socket[] = [];

    private constructor() {
        if (SocketService.instance) {
            throw new Error('You try to destroy singleton');
        }
    }

    public static getInstance() {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    public async setSocket(socketIO: SocketIO.Server): Promise<void | Response> {

        socketIO.on('connection', (client: SocketIO.Socket) => {
            this.clients.push(client);
            if (this.clients.length === 2) {
                client.emit('onReady');
            }

            client.on('disconnect', () => this.onDisconnect(client));
            client.on('onStep', (data) => this.notifyOtherUser(client, data));
        });
    }

    public notifyOtherUser(client: SocketIO.Socket, data: GameStepData): void {
        const otherClient = this.clients.find((c) => c.id !== client.id);
        console.log(data);
        console.log(`=======================`);
        const newDate = this.swapStepData(data);
        console.log(newDate);
        otherClient.emit('onStepChange', newDate);
    }

    private onDisconnect(client: SocketIO.Socket): void {
        this.clients.splice(this.clients.indexOf(client), 1);
    }

    private swapStepData(data: GameStepData): GameStepData {


        data.fields.map((gameStepData: any) => {
            if (gameStepData.id === 1) {
                gameStepData.id = 4;
                return gameStepData;
            }

            if (gameStepData.id === 4) {
                gameStepData.id = 1;
                return gameStepData;
            }

            if (gameStepData.id === 2) {
                gameStepData.id = 3;
                return gameStepData;
            }

            if (gameStepData.id === 3) {
                gameStepData.id = 2;
                return gameStepData;
            }

        });

        let tmp = data.myHp;
        data.myHp = data.enemyHp;
        data.enemyHp = tmp;

        return data;
    }
}

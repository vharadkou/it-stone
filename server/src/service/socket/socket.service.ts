import { injectable } from 'inversify';
import SocketIO from 'socket.io';

interface GameStepData {
  id: 1 | 2 | 3 | 4;
  cards: any[];
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

  public notifyOtherUser(client: SocketIO.Socket, data: GameStepData[]): void {
    // const otherClient = this.clients.find((c) => c.id !== client.id);
    // const newDate = this.swapStepData(data);
    // otherClient.emit('onStepChange', newDate);
  }

  private onDisconnect(client: SocketIO.Socket): void {
    this.clients.splice(this.clients.indexOf(client), 1);
  }

  private swapStepData(data: GameStepData[]): GameStepData[] {
    const newData: GameStepData[] = [];

    data.forEach((gameStepData: GameStepData) => {
      if (gameStepData.id === 1) {
        const newGameStepData: GameStepData = { id: 4, cards: gameStepData.cards };
        newData.push(newGameStepData);
      }

      if (gameStepData.id === 4) {
        const newGameStepData: GameStepData = { id: 1, cards: gameStepData.cards };
        newData.push(newGameStepData);
      }

      if (gameStepData.id === 2) {
        const newGameStepData: GameStepData = { id: 3, cards: gameStepData.cards };
        newData.push(newGameStepData);
      }

      if (gameStepData.id === 3) {
        const newGameStepData: GameStepData = { id: 2, cards: gameStepData.cards };
        newData.push(newGameStepData);
      }
    });

    return newData;
  }
}

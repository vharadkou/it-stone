import { injectable } from 'inversify';
import SocketIO from 'socket.io';

import { inject } from '../services-registration';

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

      client.on('disconnect', () => this.onDisconnect(client));
      client.on('onStep', () => this.notifyAllClients())
    });
  }

  public notifyAllClients(): void {
    this.clients.forEach((client) => {
      // client.emit(eventName, payload);
    });
  }

  private onDisconnect(client: SocketIO.Socket): void {
    this.clients.splice(this.clients.indexOf(client), 1);
  }
}

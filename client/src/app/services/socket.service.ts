import { Observable } from 'rxjs';
import * as openSocket from 'socket.io-client';

export class SocketService {
  private socket: SocketIOClient.Socket;

  public constructor() {
    if (!this.socket) {
      this.socket = openSocket('http://localhost:9669');
    }
  }

  public join(room: string): Observable<string> {
    return new Observable(observer => {
      this.socket.emit('join', room);
      observer.next(room);
    });
  }

  public disconnect(): void {
    this.socket.disconnect();
  }

  public emit(event: string, data: any): void {
    // temporary solution
    console.group();
    console.log('----- SOCKET OUTGOING -----');
    console.log('Action: ', event);
    console.log('Payload: ', data);
    console.groupEnd();

    this.socket.emit(event, data);
  }

  public listen(event: string): Observable<any> {
    return new Observable(observer => {
      this.socket.emit(event, data => {
        // temporary solution
        console.group();
        console.log('----- SOCKET INBOUND -----');
        console.log('Action: ', event);
        console.log('Payload: ', data);
        console.groupEnd();

        observer.next(data);
      });
      return () => this.socket.off(event);
    });
  }
}

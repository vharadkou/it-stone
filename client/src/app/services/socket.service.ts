import { BehaviorSubject, Observable } from 'rxjs';
import * as openSocket from 'socket.io-client';

export class SocketService {

  public connected$ = new BehaviorSubject<boolean>(false);
  private socket: SocketIOClient.Socket;

  public constructor() {
    this.socket = openSocket('http://localhost:9669');
    this.socket.on('connect', () => this.connected$.next(true));
    this.socket.on('disconnect', () => this.connected$.next(false));
  }

  public join(room: string): void {
    this.connected$.subscribe((connected) => {
      if (connected) {
        this.socket.emit('join', { room });
      }
    });
  }

  public disconnect(): void {
    this.socket.disconnect();
    this.connected$.next(false);
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

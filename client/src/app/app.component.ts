import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { SocketService } from './services/socket.service';
enum Status {
  GameField,
  Auth
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public myCard = [
    {
      firstName: 'Valiantsin1',
      lastName: 'Tsikhanau',
      picture: 'https://static.cdn.epam.com/avatar/60655420492f5fca5a2f840c132d7e82.jpg',
      jobPosition: '...',
      skil1: 'Skil1',
      skil2: 'Skil2',
      skil3: 'Skil3',
    },
    {
      firstName: 'Valiantsin2',
      lastName: 'Tsikhanau',
      picture: 'https://static.cdn.epam.com/avatar/60655420492f5fca5a2f840c132d7e82.jpg',
      jobPosition: '...',
      skil1: 'Skil1',
      skil2: 'Skil2',
      skil3: 'Skil3',
    },
    {
      firstName: 'Valiantsin3',
      lastName: 'Tsikhanau',
      picture: 'https://static.cdn.epam.com/avatar/60655420492f5fca5a2f840c132d7e82.jpg',
      jobPosition: '...',
      skil1: 'Skil1',
      skil2: 'Skil2',
      skil3: 'Skil3',
    },
  ];
  public myActiveCard = [];
  public enemyActiveCard = [];
  public readonly Status = Status;
  public status: Status = Status.GameField;

  private socket: SocketIOClient.Socket;
  constructor(
    private socketService: SocketService
  ) {
    this.socket = this.socketService.getSocket();
  }

  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
        transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
            // this.socket.emit('onStep', {
            //     id: 1,
            //     cards: this.myActiveCard
            // });
    }

  }
}

import { Component, OnInit, OnChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Card } from 'models';
import { CardsFacade } from 'store';
import { SocketService } from 'app/services';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.scss']
})

export class FightPageComponent implements OnInit {
  public allCardsMy$ = this.cardsFacade.myCards$;
  public allCardsEnemy$ = this.cardsFacade.enemyCards$;
  public myActiveCards$ = this.cardsFacade.myActiveCards$;
  public enemyActiveCards$ = this.cardsFacade.enemyActiveCards$;
  public mess = 'Hola';
  private socket: SocketIOClient.Socket;

  constructor(private cardsFacade: CardsFacade,
      private socketService: SocketService
  ) {
    this.cardsFacade.loadCards();
    this.socket = this.socketService.getSocket();
  }

  public ngOnInit(): void {
    this.socket.on('connect', () => console.log('Message from socket in front'));

    this.socket.on('test', data => console.log(data));
  }

  public myDrop(event: CdkDragDrop<Card[]>): void {
    if (event.previousContainer === event.container) {
      this.cardsFacade.moveMyCardsWithinArray(event);
      console.log('Drag`n`drop I');
      this.socket.emit('onTrip', {data: 'str'});
    } else {
      this.cardsFacade.getMyBattleCard(event);
      this.socket.emit('onStep');
      console.log('Drag`n`drop II');
    }
  }

  public enemyDrop(event: CdkDragDrop<Card[]>): void {
    if (event.previousContainer === event.container) {
      this.cardsFacade.moveEnemyCardsWithinArray(event);
    } else {
      this.cardsFacade.getEnemyBattleCard(event);
    }
  }
}

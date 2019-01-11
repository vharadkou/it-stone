import { Component, OnInit } from '@angular/core';

import { CdkDragDrop } from '@angular/cdk/drag-drop';

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
  private socket: SocketIOClient.Socket;

  constructor(
    private cardsFacade: CardsFacade,
    private socketService: SocketService
  ) {
    this.cardsFacade.loadCards();
    this.socket = this.socketService.getSocket();
  }

  public ngOnInit(): void {
    this.socket.on('onReady', (data) => console.log(data));
  }

  public myDrop(event: CdkDragDrop<Card[]>): void {
    if (event.previousContainer === event.container) {
      this.cardsFacade.moveMyCardsWithinArray(event);
      this.socket.emit('onStep', { message: 'not moved' });
    } else {
      this.cardsFacade.getMyBattleCard(event);
    }
  }

  public enemyDrop(event: CdkDragDrop<Card[]>): void {
    if (event.previousContainer === event.container) {
      this.cardsFacade.moveEnemyCardsWithinArray(event);
    } else {
      this.cardsFacade.getEnemyBattleCard(event);
    }
  }

  public myActiveDrop(event: CdkDragDrop<Card[]>): void {
    if (event.previousContainer === event.container) {
      this.cardsFacade.moveMyActiveCardsWithinArray(event);
    } else {
      this.cardsFacade.getMyBattleCard(event);
      this.socket.emit('moveToBattle', { message: 'making a step' });
    }
  }

  public enemyActiveDrop(event: CdkDragDrop<Card[]>): void {
    if (event.previousContainer === event.container) {
      this.cardsFacade.moveEnemyActiveCardsWithinArray(event);
    } else {
      this.cardsFacade.getEnemyBattleCard(event);
    }
  }
}

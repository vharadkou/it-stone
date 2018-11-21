import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Card } from 'models';
import { CardsFacade } from 'store';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.scss']
})

export class FightPageComponent implements OnInit {
  // temporary crutch
  public allCardsMy$ = this.cardsFacade.allCards$
    .subscribe(card => {
      this.allCardsMy$ = card;
    });
  public myActiveCards: Card[] = [];
  public enemyActiveCards: Card[] = [];

  constructor(private cardsFacade: CardsFacade) {
    this.cardsFacade.loadCards();
  }

  public ngOnInit(): void {}

  public drop(event: CdkDragDrop<Card[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}

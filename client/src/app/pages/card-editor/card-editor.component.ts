import { Component, OnInit } from '@angular/core';

import { Card } from 'models';
import { CardsFacade } from 'store';

@Component({
  selector: 'app-card-editor',
  templateUrl: './card-editor.component.html',
  styleUrls: ['./card-editor.component.scss']
})
export class CardEditorComponent implements OnInit {

  public isItCreator: boolean;
  public allCardsMy$ = this.cardsFacade.myCards$;
  public selectedCard: Card;
  public cardDetailTitle: string;
  public templCard: Card = {
    id: 10,
    name: "Name",
    surname: "Surname",
    image: "http://simpleicon.com/wp-content/uploads/user1.png",
    skills: [],
    hp: 0,
    damage: 0
  }

  constructor(private cardsFacade: CardsFacade) {
    this.cardsFacade.loadCards();
  }

  public setSelectedCard(card: Card, isCreator: boolean): void {
    this.isItCreator = !isCreator;
    this.cardDetailTitle = this.isItCreator ? 'Edit' : 'Create new';

    if (card === this.templCard) {
      this.selectedCard = JSON.parse(JSON.stringify(card));
      this.selectedCard.id = this.newCardID() + 1;
      return;
    }

    this.selectedCard = card;
  }

  private newCardID(): number {
    let maxId: number = 0;
    this.allCardsMy$.forEach((item) => {
      for (let i = 0; i < item.length; i++) {
        maxId = item[i].id > maxId ? item[i].id : maxId;
      }
    })
    return maxId;
  }

  private changeSelectedToFirst() {
    let Obser = this.allCardsMy$.subscribe(
      (cards) => {
        if (cards.length === 0) {
          this.setSelectedCard(this.templCard, true);
          return;
        } else {
          this.setSelectedCard(cards[0], false);
        }
      });
      // setTimeout(()=>{
      //   Obser.unsubscribe();
      // }, 1000);
  }

  ngOnInit() {
    this.changeSelectedToFirst();
  };

}

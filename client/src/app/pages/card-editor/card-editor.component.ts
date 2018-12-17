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

  setSelectedCard(card, bool) {
    this.selectedCard = JSON.parse(JSON.stringify(card));
    this.isItCreator = !bool;
    console.log(this.selectedCard);
  }

  ngOnInit() {
  }

}

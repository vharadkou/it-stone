import { Component, OnInit } from '@angular/core';

import { Card } from 'models';
import { CardsFacade } from 'store';

@Component({
  selector: 'app-card-editor',
  templateUrl: './card-editor.component.html',
  styleUrls: ['./card-editor.component.scss']
})
export class CardEditorComponent implements OnInit {
  public allCardsMy$ = this.cardsFacade.myCards$;
  public selectedCard: Card;

  constructor(private cardsFacade: CardsFacade) {
    this.cardsFacade.loadCards();
  }

  editCard(card) {
    this.selectedCard = card;
    console.log(this.selectedCard);
  }

  ngOnInit() {
  }

}

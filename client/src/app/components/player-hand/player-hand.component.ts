import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from 'store';
import * as CardsAction from 'store';
import { Card } from 'models';

@Component({
  selector: 'app-player-hand',
  templateUrl: './player-hand.component.html',
  styleUrls: ['./player-hand.component.scss']
})

export class PlayerHandComponent implements OnInit {
  public allCards: { [id: number]: Card };

  constructor(private store: Store<State>) { }

  public ngOnInit(): void {
    this.store.dispatch(new CardsAction.GetCards());

    this.store.select(s => s.cards)
      .subscribe(cards => {
        this.allCards = cards.cards;
        console.log(this.allCards);
      });
  }
}

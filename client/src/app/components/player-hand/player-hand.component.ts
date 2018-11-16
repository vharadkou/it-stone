import { Component, OnInit } from '@angular/core';

import { CardsFacade } from 'store';

@Component({
  selector: 'app-player-hand',
  templateUrl: './player-hand.component.html',
  styleUrls: ['./player-hand.component.scss']
})

export class PlayerHandComponent implements OnInit {
  public allCards$ = this.cardsFacade.allCards$;

  constructor(private cardsFacade: CardsFacade) {
    this.cardsFacade.getCards();
  }

  public ngOnInit(): void { }
}

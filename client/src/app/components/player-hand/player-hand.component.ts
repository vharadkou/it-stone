import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player-hand',
  templateUrl: './player-hand.component.html',
  styleUrls: ['./player-hand.component.scss']
})

export class PlayerHandComponent implements OnInit {
  @Input() public allCardsMy;
  @Input() public allCardsEnemy;

  constructor() {}

  public ngOnInit(): void {}
}

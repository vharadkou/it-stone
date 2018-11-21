import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-active-card',
  templateUrl: './active-card.component.html',
  styleUrls: ['./active-card.component.scss']
})

export class ActiveCardComponent implements OnInit {
  @Input() public myActiveCards;
  @Input() public enemyActiveCards;

  constructor() { }

  public ngOnInit(): void { }

}

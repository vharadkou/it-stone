import { Component, OnInit, Input } from '@angular/core';


import { Card } from 'models';

@Component({
  selector: 'app-hidden-card',
  templateUrl: './hidden-card.component.html',
  styleUrls: ['./hidden-card.component.scss'],
})

export class HiddenCardComponent {
  @Input() public card: Card;
  



  ngOnInit() { }
}

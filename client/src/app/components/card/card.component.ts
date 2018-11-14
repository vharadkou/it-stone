import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { faUsb } from '@fortawesome/free-brands-svg-icons';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';

import { Card } from 'models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})

export class CardComponent implements OnInit {
  @Input() public card: Card;

  constructor() { }

  faUsb = faUsb;
  faShieldAlt = faShieldAlt;

  isFront = true;
  ngOnInit() { }
}

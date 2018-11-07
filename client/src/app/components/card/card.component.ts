import {
    Component,
    OnInit,
} from '@angular/core';
import { faUsb } from '@fortawesome/free-brands-svg-icons';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  constructor() {}

  faUsb = faUsb;
  faShieldAlt = faShieldAlt;

  isFront = false;
  ngOnInit() {}
}

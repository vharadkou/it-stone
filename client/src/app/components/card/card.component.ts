import {
    Component,
} from '@angular/core';
import { faUsb } from '@fortawesome/free-brands-svg-icons';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  public isFront = false;
  public faUsb = faUsb;
  public faShieldAlt = faShieldAlt;
}

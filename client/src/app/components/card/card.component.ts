import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { faUsb } from '@fortawesome/free-brands-svg-icons';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';

import { Card } from 'models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})

export class CardComponent {
  @Input() public card: Card;
  @Input() public isEditor: boolean;
  @Input() dropEvent

  public showedEvent
  
  public isFront = true;
  public faUsb = faUsb;
  public faShieldAlt = faShieldAlt;

  ngOnInit() {
}


  

}

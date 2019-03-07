import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-about-card',
  templateUrl: './about-card.component.html',
  styleUrls: ['./about-card.component.scss']
})
export class AboutCardComponent {
  @Input() title:string;
  @Input() name:string;
  @Input() surname:string;
  @Input() imageSrc:string;
  @Input() skills:string[];
  @Input() email:string;
}

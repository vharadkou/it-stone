import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-about-card',
  templateUrl: './about-card.component.html',
  styleUrls: ['./about-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutCardComponent {
  @Input() title:string;
  @Input() name:string;
  @Input() surname:string;
  @Input() imageSrc:string;
  @Input() skills:string[];
  @Input() email:string;
}

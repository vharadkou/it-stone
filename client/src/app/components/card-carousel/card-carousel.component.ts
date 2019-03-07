import { Component, OnInit, Input } from '@angular/core';
import { AboutCard } from '../../../models';

@Component({
  selector: 'app-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.scss']
})

export class CardCarouselComponent implements OnInit {

  @Input() people:AboutCard[];
  
  private currentCardIndex: number = 0;
  public user: AboutCard;
  public styleForFading:string = "visible";
  public disableBackward:boolean = true;
  public disableForward:boolean = false;

  ngOnInit() {
    this.user = this.people[this.currentCardIndex];
  }

  setCurrentCardData():void {
    this.user = this.people[this.currentCardIndex];
  }

  setNextCardIndex():void {
    this.currentCardIndex++;
    this.setCurrentCardData();
  }

  setPreviousCardIndex():void {
    this.currentCardIndex--;
    this.setCurrentCardData();
  }

  setPreviousCard():void {
    if (this.currentCardIndex === 1) {
      this.disableBackward = true;
    }
    this.disableForward = false;
    this.styleForFading = "visible fadeOutBackward";
    setTimeout(() => { this.setPreviousCardIndex();
      this.styleForFading = "visible fadeInBackward"
    }, 500);
  }

  getImageUrl():string {
    return 'url('+this.user.imageSrc+')';
  }

  setNextCard():void {
    if (this.currentCardIndex === this.people.length-2) {
      this.disableForward = true;
    }
    this.disableBackward = false;
    this.styleForFading = "visible fadeOutForward"
    setTimeout(() => { this.setNextCardIndex();
      this.styleForFading = "visible fadeInForward"
    }, 500);
  }
}

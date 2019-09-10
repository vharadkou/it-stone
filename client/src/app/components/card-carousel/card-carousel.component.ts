import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AboutCard } from 'models';
import { pipe, of } from 'rxjs';
import { delay, tap, mapTo } from 'rxjs/operators';
import { CdkRow } from '@angular/cdk/table';


@Component({
  selector: 'app-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CardCarouselComponent implements OnInit {

  constructor(private cdr: ChangeDetectorRef) {

  }

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
    of(null).pipe(delay(500), tap(
      ()=>{
            this.setPreviousCardIndex();
            this.styleForFading = "visible fadeInBackward";
            this.cdr.detectChanges()
          },
      )).subscribe();
  }

  getImageUrl():string {
    return 'url('+this.user.imageSrc+')';
  }

  setNextCard():void {
    if (this.currentCardIndex === this.people.length-2) {
      this.disableForward = true;
    }
    this.disableBackward = false;
    this.styleForFading = "visible fadeOutForward";
    of(null).pipe(delay(500), tap(
      ()=>{
            this.setNextCardIndex();
            this.styleForFading = "visible fadeInForward";
            this.cdr.detectChanges()
          },
      )).subscribe();
    
  }
}
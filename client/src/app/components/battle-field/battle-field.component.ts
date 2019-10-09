import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  HostListener
} from "@angular/core";
import { CdkDragDrop, CdkDragStart, CdkDragEnd } from "@angular/cdk/drag-drop";
import { CardsFacade /*SocketFacade */ } from "store";
import { Card } from "models";
import { Observable } from "rxjs";

@Component({
  selector: "app-battle-field",
  templateUrl: "./battle-field.component.html",
  styleUrls: ["./battle-field.component.scss"]
})
export class BattleFieldComponent implements OnInit {
  public attackCard;
  public attackedCard;
  public attackedCardId;
  @Input() enemyActiveCards;
  @Input() allCardsEnemy;
  @Input() myCardsInHand;
  @Input() myActiveCards;
  @Input() allCardsMy;
  @Input() isMyTurnNow;
  @Input() myManaLimit;
  @Input() myManaCurrentValue;
  @Input() gameStatus;

  constructor(
    private cardsFacade: CardsFacade //  private socketFacade: SocketFacade
  ) {
    this.cardsFacade.loadCards();
    // this.socketFacade.joinRoom();
  }

  ngOnInit() {}

  @Output() onShuffle = new EventEmitter<any>();
  @Output() onMyDrop = new EventEmitter<any>();
  @Output() onStart = new EventEmitter<any>();
  @Output() onEnd = new EventEmitter<any>();
  @Output() onMyCardTaken = new EventEmitter<any>();

  //public dropEvent;

  public myCardsShuffleDrop($event: any): void {
    this.onShuffle.emit($event);
  }

  public myActiveCardDrop($event: any): void {
    this.onMyDrop.emit($event);
  }
  public takeMyCardToHand(card): void {
    this.onMyCardTaken.emit(card);
    this.allCardsMy.splice(-1, 1);
  }

  public dragEnded(event: any, id: any, damage: any): void {
    let dropPoint = document.elementFromPoint(
      event.source._dragRef._pointerPositionAtLastDirectionChange.x,
      event.source._dragRef._pointerPositionAtLastDirectionChange.y
    );

    this.attackedCard = dropPoint.closest(
      ".its-battlefield__enemy-active-card"
    );

    if (this.attackedCard) {
      this.attackedCardId = this.attackedCard.querySelector(
        ".its-card__id"
      ).textContent;
      this.onEnd.emit({
        userCardId: id,
        enemyCardId: this.attackedCardId,
        userCardDamage: damage
      });
    }

    // this.dropEvent = event;
  }
}

import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  HostListener
} from "@angular/core";
import { CdkDragDrop, CdkDragStart, CdkDragEnd } from "@angular/cdk/drag-drop";
import { CardsFacade, SocketFacade } from "store";
import { Card } from "models";
import { Observable } from "rxjs";

@Component({
  selector: "app-battle-field",
  templateUrl: "./battle-field.component.html",
  styleUrls: ["./battle-field.component.scss"]
})
export class BattleFieldComponent implements OnInit {
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
    private cardsFacade: CardsFacade,
    private socketFacade: SocketFacade
  ) {
    this.cardsFacade.loadCards();
    this.socketFacade.joinRoom();
  }

  ngOnInit() {}

  @Output() onShuffle = new EventEmitter<any>();
  @Output() onMyDrop = new EventEmitter<any>();
  @Output() onStart = new EventEmitter<any>();
  @Output() onEnd = new EventEmitter<any>();
  @Output() onMyCardTaken = new EventEmitter<any>();

  public dropEvent;

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
    let takePoint = document.elementFromPoint(
      event.source._dragRef._pickupPositionOnPage.x,
      event.source._dragRef._pickupPositionOnPage.y
    );

    let attackCard = takePoint.closest(".its-battlefield__my-active-card");
    let attackedCard = dropPoint.closest(".its-battlefield__enemy-active-card");
    let explosionEnemy = attackedCard.querySelector(
      ".its-battlefield__enemy-active-card-explosure"
    );
    let explosionMy = attackCard.querySelector(
      ".its-battlefield__my-active-card-explosure"
    );
    if (attackedCard) {
      explosionMy.classList.add("its-battlefield__card-under-attack");
      let enemyCardHp = attackedCard.querySelector(".its-card__stat-value-hp")
        .innerHTML;
      let myCardHp = attackCard.querySelector(".its-card__stat-value-hp")
        .innerHTML;
      let damageOfEnemyCard = attackedCard.querySelector(
        ".its-card__stat-value-damage"
      ).innerHTML;
      let damageOnEnemyCardInfo = document.createElement("div");

      damageOnEnemyCardInfo.innerHTML = "-" + damage;

      let damageOnMyCardInfo = document.createElement("div");
      damageOnMyCardInfo.innerHTML = "-" + damageOfEnemyCard;

      if (enemyCardHp > damage) {
        explosionEnemy.classList.add("its-battlefield__card-under-attack");
      } else {
        explosionEnemy.classList.add("its-battlefield__card-dead");
      }

      if (myCardHp > damageOfEnemyCard) {
        explosionMy.classList.add("its-battlefield__card-under-attack");
        setTimeout(function() {
          explosionMy.classList.remove("its-battlefield__card-under-attack");
        }, 1500);
      } else {
        explosionMy.classList.add("its-battlefield__card-dead");
      }

      explosionEnemy.appendChild(damageOnEnemyCardInfo);
      explosionMy.appendChild(damageOnMyCardInfo);
      if (explosionEnemy) {
        setTimeout(function() {
          explosionEnemy.classList.remove("its-battlefield__card-under-attack");
        }, 1500);
      }

      setTimeout(function() {
        explosionEnemy.innerHTML = "";
      }, 1500);

      setTimeout(function() {
        explosionMy.innerHTML = "";
      }, 1500);
    }

    let attackedCardId = attackedCard.querySelector(".its-card__id")
      .textContent;
    this.dropEvent = event;
    this.onEnd.emit({
      userCardId: id,
      enemyCardId: attackedCardId,
      userCardDamage: damage
    });
  }
}

import {
  Directive,
  ElementRef,
  OnInit,
  Input,
  Renderer2,
  HostListener
} from "@angular/core";

@Directive({
  selector: "[appAttackView]"
})
export class AttackViewDirective {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  @HostListener("cdkDragEnded", ["$event"]) onDrop(event) {
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

    if (attackedCard) {
      let explosionEnemy = attackedCard.querySelector(
        ".its-battlefield__enemy-active-card-explosure"
      );
      let explosionMy = attackCard.querySelector(
        ".its-battlefield__my-active-card-explosure"
      );
      explosionMy.classList.add("its-battlefield__card-under-attack");
      let enemyCardHp = attackedCard.querySelector(".its-card__stat-value-hp")
        .innerHTML;
      let myCardHp = attackCard.querySelector(".its-card__stat-value-hp")
        .innerHTML;
      let damageOfEnemyCard = attackedCard.querySelector(
        ".its-card__stat-value-damage"
      ).innerHTML;
      let damageOnEnemyCardInfo = document.createElement("div");

      damageOnEnemyCardInfo.innerHTML = "-"; //+ damage;

      let damageOnMyCardInfo = document.createElement("div");
      damageOnMyCardInfo.innerHTML = "-" + damageOfEnemyCard;

      if (+enemyCardHp > 0 /* damage*/) {
        explosionEnemy.classList.add("its-battlefield__card-under-attack");
      } else {
        explosionEnemy.classList.add("its-battlefield__card-dead");
      }

      if (+myCardHp > +damageOfEnemyCard) {
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
  }
}

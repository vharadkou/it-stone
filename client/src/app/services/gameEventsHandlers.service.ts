import { Injectable } from "@angular/core";
import { GameStatus } from "models";
import { GameProcessFacade } from "store";
import { GameService } from "./game.service";
import { HttpService } from "./http-service";
import { ValidationService } from "./validation.service";
import { CardsFacade } from "../../store/cards/cards.facade";
import { Card } from "models";
import { SpellService } from "./spell.service";
@Injectable({
  providedIn: "root"
})
export class GameEventsHandlersService {
  public myActiveCards: Card[];
  public enemyActiveCards: Card[];
  public moveNumber: number;

  public constructor(
    public gameProcessFacade: GameProcessFacade,
    public gameService: GameService,
    public httpService: HttpService,
    public validationService: ValidationService,
    public cardsFacade: CardsFacade,
    public spellService: SpellService
  ) {
    this.cardsFacade.myActiveCards$.subscribe(
      (data: Card[]) => (this.myActiveCards = data)
    );
    this.cardsFacade.enemyActiveCards$.subscribe(
      (data: Card[]) => (this.enemyActiveCards = data)
    );
    this.gameProcessFacade.moveNumber$.subscribe(
      (data: number) => (this.moveNumber = data)
    );
  }

  public userActiveZoneDradAndDropEventHandler(event): void {
    if (
      this.validationService.checkIsThisEventContanerEquelPrevContaner(event)
    ) {
      if (this.myActiveCards.length > 1) {
        // this.gameService.moveMyActiveCardsWithinArray(event); //////// BUG FUCK
        // this.httpService.sendDragAndDropEvent(event);
      }
    } else {
      if (this.validationService.isManaEnought(event)) {
        this.gameService.getMyBattleCard(event, this.moveNumber);
        this.myActiveCards.forEach(card => {
          if (this.validationService.checkIsThisCardIsSpellCard(card)) {
            this.gameService.disableOtherCardsWhenSpellCardInUse(
              this.myActiveCards
            );
          }
          if (this.validationService.checkIsThisCardHasEffect(card)) {
            console.log(card.class);
            // for (let i = 0; i < this.myActiveCards.length; i++){
            //   if (!this.validationService.checkIsThisCardHasEffect(this.myActiveCards[i])){
            this.gameService.addSomeBonus(card);
            //   }
            // }
          }
        });
        this.spellService.doHRSpellWithMyCards(this.myActiveCards); /// HR Spell

        // this.httpService.sendDragAndDropEvent(event);
      } else {
        console.log("Service that say 'Not enought mana'");
      }
    }
  }

  public userActiveCardDragAndDropEventHandler(event: {
    userCardId: any;
    enemyCardId: any;
    userCardDamage: any;
  }) {
    this.gameService.getMyCardDamageFromEnemyBattleCardWithCardAttack(
      event.userCardId,
      event.enemyCardId
    );
    this.gameService.getDamageToEnemyBattleCardWithCardAttack(
      event.userCardId,
      event.enemyCardId,
      event.userCardDamage
    );

    this.myActiveCards.forEach(card => {
      if (this.validationService.checkCardArrayForMinusHpCards(card)) {
        this.gameService.deleteForMyCardsWithZeroOrMinusHP(card);
        if (this.validationService.checkIsThisCardIsSpellCard(card)) {
          console.log(this.validationService.checkIsThisCardIsSpellCard(card));
          this.gameService.enableOtherCardsWhenSpellCardInUse(
            this.myActiveCards
          );
        }
        if (this.validationService.checkIsThisCardHasEffect(card)) {
          this.gameService.removeSomeBonus(card);
        }
      }
      if (this.validationService.checkCardArrayForMinusHpCards(card)) {
        if (this.validationService.checkIsThisCardIsSpellCard(card)) {
          this.gameService.deleteForMyCardsWithZeroOrMinusHP(card);
          this.gameService.enableOtherCardsWhenSpellCardInUse(
            this.myActiveCards
          );
        }
      }
    });
    this.enemyActiveCards.forEach(card => {
      if (this.validationService.checkCardArrayForMinusHpCards(card)) {
        this.gameService.deleteEnemyMyCardsWithZeroOrMinusHP(card);
      }
    });

    this.httpService.sendMyCardAttackEvent(event);
  }

  public gameStartEventHandler(event): void {}

  public userChoseFirstCardsEventHandler(event): void {}

  public userTurnEndEventHandler(event): void {}

  public enemyTakeCardInHandEventHandler(event): void {}

  public enemyTakeButtleCardEventHandler(event): void {}

  public enemyShuffleButtleCardEventHandler(event): void {}

  public enemyAttackEventHandler(event): void {}
}

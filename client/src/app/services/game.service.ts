import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Card } from "models";
import { CardsFacade } from "store";

@Injectable({
  providedIn: "root"
})
export class GameService {
  public constructor(private cardFacade: CardsFacade) {}

  public moveMyActiveCardsWithinArray(event: any): any {
    this.cardFacade.moveMyActiveCardsWithinArray(event);
  }

  public getMyBattleCard(event: any, moveNumber: number): any {
    this.cardFacade.getMyBattleCard(event, moveNumber);
  }

  public getDamageToEnemyBattleCardWithCardAttack(
    userCardId,
    enemyCardId,
    userCardDamage
  ): any {
    this.cardFacade.decreaceEnemyCardHP(
      userCardId,
      enemyCardId,
      userCardDamage
    );
  }

  public getMyCardDamageFromEnemyBattleCardWithCardAttack(
    userCardId,
    enemyCardId
  ): any {
    this.cardFacade.decreaceMyCardHPWithMyAttack(userCardId, enemyCardId);
  }

  public deleteForMyCardsWithZeroOrMinusHP(card: Card): any {
    this.cardFacade.deleteMyCardFromBattle(card.id);
  }

  public addSomeBonus(card): void{
    this.cardFacade.addSomeBonus(card);
  }

  public removeSomeBonus(card): void{
    this.cardFacade.removeSomeBonus(card);
  }

  public deleteEnemyMyCardsWithZeroOrMinusHP(card: Card): any {
    this.cardFacade.deleteEnemyCardFromBattle(card.id);
  }

  public enableOtherCardsWhenSpellCardInUse(myActiveCards: Card[]): void {

    const enabledArray = myActiveCards.map(card => {
      card.effects.disableWhenSpellInUse = false;
      return card;
    });
    console.log(enabledArray)
    if ( enabledArray.length) {
    
      this.cardFacade.increaceMyCardAttack(enabledArray);
    }
  }

  public disableOtherCardsWhenSpellCardInUse(myActiveCards: Card[]): void {
    const spellCard = myActiveCards
    .filter(card => {
      if (card.class === "Spell") {
        return card;
      }
    })
    const disabledArray = myActiveCards
      .filter(card => {
        if (card.class !== "Spell") {
          return card;
        }
      })
      .map(card => {
        card.effects.disableWhenSpellInUse = true;
        return card;
      });
    console.log(disabledArray)
    this.cardFacade.increaceMyCardAttack([...disabledArray, ...spellCard]);
  }
}

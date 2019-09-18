import { Injectable } from "@angular/core";
import { GameProcessFacade } from "../../store/game-process/game-process.facade";
import { CardsFacade } from "../../store/cards/cards.facade";
import { Card } from "models";

@Injectable({
  providedIn: "root"
})
export class ValidationService {
  public myManaCurrentValue: number;
  public myCardsInHand: Card[];
  public constructor(private gameProcessFacade: GameProcessFacade, public cardsFacade: CardsFacade) {
    this.gameProcessFacade.myManaCurrentValue$.subscribe(
      (data: number) => (this.myManaCurrentValue = data)
    );
    this.cardsFacade.myCardsInHand$.subscribe(
        (data: Card[]) => (this.myCardsInHand = data)
      );
  }

  public checkIsThisEventContanerEquelPrevContaner(event: any): boolean {
    if (event.previousContainer === event.container) {
      return true;
    } else {
      return false;
    }
  }

  public checkCardArrayForMinusHpCards(card: Card): boolean {
     if (card.hp !== null && card.hp <= 0) {
      return true; } else {
        return false;
      }
  }
  public isManaEnought(event: any): boolean {
    if(this.myCardsInHand[event.previousIndex].manaCost <= this.myManaCurrentValue) {
        return true; } else {
            return true; // change to false when mana will be work
        }
    }
  public checkIsThisCardIsSpellCard(card: Card): boolean {
    if (card.class === 'Spell') {
      return true;
    } else {
      return false;
    }
  }

  public checkIsThisCardHasEffect(card: Card): boolean{
    return card.class === 'HR'
  }
}

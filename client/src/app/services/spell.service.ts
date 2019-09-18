import { Injectable } from "@angular/core";
import { CardsFacade } from "store";
import { Card } from "../../models";
import { BreakpointObserver } from "@angular/cdk/layout";

@Injectable({
  providedIn: 'root',
})
export class SpellService {
  public constructor(public cardFacade: CardsFacade) {}



  

  public doHRSpellWithMyCards(myActiveCards: Card[]): void {
    console.log('sss');
    const HRArray = myActiveCards.map(card => {
      if (card.class === "HR") {
        return card;
      }
    });
    HRArray.forEach(card => {
      if (card) {
        let arrayWithoutThisHr = myActiveCards.filter(_card => {
          return (
            _card.id !== myActiveCards[HRArray.indexOf(card)].id &&
            (!_card.effects ||
              !_card.effects.teambuilding ||
              !_card.effects.teambuilding.includes(
                myActiveCards[HRArray.indexOf(card)].id
              ))
          );
        });
        console.log(arrayWithoutThisHr);
      }
    });

  /*  if (false) {
      const arrayWithEffect = arrayWithoutThisHr.map(_card => {
        const newEffects = _card.effects ? { ..._card.effects } : {};
        newEffects.teambuilding
          ? (newEffects.teambuilding = [
              ...newEffects.teambuilding,
              myActiveCards[indexOfHrCrad].id
            ])
          : (newEffects.teambuilding = [myActiveCards[indexOfHrCrad].id]);
        return _card;
      });
      console.log(arrayWithEffect);
      this.cardFacade.increaceMyCardAttack([
        ...arrayWithEffect,
        ...[myActiveCards[indexOfHrCrad]]
      ]);
    }*/
  }




  /*  public deleteSpellWithMyCards(myActiveCards: Card[]): void {
    myActiveCards.filter(cardInArray => {
        return (
          cardInArray.effects &&
          cardInArray.effects.teambuilding &&
          cardInArray.effects.teambuilding.length > 0
        );
      })
      .forEach(cardInArray => {
        cardInArray.effects.teambuilding.forEach(id => {
          if (!myActiveCards.find(_card => _card.id === id)) {
            const newEffects = { ...cardInArray.effects };
            newEffects.teambuilding = newEffects.teambuilding.filter(
              id => id === cardInArray.id
            );

            this.cardFacade.increaceMyCardAttack(
              cardInArray.id,
              -1,
              newEffects
            );
          }
        });
      });

    myActiveCards.forEach(card => {
        if (card.class !== 'Spell') 
        
       { myActiveCards .forEach(card => {
          const newEffects = { ...card.effects } 
          newEffects.disableWhenSpellInUse = false
       
          this.cardFacade.increaceMyCardAttack(card.id, 0, newEffects);
        })
  
        }
      });

  }
}
*/
}

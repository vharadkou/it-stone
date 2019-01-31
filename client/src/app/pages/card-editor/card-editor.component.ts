import { Component, OnDestroy, OnInit } from '@angular/core';

import { Card } from 'models';
import { Subscription, zip } from 'rxjs';
import { CardsFacade, SkillsFacade } from 'store';

@Component({
  selector: 'app-card-editor',
  templateUrl: './card-editor.component.html',
  styleUrls: ['./card-editor.component.scss']
})
export class CardEditorComponent implements OnInit, OnDestroy {

  public allCardsMy$ = this.cardsFacade.myCards$;
  public selectedCard$ = this.cardsFacade.selectedCard$;
  public selectedCardId$ = this.cardsFacade.selectedCardId$;
  public checkedSkills$ = this.skillsFacade.checkedSkills$;
  public skillsList$ = this.skillsFacade.allSkills$;
  public popupTitle = 'Data is not saved.';
  public popupText = 'The new card is not saved. The entered data will be permanently deleted';
  public subscription: Subscription;

  constructor(
    private cardsFacade: CardsFacade,
    private skillsFacade: SkillsFacade
  ) {
    this.cardsFacade.loadCards();
  }

  public changeSelectedCardId(id: number, card: Card): void {
    this.cardsFacade.changeSelectedCardId(id);
    if (id !== 100) {
      this.skillsFacade.checkSkills(card);
    } else {
      this.skillsFacade.checkSkills();
    }
  }

  // public setSelectedCard(card: Card, isCreator: boolean, isJustSaved: boolean): void {
  //   this.cardsFacade.changeSelectedCardId(card.id);
  //   // if (!isJustSaved
  //   //   && this.selectedCard$
  //   //   && !isCreator
  //   //   && !this.isItEditor
  //   //   && this.objectsCompare(this.selectedCard$, this.templCard)
  //   //   ) {
  //   //   this.openDialog(card, isCreator);
  //   // } else {
  //   //   this.setSelectedCardBody(card, isCreator);
  //   // }
  // }

  // private objectsCompare(obsCard: Observable<Card>, card2: Card): boolean {
  //   let result: boolean;
  //   obsCard.subscribe((card1) => {
  //     result = card1.name === card2.name
  //       && card1.surname === card2.surname
  //       && card1.image === card2.image
  //       && JSON.stringify(card1.skills) === JSON.stringify(card2.skills)
  //       && card1.hp === card2.hp
  //       && card1.damage === card2.damage;
  //   }).unsubscribe();
  //   return !result;
  // }

  ngOnInit(): void {
    this.subscription = zip(this.allCardsMy$, this.skillsList$).subscribe((result) => {
      this.skillsFacade.checkSkills(result[0][0]);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

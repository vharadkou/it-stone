import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Card } from 'models';
import { Subscription, zip } from 'rxjs';
import { take } from 'rxjs/operators';
import { CardsFacade, SkillsFacade } from 'store';

@Component({
  selector: 'app-card-editor',
  templateUrl: './card-editor.component.html',
  styleUrls: ['./card-editor.component.scss']
})
export class CardEditorComponent implements OnInit, OnDestroy {

  @ViewChild('cardDetail') public cardDetail: Component;

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

  public changeSelectedCardId(id: number, form: NgForm, card?: Card): void {
    if (form.dirty) {
      this.selectedCardId$.pipe(take(1)).subscribe((result: number) => {
        if (result === 100) {
          this.cardsFacade.showNewCardPopup(this.popupTitle, this.popupText, id, card);
        } else {
          this.cardsFacade.changeSelectedCardId(id, card);
        }
      });
    } else {
      this.cardsFacade.changeSelectedCardId(id, card);
    }
  }

  ngOnInit(): void {
    this.subscription = zip(this.allCardsMy$, this.skillsList$).subscribe((result) => {
      this.skillsFacade.checkSkills(result[0][0]);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

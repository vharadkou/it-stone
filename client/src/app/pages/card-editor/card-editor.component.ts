import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Card, PopupTextContent } from 'models';
import { Subscription, zip } from 'rxjs';
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

  private popupTextContent: PopupTextContent = {
    title: 'Data is not saved.',
    text: 'The new card is not saved. The entered data will be permanently deleted',
    buttonText: {
      cancel: 'Cancel',
      confirm: 'Dismiss changes'
    }
  };

  private subscription: Subscription;

  constructor(
    private cardsFacade: CardsFacade,
    private skillsFacade: SkillsFacade
  ) {
    this.cardsFacade.loadCards();
  }

  public checkNewCardDataLoss(id: number, form: NgForm, card?: Card): void {
    this.cardsFacade.checkNewCardDataLoss(this.popupTextContent, id, form, card);
  }

  public ngOnInit(): void {
    this.subscription = zip(this.allCardsMy$, this.skillsList$).subscribe((result) => {
      this.skillsFacade.checkSkills(result[0][0]);
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

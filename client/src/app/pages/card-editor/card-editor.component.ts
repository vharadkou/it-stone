import { Component, OnInit } from '@angular/core';

import { Card, Skill } from 'models';
import { CardsFacade, SkillsFacade } from 'store';

import { MatDialog } from '@angular/material';
import { MaterialDialogComponent } from 'app/components/material-dialog/material-dialog.component';
import { Observable } from 'rxjs';
import { select } from '@ngrx/store';
import { PopupsService } from 'app/services/popups.service';

@Component({
  selector: 'app-card-editor',
  templateUrl: './card-editor.component.html',
  styleUrls: ['./card-editor.component.scss']
})
export class CardEditorComponent implements OnInit {

  public allCardsMy$ = this.cardsFacade.myCards$;
  public selectedCard$ = this.cardsFacade.selectedCard$;
  public checkedSkills$ = this.skillsFacade.checkedSkills$;
  public isCreator: boolean;
  public popupTitle = 'Данные не сохранены.';
  public popupText = 'Новая карточка не сохранена. Введенные данные будут потеряны.';

  constructor(
    private cardsFacade: CardsFacade,
    private skillsFacade: SkillsFacade,
    public dialog: MatDialog,
    private popupService: PopupsService) {
    this.cardsFacade.loadCards();
  }

  public changeSelectedCardId(id: number, card: Card): void {
    this.cardsFacade.changeSelectedCardId(id);
    if (id !== 100) {
      this.skillsFacade.checkSkills(card);
    }
    this.isCreator = id === 100;
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

  // public setSelectedCardBody(card: Card, isCreator: boolean): void {
  //   // this.isItEditor = !isCreator;
  //   // this.cardDetailTitle = this.isItEditor ? 'Edit' : 'Create new';
  //   // this.skillsFacade.checkSkills(card);

  //   // if (card === this.templCard) {
  //   //   card.id = this.newCardID() + 1;
  //   //   // this.cardsFacade.changeSelectedCard(JSON.parse(JSON.stringify(card)));
  //   //   return;
  //   // }
  //   // this.cardsFacade.changeSelectedCard(card);
  // }


  // private wasChangedSelectedCard(whichCard: string, isJustSaved: boolean): void {
  //   this.allCardsMy$.subscribe(
  //     (cards) => {
  //       let cardNumber: number;
  //       if (cards.length === 0) {
  //         this.setSelectedCard(this.templCard, true, isJustSaved);
  //         return;
  //       } else {
  //         if (whichCard === 'first') {
  //           cardNumber = 0;
  //         } else if ( whichCard === 'last') {
  //           cardNumber = cards.length - 1;
  //         }
  //         this.setSelectedCard(cards[cardNumber], false, isJustSaved);
  //       }
  //     }).unsubscribe();
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

  // private openDialog(card: Card, isCreator: boolean): void {
  //   const dialogRef = this.dialog.open(MaterialDialogComponent, {
  //     width: '500px',
  //     data: {title: this.title, text: this.text}
  //   });

  //   const dialogSubscribtion = dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.setSelectedCardBody(card, isCreator);
  //     }
  //     dialogSubscribtion.unsubscribe();
  //   });
  // }

  ngOnInit(): void {
  }

}

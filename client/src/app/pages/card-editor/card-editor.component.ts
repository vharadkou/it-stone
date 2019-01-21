import { Component, OnInit } from '@angular/core';

import { Card, Skill } from 'models';
import { CardsFacade, SkillsFacade } from 'store';
import { MatDialog } from '@angular/material';
import { MaterialDialogComponent } from 'app/components/material-dialog/material-dialog.component';

@Component({
  selector: 'app-card-editor',
  templateUrl: './card-editor.component.html',
  styleUrls: ['./card-editor.component.scss']
})
export class CardEditorComponent implements OnInit {

  public isItEditor: boolean = false;
  public allCardsMy$ = this.cardsFacade.myCards$;
  public selectedCard$ = this.cardsFacade.selectedCard$;
  public cardDetailTitle: string;
  public checkedSkills: Skill[];
  public title = 'Данные не сохранены.';
  public text = 'Новая карточка не сохранена. Введенные данные будут потеряны.';
  public templCard: Card = {
    id: 10,
    name: "Name",
    surname: "Surname",
    image: "http://simpleicon.com/wp-content/uploads/user1.png",
    skills: [],
    hp: 0,
    damage: 0
  }

  constructor(private cardsFacade: CardsFacade, private skillsFacade: SkillsFacade, public dialog: MatDialog) {
    this.cardsFacade.loadCards();
  }

  public setSelectedCard(card: Card, isCreator: boolean, isJustSaved: boolean): void {

    if (!isJustSaved
      && this.selectedCard$
      && !isCreator
      && !this.isItEditor
      && this.objectsCompare(this.selectedCard$, this.templCard)
      ) {
      this.openDialog(card, isCreator);
    } else {
      this.setSelectedCardBody(card, isCreator);
    }
  }

  public setSelectedCardBody(card: Card, isCreator: boolean) {
    this.isItEditor = !isCreator;
    this.cardDetailTitle = this.isItEditor ? 'Edit' : 'Create new';
    this.checkSkills(card);

    if (card === this.templCard) {
      card.id = this.newCardID() + 1;
      this.cardsFacade.changeSelectedCard(JSON.parse(JSON.stringify(card)));
      return;
    }
    this.cardsFacade.changeSelectedCard(card);
  }

  public checkSkills(card) {
    let cardSkills: string[] = card.skills;
    let result: Skill[];
    this.skillsFacade.allSkills$.subscribe((skills) => {
      result = skills;
      this.checkedSkills = result.filter((skill) => {
        return cardSkills.indexOf(skill.name) !== -1;
      });
    }).unsubscribe();
  }

  private newCardID(): number {
    let maxId: number = 0;
    this.allCardsMy$.forEach((item) => {
      for (let i = 0; i < item.length; i++) {
        maxId = item[i].id > maxId ? item[i].id : maxId;
      }
    })
    return maxId;
  }

  private wasChangedSelectedCard(whichCard, isJustSaved: boolean): void {
    this.allCardsMy$.subscribe(
      (cards) => {
        if (cards.length === 0) {
          this.setSelectedCard(this.templCard, true, isJustSaved);
          return;
        } else {
          if (whichCard === 'first') {
            whichCard = 0;
          } else if ( whichCard === 'last') {
            whichCard = cards.length - 1;
          }
          this.setSelectedCard(cards[whichCard], false, isJustSaved);
        }
      }).unsubscribe();
  }

  private objectsCompare(obsCard, card2: Card): boolean {
    let result: boolean;
    obsCard.subscribe((card1) => {
      result = card1.name === card2.name
      && card1.surname === card2.surname
      && card1.image === card2.image
      && JSON.stringify(card1.skills) === JSON.stringify(card2.skills)
      && card1.hp === card2.hp
      && card1.damage === card2.damage;
    }).unsubscribe();
    return !result;
  }

  private openDialog(card: Card, isCreator: boolean): void {
    const dialogRef = this.dialog.open(MaterialDialogComponent, {
      width: '500px',
      data: {title: this.title, text: this.text}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.setSelectedCardBody(card, isCreator);
      }
    });
  }

  ngOnInit() {
    this.wasChangedSelectedCard('first', false);
  };

}

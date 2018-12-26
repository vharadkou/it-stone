import { Component, OnInit } from '@angular/core';

import { Card, Skill } from 'models';
import { CardsFacade, SkillsFacade } from 'store';

@Component({
  selector: 'app-card-editor',
  templateUrl: './card-editor.component.html',
  styleUrls: ['./card-editor.component.scss']
})
export class CardEditorComponent implements OnInit {

  public isItEditor: boolean;
  public allCardsMy$ = this.cardsFacade.myCards$;
  public selectedCard: Card;
  public cardDetailTitle: string;
  public checkedSkills: Skill[];
  public templCard: Card = {
    id: 10,
    name: "Name",
    surname: "Surname",
    image: "http://simpleicon.com/wp-content/uploads/user1.png",
    skills: [],
    hp: 0,
    damage: 0
  }

  constructor(private cardsFacade: CardsFacade, private skillsFacade: SkillsFacade) {
    this.cardsFacade.loadCards();
  }

  public setSelectedCard(card: Card, isCreator: boolean): void {

    if (this.selectedCard && !isCreator && !this.isItEditor && this.objectsCompare(this.selectedCard, this.templCard)) {
      if (!confirm('Карточка не сохранена. Точно не хочешь сохранить изменения?')) {
        return;
      }
    }
    this.isItEditor = !isCreator;
    this.cardDetailTitle = this.isItEditor ? 'Edit' : 'Create new';
    this.checkSkills(card);

    if (card === this.templCard) {
      this.selectedCard = JSON.parse(JSON.stringify(card));
      this.selectedCard.id = this.newCardID() + 1;
      return;
    }
    this.selectedCard = card;
  }

  public checkSkills(card) {
    let cardSkills: string[] = card.skills;
    let result: Skill[];
    this.skillsFacade.allSkills$.subscribe((skills) => {
      result = skills;
      this.checkedSkills = result.filter((skill) => {
        return cardSkills.indexOf(skill.name) !== -1;
      });
    });
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

  private changeSelectedToFirst(): void {
    let xxx = this.allCardsMy$.subscribe(
      (cards) => {
        if (cards.length === 0) {
          this.setSelectedCard(this.templCard, true);
          return;
        } else {
          this.setSelectedCard(cards[0], false);
        }
      });
    setTimeout(() => {
      xxx.unsubscribe();
    }, 500);
  }

  private objectsCompare(card1: Card, card2: Card): boolean {
    return !(card1.name === card2.name
      && card1.surname === card2.surname
      && card1.image === card2.image
      && JSON.stringify(card1.skills) === JSON.stringify(card2.skills)
      && card1.hp === card2.hp
      && card1.damage === card2.damage);
  }

  ngOnInit() {
    this.changeSelectedToFirst();
  };

}

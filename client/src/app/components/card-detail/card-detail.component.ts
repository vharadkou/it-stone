import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { Card, Skill } from 'models';
import { CardsFacade, SkillsFacade } from 'store';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {
  @Input() public checkedSkills: Skill[];
  @Input() public card: Card;
  @Input() public selectedCardId: number;

  public skills = new FormControl();
  public skillsList$: Observable<Skill[]> = this.skillsFacade.allSkills$;

  public popupTitle = 'Удаление карточки.';
  public popupText = 'Карточка будет безвозвратно удалена. Вы уверены?';

  constructor(
    private skillsFacade: SkillsFacade,
    private cardsFacade: CardsFacade
  ) {
    this.skillsFacade.loadSkills();
  }

  public deleteCard(id: number): void {
    this.cardsFacade.deleteCard(id);
  }

  public createCard(card: Card): void {
    this.cardsFacade.uploadCard(card);
  }

  private showPopup(): void {
    this.cardsFacade.showPopup(this.popupTitle, this.popupText, this.card.id);
  }

  private addSkillsToCard(card: Card): void {
    if (this.checkedSkills) {
      card.skills = [];
      this.checkedSkills.forEach((skillObj: Skill) => {
        card.skills.push(skillObj.name);
      });
    }
    // else if (card.skills.length !== 0) {
    //   this.skillsFacade.checkSkills(card);
    // } 
    else {
      card.skills = [];
    }
  }

  ngOnInit(): void {
  }

}

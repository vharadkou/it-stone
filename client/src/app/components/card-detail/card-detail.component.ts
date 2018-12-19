import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { Card, Skill } from 'models';
import { SkillsFacade, CardsFacade } from 'store';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {
  @Input() public card: Card;
  @Input() public isCreator: boolean;
  @Input() public cardDetailTitle: string;
  @Input() public checkedSkills: Skill[];
  @Output() public wasRemovedCard: EventEmitter<void> = new EventEmitter();
  @Output() public wasAddedCard: EventEmitter<void> = new EventEmitter();

  public skills = new FormControl();
  public skillsList$: Observable<Skill[]> = this.skillsFacade.allSkills$;

  constructor(private skillsFacade: SkillsFacade, private cardsFacade: CardsFacade) {
    this.skillsFacade.loadSkills();
  }

  public deleteCard(id: number): void {
    this.cardsFacade.deleteCard(id);
    this.wasRemovedCard.emit();
  }

  public createCard(card: Card): void {
    if (!this.isCreator) {
      this.addSkillsToCard(card);
      this.cardsFacade.uploadCard(card);
      this.wasAddedCard.emit();
    }
  }

  private addSkillsToCard(card: Card): void {
    if (this.checkedSkills) {
      card.skills = [];
      this.checkedSkills.forEach((skillObj: Skill) => {
        card.skills.push(skillObj.name);
      })
    } else {
      card.skills = [];
    }
  }

  ngOnInit() {
  }

}

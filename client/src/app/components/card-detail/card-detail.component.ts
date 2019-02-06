import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { Observable } from 'rxjs';

import { Card, Skill } from 'models';
import { CardsFacade, SkillsFacade } from 'store';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnChanges {
  @Input() public checkedSkills: Skill[];
  @Input() public card: Card;
  @Input() public selectedCardId: number;
  @ViewChild('form') public form: NgForm;

  public skills = new FormControl();
  public skillsList$: Observable<Skill[]> = this.skillsFacade.allSkills$;

  public popupTitle = 'Delete card.';
  public popupText = 'Card will be permanently deleted. Are you sure?';

  constructor(
    private skillsFacade: SkillsFacade,
    private cardsFacade: CardsFacade
  ) {
    this.skillsFacade.loadSkills();
  }

  public createCard(card: Card): void {
    this.cardsFacade.uploadCard(card);
  }

  public showDeleteCardPopup(): void {
    this.cardsFacade.showDeleteCardPopup(this.popupTitle, this.popupText, this.card.id);
  }

  public addSkillsToCard(card: Card): void {
    this.form.form.markAsDirty();
    card.skills = this.checkedSkills.map(skillObj => skillObj.name);
  }

  public ngOnChanges(): void {
    this.form.form.markAsPristine();
  }

}

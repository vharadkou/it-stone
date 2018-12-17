import { Component, OnInit, Input } from '@angular/core';
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
  @Input() card: Card;
  @Input() public isCreator: boolean;

  public skills = new FormControl();
  public skillsList$: Observable<Skill[]> = this.skillsFacade.allSkills$;

  constructor( private skillsFacade: SkillsFacade, private cardsFacade: CardsFacade) {
    this.skillsFacade.loadSkills();
  }

  public deleteCard(id) {
    this.cardsFacade.deleteCard(id);
  }

  public createCard(card) {
    console.log(card);
    this.cardsFacade.uploadCard(card);
  }

  ngOnInit() {
    console.log(this.isCreator);
  }

}

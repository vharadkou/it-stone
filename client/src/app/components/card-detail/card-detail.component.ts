import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'models';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {
  @Input() card: Card;

  public toppings = new FormControl();
  public toppingList: string[] = ['QA', 'JS', '.NET', 'Java', 'TA'];           //['QA', 'JS', '.NET', 'Java', 'TA'] / this.card.skills

  constructor() { }

  setSkills(skills) {
    console.log(this.card.skills);
    this.card.skills = skills.split(',');
    console.log(this.card.skills);
  }

  ngOnInit() {
  }

}

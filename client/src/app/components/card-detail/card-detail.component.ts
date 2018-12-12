import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Card } from 'models';
import { SkillsService } from 'app/services/skills.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {
  @Input() card: Card;

  public skills = new FormControl();
  public skillsList: any;

  constructor(
    private skillsService: SkillsService) {
  }

  ngOnInit() {
    this.skillsService.getSkills()
      .subscribe((response) => {
        this.skillsList = response;
      }) 
  }

}

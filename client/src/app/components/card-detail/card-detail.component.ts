import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material';
import { MaterialDialogComponent } from 'app/components/material-dialog/material-dialog.component';
import { Card, Skill } from 'models';
import { CardsFacade, SkillsFacade } from 'store';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {
  @Input() public card: Card;
  @Input() public isEditor: boolean;
  @Input() public cardDetailTitle: string;
  @Input() public checkedSkills: Skill[];
  @Output() public wasRemovedCard: EventEmitter<void> = new EventEmitter();
  @Output() public wasAddedCard: EventEmitter<void> = new EventEmitter();

  public skills = new FormControl();
  public skillsList$: Observable<Skill[]> = this.skillsFacade.allSkills$;
  public title = 'Удаление карточки.';
  public text = 'Карточка будет безвозвратно удалена. Вы уверены?';

  constructor(private skillsFacade: SkillsFacade, private cardsFacade: CardsFacade, public dialog: MatDialog) {
    this.skillsFacade.loadSkills();
  }

  public deleteCard(id: number): void {
      this.cardsFacade.deleteCard(id);
      this.wasRemovedCard.emit();
  }

  public createCard(card: Card): void {
    if (!this.isEditor) {
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
      });
    } else {
      card.skills = [];
    }
  }

  private openDialog(id: number): void {
    const dialogRef = this.dialog.open(MaterialDialogComponent, {
      width: '500px',
      data: {title: this.title, text: this.text}
    });

    const dialogSubscribtion = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteCard(id);
      }
      dialogSubscribtion.unsubscribe();
    });
  }

  ngOnInit(): void {}

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

// import { MatDialog } from '@angular/material';
// import { MaterialDialogComponent } from 'app/components/material-dialog/material-dialog.component';
import { Card, Skill } from 'models';
import { CardsFacade, SkillsFacade } from 'store';
import { PopupsService } from 'app/services/popups.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {
  @Input() public checkedSkills: Skill[];
  @Input() public card: Card;
  @Input() public isCreator: boolean;
  @Output() public changedIsCreator: EventEmitter<boolean> = new EventEmitter();

  public skills = new FormControl();
  public skillsList$: Observable<Skill[]> = this.skillsFacade.allSkills$;
  public allCardsMy$ = this.cardsFacade.myCards$;

  public popupTitle = 'Удаление карточки.';
  public popupText = 'Карточка будет безвозвратно удалена. Вы уверены?';

  constructor(private skillsFacade: SkillsFacade, private cardsFacade: CardsFacade, private popupService: PopupsService) {
    this.skillsFacade.loadSkills();
  }

  public deleteCard(id: number): void {
      this.cardsFacade.deleteCard(id);
      this.allCardsMy$.subscribe((cards) => {
        if (!cards[0]) {
          this.changedIsCreator.emit(true);
        }
      }).unsubscribe();
  }

  public createCard(card: Card): void {
      // this.addSkillsToCard(card);
      this.cardsFacade.uploadCard(card);
      this.changedIsCreator.emit(false);
  }

  // private popupDeleteCard(id, popupTitle, popupText) {
  //   this.popupService.openDialog(popupTitle, popupText);
  //   if (this.popupService.isAccept) {
  //     this.deleteCard(id);
  //   }
  // }

  // private addSkillsToCard(card: Card): void {
  //   if (this.checkedSkills) {
  //     card.skills = [];
  //     this.checkedSkills.forEach((skillObj: Skill) => {
  //       card.skills.push(skillObj.name);
  //     });
  //   } else {
  //     card.skills = [];
  //   }
  // }

  ngOnInit(): void {}

}

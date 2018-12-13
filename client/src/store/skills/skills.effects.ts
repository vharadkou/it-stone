import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Skill } from 'models';

import { SkillsService } from 'app/services/skills.service';

import * as skillActions from './skills.action';

@Injectable()
export class SkillsEffects {

  @Effect() public getSkills$: Observable<Action> = this.actions$.pipe(
    ofType<skillActions.LoadSkills>(skillActions.SkillsActionTypes.LoadSkills),
    switchMap((action: skillActions.LoadSkills) =>
      this.skillService.getSkills().pipe(
        map((data: Skill[]) => new skillActions.LoadSkillsSuccess(data)),
        catchError(error => of(new skillActions.LoadSkillsError(error)))
      )
    )
  );

  public constructor(private skillService: SkillsService, private actions$: Actions) { }
}

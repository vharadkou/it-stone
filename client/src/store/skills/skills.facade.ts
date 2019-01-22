import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SkillsState } from './interfaces';
import { skillsQuery } from './skills.selectors';

import { LoadSkills, CheckSkills } from './skills.action';
import { Card } from '../../models';

@Injectable()
export class SkillsFacade {
  public allSkills$ = this.store.select(skillsQuery.getSkills);
  public checkedSkills$ = this.store.select(skillsQuery.getCheckedSkills);

  public constructor(private store: Store<SkillsState>) {}

  public loadSkills(): void {
    this.store.dispatch(new LoadSkills());
  }

  public checkSkills(card: Card): void {
    this.store.dispatch(new CheckSkills({ card }));
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SkillsState } from './interfaces';
import { skillsQuery } from './skills.selectors';

import { LoadSkills } from './skills.action';

@Injectable()
export class SkillsFacade {
  public allSkills$ = this.store.select(skillsQuery.getSkills);

  public constructor(private store: Store<SkillsState>) {}

  public loadSkills(): void {
    this.store.dispatch(new LoadSkills());
  }
}

import { Action } from '@ngrx/store';
import { Hero } from 'models';

export enum HeroActionTypes {
  LoadHero = '[Hero] Load Hero',
  LoadHeroSuccess = '[Hero] Load Hero (Success)',
  LoadHeroError = '[Hero] Load Hero (Error)',
  SelectHero = '[Hero] Select Hero'
}

export class LoadHero implements Action {
  public readonly type = HeroActionTypes.LoadHero;
}


export class LoadHeroSuccess implements Action {
  public readonly type = HeroActionTypes.LoadHeroSuccess;

  constructor(public payload: Hero[]) { }
}

export class LoadHeroError implements Action {
  public readonly type = HeroActionTypes.LoadHeroError;

  constructor(public payload: Error) { }
}

export class SelectHero implements Action {
  public readonly type = HeroActionTypes.SelectHero;

  constructor(public payload: number) { }
}
// new SelectHero(1)
export type HeroActions =  LoadHero | LoadHeroSuccess | LoadHeroError | SelectHero;

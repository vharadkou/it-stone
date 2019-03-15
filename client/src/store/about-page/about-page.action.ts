import { Action } from '@ngrx/store';

import { AboutCard } from 'models';

export enum AboutPageActionTypes {
  LoadAboutCards = '[aboutCards] Load About Cards',
  LoadAboutCardsSuccess = '[aboutCards] Load About Cards (Success)',
  LoadAboutCardsError = '[aboutCards] Load About Cards (Error)'
}

export class LoadAboutCards implements Action {
  public readonly type = AboutPageActionTypes.LoadAboutCards;
}

export class LoadAboutCardsSuccess implements Action {
  public readonly type = AboutPageActionTypes.LoadAboutCardsSuccess;

  constructor(public payload: AboutCard[]) { }
}

export class LoadAboutCardsError implements Action {
  public readonly type = AboutPageActionTypes.LoadAboutCardsError;

  constructor(public payload: Error) { }
}

export type AboutPageActions =
  | LoadAboutCards
  | LoadAboutCardsSuccess
  | LoadAboutCardsError;

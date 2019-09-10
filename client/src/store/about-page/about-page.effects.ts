import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AboutCard} from 'models';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take } from 'rxjs/operators';
import { AboutPageFacade } from './about-page.facade';

import * as aboutPageActions from './about-page.action';

import { baseUrl } from 'constants/baseUrl'

@Injectable()
export class AboutPageEffects {

  baseUrl = `${baseUrl}/api/get-about-cards/`;
  mockUrl = "http://www.mocky.io/v2/5c81021a3100006a12771cd5";

  @Effect() public getAboutCards$: Observable<Action> = this.actions$.pipe(
    ofType<aboutPageActions.LoadAboutCards>(aboutPageActions.AboutPageActionTypes.LoadAboutCards),
    switchMap((action: aboutPageActions.LoadAboutCards) =>
      this.http.get(this.mockUrl).pipe(                                                           
        map((data: AboutCard[]) => new aboutPageActions.LoadAboutCardsSuccess(data)),
        catchError(error => of(new aboutPageActions.LoadAboutCardsError(error)))
      )
    )
  );

  public constructor(
    private http: HttpClient,
    private actions$: Actions,
    private cardsFacade: AboutPageFacade
  ) { }
}

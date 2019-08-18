import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Hero} from 'models';
import { catchError, filter, map, switchMap, take } from 'rxjs/operators';
import { HeroFacade } from './hero.facade';
import {HeroActionTypes, HeroActions, LoadHeroSuccess} from './hero.action';
import { baseUrl } from 'constants/baseUrl'
import { HeroState } from '.';
export { AccountService } from '../../app/services/account.service'

import { LoadHeroError } from 'store/hero';

@Injectable()
export class HeroEffects {
    // mockUrl = "http://www.mocky.io/v2/5d6665013300004d00449c5b";

    // constructor(private actions$: Actions, private HeroServise: HeroService, private http: HttpClient,) { }

    // // для объявления эффекта мы используем декоратор @Effect
    // @Effect()
    // public loadHeroes$: Observable<Action> = this.actions$.pipe(
    //     // отфильтруем все действия '[Customers Page] Get'
    //     ofType(HeroActionTypes.LoadHero),
    //     // стартуем новый асинхронный поток на каждое значение
    //     switchMap(() =>
    //         // вызов внешнего сервиса
    //         this.http.get(this.mockUrl).pipe(    
    //             // возвращаем GetCustomersSuccess в случае успеха
    //             map ((hero: Hero[]) => new LoadHeroSuccess(hero)),
    //             // возвращаем GetCustomersFailed в случае ошибки
    //             catchError(error => of(new LoadHeroError(error))),
    //         ),
    //     ),
    // );
}

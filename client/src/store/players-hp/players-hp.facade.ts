import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { PlayersHPState } from './interfaces';
import { playersHPQuery } from './players-hp.selectors';

import {
    IncreaseMyHP,
    DecreaseMyHP,
    DecreaseEnemyHP,
    IncreaseEnemyHP
} from './players-hp.action';

@Injectable()
export class PlayersHPfacade {
    public myHp$ = this.store.select(playersHPQuery.GetMyHp);
    public enemeHp$ = this.store.select(playersHPQuery.GetEnemyHp);

    constructor( private store: Store<PlayersHPState>){ }

    public increaseMyHp(heal: number): void {
        this.store.dispatch(new IncreaseMyHP({ heal }));
    }

    public decreaseMyHp(damage: number): void {
        this.store.dispatch(new DecreaseMyHP({ damage }));
    }

    public increaseEnemyHp(heal: number): void {
        this.store.dispatch(new IncreaseEnemyHP({ heal }));
    }

    public decreaseEnemyHp(damage: number): void {
        this.store.dispatch(new DecreaseEnemyHP({ damage }));
    }
}

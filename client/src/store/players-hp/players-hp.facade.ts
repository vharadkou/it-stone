import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { PlayersHPState } from './interfaces';
import { playersHPQuery } from './players-hp.selectors';

import {
    IncreaseMyHP,
    DecreaseMyHP,
    DecreaseEnemyHP,
    IncreaseEnemyHP,
    GetPlayersHP
} from './players-hp.action';

@Injectable()
export class PlayersHPFacade {
    public myHp$ = this.store.select(playersHPQuery.getMyHp);
    public enemyHp$ = this.store.select(playersHPQuery.getEnemyHp);

    constructor( private store: Store<PlayersHPState>){ }

    /* public getPlayersHP(): void {
        console.log(playersHPQuery.getMyHp);
        this.store.dispatch(new GetPlayersHP());
    } */

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

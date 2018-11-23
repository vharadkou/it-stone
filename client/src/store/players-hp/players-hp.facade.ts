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
    public myHP$ = this.store.select(playersHPQuery.getMyHP);
    public enemyHP$ = this.store.select(playersHPQuery.getEnemyHP);

    constructor( private store: Store<PlayersHPState>){ }

    public getPlayersHP(data: PlayersHPState): void {
        this.store.dispatch(new GetPlayersHP({
            myHP: data.myHP,
            enemyHP: data.enemyHP
        }));
    }

    public increaseMyHP(heal: number): void {
        this.store.dispatch(new IncreaseMyHP({ heal }));
    }

    public decreaseMyHP(damage: number): void {
        this.store.dispatch(new DecreaseMyHP({ damage }));
    }

    public increaseEnemyHP(heal: number): void {
        this.store.dispatch(new IncreaseEnemyHP({ heal }));
    }

    public decreaseEnemyHP(damage: number): void {
        this.store.dispatch(new DecreaseEnemyHP({ damage }));
    }
}

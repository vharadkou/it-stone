import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { PlayersHPState } from './interfaces';
import { playersHPQuery } from './players-hp.selectors';

import {
    IncreaseMyHP,
    DecreaseMyHP,
    DecreaseEnemyHP,
    IncreaseEnemyHP,
    LoadPlayersHP
} from './players-hp.action';

@Injectable()
export class PlayersHPFacade {
    public myHP$ = this.store.select(playersHPQuery.loadMyHP);
    public enemyHP$ = this.store.select(playersHPQuery.loadEnemyHP);

    constructor( private store: Store<PlayersHPState>){ }

    public loadPlayersHP(data: PlayersHPState): void {
        this.store.dispatch(new LoadPlayersHP({
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

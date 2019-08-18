 import { PlayersInfoState } from './interfaces';
import { LoadPlayerInfo } from './players-info.action';
import { playersInfoQuery } from './players-info.selector';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class PlayersInfoFacade {

    public playersInfo$ = this.store.select(playersInfoQuery.getPlayersInfo);

    public constructor (private store: Store<PlayersInfoState>){}

    public loadPlayerInfo(): void{
        this.store.dispatch(new LoadPlayerInfo());
    }
   
}
 
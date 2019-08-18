import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadHero } from './hero.action';
import { HeroesQuery } from './hero.selectors';
import { HeroState } from './interfaces';

@Injectable()
export class HeroFacade {
    
    public heroes$ = this.store.select(HeroesQuery.selectAllHeroes);
    public constructor(private store: Store<HeroState>) { }
    public loadHero(): void {
        this.store.dispatch(new LoadHero());
    }
}


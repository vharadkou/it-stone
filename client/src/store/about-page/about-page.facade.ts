import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { LoadAboutCards } from './about-page.action';
import { aboutCardsQuery } from './about-page.selectors';
import { AboutPageState } from './interfaces';

@Injectable()
export class AboutPageFacade {
  public allAboutCards$ = this.store.select(aboutCardsQuery.getAboutCards);

  public constructor(private store: Store<AboutPageState>) { }

  public loadAboutCards(): void {
    this.store.dispatch(new LoadAboutCards());
  }
}

import { baseUrl } from 'constants/baseUrl';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { PopupsService } from 'app/services/popups.service';
import { Card } from 'models';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, delay } from 'rxjs/operators';
import { CardsFacade } from 'store/cards/cards.facade';
import {GameStatus} from '../../models'
import * as skillsActions from '../skills/skills.action';

import * as cardActions from './cards.action';
import * as gameProcessActions from '../game-process/game-process.action';

@Injectable()
export class CardsEffects {
  public resultAction: Action;

public temporaryData:Card[] =[

  {
    _id: '11111111',
    class: 'Tester',
    id: 1,
    name: 'Petr',
    surname: 'Petrov',
    image: 'http://simpleicon.com/wp-content/uploads/user1.png',
    skills: [],
    hp: 1,
    damage: 2,
    manaCost: 1,
    effects: {disableWhenSpellInUse: false}
  },

  {
    _id: '2222222',
    class: 'Tester',
    id: 2,
    name: 'Ivan',
    surname: 'Petrov',
    image: 'http://simpleicon.com/wp-content/uploads/user1.png',
    skills: [],
    hp: 1,
    damage: 2,
    manaCost: 1,
    effects: {disableWhenSpellInUse: false}
  },
  {
    _id: '3333333',
    class: 'Tester',
    id: 3,
    name: 'Victor',
    surname: 'Petrov',
    image: 'http://simpleicon.com/wp-content/uploads/user1.png',
    skills: [],
    hp: 1,
    damage: 2,
    manaCost: 1,
    effects: {disableWhenSpellInUse: false}
  },
  {
    _id: '4444444',
    class: 'Business Analyst',
    id: 4,
    name: 'Sergey',
    surname: 'Zaitsev',
    image: 'http://simpleicon.com/wp-content/uploads/user1.png',
    skills: ['Good requirements', 'Give you one more card to hand'],
    hp: 1,
    damage: 1,
    manaCost: 2,
    effects: {disableWhenSpellInUse: false}
  },
  {
    _id: '5555555',
    class: 'Business Analyst',
    id: 5,
    name: 'Sasha',
    surname: 'Zaitsev',
    image: 'http://simpleicon.com/wp-content/uploads/user1.png',
    skills: ['Good requirements'],
    hp: 1,
    damage: 1,
    manaCost: 2,
    effects: {disableWhenSpellInUse: false}
  },
  {
    _id: '6666666',
    class: 'HR',
    id: 6,
    name: 'Masha',
    surname: 'Ivanova',
    image: 'http://simpleicon.com/wp-content/uploads/user1.png',
    skills: ['Teambuilding', 'Give all your minions at the table +1 atack'],
    hp: 2,
    damage: 2,
    manaCost: 3,
    effects: {disableWhenSpellInUse: false}
  },
  {
    _id: '7777777',
    class: 'Junior Developer',
    id: 7,
    name: 'Tania',
    surname: 'Sidorova',
    image: 'http://simpleicon.com/wp-content/uploads/user1.png',
    skills: ['Motivation', 'Minion can atack immediately'],
    hp: 1,
    damage: 2,
    manaCost: 1,
    effects: {disableWhenSpellInUse: false}
  },
  {
    _id: '8888888',
    class: 'Junior Developer',
    id: 8,
    name: 'Valera',
    surname: 'Smirnov',
    image: 'http://simpleicon.com/wp-content/uploads/user1.png',
    skills: ['Motivation', 'Minion can atack immediately'],
    hp: 1,
    damage: 2,
    manaCost: 1,
    effects: {disableWhenSpellInUse: false}
  },
  {
    _id: '9999999',
    class: 'Middle Developer',
    id: 9,
    name: 'Lesha',
    surname: 'Gerasimov',
    image: 'http://simpleicon.com/wp-content/uploads/user1.png',
    skills: ['Motivation', 'Minion can atack immediately'],
    hp: 2,
    damage: 3,
    manaCost: 2,
    effects: {disableWhenSpellInUse: false}
  },
  {
    _id: '101010',
    class: 'Middle Developer',
    id: 10,
    name: 'Pasha',
    surname: 'Gerasimov',
    image: 'http://simpleicon.com/wp-content/uploads/user1.png',
    skills: ['Motivation', 'Minion can atack immediately'],
    hp: 2,
    damage: 3,
    manaCost: 2,
    effects: {disableWhenSpellInUse: false}
  },
  {
    _id: '121212',
    class: 'Senior Developer',
    id: 11,
    name: 'Dasha',
    surname: 'Galanova',
    image: 'http://simpleicon.com/wp-content/uploads/user1.png',
    skills: ['Take responsibility', 'When minion at the table your hero can not be attacked'],
    hp: 5,
    damage: 3,
    manaCost: 4,
    effects: {disableWhenSpellInUse: false}
  },
  {
    _id: '131313',
    class: 'Senior Developer',
    id: 12,
    name: 'Misha',
    surname: 'Stukalov',
    image: 'http://simpleicon.com/wp-content/uploads/user1.png',
    skills: ['Take responsibility', 'When minion at the table your hero can not be attacked'],
    hp: 5,
    damage: 3,
    manaCost: 4,
    effects: {disableWhenSpellInUse: false}
  },
  {
    _id: '141414',
    class: 'Data Scientist',
    id: 13,
    name: 'Yo',
    surname: 'Chen',
    image: 'http://simpleicon.com/wp-content/uploads/user1.png',
    skills: ['Teach a neural net', 'Automatically deals damage for 3 hp to enemy hero '],
    hp: 4,
    damage: 4,
    manaCost: 4,
    effects: {disableWhenSpellInUse: false}
  },
  {
    _id: '151515',
    class: 'CTO',
    id: 14,
    name: 'John',
    surname: 'Stivenson',
    image: 'http://simpleicon.com/wp-content/uploads/user1.png',
    skills: [],
    hp: 7,
    damage: 6,
    manaCost: 5,
    effects: {disableWhenSpellInUse: false}
  },
  {
    _id: '161616',
    class: 'Spell',
    id: 15,
    name: 'Customer did not accept!!',
    surname: '',
    image: 'http://simpleicon.com/wp-content/uploads/user1.png',
    skills: [],
    hp: null,
    damage: 6,
    manaCost: 4,
    effects: {disableWhenSpellInUse: false}
  },
  {
    _id: '181818',
    class: 'HR',
    id: 17,
    name: 'Ira',
    surname: 'Chiz',
    image: 'http://simpleicon.com/wp-content/uploads/user1.png',
    skills: ['Teambuilding', 'Give all your minions at the table +1 atack'],
    hp: 2,
    damage: 2,
    manaCost: 3,
    effects: {disableWhenSpellInUse: false}
  },
  {
    _id: '191919',
    class: 'Spell',
    id: 18,
    name: 'Crush by experience',
    surname: '',
    image: 'http://simpleicon.com/wp-content/uploads/user1.png',
    skills: ['Cast a spell','Turns any enemy minion to a ship with 1 hp and 1 attack'],
    hp: null,
    damage: null,
    manaCost: 4,
    effects: {disableWhenSpellInUse: false}
  },
  {
    _id: '191919',
    class: 'Spell',
    id: 16,
    name: 'Cruch by experience',
    surname: '',
    image: 'http://simpleicon.com/wp-content/uploads/user1.png',
    skills: ['Cast a spell','Turns any enemy minion to a ship with 1 hp and 1 attack'],
    hp: null,
    damage: null,
    manaCost: 4,
    effects: {disableWhenSpellInUse: false}
  },

  {
    _id: '202020',
    class: 'Spell',
    id: 19,
    name: 'Budget agreed!',
    surname: '',
    image: 'http://simpleicon.com/wp-content/uploads/user1.png',
    skills: ['Cast a spell','Gives you two additional cards from deck'],
    hp: null,
    damage: null,
    manaCost: 3,
    effects: {disableWhenSpellInUse: false}
  },

  {
    _id: '212121',
    class: 'Spell',
    id: 20,
    name: 'Budget agreed!',
    surname: '',
    image: 'http://simpleicon.com/wp-content/uploads/user1.png',
    skills: ['Cast a spell','Gives you two additional cards from deck'],
    hp: null,
    damage: null,
    manaCost: 3,
    effects: {disableWhenSpellInUse: false}
  }

]

public myFirstMoveVariants = [true, false]   //just a temporary mock 




  @Effect() public getCards$: Observable<any> = this.actions$.pipe(
    ofType<cardActions.LoadCards>(cardActions.CardsActionTypes.LoadCards),
    switchMap((action: cardActions.LoadCards) => ([
     // this.http.get(`${baseUrl}/api/get-cards/`).pipe(
      //  switchMap((data: Card[]) => [        
         new gameProcessActions.StartGameSuccess({status: GameStatus.Start, myFirstMove: this.shuffle(this.myFirstMoveVariants)}), //just a temporary mock 
         new cardActions.LoadCardsSuccess(this.shuffle(this.temporaryData)) //just a temporary mock 
        ]),
     //   catchError(error => of(new cardActions.LoadCardsError(error)))
      )
    
  );

  @Effect() public deleteCard$: Observable<Action> = this.actions$.pipe(
    ofType<cardActions.DeleteCard>(cardActions.CardsActionTypes.DeleteCard),
    switchMap((action: cardActions.DeleteCard) => {
      return this.http.request('delete', `${baseUrl}/api/delete-card/`, {
        body: action.payload
      }).pipe(
          map(() => new cardActions.DeleteCardSuccess(action.payload)),
          catchError(error => of(new cardActions.DeleteCardError(error)))
        );
    })
  );

  @Effect() public ShowDeleteCardPopup$: Observable<Action> = this.actions$.pipe(
    ofType<cardActions.ShowDeleteCardPopup>(cardActions.CardsActionTypes.ShowDeleteCardPopup),
    switchMap((action: cardActions.ShowDeleteCardPopup) => {
      return this.popupsService
        .openDialog(action.payload.textContent).pipe(
          filter(result => result)
        ).pipe(map(() => new cardActions.DeleteCard(action.payload),
        ));
    })
  );

  @Effect() public uploadCard$: Observable<Action> = this.actions$.pipe(
    ofType<cardActions.UploadCard>(cardActions.CardsActionTypes.UploadCard),
    switchMap((action: cardActions.UploadCard) => {
      return this.http.post(`${baseUrl}/api/save-card/`, action.payload.card).pipe(
        map(() => new cardActions.UploadCardSuccess(action.payload)),
        catchError(error => of(new cardActions.UploadCardError(error)))
      );
    })
  );

  @Effect() public updateCard$: Observable<Action> = this.actions$.pipe(
    ofType<cardActions.UpdateCard>(cardActions.CardsActionTypes.UpdateCard),
    switchMap((action: cardActions.UpdateCard) => {
      return this.http.put(`${baseUrl}/api/update-card/`, action.payload.card).pipe(
        map(() => new cardActions.UpdateCardSuccess()),
        catchError(error => of(new cardActions.UpdateCardError(error)))
      );
    })
  );

  @Effect() public ShowNewCardPopup$: Observable<Action> = this.actions$.pipe(
    ofType<cardActions.ShowNewCardPopup>(cardActions.CardsActionTypes.ShowNewCardPopup),
    switchMap((action: cardActions.ShowNewCardPopup) => {
      return this.popupsService
        .openDialog(action.payload.textContent).pipe(
          filter(result => result)
        ).pipe(map(() => new cardActions.ChangeSelectedCardId(action.payload)
        ));
    })
  );

  @Effect() public changeSelectedCardId$: Observable<Action> = this.actions$.pipe(
    ofType<cardActions.ChangeSelectedCardId>(cardActions.CardsActionTypes.ChangeSelectedCardId),
    map(action => {
      if (action.payload.id !== 100) {
        return new skillsActions.CheckSkills(action.payload);
      } else {
        return new skillsActions.CheckSkills({});
      }
    })
  );

  @Effect() public checkNewCardDataLoss$: Observable<Action> = this.actions$.pipe(
    ofType<cardActions.CheckNewCardDataLoss>(cardActions.CardsActionTypes.CheckNewCardDataLoss),
    map(action => {
      if (action.payload.form.dirty && action.payload.card) {
        this.cardsFacade.selectedCardId$.pipe(take(1)).subscribe((result: number) => {
          if (result === 100) {
            this.resultAction = new cardActions.ShowNewCardPopup(action.payload);
          } else {
            this.resultAction = new cardActions.ChangeSelectedCardId(action.payload);
          }
        });
        return this.resultAction;
      } else {
        return new cardActions.ChangeSelectedCardId(action.payload);
      }
    })
  );

  public constructor(
    private http: HttpClient,
    private actions$: Actions,
    private popupsService: PopupsService,
    private cardsFacade: CardsFacade
  ) { }

  public shuffle(array) {
    var j, x, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    if (array.length === 2){
    return array[0];} else {
      return array;
    }
  }
}

import { Status, CardForStart } from 'models';

import { CardsState } from './interfaces';

export const initialState: CardsState = {
  status: Status.Init,
  cards: [],
  deck: [1, 2, 3],
  myCards: [],
  myCardsForChoosingAtStart:[],
  myCardsInHand: [],
  enemyCards: [],
  enemyActiveCards: [],
  enemyCardCount: 0,
  myActiveCards: [],
  selectedCardId: 1,
  templCard: {
    _id: '0000',
    class: 'Tester',
    id: 10,
    name: 'Name',
    surname: 'Surname',
    image: 'http://simpleicon.com/wp-content/uploads/user1.png',
    skills: [],
    hp: 0,
    damage: 0,
    manaCost: 5,
    effects: {},
  },
};

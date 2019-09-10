import { Card, Status, CardForStart } from 'models';

export interface CardsState {
  status: Status;
  cards: Card[];
  deck: number[];
  myCards: Card[];
  myCardsForChoosingAtStart?: CardForStart[];
  myCardsInHand?: Card[];
  enemyCards: Card[];
  myActiveCards: Card[];
  enemyActiveCards: Card[];
  enemyCardCount: number;
  selectedCardId: number;
  templCard: Card;
}

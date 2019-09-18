import { GameStatus, GameTurn, GameWin } from 'models';

import { GameProcessState } from './interfaces';

export const GameProcessInitialState: GameProcessState = {
  status: GameStatus.Wait,
  gameMoveNumber: 0,
  whooseTurn: GameTurn.NotChosen,
  timerOn: false,
  myHero: true, //create later
  whooseWin: GameWin.NotChosen,
  myFirstMove: false,
  myManaLimit: 0,
  myManaCurrentValue: 0,
  enemyManaLimit: 0,
  enemyManaCurrentValue: 0
};

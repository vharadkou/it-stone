import {GameStatus, GameTurn, GameWin } from 'models';

export interface GameProcessState {
  status: GameStatus;
  gameMoveNumber: number;
  whooseTurn: GameTurn;
  timerOn: boolean;
  myHero: any;  //create later
  whooseWin: GameWin;
  myFirstMove: boolean;
  myManaLimit: number;
  myManaCurrentValue: number;
  enemyManaLimit: number;
  enemyManaCurrentValue: number;
}
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { GameProcessState } from './interfaces';

const getGameProcessState = createFeatureSelector<GameProcessState>(
  'gameProcessState'
);

const GetStatus = (state: GameProcessState) => state.status;
const GetGameMoveNumber = (state: GameProcessState) => state.gameMoveNumber;
const GetWhooseTurn = (state: GameProcessState) => state.whooseTurn;
const GetTimerOn = (state: GameProcessState) => state.timerOn;
const GetMyHero = (state: GameProcessState) => state.myHero;
const GetWhooseWin = (state: GameProcessState) => state.whooseWin;
const GetmyFirstMove = (state: GameProcessState) => state.myFirstMove;
const GetMyManaLimit = (state: GameProcessState) => state.myManaLimit;
const GetMyManaCurrentValue = (state: GameProcessState) =>
  state.myManaCurrentValue;
const GetEnemyManaLimit = (state: GameProcessState) => state.enemyManaLimit;
const GetEnemyManaCurrentValue = (state: GameProcessState) =>
  state.enemyManaCurrentValue;

const getStatus = createSelector(
  getGameProcessState,
  GetStatus
);

const getGameMoveNumber = createSelector(
  getGameProcessState,
  GetGameMoveNumber
);

const getWhooseTurn = createSelector(
  getGameProcessState,
  GetWhooseTurn
);


const getTimerOn = createSelector(
  getGameProcessState,
  GetTimerOn
);

const getMyHero = createSelector(
  getGameProcessState,
  GetMyHero
);

const getWhooseWin = createSelector(
  getGameProcessState,
  GetWhooseWin
);

const getmyFirstMove = createSelector(
  getGameProcessState,
  GetmyFirstMove
);

const getMyManaLimit = createSelector(
  getGameProcessState,
  GetMyManaLimit
);

const getMyManaCurrentValue = createSelector(
  getGameProcessState,
  GetMyManaCurrentValue
);

const getEnemyManaLimit = createSelector(
  getGameProcessState,
  GetEnemyManaLimit
);

const getEnemyManaCurrentValue = createSelector(
  getGameProcessState,
  GetEnemyManaCurrentValue
);

export const gameProcessQuery = {
  getStatus,
  getGameMoveNumber,
  getWhooseTurn,
  getTimerOn,
  getMyHero,
  getWhooseWin,
  getmyFirstMove,
  getMyManaLimit,
  getMyManaCurrentValue,
  getEnemyManaLimit,
  getEnemyManaCurrentValue
};

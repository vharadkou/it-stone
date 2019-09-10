import { Action } from '@ngrx/store';
import {GameStatus,  GameTurn, GameWin  } from 'models';

export enum GameActionsTypes {
  StartGame = '[game-process]  Start Game Process',
  StartGameSuccess = '[game-process]  Start Game Process(Success)',
  StartGameError = '[game-process]  Start Game Process(Error)',
  StartMyMove = '[game-process] My Turn Is Start',
  EndMyMove = '[game-process] My Turn Is End',
  StartEnemyMove = '[game-process] Enemy Turn Is Start',
  EndEnemyMove = '[game-process] Enemy Turn Is End',
  StartTimer = '[game-process] Timer Start',
  StopTimer = '[game-process] Timer Stop',
  SetMyManaLimit = '[game-process] Set My Mana Limit',
  DecriseMyCurrentMana = '[game-process] Decrise My Current Mana Value',
  IncriseMyCurrentMana = '[game-process] Incrise My Current Mana Value',
  SetMoveNumber = '[game-process] Incrise My Current Mana Value',
  SetEnemyManaLimit = '[game-process] Set Number Of The Move',
  DecriseEnemyCurrentMana = '[game-process] Decrise Enemy Current Mana Value',
  IncriseEnemyCurrentMana = '[game-process] Incrise Enemy Current Mana Value',
  EndGame = '[game-process] End Game Process'
}

export class StartGame implements Action {
  public readonly type = GameActionsTypes.StartGame;

    constructor() {}
}

export class StartGameSuccess implements Action {
  public readonly type = GameActionsTypes.StartGameSuccess;

  constructor(public payload: {status: GameStatus, myFirstMove: boolean}) {}
}

export class StartGameError implements Action {
  public readonly type = GameActionsTypes.StartGameError;

  constructor(public payload: Error) {}
}

export class StartMyMove implements Action {
  public readonly type = GameActionsTypes.StartMyMove;
  
}

export class EndMyMove implements Action {
  public readonly type = GameActionsTypes.EndMyMove;

}

export class StartEnemyMove implements Action {
  public readonly type = GameActionsTypes.StartEnemyMove;

}

export class EndEnemyMove implements Action {
  public readonly type = GameActionsTypes.EndEnemyMove;

}

export class StartTimer implements Action {
  public readonly type = GameActionsTypes.StartTimer;

  constructor(public payload: boolean) {}
}

export class StopTimer implements Action {
  public readonly type = GameActionsTypes.StopTimer;

  constructor(public payload: boolean) {}
}

export class SetMyManaLimit implements Action {
  public readonly type = GameActionsTypes.SetMyManaLimit;

  constructor(public payload: number) {}
}

export class DecriseMyCurrentMana implements Action {
  public readonly type = GameActionsTypes.DecriseMyCurrentMana;

  constructor(public payload: number) {}
}

export class IncriseMyCurrentMana implements Action {
  public readonly type = GameActionsTypes.IncriseMyCurrentMana;

  constructor(public payload: number) {}
}

export class SetEnemyManaLimit implements Action {
  public readonly type = GameActionsTypes.SetEnemyManaLimit;

  constructor(public payload: number) {}
}

export class DecriseEnemyCurrentMana implements Action {
  public readonly type = GameActionsTypes.DecriseEnemyCurrentMana;

  constructor(public payload: number) {}
}

export class IncriseEnemyCurrentMana implements Action {
  public readonly type = GameActionsTypes.IncriseEnemyCurrentMana;

  constructor(public payload: number) {}
}

export class EndGame implements Action {
  public readonly type = GameActionsTypes.EndGame;

  constructor(public payload:  {status: GameStatus, whooseWin: GameWin}) {}
}

export class SetMoveNumber implements Action {
  public readonly type = GameActionsTypes.SetMoveNumber;

}

export type GameActions =
  | StartGame
  | StartGameSuccess
  | StartGameError
  | StartMyMove
  | EndMyMove
  | StartEnemyMove
  | EndEnemyMove
  | SetMoveNumber
  | StartTimer
  | StopTimer
  | SetMyManaLimit
  | DecriseMyCurrentMana
  | IncriseMyCurrentMana
  | SetEnemyManaLimit
  | DecriseEnemyCurrentMana
  | IncriseEnemyCurrentMana
  | EndGame;

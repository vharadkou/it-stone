
import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";

import {GameStatus, GameWin } from 'models';
import {
  StartGame,
  StartGameSuccess,
  StartGameError,
  StartMyMove,
  EndMyMove,
  StartEnemyMove,
  EndEnemyMove,
  StartTimer,
  SetMoveNumber,
  StopTimer,
  SetMyManaLimit,
  DecriseMyCurrentMana,
  IncriseMyCurrentMana,
  SetEnemyManaLimit,
  DecriseEnemyCurrentMana,
  IncriseEnemyCurrentMana,
  EndGame
} from "./game-process.action";
import { gameProcessQuery } from "./game-process.selectors";
import { GameProcessState } from "./interfaces";

@Injectable()
export class GameProcessFacade {
  public gameStatus$ = this.store.select(gameProcessQuery.getStatus);
  public moveNumber$ = this.store.select(gameProcessQuery.getGameMoveNumber);
  public whooseTurnNow$ = this.store.select(gameProcessQuery.getWhooseTurn);
  public isTimerOn$ = this.store.select(gameProcessQuery.getTimerOn);
  public myHero$ = this.store.select(gameProcessQuery.getMyHero);
  public whooseWin$ = this.store.select(gameProcessQuery.getWhooseWin);
  public isFirstMoveMy$ = this.store.select(gameProcessQuery.getmyFirstMove);
  public myManaLimit$ = this.store.select(gameProcessQuery.getMyManaLimit);
  public myManaCurrentValue$ = this.store.select(gameProcessQuery.getMyManaCurrentValue);
  public enemyManaLimit$ = this.store.select(gameProcessQuery.getEnemyManaLimit);
  public enemyManaCurrentValue$ = this.store.select(gameProcessQuery.getEnemyManaCurrentValue);

  public constructor(private store: Store<GameProcessState>) {}

  public StartGame(): void {
    this.store.dispatch(new StartGame());
  }

  public startGameSuccess(payload: {status: GameStatus, myFirstMove: boolean }): void {
    this.store.dispatch(new StartGameSuccess(payload));
  }

  public startGameError(error: Error): void {
    this.store.dispatch(new StartGameError(error));
  }

  public startMyMove(): void {
    this.store.dispatch(new StartMyMove());
  }

  public endMyMove(): void {
    this.store.dispatch(new EndMyMove());
  }

  public startEnemyMove(): void {
    this.store.dispatch(new StartEnemyMove());
  }

  public endEnemyMove(): void {
    this.store.dispatch(new EndEnemyMove());
  }

  public startTimer(event: boolean): void {
    this.store.dispatch(new StartTimer(event));
  }

  public stopTimer(event: boolean): void {
    this.store.dispatch(new StopTimer(event));
  }

  public setMyManaLimit(amount: number): void {
    this.store.dispatch(new SetMyManaLimit(amount));
  }

  public decriseMyCurrentMana(amount: number): void {
    this.store.dispatch(new DecriseMyCurrentMana(amount));
  }

  public incriseMyCurrentMana(amount: number): void {
    this.store.dispatch(new IncriseMyCurrentMana(amount));
  }

  public setEnemyManaLimit(amount: number): void {
    this.store.dispatch(new SetEnemyManaLimit(amount));
  }

  public decriseEnemyCurrentMana(amount: number): void {
    this.store.dispatch(new DecriseEnemyCurrentMana(amount));
  }

  public incriseEnemyCurrentMana(amount: number): void {
    this.store.dispatch(new IncriseEnemyCurrentMana(amount));
  }

  public endGame(event:  {status: GameStatus, whooseWin: GameWin}): void {
    this.store.dispatch(new EndGame(event));
  }

  public setMoveNumber(): void {
    this.store.dispatch(new SetMoveNumber());
  }

}

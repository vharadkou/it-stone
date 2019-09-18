import { GameStatus,  GameTurn, GameWin } from "models";

import { GameActionsTypes, GameActions } from "./game-process.action";
import { GameProcessInitialState } from "./game-process.intial";
import { GameProcessState } from "./interfaces";

export const gameProcessReduser = (
  state: GameProcessState = GameProcessInitialState,
  action: GameActions
): GameProcessState => {
  switch (action.type) {
    case GameActionsTypes.StartGame:
      return {
        ...state,
        status: GameStatus.Wait,
       
      };

    case GameActionsTypes.StartGameSuccess:
      return {
        ...state,
        status: action.payload.status,
        myFirstMove: action.payload.myFirstMove
             };

    case GameActionsTypes.StartGameError:
      return {
        ...state,
        status: GameStatus.Error
      };

    case GameActionsTypes.StartMyMove:
      return {
        ...state,
        timerOn: true,
        whooseTurn: GameTurn.MyTurn
      };

    case GameActionsTypes.EndMyMove:
      return {
        ...state,
        timerOn: false,
        whooseTurn: GameTurn.NotChosen
      };

    case GameActionsTypes.StartEnemyMove:
      return {
        ...state,
        timerOn: true,
        whooseTurn: GameTurn.EnemyTurn
      };

    case GameActionsTypes.EndEnemyMove:
      return {
        ...state,
        timerOn: false,
        whooseTurn: GameTurn.NotChosen
      };

    case GameActionsTypes.StartTimer:
      return {
        ...state,
        timerOn: true
      };

    case GameActionsTypes.StopTimer:
      return {
        ...state,
        timerOn: false
      };

    case GameActionsTypes.SetMyManaLimit:
      return {
        ...state,
        myManaLimit: action.payload
      };
    case GameActionsTypes.SetEnemyManaLimit:
      return {
        ...state,
        enemyManaLimit: action.payload
      };

    case GameActionsTypes.DecriseMyCurrentMana:
      return {
        ...state,
        myManaCurrentValue: state.myManaCurrentValue - action.payload
      };

  //  case GameActionsTypes.IncriseMyCurrentMana:
  //    return {
  //      ...state,
   //     myManaCurrentValue: state.myManaCurrentValue + action.payload,
  //      myManaLimit: state.myManaLimit + action.payload
   //   };
    case GameActionsTypes.DecriseEnemyCurrentMana:
      return {
        ...state,
        enemyManaCurrentValue: state.enemyManaCurrentValue - action.payload
      };

    case GameActionsTypes.IncriseEnemyCurrentMana:
      return {
        ...state,
        enemyManaCurrentValue: state.enemyManaCurrentValue + action.payload,
        enemyManaLimit: state.enemyManaLimit + action.payload
      };

      case GameActionsTypes.SetMoveNumber:
        let NextMove  = state.gameMoveNumber + 1
          return {
            ...state,
            gameMoveNumber: NextMove
        
          };
    

      case GameActionsTypes.EndGame:
            return {
              ...state,
              status: action.payload.status,
              timerOn: false,
              whooseTurn: GameTurn.NotChosen,
              whooseWin: action.payload.whooseWin
            };

    default:
      return state;
  }
};

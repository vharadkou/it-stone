export enum Status {
  Init,
  Fetching,
  Success,
  Error
}

export enum GameStatus {
  Wait,
  Start,
  End,
  Error
}

export enum GameTurn {
  NotChosen,
  MyTurn,
  EnemyTurn
}

export enum GameWin {
  NotChosen,
  MyWin,
  EnemyWin,
  Draw
}

export enum SocketStatus {
  Disconnected,
  Connected,
}

export interface Player {
  firstName: string;
  lastName: string;
  health: number;
}

export interface Card {
  _id: string,
  class: string,
  id: number;
  name: string;
  surname: string;
  image: string;
  skills: string[];
  hp: number;
  damage: number;
  manaCost: number;
  effects: { [name: string]: any; };
}

export interface Skill {
  id: number;
  name: string;
  description: string;
}

export interface PopupTextContent {
  title: string;
  text: string;
  buttonText: {
    cancel?: string,
    confirm?: string
  };
}

export interface AboutCard {
  title: string;
  name:string;
  surname:string;
  imageSrc:string;
  skills:string[];
  email:string;
}

export interface CardForStart {
  card: Card;
  isChosen: boolean;
}

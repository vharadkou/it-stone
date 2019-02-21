export enum Status {
  Init,
  Fetching,
  Success,
  Error
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
  id: number;
  name: string;
  surname: string;
  image: string;
  skills: string[];
  hp: number;
  damage: number;
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
    cancel: string,
    confirm: string
  };
}

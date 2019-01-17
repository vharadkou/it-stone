export enum Status {
  Init,
  Fetching,
  Success,
  Error
}

export enum SocketStatus {
  Disconnected,
  Connected,
  Error
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

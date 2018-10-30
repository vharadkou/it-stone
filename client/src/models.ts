export enum Status {
  Init,
  Fetching,
  Success,
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
  image: string;
  skills: string[];
  education: number;
  connections: number;
  currentPosition: string;
}

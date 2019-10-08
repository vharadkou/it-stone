import { Hero, Status } from 'models';

export interface HeroState {
  status: Status;
  heroes: Hero[];
}

// export interface Hero {
//   id: number;
//   name: string;
//   skills: string;
//   hp: number;
//   image: string;
// }
 
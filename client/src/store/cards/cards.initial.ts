import { Status } from 'models';
import { CardsState } from './interfaces';

export const initialState: CardsState = {
  status: Status.Init,
  cards: {
    1: {
      id: 1,
      name: 'Artsiom Marozau',
      image: 'https://media.licdn.com/dms/image/C5603AQFZ0cLw7TZNKQ/profile-displayphoto-shrink_800_800/0?e=1545264000&v=beta&t=PClUjbVszSX0U7EHV-jD75tIuIg81hXKk4SsaBqjYVk',
      skills: [
        'SQL', '.NET', 'C#', 'React'
      ],
      hp: 39,
      damage: 30,
    },
    2: {
      id: 2,
      name: 'Denis Marozau',
      image: 'https://media.licdn.com/dms/image/C5603AQFZ0cLw7TZNKQ/profile-displayphoto-shrink_800_800/0?e=1545264000&v=beta&t=PClUjbVszSX0U7EHV-jD75tIuIg81hXKk4SsaBqjYVk',
      skills: [
        'SQL', '.NET', 'C#', 'React'
      ],
      hp: 29,
      damage: 20,
    },
    3: {
      id: 3,
      name: 'Kate Marozaua',
      image: 'https://media.licdn.com/dms/image/C5603AQFZ0cLw7TZNKQ/profile-displayphoto-shrink_800_800/0?e=1545264000&v=beta&t=PClUjbVszSX0U7EHV-jD75tIuIg81hXKk4SsaBqjYVk',
      skills: [
        'SQL', '.NET', 'C#', 'React'
      ],
      hp: 49,
      damage: 40,
    },
  },
  deck: [1, 2, 3],
  myCards: [],
  enemyActiveCards: [],
  enemyCardCount: 0,
  myActiveCards: [],
};

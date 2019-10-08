import { Status } from 'models';
import { HeroState } from './interfaces';

export const initialHeroState: HeroState = {
    status: Status.Success,
    heroes: [
        {
            id: 1,
            name: 'Project Manager',
            skills: 'Dedline coming!',
            hp: 30,
            image: 'no image',
            selected: true
        },
        {
            id: 2,
            name: 'Team Lead',
            skills: 'Work at weekend',
            hp: 30,
            image:  'no image',
            selected: false
        },
        {
            id: 3,
            name: 'Startuper',
            skills: 'Promise an option',
            hp: 30,
            image:  'no image',
            selected: false
        }
    ]
};

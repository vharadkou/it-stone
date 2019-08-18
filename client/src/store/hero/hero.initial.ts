import { Status } from 'models';
import { HeroState } from './interfaces';

export const initialHeroState: HeroState = {
    status: Status.Success,
    heroes: [
        {
            id: 1,
            name: 'Jaina Proudmoore',
            skills: '1 damage',
            hp: 30,
            image: 'no image',
            selected: true
        },
        {
            id: 2,
            name: 'Rexxar',
            skills: '2 damage to the enemy hero',
            hp: 30,
            image:  'no image',
            selected: false
        },
        {
            id: 3,
            name: 'Thrall',
            skills: 'Summon a random Totem',
            hp: 30,
            image:  'no image',
            selected: false
        }
    ]
};

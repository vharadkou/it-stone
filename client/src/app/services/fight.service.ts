import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
export class FightService {

    public constructor() { }




    

    public fight(me, enemy): any {

        let removeIgnoringSkills = (mySkills, enemyIgnors) => {
            let mSkills = { ...mySkills };

            enemyIgnors.forEach(ignor => {
                delete mSkills[ignor];
            });

            return mSkills;
        };
        let damageKeysArray =Object.keys(removeIgnoringSkills(me.createAttack, enemy.ignore));
        let damageKeysDammageArray = damageKeysArray.map(key => me.createAttack[key]);
        let damage = damageKeysDammageArray.reduce((acc, cur) => acc + cur, 0);

        let cardHealth = enemy.hp - damage;

        return {
            enemyHp: cardHealth < 0 ? 0 : cardHealth,
            damage:  -1 * cardHealth
        };
    }
}

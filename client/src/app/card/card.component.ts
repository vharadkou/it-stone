import { Component, OnInit, Input } from '@angular/core';

// interface Person {
//   firstName: string;
//   lastName: string;
//   jobPosition: string;
//   image: string;
//   skil1: string;
//   skil2: string;
//   skil3: string;
// }

interface Person {
    name: string;
    image: string;
    hp: number;
    superSkill: any;
    createAttack: any;
    ignore: string[];
}

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {
    @Input() person: Person;
    @Input() isShowCard = true;
    public firstName: string;
    public lastName: string;
    public image: string;
    public hp: number;
    public skil1: string;
    public skil2: string;
    public skil3: string;

    constructor() { }

    ngOnInit() {
        if (this.person) {
            const nameArr = this.person.name ? this.person.name.split(' ') : [];
            this.firstName = nameArr[0];
            this.lastName = nameArr[1];
            this.image = this.person.image;
            this.hp = this.person.hp;
            if (this.person.createAttack) {
                const skillsArr = Object.keys(this.person.createAttack).slice(0, 3);
                this.skil1 = skillsArr[0];
                this.skil2 = skillsArr[1];
                this.skil3 = skillsArr[2];
            }

        }
    }

}

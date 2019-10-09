import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { HeroFacade } from "store/hero/hero.facade";
import { Hero } from "models";
import { AccountService } from "../../services/account.service";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";
@Component({
  selector: "app-account-page",
  templateUrl: "./account-page.component.html",
  styleUrls: ["./account-page.component.css"],
  animations: [
    trigger("smoothModalAnimationOn", [
      state("false", style({transform: "scale(0)" })),
      state(
        "true",
        style({
          transform: "scale(1) rotateX(2deg) rotateY(10deg)"
        })
      ),

      transition("false => true", animate("300ms"))
    
    ])
  ]
})
export class AccountPageComponent implements OnInit {
  public smoothModalAnimationOn = true
  @Input() public heroList: Array<any> = [];
  constructor(
    private HeroFacade: HeroFacade,
    private httpService: AccountService
  ) {}

  idHero: number;
  heroChoosing;

  ngOnInit() {
    this.heroChoosing = this.heroList[0];

  }
  @Output() onClick = new EventEmitter<number>();


  handleChange() {
    this.smoothModalAnimationOn = false;
    setTimeout(() => {this.smoothModalAnimationOn = true},100);
    this.onClick.emit(this.heroChoosing.id);
    
  }


  public temporaryData: any[] = [
    {
      class: "Tester",

      name: "Petr",
      surname: "Petrov",
      image: "http://simpleicon.com/wp-content/uploads/user1.png",
      skills: [],
      hp: 1,
      damage: 2,
      manaCost: 1,
      effects: { disableWhenSpellInUse: false }
    },

    {
      class: "Tester",

      name: "Ivan",
      surname: "Petrov",
      image: "http://simpleicon.com/wp-content/uploads/user1.png",
      skills: [],
      hp: 1,
      damage: 2,
      manaCost: 1,
      effects: { disableWhenSpellInUse: false }
    },
    {
      class: "Tester",

      name: "Victor",
      surname: "Petrov",
      image: "http://simpleicon.com/wp-content/uploads/user1.png",
      skills: [],
      hp: 1,
      damage: 2,
      manaCost: 1,
      effects: { disableWhenSpellInUse: false }
    },
    {
      class: "Business Analyst",

      name: "Sergey",
      surname: "Zaitsev",
      image: "http://simpleicon.com/wp-content/uploads/user1.png",
      skills: ["Good requirements", "Give you one more card to hand"],
      hp: 1,
      damage: 1,
      manaCost: 2,
      effects: { disableWhenSpellInUse: false }
    },
    {
      class: "Business Analyst",

      name: "Sasha",
      surname: "Zaitsev",
      image: "http://simpleicon.com/wp-content/uploads/user1.png",
      skills: ["Good requirements"],
      hp: 1,
      damage: 1,
      manaCost: 2,
      effects: { disableWhenSpellInUse: false }
    },
    {
      class: "HR",

      name: "Masha",
      surname: "Ivanova",
      image: "http://simpleicon.com/wp-content/uploads/user1.png",
      skills: ["Teambuilding", "Give all your minions at the table +1 atack"],
      hp: 2,
      damage: 2,
      manaCost: 3,
      effects: { disableWhenSpellInUse: false }
    },
    {
      class: "Junior Developer",

      name: "Tania",
      surname: "Sidorova",
      image: "http://simpleicon.com/wp-content/uploads/user1.png",
      skills: ["Motivation", "Minion can atack immediately"],
      hp: 1,
      damage: 2,
      manaCost: 1,
      effects: { disableWhenSpellInUse: false }
    },
    {
      class: "Junior Developer",

      name: "Valera",
      surname: "Smirnov",
      image: "http://simpleicon.com/wp-content/uploads/user1.png",
      skills: ["Motivation", "Minion can atack immediately"],
      hp: 1,
      damage: 2,
      manaCost: 1,
      effects: { disableWhenSpellInUse: false }
    },
    {
      class: "Middle Developer",

      name: "Lesha",
      surname: "Gerasimov",
      image: "http://simpleicon.com/wp-content/uploads/user1.png",
      skills: ["Motivation", "Minion can atack immediately"],
      hp: 2,
      damage: 3,
      manaCost: 2,
      effects: { disableWhenSpellInUse: false }
    },
    {
      class: "Middle Developer",

      name: "Pasha",
      surname: "Gerasimov",
      image: "http://simpleicon.com/wp-content/uploads/user1.png",
      skills: ["Motivation", "Minion can atack immediately"],
      hp: 2,
      damage: 3,
      manaCost: 2,
      effects: { disableWhenSpellInUse: false }
    },
    {
      class: "Senior Developer",

      name: "Dasha",
      surname: "Galanova",
      image: "http://simpleicon.com/wp-content/uploads/user1.png",
      skills: [
        "Take responsibility",
        "When minion at the table your hero can not be attacked"
      ],
      hp: 5,
      damage: 3,
      manaCost: 4,
      effects: { disableWhenSpellInUse: false }
    },
    {
      class: "Senior Developer",

      name: "Misha",
      surname: "Stukalov",
      image: "http://simpleicon.com/wp-content/uploads/user1.png",
      skills: [
        "Take responsibility",
        "When minion at the table your hero can not be attacked"
      ],
      hp: 5,
      damage: 3,
      manaCost: 4,
      effects: { disableWhenSpellInUse: false }
    },
    {
      class: "Data Scientist",

      name: "Yo",
      surname: "Chen",
      image: "http://simpleicon.com/wp-content/uploads/user1.png",
      skills: [
        "Teach a neural net",
        "Automatically deals damage for 3 hp to enemy hero "
      ],
      hp: 4,
      damage: 4,
      manaCost: 4,
      effects: { disableWhenSpellInUse: false }
    },
    {
      class: "CTO",

      name: "John",
      surname: "Stivenson",
      image: "http://simpleicon.com/wp-content/uploads/user1.png",
      skills: [],
      hp: 7,
      damage: 6,
      manaCost: 5,
      effects: { disableWhenSpellInUse: false }
    },
    {
      class: "Spell",

      name: "Customer did not accept!!",
      surname: "",
      image: "http://simpleicon.com/wp-content/uploads/user1.png",
      skills: [],
      hp: null,
      damage: 6,
      manaCost: 4,
      effects: { disableWhenSpellInUse: false }
    },
    {
      class: "HR",

      name: "Ira",
      surname: "Chiz",
      image: "http://simpleicon.com/wp-content/uploads/user1.png",
      skills: ["Teambuilding", "Give all your minions at the table +1 atack"],
      hp: 2,
      damage: 2,
      manaCost: 3,
      effects: { disableWhenSpellInUse: false }
    },
    {
      class: "Spell",

      name: "Crush by experience",
      surname: "",
      image: "http://simpleicon.com/wp-content/uploads/user1.png",
      skills: [
        "Cast a spell",
        "Turns any enemy minion to a ship with 1 hp and 1 attack"
      ],
      hp: null,
      damage: null,
      manaCost: 4,
      effects: { disableWhenSpellInUse: false }
    },
    {
      class: "Spell",

      name: "Cruch by experience",
      surname: "",
      image: "http://simpleicon.com/wp-content/uploads/user1.png",
      skills: [
        "Cast a spell",
        "Turns any enemy minion to a ship with 1 hp and 1 attack"
      ],
      hp: null,
      damage: null,
      manaCost: 4,
      effects: { disableWhenSpellInUse: false }
    },

    {
      class: "Spell",

      name: "Budget agreed!",
      surname: "",
      image: "http://simpleicon.com/wp-content/uploads/user1.png",
      skills: ["Cast a spell", "Gives you two additional cards from deck"],
      hp: null,
      damage: null,
      manaCost: 3,
      effects: { disableWhenSpellInUse: false }
    },

    {
      class: "Spell",

      name: "Budget agreed!",
      surname: "",
      image: "http://simpleicon.com/wp-content/uploads/user1.png",
      skills: ["Cast a spell", "Gives you two additional cards from deck"],
      hp: null,
      damage: null,
      manaCost: 3,
      effects: { disableWhenSpellInUse: false }
    }
  ];

}

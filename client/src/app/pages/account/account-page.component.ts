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


}

import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { HeroFacade } from "store/hero/hero.facade";
import { Hero } from "models";
import { AccountService } from "../../services/account.service";

@Component({
  selector: "app-account-page",
  templateUrl: "./account-page.component.html",
  styleUrls: ["./account-page.component.css"]
})
export class AccountPageComponent implements OnInit {
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
    document.getElementById('modal-window').classList.remove("anim4");
    setTimeout(() => {document.getElementById('modal-window').classList.add("anim4")},100);
    this.onClick.emit(this.heroChoosing.id);
  }


}

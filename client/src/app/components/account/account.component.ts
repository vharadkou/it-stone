import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import { AuthorizationService } from "app/services/authorization.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription, Observable } from "rxjs";
import { AccountService } from "../../services/account.service";
import { postIds } from "../../services/account.service";
import { HeroFacade } from "../../../store/hero/hero.facade";
import { Hero } from "models";
import { Router } from "@angular/router";
import { UserFacade } from "store";
import { User } from "../../../models";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";
@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"],
  providers: [AccountService],
  animations: [
    trigger("pageOut", [
      state("false", style({ transform: "scale(1)" })),
      state(
        "true",
        style({
          transform: "scale(0)"
        })
      ),

      transition("false => true", animate("200ms"))
    ])
  ]
})
export class AccountComponent implements OnInit {
  public pageOut = false
  public routeSub: Subscription;
  public heroList: Array<any> = [];
  public hero$: Observable<Hero[]> = this.HeroFacade.heroes$;
  public user$ = this.userFacade.user$;
  public userError$ = this.userFacade.userError$;
  public user: User;
  public choodenHero: number = 1;
  public loading: boolean = false;
  constructor(
    private _authService: AuthorizationService,
    private route: ActivatedRoute,
    private userFacade: UserFacade,
    private _router: Router,
    private httpService: AccountService,
    private HeroFacade: HeroFacade
  ) {}

  ngOnInit() {
    this.loading = false;
    this.user$.subscribe((data: User) => {
      this.user = data;
    });

    this.HeroFacade.loadHero();
    this.hero$.subscribe(p => {
      this.heroList = p;
    
    });
  }
  selectedHero: number = 1;
  receivedIdsMass: number;
  done: boolean = false;
  selectedNow: boolean;
  replase: boolean = false;

  handleChange(heroId) {
    this.choodenHero = heroId;
  }

  submit() {
    this.httpService.postData(this.choodenHero).subscribe(
      (data: number) => {
        this.pageOut = true;
        this.receivedIdsMass = data;
        this.done = true;
        setTimeout(() => {
          this.loading = true;
        }, 400);
        setTimeout(() => {
          this._router.navigate([`/battle`]);
        }, 7000);
       
      },
      error => alert(error)
    );
  }

  logOut() {
    setTimeout(() => {
      this._authService.logOut();
    }, 500);
    this.pageOut = true
  }

  ngOnDestroy() {
    //  this.routeSub.unsubscribe();
  }
}

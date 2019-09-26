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
@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"],
  providers: [AccountService]
})
export class AccountComponent implements OnInit {

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
      console.log(this.user)
    });

    //  this.routeSub = this.route.params.subscribe(params => {
    //  console.log(params);
    //   console.log(params["id"]);
    // });

    this.HeroFacade.loadHero();
    this.hero$.subscribe(p => {
      this.heroList = p;
      console.log(this.heroList);
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
        this.receivedIdsMass = data;
        this.done = true;
        setTimeout(() => {
          this.loading = true;
        }, 500);
        setTimeout(() => {
          this._router.navigate([`/battle`]);
        }, 6000);
        document.getElementById("menu-field").classList.add("scaleToZero");
        document.getElementById("user-field").classList.add("scaleToZero");
        document.getElementById("hero-field").classList.add("scaleToZero");
      },
      error => alert(error)
    );
  }

  logOut() {
    setTimeout(() => {
      this._authService.logOut();
    }, 500);
    document.getElementById("menu-field").classList.add("scaleToZero");
    document.getElementById("user-field").classList.add("scaleToZero");
    document.getElementById("hero-field").classList.add("scaleToZero");
  }

  ngOnDestroy() {
    //  this.routeSub.unsubscribe();
  }
}

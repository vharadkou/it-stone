import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { postIds } from '../../services/account.service';
import { HeroFacade } from '../../../store/hero/hero.facade';
import { Hero } from 'models';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [AccountService]

})
export class AccountComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private httpService: AccountService,
    private HeroFacade: HeroFacade) { }
  private routeSub: Subscription;

  public heroList: Array<any> = [];
  public hero$: Observable<Hero[]> = this.HeroFacade.heroes$;

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params)
      console.log(params['id'])
    });

    this.HeroFacade.loadHero();
    this.hero$.subscribe(p => { this.heroList = p; });
  }
  selectedHero: number = 1;
  receivedIdsMass: number;
  done: boolean = false;
  isDisabled: boolean = false;
  selectedNow: boolean;
  replase: boolean = false;

  submit(heroId: number) {
    this.httpService.postData(heroId)
      .subscribe(
        (data: number) => {
          this.receivedIdsMass = data;
          this.done = true;
        },
        error => alert(error)
      );
  }

  getId(idHero: number) {
    this.isDisabled = true;
    for (let index in this.heroList) {
      if (this.heroList[index].id === idHero) {
        this.isDisabled = false;
        this.selectedHero = idHero;
        this.heroList[index].selected = !this.heroList[index].selected;
        this.selectedNow = this.heroList[index].selected;
        if (this.selectedNow == false) {
          this.isDisabled = true;
          this.selectedNow = !this.heroList[index].selected;
        }
        if (this.selectedNow == true) {
          for (let index in this.heroList) {

            if (this.heroList[index].id !== this.selectedHero) {
              this.heroList[index].selected = this.replase;
            }
          }
        }
        break;
      }
      else {
        this.selectedNow = false;
        this.isDisabled = true;
      }
    }
  }

  alertId() {
    this.submit(this.selectedHero);
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}

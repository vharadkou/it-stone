import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroFacade } from 'store/hero/hero.facade';
import { Hero } from 'models';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
})
export class AccountPageComponent {

  @Input() public heroList: Array<any> = [];
  constructor(private HeroFacade: HeroFacade, private httpService: AccountService) { }
  
  idHero: number;
  @Output() onClick = new EventEmitter<number>();
  getId(idHero:number) {
    this.onClick.emit(idHero); 
  }

}


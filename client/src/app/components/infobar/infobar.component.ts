import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlayersHPFacade } from 'store/players-hp/players-hp.facade';

@Component({
  selector: 'app-infobar',
  templateUrl: './infobar.component.html',
  styleUrls: ['./infobar.component.scss']
})
export class InfobarComponent implements OnInit {
  @Input() allCardsEnemy
  @Input() allCardsMy

  @Output() onMyCardTaken = new EventEmitter<any>();
  // all data typed below is just a mock and will be changed later
  public myHP$ = this.playersHPFacade.myHP$;
  public enemyHP$ = this.playersHPFacade.enemyHP$;

  public myAvatar = 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/cc/cc97ee90c11a8378ee78cc8c776bb694210da1d9_full.jpg';
  public enemyAvatar = 'https://m.media-amazon.com/images/M/MV5BMzc1YTA1ZjItMWRhMy00ZTBlLTkzNTgtNTc4ZDE3YTM3ZDk2XkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SY1000_SX1000_AL_.jpg';
  public myCardsLeft = 10;
  public enemyCardsLeft = 8;

  constructor( public playersHPFacade: PlayersHPFacade) {

  }

  public ngOnInit(): void {
    console.log('Component has been rendered');
  }




  public turnTrigger(): void {
    alert('Some action');
  }

}

import { Component, OnInit } from '@angular/core';
import { PlayersHPFacade } from 'store/players-hp/players-hp.facade';

@Component({
  selector: 'app-infobar',
  templateUrl: './infobar.component.html',
  styleUrls: ['./infobar.component.scss']
})
export class InfobarComponent implements OnInit {

  // all data typed below is just a mock and will be changed later
  public fstPlayerHP$ = this.playersHPFacade.myHP$;
  public scndPlayerHP$ = this.playersHPFacade.enemyHP$;

  public fstPlayerAvatar = 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/cc/cc97ee90c11a8378ee78cc8c776bb694210da1d9_full.jpg';
  public fstPlayercardLeft = 10;
  public scndPlayercardLeft = 8;

  constructor( public playersHPFacade: PlayersHPFacade) {

  }

  public ngOnInit(): void {
    console.log('Component has been rendered');
  }

  public turnTrigger(): void {
    alert('Some action');
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'models';
import { PlayersInfoFacade } from 'store';


@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss']
})
export class PlayerInfoComponent implements OnInit {

  public player$: Observable<Player[]> = this.playerInfoFacade.playersInfo$;
  public playerInfo: Array<any> = [];
  constructor(private playerInfoFacade: PlayersInfoFacade) {
  }

  ngOnInit() {
    this.playerInfoFacade.loadPlayerInfo();
    this.player$.subscribe(p => {
      this.playerInfo = p;
    });

  }

} 

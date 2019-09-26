import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'models';
import { PlayersInfoFacade } from 'store';
import {
  UserFacade
} from "store";

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss']
})
export class PlayerInfoComponent implements OnInit {
  public user$ = this.userFacade.user$;
  public player$: Observable<Player[]> = this.playerInfoFacade.playersInfo$;
  public user;
  constructor(private playerInfoFacade: PlayersInfoFacade, private userFacade: UserFacade,) {
  }

  ngOnInit() {
    this.user$.subscribe(data =>{
      this.user = data;
      console.log(this.user)
    })
 

  }

} 

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-infobar',
  templateUrl: './infobar.component.html',
  styleUrls: ['./infobar.component.scss']
})
export class InfobarComponent implements OnInit {

  public fstPlayerHP = 39;
  public scndPlayerHP = 35;
  public fstPlayerAvatar = 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/cc/cc97ee90c11a8378ee78cc8c776bb694210da1d9_full.jpg';
  public scndPlayerAvatar = 'https://m.media-amazon.com/images/M/MV5BMzc1YTA1ZjItMWRhMy00ZTBlLTkzNTgtNTc4ZDE3YTM3ZDk2XkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SY1000_SX1000_AL_.jpg';
  public fstPlayercardLeft = 10;
  public scndPlayercardLeft = 7;

  constructor() { }

  public ngOnInit(): void {
    console.log('Component has been rendered');
  }

  public turnTrigger(): void {
    alert('Fuck you jerk ;)');
  }

}

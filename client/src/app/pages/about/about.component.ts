import { Component, OnInit } from '@angular/core';
import { AboutCard } from '../../../models';
import { AboutPageFacade } from 'store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutPageComponent implements OnInit {

  constructor (private aboutPageFacade:AboutPageFacade) {
  }

  public developers$:Observable<AboutCard[]> = this.aboutPageFacade.allAboutCards$;

  ngOnInit() {
    this.aboutPageFacade.loadAboutCards();
  }
}

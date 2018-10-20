import { Component, OnInit, Input } from '@angular/core';

interface Person {
  firstName: string;
  lastName: string;
  jobPosition: string;
  image: string;
  skil1: string;
  skil2: string;
  skil3: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {
  @Input() person: Person;
  constructor() { }

  ngOnInit() {
  }

}

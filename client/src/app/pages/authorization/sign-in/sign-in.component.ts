import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'models';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  private eMail: string;
  private password: string;

  @Output() onSignIn = new EventEmitter<User>();

  constructor() { }

  ngOnInit() {
  }

  handleClick(): void{
    this.onSignIn.emit({nickName: 'sss', email: this.eMail, password: this.password});
  }
}
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'models';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  private _nickName: string;
  private _email: string;
  private _password: string;

  @Output() onSignUp = new EventEmitter<User>();
  @Output() onChangeMode = new EventEmitter<User>();

  constructor() { }

  ngOnInit() {
  }

  handleClick():void {
    this.onSignUp.emit({nickName: this._nickName, email: this._email, password: this._password});
  }

  changeSignMode(modeType): void {
    document.getElementById('menu').classList.add("anim2");
    setTimeout(() =>{this.onChangeMode.emit(modeType)}, 200);
  }

}

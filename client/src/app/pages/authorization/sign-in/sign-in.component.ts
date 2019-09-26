import { Component, OnInit, OnDestroy, Output, EventEmitter } from "@angular/core";
import { User } from "models";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent implements OnInit {
  private _userName: string;
  private _password: string;

  @Output() onSignIn = new EventEmitter<Object>();
  @Output() onChangeMode = new EventEmitter<User>();
  constructor() {}

  ngOnInit() {}

  handleClick(): void {
    this.onSignIn.emit({
      userName: this._userName,
      password: this._password
    });
  
  }

  changeSignMode(modeType): void {
    document.getElementById('menu').classList.add("anim2");
    setTimeout(() =>{this.onChangeMode.emit(modeType)}, 200);
  }


}

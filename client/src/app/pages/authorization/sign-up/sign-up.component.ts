import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { User } from "models";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";
@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
  animations: [
    trigger("signUpMode", [
      state("true", style({ opacity: "1", transform: "scale(1)" })),
      state(
        "false",
        style({
          opacity: "0",
          transform: "scale(0.9)"
        })
      ),

      transition("true => false", animate("200ms"))
    ])
  ]
})
export class SignUpComponent implements OnInit {
  public signUpMode = true;
  private _nickName: string;
  private _email: string;
  private _password: string;

  @Output() onSignUp = new EventEmitter<Object>();
  @Output() onChangeMode = new EventEmitter<User>();
  @Input() signInMode;
  constructor() {}

  ngOnInit() {}

  handleClick(): void {
    this.onSignUp.emit({
      userName: this._nickName,
      email: this._email,
      password: this._password
    });
  }

  changeSignMode(modeType): void {
   this.signUpMode = false;
    setTimeout(() => {
      this.onChangeMode.emit(modeType);
    }, 200);
  }
}

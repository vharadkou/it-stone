import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input
} from "@angular/core";
import { User } from "models";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";
@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
  animations: [
    trigger("signInMode", [
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
export class SignInComponent implements OnInit {
  public signInMode = true;
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
    this.signInMode = false; 
    setTimeout(() => {
      this.onChangeMode.emit(modeType);
    }, 200);
  }
}

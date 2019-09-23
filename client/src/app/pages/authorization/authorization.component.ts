import { Component, OnInit } from "@angular/core";
import { AuthorizationService } from "app/services/authorization.service";

@Component({
  selector: "app-authorization",
  templateUrl: "./authorization.component.html",
  styleUrls: ["./authorization.component.css"]
})
export class AuthorizationComponent implements OnInit {
  private signInMode = true;

  onSignIn(data) {
    this._authService.signIn(data);
  }

  onSignUp(data) {
    this._authService.signUp(data);
  }

  constructor(private _authService: AuthorizationService) {}

  ngOnInit() {
    this._authService.authCheck();
  }

  onChangeMode(data) {
    if (data === "signUp") {
      this.signInMode = false;
    } else if (data === "signIn") {
      this.signInMode = true;
    }
  }
}

import { Component, OnInit } from "@angular/core";
import { AuthorizationService } from "app/services/authorization.service";
import { Router } from "@angular/router";
import { UserFacade } from "store";
import { User } from "../../../models";
import { TokenService } from "../../services/token.service";
@Component({
  selector: "app-authorization",
  templateUrl: "./authorization.component.html",
  styleUrls: ["./authorization.component.css"]
})
export class AuthorizationComponent implements OnInit {
  public user$ = this.userFacade.user$;
  public userError$ = this.userFacade.userError$;
  public userError: string;
  public user: User;
  private signInMode = true;
  constructor(
    private _authService: AuthorizationService,
    private userFacade: UserFacade,
    private _router: Router,
    private _tokenService: TokenService
  ) {}
  
  onSignIn(data) {
    this._authService.signIn(data);
  }

  onSignUp(data) {
    this._authService.signUp(data);
  }



  ngOnInit() {
    this._authService.authCheck();

    this.userError$.subscribe((data: string) => {
      this.userError = data;
      if (this.userError) {
        alert(this.userError);
      }
    });
    this.user$.subscribe(data => {
      this.user = data;
      if (this.user.id) {
        this._router.navigate([`/user/${this.user.id}`]);
      }
    });
  }

  onChangeMode(data) {
    if (data === "signUp") {
      this.signInMode = false;
    } else if (data === "signIn") {
      this.signInMode = true;
    }
  }
}

import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { UserFacade } from "store";
import { User } from "models";
import { Router } from "@angular/router";
import { TokenService } from "../services/token.service";


@Injectable({
  providedIn: "root"
})
export class AuthorizationService {
  private user: User;

  constructor(
    private _userFacade: UserFacade,
    private _router: Router,
    private _tokenService: TokenService
  ) {
    this.authCheck();
  }

  signIn(data) {
    this._userFacade.UserSignIn(data);
  }

  authCheck() {
    if (this._tokenService.getToken()) {
      this._userFacade.UserSignInSuccess();}
  }

  signUp(data) {
    this._userFacade.UserSignUp(data);
  }

  logOut() {
    this._tokenService.clearLocalStorage();
    this._userFacade.UserLogOut()
    this._router.navigate([`/authorization`])
  }


}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserFacade } from 'store';
import { User } from 'models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private user$;

  constructor(private _userFacade: UserFacade, private _router: Router) { 
    this._userFacade.user$.subscribe(resolve => this.user$ = resolve);
  }

  signIn(data){
    this._userFacade.UserSignIn(data);
    this._router.navigate(['/battle']);
  }

  authCheck(){
    const user: User = JSON.parse(localStorage.getItem('user'));
    if(user && user.email && user.nickName && user.password){
      this._userFacade.UserSignIn(user);
      this._userFacade.UserSignInSuccess(user);
      this.getUser();
      this._router.navigate(['/battle']);
    } else {
      this.getUser();
    }
  }

  signUp(data){
    localStorage.setItem('user', JSON.stringify(data));
    this._userFacade.UserSignUpSuccess(data);
    this._router.navigate(['/battle']);
  }

  getUser(): Observable<boolean>{
    if (this.user$.nickName != "null"){
      return of(true);
    } else {
      return of(false);
    }
  } 
}

import { Injectable } from "@angular/core";
import * as jwt from "jwt-decode";
@Injectable({
  providedIn: "root"
})
export class TokenService {
  constructor() {}

  setToken(token) {
    localStorage.setItem("auth-token", token);
  }

  getToken() {
   return localStorage.getItem("auth-token");
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  tokenDecode() {
    return jwt(localStorage.getItem("auth-token"));
  }
}

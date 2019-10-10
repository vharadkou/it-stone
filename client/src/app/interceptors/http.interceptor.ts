import { Injectable } from "@angular/core";
import { TokenService } from "../../app/services/token.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { AuthorizationService } from "../services/authorization.service";
import { Observable, of } from "rxjs";
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    public auth: AuthorizationService,
    private _tokenService: TokenService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this._tokenService.getToken() != null) {
      const headers = new HttpHeaders().set(
        "JWT-Token",
        this._tokenService.getToken()
      );
      const AuthRequest = request.clone({ headers: headers });

      return next.handle(AuthRequest);
    } else {
      return next.handle(request);
    }
  }
}

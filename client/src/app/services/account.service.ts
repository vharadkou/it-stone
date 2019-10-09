import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface postIds{
  heroId: number;
}

@Injectable()
export class AccountService {
  constructor(private http: HttpClient) {}

  postData (idHero: number){
    const body = {idHero};
    return this.http.post('http://httpbin.org/post',body);
  }
    
}
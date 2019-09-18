
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { baseUrl } from 'constants/baseUrl';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
  })
export class UserService {
    public constructor(private http: Http) {

    }

    public findUser(userName: string): Observable<any> {
        // console.log(userName, 'from service');
        console.log(userName);
        return this.http.post(`${baseUrl}/api/users/parse-user`,
            { name: userName }
        ).pipe(
            map(response => response.json())
        );
    }
}

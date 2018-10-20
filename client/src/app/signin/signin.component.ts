import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
    AuthService,
    GoogleLoginProvider
} from 'angular-6-social-login';

import { baseUrl } from '../../constants/baseUrl';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    // styleUrls: ['./signin.component.css']
})


export class SigninComponent {

    constructor(
        private socialAuthService: AuthService,
        private http: HttpClient
    ) { }

    public socialSignIn() {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
            .then((userData) => {
                console.log(' sign in data : ', userData);
                const url = `${baseUrl}/api/users/google-auth`;
                this.http.post(url, {
                    email: userData.email,
                    name: userData.name,
                    accessToken: userData.token,
                }).subscribe((res) => console.log('RESPONSE', res));
            })
            .catch((err) => console.log('Error', err));
    }
}

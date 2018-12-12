import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'constants/baseUrl';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SkillsService {

    constructor(private http: HttpClient) { }

    getSkills() {
        return this.http.get(`${baseUrl}/api/get-skills/`);
    }
}

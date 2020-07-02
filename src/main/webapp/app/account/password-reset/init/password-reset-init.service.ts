import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';

@Injectable({ providedIn: 'root' })
export class PasswordResetInitService {
    public resourceUrl = SERVER_API_URL + 'api/account';

    constructor(private http: HttpClient) {}

    save(mail: string): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/account/reset-password/init', mail);
    }

    enviar1(mail: any, correo: any): Observable<any> {
        return this.http.post(`${this.resourceUrl}/enviarmensaje/${mail}/${correo}`, { observe: 'response' });
    }
}

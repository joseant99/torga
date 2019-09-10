import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMensajes } from 'app/shared/model/mensajes.model';

type EntityResponseType = HttpResponse<IMensajes>;
type EntityArrayResponseType = HttpResponse<IMensajes[]>;

@Injectable({ providedIn: 'root' })
export class MensajesService {
    public resourceUrl = SERVER_API_URL + 'api/mensajes';

    constructor(protected http: HttpClient) {}

    create(mensajes: IMensajes): Observable<EntityResponseType> {
        return this.http.post<IMensajes>(this.resourceUrl, mensajes, { observe: 'response' });
    }

    update(mensajes: IMensajes): Observable<EntityResponseType> {
        return this.http.put<IMensajes>(this.resourceUrl, mensajes, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMensajes>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMensajes[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

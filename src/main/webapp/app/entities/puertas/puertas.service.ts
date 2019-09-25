import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPuertas } from 'app/shared/model/puertas.model';

type EntityResponseType = HttpResponse<IPuertas>;
type EntityArrayResponseType = HttpResponse<IPuertas[]>;

@Injectable({ providedIn: 'root' })
export class PuertasService {
    public resourceUrl = SERVER_API_URL + 'api/puertas';

    constructor(protected http: HttpClient) {}

    create(puertas: IPuertas): Observable<EntityResponseType> {
        return this.http.post<IPuertas>(this.resourceUrl, puertas, { observe: 'response' });
    }

    update(puertas: IPuertas): Observable<EntityResponseType> {
        return this.http.put<IPuertas>(this.resourceUrl, puertas, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPuertas>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPuertas[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

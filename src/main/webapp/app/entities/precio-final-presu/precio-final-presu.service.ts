import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPrecioFinalPresu } from 'app/shared/model/precio-final-presu.model';

type EntityResponseType = HttpResponse<IPrecioFinalPresu>;
type EntityArrayResponseType = HttpResponse<IPrecioFinalPresu[]>;

@Injectable({ providedIn: 'root' })
export class PrecioFinalPresuService {
    public resourceUrl = SERVER_API_URL + 'api/precio-final-presus';

    constructor(protected http: HttpClient) {}

    create(precioFinalPresu: IPrecioFinalPresu): Observable<EntityResponseType> {
        return this.http.post<IPrecioFinalPresu>(this.resourceUrl, precioFinalPresu, { observe: 'response' });
    }

    update(precioFinalPresu: IPrecioFinalPresu): Observable<EntityResponseType> {
        return this.http.put<IPrecioFinalPresu>(this.resourceUrl, precioFinalPresu, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPrecioFinalPresu>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPrecioFinalPresu[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query12(id: any): Observable<EntityArrayResponseType> {
        return this.http.get<IPrecioFinalPresu[]>(`${this.resourceUrl}-bus/${id}`, { observe: 'response' });
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INiveladores } from 'app/shared/model/niveladores.model';

type EntityResponseType = HttpResponse<INiveladores>;
type EntityArrayResponseType = HttpResponse<INiveladores[]>;

@Injectable({ providedIn: 'root' })
export class NiveladoresService {
    public resourceUrl = SERVER_API_URL + 'api/niveladores';

    constructor(protected http: HttpClient) {}

    create(niveladores: INiveladores): Observable<EntityResponseType> {
        return this.http.post<INiveladores>(this.resourceUrl, niveladores, { observe: 'response' });
    }

    update(niveladores: INiveladores): Observable<EntityResponseType> {
        return this.http.put<INiveladores>(this.resourceUrl, niveladores, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<INiveladores>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<INiveladores[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    categoria(id: number): Observable<EntityResponseType> {
        return this.http.get<INiveladores>(`${this.resourceUrl}-id/${id}`, { observe: 'response' });
    }
}

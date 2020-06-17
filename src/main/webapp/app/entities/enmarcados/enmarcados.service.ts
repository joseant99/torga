import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEnmarcados } from 'app/shared/model/enmarcados.model';

type EntityResponseType = HttpResponse<IEnmarcados>;
type EntityArrayResponseType = HttpResponse<IEnmarcados[]>;

@Injectable({ providedIn: 'root' })
export class EnmarcadosService {
    public resourceUrl = SERVER_API_URL + 'api/enmarcados';

    constructor(protected http: HttpClient) {}

    create(enmarcados: IEnmarcados): Observable<EntityResponseType> {
        return this.http.post<IEnmarcados>(this.resourceUrl, enmarcados, { observe: 'response' });
    }

    update(enmarcados: IEnmarcados): Observable<EntityResponseType> {
        return this.http.put<IEnmarcados>(this.resourceUrl, enmarcados, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEnmarcados>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEnmarcados[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    categoria(id: number, letra: any): Observable<EntityResponseType> {
        return this.http.get<IEnmarcados>(`${this.resourceUrl}-id/${id}/${letra}`, { observe: 'response' });
    }
}

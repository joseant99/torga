import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICasco } from 'app/shared/model/casco.model';

type EntityResponseType = HttpResponse<ICasco>;
type EntityArrayResponseType = HttpResponse<ICasco[]>;

@Injectable({ providedIn: 'root' })
export class CascoService {
    public resourceUrl = SERVER_API_URL + 'api/cascos';
    public dato;
    public alto;
    public fondo;

    constructor(protected http: HttpClient) {}

    create(casco: ICasco): Observable<EntityResponseType> {
        return this.http.post<ICasco>(this.resourceUrl, casco, { observe: 'response' });
    }

    update(casco: ICasco): Observable<EntityResponseType> {
        return this.http.put<ICasco>(this.resourceUrl, casco, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICasco>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICasco[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    findBus(ancho: any, alto: any, id: any): Observable<EntityArrayResponseType> {
        return this.http.get<ICasco[]>(`${this.resourceUrl}-bus/${ancho}/${alto}/${id}`, { observe: 'response' });
    }

    findBus1(codigo: any): Observable<EntityArrayResponseType> {
        return this.http.get<ICasco[]>(`${this.resourceUrl}-bus1/${codigo}`, { observe: 'response' });
    }
}

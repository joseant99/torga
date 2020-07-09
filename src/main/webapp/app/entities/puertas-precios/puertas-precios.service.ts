import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPuertasPrecios } from 'app/shared/model/puertas-precios.model';

type EntityResponseType = HttpResponse<IPuertasPrecios>;
type EntityArrayResponseType = HttpResponse<IPuertasPrecios[]>;

@Injectable({ providedIn: 'root' })
export class PuertasPreciosService {
    public resourceUrl = SERVER_API_URL + 'api/puertas-precios';

    constructor(protected http: HttpClient) {}

    create(puertasPrecios: IPuertasPrecios): Observable<EntityResponseType> {
        return this.http.post<IPuertasPrecios>(this.resourceUrl, puertasPrecios, { observe: 'response' });
    }

    update(puertasPrecios: IPuertasPrecios): Observable<EntityResponseType> {
        return this.http.put<IPuertasPrecios>(this.resourceUrl, puertasPrecios, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPuertasPrecios>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPuertasPrecios[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    findBus(ancho: any, alto: any, puerta: any): Observable<EntityArrayResponseType> {
        return this.http.get<IPuertasPrecios[]>(`${this.resourceUrl}-bus/${ancho}/${alto}/${puerta}`, { observe: 'response' });
    }

    findBus1(casco: any, puerta: any): Observable<EntityArrayResponseType> {
        return this.http.get<IPuertasPrecios[]>(`${this.resourceUrl}-bus/${casco}/${puerta}`, { observe: 'response' });
    }
}

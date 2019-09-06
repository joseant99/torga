import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPagosTorgaTiendas } from 'app/shared/model/pagos-torga-tiendas.model';

type EntityResponseType = HttpResponse<IPagosTorgaTiendas>;
type EntityArrayResponseType = HttpResponse<IPagosTorgaTiendas[]>;

@Injectable({ providedIn: 'root' })
export class PagosTorgaTiendasService {
    public resourceUrl = SERVER_API_URL + 'api/pagos-torga-tiendas';

    constructor(protected http: HttpClient) {}

    create(pagosTorgaTiendas: IPagosTorgaTiendas): Observable<EntityResponseType> {
        return this.http.post<IPagosTorgaTiendas>(this.resourceUrl, pagosTorgaTiendas, { observe: 'response' });
    }

    update(pagosTorgaTiendas: IPagosTorgaTiendas): Observable<EntityResponseType> {
        return this.http.put<IPagosTorgaTiendas>(this.resourceUrl, pagosTorgaTiendas, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPagosTorgaTiendas>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPagosTorgaTiendas[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

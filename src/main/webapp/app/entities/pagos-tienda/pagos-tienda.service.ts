import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPagosTienda } from 'app/shared/model/pagos-tienda.model';

type EntityResponseType = HttpResponse<IPagosTienda>;
type EntityArrayResponseType = HttpResponse<IPagosTienda[]>;

@Injectable({ providedIn: 'root' })
export class PagosTiendaService {
    public resourceUrl = SERVER_API_URL + 'api/pagos-tiendas';

    constructor(protected http: HttpClient) {}

    create(pagosTienda: IPagosTienda): Observable<EntityResponseType> {
        return this.http.post<IPagosTienda>(this.resourceUrl, pagosTienda, { observe: 'response' });
    }

    update(pagosTienda: IPagosTienda): Observable<EntityResponseType> {
        return this.http.put<IPagosTienda>(this.resourceUrl, pagosTienda, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPagosTienda>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPagosTienda[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

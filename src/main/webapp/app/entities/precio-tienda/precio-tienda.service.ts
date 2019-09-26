import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPrecioTienda } from 'app/shared/model/precio-tienda.model';

type EntityResponseType = HttpResponse<IPrecioTienda>;
type EntityArrayResponseType = HttpResponse<IPrecioTienda[]>;

@Injectable({ providedIn: 'root' })
export class PrecioTiendaService {
    public resourceUrl = SERVER_API_URL + 'api/precio-tiendas';

    constructor(protected http: HttpClient) {}

    create(precioTienda: IPrecioTienda): Observable<EntityResponseType> {
        return this.http.post<IPrecioTienda>(this.resourceUrl, precioTienda, { observe: 'response' });
    }

    update(precioTienda: IPrecioTienda): Observable<EntityResponseType> {
        return this.http.put<IPrecioTienda>(this.resourceUrl, precioTienda, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPrecioTienda>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPrecioTienda[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

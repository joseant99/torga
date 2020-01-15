import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IIvaProductoTienda } from 'app/shared/model/iva-producto-tienda.model';

type EntityResponseType = HttpResponse<IIvaProductoTienda>;
type EntityArrayResponseType = HttpResponse<IIvaProductoTienda[]>;

@Injectable({ providedIn: 'root' })
export class IvaProductoTiendaService {
    public resourceUrl = SERVER_API_URL + 'api/iva-producto-tiendas';

    constructor(protected http: HttpClient) {}

    create(ivaProductoTienda: IIvaProductoTienda): Observable<EntityResponseType> {
        return this.http.post<IIvaProductoTienda>(this.resourceUrl, ivaProductoTienda, { observe: 'response' });
    }

    update(ivaProductoTienda: IIvaProductoTienda): Observable<EntityResponseType> {
        return this.http.put<IIvaProductoTienda>(this.resourceUrl, ivaProductoTienda, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IIvaProductoTienda>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IIvaProductoTienda[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    bus(id: any): Observable<EntityArrayResponseType> {
        return this.http.get<IIvaProductoTienda[]>(`${this.resourceUrl}-bus/${id}`, { observe: 'response' });
    }
}

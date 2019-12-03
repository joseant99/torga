import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPrecioTiendaProductos } from 'app/shared/model/precio-tienda-productos.model';

type EntityResponseType = HttpResponse<IPrecioTiendaProductos>;
type EntityArrayResponseType = HttpResponse<IPrecioTiendaProductos[]>;

@Injectable({ providedIn: 'root' })
export class PrecioTiendaProductosService {
    public resourceUrl = SERVER_API_URL + 'api/precio-tienda-productos';
    public todos;
    public apoyo;
    constructor(protected http: HttpClient) {}

    create(precioTiendaProductos: IPrecioTiendaProductos): Observable<EntityResponseType> {
        return this.http.post<IPrecioTiendaProductos>(this.resourceUrl, precioTiendaProductos, { observe: 'response' });
    }

    update(precioTiendaProductos: IPrecioTiendaProductos): Observable<EntityResponseType> {
        return this.http.put<IPrecioTiendaProductos>(this.resourceUrl, precioTiendaProductos, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPrecioTiendaProductos>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    findProdId(id: number, tienda: any): Observable<EntityResponseType> {
        return this.http.get<IPrecioTiendaProductos>(`${this.resourceUrl}-idBus/${id}/${tienda}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPrecioTiendaProductos[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

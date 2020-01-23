import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProductosComposicion } from 'app/shared/model/productos-composicion.model';

type EntityResponseType = HttpResponse<IProductosComposicion>;
type EntityArrayResponseType = HttpResponse<IProductosComposicion[]>;

@Injectable({ providedIn: 'root' })
export class ProductosComposicionService {
    public resourceUrl = SERVER_API_URL + 'api/productos-composicions';

    constructor(protected http: HttpClient) {}

    create(productosComposicion: IProductosComposicion): Observable<EntityResponseType> {
        return this.http.post<IProductosComposicion>(this.resourceUrl, productosComposicion, { observe: 'response' });
    }

    update(productosComposicion: IProductosComposicion): Observable<EntityResponseType> {
        return this.http.put<IProductosComposicion>(this.resourceUrl, productosComposicion, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProductosComposicion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProductosComposicion[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query1(id: any): Observable<EntityArrayResponseType> {
        return this.http.get<IProductosComposicion[]>(`${this.resourceUrl}-bus/${id}`, { observe: 'response' });
    }
}

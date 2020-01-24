import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDireccionTiendas } from 'app/shared/model/direccion-tiendas.model';

type EntityResponseType = HttpResponse<IDireccionTiendas>;
type EntityArrayResponseType = HttpResponse<IDireccionTiendas[]>;

@Injectable({ providedIn: 'root' })
export class DireccionTiendasService {
    public resourceUrl = SERVER_API_URL + 'api/direccion-tiendas';
    public todos;
    constructor(protected http: HttpClient) {}

    create(direccionTiendas: IDireccionTiendas): Observable<EntityResponseType> {
        return this.http.post<IDireccionTiendas>(this.resourceUrl, direccionTiendas, { observe: 'response' });
    }

    update(direccionTiendas: IDireccionTiendas): Observable<EntityResponseType> {
        return this.http.put<IDireccionTiendas>(this.resourceUrl, direccionTiendas, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDireccionTiendas>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDireccionTiendas[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query1(id: any): Observable<EntityArrayResponseType> {
        return this.http.get<IDireccionTiendas[]>(`${this.resourceUrl}-bus/${id}`, { observe: 'response' });
    }
}

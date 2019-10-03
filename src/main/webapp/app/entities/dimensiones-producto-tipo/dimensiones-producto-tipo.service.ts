import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDimensionesProductoTipo } from 'app/shared/model/dimensiones-producto-tipo.model';

type EntityResponseType = HttpResponse<IDimensionesProductoTipo>;
type EntityArrayResponseType = HttpResponse<IDimensionesProductoTipo[]>;

@Injectable({ providedIn: 'root' })
export class DimensionesProductoTipoService {
    public resourceUrl = SERVER_API_URL + 'api/dimensiones-producto-tipos';
    public todos;
    constructor(protected http: HttpClient) {}

    create(dimensionesProductoTipo: IDimensionesProductoTipo): Observable<EntityResponseType> {
        return this.http.post<IDimensionesProductoTipo>(this.resourceUrl, dimensionesProductoTipo, { observe: 'response' });
    }

    update(dimensionesProductoTipo: IDimensionesProductoTipo): Observable<EntityResponseType> {
        return this.http.put<IDimensionesProductoTipo>(this.resourceUrl, dimensionesProductoTipo, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDimensionesProductoTipo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDimensionesProductoTipo[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query1(req?: any): Observable<EntityArrayResponseType> {
        return (this.todos = req.todasDimensiones);
    }

    findProducto(id: number): Observable<EntityResponseType> {
        return this.http.get<IDimensionesProductoTipo>(`${this.resourceUrl}-buscado-prod/${id}`, { observe: 'response' });
    }
}

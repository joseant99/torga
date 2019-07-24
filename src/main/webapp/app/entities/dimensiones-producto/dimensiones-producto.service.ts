import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDimensionesProducto } from 'app/shared/model/dimensiones-producto.model';

type EntityResponseType = HttpResponse<IDimensionesProducto>;
type EntityArrayResponseType = HttpResponse<IDimensionesProducto[]>;

@Injectable({ providedIn: 'root' })
export class DimensionesProductoService {
    public resourceUrl = SERVER_API_URL + 'api/dimensiones-productos';

    constructor(protected http: HttpClient) {}

    create(dimensionesProducto: IDimensionesProducto): Observable<EntityResponseType> {
        return this.http.post<IDimensionesProducto>(this.resourceUrl, dimensionesProducto, { observe: 'response' });
    }

    update(dimensionesProducto: IDimensionesProducto): Observable<EntityResponseType> {
        return this.http.put<IDimensionesProducto>(this.resourceUrl, dimensionesProducto, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDimensionesProducto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDimensionesProducto[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

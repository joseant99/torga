import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAcabadosProducto } from 'app/shared/model/acabados-producto.model';

type EntityResponseType = HttpResponse<IAcabadosProducto>;
type EntityArrayResponseType = HttpResponse<IAcabadosProducto[]>;

@Injectable({ providedIn: 'root' })
export class AcabadosProductoService {
    public resourceUrl = SERVER_API_URL + 'api/acabados-productos';

    constructor(protected http: HttpClient) {}

    create(acabadosProducto: IAcabadosProducto): Observable<EntityResponseType> {
        return this.http.post<IAcabadosProducto>(this.resourceUrl, acabadosProducto, { observe: 'response' });
    }

    update(acabadosProducto: IAcabadosProducto): Observable<EntityResponseType> {
        return this.http.put<IAcabadosProducto>(this.resourceUrl, acabadosProducto, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAcabadosProducto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAcabadosProducto[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

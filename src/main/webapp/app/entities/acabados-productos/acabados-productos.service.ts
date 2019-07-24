import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAcabados_Productos } from 'app/shared/model/acabados-productos.model';

type EntityResponseType = HttpResponse<IAcabados_Productos>;
type EntityArrayResponseType = HttpResponse<IAcabados_Productos[]>;

@Injectable({ providedIn: 'root' })
export class Acabados_ProductosService {
    public resourceUrl = SERVER_API_URL + 'api/acabados-productos';

    constructor(protected http: HttpClient) {}

    create(acabados_Productos: IAcabados_Productos): Observable<EntityResponseType> {
        return this.http.post<IAcabados_Productos>(this.resourceUrl, acabados_Productos, { observe: 'response' });
    }

    update(acabados_Productos: IAcabados_Productos): Observable<EntityResponseType> {
        return this.http.put<IAcabados_Productos>(this.resourceUrl, acabados_Productos, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAcabados_Productos>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAcabados_Productos[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

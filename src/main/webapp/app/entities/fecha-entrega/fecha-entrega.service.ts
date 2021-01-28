import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFecha_entrega } from 'app/shared/model/fecha-entrega.model';

type EntityResponseType = HttpResponse<IFecha_entrega>;
type EntityArrayResponseType = HttpResponse<IFecha_entrega[]>;

@Injectable({ providedIn: 'root' })
export class Fecha_entregaService {
    public resourceUrl = SERVER_API_URL + 'api/fecha-entregas';

    constructor(protected http: HttpClient) {}

    create(fecha_entrega: IFecha_entrega): Observable<EntityResponseType> {
        return this.http.post<IFecha_entrega>(this.resourceUrl, fecha_entrega, { observe: 'response' });
    }

    update(fecha_entrega: IFecha_entrega): Observable<EntityResponseType> {
        return this.http.put<IFecha_entrega>(this.resourceUrl, fecha_entrega, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFecha_entrega>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFecha_entrega[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

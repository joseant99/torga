import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMedEspProductoPedidoPresu } from 'app/shared/model/med-esp-producto-pedido-presu.model';

type EntityResponseType = HttpResponse<IMedEspProductoPedidoPresu>;
type EntityArrayResponseType = HttpResponse<IMedEspProductoPedidoPresu[]>;

@Injectable({ providedIn: 'root' })
export class MedEspProductoPedidoPresuService {
    public resourceUrl = SERVER_API_URL + 'api/med-esp-producto-pedido-presus';

    constructor(protected http: HttpClient) {}

    create(medEspProductoPedidoPresu: IMedEspProductoPedidoPresu): Observable<EntityResponseType> {
        return this.http.post<IMedEspProductoPedidoPresu>(this.resourceUrl, medEspProductoPedidoPresu, { observe: 'response' });
    }

    update(medEspProductoPedidoPresu: IMedEspProductoPedidoPresu): Observable<EntityResponseType> {
        return this.http.put<IMedEspProductoPedidoPresu>(this.resourceUrl, medEspProductoPedidoPresu, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMedEspProductoPedidoPresu>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMedEspProductoPedidoPresu[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

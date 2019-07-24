import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPedidos } from 'app/shared/model/pedidos.model';

type EntityResponseType = HttpResponse<IPedidos>;
type EntityArrayResponseType = HttpResponse<IPedidos[]>;

@Injectable({ providedIn: 'root' })
export class PedidosService {
    public resourceUrl = SERVER_API_URL + 'api/pedidos';

    constructor(protected http: HttpClient) {}

    create(pedidos: IPedidos): Observable<EntityResponseType> {
        return this.http.post<IPedidos>(this.resourceUrl, pedidos, { observe: 'response' });
    }

    update(pedidos: IPedidos): Observable<EntityResponseType> {
        return this.http.put<IPedidos>(this.resourceUrl, pedidos, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPedidos>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPedidos[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAcabadosProductosPresupuestoPedido } from 'app/shared/model/acabados-productos-presupuesto-pedido.model';

type EntityResponseType = HttpResponse<IAcabadosProductosPresupuestoPedido>;
type EntityArrayResponseType = HttpResponse<IAcabadosProductosPresupuestoPedido[]>;

@Injectable({ providedIn: 'root' })
export class AcabadosProductosPresupuestoPedidoService {
    public resourceUrl = SERVER_API_URL + 'api/acabados-productos-presupuesto-pedidos';
    public todos;
    constructor(protected http: HttpClient) {}

    create(acabadosProductosPresupuestoPedido: IAcabadosProductosPresupuestoPedido): Observable<EntityResponseType> {
        return this.http.post<IAcabadosProductosPresupuestoPedido>(this.resourceUrl, acabadosProductosPresupuestoPedido, {
            observe: 'response'
        });
    }

    update(acabadosProductosPresupuestoPedido: IAcabadosProductosPresupuestoPedido): Observable<EntityResponseType> {
        return this.http.put<IAcabadosProductosPresupuestoPedido>(this.resourceUrl, acabadosProductosPresupuestoPedido, {
            observe: 'response'
        });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAcabadosProductosPresupuestoPedido>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAcabadosProductosPresupuestoPedido[]>(this.resourceUrl, { params: options, observe: 'response' });
    }
    query1(id: number): Observable<EntityArrayResponseType> {
        return this.http.get<IAcabadosProductosPresupuestoPedido[]>(`${this.resourceUrl}-busqueda/${id}`, { observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

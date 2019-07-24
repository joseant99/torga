import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProductosPresupuestoPedidos } from 'app/shared/model/productos-presupuesto-pedidos.model';

type EntityResponseType = HttpResponse<IProductosPresupuestoPedidos>;
type EntityArrayResponseType = HttpResponse<IProductosPresupuestoPedidos[]>;

@Injectable({ providedIn: 'root' })
export class ProductosPresupuestoPedidosService {
    public resourceUrl = SERVER_API_URL + 'api/productos-presupuesto-pedidos';

    constructor(protected http: HttpClient) {}

    create(productosPresupuestoPedidos: IProductosPresupuestoPedidos): Observable<EntityResponseType> {
        return this.http.post<IProductosPresupuestoPedidos>(this.resourceUrl, productosPresupuestoPedidos, { observe: 'response' });
    }

    update(productosPresupuestoPedidos: IProductosPresupuestoPedidos): Observable<EntityResponseType> {
        return this.http.put<IProductosPresupuestoPedidos>(this.resourceUrl, productosPresupuestoPedidos, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProductosPresupuestoPedidos>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProductosPresupuestoPedidos[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

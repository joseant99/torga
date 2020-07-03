import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRepreGCompra } from 'app/shared/model/repre-g-compra.model';

type EntityResponseType = HttpResponse<IRepreGCompra>;
type EntityArrayResponseType = HttpResponse<IRepreGCompra[]>;

@Injectable({ providedIn: 'root' })
export class RepreGCompraService {
    public resourceUrl = SERVER_API_URL + 'api/repre-g-compras';

    constructor(protected http: HttpClient) {}

    create(repreGCompra: IRepreGCompra): Observable<EntityResponseType> {
        return this.http.post<IRepreGCompra>(this.resourceUrl, repreGCompra, { observe: 'response' });
    }

    update(repreGCompra: IRepreGCompra): Observable<EntityResponseType> {
        return this.http.put<IRepreGCompra>(this.resourceUrl, repreGCompra, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRepreGCompra>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRepreGCompra[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

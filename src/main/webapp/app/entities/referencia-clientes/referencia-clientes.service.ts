import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IReferenciaClientes } from 'app/shared/model/referencia-clientes.model';

type EntityResponseType = HttpResponse<IReferenciaClientes>;
type EntityArrayResponseType = HttpResponse<IReferenciaClientes[]>;

@Injectable({ providedIn: 'root' })
export class ReferenciaClientesService {
    public resourceUrl = SERVER_API_URL + 'api/referencia-clientes';

    constructor(protected http: HttpClient) {}

    create(referenciaClientes: IReferenciaClientes): Observable<EntityResponseType> {
        return this.http.post<IReferenciaClientes>(this.resourceUrl, referenciaClientes, { observe: 'response' });
    }

    update(referenciaClientes: IReferenciaClientes): Observable<EntityResponseType> {
        return this.http.put<IReferenciaClientes>(this.resourceUrl, referenciaClientes, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IReferenciaClientes>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IReferenciaClientes[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

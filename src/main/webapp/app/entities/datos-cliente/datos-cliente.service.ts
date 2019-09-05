import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDatosCliente } from 'app/shared/model/datos-cliente.model';

type EntityResponseType = HttpResponse<IDatosCliente>;
type EntityArrayResponseType = HttpResponse<IDatosCliente[]>;

@Injectable({ providedIn: 'root' })
export class DatosClienteService {
    public resourceUrl = SERVER_API_URL + 'api/datos-clientes';

    constructor(protected http: HttpClient) {}

    create(datosCliente: IDatosCliente): Observable<EntityResponseType> {
        return this.http.post<IDatosCliente>(this.resourceUrl, datosCliente, { observe: 'response' });
    }

    update(datosCliente: IDatosCliente): Observable<EntityResponseType> {
        return this.http.put<IDatosCliente>(this.resourceUrl, datosCliente, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDatosCliente>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDatosCliente[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

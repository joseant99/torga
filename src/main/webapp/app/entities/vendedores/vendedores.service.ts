import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVendedores } from 'app/shared/model/vendedores.model';

type EntityResponseType = HttpResponse<IVendedores>;
type EntityArrayResponseType = HttpResponse<IVendedores[]>;

@Injectable({ providedIn: 'root' })
export class VendedoresService {
    public resourceUrl = SERVER_API_URL + 'api/vendedores';

    constructor(protected http: HttpClient) {}

    create(vendedores: IVendedores): Observable<EntityResponseType> {
        return this.http.post<IVendedores>(this.resourceUrl, vendedores, { observe: 'response' });
    }

    update(vendedores: IVendedores): Observable<EntityResponseType> {
        return this.http.put<IVendedores>(this.resourceUrl, vendedores, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IVendedores>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IVendedores[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

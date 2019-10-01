import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAcaProd } from 'app/shared/model/aca-prod.model';

type EntityResponseType = HttpResponse<IAcaProd>;
type EntityArrayResponseType = HttpResponse<IAcaProd[]>;

@Injectable({ providedIn: 'root' })
export class AcaProdService {
    public resourceUrl = SERVER_API_URL + 'api/aca-prods';
    public todos = '';
    constructor(protected http: HttpClient) {}

    create(acaProd: IAcaProd): Observable<EntityResponseType> {
        return this.http.post<IAcaProd>(this.resourceUrl, acaProd, { observe: 'response' });
    }

    update(acaProd: IAcaProd): Observable<EntityResponseType> {
        return this.http.put<IAcaProd>(this.resourceUrl, acaProd, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAcaProd>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAcaProd[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query1(req?: any): Observable<EntityArrayResponseType> {
        return (this.todos = req.acaProdSer);
    }
}

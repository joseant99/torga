import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAcabadosComposicion } from 'app/shared/model/acabados-composicion.model';

type EntityResponseType = HttpResponse<IAcabadosComposicion>;
type EntityArrayResponseType = HttpResponse<IAcabadosComposicion[]>;

@Injectable({ providedIn: 'root' })
export class AcabadosComposicionService {
    public resourceUrl = SERVER_API_URL + 'api/acabados-composicions';

    constructor(protected http: HttpClient) {}

    create(acabadosComposicion: IAcabadosComposicion): Observable<EntityResponseType> {
        return this.http.post<IAcabadosComposicion>(this.resourceUrl, acabadosComposicion, { observe: 'response' });
    }

    update(acabadosComposicion: IAcabadosComposicion): Observable<EntityResponseType> {
        return this.http.put<IAcabadosComposicion>(this.resourceUrl, acabadosComposicion, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAcabadosComposicion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAcabadosComposicion[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query1(id: any): Observable<EntityArrayResponseType> {
        return this.http.get<IAcabadosComposicion[]>(`${this.resourceUrl}-bus/${id}`, { observe: 'response' });
    }
}

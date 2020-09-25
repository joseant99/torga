import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAcabados } from 'app/shared/model/acabados.model';

type EntityResponseType = HttpResponse<IAcabados>;
type EntityArrayResponseType = HttpResponse<IAcabados[]>;

@Injectable({ providedIn: 'root' })
export class AcabadosService {
    public resourceUrl = SERVER_API_URL + 'api/acabados';
    public todos;

    constructor(protected http: HttpClient) {}

    create(acabados: IAcabados): Observable<EntityResponseType> {
        return this.http.post<IAcabados>(this.resourceUrl, acabados, { observe: 'response' });
    }

    update(acabados: IAcabados): Observable<EntityResponseType> {
        return this.http.put<IAcabados>(this.resourceUrl, acabados, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAcabados>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAcabados[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

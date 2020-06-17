import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICajeado } from 'app/shared/model/cajeado.model';

type EntityResponseType = HttpResponse<ICajeado>;
type EntityArrayResponseType = HttpResponse<ICajeado[]>;

@Injectable({ providedIn: 'root' })
export class CajeadoService {
    public resourceUrl = SERVER_API_URL + 'api/cajeados';

    constructor(protected http: HttpClient) {}

    create(cajeado: ICajeado): Observable<EntityResponseType> {
        return this.http.post<ICajeado>(this.resourceUrl, cajeado, { observe: 'response' });
    }

    update(cajeado: ICajeado): Observable<EntityResponseType> {
        return this.http.put<ICajeado>(this.resourceUrl, cajeado, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICajeado>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICajeado[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

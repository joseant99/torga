import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IExposicion } from 'app/shared/model/exposicion.model';

type EntityResponseType = HttpResponse<IExposicion>;
type EntityArrayResponseType = HttpResponse<IExposicion[]>;

@Injectable({ providedIn: 'root' })
export class ExposicionService {
    public resourceUrl = SERVER_API_URL + 'api/exposicions';

    constructor(protected http: HttpClient) {}

    create(exposicion: IExposicion): Observable<EntityResponseType> {
        return this.http.post<IExposicion>(this.resourceUrl, exposicion, { observe: 'response' });
    }

    update(exposicion: IExposicion): Observable<EntityResponseType> {
        return this.http.put<IExposicion>(this.resourceUrl, exposicion, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IExposicion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IExposicion[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

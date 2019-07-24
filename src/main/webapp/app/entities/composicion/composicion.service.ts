import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IComposicion } from 'app/shared/model/composicion.model';

type EntityResponseType = HttpResponse<IComposicion>;
type EntityArrayResponseType = HttpResponse<IComposicion[]>;

@Injectable({ providedIn: 'root' })
export class ComposicionService {
    public resourceUrl = SERVER_API_URL + 'api/composicions';

    constructor(protected http: HttpClient) {}

    create(composicion: IComposicion): Observable<EntityResponseType> {
        return this.http.post<IComposicion>(this.resourceUrl, composicion, { observe: 'response' });
    }

    update(composicion: IComposicion): Observable<EntityResponseType> {
        return this.http.put<IComposicion>(this.resourceUrl, composicion, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IComposicion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IComposicion[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

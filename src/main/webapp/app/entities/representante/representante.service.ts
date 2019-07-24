import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRepresentante } from 'app/shared/model/representante.model';

type EntityResponseType = HttpResponse<IRepresentante>;
type EntityArrayResponseType = HttpResponse<IRepresentante[]>;

@Injectable({ providedIn: 'root' })
export class RepresentanteService {
    public resourceUrl = SERVER_API_URL + 'api/representantes';

    constructor(protected http: HttpClient) {}

    create(representante: IRepresentante): Observable<EntityResponseType> {
        return this.http.post<IRepresentante>(this.resourceUrl, representante, { observe: 'response' });
    }

    update(representante: IRepresentante): Observable<EntityResponseType> {
        return this.http.put<IRepresentante>(this.resourceUrl, representante, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRepresentante>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRepresentante[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

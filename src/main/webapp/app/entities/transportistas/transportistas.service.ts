import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITransportistas } from 'app/shared/model/transportistas.model';

type EntityResponseType = HttpResponse<ITransportistas>;
type EntityArrayResponseType = HttpResponse<ITransportistas[]>;

@Injectable({ providedIn: 'root' })
export class TransportistasService {
    public resourceUrl = SERVER_API_URL + 'api/transportistas';

    constructor(protected http: HttpClient) {}

    create(transportistas: ITransportistas): Observable<EntityResponseType> {
        return this.http.post<ITransportistas>(this.resourceUrl, transportistas, { observe: 'response' });
    }

    update(transportistas: ITransportistas): Observable<EntityResponseType> {
        return this.http.put<ITransportistas>(this.resourceUrl, transportistas, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITransportistas>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITransportistas[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

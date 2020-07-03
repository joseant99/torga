import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITransportistaTabla } from 'app/shared/model/transportista-tabla.model';

type EntityResponseType = HttpResponse<ITransportistaTabla>;
type EntityArrayResponseType = HttpResponse<ITransportistaTabla[]>;

@Injectable({ providedIn: 'root' })
export class TransportistaTablaService {
    public resourceUrl = SERVER_API_URL + 'api/transportista-tablas';

    constructor(protected http: HttpClient) {}

    create(transportistaTabla: ITransportistaTabla): Observable<EntityResponseType> {
        return this.http.post<ITransportistaTabla>(this.resourceUrl, transportistaTabla, { observe: 'response' });
    }

    update(transportistaTabla: ITransportistaTabla): Observable<EntityResponseType> {
        return this.http.put<ITransportistaTabla>(this.resourceUrl, transportistaTabla, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITransportistaTabla>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITransportistaTabla[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

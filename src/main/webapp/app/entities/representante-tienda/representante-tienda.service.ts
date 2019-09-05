import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRepresentanteTienda } from 'app/shared/model/representante-tienda.model';

type EntityResponseType = HttpResponse<IRepresentanteTienda>;
type EntityArrayResponseType = HttpResponse<IRepresentanteTienda[]>;

@Injectable({ providedIn: 'root' })
export class RepresentanteTiendaService {
    public resourceUrl = SERVER_API_URL + 'api/representante-tiendas';

    constructor(protected http: HttpClient) {}

    create(representanteTienda: IRepresentanteTienda): Observable<EntityResponseType> {
        return this.http.post<IRepresentanteTienda>(this.resourceUrl, representanteTienda, { observe: 'response' });
    }

    update(representanteTienda: IRepresentanteTienda): Observable<EntityResponseType> {
        return this.http.put<IRepresentanteTienda>(this.resourceUrl, representanteTienda, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRepresentanteTienda>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRepresentanteTienda[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

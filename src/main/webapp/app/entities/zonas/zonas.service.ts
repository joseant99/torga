import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IZonas } from 'app/shared/model/zonas.model';

type EntityResponseType = HttpResponse<IZonas>;
type EntityArrayResponseType = HttpResponse<IZonas[]>;

@Injectable({ providedIn: 'root' })
export class ZonasService {
    public resourceUrl = SERVER_API_URL + 'api/zonas';

    constructor(protected http: HttpClient) {}

    create(zonas: IZonas): Observable<EntityResponseType> {
        return this.http.post<IZonas>(this.resourceUrl, zonas, { observe: 'response' });
    }

    update(zonas: IZonas): Observable<EntityResponseType> {
        return this.http.put<IZonas>(this.resourceUrl, zonas, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IZonas>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IZonas[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

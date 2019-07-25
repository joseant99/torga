import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMunicipios } from 'app/shared/model/municipios.model';

type EntityResponseType = HttpResponse<IMunicipios>;
type EntityArrayResponseType = HttpResponse<IMunicipios[]>;

@Injectable({ providedIn: 'root' })
export class MunicipiosService {
    public resourceUrl = SERVER_API_URL + 'api/municipios';
    public resourceUrl1 = SERVER_API_URL + 'api/municipios1';

    constructor(protected http: HttpClient) {}

    create(municipios: IMunicipios): Observable<EntityResponseType> {
        return this.http.post<IMunicipios>(this.resourceUrl, municipios, { observe: 'response' });
    }

    update(municipios: IMunicipios): Observable<EntityResponseType> {
        return this.http.put<IMunicipios>(this.resourceUrl, municipios, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMunicipios>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMunicipios[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query1(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMunicipios[]>(this.resourceUrl1);
    }
}

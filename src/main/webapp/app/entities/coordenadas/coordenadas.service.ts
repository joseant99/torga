import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICoordenadas } from 'app/shared/model/coordenadas.model';

type EntityResponseType = HttpResponse<ICoordenadas>;
type EntityArrayResponseType = HttpResponse<ICoordenadas[]>;

@Injectable({ providedIn: 'root' })
export class CoordenadasService {
    public resourceUrl = SERVER_API_URL + 'api/coordenadas';

    constructor(protected http: HttpClient) {}

    create(coordenadas: ICoordenadas): Observable<EntityResponseType> {
        return this.http.post<ICoordenadas>(this.resourceUrl, coordenadas, { observe: 'response' });
    }

    update(coordenadas: ICoordenadas): Observable<EntityResponseType> {
        return this.http.put<ICoordenadas>(this.resourceUrl, coordenadas, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICoordenadas>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICoordenadas[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

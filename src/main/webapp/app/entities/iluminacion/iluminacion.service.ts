import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IIluminacion } from 'app/shared/model/iluminacion.model';

type EntityResponseType = HttpResponse<IIluminacion>;
type EntityArrayResponseType = HttpResponse<IIluminacion[]>;

@Injectable({ providedIn: 'root' })
export class IluminacionService {
    public resourceUrl = SERVER_API_URL + 'api/iluminacions';
    public todos;
    public metidos;
    constructor(protected http: HttpClient) {}

    create(iluminacion: IIluminacion): Observable<EntityResponseType> {
        return this.http.post<IIluminacion>(this.resourceUrl, iluminacion, { observe: 'response' });
    }

    update(iluminacion: IIluminacion): Observable<EntityResponseType> {
        return this.http.put<IIluminacion>(this.resourceUrl, iluminacion, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IIluminacion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IIluminacion[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    findProd(id: any): Observable<EntityArrayResponseType> {
        return this.http.get<IIluminacion[]>(`${this.resourceUrl}-findProd/${id}`, { observe: 'response' });
    }
}

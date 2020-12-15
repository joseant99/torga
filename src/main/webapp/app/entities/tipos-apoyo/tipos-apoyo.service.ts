import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITiposApoyo } from 'app/shared/model/tipos-apoyo.model';

type EntityResponseType = HttpResponse<ITiposApoyo>;
type EntityArrayResponseType = HttpResponse<ITiposApoyo[]>;

@Injectable({ providedIn: 'root' })
export class TiposApoyoService {
    public todos;
    public resourceUrl = SERVER_API_URL + 'api/tipos-apoyos';

    constructor(protected http: HttpClient) {}

    create(tiposApoyo: ITiposApoyo): Observable<EntityResponseType> {
        return this.http.post<ITiposApoyo>(this.resourceUrl, tiposApoyo, { observe: 'response' });
    }

    update(tiposApoyo: ITiposApoyo): Observable<EntityResponseType> {
        return this.http.put<ITiposApoyo>(this.resourceUrl, tiposApoyo, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITiposApoyo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITiposApoyo[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    findBus(id: any): Observable<EntityArrayResponseType> {
        return this.http.get<ITiposApoyo[]>(`${this.resourceUrl}-id/${id}`, { observe: 'response' });
    }

    findBus1(id: any): Observable<EntityArrayResponseType> {
        return this.http.get<ITiposApoyo[]>(`${this.resourceUrl}-id1/${id}`, { observe: 'response' });
    }

    findBus2(id: any, ancho: any): Observable<EntityArrayResponseType> {
        return this.http.get<ITiposApoyo[]>(`${this.resourceUrl}-id2/${id}/${ancho}`, { observe: 'response' });
    }
}

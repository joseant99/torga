import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IArmario } from 'app/shared/model/armario.model';

type EntityResponseType = HttpResponse<IArmario>;
type EntityArrayResponseType = HttpResponse<IArmario[]>;

@Injectable({ providedIn: 'root' })
export class ArmarioService {
    public resourceUrl = SERVER_API_URL + 'api/armarios';
    public todo;
    constructor(protected http: HttpClient) {}

    create(armario: IArmario): Observable<EntityResponseType> {
        return this.http.post<IArmario>(this.resourceUrl, armario, { observe: 'response' });
    }

    update(armario: IArmario): Observable<EntityResponseType> {
        return this.http.put<IArmario>(this.resourceUrl, armario, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IArmario>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IArmario[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    findBus(min: any, max: any): Observable<EntityResponseType> {
        return this.http.get<IArmario>(`${this.resourceUrl}-bus/${min}/${max}`, { observe: 'response' });
    }
    findBus1(min: any, max: any): Observable<EntityResponseType> {
        return this.http.get<IArmario>(`${this.resourceUrl}-bus1/${min}/${max}`, { observe: 'response' });
    }

    findBus2(min: any, max: any): Observable<EntityResponseType> {
        return this.http.get<IArmario>(`${this.resourceUrl}-bus2/${min}/${max}`, { observe: 'response' });
    }

    findBus3(min: any, max: any): Observable<EntityResponseType> {
        return this.http.get<IArmario>(`${this.resourceUrl}-bus3/${min}/${max}`, { observe: 'response' });
    }
}

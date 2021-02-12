import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMedidasEspeciales } from 'app/shared/model/medidas-especiales.model';

type EntityResponseType = HttpResponse<IMedidasEspeciales>;
type EntityArrayResponseType = HttpResponse<IMedidasEspeciales[]>;

@Injectable({ providedIn: 'root' })
export class MedidasEspecialesService {
    public resourceUrl = SERVER_API_URL + 'api/medidas-especiales';
    public todos = '';
    constructor(protected http: HttpClient) {}

    create(medidasEspeciales: IMedidasEspeciales): Observable<EntityResponseType> {
        return this.http.post<IMedidasEspeciales>(this.resourceUrl, medidasEspeciales, { observe: 'response' });
    }

    update(medidasEspeciales: IMedidasEspeciales): Observable<EntityResponseType> {
        return this.http.put<IMedidasEspeciales>(this.resourceUrl, medidasEspeciales, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMedidasEspeciales>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMedidasEspeciales[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    query1(req?: any): Observable<EntityArrayResponseType> {
        return (this.todos = req.especiales);
    }
    findProd(id: any, altura: any): Observable<EntityResponseType> {
        return this.http.get<IMedidasEspeciales>(`${this.resourceUrl}-bus/${id}/${altura}`, { observe: 'response' });
    }
    findProd1(id: any, altura: any): Observable<EntityResponseType> {
        return this.http.get<IMedidasEspeciales>(`${this.resourceUrl}-bus1/${id}/${altura}`, { observe: 'response' });
    }
    findProd2(id: any, altura: any): Observable<EntityResponseType> {
        return this.http.get<IMedidasEspeciales>(`${this.resourceUrl}-bus2/${id}/${altura}`, { observe: 'response' });
    }
    findProdMesa(id: any, altura: any): Observable<EntityResponseType> {
        return this.http.get<IMedidasEspeciales>(`${this.resourceUrl}-bus-mesa/${id}/${altura}`, { observe: 'response' });
    }
    findProd1Mesa(id: any, altura: any): Observable<EntityResponseType> {
        return this.http.get<IMedidasEspeciales>(`${this.resourceUrl}-bus1-mesa/${id}/${altura}`, { observe: 'response' });
    }
    findProd2Mesa(id: any, altura: any): Observable<EntityResponseType> {
        return this.http.get<IMedidasEspeciales>(`${this.resourceUrl}-bus2-mesa/${id}/${altura}`, { observe: 'response' });
    }
}

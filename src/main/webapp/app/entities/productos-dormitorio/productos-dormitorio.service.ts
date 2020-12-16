import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';

type EntityResponseType = HttpResponse<IProductosDormitorio>;
type EntityArrayResponseType = HttpResponse<IProductosDormitorio[]>;

@Injectable({ providedIn: 'root' })
export class ProductosDormitorioService {
    public resourceUrl = SERVER_API_URL + 'api/productos-dormitorios';
    public todos;
    public numeroCesta;
    public puertas;
    constructor(protected http: HttpClient) {}

    create(productosDormitorio: IProductosDormitorio): Observable<EntityResponseType> {
        return this.http.post<IProductosDormitorio>(this.resourceUrl, productosDormitorio, { observe: 'response' });
    }

    update(productosDormitorio: IProductosDormitorio): Observable<EntityResponseType> {
        return this.http.put<IProductosDormitorio>(this.resourceUrl, productosDormitorio, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProductosDormitorio>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProductosDormitorio[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query1(req?: any): Observable<EntityArrayResponseType> {
        return (this.todos = req.productos);
    }
    categoria(id: number): Observable<EntityResponseType> {
        return this.http.get<IProductosDormitorio>(`${this.resourceUrl}-categoria/${id}`, { observe: 'response' });
    }
    categoria1(id: number): Observable<EntityResponseType> {
        return this.http.get<IProductosDormitorio>(`${this.resourceUrl}-categoria1/${id}`, { observe: 'response' });
    }
    categoria2(id: number): Observable<EntityArrayResponseType> {
        return this.http.get<IProductosDormitorio[]>(`${this.resourceUrl}-categoria/${id}`, { observe: 'response' });
    }

    categoria12(id: number): Observable<EntityResponseType> {
        return this.http.get<IProductosDormitorio>(`${this.resourceUrl}-categoria12/${id}`, { observe: 'response' });
    }

    categoria13(id: number): Observable<EntityResponseType> {
        return this.http.get<IProductosDormitorio>(`${this.resourceUrl}-categoria13/${id}`, { observe: 'response' });
    }

    categoria14(id: number): Observable<EntityResponseType> {
        return this.http.get<IProductosDormitorio>(`${this.resourceUrl}-categoria14/${id}`, { observe: 'response' });
    }
}

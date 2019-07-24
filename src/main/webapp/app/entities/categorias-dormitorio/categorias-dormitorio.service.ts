import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICategorias_Dormitorio } from 'app/shared/model/categorias-dormitorio.model';

type EntityResponseType = HttpResponse<ICategorias_Dormitorio>;
type EntityArrayResponseType = HttpResponse<ICategorias_Dormitorio[]>;

@Injectable({ providedIn: 'root' })
export class Categorias_DormitorioService {
    public resourceUrl = SERVER_API_URL + 'api/categorias-dormitorios';

    constructor(protected http: HttpClient) {}

    create(categorias_Dormitorio: ICategorias_Dormitorio): Observable<EntityResponseType> {
        return this.http.post<ICategorias_Dormitorio>(this.resourceUrl, categorias_Dormitorio, { observe: 'response' });
    }

    update(categorias_Dormitorio: ICategorias_Dormitorio): Observable<EntityResponseType> {
        return this.http.put<ICategorias_Dormitorio>(this.resourceUrl, categorias_Dormitorio, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICategorias_Dormitorio>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICategorias_Dormitorio[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICategoriasDormi } from 'app/shared/model/categorias-dormi.model';

type EntityResponseType = HttpResponse<ICategoriasDormi>;
type EntityArrayResponseType = HttpResponse<ICategoriasDormi[]>;

@Injectable({ providedIn: 'root' })
export class CategoriasDormiService {
    public resourceUrl = SERVER_API_URL + 'api/categorias-dormis';

    constructor(protected http: HttpClient) {}

    create(categoriasDormi: ICategoriasDormi): Observable<EntityResponseType> {
        return this.http.post<ICategoriasDormi>(this.resourceUrl, categoriasDormi, { observe: 'response' });
    }

    update(categoriasDormi: ICategoriasDormi): Observable<EntityResponseType> {
        return this.http.put<ICategoriasDormi>(this.resourceUrl, categoriasDormi, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICategoriasDormi>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICategoriasDormi[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

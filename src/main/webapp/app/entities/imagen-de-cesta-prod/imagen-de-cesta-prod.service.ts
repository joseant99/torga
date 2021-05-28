import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IImagenDeCestaProd } from 'app/shared/model/imagen-de-cesta-prod.model';

type EntityResponseType = HttpResponse<IImagenDeCestaProd>;
type EntityArrayResponseType = HttpResponse<IImagenDeCestaProd[]>;

@Injectable({ providedIn: 'root' })
export class ImagenDeCestaProdService {
    public resourceUrl = SERVER_API_URL + 'api/imagen-de-cesta-prods';

    constructor(protected http: HttpClient) {}

    create(imagenDeCestaProd: IImagenDeCestaProd): Observable<EntityResponseType> {
        return this.http.post<IImagenDeCestaProd>(this.resourceUrl, imagenDeCestaProd, { observe: 'response' });
    }

    update(imagenDeCestaProd: IImagenDeCestaProd): Observable<EntityResponseType> {
        return this.http.put<IImagenDeCestaProd>(this.resourceUrl, imagenDeCestaProd, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IImagenDeCestaProd>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IImagenDeCestaProd[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    findCoger(id: any): Observable<EntityResponseType> {
        return this.http.get<IImagenDeCestaProd>(`${this.resourceUrl}-id/${id}`, { observe: 'response' });
    }
}

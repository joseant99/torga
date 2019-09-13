import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IImagenesContactoFabrica } from 'app/shared/model/imagenes-contacto-fabrica.model';

type EntityResponseType = HttpResponse<IImagenesContactoFabrica>;
type EntityArrayResponseType = HttpResponse<IImagenesContactoFabrica[]>;

@Injectable({ providedIn: 'root' })
export class ImagenesContactoFabricaService {
    public resourceUrl = SERVER_API_URL + 'api/imagenes-contacto-fabricas';

    constructor(protected http: HttpClient) {}

    create(imagenesContactoFabrica: IImagenesContactoFabrica): Observable<EntityResponseType> {
        return this.http.post<IImagenesContactoFabrica>(this.resourceUrl, imagenesContactoFabrica, { observe: 'response' });
    }

    update(imagenesContactoFabrica: IImagenesContactoFabrica): Observable<EntityResponseType> {
        return this.http.put<IImagenesContactoFabrica>(this.resourceUrl, imagenesContactoFabrica, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IImagenesContactoFabrica>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IImagenesContactoFabrica[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

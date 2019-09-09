import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IContactoFabrica } from 'app/shared/model/contacto-fabrica.model';

type EntityResponseType = HttpResponse<IContactoFabrica>;
type EntityArrayResponseType = HttpResponse<IContactoFabrica[]>;

@Injectable({ providedIn: 'root' })
export class ContactoFabricaService {
    public resourceUrl = SERVER_API_URL + 'api/contacto-fabricas';

    constructor(protected http: HttpClient) {}

    create(contactoFabrica: IContactoFabrica): Observable<EntityResponseType> {
        return this.http.post<IContactoFabrica>(this.resourceUrl, contactoFabrica, { observe: 'response' });
    }

    update(contactoFabrica: IContactoFabrica): Observable<EntityResponseType> {
        return this.http.put<IContactoFabrica>(this.resourceUrl, contactoFabrica, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IContactoFabrica>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IContactoFabrica[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

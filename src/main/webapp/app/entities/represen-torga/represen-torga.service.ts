import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRepresenTorga } from 'app/shared/model/represen-torga.model';

type EntityResponseType = HttpResponse<IRepresenTorga>;
type EntityArrayResponseType = HttpResponse<IRepresenTorga[]>;

@Injectable({ providedIn: 'root' })
export class RepresenTorgaService {
    public resourceUrl = SERVER_API_URL + 'api/represen-torgas';

    constructor(protected http: HttpClient) {}

    create(represenTorga: IRepresenTorga): Observable<EntityResponseType> {
        return this.http.post<IRepresenTorga>(this.resourceUrl, represenTorga, { observe: 'response' });
    }

    update(represenTorga: IRepresenTorga): Observable<EntityResponseType> {
        return this.http.put<IRepresenTorga>(this.resourceUrl, represenTorga, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRepresenTorga>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRepresenTorga[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IInterioresArmarios } from 'app/shared/model/interiores-armarios.model';

type EntityResponseType = HttpResponse<IInterioresArmarios>;
type EntityArrayResponseType = HttpResponse<IInterioresArmarios[]>;

@Injectable({ providedIn: 'root' })
export class InterioresArmariosService {
    public resourceUrl = SERVER_API_URL + 'api/interiores-armarios';

    constructor(protected http: HttpClient) {}

    create(interioresArmarios: IInterioresArmarios): Observable<EntityResponseType> {
        return this.http.post<IInterioresArmarios>(this.resourceUrl, interioresArmarios, { observe: 'response' });
    }

    update(interioresArmarios: IInterioresArmarios): Observable<EntityResponseType> {
        return this.http.put<IInterioresArmarios>(this.resourceUrl, interioresArmarios, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IInterioresArmarios>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IInterioresArmarios[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

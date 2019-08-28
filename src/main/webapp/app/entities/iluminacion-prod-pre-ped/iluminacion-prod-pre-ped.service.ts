import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IIluminacionProdPrePed } from 'app/shared/model/iluminacion-prod-pre-ped.model';

type EntityResponseType = HttpResponse<IIluminacionProdPrePed>;
type EntityArrayResponseType = HttpResponse<IIluminacionProdPrePed[]>;

@Injectable({ providedIn: 'root' })
export class IluminacionProdPrePedService {
    public resourceUrl = SERVER_API_URL + 'api/iluminacion-prod-pre-peds';

    constructor(protected http: HttpClient) {}

    create(iluminacionProdPrePed: IIluminacionProdPrePed): Observable<EntityResponseType> {
        return this.http.post<IIluminacionProdPrePed>(this.resourceUrl, iluminacionProdPrePed, { observe: 'response' });
    }

    update(iluminacionProdPrePed: IIluminacionProdPrePed): Observable<EntityResponseType> {
        return this.http.put<IIluminacionProdPrePed>(this.resourceUrl, iluminacionProdPrePed, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IIluminacionProdPrePed>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IIluminacionProdPrePed[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

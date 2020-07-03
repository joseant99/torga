import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFPago } from 'app/shared/model/f-pago.model';

type EntityResponseType = HttpResponse<IFPago>;
type EntityArrayResponseType = HttpResponse<IFPago[]>;

@Injectable({ providedIn: 'root' })
export class FPagoService {
    public resourceUrl = SERVER_API_URL + 'api/f-pagos';

    constructor(protected http: HttpClient) {}

    create(fPago: IFPago): Observable<EntityResponseType> {
        return this.http.post<IFPago>(this.resourceUrl, fPago, { observe: 'response' });
    }

    update(fPago: IFPago): Observable<EntityResponseType> {
        return this.http.put<IFPago>(this.resourceUrl, fPago, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFPago>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFPago[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

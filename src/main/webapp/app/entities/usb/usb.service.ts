import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUsb } from 'app/shared/model/usb.model';

type EntityResponseType = HttpResponse<IUsb>;
type EntityArrayResponseType = HttpResponse<IUsb[]>;

@Injectable({ providedIn: 'root' })
export class UsbService {
    public resourceUrl = SERVER_API_URL + 'api/usbs';

    constructor(protected http: HttpClient) {}

    create(usb: IUsb): Observable<EntityResponseType> {
        return this.http.post<IUsb>(this.resourceUrl, usb, { observe: 'response' });
    }

    update(usb: IUsb): Observable<EntityResponseType> {
        return this.http.put<IUsb>(this.resourceUrl, usb, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IUsb>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUsb[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

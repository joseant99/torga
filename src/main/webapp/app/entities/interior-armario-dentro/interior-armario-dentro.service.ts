import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IInteriorArmarioDentro } from 'app/shared/model/interior-armario-dentro.model';

type EntityResponseType = HttpResponse<IInteriorArmarioDentro>;
type EntityArrayResponseType = HttpResponse<IInteriorArmarioDentro[]>;

@Injectable({ providedIn: 'root' })
export class InteriorArmarioDentroService {
    public resourceUrl = SERVER_API_URL + 'api/interior-armario-dentros';

    constructor(protected http: HttpClient) {}

    create(interiorArmarioDentro: IInteriorArmarioDentro): Observable<EntityResponseType> {
        return this.http.post<IInteriorArmarioDentro>(this.resourceUrl, interiorArmarioDentro, { observe: 'response' });
    }

    update(interiorArmarioDentro: IInteriorArmarioDentro): Observable<EntityResponseType> {
        return this.http.put<IInteriorArmarioDentro>(this.resourceUrl, interiorArmarioDentro, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IInteriorArmarioDentro>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IInteriorArmarioDentro[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

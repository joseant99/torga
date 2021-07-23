import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IInteriorArmarioMedida } from 'app/shared/model/interior-armario-medida.model';

type EntityResponseType = HttpResponse<IInteriorArmarioMedida>;
type EntityArrayResponseType = HttpResponse<IInteriorArmarioMedida[]>;

@Injectable({ providedIn: 'root' })
export class InteriorArmarioMedidaService {
    public resourceUrl = SERVER_API_URL + 'api/interior-armario-medidas';

    constructor(protected http: HttpClient) {}

    create(interiorArmarioMedida: IInteriorArmarioMedida): Observable<EntityResponseType> {
        return this.http.post<IInteriorArmarioMedida>(this.resourceUrl, interiorArmarioMedida, { observe: 'response' });
    }

    update(interiorArmarioMedida: IInteriorArmarioMedida): Observable<EntityResponseType> {
        return this.http.put<IInteriorArmarioMedida>(this.resourceUrl, interiorArmarioMedida, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IInteriorArmarioMedida>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IInteriorArmarioMedida[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPresupuestoArmarioInteriores } from 'app/shared/model/presupuesto-armario-interiores.model';

type EntityResponseType = HttpResponse<IPresupuestoArmarioInteriores>;
type EntityArrayResponseType = HttpResponse<IPresupuestoArmarioInteriores[]>;

@Injectable({ providedIn: 'root' })
export class PresupuestoArmarioInterioresService {
    public resourceUrl = SERVER_API_URL + 'api/presupuesto-armario-interiores';

    constructor(protected http: HttpClient) {}

    create(presupuestoArmarioInteriores: IPresupuestoArmarioInteriores): Observable<EntityResponseType> {
        return this.http.post<IPresupuestoArmarioInteriores>(this.resourceUrl, presupuestoArmarioInteriores, { observe: 'response' });
    }

    update(presupuestoArmarioInteriores: IPresupuestoArmarioInteriores): Observable<EntityResponseType> {
        return this.http.put<IPresupuestoArmarioInteriores>(this.resourceUrl, presupuestoArmarioInteriores, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPresupuestoArmarioInteriores>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPresupuestoArmarioInteriores[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

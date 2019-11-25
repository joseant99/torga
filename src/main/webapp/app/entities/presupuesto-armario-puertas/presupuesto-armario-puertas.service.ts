import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPresupuestoArmarioPuertas } from 'app/shared/model/presupuesto-armario-puertas.model';

type EntityResponseType = HttpResponse<IPresupuestoArmarioPuertas>;
type EntityArrayResponseType = HttpResponse<IPresupuestoArmarioPuertas[]>;

@Injectable({ providedIn: 'root' })
export class PresupuestoArmarioPuertasService {
    public resourceUrl = SERVER_API_URL + 'api/presupuesto-armario-puertas';

    constructor(protected http: HttpClient) {}

    create(presupuestoArmarioPuertas: IPresupuestoArmarioPuertas): Observable<EntityResponseType> {
        return this.http.post<IPresupuestoArmarioPuertas>(this.resourceUrl, presupuestoArmarioPuertas, { observe: 'response' });
    }

    update(presupuestoArmarioPuertas: IPresupuestoArmarioPuertas): Observable<EntityResponseType> {
        return this.http.put<IPresupuestoArmarioPuertas>(this.resourceUrl, presupuestoArmarioPuertas, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPresupuestoArmarioPuertas>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPresupuestoArmarioPuertas[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

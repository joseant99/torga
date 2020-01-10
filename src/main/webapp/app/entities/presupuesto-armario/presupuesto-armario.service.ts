import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPresupuestoArmario } from 'app/shared/model/presupuesto-armario.model';

type EntityResponseType = HttpResponse<IPresupuestoArmario>;
type EntityArrayResponseType = HttpResponse<IPresupuestoArmario[]>;

@Injectable({ providedIn: 'root' })
export class PresupuestoArmarioService {
    public resourceUrl = SERVER_API_URL + 'api/presupuesto-armarios';

    constructor(protected http: HttpClient) {}

    create(presupuestoArmario: IPresupuestoArmario): Observable<EntityResponseType> {
        return this.http.post<IPresupuestoArmario>(this.resourceUrl, presupuestoArmario, { observe: 'response' });
    }

    update(presupuestoArmario: IPresupuestoArmario): Observable<EntityResponseType> {
        return this.http.put<IPresupuestoArmario>(this.resourceUrl, presupuestoArmario, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPresupuestoArmario>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPresupuestoArmario[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    findBus(id: any): Observable<EntityArrayResponseType> {
        return this.http.get<IPresupuestoArmario[]>(`${this.resourceUrl}-busqueda/${id}`, { observe: 'response' });
    }
}

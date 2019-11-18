import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IInterioresArmarioNuevos } from 'app/shared/model/interiores-armario-nuevos.model';

type EntityResponseType = HttpResponse<IInterioresArmarioNuevos>;
type EntityArrayResponseType = HttpResponse<IInterioresArmarioNuevos[]>;

@Injectable({ providedIn: 'root' })
export class InterioresArmarioNuevosService {
    public resourceUrl = SERVER_API_URL + 'api/interiores-armario-nuevos';

    constructor(protected http: HttpClient) {}

    create(interioresArmarioNuevos: IInterioresArmarioNuevos): Observable<EntityResponseType> {
        return this.http.post<IInterioresArmarioNuevos>(this.resourceUrl, interioresArmarioNuevos, { observe: 'response' });
    }

    update(interioresArmarioNuevos: IInterioresArmarioNuevos): Observable<EntityResponseType> {
        return this.http.put<IInterioresArmarioNuevos>(this.resourceUrl, interioresArmarioNuevos, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IInterioresArmarioNuevos>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IInterioresArmarioNuevos[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    findBus(ancho: any, puerta: any): Observable<EntityArrayResponseType> {
        return this.http.get<IInterioresArmarioNuevos[]>(`${this.resourceUrl}-bus/${ancho}/${puerta}`, { observe: 'response' });
    }
}

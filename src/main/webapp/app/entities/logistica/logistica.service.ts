import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILogistica } from 'app/shared/model/logistica.model';

type EntityResponseType = HttpResponse<ILogistica>;
type EntityArrayResponseType = HttpResponse<ILogistica[]>;

@Injectable({ providedIn: 'root' })
export class LogisticaService {
    public resourceUrl = SERVER_API_URL + 'api/logisticas';

    constructor(protected http: HttpClient) {}

    create(logistica: ILogistica): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(logistica);
        return this.http
            .post<ILogistica>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(logistica: ILogistica): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(logistica);
        return this.http
            .put<ILogistica>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ILogistica>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ILogistica[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(logistica: ILogistica): ILogistica {
        const copy: ILogistica = Object.assign({}, logistica, {
            fechaEntrega:
                logistica.fechaEntrega != null && logistica.fechaEntrega.isValid() ? logistica.fechaEntrega.format(DATE_FORMAT) : null,
            fechaPedido: logistica.fechaPedido != null && logistica.fechaPedido.isValid() ? logistica.fechaPedido.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.fechaEntrega = res.body.fechaEntrega != null ? moment(res.body.fechaEntrega) : null;
            res.body.fechaPedido = res.body.fechaPedido != null ? moment(res.body.fechaPedido) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((logistica: ILogistica) => {
                logistica.fechaEntrega = logistica.fechaEntrega != null ? moment(logistica.fechaEntrega) : null;
                logistica.fechaPedido = logistica.fechaPedido != null ? moment(logistica.fechaPedido) : null;
            });
        }
        return res;
    }
}

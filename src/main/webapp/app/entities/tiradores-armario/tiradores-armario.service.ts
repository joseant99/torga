import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITiradoresArmario } from 'app/shared/model/tiradores-armario.model';

type EntityResponseType = HttpResponse<ITiradoresArmario>;
type EntityArrayResponseType = HttpResponse<ITiradoresArmario[]>;

@Injectable({ providedIn: 'root' })
export class TiradoresArmarioService {
    public resourceUrl = SERVER_API_URL + 'api/tiradores-armarios';

    constructor(protected http: HttpClient) {}

    create(tiradoresArmario: ITiradoresArmario): Observable<EntityResponseType> {
        return this.http.post<ITiradoresArmario>(this.resourceUrl, tiradoresArmario, { observe: 'response' });
    }

    update(tiradoresArmario: ITiradoresArmario): Observable<EntityResponseType> {
        return this.http.put<ITiradoresArmario>(this.resourceUrl, tiradoresArmario, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITiradoresArmario>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITiradoresArmario[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

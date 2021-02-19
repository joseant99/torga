import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDatosUsuario } from 'app/shared/model/datos-usuario.model';

type EntityResponseType = HttpResponse<IDatosUsuario>;
type EntityArrayResponseType = HttpResponse<IDatosUsuario[]>;

@Injectable({ providedIn: 'root' })
export class DatosUsuarioService {
    public resourceUrl = SERVER_API_URL + 'api/datos-usuarios';
    public uno;
    public tiendaCargadaPresu;
    constructor(protected http: HttpClient) {}

    create(datosUsuario: IDatosUsuario): Observable<EntityResponseType> {
        return this.http.post<IDatosUsuario>(this.resourceUrl, datosUsuario, { observe: 'response' });
    }

    update(datosUsuario: IDatosUsuario): Observable<EntityResponseType> {
        return this.http.put<IDatosUsuario>(this.resourceUrl, datosUsuario, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDatosUsuario>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDatosUsuario[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    findCoger(id: any): Observable<EntityResponseType> {
        return this.http.get<IDatosUsuario>(`${this.resourceUrl}-id/${id}`, { observe: 'response' });
    }

    findCoger12(id: any): Observable<EntityArrayResponseType> {
        return this.http.get<IDatosUsuario[]>(`${this.resourceUrl}-id12/${id}`, { observe: 'response' });
    }

    findCoger1(): Observable<EntityResponseType> {
        return this.http.get<IDatosUsuario>(`${this.resourceUrl}-id1`, { observe: 'response' });
    }

    query12(id: any): Observable<EntityArrayResponseType> {
        return this.http.get<IDatosUsuario[]>(`${this.resourceUrl}-busquing/${id}`, { observe: 'response' });
    }

    query13(nombre: any): Observable<EntityArrayResponseType> {
        return this.http.get<IDatosUsuario[]>(`${this.resourceUrl}-id99/${nombre}`, { observe: 'response' });
    }

    query139(nombre: any, id: any): Observable<EntityArrayResponseType> {
        return this.http.get<IDatosUsuario[]>(`${this.resourceUrl}-id999/${nombre}/${id}`, { observe: 'response' });
    }

    reprebuscar(id: any): Observable<EntityArrayResponseType> {
        return this.http.get<IDatosUsuario[]>(`${this.resourceUrl}-reprebus12/${id}`, { observe: 'response' });
    }

    findCogerTodos(): Observable<EntityResponseType> {
        return this.http.get<IDatosUsuario>(`${this.resourceUrl}-todos`, { observe: 'response' });
    }
}

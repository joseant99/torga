import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDimensionesProductoTipo } from 'app/shared/model/dimensiones-producto-tipo.model';

type EntityResponseType = HttpResponse<IDimensionesProductoTipo>;
type EntityArrayResponseType = HttpResponse<IDimensionesProductoTipo[]>;

@Injectable({ providedIn: 'root' })
export class DimensionesProductoTipoService {
    public resourceUrl = SERVER_API_URL + 'api/dimensiones-producto-tipos';
    public todos;
    constructor(protected http: HttpClient) {}

    create(dimensionesProductoTipo: IDimensionesProductoTipo): Observable<EntityResponseType> {
        return this.http.post<IDimensionesProductoTipo>(this.resourceUrl, dimensionesProductoTipo, { observe: 'response' });
    }

    update(dimensionesProductoTipo: IDimensionesProductoTipo): Observable<EntityResponseType> {
        return this.http.put<IDimensionesProductoTipo>(this.resourceUrl, dimensionesProductoTipo, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDimensionesProductoTipo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDimensionesProductoTipo[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query1(req?: any): Observable<EntityArrayResponseType> {
        return (this.todos = req.todasDimensiones);
    }
    findProducto(id: any): Observable<EntityResponseType> {
        return this.http.get<IDimensionesProductoTipo>(`${this.resourceUrl}-buscado-prod/${id}`, { observe: 'response' });
    }
    findProductoEspecial(id: any): Observable<EntityResponseType> {
        return this.http.get<IDimensionesProductoTipo>(`${this.resourceUrl}-buscado-prod1/${id}`, { observe: 'response' });
    }
    findFiltro(id: number, ancho: any): Observable<EntityResponseType> {
        return this.http.get<IDimensionesProductoTipo>(`${this.resourceUrl}-filtrado/${id}/${ancho}`, { observe: 'response' });
    }
    findFiltroProd(id: number, ancho: any): Observable<EntityResponseType> {
        return this.http.get<IDimensionesProductoTipo>(`${this.resourceUrl}-filtrado-prod/${id}/${ancho}`, { observe: 'response' });
    }
    findFiltroAltura(id: number, altura: any): Observable<EntityResponseType> {
        return this.http.get<IDimensionesProductoTipo>(`${this.resourceUrl}-filtrado-altura/${id}/${altura}`, { observe: 'response' });
    }
    findFiltroAlturaAncho(id: number, altura: any, ancho: any): Observable<EntityResponseType> {
        return this.http.get<IDimensionesProductoTipo>(`${this.resourceUrl}-filtrado-altura-ancho/${id}/${ancho}/${altura}`, {
            observe: 'response'
        });
    }
    findFiltroFondo(id: number, fondo: any): Observable<EntityResponseType> {
        return this.http.get<IDimensionesProductoTipo>(`${this.resourceUrl}-filtrado-fondo/${id}/${fondo}`, { observe: 'response' });
    }

    findFiltroFondoAncho(id: number, fondo: any, ancho: any): Observable<EntityResponseType> {
        return this.http.get<IDimensionesProductoTipo>(`${this.resourceUrl}-filtrado-fondo-ancho/${id}/${fondo}/${ancho}`, {
            observe: 'response'
        });
    }

    findFiltroFondoAnchoProd(id: number, fondo: any, ancho: any): Observable<EntityResponseType> {
        return this.http.get<IDimensionesProductoTipo>(`${this.resourceUrl}-filtrado-fondo-ancho-prod/${id}/${fondo}/${ancho}`, {
            observe: 'response'
        });
    }

    findFiltroFondoAlto(id: number, fondo: any, alto: any): Observable<EntityResponseType> {
        return this.http.get<IDimensionesProductoTipo>(`${this.resourceUrl}-filtrado-fondo-alto/${id}/${fondo}/${alto}`, {
            observe: 'response'
        });
    }

    findFiltroFondoAltoAncho(id: number, fondo: any, alto: any, ancho: any): Observable<EntityResponseType> {
        return this.http.get<IDimensionesProductoTipo>(`${this.resourceUrl}-filtrado-fondo-alto-ancho/${id}/${fondo}/${alto}/${ancho}`, {
            observe: 'response'
        });
    }

    findDimension(id: any): Observable<EntityResponseType> {
        return this.http.get<IDimensionesProductoTipo>(`${this.resourceUrl}-buscado-dimensiones/${id}`, { observe: 'response' });
    }
    findDimensionNombre(id: any): Observable<EntityResponseType> {
        return this.http.get<IDimensionesProductoTipo>(`${this.resourceUrl}-buscado-nombre/${id}`, { observe: 'response' });
    }

    findPrecio(): Observable<EntityResponseType> {
        return this.http.get<IDimensionesProductoTipo>(`${this.resourceUrl}-filtrado-precio`, { observe: 'response' });
    }
}

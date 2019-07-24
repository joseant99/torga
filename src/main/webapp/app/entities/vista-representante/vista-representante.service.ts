import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICliente } from 'app/shared/model/cliente.model';
import { IReferenciaClientes } from 'app/shared/model/referencia-clientes.model';
import { IPedidos } from 'app/shared/model/pedidos.model';
import { ILogistica } from 'app/shared/model/logistica.model';
import { IRepresentante } from 'app/shared/model/representante.model';

type EntityResponseType = HttpResponse<ICliente>;
type EntityArrayResponseType = HttpResponse<ICliente[]>;
type EntittyArrayRef = HttpResponse<IReferenciaClientes[]>;
type EntittyArrayPedidos = HttpResponse<IPedidos[]>;
type EntittyArrayLogistica = HttpResponse<ILogistica[]>;

@Injectable({ providedIn: 'root' })
export class VistaRepresentanteService {
    public resourceUrlCli = SERVER_API_URL + 'api/cliente/represenante';
    public resourceUrlRef = SERVER_API_URL + 'api/referencia-cliente';
    public resourceUrlPedido = SERVER_API_URL + 'api/pedido';
    public resourceUrlRepresentante = SERVER_API_URL + 'api/representante';
    public resourceUrlPDF = SERVER_API_URL + 'api/descargarFactura/';
    public resourceUrlPDFConfirmacion = SERVER_API_URL + 'api/descargarConfirmacion';
    public resourceUrlExistConfirmacion = SERVER_API_URL + '/api/existeConfirmacion';
    public resourceUrlExistFactura = SERVER_API_URL + '/api/existeFactura';

    constructor(protected http: HttpClient) {}

    getFactura(nombre: string): Observable<Blob> {
        return this.http.get(`${this.resourceUrlPDF}/${nombre}` + '.pdf', { responseType: 'blob' });
    }

    getConfirmacion(nombre: string): Observable<Blob> {
        return this.http.get(`${this.resourceUrlPDFConfirmacion}/${nombre}` + '.pdf', { responseType: 'blob' });
    }

    findRepresenante(usuario: string): Observable<EntityResponseType> {
        return this.http.get<IRepresentante>(`${this.resourceUrlRepresentante}/${usuario}`, { observe: 'response' });
    }

    findClienteRepresenante(id: number): Observable<EntityArrayResponseType> {
        return this.http.get<ICliente[]>(`${this.resourceUrlCli}/${id}`, { observe: 'response' });
    }

    findRefCliente(id: number): Observable<EntittyArrayRef> {
        return this.http.get<IReferenciaClientes[]>(`${this.resourceUrlRef}/${id}`, { observe: 'response' });
    }

    findPedido(id: number): Observable<EntittyArrayPedidos> {
        return this.http.get<IPedidos[]>(`${this.resourceUrlPedido}/${id}` + '?size=5000&sort=id%2Cdesc&sort.sorted=true', {
            observe: 'response'
        });
    }
    getExisteConfirmacion(nombre: string): Observable<string> {
        return this.http.get(`${this.resourceUrlExistConfirmacion}/${nombre}` + '.pdf', { responseType: 'text' });
    }
    getExisteFactura(nombre: string): Observable<string> {
        return this.http.get(`${this.resourceUrlExistFactura}/${nombre}` + '.pdf', { responseType: 'text' });
    }

    // query(req?: any): Observable<EntityArrayResponseType> {
    //     const options = createRequestOption(req);
    //     return this.http.get<ICliente[]>(this.resourceUrl, { params: options, observe: 'response' });
    // }

    // delete(id: number): Observable<HttpResponse<any>> {
    //     return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    // }
}

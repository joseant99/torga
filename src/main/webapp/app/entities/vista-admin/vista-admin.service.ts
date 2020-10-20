import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { ICliente } from 'app/shared/model/cliente.model';
import { IPedidos } from 'app/shared/model/pedidos.model';

type EntityResponseType = HttpResponse<ICliente>;
type EntityArrayResponseType = HttpResponse<IPedidos[]>;

@Injectable({ providedIn: 'root' })
export class VistaAdminService {
    public resourceUrlPedido = SERVER_API_URL + 'api/pedidos';
    public resourceUrlPDF = SERVER_API_URL + 'api/descargarFactura';
    public resourceUrlPDFConfirmacion = SERVER_API_URL + 'api/descargarConfirmacion';
    public resourceUrlUploadFactura = SERVER_API_URL + 'api/subirFactura/';
    public resourceUrlUploadConfirmacion = SERVER_API_URL + 'api/subirConfirmacion/';
    public resourceUrlUploadExcel = SERVER_API_URL + 'api/uploadFile/';
    public resourceUrlUploadExcel1 = SERVER_API_URL + 'api/uploadFile1/';
    public resourceUrlUploadExcel2 = SERVER_API_URL + 'api/uploadFile2/';
    public resourceUrlCSV = SERVER_API_URL + '/api/insertPedidosCSV/';
    public resourceUrlExistConfirmacion = SERVER_API_URL + '/api/existeConfirmacion';
    public resourceUrlExistFactura = SERVER_API_URL + '/api/existeFactura';

    constructor(protected http: HttpClient) {}

    pushFileToStorageExcel(file: File): Observable<HttpEvent<{}>> {
        const formdata: FormData = new FormData();

        formdata.append('file', file);

        const req = new HttpRequest('POST', this.resourceUrlUploadExcel, formdata, {
            reportProgress: true,
            responseType: 'text'
        });

        return this.http.request(req);
    }

    pushFileToStorageExcel1(file: File, correo: any, correoMensaje: any): Observable<HttpEvent<{}>> {
        const formdata: FormData = new FormData();

        formdata.append('file', file);
        formdata.append('correo', correo);
        formdata.append('correoMensaje', correoMensaje);
        const req = new HttpRequest('POST', this.resourceUrlUploadExcel1, formdata, {
            reportProgress: true,
            responseType: 'text'
        });

        return this.http.request(req);
    }

    pushFileToStorageExcel2(correoMensaje: any): Observable<HttpEvent<{}>> {
        const formdata: FormData = new FormData();
        formdata.append('correoMensaje', correoMensaje);
        const req = new HttpRequest('POST', this.resourceUrlUploadExcel2, formdata, {
            reportProgress: true,
            responseType: 'text'
        });

        return this.http.request(req);
    }

    pushFileToStorageConfirmacion(file: File): Observable<HttpEvent<{}>> {
        const formdata: FormData = new FormData();

        formdata.append('file', file);

        const req = new HttpRequest('POST', this.resourceUrlUploadConfirmacion, formdata, {
            reportProgress: true,
            responseType: 'text'
        });

        return this.http.request(req);
    }

    pushFileToStorageFactura(file: File): Observable<HttpEvent<{}>> {
        const formdata: FormData = new FormData();

        formdata.append('file', file);

        const req = new HttpRequest('POST', this.resourceUrlUploadFactura, formdata, {
            reportProgress: true,
            responseType: 'text'
        });

        return this.http.request(req);
    }

    pushCSVtoDatabase(file: string): Observable<HttpEvent<{}>> {
        const formdata: FormData = new FormData();

        formdata.append('namefile', file);

        const req = new HttpRequest('POST', this.resourceUrlCSV, formdata, {
            reportProgress: true,
            responseType: 'text'
        });

        return this.http.request(req);
    }

    getFactura(nombre: string): Observable<Blob> {
        return this.http.get(`${this.resourceUrlPDF}/${nombre}` + '.pdf', { responseType: 'blob' });
    }

    getConfirmacion(nombre: string): Observable<Blob> {
        return this.http.get(`${this.resourceUrlPDFConfirmacion}/${nombre}` + '.pdf', { responseType: 'blob' });
    }
    findPedido(): Observable<EntityArrayResponseType> {
        return this.http.get<IPedidos[]>(`${this.resourceUrlPedido}` + '?size=5000&sort=id%2Cdesc&sort.sorted=true', {
            observe: 'response'
        });
    }
    getExisteConfirmacion(nombre: string): Observable<string> {
        return this.http.get(`${this.resourceUrlExistConfirmacion}/${nombre}` + '.pdf', { responseType: 'text' });
    }
    getExisteFactura(nombre: string): Observable<string> {
        return this.http.get(`${this.resourceUrlExistFactura}/${nombre}` + '.pdf', { responseType: 'text' });
    }
}

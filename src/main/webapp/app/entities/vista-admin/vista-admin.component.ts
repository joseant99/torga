import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { VistaAdminService } from './vista-admin.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { HttpErrorResponse, HttpResponse, HttpEventType } from '@angular/common/http';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { LoginModalService, AccountService, Account } from 'app/core';
import { IReferenciaClientes } from 'app/shared/model/referencia-clientes.model';
import { IPedidos } from 'app/shared/model/pedidos.model';
import { ILogistica } from 'app/shared/model/logistica.model';
import { ActivatedRoute, Router } from '@angular/router';
import { IRepresentante } from 'app/shared/model/representante.model';
import { Observable } from 'rxjs';

//TABLAS
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Moment } from 'moment';

export interface ClientData {
    fecha_pedido: Moment;
    pedido: string;
    confirmacion: string;
    confirmacion_exist: boolean;
    ruta: string;
    carro: string;
    referencia_cliente: string;
    cod_cliente: string;
    cliente: string;
    importe: number;
    estado: string;
    transportista: string;
    fecha_entrega: Moment;
    representante: string;
    poblacion: string;
    provincia: string;
    factura: string;
    factura_exist: boolean;
}

@Component({
    selector: 'jhi-vista-admin',
    templateUrl: './vista-admin.component.html',
    styles: []
})
export class VistaAdminComponent implements AfterViewInit {
    //TABLA
    displayedColumns: string[] = [
        'fecha_pedido',
        'pedido',
        'confirmacion',
        'ruta',
        'carro',
        'referencia_cliente',
        'cod_cliente',
        'cliente',
        'importe',
        'estado',
        'transportista',
        'fecha_entrega',
        'representante',
        'poblacion',
        'provincia',
        'factura'
    ];

    dataSource: MatTableDataSource<ClientData>;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        if (!this.cargado || this.pedidosTabla.length === 0) {
            setTimeout(() => {
                this.ngAfterViewInit();
            }, 500);
        } else {
            this.dataSource = new MatTableDataSource<any>(this.pedidosTabla);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    }

    column: boolean = false;
    cargado: boolean = false;
    pedidos: IPedidos[] = [];
    account: Account;
    pedidosTabla = [];
    selectedFilesFactura: FileList;
    selectedFilesConfirmacion: FileList;
    selectedFilesExcel: FileList;

    currentFileUpload: File;
    progress: { percentage: number } = { percentage: 0 };

    constructor(
        protected vistaadminService: VistaAdminService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        private accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router
    ) {
        this.getData();
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    hideVisibility(e) {
        this.column = e.target.checked;
    }

    selectedFilesFacturas(event) {
        this.selectedFilesFactura = event.target.files;
    }
    selectedFilesConfirmaciones(event) {
        this.selectedFilesConfirmacion = event.target.files;
    }
    selectFileExcel(event) {
        this.selectedFilesExcel = event.target.files;
    }

    uploadFactura() {
        this.progress.percentage = 0;

        this.currentFileUpload = this.selectedFilesFactura.item(0);
        this.vistaadminService.pushFileToStorageFactura(this.currentFileUpload).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                this.progress.percentage = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
                console.log('File is completely uploaded!');
            }
        });

        this.selectedFilesFactura = undefined;
    }

    uploadConfirmacion() {
        this.progress.percentage = 0;

        this.currentFileUpload = this.selectedFilesConfirmacion.item(0);
        this.vistaadminService.pushFileToStorageConfirmacion(this.currentFileUpload).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                this.progress.percentage = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
                console.log('File is completely uploaded!');
            }
        });

        this.selectedFilesConfirmacion = undefined;
    }

    uploadExcel() {
        this.progress.percentage = 0;

        this.currentFileUpload = this.selectedFilesExcel.item(0);
        this.vistaadminService.pushFileToStorageExcel(this.currentFileUpload).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                this.progress.percentage = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
                console.log('File is completely uploaded!');
            }
        });

        this.selectedFilesExcel = undefined;
    }

    getPDFConfirmacion(nombre: string): void {
        this.vistaadminService.getConfirmacion(nombre).subscribe(res => {
            var newBlob = new Blob([res], { type: 'application/pdf' });

            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(newBlob, nombre + '.pdf');
                return;
            }

            // For other browsers:
            // Create a link pointing to the ObjectURL containing the blob.
            const data = window.URL.createObjectURL(newBlob);

            var link = document.createElement('a');
            link.href = data;
            link.download = nombre + '.pdf';
            // this is necessary as link.click() does not work on the latest firefox
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

            setTimeout(function() {
                // For Firefox it is necessary to delay revoking the ObjectURL
                window.URL.revokeObjectURL(data);
                link.remove();
            }, 100);
        });
    }

    getPDF(nombre: string): void {
        this.vistaadminService.getFactura(nombre).subscribe(res => {
            var newBlob = new Blob([res], { type: 'application/pdf' });

            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(newBlob, nombre + '.pdf');
                return;
            }

            // For other browsers:
            // Create a link pointing to the ObjectURL containing the blob.
            const data = window.URL.createObjectURL(newBlob);

            var link = document.createElement('a');
            link.href = data;
            link.download = nombre + '.pdf';
            // this is necessary as link.click() does not work on the latest firefox
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

            setTimeout(function() {
                // For Firefox it is necessary to delay revoking the ObjectURL
                window.URL.revokeObjectURL(data);
                link.remove();
            }, 100);
        });
    }

    getData() {
        this.accountService.identity().then(account => {
            //OBTENEMOS EL NOMBRE DE USUARIO REGISTRADO
            this.account = account;

            //BUSCAMOS A QUE CLIENTE PERTENECE ESE USUARIO
            this.vistaadminService.findPedido().subscribe(
                (res: HttpResponse<IPedidos[]>) => {
                    this.pedidos = res.body;
                    this.pedidosTabla = createTable(this.pedidos);
                    for (let ped in this.pedidosTabla) {
                        this.vistaadminService.getExisteConfirmacion(this.pedidosTabla[ped].confirmacion).subscribe((res: string) => {
                            if (res === 'true') {
                            } else {
                                this.pedidosTabla[ped].confirmacion_exist = false;
                                this.pedidosTabla[ped].confirmacion = 'No disponible';
                                //console.log(this.pedidosTabla[ped].confirmacion + " resultado " + this.pedidosTabla[ped].confirmacion_exist)
                            }
                        });
                        this.vistaadminService.getExisteFactura(this.pedidosTabla[ped].confirmacion).subscribe((res: string) => {
                            if (res === 'true') {
                            } else {
                                this.pedidosTabla[ped].factura_exist = false;
                                this.pedidosTabla[ped].factura = 'No disponible';
                                //console.log(this.pedidosTabla[ped].factura + " resultado " + this.pedidosTabla[ped].factura)
                            }
                        });
                    }

                    this.cargado = true;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        });
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

function createTable(ipedidos: IPedidos[]): ClientData[] {
    var result: ClientData[] = [];
    //  console.log(ipedidos);
    for (let id in ipedidos) {
        var modal = <ClientData>{};
        modal.provincia = ipedidos[id].logistica.referenciaclientes.cliente.provincia;
        if (ipedidos[id].logistica.referenciaclientes.cliente.representates === null) {
            modal.representante = '';
        } else {
            modal.representante = ipedidos[id].logistica.referenciaclientes.cliente.representates.nombre;
        }
        modal.cod_cliente = ipedidos[id].logistica.referenciaclientes.cliente.codCliente;
        modal.carro = ipedidos[id].logistica.carro;
        modal.ruta = ipedidos[id].logistica.ruta;
        modal.cliente = ipedidos[id].logistica.referenciaclientes.cliente.nombre;
        modal.poblacion = ipedidos[id].logistica.referenciaclientes.cliente.poblacion;
        modal.fecha_pedido = ipedidos[id].logistica.fechaPedido;
        modal.fecha_entrega = ipedidos[id].logistica.fechaEntrega;
        modal.pedido = ipedidos[id].numPedido;
        if (ipedidos[id].confirmacion === null) {
            modal.confirmacion_exist = false;
            modal.confirmacion = 'No disponible';
        } else {
            modal.confirmacion_exist = true;
            modal.confirmacion = ipedidos[id].confirmacion;
        }
        modal.referencia_cliente = ipedidos[id].referenciaclientes.referenciaCliente;
        modal.importe = ipedidos[id].importe;

        if (ipedidos[id].logistica.estados === null) {
            modal.estado = '';
        } else {
            modal.estado = ipedidos[id].logistica.estados.estadoPedido;
        }

        if (ipedidos[id].logistica.transportistas === null) {
            modal.transportista = '';
        } else {
            modal.transportista = ipedidos[id].logistica.transportistas.transportistaPedido;
        }

        if (ipedidos[id].factura === null) {
            modal.factura_exist = false;
            modal.factura = 'No disponible';
        } else {
            modal.factura_exist = true;
            modal.factura = ipedidos[id].factura;
        }

        result.push(modal);
    }

    return result;
}

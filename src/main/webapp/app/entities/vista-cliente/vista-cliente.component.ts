import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { VistaClienteService } from './vista-cliente.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { LoginModalService, AccountService, Account } from 'app/core';
import { IReferenciaClientes } from 'app/shared/model/referencia-clientes.model';
import { IPedidos } from 'app/shared/model/pedidos.model';
import { ILogistica } from 'app/shared/model/logistica.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'moment';

//TABLAS
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

export interface ClientData {
    fecha_pedido: Moment;
    pedido: string;
    confirmacion: string;
    confirmacion_exist: boolean;
    referencia_cliente: string;
    importe: number;
    estado: string;
    transportista: string;
    fecha_entrega: Moment;
    factura: string;
    factura_exist: boolean;
}

@Component({
    selector: 'jhi-vista-cliente',
    templateUrl: './vista-cliente.component.html',
    styles: []
})
export class VistaClienteComponent implements AfterViewInit {
    //TABLA
    displayedColumns: string[] = [
        'fecha_pedido',
        'pedido',
        'confirmacion',
        'referencia_cliente',
        'importe',
        'estado',
        'transportista',
        'fecha_entrega',
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

    cargado: boolean = false;
    cliente: ICliente;
    referenciaClientes: IReferenciaClientes[];
    pedidos: IPedidos[] = [];
    logistica: ILogistica[] = [];
    account: Account;
    pedidosTabla = [];

    constructor(
        protected vistaClienteService: VistaClienteService,
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

    getPDFConfirmacion(nombre: string): void {
        this.vistaClienteService.getConfirmacion(nombre).subscribe(res => {
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
        this.vistaClienteService.getFactura(nombre).subscribe(res => {
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
            this.vistaClienteService.find(this.account.login).subscribe(
                (res: HttpResponse<ICliente>) => {
                    this.cliente = res.body;

                    //CON EL ID DEL CLIENTE BUSCAMOS LAS DIFERENTES REFERENCIAS QUE TIENE
                    this.vistaClienteService.findRef(this.cliente.id).subscribe(
                        (res: HttpResponse<IReferenciaClientes[]>) => {
                            this.referenciaClientes = res.body;

                            //SUELE TENER MAS DE UNA REFERENCIA POR ESO SE NECESITA EL FOR
                            for (let ref of this.referenciaClientes) {
                                //BUSCAMOS EN LA TABLA DE PEDIDOS
                                this.vistaClienteService.findPedido(ref.id).subscribe(
                                    (res: HttpResponse<IPedidos[]>) => {
                                        if (res.body.length > 0) {
                                            for (let ped of res.body) {
                                                this.pedidos.push(ped);
                                            }
                                            this.pedidosTabla = createTable(this.pedidos);

                                            for (let ped in this.pedidosTabla) {
                                                this.vistaClienteService
                                                    .getExisteConfirmacion(this.pedidosTabla[ped].confirmacion)
                                                    .subscribe((res: string) => {
                                                        if (res === 'true') {
                                                        } else {
                                                            this.pedidosTabla[ped].confirmacion_exist = false;
                                                            this.pedidosTabla[ped].confirmacion = 'No disponible';
                                                            //console.log(this.pedidosTabla[ped].confirmacion + " resultado " + this.pedidosTabla[ped].confirmacion_exist)
                                                        }
                                                    });
                                                this.vistaClienteService
                                                    .getExisteFactura(this.pedidosTabla[ped].confirmacion)
                                                    .subscribe((res: string) => {
                                                        if (res === 'true') {
                                                        } else {
                                                            this.pedidosTabla[ped].factura_exist = false;
                                                            this.pedidosTabla[ped].factura = 'No disponible';
                                                            //console.log(this.pedidosTabla[ped].factura + " resultado " + this.pedidosTabla[ped].factura)
                                                        }
                                                    });
                                            }
                                            this.cargado = true;
                                        }
                                    },
                                    (res: HttpErrorResponse) => this.onError(res.message)
                                );
                            }
                        },
                        (res: HttpErrorResponse) => this.onError(res.message)
                    );
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

    console.log(ipedidos);

    for (let id in ipedidos) {
        var modal = <ClientData>{};

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

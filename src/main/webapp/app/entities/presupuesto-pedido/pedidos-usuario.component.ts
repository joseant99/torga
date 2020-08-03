import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IPresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { PresupuestoPedidoService } from './presupuesto-pedido.service';
import { RepresentanteTiendaService } from '../representante-tienda/representante-tienda.service';
import { DatosUsuarioService } from '../datos-usuario/datos-usuario.service';
@Component({
    selector: 'jhi-pedidos-usuario',
    templateUrl: './pedidos-usuario.component.html'
})
export class PedidosUsuarioComponent implements OnInit, OnDestroy {
    currentAccount: any;
    presupuestoPedidos: IPresupuestoPedido[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    tamano: any;
    todos: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    presuped1: any;
    tiendas: any;
    constructor(
        protected presupuestoPedidoService: PresupuestoPedidoService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected representanteTiendaService: RepresentanteTiendaService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        public datosUsuarioService: DatosUsuarioService,
        protected eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }
    public filtrosBuscados() {
        var filtro = $('#filtroos').val();
        $('#fechaFiltrado').css({ display: 'none' });
        $('#textoDemasFiltros').css({ display: 'none' });
        if (filtro == 'FECHA PEDIDO') {
            $('#fechaFiltrado').css({ display: 'block' });
        }
        if (filtro == 'CODIGO CLIENTE') {
            $('#textoDemasFiltros').css({ display: 'block' });
        }
        if (filtro == 'NOMBRE FISCAL') {
            $('#textoDemasFiltros').css({ display: 'block' });
            $('#presupuestoPedidos').append('<datalist id="listaBuena"></datalist>');
            this.datosUsuarioService.findCoger1().subscribe(data => {
                for (let i = 0; i < data.body['length']; i++) {
                    $('#listaBuena').append('<option value="' + data.body[i] + '">' + data.body[i] + '</option>');
                }
            });
        }
        if (filtro == 'REFERENCIA CLIENTE') {
            $('#textoDemasFiltros').css({ display: 'block' });
            $('#listaBuena').empty();
        }
    }

    public buscarPresu() {
        var filtro = $('#filtroos').val();
        var texto = $('#inputFiltro').val();
        var fechaBus = $('#fechaBus')
            .val()
            .toString();
        console.log(fechaBus);
        var pedidos = this.presuped1;
        var cont = 0;
        var array = [];
        if (filtro == 'NOMBRE FISCAL') {
            this.datosUsuarioService.query({ size: 1000000 }).subscribe(data => {
                for (let i = 0; i < data.body['length']; i++) {
                    if (data.body[i]['nombreFiscal'] == texto) {
                        for (let u = 0; u < pedidos.length; u++) {
                            if (pedidos[u]['user']['id'] == data.body[i]['user']['id']) {
                                array[cont] = pedidos[u];
                                cont++;
                            }
                        }
                        this.presupuestoPedidos = array;
                    }
                }
            });
        }

        if (filtro == 'FECHA PEDIDO') {
            var fechCorrecta = fechaBus.split('-')[0] + '/' + fechaBus.split('-')[1] + '/' + fechaBus.split('-')[2];
            for (let u = 0; u < pedidos.length; u++) {
                if (pedidos[u]['fecha_pedido'] == fechCorrecta) {
                    array[cont] = pedidos[u];
                    cont++;
                }
            }
            this.presupuestoPedidos = array;
        }

        if (filtro == 'REFERENCIA CLIENTE') {
            for (let u = 0; u < pedidos.length; u++) {
                if (pedidos[u]['codigo'] == texto) {
                    array[cont] = pedidos[u];
                    cont++;
                }
            }
            this.presupuestoPedidos = array;
        }
    }
    loadAll() {
        console.log(sessionStorage);
        var idUsu = this.accountService['userIdentity']['id'];
        var auto = this.accountService['userIdentity']['authorities'][1];
        var cogidos = [];
        var account = this.accountService['userIdentity'];
        var contador = 0;
        var todos = this.representanteTiendaService.todos;
        this.presupuestoPedidoService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe((res: HttpResponse<IPresupuestoPedido[]>) => {
                $.each(res['body'], function(index, value) {
                    if (auto == 'ROLE_ADMIN') {
                        if (value['pedido'] == 1) {
                            cogidos[contador] = value;
                            contador++;
                        }
                    } else {
                        if (account.authorities.indexOf('ROLE_REPRESENTATE') >= 0) {
                            for (let k = 0; k < todos.length; k++) {
                                if (todos[k]['datosUsuario']['user']['id'] == value['user']['id'] && value['pedido'] == 1) {
                                    cogidos[contador] = value;
                                    contador++;
                                }
                            }
                        } else {
                            if (value['user']['id'] == idUsu && value['pedido'] == 1) {
                                cogidos[contador] = value;
                                contador++;
                            }
                        }
                    }
                });
                if (res['body']['0'] != 'undefined') {
                    this.tamano = contador;
                    this.todos = cogidos;
                    this.presuped1 = cogidos;
                    this.paginatePresupuestoPedidos(cogidos, res.headers);
                }

                (res: HttpErrorResponse) => this.onError(res.message);
            });
    }

    public cogerIdPresupuesto(id) {
        sessionStorage.setItem('presupuesto', id);
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/presupuesto-usuario'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/presupuesto-usuario',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    public sacarPresupuestos() {
        var val = $('#tiendaSelect').val();
        var presu = [];
        var cont = 0;
        this.presupuestoPedidoService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe((res: HttpResponse<IPresupuestoPedido[]>) => {
                for (let i = 0; i < res.body.length; i++) {
                    if (res.body[i]['user']['id'] == val) {
                        presu[cont] = res.body[i];
                        cont++;
                    }
                }
                this.presupuestoPedidos = presu;
                this.presuped1 = presu;
            });
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPresupuestoPedidos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPresupuestoPedidos() {
        this.eventSubscriber = this.eventManager.subscribe('presupuestoPedidoListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginatePresupuestoPedidos(data: IPresupuestoPedido[], headers: HttpHeaders) {
        var tamano = headers.get('X-Total-Count');
        tamano = this.tamano;
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(tamano, 10);
        this.queryCount = this.totalItems;
        this.presupuestoPedidos = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

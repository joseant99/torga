import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { Observable } from 'rxjs';

import { IPresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { PresupuestoPedidoService } from './presupuesto-pedido.service';
import { RepresentanteTiendaService } from '../representante-tienda/representante-tienda.service';
import { IRepresentanteTienda } from 'app/shared/model/representante-tienda.model';
import { RepresenTorgaService } from '../represen-torga/represen-torga.service';
import { IRepresenTorga } from 'app/shared/model/represen-torga.model';

import { DatosUsuarioService } from '../datos-usuario/datos-usuario.service';
@Component({
    selector: 'jhi-presupuesto-usuario',
    templateUrl: './presupuesto-usuario.component.html'
})
export class PresupuestoUsuarioComponent implements OnInit, OnDestroy {
    currentAccount: any;
    presupuestoPedidos: IPresupuestoPedido[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    tamano: any;
    todos: any;
    tiendas: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    isSaving: boolean;
    reverse: any;
    todosdatosusuarios: any;
    presuped1: any;
    constructor(
        protected presupuestoPedidoService: PresupuestoPedidoService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected represenTorgaService: RepresenTorgaService,
        protected representanteTiendaService: RepresentanteTiendaService,
        protected accountService: AccountService,
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

    public anadirValorPunto() {
        var val = $('#inputPunto').val();
        var id = sessionStorage.getItem('presupuesto');

        this.presupuestoPedidoService
            .query({
                size: 1000000
            })
            .subscribe(data => {
                for (let i = 0; i < data.body.length; i++) {
                    if (data.body[i]['id'] == parseFloat(id)) {
                        var presu = data.body[i];
                    }
                }
                presu['puntos'] = val;
                this.subscribeToSaveResponse(this.presupuestoPedidoService.update(presu));
            });
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPresupuestoPedido>>) {
        result.subscribe((res: HttpResponse<IPresupuestoPedido>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        for (let i = 0; i <= 10000; i++) {
            if (i == 10000) {
                this.router.navigate(['/presupuesto-producto']);
            }
        }
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    public filtrosBuscados() {
        var filtro = $('#filtroos').val();

        $('#fechaFiltrado').css({ display: 'none' });
        var arrayBueno = [];
        arrayBueno[83] = 3;
        arrayBueno[85] = 42;
        $('#textoDemasFiltros').css({ display: 'none' });
        $('#nombreFiscalSelectFiltros').css({ display: 'none' });
        if (filtro == 'TODOS') {
            var idUsu = this.accountService['userIdentity']['id'];
            var auto = this.accountService['userIdentity']['authorities'][1];
            var cogidos = [];
            var account = this.accountService['userIdentity'];
            var contador = 0;
            $('#page-heading').css({ 'margin-left': '2%' });
            var todos = this.representanteTiendaService.todos;
            this.presupuestoPedidoService
                .query({
                    size: 10000000
                })
                .subscribe((res: HttpResponse<IPresupuestoPedido[]>) => {
                    $.each(res['body'], function(index, value) {
                        if (auto == 'ROLE_ADMIN') {
                            if (value['pedido'] == 0) {
                                cogidos[contador] = value;
                                contador++;
                            }
                        } else {
                            if (account.authorities.indexOf('ROLE_REPRESENTATE') >= 0) {
                                for (let k = 0; k < todos.length; k++) {
                                    if (todos[k]['user'] != null) {
                                        if (todos[k]['user']['id'] == value['user']['id'] && value['pedido'] == 0) {
                                            cogidos[contador] = value;
                                            contador++;
                                        }
                                    }
                                }
                            } else {
                                if (value['user']['id'] == idUsu && value['pedido'] == 0) {
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
        if (filtro == 'FECHA PRESUPUESTO') {
            $('#fechaFiltrado').css({ display: 'block' });
        }
        if (filtro == 'CODIGO CLIENTE') {
            $('#textoDemasFiltros').css({ display: 'block' });
        }
        if (filtro == 'NOMBRE FISCAL') {
            $('#textoDemasFiltros').css({ display: 'block' });
            $('#presupuestoPedidos').append('<datalist id="listaBuena"></datalist>');
            if (this.currentAccount.authorities[0] != 'ROLE_REPRESENTATE') {
                this.datosUsuarioService.findCoger1().subscribe(data => {
                    for (let i = 0; i < data.body['length']; i++) {
                        $('#listaBuena').append('<option value="' + data.body[i][0] + '">' + data.body[i][0] + '</option>');
                        $('#nombreFiscalSelect').append('<option value="' + data.body[i][0] + '">' + data.body[i][0] + '</option>');
                    }
                    this.todosdatosusuarios = data.body;
                });
            } else {
                this.datosUsuarioService.query12(arrayBueno[this.currentAccount.id]).subscribe(data => {
                    for (let i = 0; i < data.body['length']; i++) {
                        $('#listaBuena').append(
                            '<option value="' + data.body[i]['nombreFiscal'] + '">' + data.body[i]['nombreFiscal'] + '</option>'
                        );
                        $('#nombreFiscalSelect').append(
                            '<option value="' + data.body[i]['nombreFiscal'] + '">' + data.body[i]['nombreFiscal'] + '</option>'
                        );
                    }
                    this.todosdatosusuarios = data.body;
                });
            }

            if (screen.width < 800) {
                $('#nombreFiscalSelectFiltros').css({ display: 'block' });
                $('#textoDemasFiltros').css({ display: 'none' });
            }
        }
        if (filtro == 'REFERENCIA CLIENTE') {
            $('#textoDemasFiltros').css({ display: 'block' });
            $('#listaBuena').empty();
        }
    }

    public buscarPresu() {
        var filtro = $('#filtroos').val();
        var texto = $('#inputFiltro').val();
        if (screen.width < 800) {
            var texto = $('#nombreFiscalSelect').val();
        }
        var fechaBus = $('#fechaBus')
            .val()
            .toString();
        console.log(fechaBus);
        var pedidos = this.presuped1;
        var cont = 0;
        var array = [];
        var datosUsuariosTiendas = this.todosdatosusuarios;
        if (filtro == 'NOMBRE FISCAL') {
            if (this.currentAccount.authorities[0] != 'ROLE_REPRESENTATE') {
                for (let i = 0; i < datosUsuariosTiendas['length']; i++) {
                    if (datosUsuariosTiendas[i]['0'] == texto) {
                        for (let u = 0; u < pedidos.length; u++) {
                            if (pedidos[u]['user']['id'] == datosUsuariosTiendas[i][1]['id']) {
                                array[cont] = pedidos[u];
                                cont++;
                            }
                        }
                        this.presupuestoPedidos = array;
                    }
                }
            } else {
                for (let i = 0; i < datosUsuariosTiendas['length']; i++) {
                    if (datosUsuariosTiendas[i]['nombreFiscal'] == texto) {
                        for (let u = 0; u < pedidos.length; u++) {
                            if (pedidos[u]['user']['id'] == datosUsuariosTiendas[i]['user']['id']) {
                                array[cont] = pedidos[u];
                                cont++;
                            }
                        }
                        this.presupuestoPedidos = array;
                    }
                }
            }
        }

        if (filtro == 'FECHA PRESUPUESTO') {
            var fechCorrecta = fechaBus.split('-')[0] + '/' + fechaBus.split('-')[1] + '/' + fechaBus.split('-')[2];
            for (let u = 0; u < pedidos.length; u++) {
                if (pedidos[u]['fecha_presupuesto'] == fechCorrecta) {
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
        $('#page-heading').css({ 'margin-left': '2%' });
        var todos = this.representanteTiendaService.todos;
        this.presupuestoPedidoService
            .query({
                size: 10000000
            })
            .subscribe((res: HttpResponse<IPresupuestoPedido[]>) => {
                $.each(res['body'], function(index, value) {
                    if (auto == 'ROLE_ADMIN') {
                        if (value['pedido'] == 0) {
                            cogidos[contador] = value;
                            contador++;
                        }
                    } else {
                        if (account.authorities.indexOf('ROLE_REPRESENTATE') >= 0) {
                            for (let k = 0; k < todos.length; k++) {
                                if (todos[k]['user'] != null) {
                                    if (todos[k]['user']['id'] == value['user']['id'] && value['pedido'] == 0) {
                                        cogidos[contador] = value;
                                        contador++;
                                    }
                                }
                            }
                        } else {
                            if (value['user']['id'] == idUsu && value['pedido'] == 0) {
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

    public cogerIdPresupuesto1(id) {
        sessionStorage.setItem('presupuesto', id);
        this.presupuestoPedidoService
            .query({
                size: 10000000
            })
            .subscribe(data => {
                for (let i = 0; i < data.body['length']; i++) {
                    if (data.body[i]['id'] == id) {
                        data.body[i]['visto'] = 1;
                        this.subscribeToSaveResponse(this.presupuestoPedidoService.update(data.body[i]));
                    }
                }
            });
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
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

    ngOnInit() {
        var arrayBueno = [];
        arrayBueno[83] = 3;
        arrayBueno[84] = 4;
        arrayBueno[85] = 42;
        if (this.representanteTiendaService.todos == undefined) {
            var account = this.accountService.userIdentity;
            if (account.authorities.indexOf('ROLE_REPRESENTATE') >= 0) {
                this.datosUsuarioService.query12(arrayBueno[account.id]).subscribe(data => {
                    this.representanteTiendaService.todos = data.body;
                    var tiendas = [];
                    for (let m = 0; m < data.body['length']; m++) {
                        tiendas[m] = data.body[m]['datosUsuario'];
                    }
                    this.tiendas = tiendas;
                    this.representanteTiendaService.representante = data.body[0]['represenTorga'];
                    this.loadAll();
                });
            } else {
                this.loadAll();
            }
        } else {
            var todos = this.representanteTiendaService.todos;
            var tiendas = [];
            for (let m = 0; m < todos['length']; m++) {
                tiendas[m] = todos[m]['datosUsuario'];
            }
            this.tiendas = tiendas;
            this.loadAll();
        }

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
}

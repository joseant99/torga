import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
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
    selector: 'jhi-pedidos-usuario',
    templateUrl: './pedidos-usuario.component.html'
})
export class PedidosUsuarioComponent implements OnInit, OnDestroy, AfterViewInit {
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
    ordenarFecha: any;
    ordenarFecha1: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    headres: any;
    previousPage: any;
    isSaving: boolean;
    reverse: any;
    todosdatosusuarios: any;
    presuped1: any;
    numeroPagina: any;
    todospedidos: any;
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
    ngAfterViewInit() {
        var account = this.accountService['userIdentity'];
        if (account.authorities.indexOf('ROLE_ADMIN') == -1) {
            setTimeout(function() {
                $('#soloAbrirModalNoAdmin')[0].click();
            }, 1000);
        }
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
                this.router.navigate(['/pedidos-producto']);
            }
        }
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    public funcionmostrarmensajemodal(id) {
        if (id.toUpperCase() == 'EN REVISION') {
            $('#modalmostrarmensajeestado #divmetertextoEstado').empty();
            $('#modalmostrarmensajeestado #divmetertextoEstado').append(
                '<img style="width:100%;margin-top-58px;" src="../../../content/images/1- PARA WEB/1.jpg">'
            );
        }
        if (id == 'PROCESADO') {
            $('#modalmostrarmensajeestado #divmetertextoEstado').empty();
            $('#modalmostrarmensajeestado #divmetertextoEstado').append(
                '<img style="width:100%;margin-top-58px;" src="../../../content/images/1- PARA WEB/2.jpg">'
            );
        }
        if (id == 'FABRICACION') {
            $('#modalmostrarmensajeestado #divmetertextoEstado').empty();
            $('#modalmostrarmensajeestado #divmetertextoEstado').append(
                '<img style="width:100%;margin-top-58px;" src="../../../content/images/1- PARA WEB/3.jpg">'
            );
        }
        if (id == 'TERMINADO') {
            $('#modalmostrarmensajeestado #divmetertextoEstado').empty();
            $('#modalmostrarmensajeestado #divmetertextoEstado').append(
                '<img style="width:100%;margin-top-58px;" src="../../../content/images/1- PARA WEB/5.jpg">'
            );
        }
        if (id == 'MONTAJE') {
            $('#modalmostrarmensajeestado #divmetertextoEstado').empty();
            $('#modalmostrarmensajeestado #divmetertextoEstado').append(
                '<img style="width:100%;margin-top-58px;" src="../../../content/images/1- PARA WEB/4.jpg">'
            );
        }
        if (id == 'LISTO PARA ENVIAR') {
            $('#modalmostrarmensajeestado #divmetertextoEstado').empty();
            $('#modalmostrarmensajeestado #divmetertextoEstado').append(
                '<img style="width:100%;margin-top-58px;" src="../../../content/images/1- PARA WEB/6.jpg">'
            );
        }
        if (id == 'ENVIADO') {
            $('#modalmostrarmensajeestado #divmetertextoEstado').empty();
            $('#modalmostrarmensajeestado #divmetertextoEstado').append(
                '<img style="width:100%;margin-top-58px;" src="../../../content/images/1- PARA WEB/7.jpg">'
            );
        }
    }

    public filtrosBuscados() {
        var filtro = $('#filtroos').val();

        $('#fechaFiltrado').css({ display: 'none' });
        var arrayBueno = [];
        arrayBueno[83] = 3;
        arrayBueno[85] = 42;
        arrayBueno[85] = 42;
        arrayBueno[310] = 22;
        arrayBueno[386] = 15;
        arrayBueno[541] = 47;
        arrayBueno[873] = 45;
        arrayBueno[934] = 29;
        arrayBueno[1073] = 25;
        arrayBueno[1187] = 18;
        arrayBueno[1188] = 34;
        arrayBueno[1410] = 5;
        arrayBueno[1694] = 32;
        arrayBueno[3239] = 6;
        arrayBueno[3240] = 7;
        arrayBueno[3241] = 8;
        arrayBueno[3242] = 10;
        arrayBueno[3243] = 16;
        arrayBueno[3244] = 17;
        arrayBueno[3245] = 19;
        arrayBueno[3246] = 20;
        arrayBueno[3247] = 24;
        arrayBueno[3248] = 27;
        arrayBueno[3249] = 28;
        arrayBueno[3250] = 31;
        arrayBueno[3251] = 33;
        arrayBueno[3252] = 35;
        arrayBueno[3253] = 37;
        arrayBueno[3254] = 40;
        arrayBueno[3255] = 41;
        arrayBueno[3256] = 44;
        arrayBueno[3257] = 46;
        arrayBueno[3259] = 73;
        $('#textoDemasFiltros').css({ display: 'none' });
        $('#nombreFiscalSelectFiltros').css({ display: 'none' });
        $('#nombreFiscalTextFiltros').css({ display: 'none' });

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
                            if (value['pedido'] == 1) {
                                cogidos[contador] = value;
                                contador++;
                            }
                        } else {
                            if (account.authorities.indexOf('ROLE_REPRESENTATE') >= 0) {
                                for (let k = 0; k < todos.length; k++) {
                                    if (todos[k]['user'] != null) {
                                        if (todos[k]['user']['id'] == value['user']['id'] && value['pedido'] == 1) {
                                            cogidos[contador] = value;
                                            contador++;
                                        }
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
        if (filtro == 'FECHA PEDIDO') {
            $('#fechaFiltrado').css({ display: 'block' });
        }
        if (filtro == 'CODIGO CLIENTE') {
            $('#textoDemasFiltros').css({ display: 'block' });
        }
        if (filtro == 'NOMBRE FISCAL') {
            $('#nombreFiscalSelectFiltros').css({ display: 'block' });
            $('#nombreFiscalTextFiltros').css({ display: 'block' });

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
                $('#nombreFiscalTextFiltros').css({ display: 'block' });
                $('#textoDemasFiltros').css({ display: 'none' });
            }
        }
        if (filtro == 'REFERENCIA CLIENTE') {
            $('#textoDemasFiltros').css({ display: 'block' });
            $('#listaBuena').empty();
        }
    }
    public cargarSelectTexto() {
        var nombreFiscal = $('#nombreFiscalInput').val();
        this.datosUsuarioService.query13(nombreFiscal).subscribe(data => {
            $('#nombreFiscalSelect').empty();
            for (let i = 0; i < data.body['length']; i++) {
                $('#nombreFiscalSelect').append(
                    '<option value="' + data.body[i]['nombreFiscal'] + '">' + data.body[i]['nombreFiscal'] + '</option>'
                );
            }
        });
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
        var pedidos = this.todospedidos;
        var cont = 0;
        var array = [];
        var datosUsuariosTiendas = this.todosdatosusuarios;
        if (filtro == 'NOMBRE FISCAL') {
            if (this.currentAccount.authorities[0] != 'ROLE_REPRESENTATE') {
                var texto = $('#nombreFiscalSelect').val();
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
                var texto = $('#nombreFiscalSelect').val();
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

    public descargarconfirmacion(id) {
        $('#estosoloparadescargar').attr(
            'href',
            'https://pedidostorga:Torga56pedidos123.@pedidospdftorga.com/confirmaciones/' + id + '.pdf'
        );
        $('#estosoloparadescargar').attr('target', '_blank');
        $('#estosoloparadescargar')[0].click();
    }
    public descargarconfirmacion1(id) {
        $('#estosoloparadescargar').attr(
            'href',
            'https://pedidostorga:Torga56pedidos123.@pedidospdftorga.com/confirmaciones/' + id + '.pdf'
        );
        $('#estosoloparadescargar').attr('target', '_blank');
        $('#estosoloparadescargar')[0].click();
    }

    loadAll() {
        console.log(sessionStorage);
        $('#page-heading').css({ 'margin-left': '2%' });
        var idUsu = this.accountService['userIdentity']['id'];
        var auto = this.accountService['userIdentity']['authorities'][1];
        var cogidos = [];
        var account = this.accountService['userIdentity'];
        var contador = 0;
        var todos = this.representanteTiendaService.todos;
        console.log(this.numeroPagina);
        this.presupuestoPedidoService.busquing().subscribe((res: HttpResponse<IPresupuestoPedido[]>) => {
            $.each(res['body'], function(index, value) {
                if (auto == 'ROLE_ADMIN') {
                    if (value['pedido'] == 1) {
                        cogidos[contador] = value;
                        contador++;
                    }
                } else {
                    if (account.authorities.indexOf('ROLE_REPRESENTATE') >= 0) {
                        if (
                            idUsu == 85 ||
                            idUsu == 84 ||
                            idUsu == 1073 ||
                            idUsu == 1694 ||
                            idUsu == 934 ||
                            idUsu == 3246 ||
                            idUsu == 1188
                        ) {
                            for (let k = 0; k < todos.length; k++) {
                                if (todos[k]['user'] != null) {
                                    if (idUsu != 934 && idUsu != 3246 && idUsu != 1188) {
                                        if (todos[k]['user']['id'] == value['user']['id'] && value['pedido'] == 1) {
                                            cogidos[contador] = value;
                                            contador++;
                                        }
                                    } else {
                                        if (todos[k]['user']['id'] == value['user']['id'] && value['pedido'] == 1) {
                                            if (value['web'] == 1) {
                                                cogidos[contador] = value;
                                                contador++;
                                            } else {
                                                if (value['id'] > 4777) {
                                                    cogidos[contador] = value;
                                                    contador++;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            for (let k = 0; k < todos.length; k++) {
                                if (todos[k]['user'] != null) {
                                    if (todos[k]['user']['id'] == value['user']['id'] && value['pedido'] == 1) {
                                        if (value['web'] == 1) {
                                            cogidos[contador] = value;
                                            contador++;
                                        } else {
                                            if (value['id'] > 5421) {
                                                cogidos[contador] = value;
                                                contador++;
                                            }
                                        }
                                    }
                                }
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
                this.todospedidos = cogidos;
                this.tamano = contador;
                var cont = 0;
                var ole = [];
                for (let i = cogidos.length - 1; i >= 0; i--) {
                    if (cont <= 99) {
                        ole[cont] = cogidos[i];
                        cont++;
                    }
                }
                this.todos = ole;
                this.presuped1 = ole;
                this.headres = res.headers;
                res.headers.set('X-Total-Count', this.tamano);
                this.paginatePresupuestoPedidos(ole, res.headers);
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
            this.cambiarpaginacion();
        }
    }
    public cambiarpaginacion() {
        var pagina = this.page;
        var cont = 0;
        var contador = 0;
        var ole = [];
        var cogidos = this.todospedidos;
        if (pagina == 2) {
            for (let i = cogidos.length - 1; i >= 0; i--) {
                if (contador >= 100 && contador <= 199) {
                    ole[cont] = cogidos[i];
                    cont++;
                }
                contador++;
            }
        }
        if (pagina == 1) {
            for (let i = cogidos.length - 1; i >= 0; i--) {
                if (contador >= 0 && contador <= 99) {
                    ole[cont] = cogidos[i];
                    cont++;
                }
                contador++;
            }
        }
        if (pagina == 3) {
            for (let i = cogidos.length - 1; i >= 0; i--) {
                if (contador >= 200 && contador <= 299) {
                    ole[cont] = cogidos[i];
                    cont++;
                }
                contador++;
            }
        }
        if (pagina == 4) {
            for (let i = cogidos.length - 1; i >= 0; i--) {
                if (contador >= 300 && contador <= 399) {
                    ole[cont] = cogidos[i];
                    cont++;
                }
                contador++;
            }
        }
        if (pagina == 5) {
            for (let i = cogidos.length - 1; i >= 0; i--) {
                if (contador >= 400 && contador <= 499) {
                    ole[cont] = cogidos[i];
                    cont++;
                }
                contador++;
            }
        }
        if (pagina == 6) {
            for (let i = cogidos.length - 1; i >= 0; i--) {
                if (contador >= 500 && contador <= 599) {
                    ole[cont] = cogidos[i];
                    cont++;
                }
                contador++;
            }
        }
        if (pagina == 7) {
            for (let i = cogidos.length - 1; i >= 0; i--) {
                if (contador >= 600 && contador <= 699) {
                    ole[cont] = cogidos[i];
                    cont++;
                }
                contador++;
            }
        }
        if (pagina == 8) {
            for (let i = cogidos.length - 1; i >= 0; i--) {
                if (contador >= 700 && contador <= 799) {
                    ole[cont] = cogidos[i];
                    cont++;
                }
                contador++;
            }
        }
        if (pagina == 9) {
            for (let i = cogidos.length - 1; i >= 0; i--) {
                if (contador >= 800 && contador <= 899) {
                    ole[cont] = cogidos[i];
                    cont++;
                }
                contador++;
            }
        }
        if (pagina == 10) {
            for (let i = cogidos.length - 1; i >= 0; i--) {
                if (contador >= 900 && contador <= 999) {
                    ole[cont] = cogidos[i];
                    cont++;
                }
                contador++;
            }
        }
        if (pagina == 11) {
            for (let i = cogidos.length - 1; i >= 0; i--) {
                if (contador >= 1000 && contador <= 1099) {
                    ole[cont] = cogidos[i];
                    cont++;
                }
                contador++;
            }
        }
        if (pagina == 12) {
            for (let i = cogidos.length - 1; i >= 0; i--) {
                if (contador >= 1100 && contador <= 1199) {
                    ole[cont] = cogidos[i];
                    cont++;
                }
                contador++;
            }
        }
        if (pagina == 13) {
            for (let i = cogidos.length - 1; i >= 0; i--) {
                if (contador >= 1200 && contador <= 1299) {
                    ole[cont] = cogidos[i];
                    cont++;
                }
                contador++;
            }
        }
        if (pagina == 14) {
            for (let i = cogidos.length - 1; i >= 0; i--) {
                if (contador >= 1300 && contador <= 1399) {
                    ole[cont] = cogidos[i];
                    cont++;
                }
                contador++;
            }
        }
        if (pagina == 15) {
            for (let i = cogidos.length - 1; i >= 0; i--) {
                if (contador >= 1400 && contador <= 1499) {
                    ole[cont] = cogidos[i];
                    cont++;
                }
                contador++;
            }
        }
        if (pagina == 16) {
            for (let i = cogidos.length - 1; i >= 0; i--) {
                if (contador >= 1500 && contador <= 1599) {
                    ole[cont] = cogidos[i];
                    cont++;
                }
                contador++;
            }
        }
        if (pagina == 17) {
            for (let i = cogidos.length - 1; i >= 0; i--) {
                if (contador >= 1600 && contador <= 1699) {
                    ole[cont] = cogidos[i];
                    cont++;
                }
                contador++;
            }
        }
        if (pagina == 18) {
            for (let i = cogidos.length - 1; i >= 0; i--) {
                if (contador >= 1700 && contador <= 1799) {
                    ole[cont] = cogidos[i];
                    cont++;
                }
                contador++;
            }
        }
        if (pagina == 19) {
            for (let i = cogidos.length - 1; i >= 0; i--) {
                if (contador >= 1800 && contador <= 1899) {
                    ole[cont] = cogidos[i];
                    cont++;
                }
                contador++;
            }
        }
        if (pagina == 20) {
            for (let i = cogidos.length - 1; i >= 0; i--) {
                if (contador >= 1900 && contador <= 1999) {
                    ole[cont] = cogidos[i];
                    cont++;
                }
                contador++;
            }
        }
        this.presupuestoPedidos = ole;
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
        this.router.navigate(['/pedidos-usuario'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.numeroPagina = this.page;
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
    public ordenarPorFecha() {
        var cogidos = this.presuped1;
        var res = this.headres;
        var ordenar = this.ordenarFecha;
        var ole = [];
        var cont = 0;
        if (ordenar == 0) {
            for (let i = cogidos.length - 1; i >= 0; i--) {
                ole[cont] = cogidos[i];
                cont++;
                this.ordenarFecha = 1;
            }
        } else {
            for (let i = 0; i < cogidos.length; i++) {
                ole[cont] = cogidos[i];
                cont++;
                this.ordenarFecha = 0;
            }
        }
        this.presupuestoPedidos = ole;
    }

    public ponercomoborrado() {
        var id = parseFloat(sessionStorage.getItem('presupuesto'));
        this.isSaving = true;
        var pedidos = this.presupuestoPedidos;
        var ole = [];
        var cont = 0;
        for (let i = 0; i < pedidos.length; i++) {
            if (pedidos[i]['id'] != id) {
                ole[cont] = pedidos[i];
                cont++;
            } else {
                var ped = pedidos[i];
                ped['pedido'] = 2;
                ped['modificado'] = 0;
                this.subscribeToSaveResponse10(this.presupuestoPedidoService.update(ped));
            }
        }
        this.presupuestoPedidos = ole;
    }

    protected subscribeToSaveResponse10(result: Observable<HttpResponse<IPresupuestoPedido>>) {
        result.subscribe(
            (res: HttpResponse<IPresupuestoPedido>) => this.onSaveSuccess10(),
            (res: HttpErrorResponse) => this.onSaveError10()
        );
    }

    protected onSaveSuccess10() {
        this.isSaving = false;
    }
    protected onSaveError10() {
        this.isSaving = false;
    }

    ngOnInit() {
        var arrayBueno = [];
        arrayBueno[83] = 3;
        arrayBueno[84] = 4;
        this.ordenarFecha = 0;
        this.ordenarFecha = 1;
        arrayBueno[85] = 42;
        arrayBueno[310] = 22;
        arrayBueno[386] = 15;
        arrayBueno[541] = 47;
        arrayBueno[873] = 45;
        arrayBueno[934] = 29;
        arrayBueno[1073] = 25;
        arrayBueno[1187] = 18;
        arrayBueno[1188] = 34;
        arrayBueno[1410] = 5;
        arrayBueno[1694] = 32;
        arrayBueno[3239] = 6;
        arrayBueno[3240] = 7;
        arrayBueno[3241] = 8;
        arrayBueno[3242] = 10;
        arrayBueno[3243] = 16;
        arrayBueno[3244] = 17;
        arrayBueno[3245] = 19;
        arrayBueno[3246] = 20;
        arrayBueno[3247] = 24;
        arrayBueno[3248] = 27;
        arrayBueno[3249] = 28;
        arrayBueno[3250] = 31;
        arrayBueno[3251] = 33;
        arrayBueno[3252] = 35;
        arrayBueno[3253] = 37;
        arrayBueno[3254] = 40;
        arrayBueno[3255] = 41;
        arrayBueno[3256] = 44;
        arrayBueno[3257] = 46;
        arrayBueno[3259] = 73;
        this.numeroPagina = 1;
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
        this.presupuestoPedidos = data;
        var tamano = headers.get('X-Total-Count');
        tamano = this.tamano;
        //this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(tamano, 10);
        this.queryCount = this.totalItems;
    }
}

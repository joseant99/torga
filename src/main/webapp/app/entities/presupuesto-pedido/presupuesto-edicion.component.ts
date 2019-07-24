import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IPresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';
import { IProductosPresupuestoPedidos } from 'app/shared/model/productos-presupuesto-pedidos.model';

import { ITEMS_PER_PAGE } from 'app/shared';
import { PresupuestoPedidoService } from './presupuesto-pedido.service';
import { ProductosPresupuestoPedidosService } from '../productos-presupuesto-pedidos/productos-presupuesto-pedidos.service';
import { DimensionesProductoTipoService } from '../dimensiones-producto-tipo/dimensiones-producto-tipo.service';
import { AcaProdService } from '../aca-prod/aca-prod.service';
import { AcabadosService } from '../acabados/acabados.service';
import { ProductosDormitorioService } from '../productos-dormitorio/productos-dormitorio.service';
import { InterioresService } from '../interiores/interiores.service';
import { AccountService, UserService, User } from 'app/core';

@Component({
    selector: 'jhi-presupuesto-edicion',
    templateUrl: './presupuesto-edicion.component.html'
})
export class PresupuestoEdicionComponent implements OnInit, OnDestroy {
    currentAccount: any;
    productosPresupuestoPedidos: any;
    error: any;
    success: any;
    presupuestoPedidos: IPresupuestoPedido[];
    eventSubscriber: Subscription;
    routeData: any;
    presupuestos: any;
    todasDimension: any;
    ProductosPresupuestos: any;
    todosAcabados: any;
    acaProd: any;
    user: any;
    acabados: any;
    isSaving: boolean;
    apoyo: any;
    interiores: any;
    presupuesto: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        protected acabadosService: AcabadosService,
        protected interioresService: InterioresService,
        protected userService: UserService,
        protected productosDormitorioService: ProductosDormitorioService,
        protected acaProdService: AcaProdService,
        protected dimensionesProductoTipoService: DimensionesProductoTipoService,
        protected productosPresupuestoPedidosService: ProductosPresupuestoPedidosService,
        protected presupuestoPedidoService: PresupuestoPedidoService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
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
        $('#calculadora').attr('class', 'container tab-pane fade active show');
        var productosPresupuesto = [];
        var cont = 0;
        var presu = sessionStorage.getItem('presupuesto');
        this.productosPresupuestoPedidosService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe((res: HttpResponse<IProductosPresupuestoPedidos[]>) => {
                for (let i = 0; i < res.body.length; i++) {
                    if (res.body[i]['presupuestoPedido'] != null) {
                        if (parseFloat(presu) == res.body[i]['presupuestoPedido']['id']) {
                            productosPresupuesto[cont] = res.body[i];
                            cont++;
                        }
                    }
                }
                for (let k = 1; k <= 3; k++) {
                    $('#productoCalculadora' + k + ' #datos' + k).append(
                        '<font style="background-color:gray;width:100%;color:white">' +
                            productosPresupuesto[k - 1]['productosDormitorio']['nombre'] +
                            '</font>'
                    );
                    $('#productoCalculadora' + k + ' #datos' + k).append('<br>');
                    $('#productoCalculadora' + k + ' #datos' + k).append(
                        '<font id="idDimen' +
                            (k - 1) +
                            '" class="' +
                            productosPresupuesto[k - 1]['dimensionesProductoTipo']['id'] +
                            '">Ancho</font>'
                    );
                    $('#productoCalculadora' + k + ' #datos' + k).append('<br>');
                    $('#productoCalculadora' + k + ' #datos' + k).append('<font>Alto</font>');
                    $('#productoCalculadora' + k + ' #datos' + k).append('<br>');
                    $('#productoCalculadora' + k + ' #datos' + k).append('<font>Fondo</font>');
                    $('#productoCalculadora' + k + ' #datos' + k).append('<br>');
                    $('#productoCalculadora' + k + ' #precios' + k).append('<font>-</font>');
                    $('#productoCalculadora' + k + ' #precios' + k).append('<br>');
                    $('#productoCalculadora' + k + ' #precios' + k).append(
                        '<font id="ancho' + (k - 1) + '">' + productosPresupuesto[k - 1]['dimensionesProductoTipo']['ancho'] + '</font>'
                    );
                    $('#productoCalculadora' + k + ' #precios' + k).append('<br>');
                    $('#productoCalculadora' + k + ' #precios' + k).append(
                        '<font id="alto' + (k - 1) + '">' + productosPresupuesto[k - 1]['dimensionesProductoTipo']['alto'] + '</font>'
                    );
                    $('#productoCalculadora' + k + ' #precios' + k).append('<br>');
                    $('#productoCalculadora' + k + ' #precios' + k).append(
                        '<font id="fondo' + (k - 1) + '">' + productosPresupuesto[k - 1]['dimensionesProductoTipo']['fondo'] + '</font>'
                    );
                    $('#productoCalculadora' + k + ' #precioCalculado' + k).append('<font>-</font>');
                    $('#productoCalculadora' + k + ' #precioCalculado' + k).append('<br>');
                    $('#productoCalculadora' + k + ' #precioCalculado' + k).append('<font>-</font>');
                    $('#productoCalculadora' + k + ' #precioCalculado' + k).append('<br>');
                    $('#productoCalculadora' + k + ' #precioCalculado' + k).append('<font>-</font>');
                    $('#productoCalculadora' + k + ' #precioCalculado' + k).append('<br>');
                    $('#productoCalculadora' + k + ' #precioCalculado' + k).append('<font>-</font>');
                    $('#productoCalculadora' + k + ' #precioCalculado' + k).append('<br>');
                }
                this.ProductosPresupuestos = productosPresupuesto;
            });

        var todasDimensiones = [];
        var todosAcabados = [];
        var acaProd = [];
        var acabados = [];
        var apoyo = [];
        var presupuesto = [];
        var interiores = [];
        var usuarios = [];
        console.log(this);
        for (let i = 1; i <= 100; i++) {
            var sesion = JSON.parse(sessionStorage.getItem('prod' + i));
            if (sesion != null) {
                console.log(sessionStorage);
                $('#productoCarrito' + i).removeAttr('style');
                $('#productoCarrito' + i).attr('style');
                $('#productoCarrito' + i).css({ float: 'left' });
                $('#productoCarrito' + i).attr('class', 'prod' + i);
                $('#productoCarrito' + i + ' #datos' + i).append(
                    '<strong id="nombreProd' + i + '"><font>' + sesion[0]['nombre'] + '</font></strong>'
                );
                $('#productoCarrito' + i + ' #datos' + i).append('<br>');
                $('#productoCarrito' + i + ' #precios' + i).append('<font>-</font>');
                $('#productoCarrito' + i + ' #precios' + i).append('<br>');
                $('#productoCarrito' + i + ' #precioCalculado' + i).append('<font>-</font>');
                $('#productoCarrito' + i + ' #precioCalculado' + i).append('<br>');
                $('#productoCarrito' + i + ' #datos' + i).append('<font>Ancho</font>');
                $('#productoCarrito' + i + ' #datos' + i).append('<br>');
                $('#productoCarrito' + i + ' #precios' + i).append('<font id="ancho' + i + '">' + sesion[1]['ancho'] + '</font>');
                $('#productoCarrito' + i + ' #precios' + i).append('<br>');
                $('#productoCarrito' + i + ' #precioCalculado' + i).append('<font>-</font>');
                $('#productoCarrito' + i + ' #precioCalculado' + i).append('<br>');
                $('#productoCarrito' + i + ' #datos' + i).append('<font>Alto</font>');
                $('#productoCarrito' + i + ' #datos' + i).append('<br>');
                $('#productoCarrito' + i + ' #precios' + i).append('<font id="alto' + i + '">' + sesion[1]['alto'] + '</font>');
                $('#productoCarrito' + i + ' #precios' + i).append('<br>');
                $('#productoCarrito' + i + ' #precioCalculado' + i).append('<font>-</font>');
                $('#productoCarrito' + i + ' #precioCalculado' + i).append('<br>');
                $('#productoCarrito' + i + ' #datos' + i).append('<font>Fondo</font>');
                $('#productoCarrito' + i + ' #datos' + i).append('<br>');
                $('#productoCarrito' + i + ' #precios' + i).append('<font id="fondo' + i + '">' + sesion[1]['fondo'] + '</font>');
                $('#productoCarrito' + i + ' #precios' + i).append('<br>');
                $('#productoCarrito' + i + ' #precioCalculado' + i).append('<font>-</font>');
                $('#productoCarrito' + i + ' #precioCalculado' + i).append('<br>');
                for (let j = 1; j <= sesion.length - 2; j++) {
                    $('#productoCarrito' + i + ' #datos' + i).append('<font>Acabado ' + j + '</font>');
                    $('#productoCarrito' + i + ' #datos' + i).append('<br>');
                    $('#productoCarrito' + i + ' #precios' + i).append(
                        '<font id="acabado' + i + '' + j + '">' + sesion[1 + j]['nombre'] + '</font>'
                    );
                    $('#productoCarrito' + i + ' #precios' + i).append('<br>');
                    $('#productoCarrito' + i + ' #precioCalculado' + i).append('<font>-</font>');
                    $('#productoCarrito' + i + ' #precioCalculado' + i).append('<br>');
                }
            }
        }

        this.dimensionesProductoTipoService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                $.each(data['body'], function(index, value) {
                    todasDimensiones[index] = value;
                });
            });
        this.todasDimension = todasDimensiones;

        this.interioresService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                $.each(data['body'], function(index, value) {
                    interiores[index] = value;
                });
            });
        this.interiores = interiores;

        this.presupuestoPedidoService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                $.each(data['body'], function(index, value) {
                    presupuesto[0] = value;
                    if (presupuesto[0]['id'] > localStorage.getItem('ultimoPresupuesto')) {
                        localStorage.setItem('ultimoPresupuesto', JSON.stringify(presupuesto[0]['id']));
                    }
                });
            });
        this.presupuesto = presupuesto;

        this.userService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                $.each(data['body'], function(index, value) {
                    usuarios[index] = value;
                });
            });
        this.user = usuarios;
        this.acabadosService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                $.each(data['body'], function(index, value) {
                    acabados[index] = value;
                });
            });
        this.acabados = acabados;

        this.acaProdService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                $.each(data['body'], function(index, value) {
                    acaProd[index] = value;
                });
            });

        this.acaProd = acaProd;

        this.productosDormitorioService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                $.each(data['body'], function(index, value) {
                    apoyo[index] = value;
                });
            });
        this.apoyo = apoyo;
    }

    public cambiarDimension(id, idProd) {
        var mensaje = $('#dimen' + id + '' + idProd + ' #mensajeDimen' + idProd).text();
        $('.dimensionBlanca1').css({ 'background-color': 'white' });
        $('#dimen' + id + '' + idProd).css({ 'background-color': '#DFDDDC' });
        var todasDimensiones = this.todasDimension;

        $.each(todasDimensiones, function(index, value) {
            if (value['mensaje'] == mensaje) {
                $('#ancho' + idProd).text(value['ancho']);
                $('#ancho' + idProd).attr('class', value['id']);
                $('#alto' + idProd).text(value['alto']);
                $('#fondo' + idProd).text(value['fondo']);
            }
        });
    }

    public eliminar(id) {
        $('#prod' + id).remove();
        $('#productoCalculadora' + id).remove();
    }

    public ocultar(id) {
        $('#eliminarB' + id).remove();
        $('#dimensiones' + id).css({ display: 'none' });
        $('#acabados' + id).css({ display: 'none' });
        $('#apoyo' + id).css({ display: 'none' });
        $('#eliminarBA' + id).removeAttr('style');
        $('#eliminarBA' + id).attr('style');
        $('#textoMostrar' + id).css({ border: '1px solid black' });
        $('#textoMostrar' + id).css({ height: '120px' });
        $('#textoMostrar' + id).css({ 'text-align': 'center' });
        $('#textoMostrar' + id).css({ 'padding-top': '15px' });
        $('#textoMostrar' + id).text('Mostrar configuracion del articulo');
        $('#eliminarBA' + id).css({ 'font-size': '20px' });
        $('#eliminarBA' + id).css({ width: '20%' });
        $('#eliminarBA' + id).css({ float: 'left' });
        $('#eliminarBA' + id).css({ 'margin-left': '50px' });
        $('#eliminarBA' + id).css({ 'margin-top': '15px' });
    }

    public mostrarDatos(id) {
        sessionStorage.setItem('prodPre' + id, JSON.stringify(id));
        var productosPresupuestos = this.presupuestos;
        var dimensiones = this.todasDimension;
        var contadorDimensiones = 1;
        for (let i = 0; i < dimensiones.length; i++) {
            if (dimensiones[i]['productosDormitorio']['id'] == productosPresupuestos[id]['productosDormitorio']['id']) {
                $('.' + id).removeAttr('style');
                $('.' + id).attr('style');
                $('.' + id).css({ width: '100%' });
                $('.' + id).css({ float: 'left' });
                $('.' + id + ' .dimension' + contadorDimensiones).attr('id', 'dimen' + contadorDimensiones + '' + id);
                $('.' + id + ' #dimen' + contadorDimensiones + '' + id).attr('style');
                $('.' + id + ' #dimen' + contadorDimensiones + '' + id).css({ float: 'left' });
                $('.' + id + ' #dimen' + contadorDimensiones + '' + id).css({ 'margin-left': '50px' });
                $('.' + id + ' #dimen' + contadorDimensiones + '' + id).css({ width: '30%' });
                $('.' + id + ' #dimen' + contadorDimensiones + '' + id).append(
                    '<p id="mensajeDimen' + id + '">' + dimensiones[i]['mensaje'] + '</p><hr style="width:100%;color:black"></hr>'
                );
                $('.' + id + ' #dimen' + contadorDimensiones + '' + id).append(
                    '<img  src="data:image/gif;base64,' +
                        dimensiones[i]['imagen'] +
                        '" id="imagenDimensiones" class="' +
                        dimensiones[i]['id'] +
                        '" width="300px" style=" opacity: 0.7;">'
                );
                if (productosPresupuestos[id]['dimensionesProductoTipo']['id'] == dimensiones[i]['id']) {
                    $('.' + id + ' #dimen' + contadorDimensiones + '' + id).css({ 'background-color': '#DFDDDC' });
                }
                contadorDimensiones++;
            }
        }
    }

    loadAll() {
        var productosPresupuesto = [];
        var cont = 0;
        var presu = sessionStorage.getItem('presupuesto');
        this.productosPresupuestoPedidosService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IProductosPresupuestoPedidos[]>) => {
                    for (let i = 0; i < res.body.length; i++) {
                        if (res.body[i]['presupuestoPedido'] != null) {
                            if (parseFloat(presu) == res.body[i]['presupuestoPedido']['id']) {
                                productosPresupuesto[cont] = res.body[i];
                                cont++;
                            }
                        }
                    }
                    this.ProductosPresupuestos = productosPresupuesto;
                    this.paginateProductosPresupuestoPedidos(productosPresupuesto, res.headers);
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/productos-presupuesto-pedidos'], {
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
            '/productos-presupuesto-pedidos',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        var presupuestos = [];
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProductosPresupuestoPedidos();

        this.productosPresupuestoPedidosService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                $.each(data['body'], function(index, value) {
                    presupuestos[index] = value;
                });
            });
        this.presupuestos = presupuestos;
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProductosPresupuestoPedidos) {
        return item.id;
    }

    registerChangeInProductosPresupuestoPedidos() {
        this.eventSubscriber = this.eventManager.subscribe('productosPresupuestoPedidosListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateProductosPresupuestoPedidos(data: IProductosPresupuestoPedidos[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.productosPresupuestoPedidos = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IComposicion } from 'app/shared/model/composicion.model';

import { ITEMS_PER_PAGE } from 'app/shared';
import { IProductosPresupuestoPedidos } from 'app/shared/model/productos-presupuesto-pedidos.model';
import { ComposicionService } from './composicion.service';
import { ProductosComposicionService } from '../productos-composicion/productos-composicion.service';
import { DimensionesProductoTipoService } from '../dimensiones-producto-tipo/dimensiones-producto-tipo.service';
import { AcabadosComposicionService } from '../acabados-composicion/acabados-composicion.service';
import { AcaProdService } from '../aca-prod/aca-prod.service';
import { AcabadosService } from '../acabados/acabados.service';
import { ProductosDormitorioService } from '../productos-dormitorio/productos-dormitorio.service';
import { InterioresService } from '../interiores/interiores.service';
import { PresupuestoPedidoService } from '../presupuesto-pedido/presupuesto-pedido.service';
import { IPresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';
import { AccountService, UserService, User } from 'app/core';
import { ProductosPresupuestoPedidosService } from '../productos-presupuesto-pedidos/productos-presupuesto-pedidos.service';
import { Observable } from 'rxjs';
import { ICategoriasDormi } from 'app/shared/model/categorias-dormi.model';

@Component({
    selector: 'jhi-composicion',
    templateUrl: './composicion-ver.component.html'
})
export class ComposicionVerComponent implements OnInit, OnDestroy, AfterViewInit {
    currentAccount: any;
    productosPresupuestoPedidos: IProductosPresupuestoPedidos;
    composicions: IComposicion[];
    error: any;
    todasDimension: any;
    todasDimensiones: any;
    todosAcabados: any;
    acaProd: any;
    user: any;
    acabados: any;
    presupuestoPedido: IPresupuestoPedido;
    isSaving: boolean;
    apoyo: any;
    interiores: any;
    presupuesto: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        protected composicionService: ComposicionService,
        protected acabadosService: AcabadosService,
        protected interioresService: InterioresService,
        protected productosPresupuestoPedidosService: ProductosPresupuestoPedidosService,
        protected userService: UserService,
        protected productosDormitorioService: ProductosDormitorioService,
        protected acaProdService: AcaProdService,
        protected acabadosComposicionService: AcabadosComposicionService,
        protected dimensionesProductoTipoService: DimensionesProductoTipoService,
        protected productosComposicionService: ProductosComposicionService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected presupuestoPedidoService: PresupuestoPedidoService,
        protected activatedRoute: ActivatedRoute,
        protected dataUtils: JhiDataUtils,
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
        var todasDimensiones = [];
        var todosAcabados = [];
        var acaProd = [];
        var acabados = [];
        var apoyo = [];
        var presupuesto = [];
        var interiores = [];
        var usuarios = [];
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
        this.todasDimensiones = todasDimensiones;

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
        this.acabadosComposicionService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                $.each(data['body'], function(index, value) {
                    todosAcabados[index] = value;
                });
            });
        this.todosAcabados = todosAcabados;

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
    loadAll() {
        this.composicionService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IComposicion[]>) => this.paginateComposicions(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    public interior(id, id1) {
        var mensaje = $('#dimen' + id + '' + id1 + ' #mensajeDimen' + id1).text();
        var interiores = this.interiores;
        $.each(interiores, function(index, value) {
            if (value['dimensionesProductoTipo']['mensaje'] == mensaje) {
                $('#imagenInterior').append(
                    '<img  src="data:image/gif;base64,' +
                        value['imagen'] +
                        '" id="imagenInterior" class="' +
                        value['id'] +
                        '" width="1000px" height="400px" style="text-align:center;margin-left:240px;margin-bottom:25px;">'
                );
                $('#modalInformacion').modal('show');
            }
        });
    }

    public open(id) {
        $('#calculadora').attr('class', 'container tab-pane fade active show');
        this.ponerEnBlanco();
        $('#' + id).css({ 'background-color': '#DFDDDC' });
        $('#productosComp').removeAttr('style');
        $('#productosComp').attr('style');
        $('#productosComp').css({ width: '100%' });
        $('#productosComp').css({ float: 'left' });

        var acabados1 = this.todosAcabados;
        var contador = 1;
        this.productosComposicionService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                $.each(data['body'], function(index, value) {
                    if (value['composicion']['id'] == id) {
                        var contadorAcabado = 1;
                        $('#botones' + contador).removeAttr('style');
                        $('#nombreMesita').text(value['composicion']['nombre']);
                        $('#datos' + contador).append(
                            '<font style="background-color:gray;width:100%;color:white" id="nombreProd' +
                                contador +
                                '" class="' +
                                value['productosDormitorio']['id'] +
                                '">' +
                                value['productosDormitorio']['nombre'] +
                                '</font>'
                        );
                        $('#datos' + contador).append('<br>');
                        $('#datos' + contador).append('<font>ancho</font>');
                        $('#datos' + contador).append('<br>');
                        $('#datos' + contador).append('<font>alto</font>');
                        $('#datos' + contador).append('<br>');
                        $('#datos' + contador).append('<font>fondo</font>');
                        $('#datos' + contador).append('<br>');
                        for (let i = 0; i < acabados1.length; i++) {
                            if (acabados1[i]['productosComposicion']['id'] == value['id']) {
                                $('#datos' + contador).append('<font>Acabado ' + contadorAcabado + ' </font>');
                                $('#datos' + contador).append('<br>');
                                contadorAcabado++;
                            }
                        }
                        if (value['tiposApoyo'] != null) {
                            $('#datos' + contador).append('<font>' + value['tiposApoyo']['productoApoyo']['nombre'] + '</font>');
                            $('#datos' + contador).append('<br>');
                        }

                        $('#precios' + contador).append('<font>-</font>');
                        $('#precios' + contador).append('<br>');
                        $('#precioCalculado' + contador).append('<font>-</font>');
                        $('#precioCalculado' + contador).append('<br>');
                        $('#precios' + contador).append(
                            '<font id="ancho' +
                                contador +
                                '" class="' +
                                value['dimensionesProductoTipo']['id'] +
                                '">' +
                                value['dimensionesProductoTipo']['ancho'] +
                                '</font>'
                        );
                        $('#precios' + contador).append('<br>');
                        $('#precioCalculado' + contador).append('<font>-</font>');
                        $('#precioCalculado' + contador).append('<br>');
                        $('#precios' + contador).append(
                            '<font id="alto' + contador + '">' + value['dimensionesProductoTipo']['alto'] + '</font>'
                        );
                        $('#precios' + contador).append('<br>');
                        $('#precioCalculado' + contador).append('<font>-</font>');
                        $('#precioCalculado' + contador).append('<br>');
                        $('#precios' + contador).append(
                            '<font id="fondo' + contador + '">' + value['dimensionesProductoTipo']['fondo'] + '</font>'
                        );
                        $('#precios' + contador).append('<br>');
                        $('#precioCalculado' + contador).append('<font>-</font>');
                        $('#precioCalculado' + contador).append('<br>');
                        var contAca = 1;
                        for (let i = 0; i < acabados1.length; i++) {
                            if (acabados1[i]['productosComposicion']['id'] == value['id']) {
                                $('#precios' + contador).append(
                                    '<font id="nombreAcabado' +
                                        contador +
                                        '' +
                                        contAca +
                                        '">' +
                                        acabados1[i]['acabados']['nombre'] +
                                        '</font>'
                                );
                                $('#precios' + contador).append('<br>');
                                $('#precioCalculado' + contador).append('<font>-</font>');
                                $('#precioCalculado' + contador).append('<br>');
                                contAca++;
                            }
                        }
                        if (value['tiposApoyo'] != null) {
                            $('#precios' + contador).append('<font>-</font>');
                            $('#precios' + contador).append('<br>');
                            $('#precioCalculado' + contador).append('<font>' + value['tiposApoyo']['precio'] + '&euro;</font>');
                            $('#precioCalculado' + contador).append('<br>');
                        }

                        $('#prod' + contador).css({ width: '100%' });
                        $('#prod' + contador).css({ 'margin-top': '50px' });
                        $('#prod' + contador).css({ float: 'left' });
                        $('#prodMetido' + contador).css({ width: '60%' });
                        $('#prodMetido' + contador).css({ float: 'left' });
                        $('#prod' + contador).css({ 'margin-left': '50px' });
                        $('#prodMetido' + contador).css({ 'margin-left': '50px' });
                        $('#prodMetido' + contador).attr('class', 'selectectProd');
                        $('#prodMetido' + contador).append(
                            '<p class="' +
                                value['id'] +
                                '" id="texto' +
                                contador +
                                '" style="text-align:center">' +
                                value['productosDormitorio']['nombre'] +
                                '</p><hr style="width:100%;color:black"></hr>'
                        );
                        $('#prodMetido' + contador).append(
                            '<img  src="data:image/gif;base64,' +
                                value['productosDormitorio']['imagen'] +
                                '" id="imagenDimensiones" class="' +
                                value['id'] +
                                '" width="300px" style="text-align:center;margin-left:140px;margin-bottom:25px; opacity: 0.7;">'
                        );
                        contador++;
                    }
                });
            });
    }
    public eliminar(id) {
        $('#prod' + id).remove();
        $('#productoCalculadora' + id).remove();
    }

    public borrarCarritoProd(id) {
        var Borrar = $('#productoCarrito' + id).attr('class');
        sessionStorage.removeItem(Borrar);
        $('#productoCarrito' + id).remove();
    }

    public mostrarDatos(id) {
        $('#dimensiones' + id).removeAttr('style');
        $('#dimensiones' + id).attr('style');
        $('#dimensiones' + id).css({ width: '100%' });
        $('#dimensiones' + id).css({ float: 'left' });
        $('.cambiarAcabado').removeAttr('style');
        $('.cambiarAcabado').attr('style');
        $('.cambiarAcabado').css({ float: 'left' });
        $('.cambiarAcabado').css({ 'margin-right': '30px' });
        $('.cambiarAcabado').css({ 'margin-top': '20px' });
        $('.cambiarAcabado').css({ 'margin-bottom': '30px' });
        $('#acabados' + id).removeAttr('style');
        $('#acabados' + id).attr('style');
        $('#acabados' + id).css({ width: '100%' });
        $('#acabados' + id).css({ float: 'left' });
        var idCompProd = $('#texto' + id).attr('class');
        var acabados = this.acabados;
        var todasDimensiones = this.todasDimensiones;
        var todosAcabados = this.todosAcabados;
        var acaProd = this.acaProd;
        var apoyo = this.apoyo;
        var contador = 1;
        var contador1 = 1;
        var contador2 = 1;
        var acaDelProducto = [];
        var cont = 1;
        this.productosComposicionService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                $.each(data['body'], function(index, value) {
                    if (value['id'] == parseFloat(idCompProd)) {
                        $.each(todasDimensiones, function(index1, value1) {
                            if (value['productosDormitorio']['id'] == value1['productosDormitorio']['id']) {
                                $('#dimen' + id + '' + contador).attr('style');
                                $('#dimen' + id + '' + contador).css({ float: 'left' });
                                $('#dimen' + id + '' + contador).css({ 'margin-left': '50px' });
                                $('#dimen' + id + '' + contador).css({ width: '30%' });
                                $('#dimen' + id + '' + contador).append(
                                    '<p id="mensajeDimen' +
                                        contador +
                                        '">' +
                                        value1['mensaje'] +
                                        '</p><hr style="width:100%;color:black"></hr>'
                                );
                                $('#dimen' + id + '' + contador).append(
                                    '<img  src="data:image/gif;base64,' +
                                        value1['imagen'] +
                                        '" id="imagenDimensiones" class="' +
                                        value1['id'] +
                                        '" width="300px" style=" opacity: 0.7;">'
                                );
                                if (value['dimensionesProductoTipo']['id'] == value1['id']) {
                                    $('#dimen' + id + '' + contador).css({ 'background-color': '#DFDDDC' });
                                }
                                contador++;
                            }
                        });

                        if (value['tiposApoyo'] != null) {
                            $('#apoyo' + id).removeAttr('style');
                            $('#apoyo' + id).attr('style');
                            $('#apoyo' + id).css({ width: '100%' });
                            $('#apoyo' + id).css({ float: 'left' });
                            $.each(apoyo, function(index2, value2) {
                                if (value2['categoriasDormiId'] == 2) {
                                    $('#apo' + id + '' + contador2).attr('style');
                                    $('#apo' + id + '' + contador2).css({ float: 'left' });
                                    $('#apo' + id + '' + contador2).css({ 'margin-left': '50px' });
                                    $('#apo' + id + '' + contador2).css({ width: '30%' });
                                    $('#apo' + id + '' + contador2).append(
                                        '<p>' + value2['nombre'] + '</p><hr style="width:100%;color:black"></hr>'
                                    );
                                    $('#apo' + id + '' + contador2).append(
                                        '<img  src="data:image/gif;base64,' +
                                            value2['imagen'] +
                                            '" id="imagenDimensiones" class="' +
                                            value2['id'] +
                                            '" width="300px" style=" opacity: 0.7;">'
                                    );

                                    if (value2['id'] == value['tiposApoyo']['productoApoyo']['id']) {
                                        $('#apo' + id + '' + contador2).attr('class', 'selectectProd');
                                    }
                                    contador2++;
                                }
                            });
                        }

                        $.each(todosAcabados, function(index1, value1) {
                            if (value['id'] == value1['productosComposicion']['id']) {
                                if (cont == 1) {
                                    for (let i = 0; i < acaProd.length; i++) {
                                        if (acaProd[i]['productosDormitorio']['id'] == value['productosDormitorio']['id']) {
                                            acaDelProducto[cont] = acaProd[i];
                                            cont++;
                                        }
                                    }
                                    $('#imagen' + id).append(
                                        '<img  src="data:image/gif;base64,' +
                                            acaDelProducto[1]['imagen'] +
                                            '" id="imagenDimensiones" class="' +
                                            acaDelProducto[1]['id'] +
                                            '" width="300px" style=" opacity: 0.7;">'
                                    );
                                }
                                if (acaDelProducto.length > contador1) {
                                    $('#aca' + id + '' + contador1).attr('style');
                                    $('#aca' + id + '' + contador1).css({ float: 'left' });
                                    $('#aca' + id + '' + contador1).css({ 'margin-left': '50px' });
                                    $('#aca' + id + '' + contador1).css({ width: '40%' });
                                    $('#comboAca' + contador1 + '' + id).append(
                                        '<option value="' + value1['acabados']['id'] + '">' + value1['acabados']['nombre'] + '</option>'
                                    );

                                    $('#myModalColores' + contador1 + ' .modal-body #acabadoImagen0').append(
                                        '<img  src="data:image/gif;base64,' +
                                            value1['acabados']['imagenFondo'] +
                                            '" id="imagenAcabado0" class="' +
                                            value1['acabados']['id'] +
                                            '" height="160px" width="280px" style=" opacity: 0.7;">'
                                    );
                                    $('#myModalColores' + contador1 + ' .modal-body #acabadoImagen0').append(
                                        '<p style="    position: absolute;margin-top: -105px;font-size: 30px;margin-left: 80px;">' +
                                            value1['acabados']['nombre'] +
                                            '</p>'
                                    );
                                    $('#imagenAcabado1' + contador1).append(
                                        '<img  src="data:image/gif;base64,' +
                                            value1['acabados']['imagenFondo'] +
                                            '" id="imagenAcabadoPrincipal" class="' +
                                            value1['acabados']['id'] +
                                            '" height="60px" width="200px" style=" opacity: 0.7;">'
                                    );
                                    if (
                                        value1['acabados']['id'] != 12 &&
                                        value1['acabados']['id'] != 8 &&
                                        value1['acabados']['id'] != 16 &&
                                        value1['acabados']['id'] != 1
                                    ) {
                                        $('#aca' + id + '' + contador1).append(
                                            '<div style="position:absolute;margin-top:35px;left:720px;transform: translate(-50%,-50%)" id="contenedorTextoAcabado"><p id="acabadoNombrePrincipal" style="color:black" >' +
                                                value1['acabados']['nombre'] +
                                                '</p></div>'
                                        );
                                    } else {
                                        $('#aca' + id + '' + contador1).append(
                                            '<div style="position:absolute;margin-top:35px;left:720px;transform: translate(-50%,-50%)" id="contenedorTextoAcabado"><p id="acabadoNombrePrincipal" style="color:white" >' +
                                                value1['acabados']['nombre'] +
                                                '</p></div>'
                                        );
                                    }
                                    var contAca = 0;
                                    for (let j = 0; j < acabados.length; j++) {
                                        if (value1['acabados']['nombre'] != acabados[j]['nombre']) {
                                            if (value1['acabados']['id'] == 1 || value1['acabados']['id'] == 2) {
                                                if (acabados[j]['id'] == 1 || acabados[j]['id'] == 2) {
                                                    $('#myModalColores' + contador1 + ' .modal-body #acabadoImagen' + contador1).append(
                                                        '<img  src="data:image/gif;base64,' +
                                                            acabados[j]['imagenFondo'] +
                                                            '" id="imagenAcabado' +
                                                            contAca +
                                                            '" class="' +
                                                            acabados[j]['id'] +
                                                            '" width="150px" style=" opacity: 0.7;">'
                                                    );
                                                }
                                            } else {
                                                if (acabados[j]['id'] != 1 && acabados[j]['id'] != 2) {
                                                    contAca++;
                                                    if (acabados[j]['id'] != 12 && acabados[j]['id'] != 8 && acabados[j]['id'] != 16) {
                                                        $('#myModalColores' + contador1 + ' .modal-body #acabadoImagen' + contAca).append(
                                                            '<img  src="data:image/gif;base64,' +
                                                                acabados[j]['imagenFondo'] +
                                                                '" id="imagenAcabado' +
                                                                contAca +
                                                                '" class="' +
                                                                acabados[j]['id'] +
                                                                '" height="160px" width="280px" style=" opacity: 0.7;">'
                                                        );
                                                        $('#myModalColores' + contador1 + ' .modal-body #acabadoImagen' + contAca).append(
                                                            '<strong><p style="    position: absolute;margin-top: -105px;font-size: 30px;margin-left: 80px;">' +
                                                                acabados[j]['nombre'] +
                                                                '</strong></p>'
                                                        );
                                                    } else {
                                                        $('#myModalColores' + contador1 + ' .modal-body #acabadoImagen' + contAca).append(
                                                            '<img  src="data:image/gif;base64,' +
                                                                acabados[j]['imagenFondo'] +
                                                                '" id="imagenAcabado' +
                                                                contAca +
                                                                '" class="' +
                                                                acabados[j]['id'] +
                                                                '" height="160px" width="280px" style=" opacity: 0.7;">'
                                                        );
                                                        $('#myModalColores' + contador1 + ' .modal-body #acabadoImagen' + contAca).append(
                                                            '<strong><p style="color:white;position: absolute;margin-top: -105px;font-size: 30px;margin-left: 80px;">' +
                                                                acabados[j]['nombre'] +
                                                                '</strong></p>'
                                                        );
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    $('#comboAca' + contador1 + '' + id).removeAttr('style');
                                    $('#comboAca' + contador1 + '' + id).attr('style');
                                    $('#comboAca' + contador1 + '' + id).css({ float: 'right' });
                                    $('#comboAca' + contador1 + '' + id).css({ 'margin-bottom': '50px' });
                                    if (value['dimensionesProductoTipo']['id'] == value1['id']) {
                                        $('#aca' + id + '' + contador).css({ 'background-color': '#DFDDDC' });
                                    }
                                    contador1++;
                                }
                            }
                        });
                    }
                });
            });
    }
    public cambiarDimension(id, id1) {
        var mensaje = $('#dimen' + id + '' + id1 + ' #mensajeDimen' + id1).text();
        $('.dimensionBlanca' + id).css({ 'background-color': 'white' });
        $('#dimen' + id + '' + id1).css({ 'background-color': '#DFDDDC' });
        var todasDimensiones = this.todasDimensiones;

        $.each(todasDimensiones, function(index, value) {
            if (value['mensaje'] == mensaje) {
                $('#ancho' + id).text(value['ancho']);
                $('#ancho' + id).attr('class', value['id']);
                $('#alto' + id).text(value['alto']);
                $('#fondo' + id).text(value['fondo']);
            }
        });
    }
    public cambiarAcabado(idImagen, id, id1) {
        var idAca = $('#myModalColores' + id1 + ' #acabadoImagen' + idImagen + ' #imagenAcabado' + idImagen).attr('class');
        var todosAcabados = this.acabados;
        $('#myModalColores' + id1).modal('toggle');
        $.each(todosAcabados, function(index, value) {
            if (value['id'] == idAca) {
                $('#imagenAcabado1' + id1 + ' #imagenAcabadoPrincipal').remove();
                $('#imagenAcabado1' + id1).append(
                    '<img  src="data:image/gif;base64,' +
                        value['imagenFondo'] +
                        '" id="imagenAcabadoPrincipal" class="' +
                        value['id'] +
                        '" height="60px" width="200px" style=" opacity: 0.7;">'
                );
                $('#aca' + id + '' + id1 + ' #contenedorTextoAcabado #acabadoNombrePrincipal').remove();
                $('#aca' + id + '' + id1 + ' #contenedorTextoAcabado').append(
                    '<p id="acabadoNombrePrincipal" style="color:white" >' + value['nombre'] + '</p>'
                );
                $('#nombreAcabado' + id + '' + id1).text(value['nombre']);
            }
        });
    }

    public mostrarDatosAct(id) {
        $('#dimensiones' + id).removeAttr('style');
        $('#dimensiones' + id).attr('style');
        $('#dimensiones' + id).css({ width: '100%' });
        $('#dimensiones' + id).css({ float: 'left' });
        $('#apoyo' + id).removeAttr('style');
        $('#apoyo' + id).attr('style');
        $('#apoyo' + id).css({ width: '100%' });
        $('#apoyo' + id).css({ float: 'left' });
        $('#acabados' + id).removeAttr('style');
        $('#acabados' + id).attr('style');
        $('#acabados' + id).css({ width: '100%' });
        $('#acabados' + id).css({ float: 'left' });
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

    public ponerEnBlanco() {
        for (let i = 1; i <= 8; i++) {
            $('#prodMetido' + i).empty();
            $('#dimensiones' + i).attr('css');
            $('#dimensiones' + i).css({ display: 'none' });
            $('#acabados' + i).attr('css');
            $('#acabados' + i).css({ display: 'none' });
            $('#apoyo' + i).attr('css');
            $('#apoyo' + i).css({ display: 'none' });
            $('#botones' + i).css({ display: 'none' });
            for (let j = 1; j <= 5; j++) {
                $('#dimen' + i + '' + j).empty();
            }
            for (let k = 1; k <= 5; k++) {
                $('#imagenAcabado' + i + '' + k).empty();
                $('#acabadoNombrePrincipal').remove();
                $('#imagenDimensiones').remove();
                $('.cambiarAcabado').css({ display: 'none' });
            }
            for (let h = 1; h <= 5; h++) {
                $('#apo' + i + '' + h).empty();
            }
            for (let p = 0; p <= 3; p++) {
                $('#datos' + p).empty();
                $('#precios' + p).empty();
                $('#precioCalculado' + p).empty();
            }
        }
    }

    public enviarCarrito() {
        var contador = 1;
        var acabados = this.acabados;
        var todosAcabados = this.todosAcabados;
        console.log(todosAcabados[1]);
        var conta = 0;
        for (let k = 1; k < sessionStorage.length; k++) {
            if (sessionStorage['prod' + k] != null) {
                contador++;
            }
        }
        var contadorProd = contador;
        var contadorDimen = contador;
        var contAca = 0;
        for (let i = 1; i <= 3; i++) {
            const idProd = $('#nombreProd' + i).attr('class');
            const dimen = $('#ancho' + i).attr('class');
            const todasDimensiones = this.todasDimensiones;
            console.log(sessionStorage);
            const prod = [];
            const prods = this.apoyo;

            $.each(todasDimensiones, function(index, value) {
                if (value['id'] == dimen) {
                    prod[1] = value;
                    sessionStorage.setItem('prod' + contadorDimen, JSON.stringify(prod));
                    contadorDimen++;
                }
            });
        }
    }

    public generarPresupuesto() {
        var nombreTexto = [];
        var ancho = [];
        var alto = [];
        var fondo = [];
        var nombre;
        var ancho = [];
        var alto = [];
        var fondo = [];
        var productosFinal = [];
        var dimensionesFinal = [];
        var anchoTexto;
        var altoTexto;
        var fondoTexto;
        var contadorProd = 0;
        var contadorAlto = 0;
        var contadorFondo = 0;
        var contadorAncho = 0;
        var contadorDimension = 0;
        var contadorProductos = 0;
        var todasDimensiones = this.todasDimensiones;
        var productos = this.apoyo;
        for (let j = 1; j <= 10; j++) {
            nombre = $('#nombreProd' + j).text();
            anchoTexto = $('#ancho' + j).text();
            altoTexto = $('#alto' + j).text();
            fondoTexto = $('#fondo' + j).text();

            if (nombre != '') {
                nombreTexto[contadorProd] = nombre;
                contadorProd++;
            }
            if (anchoTexto != '') {
                ancho[contadorAncho] = anchoTexto;
                contadorAncho++;
            }
            if (altoTexto != '') {
                alto[contadorAlto] = altoTexto;
                contadorAlto++;
            }
            if (fondoTexto != '') {
                fondo[contadorFondo] = fondoTexto;
                contadorFondo++;
            }

            if (nombre != '' && anchoTexto != '' && altoTexto != '' && fondoTexto != '') {
                for (let k = 0; k < productos.length; k++) {
                    if (productos[k]['nombre'] == nombre) {
                        productosFinal[contadorProductos] = productos[k];
                        contadorProductos++;
                    }
                }
                for (let h = 0; h < todasDimensiones.length; h++) {
                    if (
                        todasDimensiones[h]['ancho'] == anchoTexto &&
                        todasDimensiones[h]['alto'] == altoTexto &&
                        todasDimensiones[h]['fondo'] == fondoTexto &&
                        nombre == todasDimensiones[h]['productosDormitorio']['nombre']
                    ) {
                        dimensionesFinal[contadorDimension] = todasDimensiones[h];
                        contadorDimension++;
                    }
                }
            }
        }

        this.isSaving = true;
        var usuarios = this.user;
        var usuario;
        var idUsu = this.currentAccount['id'];
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i]['id'] == idUsu) {
                usuario = usuarios[i];
            }
        }
        var d = new Date();

        var month = d.getMonth() + 1;
        var day = d.getDate();

        var output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;

        const prueba = {
            codigo: 'PR-' + usuario['id'],
            pedido: 0,
            user: usuario,
            fecha_presupuesto: output
        };

        this.presupuestoPedido = prueba;
        console.log(this.presupuestoPedido);
        this.subscribeToSaveResponse(this.presupuestoPedidoService.create(this.presupuestoPedido));
        var presupuesto = this.presupuesto;
        var id = localStorage.getItem('ultimoPresupuesto');
        var id1 = parseFloat(id);
        id1 = id1 + 1;
        localStorage.setItem('ultimoPresupuesto', JSON.stringify(id1));
        const prueba1 = {
            id: id1,
            codigo: 'PR-' + usuario['id'],
            pedido: 0,
            user: usuario,
            fecha_presupuesto: output
        };

        for (let m = 0; m < productosFinal.length; m++) {
            const prodPrePed = {
                productosDormitorio: productosFinal[m],
                presupuestoPedido: prueba1,
                dimensionesProductoTipo: dimensionesFinal[m]
            };
            this.productosPresupuestoPedidos = prodPrePed;
            this.subscribeToSaveResponse1(this.productosPresupuestoPedidosService.create(this.productosPresupuestoPedidos));
        }
    }
    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/composicion'], {
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
            '/composicion',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategoriasDormi>>) {
        result.subscribe((res: HttpResponse<ICategoriasDormi>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected subscribeToSaveResponse1(result: Observable<HttpResponse<IProductosPresupuestoPedidos>>) {
        result.subscribe(
            (res: HttpResponse<IProductosPresupuestoPedidos>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    previousState() {
        this.presupuestoPedido;
        $('#modalPresupuesto .modal-body').empty();
        $('#modalPresupuesto .modal-title').text('Presupuesto Generado');
        $('#modalPresupuesto .modal-body').append('<p style="text-align:center">Codigo</p>');
        $('#modalPresupuesto .modal-body').append('<p style="text-align:center">' + this.presupuestoPedido['codigo'] + '</p>');
        $('#modalPresupuesto #verPresupuesto').removeAttr('style');
        $('#modalPresupuesto #verPresupuesto').attr('style');
        $('#modalPresupuesto #verPresupuesto').css({ 'text-align': 'center' });
        for (let i = 1; i <= 10; i++) {
            if (sessionStorage.getItem('prod' + i) != 'undefinded') {
                sessionStorage.removeItem('prod' + i);
            }
        }
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInComposicions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IComposicion) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInComposicions() {
        this.eventSubscriber = this.eventManager.subscribe('composicionListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateComposicions(data: IComposicion[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.composicions = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
    protected onSaveError() {
        this.isSaving = false;
    }
}

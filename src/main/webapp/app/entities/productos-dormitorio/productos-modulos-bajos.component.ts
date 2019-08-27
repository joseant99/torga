import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { LoginService } from 'app/core/login/login.service';
import { DimensionesProductoService } from '../dimensiones-producto/dimensiones-producto.service';
import { AcaProdService } from '../aca-prod/aca-prod.service';
import { TiposApoyoService } from '../tipos-apoyo/tipos-apoyo.service';
import { DimensionesProductoTipoService } from '../dimensiones-producto-tipo/dimensiones-producto-tipo.service';
import { AcabadosProductosPresupuestoPedidoService } from '../acabados-productos-presupuesto-pedido/acabados-productos-presupuesto-pedido.service';
import { IAcaProd } from 'app/shared/model/aca-prod.model';
import { IAcabados } from 'app/shared/model/acabados.model';
import { PresupuestoPedidoService } from '../presupuesto-pedido/presupuesto-pedido.service';
import { IDimensionesProducto } from 'app/shared/model/dimensiones-producto.model';
import { ProductosPresupuestoPedidosService } from '../productos-presupuesto-pedidos/productos-presupuesto-pedidos.service';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { AccountService, UserService, User } from 'app/core';
import { Observable } from 'rxjs';
import { IPresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';
import { IProductosPresupuestoPedidos } from 'app/shared/model/productos-presupuesto-pedidos.model';
import { ITEMS_PER_PAGE } from 'app/shared';
import { ProductosDormitorioService } from './productos-dormitorio.service';
import { AcabadosService } from 'app/entities/acabados';
import * as $ from 'jquery';
import { ICategoriasDormi } from 'app/shared/model/categorias-dormi.model';

@Component({
    selector: 'jhi-productos-dormitorio',
    templateUrl: './productos-modulos-bajos.component.html'
})
export class ProductosModulosBajosComponent implements OnInit, OnDestroy, AfterViewInit {
    currentAccount: any;
    productosDormitorios: IProductosDormitorio[];
    dimensionesProductos: IDimensionesProducto[];
    productosDormitorioPrueba: IProductosDormitorio;
    error: any;
    success: any;
    apoyo: any;
    isSaving: boolean;
    acaProd: IAcaProd;
    acabados: any;
    todosAcabados: any;
    presupuestoPedido: IPresupuestoPedido;
    presupuesto: any;
    productosPresupuestoPedidos: IProductosPresupuestoPedidos;
    user: any;
    todasDimensiones: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    sistemasApoyo: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        protected tiposApoyoService: TiposApoyoService,
        protected dimensionesProductoTipoService: DimensionesProductoTipoService,
        protected acabadosService: AcabadosService,
        protected acabadosProductosPresupuestoPedidoService: AcabadosProductosPresupuestoPedidoService,
        protected acaProdService: AcaProdService,
        protected productosPresupuestoPedidosService: ProductosPresupuestoPedidosService,
        protected presupuestoPedidoService: PresupuestoPedidoService,
        protected userService: UserService,
        protected dimensionesProductoService: DimensionesProductoService,
        protected productosDormitorioService: ProductosDormitorioService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected dataUtils: JhiDataUtils,
        protected router: Router,
        protected eventManager: JhiEventManager,
        private loginService: LoginService,
        private http: HttpClient
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    public borrarProdCalculadora() {
        $('#productoCalculadora1 #precios1').empty();
        $('#productoCalculadora1 #precioCalculado1').empty();
        $('#productoCalculadora1 #datos1').empty();
        $('#nombreMesita').empty();
        $('#precioDimension').empty();
        $('#total').empty();
        $('.dimensionesColor1').empty();
        $('.dimensionesColor2').empty();
        $('.dimensionesColor3').empty();
        $('.dimensionesColor4').empty();
        $('.dimensionesColor5').empty();
        $('.dimensionesColor6').empty();
        $('.dimensionesColor1').css({ 'background-color': 'white' });
        $('.dimensionesColor2').css({ 'background-color': 'white' });
        $('.dimensionesColor3').css({ 'background-color': 'white' });
        $('.dimensionesColor4').css({ 'background-color': 'white' });
        $('.dimensionesColor5').css({ 'background-color': 'white' });
        $('.dimensionesColor6').css({ 'background-color': 'white' });
        $('#imagenAcabado').remove();
        $('#medidas').css({ display: 'none' });
        $('#acabado').css({ display: 'none' });
        $('.productosColor').css({ 'background-color': 'white' });
        $('#nombreApoyoTitulo').css({ display: 'none' });
        for (let i = 1; i <= 5; i++) {
            $('.apoyoCogido' + i).empty();
        }
        for (let i = 1; i <= 15; i++) {
            $('#aca1' + i).empty();
        }
    }

    public open(producto, productoNombre) {
        $('#calculadora').attr('class', 'container tab-pane fade active show');
        $('#medidas').removeAttr('style');
        $('#medidas').attr('style');
        $('#medidas').css({ 'margin-left': '40%' });
        $('#productoCalculadora1 #precios1').empty();
        $('#productoCalculadora1 #precioCalculado1').empty();
        $('#productoCalculadora1 #datos1').empty();
        $('#nombreMesita').empty();
        $('#precioDimension').empty();
        $('#total').empty();
        $('.dimensionesColor1').empty();
        $('.dimensionesColor2').empty();
        $('.dimensionesColor3').empty();
        $('.dimensionesColor4').empty();
        $('.dimensionesColor5').empty();
        $('.dimensionesColor6').empty();
        $('.dimensionesColor1').css({ 'background-color': 'white' });
        $('.dimensionesColor2').css({ 'background-color': 'white' });
        $('.dimensionesColor3').css({ 'background-color': 'white' });
        $('.dimensionesColor4').css({ 'background-color': 'white' });
        $('.dimensionesColor5').css({ 'background-color': 'white' });
        $('.dimensionesColor6').css({ 'background-color': 'white' });
        $('#imagenAcabado').remove();
        $('#medidas').css({ display: 'none' });
        $('#acabado').css({ display: 'none' });
        $('.productosColor').css({ 'background-color': 'white' });
        $('#nombreApoyoTitulo').css({ display: 'none' });
        for (let i = 1; i <= 5; i++) {
            $('.apoyoCogido' + i).empty();
        }
        for (let i = 1; i <= 15; i++) {
            $('#aca1' + i).empty();
        }

        var cont = 0;
        var datos = [];
        this.dimensionesProductoTipoService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                datos = data['body'];
                $.each(datos, function(index, value) {
                    if (producto == value['productosDormitorio']['id']) {
                        if (cont == 0) {
                            var image = document.createElement('img');
                            image.src = 'data:image/gif;base64,' + value['imagen'];
                            image.id = 'imagenDimensiones';
                            $('.dimensionesColor1').append(
                                '<p id="' +
                                    value['id'] +
                                    '" class="dimensionesId1">' +
                                    value['mensaje'] +
                                    '</p><hr style="width:100%;color:black"></hr><p style="float:right"><strong>Desde ' +
                                    value['precio'] +
                                    '</strong>&euro;</p>'
                            );
                            $('.dimensionesColor1').append(
                                '<img  src="data:image/gif;base64,' +
                                    value['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    value['id'] +
                                    '" width="300px" style=" opacity: 0.7;">'
                            );
                        }
                        if (cont == 1) {
                            var image = document.createElement('img');
                            image.src = 'data:image/gif;base64,' + value['imagen'];
                            image.id = 'imagenDimensiones';
                            $('.dimensionesColor2').append(
                                '<p id="' + value['id'] + '" class="dimensionesId2">' + value['mensaje'] + '</p>'
                            );
                            $('.dimensionesColor2').append(
                                '<p id="' +
                                    value['id'] +
                                    '" class="dimensionesId1">' +
                                    value['mensaje'] +
                                    '</p><hr style="width:100%;color:black"></hr><p style="float:right"><strong>Desde ' +
                                    value['precio'] +
                                    '</strong>&euro;</p>'
                            );
                            $('.dimensionesColor2').append(
                                '<img  src="data:image/gif;base64,' +
                                    value['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    value +
                                    '" width="300px"  style=" opacity: 0.7;">'
                            );
                        }
                        if (cont == 2) {
                            var image = document.createElement('img');
                            image.src = 'data:image/gif;base64,' + value['imagen'];
                            image.id = 'imagenDimensiones';
                            $('.dimensionesColor3').append(
                                '<p id="' +
                                    value['id'] +
                                    '" class="dimensionesId3">' +
                                    value['mensaje'] +
                                    '</p><hr style="width:100%;color:black"></hr><p style="float:right"><strong>Desde ' +
                                    value['precio'] +
                                    '</strong>&euro;</p>'
                            );
                            $('.dimensionesColor3').append(
                                '<img  src="data:image/gif;base64,' +
                                    value['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    value +
                                    '" width="300px"  style=" opacity: 0.7;">'
                            );
                        }
                        if (cont == 3) {
                            var image = document.createElement('img');
                            image.src = 'data:image/gif;base64,' + value['imagen'];
                            image.id = 'imagenDimensiones';
                            $('.dimensionesColor4').append(
                                '<p id="' +
                                    value['id'] +
                                    '" class="dimensionesId4">' +
                                    value['mensaje'] +
                                    '</p><hr style="width:100%;color:black"></hr><p style="float:right"><strong>Desde ' +
                                    value['precio'] +
                                    '</strong>&euro;</p>'
                            );
                            $('.dimensionesColor4').append(
                                '<img  src="data:image/gif;base64,' +
                                    value['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    value +
                                    '" width="300px"  style=" opacity: 0.7;">'
                            );
                        }
                        if (cont == 4) {
                            var image = document.createElement('img');
                            image.src = 'data:image/gif;base64,' + value['imagen'];
                            image.id = 'imagenDimensiones';
                            $('.dimensionesColor5').append(
                                '<p id="' +
                                    value['id'] +
                                    '" class="dimensionesId5">' +
                                    value['mensaje'] +
                                    '</p><hr style="width:100%;color:black"></hr><p style="float:right"><strong>Desde ' +
                                    value['precio'] +
                                    '</strong>&euro;</p>'
                            );
                            $('.dimensionesColor5').append(
                                '<img  src="data:image/gif;base64,' +
                                    value['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    value +
                                    '" width="300px"  style=" opacity: 0.7;">'
                            );
                        }
                        if (cont == 5) {
                            var image = document.createElement('img');
                            image.src = 'data:image/gif;base64,' + value['imagen'];
                            image.id = 'imagenDimensiones';
                            $('.dimensionesColor6').append(
                                '<p id="' +
                                    value['id'] +
                                    '" class="dimensionesId6">' +
                                    value['mensaje'] +
                                    '</p><hr style="width:100%;color:black"></hr><p style="float:right"><strong>Desde ' +
                                    value['precio'] +
                                    '</strong>&euro;</p>'
                            );
                            $('.dimensionesColor6').append(
                                '<img  src="data:image/gif;base64,' +
                                    value['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    value +
                                    '" width="300px"  style=" opacity: 0.7;">'
                            );
                        }
                        cont++;
                    }
                });
            });
        $('.productosColor').css({ 'background-color': 'white' });
        $('#' + producto).css({ 'background-color': '#DFDDDC' });
        $('#nombreMesita').text(productoNombre);
        $('#nombreMesita').attr('class', producto);
        $('#terminarConfiguracion').css({ display: 'none' });
        $('#nombreApoyo').css({ display: 'none' });
        $('.apoyoCogido1').empty();
        $('.apoyoCogido2').empty();
        $('.apoyoCogido3').empty();
        $('.apoyoCogido4').empty();
        $('#acaba4').empty();
        $('#acaba3').empty();
        $('#acabado').css({ display: 'none' });
        $('#acaba1').empty();
        $('#acaba2').empty();
        $('#imagenAcabado').remove();
        $('#datos').empty();
        $('#precios').empty();
        $('#precioCalculado').empty();
        $('#total').text('0');
    }

    public open1(id) {
        $('#calculadora').attr('class', 'container tab-pane fade active show');
        var altura = $('.selectectAltura').text();
        var ancho = $('.selectectAncho').text();
        var producto = $('#nombreMesita' + id).attr('class');
        var productoNombre = $('#nombreMesita' + id).text();
        $('#medidas').removeAttr('style');
        $('#medidas').attr('style');
        $('#medidas').css({ 'margin-left': '40%' });

        $('#productoCalculadora1 #precios1').empty();
        $('#productoCalculadora1 #precioCalculado1').empty();
        $('#productoCalculadora1 #datos1').empty();
        $('#nombreMesita').empty();
        $('#precioDimension').empty();
        $('#total').empty();
        $('.dimensionesColor1').empty();
        $('.dimensionesColor2').empty();
        $('.dimensionesColor3').empty();
        $('.dimensionesColor4').empty();
        $('.dimensionesColor5').empty();
        $('.dimensionesColor6').empty();
        $('.dimensionesColor1').css({ 'background-color': 'white' });
        $('.dimensionesColor2').css({ 'background-color': 'white' });
        $('.dimensionesColor3').css({ 'background-color': 'white' });
        $('.dimensionesColor4').css({ 'background-color': 'white' });
        $('.dimensionesColor5').css({ 'background-color': 'white' });
        $('.dimensionesColor6').css({ 'background-color': 'white' });
        $('#imagenAcabado').remove();
        $('#medidas').css({ display: 'none' });
        $('#acabado').css({ display: 'none' });
        $('.productosColor').css({ 'background-color': 'white' });
        $('#nombreApoyoTitulo').css({ display: 'none' });
        for (let i = 1; i <= 5; i++) {
            $('.apoyoCogido' + i).empty();
        }
        for (let i = 1; i <= 15; i++) {
            $('#aca1' + i).empty();
        }

        var cont = 0;
        var datos = [];
        this.dimensionesProductoTipoService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                datos = data['body'];
                $.each(datos, function(index, value) {
                    if (ancho != 'Indiferente') {
                        if (producto == value['productosDormitorio']['id'] && ancho == value['ancho']) {
                            if (cont == 0) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenDimensiones';
                                $('.dimensionesColor1').append(
                                    '<p id="' +
                                        value['id'] +
                                        '">' +
                                        value['mensaje'] +
                                        '</p><hr style="width:100%;color:black"></hr><p style="float:right"><strong>Desde ' +
                                        value['precio'] +
                                        '</strong>&euro;</p>'
                                );
                                $('.dimensionesColor1').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="imagenDimensiones" class="' +
                                        value['id'] +
                                        '" width="300px" style=" opacity: 0.7;">'
                                );
                            }
                            if (cont == 1) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenDimensiones';
                                $('.dimensionesColor2').append(
                                    '<p id="' +
                                        value['id'] +
                                        '">' +
                                        value['mensaje'] +
                                        '</p><hr style="width:100%;color:black"></hr><p style="float:right"><strong>Desde ' +
                                        value['precio'] +
                                        '</strong>&euro;</p>'
                                );
                                $('.dimensionesColor2').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="imagenDimensiones" class="' +
                                        value +
                                        '" width="300px"  style=" opacity: 0.7;">'
                                );
                            }
                            if (cont == 2) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenDimensiones';
                                $('.dimensionesColor3').append(
                                    '<p id="' +
                                        value['id'] +
                                        '">' +
                                        value['mensaje'] +
                                        '</p><hr style="width:100%;color:black"></hr><p style="float:right"><strong>Desde ' +
                                        value['precio'] +
                                        '</strong>&euro;</p>'
                                );
                                $('.dimensionesColor3').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="imagenDimensiones" class="' +
                                        value +
                                        '" width="300px"  style=" opacity: 0.7;">'
                                );
                            }
                            if (cont == 3) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenDimensiones';
                                $('.dimensionesColor4').append(
                                    '<p id="' +
                                        value['id'] +
                                        '">' +
                                        value['mensaje'] +
                                        '</p><hr style="width:100%;color:black"></hr><p style="float:right"><strong>Desde ' +
                                        value['precio'] +
                                        '</strong>&euro;</p>'
                                );
                                $('.dimensionesColor4').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="imagenDimensiones" class="' +
                                        value +
                                        '" width="300px"  style=" opacity: 0.7;">'
                                );
                            }

                            if (cont == 4) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenDimensiones';
                                $('.dimensionesColor5').append(
                                    '<p id="' +
                                        value['id'] +
                                        '">' +
                                        value['mensaje'] +
                                        '</p><hr style="width:100%;color:black"></hr><p style="float:right"><strong>Desde ' +
                                        value['precio'] +
                                        '</strong>&euro;</p>'
                                );
                                $('.dimensionesColor5').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="imagenDimensiones" class="' +
                                        value +
                                        '" width="300px"  style=" opacity: 0.7;">'
                                );
                            }
                            cont++;
                        }
                    }
                });
            });
        $('.productoColor').css({ 'background-color': 'white' });
        $('#prod' + id).css({ 'background-color': '#DFDDDC' });
        $('#nombreMesita').text(productoNombre);
        $('#nombreMesita').attr('class', producto);
        $('#terminarConfiguracion').css({ display: 'none' });
        $('#nombreApoyo').css({ display: 'none' });
        $('.apoyoCogido1').empty();
        $('.apoyoCogido2').empty();
        $('.apoyoCogido3').empty();
        $('.apoyoCogido4').empty();
        $('#acaba4').empty();
        $('#acaba3').empty();
        $('#acabado').css({ display: 'none' });
        $('#acaba1').empty();
        $('#acaba2').empty();
        $('#imagenAcabado').remove();
        $('#datos').empty();
        $('#precios').empty();
        $('#precioCalculado').empty();
        $('#total').text('0');
        $('.dimensionesColor1').css({ 'background-color': 'white' });
        $('.dimensionesColor2').css({ 'background-color': 'white' });
        $('.dimensionesColor3').css({ 'background-color': 'white' });
        $('.dimensionesColor4').css({ 'background-color': 'white' });
    }

    public filtroAncho(id, filtro) {
        if (filtro == 'ancho') {
            var altura = $('.selectectAltura').text();
            $('.productoColor').empty();

            if (altura == 'Indiferente') {
                $('#ancho0').removeAttr('class');
                $('#ancho1').removeAttr('class');
                $('#ancho2').removeAttr('class');
                $('#ancho3').removeAttr('class');
                $('#ancho4').removeAttr('class');
                $('#ancho' + id).attr('class', 'selectectAncho');
                var anchoFiltrado = $('#ancho' + id).text();
                this.dimensionesProductoTipoService
                    .query({
                        page: this.page - 1,
                        size: this.itemsPerPage,
                        sort: this.sort()
                    })
                    .subscribe(data => {
                        var contador = 1;
                        $.each(data['body'], function(index, value) {
                            if (value['productosDormitorio']['categoriasDormi']['id'] == 8) {
                                if (parseFloat(anchoFiltrado) == value['ancho']) {
                                    $('#ProductosCargados').empty();
                                    var imagen = value['productosDormitorio']['imagen'];
                                    $('#prod' + contador).append(
                                        '<p id="nombreMesita' +
                                            contador +
                                            '" class="' +
                                            value['productosDormitorio']['id'] +
                                            '" style="text-align:center">' +
                                            value['productosDormitorio']['nombre'] +
                                            '</p><hr style="width:100%;color:black"></hr><p style="float:right"><strong>Desde ' +
                                            value['precio'] +
                                            '</strong>&euro;</p>'
                                    );
                                    $('#prod' + contador).append(
                                        '<img id="imagenProd" src="data:image/gif;base64,' +
                                            imagen +
                                            '" id="imagenProd" width="250px" height="250px"  style=" opacity: 0.7">'
                                    );
                                    $('#prod' + contador).css({ 'margin-left': '50px' });
                                    contador++;
                                }
                            }
                        });
                    });
            } else {
                if (altura != 'Indiferente') {
                    $('#ancho' + id).attr('class', 'selectectAncho');
                    $('#ancho0').removeAttr('class');
                    var anchoFiltrado = $('#ancho' + id).text();
                    this.dimensionesProductoTipoService
                        .query({
                            page: this.page - 1,
                            size: this.itemsPerPage,
                            sort: this.sort()
                        })
                        .subscribe(data => {
                            var contador = 1;
                            $.each(data['body'], function(index, value) {
                                if (value['productosDormitorio']['categoriasDormi']['id'] == 8) {
                                    if (parseFloat(anchoFiltrado) == value['ancho'] && parseFloat(altura) == value['alto']) {
                                        $('#ProductosCargados').empty();
                                        var imagen = value['productosDormitorio']['imagen'];
                                        $('#prod' + contador).append(
                                            '<p id="nombreMesita' +
                                                contador +
                                                '" class="' +
                                                value['productosDormitorio']['id'] +
                                                '" style="text-align:center">' +
                                                value['productosDormitorio']['nombre'] +
                                                '</p><hr style="width:100%;color:black"></hr>'
                                        );
                                        $('#prod' + contador).append(
                                            '<img id="imagenProd" src="data:image/gif;base64,' +
                                                imagen +
                                                '" id="imagenProd" width="250px" height="250px"  style=" opacity: 0.7">'
                                        );
                                        $('#prod' + contador).css({ 'margin-left': '50px' });
                                        contador++;
                                    }
                                }
                            });
                        });
                }
            }
        }
        if (filtro == 'altura') {
            $('#altura' + id).attr('class', 'selectectAltura');
            var altura = $('.selectectAltura').text();
            $('#altura0').removeAttr('class');
            var alturaFiltrado = $('#altura' + id).text();
            this.dimensionesProductoTipoService
                .query({
                    page: this.page - 1,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(data => {
                    var contador = 1;
                    $.each(data['body'], function(index, value) {
                        if (value['productosDormitorio']['categoriasDormi']['id'] == 8) {
                            if (parseFloat(alturaFiltrado) == value['alto']) {
                                $('#ProductosCargados').empty();
                                var imagen = value['productosDormitorio']['imagen'];
                                $('#prod' + contador).append(
                                    '<p id="nombreMesita' +
                                        contador +
                                        '" class="' +
                                        value['productosDormitorio']['id'] +
                                        '" style="text-align:center">' +
                                        value['productosDormitorio']['nombre'] +
                                        '-' +
                                        value['alto'] +
                                        '</p><hr style="width:100%;color:black"></hr>'
                                );
                                $('#prod' + contador).append(
                                    '<img id="imagenProd" src="data:image/gif;base64,' +
                                        imagen +
                                        '" id="imagenProd" width="250px" height="250px"  style=" opacity: 0.7">'
                                );
                                $('#prod' + contador).css({ 'margin-left': '50px' });
                                contador++;
                            }
                        }
                    });
                });
        }
    }

    public dimensionesCogidas(id) {
        for (let i = 1; i <= 15; i++) {
            $('#aca1' + i).empty();
        }
        $('#terminarConfiguracion').css({ display: 'none' });
        $('#nombreApoyo').css({ display: 'none' });
        $('.apoyoCogido1').empty();
        $('.apoyoCogido2').empty();
        $('.apoyoCogido3').empty();
        $('.apoyoCogido4').empty();
        $('#acaba4').empty();
        $('#acaba3').empty();
        $('#acabado').removeAttr('style');
        $('#acabado').attr('style');
        $('#acabado').css({ 'margin-left': '40%' });
        $('#acaba1').empty();
        $('#acaba2').empty();
        $('#datos1').empty();
        $('#precios1').empty();
        $('#precioCalculado1').empty();
        $('.dimensionesColor1').css({ 'background-color': 'white' });
        $('.dimensionesColor2').css({ 'background-color': 'white' });
        $('.dimensionesColor3').css({ 'background-color': 'white' });
        $('.dimensionesColor4').css({ 'background-color': 'white' });
        $('.dimensionesColor' + id).css({ 'background-color': '#DFDDDC' });
        $('#imagenAcabado').remove();
        idProd = $('#nombreMesita').attr('class');
        var idDimenTipo = $('.dimensionesId' + id).attr('id');
        $('#total').text('0');
        var hola = $('.dimensionesColor' + id + ' #imagenDimensiones').attr('class');
        var datos = [];
        var acabados = [];
        var imagen;
        var idProd;
        this.dimensionesProductoTipoService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                datos = data['body'];
                $.each(datos, function(index, value) {
                    if (value['id'] == idDimenTipo) {
                        $('#datos1').append('<p>Ancho</p>');
                        $('#datos1').append('<p>Alto</p>');
                        $('#datos1').append('<p>Fondo</p>');
                        var total = $('#total').text();
                        var totalfloat = parseFloat(total);
                        totalfloat = totalfloat + value['precio'];
                        $('#total').text(totalfloat);
                        $('#precioDimension').text(totalfloat);
                        $('#precios1').append('<p class="' + value['id'] + '" id="ancho1">' + value['ancho'] + '</p>');
                        $('#idioma').attr('value', value['id']);
                        $('#precios1').append('<p>' + value['alto'] + '</p>');
                        $('#precios1').append('<p>' + value['fondo'] + '</p>');
                        $('#precioCalculado1').append('<p>-</p>');
                        $('#precioCalculado1').append('<p>-</p>');
                        $('#precioCalculado1').append('<p>-</p>');
                    }
                });
            });

        this.acabadosService.query().subscribe((res: HttpResponse<IAcabados[]>) => {
            $.each(res['body'], function(index, value) {
                acabados[index] = value;
            });
        });
        this.acaProdService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                datos = data['body'];

                var contador = 1;
                var contnuevo = 1;
                var u = 1;
                var i = 0;
                $.each(datos, function(index, value) {
                    if (value['productosDormitorio']['id'] == idProd) {
                        imagen = value['productosDormitorio']['imagen'];
                        if (contador == 1) {
                            $('#acabados').append(
                                '<img id="imagenAcabado" src="data:image/gif;base64,' +
                                    imagen +
                                    '" id="imagenDimensiones" width="400px" height="400px"  style=" opacity: 0.7;margin-left:150px">'
                            );
                        }

                        contador++;
                        var idAca = value['id'];

                        $.each(acabados, function(index1, value1) {
                            if (idAca == 23) {
                                if (value1['id'] == 1 || value1['id'] == 2) {
                                    $('#myModalColores' + u + ' .modal-body #acabadoImagen' + i).append(
                                        '<img  src="data:image/gif;base64,' +
                                            value1['imagenFondo'] +
                                            '" id="imagenAcabado' +
                                            i +
                                            '" class="' +
                                            value1['id'] +
                                            '" height="160px" width="280px" style=" opacity: 0.7;">'
                                    );
                                    $('#myModalColores' + u + ' .modal-body #acabadoImagen' + i).append(
                                        '<strong><p style="color:white;position: absolute;margin-top: -105px;font-size: 30px;margin-left: 80px;">' +
                                            value1['nombre'] +
                                            '</strong></p>'
                                    );

                                    i++;
                                    $('.cambiarAca' + u).attr('style');
                                    $('.cambiarAca' + u).css({ 'margin-bottom': '35px' });
                                    $('.cambiarAca' + u).css({ 'margin-top': '15px' });
                                    $('.cambiarAca' + u).text('Cambiar Acabado');
                                }
                            } else {
                                if (value1['id'] != 1 && value1['id'] != 2 && value1['id'] != 15 && value1['id'] != 16) {
                                    $('#myModalColores' + u + ' .modal-body #acabadoImagen' + i).append(
                                        '<img  src="data:image/gif;base64,' +
                                            value1['imagenFondo'] +
                                            '" id="imagenAcabado' +
                                            i +
                                            '" class="' +
                                            value1['id'] +
                                            '" height="160px" width="280px" style=" opacity: 0.7;">'
                                    );
                                    $('#myModalColores' + u + ' .modal-body #acabadoImagen' + i).append(
                                        '<strong><p style="color:white;position: absolute;margin-top: -105px;font-size: 30px;margin-left: 80px;">' +
                                            value1['nombre'] +
                                            '</strong></p>'
                                    );

                                    i++;
                                    $('.cambiarAca' + u).attr('style');
                                    $('.cambiarAca' + u).css({ 'margin-bottom': '35px' });
                                    $('.cambiarAca' + u).css({ 'margin-top': '15px' });
                                    $('.cambiarAca' + u).text('Cambiar Acabado');
                                }
                            }
                        });
                        $('#aca1' + u).append(
                            '<button class="cambiarAcabado" style="float:left;margin-bottom:35px;margin-top:15px" class="cambiarAca1" id="color" data-toggle="modal" data-target="#myModalColores' +
                                u +
                                '">Acabado ' +
                                u +
                                '</button>'
                        );
                        $('#aca1' + u).append(
                            '<img id="imagenAcabadoPrincipal1" src"../../../content/images/blanco.jpg" height="60px" border="0" width="200px" style=" opacity: 0.7;margin-left:20px;"/>'
                        );
                        u++;
                        i = 0;
                        contnuevo++;
                    }
                });
            });
    }
    public cambiarAcabado(idImagen, id, id1) {
        var k = 1;
        var idAca = $('#myModalColores' + id1 + ' #acabadoImagen' + idImagen + ' #imagenAcabado' + idImagen).attr('class');
        var todosAcabados = this.acabados;
        $.each(todosAcabados, function(index, value) {
            if (value['id'] == idAca) {
                $('#aca1' + id1 + ' #imagenAcabadoPrincipal' + k).remove();
                $('#aca1' + id1).append(
                    '<img  src="data:image/gif;base64,' +
                        value['imagenFondo'] +
                        '" id="imagenAcabadoPrincipal' +
                        k +
                        '" class="' +
                        value['id'] +
                        '" height="60px" width="200px" style=" opacity: 0.7;margin-left:20px">'
                );
                $('#aca' + id + '' + id1 + ' #acabadoNombrePrincipal').remove();
                $('#aca' + id + '' + id1).append(
                    '<p id="acabadoNombrePrincipal" style="color:black;margin-left: 180px;margin-top: -42px;position:absolute" >' +
                        value['nombre'] +
                        '</p>'
                );
                $('#datos1').append('<p id="val' + id1 + '">Acabado ' + id1 + '</p>');
                $('#precios1').append('<p id="val' + id1 + 'Dato" class="' + value['id'] + '">' + value['nombre'] + '</p>');
                $('#precioCalculado1').append('<p id="valor' + id1 + '">' + value['precio'] + '</p>');
                k++;
            }
        });
        var valoresAca = [];
        var cont = 1;
        var contadorApoyo = 0;
        for (let i = 1; i <= 14; i++) {
            var valNuevo = $('#val' + i + 'Dato').attr('class');
            if (valNuevo != '' && valNuevo != undefined) {
                valoresAca[cont] = valNuevo;
                cont++;
            }
        }
        for (let m = 1; m <= 14; m++) {
            if ($('#aca1' + m).html()) {
                contadorApoyo++;
            }
        }
        var datos = [];
        $('.apoyoCogido1').empty();
        $('.apoyoCogido2').empty();
        $('.apoyoCogido3').empty();
        $('.apoyoCogido4').empty();
        $('.apoyoCogido5').empty();
        $('#apoyoRaya').remove();
        $('#apoyo1').remove();
        $('#nombreApoyo').remove();
        for (let j = 1; j <= 5; j++) {
            $('.apoyoCogido' + j).css({ 'background-color': 'white' });
        }

        if (contadorApoyo == cont - 1) {
            $('#nombreApoyoTitulo').removeAttr('style');
            $('#nombreApoyoTitulo').attr('style');
            $('#nombreApoyoTitulo').css({ 'margin-left': '40%' });
            this.productosDormitorioService
                .query({
                    page: this.page - 1,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(data => {
                    datos = data['body'];
                    var contador = 1;
                    $.each(datos, function(index, value) {
                        if (value['categoriasDormiId'] == 2) {
                            if (contador == 1) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenApoyo';
                                $('.apoyoCogido1').append('<p>' + value['nombre'] + '</p><hr style="width:100%;color:black"></hr>');
                                $('.apoyoCogido1').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="imagenApoyo" class="' +
                                        value['id'] +
                                        '" width="350px"  style=" opacity: 0.7;">'
                                );
                            }
                            if (contador == 2) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenApoyo';
                                $('.apoyoCogido2').append('<p>' + value['nombre'] + '</p><hr style="width:100%;color:black"></hr>');
                                $('.apoyoCogido2').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="imagenApoyo" class="' +
                                        value['id'] +
                                        '" width="350px"  style=" opacity: 0.7;">'
                                );
                            }
                            if (contador == 3) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenApoyo';
                                $('.apoyoCogido3').append('<p>' + value['nombre'] + '</p><hr style="width:100%;color:black"></hr>');
                                $('.apoyoCogido3').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="imagenApoyo" class="' +
                                        value['id'] +
                                        '" width="350px"  style=" opacity: 0.7;">'
                                );
                            }
                            if (contador == 4) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenApoyo';
                                $('.apoyoCogido4').append('<p>' + value['nombre'] + '</p><hr style="width:100%;color:black"></hr>');
                                $('.apoyoCogido4').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="imagenApoyo" class="' +
                                        value['id'] +
                                        '" width="350px"  style=" opacity: 0.7;">'
                                );
                            }
                            if (contador == 5) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenApoyo';
                                $('.apoyoCogido5').append('<p>' + value['nombre'] + '</p><hr style="width:100%;color:black"></hr>');
                                $('.apoyoCogido5').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="imagenApoyo" class="' +
                                        value['id'] +
                                        '" width="350px"  style=" opacity: 0.7;">'
                                );
                            }
                            contador++;
                        }
                    });
                });
        }
    }

    public anadirCalculadora() {
        var valoresAca = [];
        var cont = 1;
        var contadorApoyo = 0;
        for (let i = 1; i <= 14; i++) {
            var valNuevo = $('.hola' + i).val();
            if (valNuevo != '' && valNuevo != undefined) {
                valoresAca[cont] = valNuevo;
                cont++;
            }
        }
        for (let m = 1; m <= 14; m++) {
            if ($('#acaba' + m).html()) {
                contadorApoyo++;
            }
        }
        var datos = [];
        $('.apoyoCogido1').empty();
        $('.apoyoCogido2').empty();
        $('.apoyoCogido3').empty();
        $('.apoyoCogido4').empty();
        $('.apoyoCogido5').empty();
        $('#apoyoRaya').remove();
        $('#apoyo1').remove();
        $('#nombreApoyo').remove();
        for (let j = 1; j <= 5; j++) {
            $('.apoyoCogido' + j).css({ 'background-color': 'white' });
        }
        for (let k = 1; k < valoresAca.length; k++) {
            $('#val' + k).remove();
            $('#valor' + k).remove();
            $('#val' + k + 'Dato').remove();

            if (valoresAca[k] != '') {
                this.acabadosService.query().subscribe((res: HttpResponse<IAcabados[]>) => {
                    $.each(res['body'], function(index, value) {
                        if (valoresAca[k] == value['id']) {
                            $('#datos1').append('<p id="val' + k + '">Acabado ' + k + '</p>');
                            $('#precios1').append('<p id="val' + k + 'Dato" class="' + value['id'] + '">' + value['nombre'] + '</p>');
                            $('#precioCalculado1').append('<p id="valor' + k + '">' + value['precio'] + '</p>');
                        }
                    });
                });
            }
        }

        if (contadorApoyo == k - 1) {
            $('#nombreApoyo').removeAttr('style');
            $('#nombreApoyo').attr('style');
            $('#nombreApoyo').css({ 'margin-left': '40%' });
            this.productosDormitorioService
                .query({
                    page: this.page - 1,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(data => {
                    datos = data['body'];
                    var contador = 1;
                    $.each(datos, function(index, value) {
                        if (value['categoriasDormiId'] == 2) {
                            if (contador == 1) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenApoyo';
                                $('.apoyoCogido1').append('<p>' + value['nombre'] + '</p><hr style="width:100%;color:black"></hr>');
                                $('.apoyoCogido1').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="imagenApoyo" class="' +
                                        value['id'] +
                                        '" width="350px"  style=" opacity: 0.7;">'
                                );
                            }
                            if (contador == 2) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenApoyo';
                                $('.apoyoCogido2').append('<p>' + value['nombre'] + '</p><hr style="width:100%;color:black"></hr>');
                                $('.apoyoCogido2').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="imagenApoyo" class="' +
                                        value['id'] +
                                        '" width="350px"  style=" opacity: 0.7;">'
                                );
                            }
                            if (contador == 3) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenApoyo';
                                $('.apoyoCogido3').append('<p>' + value['nombre'] + '</p><hr style="width:100%;color:black"></hr>');
                                $('.apoyoCogido3').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="imagenApoyo" class="' +
                                        value['id'] +
                                        '" width="350px"  style=" opacity: 0.7;">'
                                );
                            }
                            if (contador == 4) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenApoyo';
                                $('.apoyoCogido4').append('<p>' + value['nombre'] + '</p><hr style="width:100%;color:black"></hr>');
                                $('.apoyoCogido4').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="imagenApoyo" class="' +
                                        value['id'] +
                                        '" width="350px"  style=" opacity: 0.7;">'
                                );
                            }
                            if (contador == 5) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenApoyo';
                                $('.apoyoCogido5').append('<p>' + value['nombre'] + '</p><hr style="width:100%;color:black"></hr>');
                                $('.apoyoCogido5').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="imagenApoyo" class="' +
                                        value['id'] +
                                        '" width="350px"  style=" opacity: 0.7;">'
                                );
                            }
                            contador++;
                        }
                    });
                });
        }
    }

    public apoyoCogido(id) {
        $('.apoyoCogido1').css({ 'background-color': 'white' });
        $('.apoyoCogido5').css({ 'background-color': 'white' });
        $('.apoyoCogido2').css({ 'background-color': 'white' });
        $('.apoyoCogido3').css({ 'background-color': 'white' });
        $('.apoyoCogido4').css({ 'background-color': 'white' });
        $('.apoyoCogido' + id).css({ 'background-color': '#DFDDDC' });
        var idApoyo = $('.apoyoCogido' + id + ' #imagenApoyo').attr('class');
        var idProd = $('#nombreMesita').attr('class');
        const h = $('#ancho1').text();
        var dimension = [];
        var datos = [];
        var datosApoyo;
        this.tiposApoyoService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                datos = data['body'];
                $.each(datos, function(index, value) {
                    if (idApoyo == value['productoApoyo']['id'] && value['ancho'] == h) {
                        $('#datos1').append('<p id="nombreApoyo">' + value['productoApoyo']['nombre'] + '</p>');
                        $('#precios1').append('<p id="apoyoRaya">-</p>');
                        $('#precioCalculado1').append('<p id="apoyo1" class="' + value['id'] + '">' + value['precio'] + '&euro;</p>');
                        var total = $('#total').text();
                        var totalfloat = parseFloat(total);
                        totalfloat = totalfloat + value['precio'];
                        $('#total').text(totalfloat);
                    }
                });
            });
        $('#botonCalculadora').attr('disabled', false);
        $('#terminarConfiguracion').removeAttr('style');
        $('#terminarConfiguracion').attr('style');
        $('#terminarConfiguracion').css({ float: 'left' });
        $('#terminarConfiguracion').css({ width: '100%' });
    }

    public borrarCarritoProd(id) {
        var Borrar = $('#productoCarrito' + id).attr('class');
        sessionStorage.removeItem(Borrar);
        $('#productoCarrito' + id).remove();
    }

    public enviarCarrito() {
        var contador = 1;
        var acabados = this.acabados;
        var todosAcabados = this.todosAcabados;
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
            const dimen = $('#productoCalculadora1 #precios1 #ancho' + i).attr('class');
            const idApoyo = $('#productoCalculadora1 #precioCalculado1 #apoyo' + i).attr('class');
            const todasDimensiones = this.todasDimensiones;
            console.log(sessionStorage);
            const prod = [];
            const prods = this.apoyo;
            const apoyoBueno = [];
            const sistemasApoyo = this.sistemasApoyo;
            for (let k = 0; k < sistemasApoyo.length; k++) {
                if (sistemasApoyo[k]['id'] == idApoyo) {
                    apoyoBueno[1] = sistemasApoyo[k];
                }
            }
            const aca = [];
            var acabadoCogido;
            for (let j = 1; j <= 100; j++) {
                acabadoCogido = $('#productoCalculadora1 #precios1 #val' + j + 'Dato').attr('class');
                if (acabadoCogido != undefined) {
                    var id1 = parseFloat(acabadoCogido);
                    for (let k = 0; k < 16; k++) {
                        if (acabados[k]['id'] == id1) {
                            aca[j] = acabados[k];
                        }
                    }
                }
            }

            $.each(todasDimensiones, function(index, value) {
                if (value['id'] == dimen) {
                    for (let w = 1; w < aca.length; w++) {
                        value['acabado' + w] = aca[w];
                    }
                    value['apoyo'] = apoyoBueno[1];
                    prod[1] = value;
                    sessionStorage.setItem('prod' + contadorDimen, JSON.stringify(prod));
                    contadorDimen++;
                }
            });
        }

        for (let i = 1; i <= 100; i++) {
            var sesion = JSON.parse(sessionStorage.getItem('prod' + i));
            if (sesion != null) {
                console.log(sessionStorage);
                $('#productoCarrito' + i).removeAttr('style');
                $('#productoCarrito' + i).attr('style');
                $('#productoCarrito' + i).css({ float: 'left' });
                $('#productoCarrito' + i).attr('class', 'prod' + i);
                $('#productoCarrito' + i + ' #datos' + i).append(
                    '<strong id="nombreProd' + i + '"><font>' + sesion[1]['productosDormitorio']['nombre'] + '</font></strong>'
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
                for (let j = 1; j < 100; j++) {
                    if (sesion[1]['acabado' + j] != undefined) {
                        $('#productoCarrito' + i + ' #datos' + i).append('<font>Acabado ' + j + '</font>');
                        $('#productoCarrito' + i + ' #datos' + i).append('<br>');
                        $('#productoCarrito' + i + ' #precios' + i).append(
                            '<font id="acabado' + i + '' + j + '">' + sesion[1]['acabado' + j]['nombre'] + '</font>'
                        );
                        $('#productoCarrito' + i + ' #precios' + i).append('<br>');
                        $('#productoCarrito' + i + ' #precioCalculado' + i).append('<font>-</font>');
                        $('#productoCarrito' + i + ' #precioCalculado' + i).append('<br>');
                    }
                }
                if (sesion[1]['apoyo'] != undefined) {
                    $('#productoCarrito' + i + ' #datos' + i).append('<font>' + sesion[1]['apoyo']['productoApoyo']['nombre'] + '</font>');
                    $('#productoCarrito' + i + ' #datos' + i).append('<br>');
                    $('#productoCarrito' + i + ' #precios' + i).append(
                        '<font id="sistemaApoyo' + i + '" class="' + sesion[1]['apoyo']['id'] + '">-</font>'
                    );
                    $('#productoCarrito' + i + ' #precios' + i).append('<br>');
                    $('#productoCarrito' + i + ' #precioCalculado' + i).append('<font>' + sesion[1]['apoyo']['precio'] + '&euro;</font>');
                    $('#productoCarrito' + i + ' #precioCalculado' + i).append('<br>');
                }
            }
        }
        $('#productoCalculadora1 #precios1').empty();
        $('#productoCalculadora1 #precioCalculado1').empty();
        $('#productoCalculadora1 #datos1').empty();
        $('#nombreMesita').empty();
        $('#precioDimension').empty();
        $('#total').empty();
        $('.dimensionesColor1').empty();
        $('.dimensionesColor2').empty();
        $('.dimensionesColor3').empty();
        $('.dimensionesColor4').empty();
        $('.dimensionesColor5').empty();
        $('.dimensionesColor6').empty();
        $('.dimensionesColor1').css({ 'background-color': 'white' });
        $('.dimensionesColor2').css({ 'background-color': 'white' });
        $('.dimensionesColor3').css({ 'background-color': 'white' });
        $('.dimensionesColor4').css({ 'background-color': 'white' });
        $('.dimensionesColor5').css({ 'background-color': 'white' });
        $('.dimensionesColor6').css({ 'background-color': 'white' });
        $('#imagenAcabado').remove();
        $('#medidas').css({ display: 'none' });
        $('#acabado').css({ display: 'none' });
        $('.productosColor').css({ 'background-color': 'white' });
        $('#nombreApoyoTitulo').css({ display: 'none' });
        for (let i = 1; i <= 5; i++) {
            $('.apoyoCogido' + i).empty();
        }
        for (let i = 1; i <= 15; i++) {
            $('#aca1' + i).empty();
        }
    }

    public generarPresupuesto() {
        var nombreTexto = [];
        var prodAca = [];
        var ancho = [];
        var alto = [];
        var fondo = [];
        var nombre;
        var idApoyo;
        var ancho = [];
        var alto = [];
        var fondo = [];
        var productosFinal = [];
        var dimensionesFinal = [];
        var nombreAcabado = [];
        var numeroAcaProd = [];
        var apoyosFinal = [];
        var anchoTexto;
        var altoTexto;
        var fondoTexto;
        var contadorProd = 0;
        var contadorAcabados = 0;
        var contadorAlto = 0;
        var contadorFondo = 0;
        var contadorAncho = 0;
        var contadorApoyo = 0;
        var contadorDimension = 0;
        var contadorProductos = 0;
        var todasDimensiones = this.todasDimensiones;
        var acabados = this.acabados;
        var productos = this.apoyo;
        var apoyos = this.sistemasApoyo;
        var nombreAcabado1;
        for (let j = 1; j <= 10; j++) {
            for (let k = 1; k < 100; k++) {
                nombreAcabado1 = $('#acabado' + j + '' + k).text();
                if (nombreAcabado1 != '') {
                    nombreAcabado[contadorAcabados] = nombreAcabado1;
                    numeroAcaProd[j] = contadorAcabados;
                    contadorAcabados++;
                }
            }

            idApoyo = $('#apoyo' + j).attr('class');
            for (let o = 0; o < apoyos.length; o++) {
                if (apoyos[o]['id'] == idApoyo) {
                    apoyosFinal[contadorApoyo] = apoyos[o];
                    contadorApoyo++;
                }
            }

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
        this.numeroProdPed;
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
            if (apoyosFinal[m] == undefined) {
                const prodPrePed = {
                    productosDormitorio: productosFinal[m],
                    presupuestoPedido: prueba1,
                    dimensionesProductoTipo: dimensionesFinal[m]
                };
            } else {
                const prodPrePed = {
                    productosDormitorio: productosFinal[m],
                    presupuestoPedido: prueba1,
                    dimensionesProductoTipo: dimensionesFinal[m],
                    tiposApoyo: apoyosFinal[m]
                };
            }

            prodAca[m] = prodPrePed;
            this.productosPresupuestoPedidos = prodPrePed;
            this.subscribeToSaveResponse1(this.productosPresupuestoPedidosService.create(this.productosPresupuestoPedidos));
        }
        let b = 0;
        for (let w = 1; w < numeroAcaProd.length; w++) {
            if (b != 0) {
                b = numeroAcaProd[w];
            }
            for (b; b < nombreAcabado.length; b++) {
                if (b <= numeroAcaProd[w]) {
                    for (let g = 0; g < acabados.length; g++) {
                        if (acabados[g]['nombre'] == nombreAcabado[b]) {
                            var acaPedProd = this.acaProdPed.length;
                            acaPedProd = this.acaProdPed[acaPedProd - 1];
                            prodAca[w - 1]['id'] = acaPedProd['id'] + w;
                            const acabados1 = {
                                acabados: acabados[g],
                                productosPresupuestoPedidos: prodAca[w - 1]
                            };
                            this.subscribeToSaveResponse(this.acabadosProductosPresupuestoPedidoService.create(acabados1));
                        }
                    }
                }
            }
        }
    }

    loadAll() {
        this.productosDormitorioService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IProductosDormitorio[]>) => this.paginateProductosDormitorios(res.body, res.headers),
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
        this.router.navigate(['/productos-dormitorio'], {
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
            '/productos-dormitorio',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProductosDormitorios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInProductosDormitorios() {
        this.eventSubscriber = this.eventManager.subscribe('productosDormitorioListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }
    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategoriasDormi>>) {
        result.subscribe((res: HttpResponse<ICategoriasDormi>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }
    protected onSaveError() {
        this.isSaving = false;
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
    protected subscribeToSaveResponse2(result: Observable<HttpResponse<IAcabadosProductosPresupuestoPedido>>) {
        result.subscribe(
            (res: HttpResponse<IAcabadosProductosPresupuestoPedido>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    protected paginateProductosDormitorios(data: IProductosDormitorio[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.productosDormitorios = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    ngAfterViewInit() {
        var todasDimensiones = [];
        var apoyo = [];
        var usuarios = [];
        var acabados = [];
        var sistemasApoyo = [];
        var numeroProductos = [];
        this.productosPresupuestoPedidosService
            .query({
                size: 1000
            })
            .subscribe(data => {
                $.each(data['body'], function(index, value) {
                    numeroProductos[index] = value;
                });
            });
        this.acaProdPed = numeroProductos;

        this.tiposApoyoService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                $.each(data['body'], function(index, value) {
                    sistemasApoyo[index] = value;
                });
            });
        this.sistemasApoyo = sistemasApoyo;
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

        for (let i = 1; i <= 100; i++) {
            var sesion = JSON.parse(sessionStorage.getItem('prod' + i));
            if (sesion != null) {
                console.log(sessionStorage);
                $('#productoCarrito' + i).removeAttr('style');
                $('#productoCarrito' + i).attr('style');
                $('#productoCarrito' + i).css({ float: 'left' });
                $('#productoCarrito' + i).attr('class', 'prod' + i);
                $('#productoCarrito' + i + ' #datos' + i).append(
                    '<strong id="nombreProd' + i + '"><font>' + sesion[1]['productosDormitorio']['nombre'] + '</font></strong>'
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
                var contador = 1;
                var cont = 1;
                var cont1 = 1;
                var anchos = [];
                var altura = [];
                var fondo = [];
                altura[1] = '';
                fondo[1] = '';
                var precioInicial = 0;
                var anchosRepetidos = [];
                var ListadoPrecios = [];
                anchos[1] = '';
                $.each(data['body'], function(index, value) {
                    if (value['productosDormitorio']['categoriasDormi']['id'] == 8) {
                        if (jQuery.inArray(value['ancho'], anchos) == -1) {
                            anchos[contador] = value['ancho'];
                            $('#ancho' + contador).text(anchos[contador]);
                            $('#ancho' + contador).css({ border: '1px solid black' });
                            contador++;
                        }
                        if (jQuery.inArray(value['alto'], altura) == -1) {
                            altura[cont] = value['alto'];
                            $('#altura' + cont).text(altura[cont]);
                            $('#altura' + cont).css({ border: '1px solid black' });
                            cont++;
                        }
                        if (jQuery.inArray(value['fondo'], fondo) == -1) {
                            fondo[cont1] = value['fondo'];
                            $('#fondo' + cont1).text(fondo[cont1]);
                            $('#fondo' + cont1).css({ border: '1px solid black' });
                            cont1++;
                        }
                    }
                });
            });
    }
}

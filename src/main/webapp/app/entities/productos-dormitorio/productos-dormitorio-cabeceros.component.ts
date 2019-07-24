import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { LoginService } from 'app/core/login/login.service';
import { DimensionesProductoService } from '../dimensiones-producto/dimensiones-producto.service';
import { AcaProdService } from '../aca-prod/aca-prod.service';
import { TiposApoyoService } from '../tipos-apoyo/tipos-apoyo.service';
import { TipoProductoService } from '../tipo-producto/tipo-producto.service';
import { DimensionesProductoTipoService } from '../dimensiones-producto-tipo/dimensiones-producto-tipo.service';
import { IAcabados } from 'app/shared/model/acabados.model';
import { IDimensionesProductoTipo } from 'app/shared/model/dimensiones-producto-tipo.model';
import { ITipoProducto } from 'app/shared/model/tipo-producto.model';
import { IDimensionesProducto } from 'app/shared/model/dimensiones-producto.model';
import { IAcaProd } from 'app/shared/model/aca-prod.model';

import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { ProductosDormitorioService } from './productos-dormitorio.service';
import { AcabadosService } from 'app/entities/acabados';
import * as $ from 'jquery';

@Component({
    selector: 'jhi-productos-dormitorio',
    templateUrl: './productos-dormitorio-cabeceros.component.html'
})
export class ProductosDormitorioCabecerosComponent implements OnInit, OnDestroy {
    currentAccount: any;
    productosDormitorios: IProductosDormitorio[];
    dimensionesProductos: IDimensionesProducto[];
    tipoProductos: ITipoProducto[];
    dimensionesProductoTipos: IDimensionesProductoTipo[];
    acaProds: IAcaProd[];
    error: any;
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
        protected tipoProductoService: TipoProductoService,
        protected tiposApoyoService: TiposApoyoService,
        protected acabadosService: AcabadosService,
        protected acaProdService: AcaProdService,
        protected dimensionesProductoTipoService: DimensionesProductoTipoService,
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

    public open(producto, productoNombre) {
        if (producto == 23 || producto == 24 || producto == 25 || producto == 26 || producto == 27 || producto == 28) {
            $('#tipoProducto').removeAttr('style');
            $('#tipoProducto').attr('style');
            $('#tipoProducto').css({ 'margin-left': '40%' });
            $('.tipoColor1').empty();
            $('.tipoColor2').empty();
            $('.tipoColor3').empty();
            $('.tipoColor4').empty();
            var cont = 0;
            this.tipoProductoService
                .query({
                    page: this.page - 1,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(data => {
                    $.each(data.body, function(index, value) {
                        if (value['productosDormitorio']['id'] == producto) {
                            console.log(value['id']);
                            if (cont == 0) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenDimensiones';
                                $('.tipoColor1').append('<p>' + value['mensaje'] + '</p><hr style="width:100%;color:black"></hr>');
                                $('.tipoColor1').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="imagenDimensiones1" class="' +
                                        value['id'] +
                                        '" width="300px" style=" opacity: 0.7;">'
                                );
                            } else {
                                if (cont == 1) {
                                    var image = document.createElement('img');
                                    image.src = 'data:image/gif;base64,' + value['imagen'];
                                    image.id = 'imagenDimensiones';
                                    $('.tipoColor2').append('<p>' + value['mensaje'] + '</p><hr style="width:100%;color:black"></hr>');
                                    $('.tipoColor2').append(
                                        '<img  src="data:image/gif;base64,' +
                                            value['imagen'] +
                                            '" id="imagenDimensiones2" class="' +
                                            value['id'] +
                                            '" width="300px" style=" opacity: 0.7;">'
                                    );
                                }
                                if (cont == 2) {
                                    var image = document.createElement('img');
                                    image.src = 'data:image/gif;base64,' + value['imagen'];
                                    image.id = 'imagenDimensiones';
                                    $('.tipoColor3').append('<p>' + value['mensaje'] + '</p><hr style="width:100%;color:black"></hr>');
                                    $('.tipoColor3').append(
                                        '<img  src="data:image/gif;base64,' +
                                            value['imagen'] +
                                            '" id="imagenDimensiones3" class="' +
                                            value['id'] +
                                            '" width="300px" style=" opacity: 0.7;">'
                                    );
                                }
                                if (cont == 3) {
                                    var image = document.createElement('img');
                                    image.src = 'data:image/gif;base64,' + value['imagen'];
                                    image.id = 'imagenDimensiones';
                                    $('.tipoColor4').append('<p>' + value['mensaje'] + '</p><hr style="width:100%;color:black"></hr>');
                                    $('.tipoColor4').append(
                                        '<img  src="data:image/gif;base64,' +
                                            value['imagen'] +
                                            '" id="imagenDimensiones4" class="' +
                                            value['id'] +
                                            '" width="300px" style=" opacity: 0.7;">'
                                    );
                                }
                            }

                            cont++;
                        }
                    });
                });
        }
        if (producto != 23 && producto != 24 && producto != 25 && producto != 26 && producto != 27 && producto != 28) {
            $('#medidas').removeAttr('style');
            $('#medidas').attr('style');
            $('#medidas').css({ 'margin-left': '40%' });
            var cont = 0;
            var datos = [];

            this.dimensionesProductoService
                .query({
                    page: this.page - 1,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(data => {
                    datos = data['body'];
                    $.each(datos, function(index, value) {
                        if (producto == value['productosDormitorioId']) {
                            if (cont == 0) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenDimensiones';
                                $('.dimensionesColor1').append('<p>' + value['mensaje'] + '</p><hr style="width:100%;color:black"></hr>');
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
                                $('.dimensionesColor2').append('<p>' + value['mensaje'] + '</p><hr style="width:100%;color:black"></hr>');
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
                                $('.dimensionesColor3').append('<p>' + value['mensaje'] + '</p><hr style="width:100%;color:black"></hr>');
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
                                $('.dimensionesColor4').append('<p>' + value['mensaje'] + '</p><hr style="width:100%;color:black"></hr>');
                                $('.dimensionesColor4').append(
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
        }
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

    public tipoCogido(id) {
        $('.tipoColor1').css({ 'background-color': 'white' });
        $('.tipoColor2').css({ 'background-color': 'white' });
        $('.tipoColor3').css({ 'background-color': 'white' });
        $('.tipoColor4').css({ 'background-color': 'white' });
        $('.tipoColor' + id).css({ 'background-color': '#DFDDDC' });
        var idTipo = $('#imagenDimensiones' + id).attr('class');
        $('#parteArriba').append('<p id="tipoProd" class="' + idTipo + '"></p>');
        var idProd = $('#nombreMesita').attr('class');
        var cont = 0;

        var datosTipo = [];
        this.tipoProductoService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                datosTipo = data['body'];
                $.each(datosTipo, function(index, value) {
                    if (value['id'] == idTipo) {
                        $('#tipo').append('<p id="nombreTipo">' + value['mensaje'] + '</p>');
                    }
                });
            });

        this.dimensionesProductoTipoService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                $.each(data.body, function(index, value) {
                    if (value['productosDormitorio']['id'] == parseFloat(idProd) && value['tipoProducto']['id'] == parseFloat(idTipo)) {
                        if (value['mensaje'].indexOf('Parte Central') > -1 == true) {
                            console.log('Parte central xD');
                            $('#medidasTipo').removeAttr('style');
                            $('#medidasTipo').attr('style');
                            $('#medidasTipo').css({ 'margin-left': '40%' });
                            $('#medidasCentral').removeAttr('style');
                            $('#medidasCentral').attr('style');
                            $('#medidasCentral').css({ 'margin-left': '40%' });

                            if (cont == 0) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenDimensiones';
                                $('.tipoMedida1').append('<p>' + value['mensaje'] + '</p><hr style="width:100%;color:black"></hr>');
                                $('.tipoMedida1').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="central1" class="' +
                                        value['id'] +
                                        '" width="300px"  style=" opacity: 0.7;">'
                                );
                            }
                            if (cont == 1) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenDimensiones';
                                $('.tipoMedida2').append('<p>' + value['mensaje'] + '</p><hr style="width:100%;color:black"></hr>');
                                $('.tipoMedida2').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="central2" class="' +
                                        value['id'] +
                                        '" width="300px"  style=" opacity: 0.7;">'
                                );
                            }
                            if (cont == 2) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenDimensiones';
                                $('.tipoMedida3').append('<p>' + value['mensaje'] + '</p><hr style="width:100%;color:black"></hr>');
                                $('.tipoMedida3').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="central3" class="' +
                                        value['id'] +
                                        '" width="300px"  style=" opacity: 0.7;">'
                                );
                            }
                            if (cont == 3) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenDimensiones';
                                $('.tipoMedida4').append('<p>' + value['mensaje'] + '</p><hr style="width:100%;color:black"></hr>');
                                $('.tipoMedida4').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="central4" class="' +
                                        value['id'] +
                                        '" width="300px"  style=" opacity: 0.7;">'
                                );
                            }
                            if (cont == 4) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenDimensiones';
                                $('.tipoMedida5').append('<p>' + value['mensaje'] + '</p><hr style="width:100%;color:black"></hr>');
                                $('.tipoMedida5').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="central5" class="' +
                                        value['id'] +
                                        '" width="300px"  style=" opacity: 0.7;">'
                                );
                            }
                        }
                        if (value['mensaje'].indexOf('ALA IZQUIERDA') > -1 == true) {
                            $('#medidasTipo').removeAttr('style');
                            $('#medidasTipo').attr('style');
                            $('#medidasTipo').css({ 'margin-left': '40%' });
                            $('#medidasAlaIzq').removeAttr('style');
                            $('#medidasAlaIzq').attr('style');
                            $('#medidasAlaIzq').css({ 'margin-left': '40%' });

                            if (cont == 0) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenDimensiones';
                                $('.tipoMedidaAlaIzq1').append('<p>' + value['mensaje'] + '</p><hr style="width:100%;color:black"></hr>');
                                $('.tipoMedidaAlaIzq1').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="izquierda1" class="' +
                                        value['id'] +
                                        '" width="300px"  style=" opacity: 0.7;">'
                                );
                            }
                            if (cont == 1) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenDimensiones';
                                $('.tipoMedidaAlaIzq2').append('<p>' + value['mensaje'] + '</p><hr style="width:100%;color:black"></hr>');
                                $('.tipoMedidaAlaIzq2').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="izquierda2" class="' +
                                        value['id'] +
                                        '" width="300px"  style=" opacity: 0.7;">'
                                );
                            }
                            if (cont == 2) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenDimensiones';
                                $('.tipoMedidaAlaIzq3').append('<p>' + value['mensaje'] + '</p><hr style="width:100%;color:black"></hr>');
                                $('.tipoMedidaAlaIzq3').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="izquierda3" class="' +
                                        value['id'] +
                                        '" width="300px"  style=" opacity: 0.7;">'
                                );
                            }
                            if (cont == 3) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenDimensiones';
                                $('.tipoMedidaAlaIzq4').append('<p>' + value['mensaje'] + '</p><hr style="width:100%;color:black"></hr>');
                                $('.tipoMedidaAlaIzq4').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="izquierda4" class="' +
                                        value['id'] +
                                        '" width="300px"  style=" opacity: 0.7;">'
                                );
                            }
                        }

                        if (value['mensaje'].indexOf('ALA DERECHA') > -1 == true) {
                            $('#medidasTipo').removeAttr('style');
                            $('#medidasTipo').attr('style');
                            $('#medidasTipo').css({ 'margin-left': '40%' });
                            $('#medidasAlaDer').removeAttr('style');
                            $('#medidasAlaDer').attr('style');
                            $('#medidasAlaDer').css({ 'margin-left': '40%' });

                            if (cont == 0) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenDimensiones';
                                $('.tipoMedidaAlaDer1').append('<p>' + value['mensaje'] + '</p><hr style="width:100%;color:black"></hr>');
                                $('.tipoMedidaAlaDer1').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="derecha1" class="' +
                                        value['id'] +
                                        '" width="300px"  style=" opacity: 0.7;">'
                                );
                            }
                            if (cont == 1) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenDimensiones';
                                $('.tipoMedidaAlaDer2').append('<p>' + value['mensaje'] + '</p><hr style="width:100%;color:black"></hr>');
                                $('.tipoMedidaAlaDer2').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="derecha2" class="' +
                                        value['id'] +
                                        '" width="300px"  style=" opacity: 0.7;">'
                                );
                            }
                            if (cont == 2) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenDimensiones';
                                $('.tipoMedidaAlaDer3').append('<p>' + value['mensaje'] + '</p><hr style="width:100%;color:black"></hr>');
                                $('.tipoMedidaAlaDer3').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="derecha3" class="' +
                                        value['id'] +
                                        '" width="300px"  style=" opacity: 0.7;">'
                                );
                            }
                            if (cont == 3) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenDimensiones';
                                $('.tipoMedidaAlaDer4').append('<p>' + value['mensaje'] + '</p><hr style="width:100%;color:black"></hr>');
                                $('.tipoMedidaAlaDer4').append(
                                    '<img  src="data:image/gif;base64,' +
                                        value['imagen'] +
                                        '" id="derecha4" class="' +
                                        value['id'] +
                                        '" width="300px"  style=" opacity: 0.7;">'
                                );
                            }
                        }
                    }
                });
            });
    }

    public dimensionesCogidas(id) {
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
        $('#datos').empty();
        $('#precios').empty();
        $('#precioCalculado').empty();
        $('.dimensionesColor1').css({ 'background-color': 'white' });
        $('.dimensionesColor2').css({ 'background-color': 'white' });
        $('.dimensionesColor3').css({ 'background-color': 'white' });
        $('.dimensionesColor4').css({ 'background-color': 'white' });
        $('.dimensionesColor' + id).css({ 'background-color': '#DFDDDC' });
        $('#imagenAcabado').remove();
        idProd = $('#nombreMesita').attr('class');
        $('#total').text('0');
        var hola = $('.dimensionesColor' + id + ' #imagenDimensiones').attr('class');
        var datos = [];
        var acabados = [];
        var imagen;
        var idProd;
        this.dimensionesProductoService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                datos = data['body'];
                $.each(datos, function(index, value) {
                    if (value['id'] == id) {
                        $('#datos').append('<p>Ancho</p>');
                        $('#datos').append('<p>Alto</p>');
                        $('#datos').append('<p>Fondo</p>');
                        var total = $('#total').text();
                        var totalFloat = parseFloat(total);
                        totalFloat = totalFloat + value['precio'];
                        $('#total').text(totalFloat);
                        $('#precios').append('<p class="' + value['id'] + '" id="anchoDimension">' + value['ancho'] + '</p>');
                        $('#idioma').attr('value', value['id']);
                        $('#precios').append('<p>' + value['alto'] + '</p>');
                        $('#precios').append('<p>' + value['fondo'] + '</p>');
                        $('#precioCalculado').append('<p>-</p>');
                        $('#precioCalculado').append('<p>-</p>');
                        $('#precioCalculado').append('<p>-</p>');
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
                $.each(datos, function(index, value) {
                    if (value['productosDormitorio']['id'] == idProd) {
                        if (
                            value['productosDormitorio']['id'] == 1 ||
                            value['productosDormitorio']['id'] == 2 ||
                            value['productosDormitorio']['id'] == 19 ||
                            value['productosDormitorio']['id'] == 20
                        ) {
                            imagen = value['productosDormitorio']['imagen'];
                            if (contador == 1) {
                                $('#acabados').append(
                                    '<img id="imagenAcabado" src="data:image/gif;base64,' +
                                        imagen +
                                        '" id="imagenDimensiones" width="400px" height="400px"  style=" opacity: 0.7;margin-left:150px">'
                                );
                            } else {
                                $('#acaba' + contador).html(
                                    '<form ><select style="margin-bottom:25px;margin-top:25px" class="hola' +
                                        contador +
                                        '" id="' +
                                        value['id'] +
                                        '" ><option></option></select></form>'
                                );

                                var idAca = contador;

                                contador++;
                            }
                        }
                    }
                });
            });
    }

    public cogerLuminacion(id, texto) {
        var central = $('#centralComprobar').text();
        var izquierda = $('#izquierdaComprobar').text();
        var derecha = $('#derechaComprobar').text();
        $('#datos').empty();
        $('#datos').append('<p id="anchoMesita">Ancho Mesita Ideal</p>');
        $('#datos').append('<p id="anchoTotal">Ancho Total</p>	');
        $('#datos').append('<p id="altoTotal" >Alto Total</p>	');
        $('#datos').append('<p id="fondoTotal">Fondo Total</p>');

        if (texto == 'central') {
            var idCentral = $('#central' + id).attr('class');
            $('.tipoMedida' + id).css({ 'background-color': '#DFDDDC' });

            this.dimensionesProductoTipoService
                .query({
                    page: this.page - 1,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(data => {
                    $.each(data.body, function(index, value) {
                        if (value['id'] == parseFloat(idCentral)) {
                            $('#centralComprobar').text(value['mensaje']);
                            $('#precios').empty();
                            $('#precioCalculado').empty();
                            var total = $('#total').text();
                            var totalFloat = parseFloat(total);
                            totalFloat = totalFloat + value['precio'];
                            $('#total').text(totalFloat);
                            $('#precios').append('<p class="' + value['id'] + '" id="mesitaIdeal">M</p>');
                            $('#precios').append('<p class="' + value['id'] + '" id="anchoDimension">' + value['ancho'] + '</p>');
                            $('#precios').append('<p id="alto">' + value['alto'] + '</p>');
                            $('#precios').append('<p id="fondo">' + value['fondo'] + '</p>');
                            $('#precioCalculado').append('<p>-</p>');
                            $('#precioCalculado').append('<p>-</p>');
                            $('#precioCalculado').append('<p>-</p>');
                            $('#precioCalculado').append('<p>-</p>');
                        }
                    });

                    if (izquierda != '' && derecha != '') {
                        this.mostrarAcabados(id);
                    }
                });
        }
        if (texto == 'izquierda') {
            var idCentral = $('#izquierda' + id).attr('class');
            $('.tipoMedidaAlaIzq' + id).css({ 'background-color': '#DFDDDC' });

            this.dimensionesProductoTipoService
                .query({
                    page: this.page - 1,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(data => {
                    $.each(data.body, function(index, value) {
                        if (value['id'] == parseFloat(idCentral)) {
                            console.log(value['mensaje']);
                            $('#izquierdaComprobar').text(value['mensaje']);
                            var total = $('#total').text();
                            var totalFloat = parseFloat(total);
                            totalFloat = totalFloat + value['precio'];
                            $('#total').text(totalFloat);
                            var mesita = $('#mesitaIdeal').text();
                            $('#mesitaIdeal').text(mesita + ' ' + value['anchoMesitaIdeal']);
                            var anchoTotal = $('#anchoDimension').text();
                            var anchoTotalFloat = parseFloat(anchoTotal);
                            anchoTotalFloat = anchoTotalFloat + value['ancho'];
                            $('#anchoDimension').text(anchoTotalFloat);
                        }
                    });

                    if (central != '' && derecha != '') {
                        this.mostrarAcabados(id);
                    }
                });
        }
        if (texto == 'derecha') {
            var idCentral = $('#derecha' + id).attr('class');
            $('.tipoMedidaAlaDer' + id).css({ 'background-color': '#DFDDDC' });
            this.dimensionesProductoTipoService
                .query({
                    page: this.page - 1,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(data => {
                    $.each(data.body, function(index, value) {
                        if (value['id'] == parseFloat(idCentral)) {
                            $('#derechaComprobar').text(value['mensaje']);
                            var total = $('#total').text();
                            var totalFloat = parseFloat(total);
                            totalFloat = totalFloat + value['precio'];
                            $('#total').text(totalFloat);
                            var mesita = $('#mesitaIdeal').text();
                            $('#mesitaIdeal').text(mesita + ' - ' + value['anchoMesitaIdeal']);
                            var anchoTotal = $('#anchoDimension').text();
                            var anchoTotalFloat = parseFloat(anchoTotal);
                            anchoTotalFloat = anchoTotalFloat + value['ancho'];
                            $('#anchoDimension').text(anchoTotalFloat);
                        }
                    });

                    if (central != '' && izquierda != '') {
                        this.mostrarAcabados(id);
                    }
                });
        }
    }

    public mostrarAcabados(id) {
        var idCentral = $('#central' + id).attr('class');
        var idProd = $('#nombreMesita').attr('class');
        var idTipo = $('#tipoProd').attr('class');
        var acabados = [];
        var datos = [];
        var imagen;
        var cont = 1;
        $('#acabado1').removeAttr('style');
        $('#acabado1').attr('style');
        $('#acabado1').css({ 'margin-left': '40%' });

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
                $.each(datos, function(index, value) {
                    if (value['productosDormitorio']['id'] == idProd && value['tipoProducto']['id'] == idTipo) {
                        imagen = value['productosDormitorio']['imagen'];
                        if (contador == 1) {
                            $('#acabados1').append(
                                '<img id="imagenAcabado" src="data:image/gif;base64,' +
                                    imagen +
                                    '" id="imagenDimensiones" width="400px" height="400px"  style=" opacity: 0.7;margin-left:150px">'
                            );
                        } else {
                            $('#acaba1' + contador).html(
                                '<form ><select style="margin-bottom:25px;margin-top:25px" class="hola' +
                                    contador +
                                    '" id="' +
                                    value['id'] +
                                    '" ><option></option></select></form>'
                            );

                            var idAca = value['id'];
                            var hola = contador;

                            cont++;
                            contador++;
                        }
                    }
                });
            });
    }

    public anadirCalculadora() {
        $('#val').remove();
        $('#valDato').remove();
        $('#valor1').remove();
        var idProd = $('#nombreMesita').attr('class');
        var idTipo = $('#tipoProd').attr('class');
        var contador = 1;
        var val = [];
        var cont = 1;
        console.log(val);
        this.acabadosService.query().subscribe((res: HttpResponse<IAcabados[]>) => {
            $.each(res['body'], function(index, value) {
                val[cont] = $('.hola' + cont).val();

                if (val[cont] == value['id']) {
                    $('#datos').append('<p id="val">Acabado ' + cont + '</p>');
                    $('#precios').append('<p id="valDato">' + value['nombre'] + '</p>');
                    $('#precioCalculado').append('<p id="valor1">' + value['precio'] + '</p>');

                    cont++;
                }
            });
        });

        this.acaProdService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                $.each(data['body'], function(index, value) {
                    if (value['productosDormitorio']['id'] == parseFloat(idProd) && value['tipoProducto']['id'] == parseFloat(idTipo)) {
                        contador++;
                        if (val.length == contador) {
                            $('#iluminacion').removeAttr('style');
                            $('#iluminacion').attr('style');
                            $('#iluminacion').css({ width: '100%' });
                            $('#iluminacion').css({ float: 'left' });
                        }
                    }
                });
            });
    }

    public iluminacion(texto, id) {
        $('#terminarConfiguracion').removeAttr('style');
        $('#terminarConfiguracion').attr('style');
        $('#terminarConfiguracion').css({ width: '100%' });
        $('#terminarConfiguracion').css({ float: 'left' });
        $('#ilu' + id).css({ 'background-color': '#DFDDDC' });
        $('#datos').append('<p id="ilu">Iluminacion</p>');
        $('#precios').append('<p id="iluDato">' + texto + '</p>');
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

    trackId(index: number, item: IProductosDormitorio) {
        return item.id;
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

    protected paginateProductosDormitorios(data: IProductosDormitorio[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.productosDormitorios = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

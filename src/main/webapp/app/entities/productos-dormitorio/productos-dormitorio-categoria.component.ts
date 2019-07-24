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
import { IAcaProd } from 'app/shared/model/aca-prod.model';
import { IAcabados } from 'app/shared/model/acabados.model';
import { IDimensionesProducto } from 'app/shared/model/dimensiones-producto.model';

import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { ProductosDormitorioService } from './productos-dormitorio.service';
import { AcabadosService } from 'app/entities/acabados';
import * as $ from 'jquery';

@Component({
    selector: 'jhi-productos-dormitorio',
    templateUrl: './productos-dormitorio-categoria.component.html'
})
export class ProductosDormitorioCategoriaComponent implements OnInit, OnDestroy, AfterViewInit {
    currentAccount: any;
    productosDormitorios: IProductosDormitorio[];
    dimensionesProductos: IDimensionesProducto[];
    productosDormitorioPrueba: IProductosDormitorio;
    error: any;
    success: any;
    acaProd: IAcaProd;
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
        protected tiposApoyoService: TiposApoyoService,
        protected dimensionesProductoTipoService: DimensionesProductoTipoService,
        protected acabadosService: AcabadosService,
        protected acaProdService: AcaProdService,
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
        $('#medidas').removeAttr('style');
        $('#medidas').attr('style');
        $('#medidas').css({ 'margin-left': '40%' });
        $('.dimensionesColor1').empty();
        $('.dimensionesColor2').empty();
        $('.dimensionesColor3').empty();
        $('.dimensionesColor4').empty();
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
                            $('.dimensionesColor1').append(
                                '<p>' +
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
                            $('.dimensionesColor3').append(
                                '<p>' +
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
                                '<p>' +
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
        var altura = $('.selectectAltura').text();
        var ancho = $('.selectectAncho').text();
        var producto = $('#nombreMesita' + id).attr('class');
        var productoNombre = $('#nombreMesita' + id).text();
        $('#medidas').removeAttr('style');
        $('#medidas').attr('style');
        $('#medidas').css({ 'margin-left': '40%' });
        $('.dimensionesColor1').empty();
        $('.dimensionesColor2').empty();
        $('.dimensionesColor3').empty();
        $('.dimensionesColor4').empty();
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
                    if (ancho != 'Indiferente') {
                        if (producto == value['productosDormitorioId'] && ancho == value['ancho']) {
                            if (cont == 0) {
                                var image = document.createElement('img');
                                image.src = 'data:image/gif;base64,' + value['imagen'];
                                image.id = 'imagenDimensiones';
                                $('.dimensionesColor1').append(
                                    '<p>' +
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
                                    '<p>' +
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
                                    '<p>' +
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
                                    '<p>' +
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
                            if (value['productosDormitorio']['categoriasDormi']['id'] == 1) {
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
                                if (value['productosDormitorio']['categoriasDormi']['id'] == 1) {
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
                        if (value['productosDormitorio']['categoriasDormi']['id'] == 1) {
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
                        var totalfloat = parseFloat(total);
                        totalfloat = totalfloat + value['precio'];
                        $('#total').text(totalfloat);
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
                            value['productosDormitorio']['id'] == 19
                        ) {
                            imagen = value['productosDormitorio']['imagen'];
                            if (contador == 1) {
                                $('#acabados').append(
                                    '<img id="imagenAcabado" src="data:image/gif;base64,' +
                                        imagen +
                                        '" id="imagenDimensiones" width="400px" height="400px"  style=" opacity: 0.7;margin-left:150px">'
                                );
                            }
                            $('#acaba' + contador).html(
                                '<form ><select style="margin-bottom:25px;margin-top:25px;width:200px" class="hola' +
                                    value['id'] +
                                    '" id="' +
                                    value['id'] +
                                    '" ><option></option></select></form>'
                            );
                            contador++;
                            var idAca = value['id'];
                            $.each(acabados, function(index1, value1) {
                                if (idAca == 1 || idAca == 4) {
                                    if (value1['id'] == 1 || value1['id'] == 2) {
                                        $('.hola' + idAca).append(
                                            '<option value="' +
                                                value1['id'] +
                                                '"><img id="imagenAcabado" src="data:image/jpeg;base64,' +
                                                value1['imagenFondo'] +
                                                '" id="imagenDimensiones" width="400px" height="400px"  style=" opacity: 0.7;margin-left:150px">' +
                                                value1['nombre'] +
                                                '</option>'
                                        );
                                    }
                                } else {
                                    if (value1['id'] != 1 && value1['id'] != 2 && value1['id'] != 15 && value1['id'] != 16) {
                                        $('.hola' + idAca).append('<option value="' + value1['id'] + '">' + value1['nombre'] + '</option>');
                                    }
                                }
                            });
                        }
                    }
                });
            });
    }

    public anadirCalculadora() {
        var val = $('.hola1').val();
        var val1 = $('.hola2').val();
        var val2 = $('.hola3').val();
        var datos = [];
        $('.apoyoCogido1').empty();
        $('.apoyoCogido2').empty();
        $('.apoyoCogido3').empty();
        $('.apoyoCogido4').empty();

        $('#val').remove();
        $('#val1').remove();
        $('#val2').remove();
        $('#valor1').remove();
        $('#valor2').remove();
        $('#valor3').remove();
        $('#valDato').remove();
        $('#val1Dato').remove();
        $('#val2Dato').remove();
        if (val != '') {
            this.acabadosService.query().subscribe((res: HttpResponse<IAcabados[]>) => {
                $.each(res['body'], function(index, value) {
                    if (val == value['id']) {
                        $('#datos').append('<p id="val">Acabado 1</p>');
                        $('#precios').append('<p id="valDato">' + value['nombre'] + '</p>');
                        $('#precioCalculado').append('<p id="valor1">' + value['precio'] + '</p>');
                    }
                });
            });
        }
        if (val1 != '') {
            this.acabadosService.query().subscribe((res: HttpResponse<IAcabados[]>) => {
                $.each(res['body'], function(index, value) {
                    if (val1 == value['id']) {
                        $('#datos').append('<p id="val1">Acabado 2</p>');

                        $('#precios').append('<p id="val1Dato">' + value['nombre'] + '</p>');
                        $('#precioCalculado').append('<p id="valor2">' + value['precio'] + '</p>');
                    }
                });
            });
        }
        if (val2 != '') {
            this.acabadosService.query().subscribe((res: HttpResponse<IAcabados[]>) => {
                $.each(res['body'], function(index, value) {
                    if (val2 == value['id']) {
                        $('#datos').append('<p id="val2">Acabado 3</p>');

                        $('#precios').append('<p id="val2Dato">' + value['nombre'] + '</p>');
                        $('#precioCalculado').append('<p id="valor3">' + value['precio'] + '</p>');
                    }
                });
            });
        }

        if (val != '' && val1 != '' && val2 != '') {
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
                            contador++;
                        }
                    });
                });
        }
    }

    public apoyoCogido(id) {
        $('.apoyoCogido1').css({ 'background-color': 'white' });
        $('.apoyoCogido2').css({ 'background-color': 'white' });
        $('.apoyoCogido3').css({ 'background-color': 'white' });
        $('.apoyoCogido4').css({ 'background-color': 'white' });
        $('.apoyoCogido' + id).css({ 'background-color': '#DFDDDC' });
        var idApoyo = $('.apoyoCogido' + id + ' #imagenApoyo').attr('class');
        var idProd = $('#nombreMesita').attr('class');
        const h = $('#anchoDimension').attr('class');
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
                    if (
                        idApoyo == value['productoApoyo']['id'] &&
                        idProd == value['productosDormitorio']['id'] &&
                        value['dimensionesProducto']['id'] == h
                    ) {
                        $('#precios').append('<p>-</p>');
                        $('#datos').append('<p id="nombreApoyo">' + value['productoApoyo']['nombre'] + '</p>');
                        $('#precioCalculado').append('<p id="precioApoyo">' + value['precio'] + '</p>');
                        var total = $('#total').text();
                        var totalfloat = parseFloat(total);
                        totalfloat = totalfloat + value['precio'];
                        $('#total').text(totalfloat);
                    }
                });
            });

        $('#terminarConfiguracion').removeAttr('style');
        $('#terminarConfiguracion').attr('style');
        $('#terminarConfiguracion').css({ float: 'left' });
        $('#terminarConfiguracion').css({ width: '100%' });
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
                    if (value['productosDormitorio']['categoriasDormi']['id'] == 1) {
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

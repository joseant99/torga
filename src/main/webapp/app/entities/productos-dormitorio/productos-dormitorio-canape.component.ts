import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { LoginService } from 'app/core/login/login.service';
import { DimensionesProductoService } from '../dimensiones-producto/dimensiones-producto.service';
import { AcaProdService } from '../aca-prod/aca-prod.service';
import { TiposApoyoService } from '../tipos-apoyo/tipos-apoyo.service';
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
    templateUrl: './productos-dormitorio-canape.component.html'
})
export class ProductosDormitorioCanapeComponent implements OnInit, OnDestroy {
    currentAccount: any;
    productosDormitorios: IProductosDormitorio[];
    dimensionesProductos: IDimensionesProducto[];
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
        protected tiposApoyoService: TiposApoyoService,
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
                            $('.dimensionesColor1').append('<p>' + value['mensaje'] + '</p><hr style="width:100%;color:black"></hr>');
                            $('.dimensionesColor1').append(
                                '<img  src="data:image/gif;base64,' +
                                    value['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    value['id'] +
                                    '" width="350px" style=" opacity: 0.7;">'
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
                                    '" width="350px"  style=" opacity: 0.7;">'
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
                                    '" width="350px"  style=" opacity: 0.7;">'
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
                                    '" width="350px"  style=" opacity: 0.7;">'
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
                        var total2 = parseFloat(total);
                        total2 = total2 + value['precio'];
                        $('#total').text(total2);
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
        console.log(acabados);
        this.acaProdService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                datos = data['body'];
                console.log(datos);
                var contador = 1;
                var cont = 1;
                $.each(datos, function(index, value) {
                    console.log(idProd);
                    if (value['productosDormitorio']['id'] == idProd) {
                        imagen = value['productosDormitorio']['imagen'];
                        if (contador == 1) {
                            $('#acabados').append(
                                '<img id="imagenAcabado" src="data:image/gif;base64,' +
                                    imagen +
                                    '" id="imagenDimensiones" width="400px" height="400px"  style=" opacity: 0.7;margin-left:150px">'
                            );
                        } else {
                            $('#acaba' + contador).html(
                                '<form ><select style="margin-top:100px;margin-top:25px;width:200px" class="hola' +
                                    cont +
                                    '" id="' +
                                    value['id'] +
                                    '" ><option></option></select></form>'
                            );
                            var idAca = value['productosDormitorio']['id'];
                            var hola = contador;

                            cont++;
                            contador++;
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

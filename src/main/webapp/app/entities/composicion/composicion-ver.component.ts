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
import { AcabadosProductosPresupuestoPedidoService } from '../acabados-productos-presupuesto-pedido/acabados-productos-presupuesto-pedido.service';
import { AcabadosService } from '../acabados/acabados.service';
import { ProductosDormitorioService } from '../productos-dormitorio/productos-dormitorio.service';
import { InterioresService } from '../interiores/interiores.service';
import { PresupuestoPedidoService } from '../presupuesto-pedido/presupuesto-pedido.service';
import { IPresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';
import { AccountService, UserService, User } from 'app/core';
import { ProductosPresupuestoPedidosService } from '../productos-presupuesto-pedidos/productos-presupuesto-pedidos.service';
import { Observable } from 'rxjs';
import { ICategoriasDormi } from 'app/shared/model/categorias-dormi.model';
import { TiposApoyoService } from '../tipos-apoyo/tipos-apoyo.service';
import { IAcabadosProductosPresupuestoPedido } from 'app/shared/model/acabados-productos-presupuesto-pedido.model';
import { PrecioTiendaService } from '../precio-tienda/precio-tienda.service';
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
    acaProdPed: any;
    acaProd: any;
    user: any;
    acabados: any;
    presupuestoPedido: IPresupuestoPedido;
    isSaving: boolean;
    apoyo: any;
    sistemasApoyo: any;
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
    productos: any;
    saberIdHueco: any;
    nombreAcabado: any;
    todosAcabados: any;
    acabadosCompo: any;
    iluminacion: any;
    precioTienda: any;
    cambioDimension: any;
    cambiadoAcabado: any;
    guardarCambios: any;
    saberMostrar: any;
    precioPunto: any;
    idBorrar: any;
    constructor(
        protected composicionService: ComposicionService,
        protected tiposApoyoService: TiposApoyoService,
        protected acabadosService: AcabadosService,
        protected acabadosProductosPresupuestoPedidoService: AcabadosProductosPresupuestoPedidoService,
        protected interioresService: InterioresService,
        protected precioTiendaService: PrecioTiendaService,
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
    ngAfterViewInit() {}
    loadAll() {
        var cont = 0;
        this.acabadosCompo = [];
        var id = sessionStorage.getItem('composicion');
        this.productosComposicionService.query1(id).subscribe(data => {
            this.productos = data.body;
            var precioPunto = this.precioPunto[0];
            for (let i = 0; i < data.body.length; i++) {
                var datos = data.body[i];
                var precioApoyo = 0;
                if (datos['tiposApoyo'] != undefined) {
                    precioApoyo = datos['tiposApoyo']['precio'];
                }
                var precioIluminacion = 0;
                if (datos['iluminacion'] != undefined) {
                    precioIluminacion = datos['iluminacion']['precio'];
                }
                $('#productoCalculadora' + (i + 1)).css({ display: 'block' });
                if (precioApoyo != undefined) {
                    var precioTodo = precioApoyo + datos['dimensionesProductoTipo']['precio'];
                } else {
                    var precioTodo = datos['dimensionesProductoTipo']['precio'];
                }

                if (precioIluminacion != undefined) {
                    precioTodo = precioIluminacion + precioTodo;
                }
                $('#textoTotalComposicion').text('Total composicion:');
                var totalComposicion = $('#totalComposicion').text();
                if (totalComposicion != '') {
                    var todoPrec = parseFloat(totalComposicion) + precioTodo;
                } else {
                    var todoPrec = precioTodo;
                }
                $('#totalComposicion').text(todoPrec);
                $('#productoCalculadora' + (i + 1) + ' #nombreProducto').append(
                    '<p style="width:100%;"><span id="nombreMesitaNombre' +
                        (cont + 1) +
                        '">' +
                        datos['productosDormitorio']['nombre'] +
                        '</span><span style="float:right;margin-right:10%" class="' +
                        datos['productosDormitorio']['id'] +
                        '" id="nombreMesita' +
                        cont +
                        '">' +
                        precioTodo +
                        ' €</span></p></div>'
                );
                cont++;

                $('#productoCalculadora' + (i + 1) + ' #datos1').append(
                    '<p style="width:100%"><span>Ancho : </span><span class="' +
                        datos['dimensionesProductoTipo']['id'] +
                        '" id="ancho' +
                        cont +
                        '">' +
                        datos['dimensionesProductoTipo']['ancho'] +
                        '</span></p>'
                );
                $('#productoCalculadora' + (i + 1) + ' #datos1').append(
                    '<p style="width:100%"><span>Alto : </span><span id="alto' +
                        cont +
                        '">' +
                        datos['dimensionesProductoTipo']['alto'] +
                        '</span></p>'
                );
                $('#productoCalculadora' + (i + 1) + ' #datos1').append(
                    '<p style="width:100%;"><span>Fondo : </span><span id="fondoDatosDimen' +
                        cont +
                        '">' +
                        datos['dimensionesProductoTipo']['fondo'] +
                        '</span></p>'
                );
                if (precioIluminacion != undefined) {
                    $('#productoCalculadora' + (i + 1) + ' #datos12 #precioIluminacion').text(precioIluminacion + ' €');
                }
                $('#productoCalculadora' + (i + 1) + ' #datos1').append('<div id="div' + datos['productosDormitorio']['id'] + '"></div>');
                this.acabadosComposicionService.query1(data.body[i]['id']).subscribe(data => {
                    var arrayCompo = this.acabadosCompo;
                    arrayCompo[i] = data.body;
                    this.acabadosCompo = arrayCompo;
                    for (let h = 0; h < data.body['length']; h++) {
                        if (h == 0) {
                            var aca1Casco = data.body[h]['acabados'];
                        }
                        var aca = data.body[h]['acabados'];
                        if (aca['nombre'].toLowerCase() == 'marmol blanco') {
                            aca['nombre'] = 'marmolblanco';
                        }

                        if (aca['nombre'].toLowerCase() == 'marmol negro') {
                            aca['nombre'] = 'marmolnegro';
                        }

                        console.log(data.body[h]);
                        var nombre = data.body[h]['productosComposicion']['productosDormitorio']['nombre'];
                        $(
                            '#productoCalculadora' +
                                (i + 1) +
                                ' #datos1 #div' +
                                data.body[h]['productosComposicion']['productosDormitorio']['id']
                        ).append(
                            '<p style="width:100%" id="acabado' +
                                (h + 1) +
                                '"><span>Acabado ' +
                                (h + 1) +
                                ' </span><img id="imagenAcabadoPrincipal1" data-toggle="modal" data-target="#myModalColores' +
                                (h + 1) +
                                '"  src="data:image/gif;base64,' +
                                aca['imagenFondo'] +
                                '" height="60px" border="0" width="100px" style=";margin-left:20px;"/><span id="nombreAcaCalcu' +
                                h +
                                '" style="margin-left:10px"><span id="acabaNombre' +
                                h +
                                '">' +
                                aca['nombre'] +
                                '</span></p>'
                        );
                        if (nombre == 'singular 1 apertura izquierda') {
                            nombre = 'sg1';
                        }
                        if (nombre == 'singular 1 apertura derecha') {
                            nombre = 'sg1';
                        }
                        if (nombre == 'singular 2 apertura izquierda') {
                            nombre = 'sg2';
                        }
                        if (nombre == 'singular 2 apertura derecha') {
                            nombre = 'sg2';
                        }
                        if (nombre == 'singular 3 apertura izquierda') {
                            nombre = 'sg3';
                        }
                        if (nombre == 'singular 3 apertura derecha') {
                            nombre = 'sg3';
                        }
                        if (nombre == 'singular 12 apertura izquierda') {
                            nombre = 'sg12';
                        }
                        if (nombre == 'singular 12 apertura derecha') {
                            nombre = 'sg12';
                        }
                        if (nombre == 'singular 13 apertura izquierda') {
                            nombre = 'sg13';
                        }
                        if (nombre == 'singular 13 apertura derecha') {
                            nombre = 'sg13';
                        }

                        if (nombre == 'singular 4') {
                            nombre = 'sg4';
                        }
                        if (nombre == 'singular 5') {
                            nombre = 'sg5';
                        }
                        if (nombre == 'singular 6') {
                            nombre = 'sg6';
                        }
                        if (nombre == 'singular 7') {
                            nombre = 'sg7';
                        }
                        if (nombre == 'singular 8') {
                            nombre = 'sg8';
                        }
                        if (nombre == 'singular 9') {
                            nombre = 'sg9';
                        }
                        if (nombre == 'singular 10') {
                            nombre = 'sg10';
                        }
                        if (nombre == 'singular 11') {
                            nombre = 'sg11';
                        }
                        if (nombre == 'singular 14') {
                            nombre = 'sg14';
                        }
                        if (nombre == 'singular 15') {
                            nombre = 'sg15';
                        }
                        if (nombre == 'singular 16') {
                            nombre = 'sg16';
                        }
                        if (nombre == 'Modulo Bajo 1') {
                            nombre = 'mb1';
                        }
                        if (nombre == 'Modulo Bajo 2') {
                            nombre = 'mb2';
                        }
                        if (nombre == 'Modulo Bajo 3') {
                            nombre = 'mb4';
                        }
                        if (nombre == 'Modulo Bajo 4 Apertura Izquierda') {
                            nombre = 'mb6';
                        }
                        if (nombre == 'Modulo Bajo 4 Apertura Derecha') {
                            nombre = 'mb5';
                        }
                        if (nombre == 'Modulo Bajo 5 Apertura Izquierda') {
                            nombre = 'mb8';
                        }
                        if (nombre == 'Modulo Bajo 5 Apertura Derecha') {
                            nombre = 'mb7';
                        }
                        if (nombre == 'Modulo Bajo 6') {
                            nombre = 'mb9';
                        }
                        if (nombre == 'Modulo Bajo 7 Apertura Izquierda') {
                            nombre = 'mb11';
                        }
                        if (nombre == 'Modulo Bajo 7 Apertura Derecha') {
                            nombre = 'mb10';
                        }
                        if (nombre == 'Modulo Bajo 8 Apertura Izquierda') {
                            nombre = 'mb13';
                        }
                        if (nombre == 'Modulo Bajo 8 Apertura Derecha') {
                            nombre = 'mb12';
                        }
                        if (nombre == 'Modulo Bajo 9') {
                            nombre = 'mb14';
                        }
                        if (nombre == 'Aparador 1') {
                            nombre = 'ap1';
                        }
                        if (nombre == 'Aparador 2') {
                            nombre = 'ap2';
                        }
                        if (nombre == 'Aparador 3') {
                            nombre = 'ap3';
                        }
                        if (nombre == 'Aparador 4') {
                            nombre = 'ap4';
                        }
                        if (nombre == 'Aparador 5') {
                            nombre = 'ap5';
                        }
                        if (nombre == 'Aparador 6') {
                            nombre = 'ap6';
                        }
                        if (nombre == 'Aparador 7') {
                            nombre = 'ap7';
                        }
                        if (nombre == 'Aparador 8') {
                            nombre = 'ap8';
                        }
                        if (nombre == 'Aparador 9') {
                            nombre = 'ap9';
                        }
                        if (nombre == 'Aparador 10') {
                            nombre = 'ap10';
                        }

                        $('#imagenesAcabados' + i).attr('style');
                        $('#imagenesAcabados' + i).css({ 'margin-left': '65px' });

                        if (
                            nombre != 'sg16' &&
                            nombre != 'sg15' &&
                            nombre != 'sg14' &&
                            nombre != 'sg13' &&
                            nombre != 'sg12' &&
                            nombre != 'sg11' &&
                            nombre != 'sg10' &&
                            nombre != 'sg9' &&
                            nombre != 'sg8' &&
                            nombre != 'sg7' &&
                            nombre != 'sg6' &&
                            nombre != 'sg5' &&
                            nombre != 'sg4' &&
                            nombre != 'sg3' &&
                            nombre != 'sg2' &&
                            nombre != 'sg1'
                        ) {
                            if (aca['nombre'].toLowerCase() != 'cristal bronce' && aca['nombre'].toLowerCase() != 'cristal transparente') {
                                $('#imagenesAcabados' + i).append(
                                    '<img id="tapa" class="' +
                                        aca['nombre'].toLowerCase() +
                                        '" width="500px" style="margin-left:0px;" height="333px" src="../../../content/images/' +
                                        nombre +
                                        '/' +
                                        (h + 1) +
                                        '/' +
                                        nombre +
                                        '_' +
                                        (h + 1) +
                                        '_' +
                                        aca['nombre'].toLowerCase() +
                                        '_optimized.png">'
                                );
                            } else {
                                var acaNombreBien = aca['nombre'].toLowerCase();
                                if (acaNombreBien == 'cristal bronce') {
                                    acaNombreBien = 'bronce';
                                } else {
                                    acaNombreBien = 'transparente';
                                }
                                $('#imagenesAcabados' + i).append(
                                    '<img id="tapa" class="' +
                                        acaNombreBien +
                                        '" width="500px" style="margin-left:0px;" height="333px" src="../../../content/images/' +
                                        nombre +
                                        '/' +
                                        (h + 1) +
                                        ' ' +
                                        acaNombreBien.toUpperCase() +
                                        '/' +
                                        nombre +
                                        '_' +
                                        (h + 1) +
                                        '_' +
                                        aca1Casco['nombre'].toLowerCase() +
                                        '_' +
                                        acaNombreBien +
                                        '_optimized.png">'
                                );
                            }
                        } else {
                            $('#imagenesAcabados' + i).css({ 'margin-left': '145px' });
                            $('#imagenesAcabados' + i).css({ 'margin-top': '20px' });
                            $('#imagenesAcabados' + i).css({ 'padding-bottom': '80px' });
                            var acabadoPrimeroCristal = $('#productoCalculadora' + (i + 1) + ' #acabaNombre0').text();
                            acabadoPrimeroCristal = acabadoPrimeroCristal.toLowerCase();
                            if (aca['nombre'].toLowerCase() != 'cristal bronce' && aca['nombre'].toLowerCase() != 'cristal transparente') {
                                $('#imagenesAcabados' + i).append(
                                    '<img id="tapa" class="' +
                                        aca['nombre'].toLowerCase() +
                                        '" width="300px" style="margin-left:0px;" height="483px" src="../../../content/images/' +
                                        nombre +
                                        '/' +
                                        (h + 1) +
                                        '/' +
                                        nombre +
                                        '_' +
                                        (h + 1) +
                                        '_' +
                                        aca['nombre'].toLowerCase() +
                                        '_optimized.png">'
                                );
                            } else {
                                var acaNombreBien = aca['nombre'].toLowerCase();
                                if (acaNombreBien == 'cristal bronce') {
                                    acaNombreBien = 'bronce';
                                } else {
                                    acaNombreBien = 'transparente';
                                }
                                $('#imagenesAcabados' + i).append(
                                    '<img id="tapa" class="' +
                                        acaNombreBien +
                                        '" width="300px" style="margin-left:0px;" height="483px" src="../../../content/images/' +
                                        nombre +
                                        '/' +
                                        (h + 1) +
                                        ' ' +
                                        acaNombreBien.toUpperCase() +
                                        '/' +
                                        nombre +
                                        '_' +
                                        (h + 1) +
                                        '_' +
                                        acabadoPrimeroCristal +
                                        '_' +
                                        acaNombreBien +
                                        '_optimized.png">'
                                );
                            }
                        }
                    }
                });
            }
        });
        var acabados = [];
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

    public escogidaLuz(id) {
        var hueco = this.saberIdHueco;
        $('#productoCalculadora' + hueco + ' #' + id + 'MeterIluminacion').css({ 'background-color': '#CDCDCD' });
        if (id == 'si') {
        } else {
            $('#productoCalculadora' + hueco + ' #siMeterIluminacion').css({ 'background-color': 'white' });
            $('#productoCalculadora' + hueco + ' #precioIluminacion').text(' ');
            var productos = this.productos;
            productos[hueco - 1]['iluminacion'] = undefined;
        }
    }

    public dimensionesCogidas(id, id1) {
        var idCalculadora = this.saberIdHueco;
        $('#imagenProdEspeciales').empty();
        $('#euroCalculadora').removeAttr('style');
        $('#medidasEspecialesTexto').css({ display: 'none' });
        $('#medidasAncho').css({ display: 'none' });
        $('#medidasFondo').css({ display: 'none' });
        $('#medidasAlto').css({ display: 'none' });
        var precioTienda = this.precioTienda;
        this.interiores = JSON.parse(sessionStorage.getItem('interiores'));
        var dimensiones = this.dimensionesProductoTipoService.todos[id1 + 1];

        $('#precios1').empty();
        var todosProductos = this.productos;
        $('#precioCalculado1').empty();

        $('#estoEsTodo' + id1 + ' #dimensionesInput1').css({ 'background-color': 'white' });
        $('#estoEsTodo' + id1 + ' #dimensionesInput2').css({ 'background-color': 'white' });
        $('#estoEsTodo' + id1 + ' #dimensionesInput3').css({ 'background-color': 'white' });
        $('#estoEsTodo' + id1 + ' #dimensionesInput4').css({ 'background-color': 'white' });
        $('#estoEsTodo' + id1 + ' #dimensionesInput5').css({ 'background-color': 'white' });
        $('#estoEsTodo' + id1 + ' #dimensionesInput6').css({ 'background-color': 'white' });
        $('#estoEsTodo' + id1 + ' #dimensionesInput' + id).css({ 'background-color': '#DFDDDC' });
        var idProd;
        idProd = $('#nombreMesita' + idCalculadora).attr('class');
        var precioPunto = 1;
        var precioProducto = 1;

        $('#botonCalculadoraMod').removeAttr('class');
        this.cambioDimension = 1;
        var idDimenTipo = $('.dimensionesId' + id).attr('id');
        $('#total').text('0');
        var hola = $('.dimensionesColor' + id + ' #imagenDimensiones').attr('class');
        var datos = [];
        var acaSi = 0;
        var acabados = [];
        var imagen;
        datos = dimensiones;
        for (let h = 0; h < datos.length; h++) {
            if (datos[h]['id'] == idDimenTipo) {
                todosProductos[idCalculadora - 1]['dimensionesProductoTipo'] = datos[h];
                this.productos = todosProductos;
                if (datos[h]['mensaje'] != 'Medidas Especiales') {
                    $('#idioma').attr('value', datos[h]['id']);
                    $('#productoCalculadora' + idCalculadora + ' #datos1 #ancho' + idCalculadora).text(datos[h]['ancho']);
                    $('#productoCalculadora' + idCalculadora + ' #datos1 #ancho' + idCalculadora).attr('class', datos[h]['id']);
                    $('#productoCalculadora' + idCalculadora + ' #datos1 #alto' + idCalculadora).text(datos[h]['alto']);
                    $('#productoCalculadora' + idCalculadora + ' #datos1 #fondoDatosDimen' + idCalculadora).text(datos[h]['fondo']);
                    acaSi = 0;
                } else {
                    $('#especiales').css({ display: 'block' });

                    $('#especialesTexto').removeAttr('style');
                    $('#especialesTexto').attr('style');
                    $('#especialesTexto').css({ 'text-align': 'center' });
                    $('#especialesTexto').css({ 'margin-bottom': '5%' });
                    $('#especialesTexto').css({ 'margin-top': '5%' });
                    $('#especialesAncho').css({ float: 'left' });
                    $('#especialesAncho').css({ width: '20%' });
                    $('#especialesAncho').css({ 'margin-left': '1%' });
                    $('#especialesAncho').css({ border: '1px gray solid' });
                    $('#especialesAncho').css({ 'text-align': 'center' });
                    $('#especialesFondo').css({ float: 'left' });
                    $('#especialesFondo').css({ width: '20%' });
                    $('#especialesFondo').css({ 'margin-left': '13%' });
                    $('#especialesFondo').css({ border: '1px gray solid' });
                    $('#especialesFondo').css({ 'text-align': 'center' });
                    $('#especialesAlto').css({ float: 'left' });
                    $('#especialesAlto').css({ width: '20%' });
                    $('#especialesAlto').css({ 'margin-left': '13%' });
                    $('#especialesAlto').css({ border: '1px gray solid' });
                    $('#especialesAlto').css({ 'text-align': 'center' });
                    $('#especialesAncho').empty();
                    $('#especialesFondo').empty();
                    $('#especialesAlto').empty();
                    $('#especialesAncho').append('<p class="' + datos[h]['id'] + '" id="dimensionEspecial">ANCHO</p>');
                    $('#especialesFondo').append('<p>FONDO</p>');
                    $('#especialesAlto').append('<p>ALTO</p>');
                    acaSi = 1;
                }
            }
        }
    }

    public cambiarAcabado(idImagen, id, id1) {
        $('#iluminacion').removeAttr('style');
        var acabadosCompo = this.acabadosCompo;
        $('#iluminacion').attr('style');
        $('#iluminacion').css({ display: 'none' });
        $('#textoFinal').removeAttr('style');
        $('#textoFinal').attr('style');
        $('#textoFinal').css({ display: 'none' });
        $('#botonCalculadoraMod').removeAttr('class');
        var idProd = sessionStorage.getItem('idProdAca');
        var k = 1;
        var idCalculadora = this.saberIdHueco;
        var nombreAcabado;
        var nombre = this.nombreAcabado;
        if (nombre == 'Modulo Bajo 1') {
            nombre = 'mb1';
        }
        if (nombre == 'Modulo Bajo 2') {
            nombre = 'mb2';
        }
        if (nombre == 'Modulo Bajo 3') {
            nombre = 'mb4';
        }
        if (nombre == 'Modulo Bajo 4 Apertura Izquierda') {
            nombre = 'mb6';
        }
        if (nombre == 'Modulo Bajo 4 Apertura Derecha') {
            nombre = 'mb5';
        }
        if (nombre == 'Modulo Bajo 5 Apertura Izquierda') {
            nombre = 'mb8';
        }
        if (nombre == 'Modulo Bajo 5 Apertura Derecha') {
            nombre = 'mb7';
        }
        if (nombre == 'Modulo Bajo 6') {
            nombre = 'mb9';
        }
        if (nombre == 'Modulo Bajo 7 Apertura Izquierda') {
            nombre = 'mb11';
        }
        if (nombre == 'Modulo Bajo 7 Apertura Derecha') {
            nombre = 'mb10';
        }
        if (nombre == 'Modulo Bajo 8 Apertura Izquierda') {
            nombre = 'mb13';
        }
        if (nombre == 'Modulo Bajo 8 Apertura Derecha') {
            nombre = 'mb12';
        }
        if (nombre == 'Modulo Bajo 9') {
            nombre = 'mb14';
        }
        if (nombre == 'Aparador 1') {
            nombre = 'ap1';
        }
        if (nombre == 'Aparador 2') {
            nombre = 'ap2';
        }
        if (nombre == 'Aparador 3') {
            nombre = 'ap3';
        }
        if (nombre == 'Aparador 4') {
            nombre = 'ap4';
        }
        if (nombre == 'Aparador 5') {
            nombre = 'ap5';
        }
        if (nombre == 'Aparador 6') {
            nombre = 'ap6';
        }
        if (nombre == 'Aparador 7') {
            nombre = 'ap7';
        }
        if (nombre == 'Aparador 8') {
            nombre = 'ap8';
        }
        if (nombre == 'Aparador 9') {
            nombre = 'ap9';
        }
        if (nombre == 'Aparador 10') {
            nombre = 'ap10';
        }

        var res = nombre;

        if (nombre == '1 cajon') {
            nombre = '1cajon';
        }
        if (res == 'mb2') {
            res = 'mb1';
        }
        this.cambiadoAcabado = 1;
        nombre = res;
        var idAca = $('#myModalColores' + id1 + ' #acabadoImagen' + idImagen + ' #imagenAcabado' + idImagen).attr('class');
        var todosAcabados = this.acabados;
        var arrayCambiar = this.guardarCambios;
        $.each(todosAcabados, function(index, value) {
            if (value['id'] == idAca) {
                acabadosCompo[idCalculadora - 1][id1 - 1]['acabados'] = value;

                nombreAcabado = value['nombre'].toLowerCase();
                if (nombreAcabado == 'marmol blanco') {
                    nombreAcabado = 'marmolblanco';
                }
                if (nombreAcabado == 'marmol negro') {
                    nombreAcabado = 'marmolnegro';
                }
                if (nombreAcabado == 'cristal bronce') {
                    nombreAcabado = 'bronce';
                }
                if (nombreAcabado == 'cristal transparente') {
                    nombreAcabado = 'transparente';
                }

                $('.aca1' + id1).append(
                    '<img  src="data:image/gif;base64,' +
                        value['imagenFondo'] +
                        '" id="imagenAcabadoPrincipal' +
                        k +
                        '" class="' +
                        value['id'] +
                        '" height="60px" width="200px" style=" opacity: 0.7;margin-left:20px">'
                );
                $('#aca' + id + '' + id1).append(
                    '<p id="acabadoNombrePrincipal" style="color:black;margin-left: 180px;margin-top: -42px;position:absolute" >' +
                        value['nombre'] +
                        '</p>'
                );
                if (id1 == 1) {
                    $('#tapa').remove();
                    if (
                        nombre == 'mb6' ||
                        nombre == 'mb9' ||
                        nombre == 'mb7' ||
                        nombre == 'mb8' ||
                        nombre == 'mb10' ||
                        nombre == 'mb11' ||
                        nombre == 'mb12' ||
                        nombre == 'mb13' ||
                        nombre == 'mb14'
                    ) {
                        $('.acabados .imagenAcabadoPrincipal').append(
                            '<img id="tapa" class="' +
                                nombreAcabado +
                                '" width="650px" height="433px" src="../../../content/images/mb5/1/mb5_1_' +
                                nombreAcabado +
                                '_optimized.png">'
                        );

                        if (nombre == 'mb8') {
                            var claseId = $('#casco3').attr('class');
                            if (claseId != undefined) {
                                var src = $('#casco3').attr('src');
                                var partes = [];
                                partes[0] = src.split('_')[0];
                                partes[1] = src.split('_')[1];
                                partes[2] = src.split('_')[3];
                                partes[3] = src.split('_')[4];
                                src = partes[0] + '_' + partes[1] + '_' + nombreAcabado + '_' + partes[2] + '_' + partes[3];
                                $('#casco3').attr('src', src);
                            }
                        }

                        if (nombre == 'mb7') {
                            var claseId = $('#casco4').attr('class');
                            if (claseId != undefined) {
                                var src = $('#casco4').attr('src');
                                var partes = [];
                                partes[0] = src.split('_')[0];
                                partes[1] = src.split('_')[1];
                                partes[2] = src.split('_')[3];
                                partes[3] = src.split('_')[4];
                                src = partes[0] + '_' + partes[1] + '_' + nombreAcabado + '_' + partes[2] + '_' + partes[3];
                                $('#casco4').attr('src', src);
                            }
                        }

                        if (nombre == 'mb13') {
                            var claseId = $('#casco3').attr('class');
                            if (claseId != undefined) {
                                var src = $('#casco3').attr('src');
                                var partes = [];
                                partes[0] = src.split('_')[0];
                                partes[1] = src.split('_')[1];
                                partes[2] = src.split('_')[3];
                                partes[3] = src.split('_')[4];
                                src = partes[0] + '_' + partes[1] + '_' + nombreAcabado + '_' + partes[2] + '_' + partes[3];
                                $('#casco3').attr('src', src);
                            }
                        }

                        if (nombre == 'mb12') {
                            var claseId = $('#casco5').attr('class');
                            if (claseId != undefined) {
                                var src = $('#casco5').attr('src');
                                var partes = [];
                                partes[0] = src.split('_')[0];
                                partes[1] = src.split('_')[1];
                                partes[2] = src.split('_')[3];
                                partes[3] = src.split('_')[4];
                                src = partes[0] + '_' + partes[1] + '_' + nombreAcabado + '_' + partes[2] + '_' + partes[3];
                                $('#casco5').attr('src', src);
                            }
                        }
                    } else {
                        $('.acabados .imagenAcabadoPrincipal').append(
                            '<img id="tapa" class="' +
                                nombreAcabado +
                                '" width="650px" height="433px" src="../../../content/images/' +
                                nombre +
                                '/1/' +
                                nombre +
                                '_1_' +
                                nombreAcabado +
                                '_optimized.png">'
                        );
                    }
                }
                if (id1 == 2) {
                    $('#cajon').remove();
                    if (
                        nombre == 'mb6' ||
                        nombre == 'mb9' ||
                        nombre == 'mb7' ||
                        nombre == 'mb8' ||
                        nombre == 'mb10' ||
                        nombre == 'mb11' ||
                        nombre == 'mb12' ||
                        nombre == 'mb13' ||
                        nombre == 'mb14'
                    ) {
                        $('.acabados .imagenAcabadoPrincipal').append(
                            '<img id="cajon" class="' +
                                nombreAcabado +
                                '" width="650px" height="433px"  src="../../../content/images/mb5/2/mb5_2_' +
                                nombreAcabado +
                                '_optimized.png">'
                        );
                    } else {
                        $('.acabados .imagenAcabadoPrincipal').append(
                            '<img id="cajon" class="' +
                                nombreAcabado +
                                '" width="650px" height="433px" src="../../../content/images/' +
                                nombre +
                                '/2/' +
                                nombre +
                                '_2_' +
                                nombreAcabado +
                                '_optimized.png">'
                        );
                    }
                }
                if (id1 != 2 && id1 != 1) {
                    if (nombreAcabado == 'bronce' || nombreAcabado == 'transparente') {
                        var nombreMayus = nombreAcabado.toUpperCase();
                        var color = $('#val1Dato').text();
                        color = color.toLowerCase();
                        $('.acabados .imagenAcabadoPrincipal').append(
                            '<img id="casco' +
                                id1 +
                                '" class="' +
                                nombreAcabado +
                                '" width="650px" height="433px" src="../../../content/images/' +
                                nombre +
                                '/' +
                                id1 +
                                ' ' +
                                nombreMayus +
                                '/' +
                                nombre +
                                '_' +
                                id1 +
                                '_' +
                                color +
                                '_' +
                                nombreAcabado +
                                '_optimized.png">'
                        );
                    } else {
                        $('.acabados .imagenAcabadoPrincipal').append(
                            '<img id="casco' +
                                id1 +
                                '" class="' +
                                nombreAcabado +
                                '" width="650px" height="433px" src="../../../content/images/' +
                                nombre +
                                '/' +
                                id1 +
                                '/' +
                                nombre +
                                '_' +
                                id1 +
                                '_' +
                                nombreAcabado +
                                '_optimized.png">'
                        );
                    }
                }

                $('#imagenesAcabados' + (idCalculadora - 1)).append(
                    '<img id="tapa" class="' +
                        value['nombre'].toLowerCase() +
                        '" width="500px" style="margin-left:0px;" height="333px" src="../../../content/images/' +
                        nombre +
                        '/' +
                        id1 +
                        '/' +
                        nombre +
                        '_' +
                        id1 +
                        '_' +
                        value['nombre'].toLowerCase() +
                        '_optimized.png">'
                );
                $('#productoCalculadora' + idCalculadora + ' #datos1 #acabado' + id1 + ' #acabaNombre' + (id1 - 1)).text(value['nombre']);
                var src = 'data:image/gif;base64,' + value['imagenFondo'];
                $('#productoCalculadora' + idCalculadora + ' #datos1 #acabado' + id1 + ' #imagenAcabadoPrincipal1').attr('src', src);
                $('#productoCalculadora' + idCalculadora + ' #datos1 #acabado' + id1 + ' #imagenAcabadoPrincipal1').attr(
                    'class',
                    value['id']
                );
                k++;
            }
        });
        this.acabadosCompo = acabadosCompo;
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

        for (let j = 1; j <= 5; j++) {
            $('.apoyoCogido' + j).css({ 'background-color': 'white' });
        }
        var apoyoBueno = $('#datos1 #nombreApoyo').text();
        var idProd = $('#nombreMesita').attr('class');
        if (contadorApoyo == cont - 1 && apoyoBueno != '') {
            var iluminacion = this.iluminacion;
            var texto = 0;
            for (let k = 0; k < iluminacion.length; k++) {
                if (iluminacion[k]['productosDormitorio']['id'] == idProd) {
                    $('#iluminacion').removeAttr('style');
                    $('#iluminacion').attr('style');
                    $('#iluminacion').css({ width: '100%' });
                    $('#iluminacion').css({ float: 'left' });
                    $('#ilu1').attr('class', iluminacion[k]['id']);
                    texto = 0;
                } else {
                    texto = 1;
                }
            }
            if (texto == 1) {
                $('#botonCalculadora').removeAttr('class');
            }
            $('#terminarConfiguracion').removeAttr('style');
            $('#terminarConfiguracion').attr('style');
            $('#terminarConfiguracion').css({ float: 'left' });
            $('#terminarConfiguracion').css({ width: '100%' });
        }
    }

    public mostrarDatos1(id) {
        $('#productoCalculadora1 #datos1').css({ display: 'none' });
        $('#productoCalculadora2 #datos1').css({ display: 'none' });
        $('#productoCalculadora3 #datos1').css({ display: 'none' });
        $('#productoCalculadora4 #datos1').css({ display: 'none' });
        $('#productoCalculadora5 #datos1').css({ display: 'none' });
        $('#productoCalculadora6 #datos1').css({ display: 'none' });
        $('#productoCalculadora7 #datos1').css({ display: 'none' });
        $('#productoCalculadora1 #datos12').css({ display: 'none' });
        $('#productoCalculadora2 #datos12').css({ display: 'none' });
        $('#productoCalculadora3 #datos12').css({ display: 'none' });
        $('#productoCalculadora4 #datos12').css({ display: 'none' });
        $('#productoCalculadora5 #datos12').css({ display: 'none' });
        $('#productoCalculadora6 #datos12').css({ display: 'none' });
        $('#productoCalculadora7 #datos12').css({ display: 'none' });
        for (let n = 0; n < 14; n++) {
            $('#myModalColores1 #acabadoImagen' + n).empty();
            $('#myModalColores2 #acabadoImagen' + n).empty();
            $('#myModalColores3 #acabadoImagen' + n).empty();
            $('#myModalColores4 #acabadoImagen' + n).empty();
            $('#myModalColores5 #acabadoImagen' + n).empty();
            $('#myModalColores6 #acabadoImagen' + n).empty();
            $('#myModalColores7 #acabadoImagen' + n).empty();
            $('#myModalColores8 #acabadoImagen' + n).empty();
            $('#myModalColores9 #acabadoImagen' + n).empty();
            $('#myModalColores10 #acabadoImagen' + n).empty();
            $('#myModalColores11 #acabadoImagen' + n).empty();
            $('#myModalColores12 #acabadoImagen' + n).empty();
            $('#myModalColores13 #acabadoImagen' + n).empty();
            $('#myModalColores14 #acabadoImagen' + n).empty();
            $('#myModalColores15 #acabadoImagen' + n).empty();
        }
        $('.0').css({ display: 'none' });
        $('.1').css({ display: 'none' });
        $('.2').css({ display: 'none' });
        $('.3').css({ display: 'none' });
        $('.4').css({ display: 'none' });
        $('.5').css({ display: 'none' });
        $('.6').css({ display: 'none' });
        $('.7').css({ display: 'none' });
        $('.8').css({ display: 'none' });
        $('#productoCalculadora' + (id + 1) + ' #datos1').css({ display: 'block' });
        var precioLuz = $('#productoCalculadora' + (id + 1) + ' #datos12 #precioIluminacion').text();

        if (precioLuz != '0 €') {
            $('#productoCalculadora' + (id + 1) + ' #datos12').css({ display: 'block' });
            $('#productoCalculadora' + (id + 1) + ' #siMeterIluminacion').css({ 'background-color': '#DFDDDC' });
        }

        var idHueco = id + 1;
        this.saberIdHueco = idHueco;
        var idBuena = $('#productoCalculadora' + idHueco + ' #nombreProducto #nombreMesita' + id).attr('class');
        var idDimen = $('#productoCalculadora' + idHueco + ' #datos1 #ancho' + idHueco).attr('class');
        var saberSiMostrar = this.saberMostrar;
        if (saberSiMostrar[id] == undefined) {
            this.dimensionesProductoTipoService.findProducto(idBuena).subscribe(data => {
                var dimenArray = this.dimensionesProductoTipoService.todos;
                if (dimenArray == undefined) {
                    dimenArray = [];
                }
                dimenArray[idHueco] = data.body;
                this.dimensionesProductoTipoService.todos = dimenArray;
                console.log(this.dimensionesProductoTipoService.todos);
                var cont = 0;
                $('.' + id).css({ display: 'block' });
                $('.' + id).css({ 'margin-left': '60px' });
                var dimensionesPrueba;
                dimensionesPrueba = data.body;
                var datos = dimensionesPrueba;
                var precioTienda1 = 0;
                var precioTienda = 0;

                var precioPunto = this.precioPunto[0];

                $('#dimensiones').css({ display: 'block' });
                for (let i = 0; i < datos.length; i++) {
                    if (idBuena == datos[i]['productosDormitorio']['id']) {
                        if (idDimen == datos[i]['id']) {
                            $('#estoEsTodo' + id + ' #dimensionesInput' + (cont + 1)).css({ 'background-color': '#DFDDDC' });
                            $('#estoEsTodo' + id + ' #dimensiones1').css({ width: '94%' });
                            $('#estoEsTodo' + id + ' #dimensiones1').css({ 'padding-left': '6%' });
                            $('#estoEsTodo' + id + ' #dimensiones1').css({ 'margin-top': '2%' });
                            $('#estoEsTodo' + id + ' #dimensiones1').css({ border: '1px solid #7AC8FE' });
                        }

                        if (cont == 0 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var precio = datos[i]['precio'];
                            precio = precio * precioPunto;
                            $('#estoEsTodo' + id + ' #dimensionesText1').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('#estoEsTodo' + id + ' #precioDimenText1').text(precio + ' €');

                            $('.' + id + ' .dimensionesColor1').css({ display: 'block' });
                            $('.' + id + ' .dimensionesColor1').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1;display_none"></p>'
                            );
                        }
                        if (cont == 1 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var precio = datos[i]['precio'];
                            precio = precio * precioPunto;
                            $('#estoEsTodo' + id + ' #dimensionesText2').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('#estoEsTodo' + id + ' #precioDimenText2').text(precio + ' €');
                            $('#estoEsTodo' + id + ' .dimensionesColor2').css({ display: 'block' });
                            $('#estoEsTodo' + id + ' .dimensionesColor2').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1;display_none"></p>'
                            );
                        }
                        if (cont == 2 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var precio = datos[i]['precio'];
                            precio = precio * precioPunto;
                            $('#estoEsTodo' + id + ' #dimensionesText3').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('#estoEsTodo' + id + ' #precioDimenText3').text(precio + ' €');

                            $('#estoEsTodo' + id + ' .dimensionesColor3').css({ display: 'block' });
                            $('#estoEsTodo' + id + ' .dimensionesColor3').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1;display_none"></p>'
                            );
                        }
                        if (cont == 3 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var precio = datos[i]['precio'];
                            precio = precio * precioPunto;
                            $('#estoEsTodo' + id + ' #dimensionesText4').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('#estoEsTodo' + id + ' #precioDimenText4').text(precio + ' €');

                            $('#estoEsTodo' + id + ' .dimensionesColor4').css({ display: 'block' });
                            $('#estoEsTodo' + id + ' .dimensionesColor4').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1;display_none"></p>'
                            );
                        }
                        if (cont == 4 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var precio = datos[i]['precio'];
                            precio = precio * precioPunto;
                            $('#estoEsTodo' + id + ' #dimensionesText5').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('#estoEsTodo' + id + ' #precioDimenText5').text(precio + ' €');

                            $('#estoEsTodo' + id + ' .dimensionesColor5').css({ display: 'block' });
                            $('#estoEsTodo' + id + ' .dimensionesColor5').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1;display_none"></p>'
                            );
                        }
                        if (cont == 5 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var precio = datos[i]['precio'];
                            precio = precio * precioPunto;
                            $('#estoEsTodo' + id + ' #dimensionesText6').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('#estoEsTodo' + id + ' #precioDimenText6').text(precio + ' €');

                            $('#estoEsTodo' + id + ' .dimensionesColor6').css({ display: 'block' });
                            $('#estoEsTodo' + id + ' .dimensionesColor6').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1;display_none"></p>'
                            );
                        }
                        if (cont == 6 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var precio = datos[i]['precio'];
                            precio = precio * precioPunto;
                            $('#estoEsTodo' + id + ' #dimensionesText7').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('#estoEsTodo' + id + ' #precioDimenText7').text(precio + ' €');

                            $('#estoEsTodo' + id + ' .dimensionesColor7').css({ display: 'block' });
                            $('#estoEsTodo' + id + ' .dimensionesColor7').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1;display_none"></p>'
                            );
                        }
                        if (cont == 7 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var precio = datos[i]['precio'];
                            precio = precio * precioPunto;
                            $('#estoEsTodo' + id + ' #dimensionesText8').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('#estoEsTodo' + id + ' #precioDimenText8').text(precio + ' €');

                            $('#estoEsTodo' + id + ' .dimensionesColor8').css({ display: 'block' });
                            $('#estoEsTodo' + id + ' .dimensionesColor8').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1;display_none"></p>'
                            );
                        }
                        if (cont == 8 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var precio = datos[i]['precio'];
                            precio = precio * precioPunto;
                            $('#estoEsTodo' + id + ' #dimensionesText9').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('#estoEsTodo' + id + ' #precioDimenText9').text(precio + ' €');

                            $('#estoEsTodo' + id + ' .dimensionesColor9').css({ display: 'block' });
                            $('#estoEsTodo' + id + ' .dimensionesColor9').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1;display_none"></p>'
                            );
                        }
                        if (cont == 9 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var precio = datos[i]['precio'];
                            precio = precio * precioPunto;
                            $('#estoEsTodo' + id + ' #dimensionesText10').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('#estoEsTodo' + id + ' #precioDimenText10').text(precio + ' €');

                            $('#estoEsTodo' + id + ' .dimensionesColor10').css({ display: 'block' });
                            $('#estoEsTodo' + id + ' .dimensionesColor10').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1;display_none"></p>'
                            );
                        }
                        if (cont == 10 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var precio = datos[i]['precio'];
                            precio = precio * precioPunto;
                            $('#estoEsTodo' + id + ' #dimensionesText11').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('#estoEsTodo' + id + ' #precioDimenText11').text(precio + ' €');

                            $('#estoEsTodo' + id + ' .dimensionesColor11').css({ display: 'block' });
                            $('#estoEsTodo' + id + ' .dimensionesColor11').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1;display_none"></p>'
                            );
                        }

                        cont++;
                    }
                }
            });

            var contnuevo = 1;
            var u = 1;
            var i = 0;
            var acabados = [];
            var contAca = 0;
            var aca = [];
            for (let n = 0; n < 15; n++) {
                var prueba = $('#productoCalculadora' + (id + 1) + ' #datos1 #div' + idBuena + ' #acabaNombre' + n).text();
                if (prueba != '') {
                    aca[contAca] = prueba;
                    contAca++;
                }
            }
            var nombre = $('#productoCalculadora' + idHueco + ' #nombreMesitaNombre' + idHueco).text();

            if (nombre == 'Modulo Bajo 1') {
                nombre = 'mb1';
            }
            if (nombre == 'Modulo Bajo 2') {
                nombre = 'mb2';
            }
            if (nombre == 'Modulo Bajo 3') {
                nombre = 'mb4';
            }
            if (nombre == 'Modulo Bajo 4 Apertura Izquierda') {
                nombre = 'mb6';
            }
            if (nombre == 'Modulo Bajo 4 Apertura Derecha') {
                nombre = 'mb5';
            }
            if (nombre == 'Modulo Bajo 5 Apertura Izquierda') {
                nombre = 'mb8';
            }
            if (nombre == 'Modulo Bajo 5 Apertura Derecha') {
                nombre = 'mb7';
            }
            if (nombre == 'Modulo Bajo 6') {
                nombre = 'mb9';
            }
            if (nombre == 'Modulo Bajo 7 Apertura Izquierda') {
                nombre = 'mb11';
            }
            if (nombre == 'Modulo Bajo 7 Apertura Derecha') {
                nombre = 'mb10';
            }
            if (nombre == 'Modulo Bajo 8 Apertura Izquierda') {
                nombre = 'mb13';
            }
            if (nombre == 'Modulo Bajo 8 Apertura Derecha') {
                nombre = 'mb12';
            }
            if (nombre == 'Modulo Bajo 9') {
                nombre = 'mb14';
            }
            if (nombre == 'Aparador 1') {
                nombre = 'ap1';
            }
            if (nombre == 'Aparador 2') {
                nombre = 'ap2';
            }
            if (nombre == 'Aparador 3') {
                nombre = 'ap3';
            }
            if (nombre == 'Aparador 4') {
                nombre = 'ap4';
            }
            if (nombre == 'Aparador 5') {
                nombre = 'ap5';
            }
            if (nombre == 'Aparador 6') {
                nombre = 'ap6';
            }
            if (nombre == 'Aparador 7') {
                nombre = 'ap7';
            }
            if (nombre == 'Aparador 8') {
                nombre = 'ap8';
            }
            if (nombre == 'Aparador 9') {
                nombre = 'ap9';
            }
            if (nombre == 'Aparador 10') {
                nombre = 'ap10';
            }
            $('.' + id + ' .acabados .imagenAcabadoPrincipal').empty();
            this.nombreAcabado = nombre;
            this.acaProdService.findAca(idBuena).subscribe(data => {
                var imagen;
                var acabadosTodos;
                var contador = 1;
                this.acaProdService.todos = data.body;
                this.acaProdService.parte = data.body[1]['acabados'];
                console.log(id);
                $('.' + id + ' #acabados').css({ display: 'block' });
                $('.' + id + ' .acabados').css({ display: 'block' });
                $.each(this.acaProdService.todos, function(index, value) {
                    if (value['productosDormitorio']['id'] == idBuena) {
                        imagen = value['imagen'];
                        if (contador == 1) {
                            $('.' + id + ' .acabados .imagenAcabadoPrincipal').append(
                                '<img id="imagenAcabado" src="data:image/gif;base64,' +
                                    imagen +
                                    '" class="imagenAcabadoPrincipalImg"  width="650px" height="433px">'
                            );
                            $('#estoEsTodo' + id + ' .acabados').css({ width: '94%' });
                            $('#estoEsTodo' + id + ' .acabados').css({ 'margin-top': '2%' });
                            $('#estoEsTodo' + id + ' .acabados').css({ border: '1px solid #7AC8FE' });
                        }
                        if (contador == 1) {
                            for (let n = 0; n < aca.length; n++) {
                                if (n == 0) {
                                    var aca1Casco = aca[n].toLowerCase();
                                }
                                if (aca[n].toLowerCase() != 'cristal bronce' && aca[n].toLowerCase() != 'cristal transparente') {
                                    $('.' + id + ' .acabados .imagenAcabadoPrincipal').append(
                                        '<img id="tapa" class="' +
                                            aca[n].toLowerCase() +
                                            '" width="650px" height="433px" src="../../../content/images/' +
                                            nombre +
                                            '/' +
                                            (n + 1) +
                                            '/' +
                                            nombre +
                                            '_' +
                                            (n + 1) +
                                            '_' +
                                            aca[n].toLowerCase() +
                                            '_optimized.png">'
                                    );
                                } else {
                                    if (aca[n].toLowerCase() == 'cristal bronce') {
                                        aca[n] = 'bronce';
                                    }
                                    if (aca[n].toLowerCase() == 'cristal transparente') {
                                        aca[n] = 'transparente';
                                    }
                                    $('.' + id + ' .acabados .imagenAcabadoPrincipal').append(
                                        '<img id="tapa" class="' +
                                            aca[n].toLowerCase() +
                                            '" width="650px" height="433px" src="../../../content/images/' +
                                            nombre +
                                            '/' +
                                            (n + 1) +
                                            ' ' +
                                            aca[n].toUpperCase() +
                                            '/' +
                                            nombre +
                                            '_' +
                                            (n + 1) +
                                            '_' +
                                            aca1Casco +
                                            '_' +
                                            aca[n].toLowerCase() +
                                            '_optimized.png">'
                                    );
                                }
                            }
                        }
                        acabadosTodos = value['acabados'];

                        contador++;
                        var idAca = value['id'];
                        for (let m = 0; m < value['acabados'].length; m++) {
                            $('#myModalColores' + u + ' .modal-body #acabadoImagen' + i).append(
                                '<img  src="data:image/gif;base64,' +
                                    value['acabados'][m]['imagenFondo'] +
                                    '" id="imagenAcabado' +
                                    i +
                                    '" class="' +
                                    value['acabados'][m]['id'] +
                                    '" height="250px" width="130px">'
                            );
                            $('#myModalColores' + u + ' .modal-body #acabadoImagen' + i).append(
                                '<strong><p font-size: 17px;letter-spacing:1px;font-weight:300">' +
                                    value['acabados'][m]['nombre'] +
                                    '</strong></p>'
                            );

                            i++;
                            $('.cambiarAca' + u).attr('style');
                            $('.cambiarAca' + u).css({ 'margin-bottom': '35px' });
                            $('.cambiarAca' + u).css({ 'margin-top': '15px' });
                            $('.cambiarAca' + u).text('Cambiar Acabado');
                        }

                        u++;
                        i = 0;
                        contnuevo++;
                    }
                });
            });
            saberSiMostrar[id] = 'no';
            $('#mostrarYOcultar' + id).text('Ocultar configuracion de articulo');
        } else {
            saberSiMostrar[id] = undefined;
            $('#productoCalculadora' + (id + 1) + ' #datos1').css({ display: 'none' });
            $('#mostrarYOcultar' + id).text('Mostrar configuracion de articulo');
        }
    }
    public ocultar1(id) {
        $('#productoCalculadora' + (id + 1) + ' #datos1').css({ display: 'none' });
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
                            $('#datos' + contador).append(
                                '<font id="apoyo' +
                                    contador +
                                    '" class="' +
                                    value['tiposApoyo']['id'] +
                                    '">' +
                                    value['tiposApoyo']['productoApoyo']['nombre'] +
                                    '</font>'
                            );
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
                                        '"class = "' +
                                        acabados1[i]['acabados']['id'] +
                                        '"> ' +
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
    public eliminar() {
        var id = this.idBorrar;
        $('#todoDivProductos' + id).remove();
        var precio = $('#productoCalculadora' + (id + 1) + ' #nombreMesita' + id).text();
        $('#productoCalculadora' + (id + 1)).remove();
        var productos = this.productos;
        productos[id] = undefined;
        this.idBorrar = productos;
        var precio1 = parseFloat(precio.split(' ')[0]);
        var todo = 0;
        todo = parseFloat($('#totalComposicion').text());
        todo = todo - precio1;
        $('#totalComposicion').text(todo);
    }
    public guardarIdBorrar(id) {
        this.idBorrar = id;
    }

    public borrarCarritoProd(id) {
        var Borrar = $('#productoCarrito' + id).attr('class');
        sessionStorage.removeItem(Borrar);
        $('#productoCarrito' + id).remove();
    }
    public enviarCarrito1() {
        var productos = this.productos;
        console.log(productos);
        var acabados = this.acabadosCompo;
        var contador = 1;
        for (let k = 1; k < sessionStorage.length; k++) {
            if (sessionStorage['prod' + k] != null) {
                contador++;
            }
        }
        var contadorProd = contador;
        var contadorDimen = contador;
        for (let i = 0; i < productos.length; i++) {
            if (productos[i] != undefined) {
                productos[i]['dimensionesProductoTipo']['productosDormitorio']['imagen'] = '';
                if (productos[i]['tiposApoyo'] != undefined) {
                    productos[i]['tiposApoyo']['imagen'] = '';
                }
                var arrayTodo = {
                    id: productos[i]['dimensionesProductoTipo']['id'],
                    ancho: productos[i]['dimensionesProductoTipo']['ancho'],
                    alto: productos[i]['dimensionesProductoTipo']['alto'],
                    fondo: productos[i]['dimensionesProductoTipo']['fondo'],
                    mensaje: productos[i]['dimensionesProductoTipo']['mensaje'],
                    imagen: '',
                    imagenContentType: '',
                    precio: productos[i]['dimensionesProductoTipo']['precio'],
                    anchoMesitaIdeal: productos[i]['dimensionesProductoTipo']['anchoMesitaIdeal'],
                    productosDormitorio: productos[i]['dimensionesProductoTipo']['productosDormitorio'],
                    tipoProducto: productos[i]['dimensionesProductoTipo']['tipoProducto'],
                    apoyo: productos[i]['tiposApoyo']
                };
                var precioTodo = $('#productoCalculadora' + (i + 1) + ' #nombreMesita' + i).text();
                arrayTodo['todoSumadoPrecio'] = precioTodo.split(' ')[0];
                for (let u = 0; u < acabados[i].length; u++) {
                    var aca = [];
                    acabados[i][u]['acabados']['imagenFondo'] = '';
                    aca[u] = acabados[i][u]['acabados'];
                    arrayTodo['acabado' + (u + 1)] = aca[u];
                }
                if (productos[i]['iluminacion'] != undefined) {
                    arrayTodo['iluminacion'] = productos[i]['iluminacion'];
                }

                console.log(arrayTodo);
                const arrayEnviar = [];
                arrayEnviar[1] = arrayTodo;
                sessionStorage.setItem('prod' + contadorDimen, JSON.stringify(arrayEnviar));
                contadorDimen++;
            }
        }
        this.productosDormitorioService.numeroCesta = contadorDimen - 1;
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
        this.presupuestoPedido = prueba;
        console.log(this.presupuestoPedido);
        this.subscribeToSaveResponse(this.presupuestoPedidoService.create(this.presupuestoPedido));
        var presupuesto = this.presupuesto;
        var id = localStorage.getItem('ultimoPresupuesto');
        var id1 = parseFloat(id);
        id1 = id1 + 1;
        var prodPrePed;
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
                prodPrePed = {
                    productosDormitorio: productosFinal[m],
                    presupuestoPedido: prueba1,
                    dimensionesProductoTipo: dimensionesFinal[m]
                };
            } else {
                prodPrePed = {
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
        this.saberMostrar = [];
        var tienda = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
        this.precioTiendaService.findBus(tienda.id).subscribe(data => {
            this.precioPunto = data.body;
            this.loadAll();
        });
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

    protected subscribeToSaveResponse2(result: Observable<HttpResponse<IAcabadosProductosPresupuestoPedido>>) {
        result.subscribe(
            (res: HttpResponse<IAcabadosProductosPresupuestoPedido>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }
}

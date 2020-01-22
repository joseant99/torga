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
import { AcabadosProductosPresupuestoPedidoService } from '../acabados-productos-presupuesto-pedido/acabados-productos-presupuesto-pedido.service';
import { Observable } from 'rxjs';
import { ICategoriasDormi } from 'app/shared/model/categorias-dormi.model';

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
    nombreAcabado: any;
    ocultar: any;
    todasDimensiones: any;
    guardarCambios: any;
    precioTienda: any;
    cambioDimension: any;
    cambiadoAcabado: any;
    idSaber: any;
    iluminacion: any;
    datosYaCargados: any;
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
        protected acabadosProductosPresupuestoPedidoService: AcabadosProductosPresupuestoPedidoService,
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
        var contGuardar = 0;
        var presu;
        var contMax = 0;
        presu = sessionStorage.getItem('presupuesto');
        this.productosPresupuestoPedidosService.query1(presu).subscribe((res: HttpResponse<IProductosPresupuestoPedidos[]>) => {
            this.productosPresupuestoPedidosService.todos = res.body;
            for (let i = 0; i < res.body.length; i++) {
                if (res.body[i]['presupuestoPedido'] != null) {
                    if (parseFloat(presu) == res.body[i]['presupuestoPedido']['id']) {
                        productosPresupuesto[cont] = res.body[i];
                        var datos = res.body[i]['dimensionesProductoTipo'];
                        $('#productoCalculadora' + (i + 1)).css({ display: 'block' });
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
                                datos['precio'] +
                                ' &euro;</span></p></div>'
                        );
                        $('#productoCalculadora' + (i + 1) + ' #datos1').append(
                            '<p style="width:100%"><span>Ancho : </span><span class="' +
                                datos['id'] +
                                '" id="ancho' +
                                cont +
                                '">' +
                                datos['ancho'] +
                                '</span></p>'
                        );
                        $('#productoCalculadora' + (i + 1) + ' #datos1').append(
                            '<p style="width:100%"><span>Alto : </span><span id="alto' + cont + '">' + datos['alto'] + '</span></p>'
                        );
                        $('#productoCalculadora' + (i + 1) + ' #datos1').append(
                            '<p style="width:100%;"><span>Fondo : </span><span id="fondoDatosDimen' +
                                cont +
                                '">' +
                                datos['fondo'] +
                                '</span></p>'
                        );

                        $('#productoCalculadora' + (i + 1) + ' #datos1').append(
                            '<div id="div' + datos['productosDormitorio']['id'] + '"></div>'
                        );
                        $('#productoCalculadora' + (i + 1) + ' #datos1').append(
                            '<p style="width:100%;margin-bottom:50px">' + productosPresupuesto[cont]['tiposApoyo']['nombre'] + '</p>'
                        );
                        cont++;
                        contGuardar++;
                        this.acabadosProductosPresupuestoPedidoService.query1(res.body[i]['id']).subscribe(data => {
                            console.log(data.body);
                            var array = this.acabadosProductosPresupuestoPedidoService.todos;
                            if (array == undefined) {
                                array = [];
                            }
                            array[contGuardar] = data.body;
                            contGuardar--;
                            this.acabadosProductosPresupuestoPedidoService.todos = array;
                            for (let h = 0; h < data.body['length']; h++) {
                                var aca = data.body[h]['acabados'];
                                console.log(data.body[h]);
                                var nombre = data.body[h]['productosPresupuestoPedidos']['productosDormitorio']['nombre'];
                                $(
                                    '#productoCalculadora' +
                                        (i + 1) +
                                        ' #datos1 #div' +
                                        data.body[h]['productosPresupuestoPedidos']['productosDormitorio']['id']
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

                                sessionStorage.setItem(
                                    'idProdAca',
                                    data.body[h]['productosPresupuestoPedidos']['productosDormitorio']['id']
                                );
                            }
                        });
                    }
                }
            }
            this.productosPresupuestoPedidos = productosPresupuesto;
        });
        var todasDimensiones = [];
        var todosAcabados = [];
        var acaProd = [];
        var acabados = [];
        var apoyo = [];
        var presupuesto = [];
        var interiores = [];
        var usuarios = [];

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
    public guardarCambios1(id) {
        var cambios = this.guardarCambios;
        var prodsBuenos = [];
        var acabados = this.acabadosProductosPresupuestoPedidoService.todos;
        var dimen = this.dimensionesProductoTipoService.todos;
        if (cambios[id] != undefined) {
            for (let j = 1; j <= 100; j++) {
                if (acabados[id][j] != undefined) {
                    prodsBuenos[id] = acabados[id][j]['productosPresupuestoPedidos'];
                }

                if (cambios[id]['acabado' + j] != undefined) {
                    acabados[id][j - 1]['acabados'] = cambios[id]['acabado' + j];
                    console.log(acabados[id]);
                    this.subscribeToSaveResponse(this.acabadosProductosPresupuestoPedidoService.update(acabados[id][j - 1]));
                }
            }
            if (cambios[id]['dimensiones'] != undefined) {
                var id1 = $('#ancho' + (id - 1)).attr('class');
                for (let u = 0; u < dimen[id].length; u++) {
                    if (dimen[id][u]['id'] == id1) {
                        prodsBuenos[id]['dimensionesProductoTipo'] = dimen[id][u];
                        this.subscribeToSaveResponse(this.productosPresupuestoPedidosService.update(prodsBuenos[id]));
                    }
                }
            }
            this.salirSinGuardar();
        }
    }
    public salirSinGuardar() {
        window.history.back();
    }
    public eliminar(id) {
        $('#prod' + id).remove();
        $('#productoCalculadora' + id).remove();
    }

    public ocultar1(id) {
        $('.' + id).css({ display: 'none' });

        var idBuena = this.idSaber;
        $('#productoCalculadora' + idBuena + ' #datos1').css({ display: 'none' });
        $('#productoCalculadora' + idBuena + ' #botonCalculadoraGuardar' + idBuena).attr('class', 'displayBoton');
    }

    public mostrarDatos(id) {
        id = id + 1;
        this.idSaber = id;
        var datosCargados = this.datosYaCargados;
        var acabados = [];
        acabados = this.acabadosProductosPresupuestoPedidoService.todos;
        var productos = this.productosPresupuestoPedidosService.todos;
        var array = this.ocultar;
        var consultar = array[id];
        $('#productoCalculadora0 #datos1').css({ display: 'none' });
        $('#productoCalculadora1 #datos1').css({ display: 'none' });
        $('#productoCalculadora2 #datos1').css({ display: 'none' });
        $('#productoCalculadora3 #datos1').css({ display: 'none' });
        $('#productoCalculadora4 #datos1').css({ display: 'none' });
        $('#productoCalculadora5 #datos1').css({ display: 'none' });
        $('#productoCalculadora6 #datos1').css({ display: 'none' });
        $('#productoCalculadora7 #datos1').css({ display: 'none' });
        $('#productoCalculadora1 #botonCalculadoraGuardar1').attr('class', 'displayBoton');
        $('#productoCalculadora2 #botonCalculadoraGuardar2').attr('class', 'displayBoton');
        $('#productoCalculadora3 #botonCalculadoraGuardar3').attr('class', 'displayBoton');
        $('#productoCalculadora4 #botonCalculadoraGuardar4').attr('class', 'displayBoton');
        $('#productoCalculadora5 #botonCalculadoraGuardar5').attr('class', 'displayBoton');
        $('#productoCalculadora6 #botonCalculadoraGuardar6').attr('class', 'displayBoton');
        $('#productoCalculadora' + id + ' #datos1').css({ display: 'block' });
        this.productosPresupuestoPedidos = productos;
        array[id] = '1';
        this.ocultar = array;
        var idBuena;
        idBuena = $('#productoCalculadora' + id + ' #nombreMesita' + (id - 1)).attr('class');
        var textoNombre = $('#nombreMesitaNombre' + id).text();
        this.nombreAcabado = textoNombre;
        var idDimen = $('#productoCalculadora' + id + ' #ancho' + (id - 1)).attr('class');
        if (datosCargados == 0) {
            this.datosYaCargados = 0;
            $('.1').css({ display: 'none' });
            $('.0').css({ display: 'none' });
            $('.2').css({ display: 'none' });
            $('.3').css({ display: 'none' });
            $('.4').css({ display: 'none' });
            $('.5').css({ display: 'none' });
            $('.6').css({ display: 'none' });
            $('.7').css({ display: 'none' });
            this.dimensionesProductoTipoService.findProducto(idBuena).subscribe(data => {
                var dimenArray = this.dimensionesProductoTipoService.todos;
                dimenArray[id] = data.body;
                this.dimensionesProductoTipoService.todos = dimenArray;
                console.log(this.dimensionesProductoTipoService.todos);
                var cont = 0;
                $('.' + (id - 1)).css({ display: 'block' });
                $('.' + (id - 1)).css({ 'margin-left': '60px' });
                var dimensionesPrueba;
                dimensionesPrueba = data.body;
                var datos = dimensionesPrueba;
                var precioTienda1 = 0;
                var precioTienda = 0;
                $('.dimensionesColor1').empty();
                $('.dimensionesColor2').empty();
                $('.dimensionesColor3').empty();
                $('.dimensionesColor4').empty();
                $('.dimensionesColor5').empty();
                $('.dimensionesColor6').empty();
                $('.dimensionesColor7').empty();

                $('#dimensiones').css({ display: 'block' });
                for (let i = 0; i < datos.length; i++) {
                    if (idBuena == datos[i]['productosDormitorio']['id']) {
                        if (idDimen == datos[i]['id']) {
                            $('.dimensionesColor' + (cont + 1)).css({ 'background-color': '#DFDDDC' });
                            $('.dimensionesColor' + (cont + 1)).css({ border: '1px solid #DFDDDC' });
                        }
                        $('.' + id + ' .dimensionesColor' + (cont + 1)).css({ border: '1px solid #dfdddc' });
                        if (cont == 0 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var image = document.createElement('img');
                            var precio = parseFloat(datos[i]['precio']);
                            precio = precio * precioTienda1;
                            precio = precio * precioTienda;
                            precio = Math.round(precio * 100) / 100;
                            image.src = 'data:image/gif;base64,' + datos[i]['imagen'];
                            image.id = 'imagenDimensiones';
                            $('.' + (id - 1) + ' .dimensionesColor1').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1"></p>'
                            );
                            $('.' + (id - 1) + ' .dimensionesColor1').append(
                                '<a><img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i]['id'] +
                                    '" width="500px" height="283.73px" style=""></a>'
                            );
                            $('.dimensionesColor' + (cont + 1)).css({ border: '1px solid #DFDDDC' });
                        }
                        if (cont == 1 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var image = document.createElement('img');
                            var precio = parseFloat(datos[i]['precio']);
                            precio = precio * precioTienda1;
                            precio = precio * precioTienda;
                            precio = Math.round(precio * 100) / 100;
                            image.src = 'data:image/gif;base64,' + datos[i]['imagen'];
                            image.id = 'imagenDimensiones';
                            $('.' + (id - 1) + ' .dimensionesColor2').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1"></p>'
                            );
                            $('.' + (id - 1) + ' .dimensionesColor2').append(
                                '<a><img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i] +
                                    '" width="500px" height="283.73px"  style=""></a>'
                            );
                            $('.dimensionesColor' + (cont + 1)).css({ border: '1px solid #DFDDDC' });
                        }
                        if (cont == 2 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var image = document.createElement('img');
                            var precio = parseFloat(datos[i]['precio']);
                            precio = precio * precioTienda1;
                            precio = precio * precioTienda;
                            precio = Math.round(precio * 100) / 100;
                            image.src = 'data:image/gif;base64,' + datos[i]['imagen'];
                            image.id = 'imagenDimensiones';
                            $('.' + (id - 1) + ' .dimensionesColor3').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1"></p>'
                            );
                            $('.' + (id - 1) + ' .dimensionesColor3').append(
                                '<a ><img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i] +
                                    '" width="500px" height="283.73px" style=""></a>'
                            );
                            $('.dimensionesColor' + (cont + 1)).css({ border: '1px solid #DFDDDC' });
                        }
                        if (cont == 3 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var image = document.createElement('img');
                            var precio = parseFloat(datos[i]['precio']);
                            precio = precio * precioTienda1;
                            precio = precio * precioTienda;
                            precio = Math.round(precio * 100) / 100;
                            image.src = 'data:image/gif;base64,' + datos[i]['imagen'];
                            image.id = 'imagenDimensiones';
                            $('.' + (id - 1) + ' .dimensionesColor4').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1"></p>'
                            );
                            $('.' + (id - 1) + ' .dimensionesColor4').append(
                                '<a><img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i] +
                                    '" width="500px" height="283.73px" style=""></a>'
                            );
                            $('.dimensionesColor' + (cont + 1)).css({ border: '1px solid #DFDDDC' });
                        }
                        if (cont == 4 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var image = document.createElement('img');
                            var precio = parseFloat(datos[i]['precio']);
                            precio = precio * precioTienda1;
                            precio = precio * precioTienda;
                            precio = Math.round(precio * 100) / 100;
                            image.src = 'data:image/gif;base64,' + datos[i]['imagen'];
                            image.id = 'imagenDimensiones';
                            $('.' + (id - 1) + ' .dimensionesColor5').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1"></p>'
                            );
                            $('.' + (id - 1) + ' .dimensionesColor5').append(
                                '<a><img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i] +
                                    '" width="500px" height="283.73px"  style=""></a>'
                            );
                            $('.dimensionesColor' + (cont + 1)).css({ border: '1px solid #DFDDDC' });
                        }
                        if (cont == 5 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var image = document.createElement('img');
                            var precio = parseFloat(datos[i]['precio']);
                            precio = precio * precioTienda1;
                            precio = precio * precioTienda;
                            precio = Math.round(precio * 100) / 100;
                            image.src = 'data:image/gif;base64,' + datos[i]['imagen'];
                            image.id = 'imagenDimensiones';
                            $('.' + (id - 1) + ' .dimensionesColor6').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1"></p>'
                            );
                            $('.' + (id - 1) + ' .dimensionesColor6').append(
                                '<a ><img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i] +
                                    '"width="500px" height="283.73px"  style=""></a>'
                            );
                            $('.dimensionesColor' + (cont + 1)).css({ border: '1px solid #DFDDDC' });
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
                var prueba = $('#datos1 #div' + idBuena + ' #acabaNombre' + n).text();
                if (prueba != '') {
                    aca[contAca] = prueba;
                    contAca++;
                }
            }
            var nombre = $('#productoCalculadora' + id + ' #nombreMesitaNombre' + id).text();

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
            $('.' + (id - 1) + ' .acabados .imagenAcabadoPrincipal').empty();

            this.acaProdService.findAca(idBuena).subscribe(data => {
                var imagen;
                var acabadosTodos;
                var contador = 1;
                this.acaProdService.todos = data.body;
                this.acaProdService.parte = data.body[1]['acabados'];
                console.log(id);
                $('.' + (id - 1) + ' #acabados').css({ display: 'block' });
                $('.' + (id - 1) + ' .acabados').css({ display: 'block' });
                $.each(this.acaProdService.todos, function(index, value) {
                    if (value['productosDormitorio']['id'] == idBuena) {
                        imagen = value['imagen'];
                        if (contador == 1) {
                            $('.' + (id - 1) + ' .acabados .imagenAcabadoPrincipal').append(
                                '<img id="imagenAcabado" src="data:image/gif;base64,' +
                                    imagen +
                                    '" class="imagenAcabadoPrincipalImg"  width="650px" height="433px">'
                            );
                        }
                        for (let n = 0; n < aca.length; n++) {
                            $('.' + (id - 1) + ' .acabados .imagenAcabadoPrincipal').append(
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
                                    '" height="250px" width="130px" style=" opacity: 0.7;">'
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

                        $('.' + id + ' .aca1' + u).append(
                            '<button onclick="guardarIdProd(' +
                                idBuena +
                                ',' +
                                id +
                                ')" class="cambiarAcabado" style="float:left;margin-bottom:35px;margin-top:15px;background-color: white;border: 1px solid #d5d5d5;height: 40px; width: 100px;" class="cambiarAca1" id="color" data-toggle="modal" data-target="#myModalColores' +
                                u +
                                '">Acabado ' +
                                u +
                                '</button>'
                        );
                        $('.' + id + ' .aca1' + u).append(
                            '<img id="imagenAcabadoPrincipal1" src"../../../content/images/blanco.jpg" height="60px" border="0" width="200px" style=" opacity: 0.7;margin-left:20px;"/>'
                        );
                        u++;
                        i = 0;
                        contnuevo++;
                    }
                });
            });
        } else {
            $('.' + (id - 1)).css({ display: 'block' });
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategoriasDormi>>) {
        result.subscribe((res: HttpResponse<ICategoriasDormi>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }
    protected subscribeToSaveResponse1(result: Observable<HttpResponse<ICategoriasDormi>>) {
        result.subscribe((res: HttpResponse<ICategoriasDormi>) => this.onSaveSuccess1(), (res: HttpErrorResponse) => this.onSaveError());
    }
    protected onSaveError() {
        this.isSaving = false;
    }

    protected onSaveSuccess() {
        this.isSaving = false;
    }
    protected onSaveSuccess1() {
        this.isSaving = false;
        window.history.back();
    }
    public dimensionesCogidas(id, id1) {
        var idCalculadora = this.idSaber;
        $('#imagenProdEspeciales').empty();
        $('#botonCalculadoraGuardar' + idCalculadora).removeAttr('class');
        $('#euroCalculadora').removeAttr('style');
        $('#medidasEspecialesTexto').css({ display: 'none' });
        $('#medidasAncho').css({ display: 'none' });
        $('#medidasFondo').css({ display: 'none' });
        $('#medidasAlto').css({ display: 'none' });
        var precioTienda = this.precioTienda;
        this.interiores = JSON.parse(sessionStorage.getItem('interiores'));
        var dimensiones = this.dimensionesProductoTipoService.todos[id1 + 1];
        var arrayCambiar = this.guardarCambios;
        var arrayDimen = arrayCambiar[idCalculadora];
        if (arrayDimen == undefined) {
            arrayDimen = [];
        }
        arrayDimen['dimensiones'] = 'si';
        arrayCambiar[idCalculadora] = arrayDimen;
        this.guardarCambios = arrayCambiar;
        console.log(this.guardarCambios);
        $('#precios1').empty();

        $('#precioCalculado1').empty();
        $('.dimensionesColor1').css({ 'background-color': 'white' });
        $('.dimensionesColor5').css({ 'background-color': 'white' });
        $('.dimensionesColor6').css({ 'background-color': 'white' });
        $('.dimensionesColor2').css({ 'background-color': 'white' });
        $('.dimensionesColor3').css({ 'background-color': 'white' });
        $('.dimensionesColor4').css({ 'background-color': 'white' });
        $('.dimensionesColor' + id).css({ 'background-color': '#DFDDDC' });
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
                if (datos[h]['mensaje'] != 'Medidas Especiales') {
                    $('#idioma').attr('value', datos[h]['id']);
                    $('#productoCalculadora' + idCalculadora + ' #datos1 #ancho' + id1).text(datos[h]['ancho']);
                    $('#productoCalculadora' + idCalculadora + ' #datos1 #ancho' + id1).attr('class', datos[h]['id']);
                    $('#productoCalculadora' + idCalculadora + ' #datos1 #alto' + id1).text(datos[h]['alto']);
                    $('#productoCalculadora' + idCalculadora + ' #datos1 #fondoDatosDimen' + id1).text(datos[h]['fondo']);
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

        $('#iluminacion').attr('style');
        $('#iluminacion').css({ display: 'none' });
        $('#textoFinal').removeAttr('style');
        $('#textoFinal').attr('style');
        $('#textoFinal').css({ display: 'none' });
        $('#botonCalculadoraMod').removeAttr('class');
        var idProd = sessionStorage.getItem('idProdAca');
        var k = 1;
        var idCalculadora = this.idSaber;
        $('#botonCalculadoraGuardar' + idCalculadora).removeAttr('class');
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

                var arrayDimen = arrayCambiar[idCalculadora];
                if (arrayDimen == undefined) {
                    arrayDimen = [];
                }
                arrayDimen['acabado' + id1] = value;
                arrayCambiar[idCalculadora] = arrayDimen;
                this.guardarCambios = arrayCambiar;
                console.log(this.guardarCambios);
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

    loadAll() {
        var productosPresupuesto = [];
        var cont = 0;
        var presu = sessionStorage.getItem('presupuesto');
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
        this.dimensionesProductoTipoService.todos = [];
        this.guardarCambios = [];
        var array = [];
        this.ocultar = array;
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProductosPresupuestoPedidos();
        this.datosYaCargados = 0;
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

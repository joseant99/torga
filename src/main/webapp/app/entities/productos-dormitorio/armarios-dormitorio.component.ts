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
import { IluminacionService } from '../iluminacion/iluminacion.service';
import { IPresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';
import { IProductosPresupuestoPedidos } from 'app/shared/model/productos-presupuesto-pedidos.model';
import { ITEMS_PER_PAGE } from 'app/shared';
import { ProductosDormitorioService } from './productos-dormitorio.service';
import { AcabadosService } from 'app/entities/acabados';
import * as $ from 'jquery';
import { IluminacionProdPrePedService } from '../iluminacion-prod-pre-ped/iluminacion-prod-pre-ped.service';
import { ICategoriasDormi } from 'app/shared/model/categorias-dormi.model';
import { InterioresService } from '../interiores/interiores.service';
import { MedidasEspecialesService } from '../medidas-especiales/medidas-especiales.service';
import { MedEspProductoPedidoPresuService } from '../med-esp-producto-pedido-presu/med-esp-producto-pedido-presu.service';
import { IAcabadosProductosPresupuestoPedido } from 'app/shared/model/acabados-productos-presupuesto-pedido.model';
import { InterioresArmariosService } from '../interiores-armarios/interiores-armarios.service';
@Component({
    selector: 'jhi-productos-dormitorio',
    templateUrl: './armarios-dormitorio.component.html'
})
export class ArmariosDormitorioComponent implements OnInit, OnDestroy, AfterViewInit {
    currentAccount: any;
    productosDormitorios: IProductosDormitorio[];
    dimensionesProductos: IDimensionesProducto[];
    productosDormitorioPrueba: IProductosDormitorio;
    error: any;
    success: any;
    valores: any;
    apoyo: any;
    numeroPuertas: any;
    isSaving: boolean;
    especiales: any;
    acaProd: IAcaProd;
    acabadosProductos: any;
    iluminacion: any;
    dimensionesArmarios: any;
    acabados: any;
    acabadosPuertas: any;
    todosAcabados: any;
    acaProdPed: any;
    precioTienda: any;
    interioresArmarios: any;
    armarios: any;
    presupuestoPedido: IPresupuestoPedido;
    presupuesto: any;
    productosPresupuestoPedidos: IProductosPresupuestoPedidos;
    user: any;
    todasDimensiones: any;
    interiores: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;

    sistemasApoyo: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    tipoPuerta: any;

    constructor(
        protected tiposApoyoService: TiposApoyoService,
        protected medidasEspecialesService: MedidasEspecialesService,
        protected dimensionesProductoTipoService: DimensionesProductoTipoService,
        protected acabadosService: AcabadosService,
        protected iluminacionProdPrePedService: IluminacionProdPrePedService,
        protected iluminacionService: IluminacionService,
        protected medEspProductoPedidoPresuService: MedEspProductoPedidoPresuService,
        protected interioresService: InterioresService,
        protected acabadosProductosPresupuestoPedidoService: AcabadosProductosPresupuestoPedidoService,
        protected acaProdService: AcaProdService,
        protected productosPresupuestoPedidosService: ProductosPresupuestoPedidosService,
        protected presupuestoPedidoService: PresupuestoPedidoService,
        protected userService: UserService,
        protected interioresArmariosService: InterioresArmariosService,
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
        $('#iluminacion').removeAttr('style');
        $('#iluminacion').attr('style');
        $('#iluminacion').css({ display: 'none' });
        $('#textoFinal').removeAttr('style');
        $('#textoFinal').attr('style');
        $('#textoFinal').css({ display: 'none' });
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

    public borrarCarritoProd(id) {
        var Borrar = $('#productoCarrito' + id).attr('class');
        sessionStorage.removeItem(Borrar);
        $('#productoCarrito' + id).remove();
    }

    public enviarCarrito() {
        for (let j = 1; j <= 10; j++) {
            $('#productoCarrito' + j + ' #datos' + j).empty();
            $('#productoCarrito' + j + ' #precios' + j).empty();
            $('#productoCarrito' + j + ' #precioCalculado' + j).empty();
        }
        var contador = 1;
        var acabados = this.acabados;
        var todosAcabados = this.todosAcabados;
        var iluminacion = this.iluminacion;
        $('#textoFinal').removeAttr('style');
        $('#textoFinal').attr('style');
        $('#textoFinal').css({ display: 'none' });
        $('#iluminacion').removeAttr('style');
        $('#iluminacion').attr('style');
        $('#iluminacion').css({ display: 'none' });
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
            const idIluminacion = $('#productoCalculadora1 #precioCalculado1 #iluminacion' + i).attr('class');
            const ancho = $('#productoCalculadora1 #precios1 #ancho' + i).text();
            const alto = $('#productoCalculadora1 #precios1 #alto' + i).text();
            const fondo = $('#productoCalculadora1 #precios1 #fondo' + i).text();
            const precio = $('#productoCalculadora1 #precios1 #alto' + i).attr('class');
            const todasDimensiones = this.todasDimensiones;
            console.log(sessionStorage);
            const prod = [];
            const prods = this.apoyo;
            const apoyoBueno = [];
            const iluBuena = [];
            const sistemasApoyo = this.sistemasApoyo;
            for (let k = 0; k < sistemasApoyo.length; k++) {
                if (sistemasApoyo[k]['id'] == idApoyo) {
                    apoyoBueno[1] = sistemasApoyo[k];
                }
            }

            for (let k = 0; k < iluminacion.length; k++) {
                if (iluminacion[k]['id'] == idIluminacion) {
                    iluBuena[1] = iluminacion[k];
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
                    if (value['mensaje'] == 'Medidas Especiales') {
                        value['ancho'] = ancho;
                        value['alto'] = alto;
                        value['fondo'] = fondo;
                        value['precio'] = precio;
                    }
                    value['apoyo'] = apoyoBueno[1];
                    value['iluminacion'] = iluBuena[1];
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
                if (sesion[1]['iluminacion'] != undefined) {
                    $('#productoCarrito' + i + ' #datos' + i).append('<font>Iluminacion</font>');
                    $('#productoCarrito' + i + ' #datos' + i).append('<br>');
                    $('#productoCarrito' + i + ' #precios' + i).append(
                        '<font id="iluminacionCarr' + i + '" class="' + sesion[1]['iluminacion']['id'] + '">-</font>'
                    );
                    $('#productoCarrito' + i + ' #precios' + i).append('<br>');
                    $('#productoCarrito' + i + ' #precioCalculado' + i).append(
                        '<font>' + sesion[1]['iluminacion']['precio'] + '&euro;</font>'
                    );
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
        var dimensionEspecialBien = [];
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
        var idDimenEsp;
        var precioTexto;
        var contadorIlu = 0;
        var todasDimensiones = this.todasDimensiones;
        var acabados = this.acabados;
        var productos = this.apoyo;
        var apoyos = this.sistemasApoyo;
        var idIlu;
        var prodIlu = [];
        var iluFinal = [];
        var iluminacion = this.iluminacion;
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
            idIlu = $('#productoCarrito' + j + '  #precios' + j + ' #iluminacionCarr' + j + '').attr('class');
            for (let i = 0; i < iluminacion.length; i++) {
                if (idIlu != '' && idIlu != undefined) {
                    if (iluminacion[i]['id'] == idIlu) {
                        iluFinal[contadorIlu] = iluminacion[i];
                        contadorIlu++;
                    }
                }
            }

            idApoyo = $('#sistemaApoyo' + j).attr('class');
            for (let o = 0; o < apoyos.length; o++) {
                if (apoyos[o]['id'] == idApoyo) {
                    apoyosFinal[contadorApoyo] = apoyos[o];
                    contadorApoyo++;
                }
            }

            nombre = $('#nombreProd' + j).text();
            anchoTexto = $('#productoCarrito' + j + ' #ancho' + j).text();
            idDimenEsp = $('#productoCarrito' + j + ' #ancho' + j).attr('class');
            precioTexto = $('#productoCarrito' + j + ' #alto' + j).attr('class');
            altoTexto = $('#productoCarrito' + j + ' #alto' + j).text();
            fondoTexto = $('#productoCarrito' + j + ' #fondo' + j).text();

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
                    } else {
                        if (todasDimensiones[h]['id'] == idDimenEsp && todasDimensiones[h]['mensaje'] == 'Medidas Especiales') {
                            todasDimensiones[h]['precio'] = precioTexto;
                            todasDimensiones[h]['alto'] = altoTexto;
                            todasDimensiones[h]['ancho'] = anchoTexto;
                            todasDimensiones[h]['fondo'] = fondoTexto;
                            dimensionesFinal[contadorDimension] = todasDimensiones[h];
                            contadorDimension++;
                        }
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
        var prodPrePed;
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
            prodIlu[m] = prodPrePed;
            dimensionEspecialBien[m] = prodPrePed;
            this.productosPresupuestoPedidos = prodPrePed;
            this.subscribeToSaveResponse1(this.productosPresupuestoPedidosService.create(this.productosPresupuestoPedidos));
            if (dimensionesFinal[m]['mensaje'] == 'Medidas Especiales') {
                var acaPedProd = this.acaProdPed.length;
                acaPedProd = this.acaProdPed[acaPedProd - 1];
                dimensionEspecialBien[m]['id'] = acaPedProd['id'] + m + 1;
                const medEsp = {
                    productosPresupuestoPedidos: dimensionEspecialBien[m],
                    ancho: dimensionesFinal[m]['ancho'],
                    fondo: dimensionesFinal[m]['fondo'],
                    alto: dimensionesFinal[m]['alto'],
                    precio: dimensionesFinal[m]['precio']
                };
                this.subscribeToSaveResponse(this.medEspProductoPedidoPresuService.create(medEsp));
            }
            if (iluFinal[m] != undefined && iluFinal[m] != '') {
                var acaPedProd = this.acaProdPed.length;
                acaPedProd = this.acaProdPed[acaPedProd - 1];
                prodIlu[m]['id'] = acaPedProd['id'] + m + 1;
                const iluProd = {
                    iluminacion: iluFinal[m],
                    productosPresupuestoPedidos: prodIlu[m]
                };
                this.subscribeToSaveResponse(this.iluminacionProdPrePedService.create(iluProd));
            }
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
        this.precioTienda = sessionStorage.getItem('precioTienda');
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

    public cargarInterioresArmarios() {
        var dimensiones = this.todasDimensiones;
        var productos = this.apoyo;
        var dimensionesArmarios = [];
        var productosArmarios = [];
        var anchos = [];
        var altos = [];

        var cont = 0;
        var cont1 = 0;
        var contConjunto = 0;
        for (let i = 0; i < dimensiones.length; i++) {
            if (dimensiones[i]['productosDormitorio']['categoriasDormi']['id'] == 9) {
                dimensionesArmarios[cont] = dimensiones[i];
                cont++;
            }
        }
        for (let i = 0; i < productos.length; i++) {
            if (productos[i]['categoriasDormiId'] == 9) {
                productosArmarios[cont1] = productos[i];
                cont1++;
            }
        }
        this.dimensionesArmarios = dimensionesArmarios;
        this.armarios = productosArmarios;
        for (let j = 0; j < productosArmarios.length; j++) {
            var xAnchos = 0;
            var yAnchos = 0;
            var xAltos = 0;
            var arrayPrueba = [];
            var yAltos = 0;
            for (let k = 0; k < dimensionesArmarios.length; k++) {
                if (dimensionesArmarios[k]['productosDormitorio']['id'] == productosArmarios[j]['id']) {
                    if (dimensionesArmarios[k]['ancho'] < xAnchos || xAnchos == 0) {
                        xAnchos = dimensionesArmarios[k]['ancho'];
                    } else {
                        if (dimensionesArmarios[k]['ancho'] > yAnchos) {
                            yAnchos = dimensionesArmarios[k]['ancho'];
                        }
                    }

                    if (dimensionesArmarios[k]['alto'] < xAltos || xAltos == 0) {
                        xAltos = dimensionesArmarios[k]['alto'];
                    } else {
                        if (dimensionesArmarios[k]['alto'] > yAltos) {
                            yAltos = dimensionesArmarios[k]['alto'];
                        }
                    }
                }
            }
            arrayPrueba[0] = xAnchos;
            arrayPrueba[1] = yAnchos;
            arrayPrueba[2] = productosArmarios[j];
            arrayPrueba[3] = xAltos;
            arrayPrueba[4] = yAltos;
            anchos[contConjunto] = arrayPrueba;
            contConjunto++;
        }

        var interiores = this.interioresArmarios;
        var ancho = $('#anchosSelect').val();
        var alto = $('#alturaSelect').val();
        var llevar = 0;
        if (ancho != '' && alto != '') {
            $('#calculadora').attr('class', 'container tab-pane fade active show');
            $('#nombreMesita').text('Armario Estandar');
            $('#productoCalculadora1 #datos1').append('<p>ancho</p>');
            $('#productoCalculadora1 #precios1').append('<p id="anchoCalculadora">' + ancho + '</p>');
            $('#productoCalculadora1 #precioCalculado1').append('<p>-</p>');
            $('#productoCalculadora1 #datos1').append('<p>alto</p>');
            $('#productoCalculadora1 #precios1').append('<p id="altoCalculadora">' + alto + '</p>');
            $('#productoCalculadora1 #precioCalculado1').append('<p>-</p>');
            $('#productoCalculadora1 #datos1').append('<p>fondo</p>');
            $('#productoCalculadora1 #precios1').append('<p>600</p>');
            $('#productoCalculadora1 #precioCalculado1').append('<p>-</p>');
            $('#textoTituloInterior').append('2. Interiores y Puertas');
            for (let i = 0; i < anchos.length; i++) {
                if (anchos[i][0] <= ancho && anchos[i][1] >= ancho) {
                    for (let k = 0; k < interiores.length; k++) {
                        if (interiores[k]['productosDormitorio']['id'] == anchos[i][2]['id']) {
                            $('#interioresArmarios' + llevar).append(
                                '<p style="text-align:center" id="mensajeId' +
                                    llevar +
                                    '" class="' +
                                    anchos[i][2]['id'] +
                                    '">' +
                                    interiores[k]['mensaje'] +
                                    '</p>'
                            );
                            $('#interioresArmarios' + llevar).append(
                                '<p id="idInterior" class="' +
                                    interiores[k]['id'] +
                                    '" style="text-align:center"><img  src="data:image/gif;base64,' +
                                    anchos[i][2]['imagen'] +
                                    '" width="70%" style=" opacity: 0.7;margin-left:20px;max-height:300px;max-width:400px"></p>'
                            );
                            $('#interioresArmarios' + llevar).append(
                                '<p style="text-align:center"><img  src="data:image/gif;base64,' +
                                    interiores[k]['imagen'] +
                                    '" width="70%" style=" opacity: 0.7;margin-left:20px;max-height:300px;max-width:400px"></p>'
                            );
                            llevar++;
                        }
                    }
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
        var k = 1;
        var nombreAcabado;
        var nombre = $('#nombreMesita')
            .text()
            .toLowerCase();
        if (nombre == '1 cajon') {
            nombre = '1cajon';
        }
        var idAca = $('#myModalColores' + id1 + ' #acabadoImagen' + idImagen + ' #imagenAcabado' + idImagen).attr('class');
        var todosAcabados = this.acabados;
        $.each(todosAcabados, function(index, value) {
            if (value['id'] == idAca) {
                $('#acabado1 #imagenAcabadoPrincipal' + k).remove();
                nombreAcabado = value['nombre'].toLowerCase();
                $('#acabado1').append(
                    '<img  src="data:image/gif;base64,' +
                        value['imagenFondo'] +
                        '" id="imagenAcabadoPrincipal' +
                        k +
                        '" class="' +
                        value['id'] +
                        '" height="60px" width="200px" style=" opacity: 0.7;margin-left:20px">'
                );
                $('#acabado1 #acabadoNombrePrincipal').remove();
                $('#acabado1').append(
                    '<p id="acabadoNombrePrincipal" style="color:black;margin-left: 90px;margin-top: -60px;" >' + value['nombre'] + '</p>'
                );

                $('#datos1').append('<p id="val' + id1 + '">Acabado ' + id1 + '</p>');
                $('#precios1').append('<p id="val' + id1 + 'Dato" class="' + value['id'] + '">' + value['nombre'] + '</p>');
                $('#precioCalculado1').append('<p id="valor' + id1 + '">' + value['precio'] + '</p>');
                k++;
            }
        });
    }

    public cargarPuertas(id) {
        var armarios = this.armarios;
        var dimensiones = this.dimensionesArmarios;
        var ancho = $('#anchoCalculadora').text();
        var anchoPrimero;
        var alto = $('#altoCalculadora').text();
        var idInt = $('#interioresArmarios' + id + ' #idInterior').attr('class');
        $('#altoCalculadora').attr('class', idInt);
        var acabadosProductos = this.acabadosProductos;
        var altoPrimero;
        var modelo = [];
        var numeroPuertas = [];
        var cont = 0;
        var yes = 0;
        for (let j = 0; j < 16; j++) {
            $('#interioresArmarios' + j).css({ 'background-color': 'white' });
        }
        var idNueva = $('#mensajeId' + id).attr('class');
        var interiores = this.interioresArmarios;
        for (let u = 0; u < interiores.length; u++) {
            if (interiores[u]['productosDormitorio']['id'] == idNueva) {
                if (interiores[u]['ancho'] == ancho && interiores[u]['alto'] == alto) {
                    $('#precioDimension').text(interiores[u]['precio']);
                } else {
                    if (interiores[u]['ancho'] > ancho) {
                        if (interiores[u]['alto'] == alto && yes == 0) {
                            $('#precioDimension').text(interiores[u]['precio']);
                            yes++;
                        } else {
                            if (interiores[u]['alto'] > alto && yes == 0) {
                                $('#precioDimension').text(interiores[u]['precio']);
                                yes++;
                            }
                        }
                    }
                }
            }
        }
        var acabadosPuertas = [];
        var contAca = 0;
        for (let i = 0; i < armarios.length; i++) {
            if (armarios[i]['id'] == idNueva) {
                var str = armarios[i]['nombre'];
                var patrón = /[0-9]+/;
                var matches = str.match(patrón);
                for (let k = 0; k < dimensiones.length; k++) {
                    if (dimensiones[k]['productosDormitorio']['id'] == idNueva) {
                        if (modelo[0] == undefined || dimensiones[k]['tipoProducto']['id'] != modelo[cont - 1]['tipoProducto']['id']) {
                            modelo[cont] = dimensiones[k];
                            cont++;
                        }
                    }
                }
                this.tipoPuerta = modelo;
                for (let j = 0; j < matches[0]; j++) {
                    $('#numeroPuertas0').append('<p>Puerta ' + j + '</p>');
                    numeroPuertas[j] = 'Puerta ' + (j + 1);
                }

                for (let h = 0; h < modelo.length; h++) {
                    if (modelo[h]['productosDormitorio']['id'] == idNueva) {
                        for (let u = 0; u < acabadosProductos.length; u++) {
                            if (
                                modelo[h]['productosDormitorio']['id'] == acabadosProductos[u]['productosDormitorio']['id'] &&
                                modelo[h]['tipoProducto']['id'] == acabadosProductos[u]['tipoProducto']['id']
                            ) {
                                acabadosPuertas[contAca] = acabadosProductos[u]['acabados'];
                                contAca++;
                            }
                        }
                    }
                }
                this.numeroPuertas = numeroPuertas;
                this.acabadosPuertas = acabadosPuertas;
                console.log(acabadosPuertas);
            }
        }

        $('#interioresArmarios' + id).css({ 'background-color': '#DFDDDC' });
    }

    public cargarTiradores(id, armario) {
        var tipo1 = [];
        var cont = 0;
        var numero = this.numeroPuertas;
        var saber = 0;
        var valor = [];
        valor = this.valores;
        if ($('input:radio[name=radio' + id + ']:checked').val()) {
            tipo1[cont] = $('input:radio[name=radio' + id + ']:checked').val();
            valor[id] = $('#' + armario + ' #select' + id).val();
            cont++;
        }
        for (let h = 0; h < numero.length; h++) {
            if (valor[h] != '' && valor[h] != undefined) {
                saber = 1;
            } else {
                saber = 0;
            }
        }
        if (saber == 1) {
            alert('bien');
        }

        console.log(valor);
        this.valores = valor;
    }
    ngAfterViewInit() {
        var todasDimensiones = [];
        var apoyo = [];
        var usuarios = [];
        var acabados = [];
        var sistemasApoyo = [];
        var numeroProductos = [];
        var ilu = [];
        var especiales = [];
        $('#producto').append('<datalist id="listaAnchos"></datalist>');
        $('#producto').append('<datalist id="listaAltura"></datalist>');
        for (let i = 920; i < 2020; i + 10) {
            i = i + 10;
            $('#listaAnchos').append('<option value="' + i + '"></option>');
        }
        for (let i = 2190; i < 2600; i + 10) {
            i = i + 10;
            $('#listaAltura').append('<option value="' + i + '"></option>');
        }
        var interiores = [];
        this.interioresArmariosService
            .query({
                size: 100000
            })
            .subscribe(
                (res: HttpResponse<IInterioresArmarios[]>) => {
                    for (let k = 0; k < res.body.length; k++) {
                        interiores[k] = res.body[k];
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.interioresArmarios = interiores;
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
                $('#productoCarrito' + i + ' #precios' + i).append(
                    '<font id="ancho' + i + '" class="' + sesion[1]['id'] + '">' + sesion[1]['ancho'] + '</font>'
                );
                $('#productoCarrito' + i + ' #precios' + i).append('<br>');
                $('#productoCarrito' + i + ' #precioCalculado' + i).append('<font>-</font>');
                $('#productoCarrito' + i + ' #precioCalculado' + i).append('<br>');
                $('#productoCarrito' + i + ' #datos' + i).append('<font>Alto</font>');
                $('#productoCarrito' + i + ' #datos' + i).append('<br>');
                $('#productoCarrito' + i + ' #precios' + i).append(
                    '<font id="alto' + i + '" class="' + sesion[1]['precio'] + '">' + sesion[1]['alto'] + '</font>'
                );
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
                if (sesion[1]['iluminacion'] != undefined) {
                    $('#productoCarrito' + i + ' #datos' + i).append('<font>Iluminacion</font>');
                    $('#productoCarrito' + i + ' #datos' + i).append('<br>');
                    $('#productoCarrito' + i + ' #precios' + i).append(
                        '<font id="iluminacionCarr' + i + '" class="' + sesion[1]['iluminacion']['id'] + '">-</font>'
                    );
                    $('#productoCarrito' + i + ' #precios' + i).append('<br>');
                    $('#productoCarrito' + i + ' #precioCalculado' + i).append(
                        '<font>' + sesion[1]['iluminacion']['precio'] + '&euro;</font>'
                    );
                    $('#productoCarrito' + i + ' #precioCalculado' + i).append('<br>');
                }
            }
        }
        this.medidasEspecialesService
            .query({
                size: 1000000
            })
            .subscribe(data => {
                $.each(data['body'], function(index, value) {
                    especiales[index] = value;
                });
            });
        this.especiales = especiales;
        var datos;
        this.acaProdService
            .query({
                size: 1000000,
                sort: this.sort()
            })
            .subscribe(data => {
                datos = data['body'];
                this.acabadosProductos = datos;
                var contador = 1;
                var contnuevo = 1;
                var u = 1;
                var i = 0;
                $.each(datos, function(index, value) {
                    if (value['productosDormitorio']['id'] == 42) {
                        var idAca = value['id'];
                        for (let m = 0; m < value['acabados'].length; m++) {
                            $('#myModalColores' + u + ' .modal-body #acabadoImagen' + i).append(
                                '<img  src="data:image/gif;base64,' +
                                    value['acabados'][m]['imagenFondo'] +
                                    '" id="imagenAcabado' +
                                    i +
                                    '" class="' +
                                    value['acabados'][m]['id'] +
                                    '" height="160px" width="280px" style=" opacity: 0.7;">'
                            );
                            $('#myModalColores' + u + ' .modal-body #acabadoImagen' + i).append(
                                '<strong><p style="color:white;position: absolute;margin-top: -105px;font-size: 30px;margin-left: 80px;">' +
                                    value['acabados'][m]['nombre'] +
                                    '</strong></p>'
                            );

                            i++;
                            $('.cambiarAca' + u).attr('style');
                            $('.cambiarAca' + u).css({ 'margin-bottom': '35px' });
                            $('.cambiarAca' + u).css({ 'margin-top': '15px' });
                            $('.cambiarAca' + u).text('Cambiar Acabado');
                        }

                        $('#acabado1').append(
                            '<button class="cambiarAcabado" style="margin-bottom:35px;margin-top:15px" class="cambiarAca1" id="color" data-toggle="modal" data-target="#myModalColores' +
                                u +
                                '">Acabado ' +
                                u +
                                '</button>'
                        );
                        $('#acabado1').append(
                            '<img id="imagenAcabadoPrincipal1" src"../../../content/images/blanco.jpg" height="60px" border="0" width="200px" style=" opacity: 0.7;margin-left:20px;"/>'
                        );
                        u++;
                        i = 0;
                        contnuevo++;
                    }
                });
            });
        this.valores = [];
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

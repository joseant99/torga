import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationCancel } from '@angular/router';
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
import { PrecioTiendaService } from '../precio-tienda/precio-tienda.service';
import { IPrecioTienda } from 'app/shared/model/precio-tienda.model';
import { PrecioTiendaProductosService } from '../precio-tienda-productos/precio-tienda-productos.service';

@Component({
    selector: 'jhi-productos-dormitorio',
    templateUrl: './productos-buscador.component.html'
})
export class ProductosBuscadorComponent implements OnInit, OnDestroy {
    currentAccount: any;
    productosDormitorios: IProductosDormitorio[];
    dimensionesProductos: IDimensionesProducto[];
    productosDormitorioPrueba: IProductosDormitorio;
    error: any;
    success: any;
    apoyo: any;
    isSaving: boolean;
    especiales: any;
    acaProd: IAcaProd;
    iluminacion: any;
    acabados: any;
    todosAcabados: any;
    acaProdsCar: any;
    ruta: any;

    acaProdPed: any;
    precioTienda: any;
    presupuestoPedido: IPresupuestoPedido;
    presupuesto: any;
    productosPresupuestoPedidos: IProductosPresupuestoPedidos;
    user: any;
    todasDimensiones: any;
    interiores: any;
    routeData: any;
    links: any;
    precioTienda1: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    sistemasApoyo: any;
    page: any;
    predicate: any;
    anchos: any;
    alturas: any;
    fondos: any;
    previousPage: any;
    reverse: any;
    eventSubscriber: any;

    constructor(
        protected tiposApoyoService: TiposApoyoService,
        protected medidasEspecialesService: MedidasEspecialesService,
        protected dimensionesProductoTipoService: DimensionesProductoTipoService,
        protected acabadosService: AcabadosService,
        protected precioTiendaService: PrecioTiendaService,
        protected iluminacionProdPrePedService: IluminacionProdPrePedService,
        protected iluminacionService: IluminacionService,
        protected precioTiendaProductosService: PrecioTiendaProductosService,
        protected medEspProductoPedidoPresuService: MedEspProductoPedidoPresuService,
        protected interioresService: InterioresService,
        protected acabadosProductosPresupuestoPedidoService: AcabadosProductosPresupuestoPedidoService,
        protected acaProdService: AcaProdService,
        protected productosPresupuestoPedidosService: ProductosPresupuestoPedidosService,
        protected presupuestoPedidoService: PresupuestoPedidoService,
        protected userService: UserService,
        protected dimensionesProductoService: DimensionesProductoService,
        public productosDormitorioService: ProductosDormitorioService,
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
    public cargarDimen() {
        var precioTienda1;
        $('.dimensionesColor1').css({ 'background-color': 'white' });
        $('#imagenAcabado').remove();
        $('#acabado').css({ display: 'none' });
        $('.productosColor').css({ 'background-color': 'white' });
        $('#nombreApoyoTitulo').css({ display: 'none' });
        for (let i = 1; i <= 5; i++) {
            $('.apoyoCogido' + i).empty();
        }
        for (let i = 1; i <= 15; i++) {
            $('#aca1' + i).empty();
        }
        precioTienda1 = localStorage.getItem('preciosTiendas');
        var precioTienda = this.precioTienda;
        var nombre = $('#anchosSelect').val();
        $('.dimensionesColor1').empty();
        this.dimensionesProductoTipoService.findDimensionNombre(nombre).subscribe(data => {
            var datos = data.body[0];
            this.todasDimensiones = data.body;
            $('.dimensionesColor1').css({ border: '1px solid #dfdddc' });
            var productoNombre = datos.productosDormitorio.nombre;
            var precio = 0;
            precio = datos['precio'];
            precio = precio * precioTienda1;
            precio = precio * precioTienda;
            precio = Math.round(precio * 100) / 100;
            $('.dimensionesColor1').append(
                '<p style="text-align:center" id="' +
                    datos['id'] +
                    '" class="dimensionesId1">' +
                    datos['mensaje'] +
                    '</p><hr style="color:black;margin-left:50px;width:80%"></hr><p style="position:absolute;z-index:1"><strong>Desde ' +
                    precio +
                    '&euro;</strong></p>'
            );
            $('.dimensionesColor1').append(
                '<img  src="data:image/gif;base64,' +
                    datos['imagen'] +
                    '" id="imagenDimensiones" class="' +
                    datos['id'] +
                    '" width="500px" height="283.73px" style=" opacity: 0.7;">'
            );

            $('.dimensionesColor1').append(
                '<div id="interiorMuebles" onclick="interior(1)" ><img width="16px" height="16px" src="../../../content/images/informacion.png"></div>'
            );

            var nombreProductoEditado = productoNombre.split(' ')[0];
            $('#nombreMesita').text(nombreProductoEditado);
            $('#nombreMesita').attr('class', datos.productosDormitorio.id);
            $('#calculadora').attr('class', 'container tab-pane fade active show');
            this.dimensionesProductoTipoService.todos = datos;
        });
    }
    public borrarProdCalculadora() {
        $('#productoCalculadora1 #precios1').empty();
        $('#productoCalculadora1 #precioCalculado1').empty();
        $('#productoCalculadora1 #datos1').empty();
        $('#nombreMesita').empty();
        $('#precioDimension').empty();
        $('#imagenAcabadoPrincipal').empty();
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

    public open(producto, productoNombre) {
        for (let i = 1; i <= 14; i++) {
            for (let u = 0; u < 14; u++) {
                $('#myModalColores' + i + ' #acabadoImagen' + u).empty();
            }
        }
        var precioFinalProd = 0;
        var todosProdPre = this.precioTiendaProductosService.todos;
        for (let i = 0; i < todosProdPre.length; i++) {
            if (todosProdPre[i][2] == producto) {
                precioFinalProd = todosProdPre[i][1] + 100;
                precioFinalProd = precioFinalProd / 100;
                this.precioTienda = precioFinalProd;
            }
        }
        this.todasDimensiones = this.dimensionesProductoTipoService.todos;
        this.especiales = this.medidasEspecialesService.todos;
        $('#imagenAcabadoPrincipal').empty();
        $('#calculadora').attr('class', 'container tab-pane fade active show');
        $('#dimensiones #medidas').removeAttr('style');
        $('#dimensiones #medidas').attr('style');
        $('#dimensiones #medidas').css({ 'text-align': 'center' });
        $('#dimensiones #medidas').css({ 'margin-top': '5%' });
        $('#dimensiones #medidas').css({ 'margin-bottom': '5%' });
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
        $('#textoFinal').removeAttr('style');
        $('#textoFinal').attr('style');
        $('#textoFinal').css({ display: 'none' });
        $('.dimensionesColor5').empty();
        $('.dimensionesColor6').empty();
        $('.dimensionesColor1').css({ 'background-color': 'white' });
        $('.dimensionesColor2').css({ 'background-color': 'white' });
        $('.dimensionesColor3').css({ 'background-color': 'white' });
        $('.dimensionesColor4').css({ 'background-color': 'white' });
        $('.dimensionesColor5').css({ 'background-color': 'white' });
        $('.dimensionesColor6').css({ 'background-color': 'white' });
        $('#imagenAcabado').remove();
        $('#acabado').css({ display: 'none' });
        $('.productosColor').css({ 'background-color': 'white' });
        $('#nombreApoyoTitulo').css({ display: 'none' });
        for (let i = 1; i <= 5; i++) {
            $('.apoyoCogido' + i).empty();
        }
        for (let i = 1; i <= 15; i++) {
            $('#aca1' + i).empty();
        }
        var dimensionesPrueba = this.todasDimensiones;
        var precioTienda1;
        precioTienda1 = localStorage.getItem('preciosTiendas');
        var precioTienda = this.precioTienda;

        this.dimensionesProductoTipoService.findProducto(producto).subscribe(data => {
            this.dimensionesProductoTipoService.todos = data.body;
            this.todasDimensiones = data.body;
            var cont = 0;
            var dimensionesPrueba;
            dimensionesPrueba = data.body;
            var datos = dimensionesPrueba;

            for (let i = 0; i < datos.length; i++) {
                if (producto == datos[i]['productosDormitorio']['id']) {
                    $('.dimensionesColor' + (cont + 1)).css({ border: '1px solid #dfdddc' });

                    if (cont == 0) {
                        var image = document.createElement('img');
                        var precio = parseFloat(datos[i]['precio']);
                        precio = precio * precioTienda1;
                        precio = precio * precioTienda;
                        precio = Math.round(precio * 100) / 100;
                        image.src = 'data:image/gif;base64,' + datos[i]['imagen'];
                        image.id = 'imagenDimensiones';
                        $('.dimensionesColor1').append(
                            '<p style="text-align:center" id="' +
                                datos[i]['id'] +
                                '" class="dimensionesId1">' +
                                datos[i]['mensaje'] +
                                '</p><hr style="color:black;margin-left:50px;width:80%"></hr><p style="position:absolute;z-index:1"><strong>Desde ' +
                                precio +
                                '&euro;</strong></p>'
                        );
                        $('.dimensionesColor1').append(
                            '<img  src="data:image/gif;base64,' +
                                datos[i]['imagen'] +
                                '" id="imagenDimensiones" class="' +
                                datos[i]['id'] +
                                '" width="500px" height="283.73px" style=" opacity: 0.7;">'
                        );

                        $('.dimensionesColor1').append(
                            '<div id="interiorMuebles" onclick="interior(1)" ><img width="16px" height="16px" src="../../../content/images/informacion.png"></div>'
                        );
                    }
                    if (cont == 1) {
                        var image = document.createElement('img');
                        var precio = parseFloat(datos[i]['precio']);
                        precio = precio * precioTienda1;
                        precio = precio * precioTienda;
                        precio = Math.round(precio * 100) / 100;
                        image.src = 'data:image/gif;base64,' + datos[i]['imagen'];
                        image.id = 'imagenDimensiones';
                        $('.dimensionesColor2').append(
                            '<p style="text-align:center" id="' +
                                datos[i]['id'] +
                                '" class="dimensionesId1">' +
                                datos[i]['mensaje'] +
                                '</p><hr style="color:black;margin-left:50px;width:80%"></hr><p style="position:absolute;z-index:1"><strong>Desde ' +
                                precio +
                                '&euro;</strong></p>'
                        );
                        $('.dimensionesColor2').append(
                            '<img  src="data:image/gif;base64,' +
                                datos[i]['imagen'] +
                                '" id="imagenDimensiones" class="' +
                                datos[i] +
                                '" width="500px" height="283.73px"  style=" opacity: 0.7;">'
                        );
                        $('.dimensionesColor2').append(
                            '<div id="interiorMuebles" onclick="interior(2)" ><img width="16px" height="16px" src="../../../content/images/informacion.png"></div>'
                        );
                    }
                    if (cont == 2) {
                        var image = document.createElement('img');
                        var precio = parseFloat(datos[i]['precio']);
                        precio = precio * precioTienda1;
                        precio = precio * precioTienda;
                        precio = Math.round(precio * 100) / 100;
                        image.src = 'data:image/gif;base64,' + datos[i]['imagen'];
                        image.id = 'imagenDimensiones';
                        $('.dimensionesColor3').append(
                            '<p style="text-align:center" id="' +
                                datos[i]['id'] +
                                '" class="dimensionesId3">' +
                                datos[i]['mensaje'] +
                                '</p><hr style="color:black;margin-left:50px;width:80%"></hr><p style="position:absolute;z-index:1"><strong>Desde ' +
                                precio +
                                '&euro;</strong></p>'
                        );
                        $('.dimensionesColor3').append(
                            '<img  src="data:image/gif;base64,' +
                                datos[i]['imagen'] +
                                '" id="imagenDimensiones" class="' +
                                datos[i] +
                                '" width="500px" height="283.73px" style=" opacity: 0.7;">'
                        );
                        $('.dimensionesColor3').append(
                            '<div id="interiorMuebles" onclick="interior(3)" ><img width="16px" height="16px" src="../../../content/images/informacion.png"></div>'
                        );
                    }
                    if (cont == 3) {
                        var image = document.createElement('img');
                        var precio = parseFloat(datos[i]['precio']);
                        precio = precio * precioTienda1;
                        precio = precio * precioTienda;
                        precio = Math.round(precio * 100) / 100;
                        image.src = 'data:image/gif;base64,' + datos[i]['imagen'];
                        image.id = 'imagenDimensiones';
                        $('.dimensionesColor4').append(
                            '<p style="text-align:center" id="' +
                                datos[i]['id'] +
                                '" class="dimensionesId4">' +
                                datos[i]['mensaje'] +
                                '</p><hr style="color:black;margin-left:50px;width:80%"></hr><p style="position:absolute;z-index:1"><strong>Desde ' +
                                precio +
                                '&euro;</strong></p>'
                        );
                        $('.dimensionesColor4').append(
                            '<img  src="data:image/gif;base64,' +
                                datos[i]['imagen'] +
                                '" id="imagenDimensiones" class="' +
                                datos[i] +
                                '" width="500px" height="283.73px" style=" opacity: 0.7;">'
                        );
                        $('.dimensionesColor4').append(
                            '<div id="interiorMuebles" onclick="interior(4)"  ><img width="16px" height="16px" src="../../../content/images/informacion.png"></div>'
                        );
                    }
                    if (cont == 4) {
                        var image = document.createElement('img');
                        var precio = parseFloat(datos[i]['precio']);
                        precio = precio * precioTienda1;
                        precio = precio * precioTienda;
                        precio = Math.round(precio * 100) / 100;
                        image.src = 'data:image/gif;base64,' + datos[i]['imagen'];
                        image.id = 'imagenDimensiones';
                        $('.dimensionesColor5').append(
                            '<p style="text-align:center" id="' +
                                datos[i]['id'] +
                                '" class="dimensionesId5">' +
                                datos[i]['mensaje'] +
                                '</p><hr style="color:black;margin-left:50px;width:80%"></hr><p style="position:absolute;z-index:1"><strong>Desde ' +
                                precio +
                                '&euro;</strong></p>'
                        );
                        $('.dimensionesColor5').append(
                            '<img  src="data:image/gif;base64,' +
                                datos[i]['imagen'] +
                                '" id="imagenDimensiones" class="' +
                                datos[i] +
                                '" width="500px" height="283.73px"  style=" opacity: 0.7;">'
                        );
                        $('.dimensionesColor5').append(
                            '<div id="interiorMuebles" onclick="interior(5)" ><img width="16px" height="16px" src="../../../content/images/informacion.png"></div>'
                        );
                    }
                    if (cont == 5) {
                        var image = document.createElement('img');
                        var precio = parseFloat(datos[i]['precio']);
                        precio = precio * precioTienda1;
                        precio = precio * precioTienda;
                        precio = Math.round(precio * 100) / 100;
                        image.src = 'data:image/gif;base64,' + datos[i]['imagen'];
                        image.id = 'imagenDimensiones';
                        $('.dimensionesColor6').append(
                            '<p style="text-align:center" id="' +
                                datos[i]['id'] +
                                '" class="dimensionesId6">' +
                                datos[i]['mensaje'] +
                                '</p><hr style="color:black;margin-left:50px;width:80%"></hr><p style="position:absolute;z-index:1"><strong>Desde ' +
                                precio +
                                '&euro;</strong></p>'
                        );
                        $('.dimensionesColor6').append(
                            '<img  src="data:image/gif;base64,' +
                                datos[i]['imagen'] +
                                '" id="imagenDimensiones" class="' +
                                datos[i] +
                                '"width="500px" height="283.73px"  style=" opacity: 0.7;">'
                        );
                        $('.dimensionesColor6').append(
                            '<div id="interiorMuebles" onclick="interior(6)" ><img width="16px" height="16px" src="../../../content/images/informacion.png"></div>'
                        );
                    }
                    cont++;
                }
            }
        });

        $('.productosColor').css({ 'background-color': 'white' });
        $('#' + producto).css({ 'background-color': '#DFDDDC' });
        var nombreProductoEditado = productoNombre.split(' ')[0];
        $('#nombreMesita').text(nombreProductoEditado);
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
        $('#iluminacion').removeAttr('style');
        $('#iluminacion').attr('style');
        $('#iluminacion').css({ display: 'none' });
        var acaprodCont = 0;
        var acaProdSer = [];
    }

    public open1(producto1) {
        for (let i = 1; i <= 14; i++) {
            for (let u = 0; u < 14; u++) {
                $('#myModalColores' + i + ' #acabadoImagen' + u).empty();
            }
        }
        var productoprueba = $('#nombreMesita' + producto1).attr('class');
        var idDimen = productoprueba.split(' ')[1];
        var producto = productoprueba.split(' ')[0];
        this.todasDimensiones = this.dimensionesProductoTipoService.todos;
        this.especiales = this.medidasEspecialesService.todos;
        $('#imagenAcabadoPrincipal').empty();
        $('#calculadora').attr('class', 'container tab-pane fade active show');
        $('#dimensiones #medidas').removeAttr('style');
        $('#dimensiones #medidas').attr('style');
        $('#dimensiones #medidas').css({ 'text-align': 'center' });
        $('#dimensiones #medidas').css({ 'margin-top': '5%' });
        $('#dimensiones #medidas').css({ 'margin-bottom': '5%' });
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
        $('#textoFinal').removeAttr('style');
        $('#textoFinal').attr('style');
        $('#textoFinal').css({ display: 'none' });
        $('.dimensionesColor5').empty();
        $('.dimensionesColor6').empty();
        $('.dimensionesColor1').css({ 'background-color': 'white' });
        $('.dimensionesColor2').css({ 'background-color': 'white' });
        $('.dimensionesColor3').css({ 'background-color': 'white' });
        $('.dimensionesColor4').css({ 'background-color': 'white' });
        $('.dimensionesColor5').css({ 'background-color': 'white' });
        $('.dimensionesColor6').css({ 'background-color': 'white' });
        $('#imagenAcabado').remove();
        $('#acabado').css({ display: 'none' });
        $('.productosColor').css({ 'background-color': 'white' });
        $('#nombreApoyoTitulo').css({ display: 'none' });
        for (let i = 1; i <= 5; i++) {
            $('.apoyoCogido' + i).empty();
        }
        for (let i = 1; i <= 15; i++) {
            $('#aca1' + i).empty();
        }
        var dimensionesPrueba = this.todasDimensiones;
        var precioTienda1;
        precioTienda1 = localStorage.getItem('preciosTiendas');
        var precioTienda = this.precioTienda;

        var alturaFiltrado = $('.selectectAltura').text();
        var anchoFiltrado = $('.selectectAncho').text();

        if (anchoFiltrado != 'Indiferente') {
            this.dimensionesProductoTipoService.findDimension(idDimen).subscribe(data => {
                this.dimensionesProductoTipoService.todos = data.body;
                var cont = 0;
                var dimensionesPrueba;
                dimensionesPrueba = data.body;
                var datos = dimensionesPrueba;

                for (let i = 0; i < datos.length; i++) {
                    if (producto == datos[i]['productosDormitorio']['id']) {
                        $('#nombreMesita').text(datos[i]['productosDormitorio']['nombre']);
                        $('.dimensionesColor' + (cont + 1)).css({ border: '1px solid #dfdddc' });

                        if (cont == 0) {
                            var image = document.createElement('img');
                            var precio = parseFloat(datos[i]['precio']);
                            precio = precio * precioTienda1;
                            precio = precio * precioTienda;
                            precio = Math.round(precio * 100) / 100;
                            image.src = 'data:image/gif;base64,' + datos[i]['imagen'];
                            image.id = 'imagenDimensiones';
                            $('.dimensionesColor1').append(
                                '<p style="text-align:center" id="' +
                                    datos[i]['id'] +
                                    '" class="dimensionesId1">' +
                                    datos[i]['mensaje'] +
                                    '</p><hr style="color:black;margin-left:50px;width:80%"></hr><p style="position:absolute;z-index:1"><strong>Desde ' +
                                    precio +
                                    '&euro;</strong></p>'
                            );
                            $('.dimensionesColor1').append(
                                '<img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i]['id'] +
                                    '" width="500px" height="283.73px" style=" opacity: 0.7;">'
                            );

                            $('.dimensionesColor1').append(
                                '<div id="interiorMuebles" onclick="interior(1)" ><img width="16px" height="16px" src="../../../content/images/informacion.png"></div>'
                            );
                        }
                        if (cont == 1) {
                            var image = document.createElement('img');
                            var precio = parseFloat(datos[i]['precio']);
                            precio = precio * precioTienda1;
                            precio = precio * precioTienda;
                            precio = Math.round(precio * 100) / 100;
                            image.src = 'data:image/gif;base64,' + datos[i]['imagen'];
                            image.id = 'imagenDimensiones';

                            $('.dimensionesColor2').append(
                                '<p style="text-align:center" id="' +
                                    datos[i]['id'] +
                                    '" class="dimensionesId1">' +
                                    datos[i]['mensaje'] +
                                    '</p><hr style="color:black;margin-left:50px;width:80%"></hr><p style="position:absolute;z-index:1"><strong>Desde ' +
                                    precio +
                                    '&euro;</strong></p>'
                            );
                            $('.dimensionesColor2').append(
                                '<img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i] +
                                    '" width="500px" height="283.73px"  style=" opacity: 0.7;">'
                            );
                            $('.dimensionesColor2').append(
                                '<div id="interiorMuebles" onclick="interior(2)" ><img width="16px" height="16px" src="../../../content/images/informacion.png"></div>'
                            );
                        }
                        if (cont == 2) {
                            var image = document.createElement('img');
                            var precio = parseFloat(datos[i]['precio']);
                            precio = precio * precioTienda1;
                            precio = precio * precioTienda;
                            precio = Math.round(precio * 100) / 100;
                            image.src = 'data:image/gif;base64,' + datos[i]['imagen'];
                            image.id = 'imagenDimensiones';
                            $('.dimensionesColor3').append(
                                '<p style="text-align:center" id="' +
                                    datos[i]['id'] +
                                    '" class="dimensionesId3">' +
                                    datos[i]['mensaje'] +
                                    '</p><hr style="color:black;margin-left:50px;width:80%"></hr><p style="position:absolute;z-index:1"><strong>Desde ' +
                                    precio +
                                    '&euro;</strong></p>'
                            );
                            $('.dimensionesColor3').append(
                                '<img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i] +
                                    '" width="500px" height="283.73px" style=" opacity: 0.7;">'
                            );
                            $('.dimensionesColor3').append(
                                '<div id="interiorMuebles" onclick="interior(3)" ><img width="16px" height="16px" src="../../../content/images/informacion.png"></div>'
                            );
                        }
                        if (cont == 3) {
                            var image = document.createElement('img');
                            var precio = parseFloat(datos[i]['precio']);
                            precio = precio * precioTienda1;
                            precio = precio * precioTienda;
                            precio = Math.round(precio * 100) / 100;
                            image.src = 'data:image/gif;base64,' + datos[i]['imagen'];
                            image.id = 'imagenDimensiones';
                            $('.dimensionesColor4').append(
                                '<p style="text-align:center" id="' +
                                    datos[i]['id'] +
                                    '" class="dimensionesId4">' +
                                    datos[i]['mensaje'] +
                                    '</p><hr style="color:black;margin-left:50px;width:80%"></hr><p style="position:absolute;z-index:1"><strong>Desde ' +
                                    precio +
                                    '&euro;</strong></p>'
                            );
                            $('.dimensionesColor4').append(
                                '<img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i] +
                                    '" width="500px" height="283.73px" style=" opacity: 0.7;">'
                            );
                            $('.dimensionesColor4').append(
                                '<div id="interiorMuebles" onclick="interior(4)"  ><img width="16px" height="16px" src="../../../content/images/informacion.png"></div>'
                            );
                        }
                        if (cont == 4) {
                            var image = document.createElement('img');
                            var precio = parseFloat(datos[i]['precio']);
                            precio = precio * precioTienda1;
                            precio = precio * precioTienda;
                            precio = Math.round(precio * 100) / 100;
                            image.src = 'data:image/gif;base64,' + datos[i]['imagen'];
                            image.id = 'imagenDimensiones';
                            $('.dimensionesColor5').append(
                                '<p style="text-align:center" id="' +
                                    datos[i]['id'] +
                                    '" class="dimensionesId5">' +
                                    datos[i]['mensaje'] +
                                    '</p><hr style="color:black;margin-left:50px;width:80%"></hr><p style="position:absolute;z-index:1"><strong>Desde ' +
                                    precio +
                                    '&euro;</strong></p>'
                            );
                            $('.dimensionesColor5').append(
                                '<img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i] +
                                    '" width="500px" height="283.73px"  style=" opacity: 0.7;">'
                            );
                            $('.dimensionesColor5').append(
                                '<div id="interiorMuebles" onclick="interior(5)" ><img width="16px" height="16px" src="../../../content/images/informacion.png"></div>'
                            );
                        }
                        if (cont == 5) {
                            var image = document.createElement('img');
                            var precio = parseFloat(datos[i]['precio']);
                            precio = precio * precioTienda1;
                            precio = precio * precioTienda;
                            precio = Math.round(precio * 100) / 100;
                            image.src = 'data:image/gif;base64,' + datos[i]['imagen'];
                            image.id = 'imagenDimensiones';
                            $('.dimensionesColor6').append(
                                '<p style="text-align:center" id="' +
                                    datos[i]['id'] +
                                    '" class="dimensionesId6">' +
                                    datos[i]['mensaje'] +
                                    '</p><hr style="color:black;margin-left:50px;width:80%"></hr><p style="position:absolute;z-index:1"><strong>Desde ' +
                                    precio +
                                    '&euro;</strong></p>'
                            );
                            $('.dimensionesColor6').append(
                                '<img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i] +
                                    '"width="500px" height="283.73px"  style=" opacity: 0.7;">'
                            );
                            $('.dimensionesColor6').append(
                                '<div id="interiorMuebles" onclick="interior(6)" ><img width="16px" height="16px" src="../../../content/images/informacion.png"></div>'
                            );
                        }
                        cont++;
                    }
                }
            });
        } else {
            var productoNombre;
            this.dimensionesProductoTipoService.findProducto(producto).subscribe(data => {
                this.dimensionesProductoTipoService.todos = data.body;
                var cont = 0;
                var dimensionesPrueba;
                dimensionesPrueba = data.body;
                var datos = dimensionesPrueba;

                for (let i = 0; i < datos.length; i++) {
                    if (producto == datos[i]['productosDormitorio']['id']) {
                        productoNombre = datos[i]['productosDormitorio']['nombre'];
                        $('.dimensionesColor' + (cont + 1)).css({ border: '1px solid #dfdddc' });

                        if (cont == 0) {
                            var image = document.createElement('img');
                            var precio = parseFloat(datos[i]['precio']);
                            precio = precio * precioTienda1;
                            precio = precio * precioTienda;
                            precio = Math.round(precio * 100) / 100;
                            image.src = 'data:image/gif;base64,' + datos[i]['imagen'];
                            image.id = 'imagenDimensiones';
                            $('.dimensionesColor1').append(
                                '<p style="text-align:center" id="' +
                                    datos[i]['id'] +
                                    '" class="dimensionesId1">' +
                                    datos[i]['mensaje'] +
                                    '</p><hr style="color:black;margin-left:50px;width:80%"></hr><p style="position:absolute;z-index:1"><strong>Desde ' +
                                    precio +
                                    '&euro;</strong></p>'
                            );
                            $('.dimensionesColor1').append(
                                '<img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i]['id'] +
                                    '" width="500px" height="283.73px" style=" opacity: 0.7;">'
                            );

                            $('.dimensionesColor1').append(
                                '<div id="interiorMuebles" onclick="interior(1)" ><img width="16px" height="16px" src="../../../content/images/informacion.png"></div>'
                            );
                        }
                        if (cont == 1) {
                            var image = document.createElement('img');
                            var precio = parseFloat(datos[i]['precio']);
                            precio = precio * precioTienda1;
                            precio = precio * precioTienda;
                            precio = Math.round(precio * 100) / 100;
                            image.src = 'data:image/gif;base64,' + datos[i]['imagen'];
                            image.id = 'imagenDimensiones';

                            $('.dimensionesColor2').append(
                                '<p style="text-align:center" id="' +
                                    datos[i]['id'] +
                                    '" class="dimensionesId1">' +
                                    datos[i]['mensaje'] +
                                    '</p><hr style="color:black;margin-left:50px;width:80%"></hr><p style="position:absolute;z-index:1"><strong>Desde ' +
                                    precio +
                                    '&euro;</strong></p>'
                            );
                            $('.dimensionesColor2').append(
                                '<img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i] +
                                    '" width="500px" height="283.73px"  style=" opacity: 0.7;">'
                            );
                            $('.dimensionesColor2').append(
                                '<div id="interiorMuebles" onclick="interior(2)" ><img width="16px" height="16px" src="../../../content/images/informacion.png"></div>'
                            );
                        }
                        if (cont == 2) {
                            var image = document.createElement('img');
                            var precio = parseFloat(datos[i]['precio']);
                            precio = precio * precioTienda1;
                            precio = precio * precioTienda;
                            precio = Math.round(precio * 100) / 100;
                            image.src = 'data:image/gif;base64,' + datos[i]['imagen'];
                            image.id = 'imagenDimensiones';
                            $('.dimensionesColor3').append(
                                '<p style="text-align:center" id="' +
                                    datos[i]['id'] +
                                    '" class="dimensionesId3">' +
                                    datos[i]['mensaje'] +
                                    '</p><hr style="color:black;margin-left:50px;width:80%"></hr><p style="position:absolute;z-index:1"><strong>Desde ' +
                                    precio +
                                    '&euro;</strong></p>'
                            );
                            $('.dimensionesColor3').append(
                                '<img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i] +
                                    '" width="500px" height="283.73px" style=" opacity: 0.7;">'
                            );
                            $('.dimensionesColor3').append(
                                '<div id="interiorMuebles" onclick="interior(3)" ><img width="16px" height="16px" src="../../../content/images/informacion.png"></div>'
                            );
                        }
                        if (cont == 3) {
                            var image = document.createElement('img');
                            var precio = parseFloat(datos[i]['precio']);
                            precio = precio * precioTienda1;
                            precio = precio * precioTienda;
                            precio = Math.round(precio * 100) / 100;
                            image.src = 'data:image/gif;base64,' + datos[i]['imagen'];
                            image.id = 'imagenDimensiones';
                            $('.dimensionesColor4').append(
                                '<p style="text-align:center" id="' +
                                    datos[i]['id'] +
                                    '" class="dimensionesId4">' +
                                    datos[i]['mensaje'] +
                                    '</p><hr style="color:black;margin-left:50px;width:80%"></hr><p style="position:absolute;z-index:1"><strong>Desde ' +
                                    precio +
                                    '&euro;</strong></p>'
                            );
                            $('.dimensionesColor4').append(
                                '<img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i] +
                                    '" width="500px" height="333px" style=" opacity: 0.7;">'
                            );
                            $('.dimensionesColor4').append(
                                '<div id="interiorMuebles" onclick="interior(4)"  ><img width="16px" height="16px" src="../../../content/images/informacion.png"></div>'
                            );
                        }
                        if (cont == 4) {
                            var image = document.createElement('img');
                            var precio = parseFloat(datos[i]['precio']);
                            precio = precio * precioTienda1;
                            precio = precio * precioTienda;
                            precio = Math.round(precio * 100) / 100;
                            image.src = 'data:image/gif;base64,' + datos[i]['imagen'];
                            image.id = 'imagenDimensiones';
                            $('.dimensionesColor5').append(
                                '<p style="text-align:center" id="' +
                                    datos[i]['id'] +
                                    '" class="dimensionesId5">' +
                                    datos[i]['mensaje'] +
                                    '</p><hr style="color:black;margin-left:50px;width:80%"></hr><p style="position:absolute;z-index:1"><strong>Desde ' +
                                    precio +
                                    '&euro;</strong></p>'
                            );
                            $('.dimensionesColor5').append(
                                '<img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i] +
                                    '" width="500px" height="283.73px"  style=" opacity: 0.7;">'
                            );
                            $('.dimensionesColor5').append(
                                '<div id="interiorMuebles" onclick="interior(5)" ><img width="16px" height="16px" src="../../../content/images/informacion.png"></div>'
                            );
                        }
                        if (cont == 5) {
                            var image = document.createElement('img');
                            var precio = parseFloat(datos[i]['precio']);
                            precio = precio * precioTienda1;
                            precio = precio * precioTienda;
                            precio = Math.round(precio * 100) / 100;
                            image.src = 'data:image/gif;base64,' + datos[i]['imagen'];
                            image.id = 'imagenDimensiones';
                            $('.dimensionesColor6').append(
                                '<p style="text-align:center" id="' +
                                    datos[i]['id'] +
                                    '" class="dimensionesId6">' +
                                    datos[i]['mensaje'] +
                                    '</p><hr style="color:black;margin-left:50px;width:80%"></hr><p style="position:absolute;z-index:1"><strong>Desde ' +
                                    precio +
                                    '&euro;</strong></p>'
                            );
                            $('.dimensionesColor6').append(
                                '<img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i] +
                                    '"width="500px" height="283.73px"  style=" opacity: 0.7;">'
                            );
                            $('.dimensionesColor6').append(
                                '<div id="interiorMuebles" onclick="interior(6)" ><img width="16px" height="16px" src="../../../content/images/informacion.png"></div>'
                            );
                        }
                        cont++;
                    }
                }
            });
        }
        $('.productoColor').css({ 'background-color': 'white' });
        $('#prod' + producto1).css({ 'background-color': '#DFDDDC' });
        var nombreProductoEditado = productoNombre.split(' ')[0];
        $('#nombreMesita').text(nombreProductoEditado);
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
        $('#iluminacion').removeAttr('style');
        $('#iluminacion').attr('style');
        $('#iluminacion').css({ display: 'none' });
        var acaprodCont = 0;
        var acaProdSer = [];
    }

    public filtroAncho(id, filtro) {
        $('.productoColor').css({ 'background-color': 'white' });
        $('#productoCalculadora1 #precios1').empty();
        $('#productoCalculadora1 #precioCalculado1').empty();
        $('#productoCalculadora1 #datos1').empty();
        $('#nombreMesita').empty();
        $('#precioDimension').empty();
        $('#imagenAcabadoPrincipal').empty();
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
        if (filtro == 'ancho') {
            var altura = $('.selectectAltura').text();

            if (id == 0 && altura == 'Indiferente') {
                for (let i = 1; i <= 24; i++) {
                    $('#prod' + i).empty();
                }
                $('#ProductosCargados').css({ display: 'block' });
                $('#ProductosCargados1').css({ display: 'block' });
                $('#ancho0').attr('class', 'selectectAncho');
                $('#ancho1').removeAttr('class');
                $('#ancho2').removeAttr('class');
                $('#ancho3').removeAttr('class');
                $('#ancho4').removeAttr('class');
                $('#ancho5').removeAttr('class');
                $('#ancho6').removeAttr('class');
            } else {
                if (altura != 'Indiferente' && id == 0) {
                    for (let i = 1; i <= 24; i++) {
                        $('#prod' + i).empty();
                    }
                    $('#ancho0').attr('class', 'selectectAncho');
                    $('#ancho1').removeAttr('class');
                    $('#ancho2').removeAttr('class');
                    $('#ancho3').removeAttr('class');
                    $('#ancho4').removeAttr('class');
                    $('#ancho5').removeAttr('class');
                    $('#ancho6').removeAttr('class');
                    var idAux = [];
                    var saberNumero = 1;
                    var alturaFiltrado = $('.selectectAltura').text();
                    this.dimensionesProductoTipoService.findFiltroAltura(8, alturaFiltrado).subscribe(data => {
                        var contador = 1;
                        $.each(data['body'], function(index, value) {
                            if (idAux[0] == undefined) {
                                idAux[0] = value[4]['id'];
                            }
                            for (let i = 0; i < contador; i++) {
                                if (idAux[i] != value[4]['id']) {
                                    if (saberNumero != 0) {
                                        saberNumero = 1;
                                    }
                                } else {
                                    saberNumero = 0;
                                }
                            }
                            if (idAux[1] == undefined) {
                                saberNumero = 1;
                            }
                            if (saberNumero == 1) {
                                idAux[idAux.length] = value[4]['id'];
                                $('#ProductosCargados').css({ display: 'none' });
                                $('#ProductosCargados1').css({ display: 'none' });
                                $('#prod' + contador).append(
                                    '<div id="productosDormitorioCargados" class="prodDiv' + contador + '"></div>'
                                );
                                var imagen = value[4]['imagen'];
                                $('.prodDiv' + contador).append(
                                    '<p id="nombreMesita' +
                                        contador +
                                        '" class="' +
                                        value[4]['id'] +
                                        ' ' +
                                        value[5] +
                                        '" style="text-align:center">' +
                                        value[4]['nombre'] +
                                        '-' +
                                        value[0] +
                                        '</p><hr style="width:100%;color:black"></hr><p style="position:absolute"><strong>Desde ' +
                                        value[3] +
                                        '</strong>&euro;</p>'
                                );
                                $('.prodDiv' + contador).append(
                                    '<img class="producto" id="imagenProd" src="data:image/gif;base64,' +
                                        imagen +
                                        '" id="imagenProd" width="500px" height="333px"  style=" opacity: 0.7">'
                                );
                                $('#prod' + contador).css({ border: '1px solid #dfdddc' });
                                contador++;
                                saberNumero = 1;
                            } else {
                                saberNumero = 1;
                            }
                        });
                    });
                }
            }
            if (id != 0) {
                if (altura == 'Indiferente') {
                    $('#ancho0').removeAttr('class');
                    $('#ancho1').removeAttr('class');
                    $('#ancho2').removeAttr('class');
                    $('#ancho3').removeAttr('class');
                    $('#ancho4').removeAttr('class');
                    $('#ancho5').removeAttr('class');
                    $('#ancho6').removeAttr('class');
                    for (let i = 1; i <= 24; i++) {
                        $('#prod' + i).empty();
                    }
                    $('#ancho' + id).attr('class', 'selectectAncho');
                    var anchoFiltrado = $('.selectectAncho').text();
                    this.dimensionesProductoTipoService.findFiltro(8, anchoFiltrado).subscribe(data => {
                        var contador = 1;
                        $.each(data['body'], function(index, value) {
                            $('#ProductosCargados').css({ display: 'none' });
                            $('#ProductosCargados1').css({ display: 'none' });
                            var imagen = value[4]['imagen'];
                            $('#prod' + contador).append('<div id="productosDormitorioCargados" class="prodDiv' + contador + '"></div>');
                            $('.prodDiv' + contador).append(
                                '<p id="nombreMesita' +
                                    contador +
                                    '" class="' +
                                    value[4]['id'] +
                                    ' ' +
                                    value[5] +
                                    '" style="text-align:center">' +
                                    value[4]['nombre'] +
                                    '</p><hr style="width:100%;color:black"></hr><p style="position:absolute"><strong>Desde ' +
                                    value[3] +
                                    '</strong>&euro;</p>'
                            );
                            $('.prodDiv' + contador).append(
                                '<img class="producto" id="imagenProd" src="data:image/gif;base64,' +
                                    imagen +
                                    '" id="imagenProd" width="500px" height="333px"  style=" opacity: 0.7">'
                            );
                            $('#prod' + contador).css({ border: '1px solid #dfdddc' });
                            contador++;
                        });
                    });
                } else {
                    if (altura != 'Indiferente') {
                        $('#ancho0').removeAttr('class');
                        $('#ancho1').removeAttr('class');
                        $('#ancho2').removeAttr('class');
                        $('#ancho3').removeAttr('class');
                        $('#ancho4').removeAttr('class');
                        $('#ancho5').removeAttr('class');
                        $('#ancho6').removeAttr('class');
                        for (let i = 1; i <= 24; i++) {
                            $('#prod' + i).empty();
                        }
                        $('#ancho' + id).attr('class', 'selectectAncho');
                        $('#ancho0').removeAttr('class');
                        $('#ProductosCargados1').css({ display: 'none' });
                        $('#ProductosCargados').css({ display: 'none' });
                        var anchoFiltrado = $('#ancho' + id).text();
                        this.dimensionesProductoTipoService.findFiltroAlturaAncho(8, altura, anchoFiltrado).subscribe(data => {
                            var contador = 1;
                            $.each(data['body'], function(index, value) {
                                var imagen = value[4]['imagen'];
                                $('#prod' + contador).append(
                                    '<div id="productosDormitorioCargados" class="prodDiv' + contador + '"></div>'
                                );
                                $('.prodDiv' + contador).append(
                                    '<p id="nombreMesita' +
                                        contador +
                                        '" class="' +
                                        value[4]['id'] +
                                        ' ' +
                                        value[5] +
                                        '" style="text-align:center">' +
                                        value[4]['nombre'] +
                                        '</p><hr style="width:100%;color:black"></hr><p style="position:absolute"><strong>Desde ' +
                                        value[3] +
                                        '</strong>&euro;</p>'
                                );
                                $('.prodDiv' + contador).append(
                                    '<img class="producto" id="imagenProd" src="data:image/gif;base64,' +
                                        imagen +
                                        '" id="imagenProd" width="500px" height="333px"  style=" opacity: 0.7">'
                                );
                                $('#prod' + contador).css({ border: '1px solid #dfdddc' });
                                contador++;
                            });
                        });
                    }
                }
            }
        }
        if (filtro == 'altura') {
            for (let i = 1; i <= 24; i++) {
                $('#prod' + i).empty();
            }
            var anchoFiltrado = $('.selectectAncho').text();
            if (anchoFiltrado == 'Indiferente') {
                if (id == 0) {
                    for (let i = 1; i <= 24; i++) {
                        $('#prod' + i).empty();
                    }
                    $('#ProductosCargados').css({ display: 'block' });
                    $('#ProductosCargados1').css({ display: 'block' });
                    $('#altura0').attr('class', 'selectectAltura');
                    $('#altura1').removeAttr('class');
                    $('#altura2').removeAttr('class');
                } else {
                    $('#altura1').removeAttr('class');
                    $('#altura2').removeAttr('class');
                    $('#altura' + id).attr('class', 'selectectAltura');
                    $('#altura0').removeAttr('class');
                    var idAux = [];
                    var saberNumero = 1;
                    var altura = $('.selectectAltura').text();
                    var alturaFiltrado = $('#altura' + id).text();
                    this.dimensionesProductoTipoService.findFiltroAltura(8, alturaFiltrado).subscribe(data => {
                        var contador = 1;
                        $.each(data['body'], function(index, value) {
                            if (idAux[0] == undefined) {
                                idAux[0] = value[4]['id'];
                            }
                            for (let i = 0; i < contador; i++) {
                                if (idAux[i] != value[4]['id']) {
                                    if (saberNumero != 0) {
                                        saberNumero = 1;
                                    }
                                } else {
                                    saberNumero = 0;
                                }
                            }
                            if (idAux[1] == undefined) {
                                saberNumero = 1;
                            }
                            if (saberNumero == 1) {
                                idAux[idAux.length] = value[4]['id'];
                                $('#ProductosCargados').css({ display: 'none' });
                                $('#ProductosCargados1').css({ display: 'none' });
                                $('#prod' + contador).append(
                                    '<div id="productosDormitorioCargados" class="prodDiv' + contador + '"></div>'
                                );
                                var imagen = value[4]['imagen'];
                                $('.prodDiv' + contador).append(
                                    '<p id="nombreMesita' +
                                        contador +
                                        '" class="' +
                                        value[4]['id'] +
                                        ' ' +
                                        value[5] +
                                        '" style="text-align:center">' +
                                        value[4]['nombre'] +
                                        '-' +
                                        value[0] +
                                        '</p><hr style="width:100%;color:black"></hr><p style="position:absolute"><strong>Desde ' +
                                        value[3] +
                                        '</strong>&euro;</p>'
                                );
                                $('.prodDiv' + contador).append(
                                    '<img class="producto" id="imagenProd" src="data:image/gif;base64,' +
                                        imagen +
                                        '" id="imagenProd" width="500px" height="333px"  style=" opacity: 0.7">'
                                );
                                $('#prod' + contador).css({ border: '1px solid #dfdddc' });
                                contador++;
                                saberNumero = 1;
                            } else {
                                saberNumero = 1;
                            }
                        });
                    });
                }
            } else {
                if (id == 0) {
                    for (let i = 1; i <= 24; i++) {
                        $('#prod' + i).empty();
                    }
                    $('#ProductosCargados').css({ display: 'block' });
                    $('#ProductosCargados1').css({ display: 'block' });
                    $('#altura0').attr('class', 'selectectAltura');
                    $('#altura1').removeAttr('class');
                    $('#altura2').removeAttr('class');

                    var anchoFiltrado = $('.selectectAncho').text();
                    this.dimensionesProductoTipoService.findFiltro(8, anchoFiltrado).subscribe(data => {
                        var contador = 1;
                        $.each(data['body'], function(index, value) {
                            $('#ProductosCargados').css({ display: 'none' });
                            $('#ProductosCargados1').css({ display: 'none' });
                            var imagen = value[4]['imagen'];
                            $('#prod' + contador).append('<div id="productosDormitorioCargados" class="prodDiv' + contador + '"></div>');
                            $('.prodDiv' + contador).append(
                                '<p id="nombreMesita' +
                                    contador +
                                    '" class="' +
                                    value[4]['id'] +
                                    ' ' +
                                    value[5] +
                                    '" style="text-align:center">' +
                                    value[4]['nombre'] +
                                    '</p><hr style="width:100%;color:black"></hr><p style="position:absolute"><strong>Desde ' +
                                    value[3] +
                                    '</strong>&euro;</p>'
                            );
                            $('.prodDiv' + contador).append(
                                '<img class="producto" id="imagenProd" src="data:image/gif;base64,' +
                                    imagen +
                                    '" id="imagenProd" width="500px" height="333px"  style=" opacity: 0.7">'
                            );
                            $('#prod' + contador).css({ border: '1px solid #dfdddc' });
                            contador++;
                        });
                    });
                } else {
                    $('#altura1').removeAttr('class');
                    $('#altura2').removeAttr('class');
                    $('#altura' + id).attr('class', 'selectectAltura');
                    $('#altura0').removeAttr('class');
                    var altura = '';
                    altura = $('.selectectAltura').text();
                    var alturaFiltrado = '';
                    alturaFiltrado = $('#altura' + id).text();
                    $('#ProductosCargados1').css({ display: 'none' });
                    $('#ProductosCargados1').css({ display: 'none' });
                    this.dimensionesProductoTipoService.findFiltroAlturaAncho(8, alturaFiltrado, anchoFiltrado).subscribe(data => {
                        var contador = 1;
                        $.each(data['body'], function(index, value) {
                            var imagen = value[4]['imagen'];
                            $('#prod' + contador).append('<div id="productosDormitorioCargados" class="prodDiv' + contador + '"></div>');
                            $('.prodDiv' + contador).append(
                                '<p id="nombreMesita' +
                                    contador +
                                    '" class="' +
                                    value[4]['id'] +
                                    ' ' +
                                    value[5] +
                                    '" style="text-align:center">' +
                                    value[4]['nombre'] +
                                    '</p><hr style="width:100%;color:black"></hr><p style="position:absolute"><strong>Desde ' +
                                    value[3] +
                                    '</strong>&euro;</p>'
                            );
                            $('.prodDiv' + contador).append(
                                '<img class="producto" id="imagenProd" src="data:image/gif;base64,' +
                                    imagen +
                                    '" id="imagenProd" width="500px" height="333px"  style=" opacity: 0.7">'
                            );
                            $('#prod' + contador).css({ border: '1px solid #dfdddc' });
                            contador++;
                        });
                    });
                }
            }
        }
        if (filtro == 'fondo') {
            var altura = $('.selectectAltura').text();
            var anchoFiltrado = $('.selectectAncho').text();
            if (anchoFiltrado == 'Indiferente' && altura == 'Indiferente') {
                if (id == 0) {
                    for (let i = 1; i <= 24; i++) {
                        $('#prod' + i).empty();
                    }
                    $('#ProductosCargados').css({ display: 'block' });
                    $('#ProductosCargados1').css({ display: 'none' });
                    $('#fondo0').attr('class', 'selectectFondo');
                    $('#fondo1').removeAttr('class');
                    $('#fondo2').removeAttr('class');
                } else {
                    $('#fondo0').removeAttr('class');
                    $('#fondo1').removeAttr('class');
                    $('#fondo2').removeAttr('class');
                    for (let i = 1; i <= 24; i++) {
                        $('#prod' + i).empty();
                    }
                    $('#fondo' + id).attr('class', 'selectectFondo');
                    var fondoFiltrado = $('.selectectFondo').text();
                    var idAux = [];
                    var saberNumero = 1;
                    this.dimensionesProductoTipoService.findFiltroFondo(8, fondoFiltrado).subscribe(data => {
                        var contador = 1;
                        $.each(data['body'], function(index, value) {
                            if (idAux[0] == undefined) {
                                idAux[0] = value[4]['id'];
                            }
                            for (let i = 0; i < contador; i++) {
                                if (idAux[i] != value[4]['id']) {
                                    if (saberNumero != 0) {
                                        saberNumero = 1;
                                    }
                                } else {
                                    saberNumero = 0;
                                }
                            }
                            if (idAux[1] == undefined) {
                                saberNumero = 1;
                            }
                            if (saberNumero == 1) {
                                idAux[idAux.length] = value[4]['id'];
                                $('#ProductosCargados').css({ display: 'none' });
                                $('#ProductosCargados1').css({ display: 'none' });
                                $('#prod' + contador).append(
                                    '<div id="productosDormitorioCargados" class="prodDiv' + contador + '"></div>'
                                );
                                var imagen = value[4]['imagen'];
                                $('.prodDiv' + contador).append(
                                    '<p id="nombreMesita' +
                                        contador +
                                        '" class="' +
                                        value[4]['id'] +
                                        ' ' +
                                        value[5] +
                                        '" style="text-align:center">' +
                                        value[4]['nombre'] +
                                        '</p><hr style="width:100%;color:black"></hr><p style="position:absolute"><strong>Desde ' +
                                        value[3] +
                                        '</strong>&euro;</p>'
                                );
                                $('.prodDiv' + contador).append(
                                    '<img class="producto" id="imagenProd" src="data:image/gif;base64,' +
                                        imagen +
                                        '" id="imagenProd" width="500px" height="333px"  style=" opacity: 0.7">'
                                );
                                $('#prod' + contador).css({ border: '1px solid #dfdddc' });
                                contador++;
                                saberNumero = 1;
                            } else {
                                saberNumero = 1;
                            }
                        });
                    });
                }
            } else {
                if (id == 0) {
                    if (anchoFiltrado != 'Indiferente' && altura == 'Indiferente') {
                        $('#fondo0').removeAttr('class');
                        $('#fondo1').removeAttr('class');
                        $('#fondo2').removeAttr('class');
                        for (let i = 1; i <= 24; i++) {
                            $('#prod' + i).empty();
                        }
                        $('#fondo' + id).attr('class', 'selectectFondo');

                        this.dimensionesProductoTipoService.findFiltro(8, anchoFiltrado).subscribe(data => {
                            var contador = 1;
                            $.each(data['body'], function(index, value) {
                                $('#ProductosCargados').css({ display: 'none' });
                                $('#ProductosCargados1').css({ display: 'none' });
                                var imagen = value[4]['imagen'];
                                $('#prod' + contador).append(
                                    '<div id="productosDormitorioCargados" class="prodDiv' + contador + '"></div>'
                                );
                                $('.prodDiv' + contador).append(
                                    '<p id="nombreMesita' +
                                        contador +
                                        '" class="' +
                                        value[4]['id'] +
                                        ' ' +
                                        value[5] +
                                        '" style="text-align:center">' +
                                        value[4]['nombre'] +
                                        '</p><hr style="width:100%;color:black"></hr><p style="position:absolute"><strong>Desde ' +
                                        value[3] +
                                        '</strong>&euro;</p>'
                                );
                                $('.prodDiv' + contador).append(
                                    '<img class="producto" id="imagenProd" src="data:image/gif;base64,' +
                                        imagen +
                                        '" id="imagenProd" width="500px" height="333px"  style=" opacity: 0.7">'
                                );
                                $('#prod' + contador).css({ border: '1px solid #dfdddc' });
                                contador++;
                            });
                        });
                    } else {
                        if (anchoFiltrado == 'Indiferente' && altura != 'Indiferente') {
                            $('#fondo0').removeAttr('class');
                            $('#fondo1').removeAttr('class');
                            $('#fondo2').removeAttr('class');
                            for (let i = 1; i <= 24; i++) {
                                $('#prod' + i).empty();
                            }
                            $('#fondo' + id).attr('class', 'selectectFondo');
                            var idAux = [];
                            var saberNumero = 1;
                            this.dimensionesProductoTipoService.findFiltroAltura(8, altura).subscribe(data => {
                                var contador = 1;
                                $.each(data['body'], function(index, value) {
                                    if (idAux[0] == undefined) {
                                        idAux[0] = value[4]['id'];
                                    }
                                    for (let i = 0; i < contador; i++) {
                                        if (idAux[i] != value[4]['id']) {
                                            if (saberNumero != 0) {
                                                saberNumero = 1;
                                            }
                                        } else {
                                            saberNumero = 0;
                                        }
                                    }
                                    if (idAux[1] == undefined) {
                                        saberNumero = 1;
                                    }
                                    if (saberNumero == 1) {
                                        idAux[idAux.length] = value[4]['id'];
                                        $('#ProductosCargados').css({ display: 'none' });
                                        $('#ProductosCargados1').css({ display: 'none' });
                                        $('#prod' + contador).append(
                                            '<div id="productosDormitorioCargados" class="prodDiv' + contador + '"></div>'
                                        );
                                        var imagen = value[4]['imagen'];
                                        $('.prodDiv' + contador).append(
                                            '<p id="nombreMesita' +
                                                contador +
                                                '" class="' +
                                                value[4]['id'] +
                                                ' ' +
                                                value[5] +
                                                '" style="text-align:center">' +
                                                value[4]['nombre'] +
                                                '-' +
                                                value[0] +
                                                '</p><hr style="width:100%;color:black"></hr><p style="position:absolute"><strong>Desde ' +
                                                value[3] +
                                                '</strong>&euro;</p>'
                                        );
                                        $('.prodDiv' + contador).append(
                                            '<img class="producto" id="imagenProd" src="data:image/gif;base64,' +
                                                imagen +
                                                '" id="imagenProd" width="500px" height="333px"  style=" opacity: 0.7">'
                                        );
                                        $('#prod' + contador).css({ border: '1px solid #dfdddc' });
                                        contador++;
                                        saberNumero = 1;
                                    } else {
                                        saberNumero = 1;
                                    }
                                });
                            });
                        } else {
                            if (anchoFiltrado != 'Indiferente' && altura != 'Indiferente') {
                                $('#fondo0').removeAttr('class');
                                $('#fondo1').removeAttr('class');
                                $('#fondo2').removeAttr('class');
                                for (let i = 1; i <= 24; i++) {
                                    $('#prod' + i).empty();
                                }
                                $('#fondo' + id).attr('class', 'selectectFondo');
                                this.dimensionesProductoTipoService.findFiltroAlturaAncho(8, altura, anchoFiltrado).subscribe(data => {
                                    var contador = 1;
                                    $.each(data['body'], function(index, value) {
                                        var imagen = value[4]['imagen'];
                                        $('#ProductosCargados').css({ display: 'none' });
                                        $('#ProductosCargados1').css({ display: 'none' });

                                        $('#prod' + contador).append(
                                            '<div id="productosDormitorioCargados" class="prodDiv' + contador + '"></div>'
                                        );
                                        $('.prodDiv' + contador).append(
                                            '<p id="nombreMesita' +
                                                contador +
                                                '" class="' +
                                                value[4]['id'] +
                                                ' ' +
                                                value[5] +
                                                '" style="text-align:center">' +
                                                value[4]['nombre'] +
                                                '</p><hr style="width:100%;color:black"></hr><p style="position:absolute"><strong>Desde ' +
                                                value[3] +
                                                '</strong>&euro;</p>'
                                        );
                                        $('.prodDiv' + contador).append(
                                            '<img class="producto" id="imagenProd" src="data:image/gif;base64,' +
                                                imagen +
                                                '" id="imagenProd" width="500px" height="333px"  style=" opacity: 0.7">'
                                        );
                                        $('#prod' + contador).css({ border: '1px solid #dfdddc' });
                                        contador++;
                                    });
                                });
                            }
                        }
                    }
                } else {
                    if (anchoFiltrado != 'Indiferente' && altura == 'Indiferente') {
                        $('#fondo0').removeAttr('class');
                        $('#fondo1').removeAttr('class');
                        $('#fondo2').removeAttr('class');
                        for (let i = 1; i <= 24; i++) {
                            $('#prod' + i).empty();
                        }
                        $('#fondo' + id).attr('class', 'selectectFondo');
                        var fondoFiltrado = $('.selectectFondo').text();

                        this.dimensionesProductoTipoService.findFiltroFondoAncho(8, fondoFiltrado, anchoFiltrado).subscribe(data => {
                            var contador = 1;
                            $('#ProductosCargados').css({ display: 'none' });
                            $('#ProductosCargados1').css({ display: 'none' });
                            $.each(data['body'], function(index, value) {
                                var imagen = value[4]['imagen'];
                                $('#prod' + contador).append(
                                    '<div id="productosDormitorioCargados" class="prodDiv' + contador + '"></div>'
                                );
                                $('.prodDiv' + contador).append(
                                    '<p id="nombreMesita' +
                                        contador +
                                        '" class="' +
                                        value[4]['id'] +
                                        ' ' +
                                        value[5] +
                                        '" style="text-align:center">' +
                                        value[4]['nombre'] +
                                        '</p><hr style="width:100%;color:black"></hr><p style="position:absolute"><strong>Desde ' +
                                        value[3] +
                                        '</strong>&euro;</p>'
                                );
                                $('.prodDiv' + contador).append(
                                    '<img class="producto" id="imagenProd" src="data:image/gif;base64,' +
                                        imagen +
                                        '" id="imagenProd" width="500px" height="333px"  style=" opacity: 0.7">'
                                );
                                $('#prod' + contador).css({ border: '1px solid #dfdddc' });
                                contador++;
                            });
                        });
                    } else {
                        if (anchoFiltrado == 'Indiferente' && altura != 'Indiferente') {
                            $('#fondo0').removeAttr('class');
                            $('#fondo1').removeAttr('class');
                            $('#fondo2').removeAttr('class');
                            for (let i = 1; i <= 24; i++) {
                                $('#prod' + i).empty();
                            }
                            $('#fondo' + id).attr('class', 'selectectFondo');
                            var fondoFiltrado = $('.selectectFondo').text();
                            var idAux = [];
                            var saberNumero = 1;
                            this.dimensionesProductoTipoService.findFiltroFondoAlto(8, fondoFiltrado, altura).subscribe(data => {
                                var contador = 1;
                                $.each(data['body'], function(index, value) {
                                    if (idAux[0] == undefined) {
                                        idAux[0] = value[4]['id'];
                                    }
                                    for (let i = 0; i < contador; i++) {
                                        if (idAux[i] != value[4]['id']) {
                                            if (saberNumero != 0) {
                                                saberNumero = 1;
                                            }
                                        } else {
                                            saberNumero = 0;
                                        }
                                    }
                                    if (idAux[1] == undefined) {
                                        saberNumero = 1;
                                    }
                                    if (saberNumero == 1) {
                                        idAux[idAux.length] = value[4]['id'];
                                        $('#ProductosCargados').css({ display: 'none' });
                                        $('#ProductosCargados1').css({ display: 'none' });

                                        $('#prod' + contador).append(
                                            '<div id="productosDormitorioCargados" class="prodDiv' + contador + '"></div>'
                                        );
                                        var imagen = value[4]['imagen'];
                                        $('.prodDiv' + contador).append(
                                            '<p id="nombreMesita' +
                                                contador +
                                                '" class="' +
                                                value[4]['id'] +
                                                ' ' +
                                                value[5] +
                                                '" style="text-align:center">' +
                                                value[4]['nombre'] +
                                                '</p><hr style="width:100%;color:black"></hr><p style="position:absolute"><strong>Desde ' +
                                                value[3] +
                                                '</strong>&euro;</p>'
                                        );
                                        $('.prodDiv' + contador).append(
                                            '<img class="producto" id="imagenProd" src="data:image/gif;base64,' +
                                                imagen +
                                                '" id="imagenProd" width="500px" height="333px"  style=" opacity: 0.7">'
                                        );
                                        $('#prod' + contador).css({ border: '1px solid #dfdddc' });
                                        contador++;
                                        saberNumero = 1;
                                    } else {
                                        saberNumero = 1;
                                    }
                                });
                            });
                        } else {
                            if (anchoFiltrado != 'Indiferente' && altura != 'Indiferente') {
                                $('#fondo0').removeAttr('class');
                                $('#fondo1').removeAttr('class');
                                $('#fondo2').removeAttr('class');
                                for (let i = 1; i <= 24; i++) {
                                    $('#prod' + i).empty();
                                }
                                $('#fondo' + id).attr('class', 'selectectFondo');
                                var fondoFiltrado = $('.selectectFondo').text();

                                this.dimensionesProductoTipoService
                                    .findFiltroFondoAltoAncho(8, fondoFiltrado, altura, anchoFiltrado)
                                    .subscribe(data => {
                                        var contador = 1;
                                        $('#ProductosCargados').css({ display: 'none' });
                                        $('#ProductosCargados1').css({ display: 'none' });

                                        $.each(data['body'], function(index, value) {
                                            var imagen = value[4]['imagen'];
                                            $('#prod' + contador).append(
                                                '<div id="productosDormitorioCargados" class="prodDiv' + contador + '"></div>'
                                            );
                                            $('.prodDiv' + contador).append(
                                                '<p id="nombreMesita' +
                                                    contador +
                                                    '" class="' +
                                                    value[4]['id'] +
                                                    ' ' +
                                                    value[5] +
                                                    '" style="text-align:center">' +
                                                    value[4]['nombre'] +
                                                    '</p><hr style="width:100%;color:black"></hr><p style="position:absolute"><strong>Desde ' +
                                                    value[3] +
                                                    '</strong>&euro;</p>'
                                            );
                                            $('.prodDiv' + contador).append(
                                                '<img class="producto" id="imagenProd" src="data:image/gif;base64,' +
                                                    imagen +
                                                    '" id="imagenProd" width="500px" height="333px"  style=" opacity: 0.7">'
                                            );
                                            $('#prod' + contador).css({ border: '1px solid #dfdddc' });
                                            contador++;
                                        });
                                    });
                            }
                        }
                    }
                }
            }
        }
    }
    public dimensionesCogidas(id) {
        $('#imagenProdEspeciales').empty();
        $('#medidasAncho').css({ display: 'none' });
        $('#medidasFondo').css({ display: 'none' });
        $('#medidasAlto').css({ display: 'none' });
        $('#imagenAcabadoPrincipal').empty();
        var precioTienda = this.precioTienda;
        this.interiores = JSON.parse(sessionStorage.getItem('interiores'));
        var dimensiones = this.dimensionesProductoTipoService.todos;
        for (let i = 1; i <= 15; i++) {
            $('#aca1' + i).empty();
        }
        $('#terminarConfiguracion').css({ display: 'none' });
        $('#acabado').css({ display: 'none' });
        $('#nombreApoyo').css({ display: 'none' });
        $('.apoyoCogido1').empty();
        $('.apoyoCogido2').empty();
        $('.apoyoCogido3').empty();
        $('#textoFinal').removeAttr('style');
        $('#textoFinal').attr('style');
        $('#textoFinal').css({ display: 'none' });
        $('.apoyoCogido4').empty();
        $('#acaba4').empty();
        $('#acaba3').empty();
        $('#especiales').css({ display: 'none' });

        $('#acaba1').empty();
        $('#acaba2').empty();
        $('#datos1').empty();
        $('#precios1').empty();
        $('#iluminacion').removeAttr('style');
        $('#iluminacion').attr('style');
        $('#iluminacion').css({ display: 'none' });
        $('#precioCalculado1').empty();
        $('.dimensionesColor1').css({ 'background-color': 'white' });
        $('.dimensionesColor5').css({ 'background-color': 'white' });
        $('.dimensionesColor6').css({ 'background-color': 'white' });
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
        var acaSi = 0;
        var acabados = [];
        var imagen;
        var idProd;
        datos = dimensiones;

        var text = $('#nombreMesita').text();
        $('#nombreMesita').text(text + ' ' + datos['mensaje']);
        $('#datos1').append('<p>Ancho</p>');
        $('#datos1').append('<p>Alto</p>');
        $('#datos1').append('<p>Fondo</p>');

        var total = $('#total').text();
        var totalfloat = parseFloat(total);
        var precio = parseFloat(datos['precio']);
        precio = precio * precioTienda;
        precio = Math.round(precio * 100) / 100;
        totalfloat = totalfloat + precio;
        $('#total').text(totalfloat);
        $('#precioDimension').text(totalfloat);
        $('#precios1').append('<p class="' + datos['id'] + '" id="ancho1">' + datos['ancho'] + '</p>');
        $('#idioma').attr('value', datos['id']);
        $('#precios1').append('<p>' + datos['alto'] + '</p>');
        $('#precios1').append('<p>' + datos['fondo'] + '</p>');
        $('#precioCalculado1').append('<p>-</p>');
        $('#precioCalculado1').append('<p>-</p>');
        $('#precioCalculado1').append('<p>-</p>');
        acaSi = 0;

        if (acaSi == 0) {
            $('#acabado').removeAttr('style');
            $('#acabado').attr('style');
            $('#acabado').css({ 'text-align': 'center' });
            $('#acabado').css({ 'margin-top': '5%' });
            $('#acabado').css({ 'margin-bottom': '5%' });
            var contador = 1;
            var contnuevo = 1;
            var u = 1;
            var i = 0;
            this.acaProdService.findAca(idProd).subscribe(data => {
                this.acaProdService.todos = data.body;
                $.each(this.acaProdService.todos, function(index, value) {
                    if (value['productosDormitorio']['id'] == idProd) {
                        imagen = value['imagen'];
                        if (contador == 1) {
                            $('#acabados #imagenAcabadoPrincipal').append(
                                '<img id="imagenAcabado" src="data:image/gif;base64,' +
                                    imagen +
                                    '" class="imagenAcabadoPrincipalImg"  width="500px" height="333px">'
                            );
                        }

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
    }

    public especiales1(id) {
        var medidasEspeciales = this.especiales;
        $('#especiales').removeAttr('style');
        $('#especiales').attr('style');
        $('#especiales').css({ width: '100%' });
        $('#especiales').css({ float: 'left' });
        var idProd = $('#nombreMesita').attr('class');
        var dimensiones = this.dimensionesProductoTipoService.todos;
        var dimen = [];
        var cont = 0;
        for (let h = 0; h < dimensiones.length; h++) {
            if (dimensiones[h]['productosDormitorio']['id'] == idProd) {
                dimen[cont] = dimensiones[h];
                cont++;
            }
        }
        this.medidasEspecialesService.findProd(idProd).subscribe(data => {
            medidasEspeciales = data['body'];
            if (id == 1) {
                $('#imagenProdEspeciales').empty();
                $('#especialesFondo').css({ 'background-color': 'white' });
                $('#especialesAlto').css({ 'background-color': 'white' });
                $('#especialesAncho').css({ 'background-color': '#DFDDDC' });
                $('#medidasEspecialesTexto').removeAttr('style');
                $('#medidasEspecialesTexto').attr('style');
                $('#medidasEspecialesTexto').css({ 'margin-left': '40%' });
                $('#medidasEspecialesTexto').css({ 'margin-top': '5%' });
                $('#medidasEspecialesTexto').css({ 'margin-bottom': '5%' });
                for (let i = 0; i < medidasEspeciales.length; i++) {
                    if (medidasEspeciales[i]['productosDormitorio']['id'] == idProd) {
                        if (medidasEspeciales[i]['ancho'] == 1) {
                            $('#medidasAncho').removeAttr('style');
                            $('#medidasAncho').attr('style');
                            $('#medidasAncho').css({ width: '58%' });
                            $('#medidasAncho').css({ float: 'right' });
                            $('#medidasAncho').css({ 'margin-bottom': '10%' });
                            $('#imagenProdEspeciales').append(
                                '<img  src="data:image/gif;base64,' +
                                    medidasEspeciales[i]['productosDormitorio']['imagen'] +
                                    '" id="imagenMedidasEspeciales" style="max-width:100%;max-height:400px">'
                            );
                            $('#medidasAncho').append(
                                '<p style="float:left;margin-left: 2%;font-size: 20px;">Escribe un valor entre ' +
                                    medidasEspeciales[i]['min'] +
                                    ' y ' +
                                    medidasEspeciales[i]['max'] +
                                    '</p>'
                            );
                            $('#cambioAncho').append(
                                '<input style="float:left;text-align: center;" value="" min="' +
                                    medidasEspeciales[i]['min'] +
                                    '" max="' +
                                    medidasEspeciales[i]['max'] +
                                    '"  type="number" id="anchoInputEspeciales"/>'
                            );
                            $('#medidasFondo').append('<input style="float:left;margin-left:2%" id="inputFondoAncho" value="" disabled />');
                            $('#medidasFondo').removeAttr('style');
                            $('#medidasFondo').attr('style');
                            $('#medidasFondo').css({ width: '58%' });
                            $('#medidasFondo').css({ float: 'right' });
                            $('#medidasFondo').css({ 'margin-bottom': '10%' });
                            $('#medidasAlto').removeAttr('style');
                            $('#medidasAlto').attr('style');
                            $('#medidasAlto').css({ width: '58%' });
                            $('#medidasAlto').css({ float: 'right' });
                            $('#medidasAlto').append('<input style="float:left;margin-left:2%" id="inputAltoAncho" value="" disabled />');
                        }
                    }
                }
            }

            if (id == 2) {
                $('#imagenProdEspeciales').empty();

                $('#especialesFondo').css({ 'background-color': '#DFDDDC' });
                $('#especialesAlto').css({ 'background-color': 'white' });
                $('#especialesAncho').css({ 'background-color': 'white' });
                $('#medidasEspecialesTexto').removeAttr('style');
                $('#medidasEspecialesTexto').attr('style');
                $('#medidasEspecialesTexto').css({ 'margin-left': '40%' });
                $('#medidasEspecialesTexto').css({ 'margin-bottom': '3%' });
                for (let i = 0; i < medidasEspeciales.length; i++) {
                    if (medidasEspeciales[i]['productosDormitorio']['id'] == idProd) {
                        if (medidasEspeciales[i]['fondo'] == 1) {
                            $('#medidasAncho').removeAttr('style');
                            $('#medidasAncho').attr('style');
                            $('#medidasAncho').css({ width: '58%' });
                            $('#medidasAncho').css({ float: 'right' });
                            $('#medidasAncho').css({ 'margin-bottom': '10%' });
                            $('#imagenProdEspeciales').append(
                                '<img  src="data:image/gif;base64,' +
                                    medidasEspeciales[i]['productosDormitorio']['imagen'] +
                                    '" id="imagenMedidasEspeciales" style="max-width:100%;max-height:400px">'
                            );
                            $('#medidasAncho').append(
                                '<form><select id="anchosSelect" style="margin-left: 2%;width: 30%;text-align:center"><option></option></select></form'
                            );
                            for (let j = 0; j < dimen.length; j++) {
                                $('#anchosSelect').append('<option value="' + dimen[j]['id'] + '">' + dimen[j]['ancho'] + '</option>');
                            }

                            $('#medidasFondo').append(
                                '<p style="float:left;margin-left: 2%;font-size: 20px;">Escribe un valor entre ' +
                                    medidasEspeciales[i]['min'] +
                                    ' y ' +
                                    medidasEspeciales[i]['max'] +
                                    '</p>'
                            );
                            $('#cambioFondo').append(
                                '<input type="number" style="float:left;margin-left:2%" id="inputFondoAncho" max="' +
                                    medidasEspeciales[i]['max'] +
                                    '" min="' +
                                    medidasEspeciales[i]['min'] +
                                    '" value="" />'
                            );
                            $('#medidasFondo').removeAttr('style');
                            $('#medidasFondo').attr('style');
                            $('#medidasFondo').css({ width: '58%' });
                            $('#medidasFondo').css({ float: 'right' });
                            $('#medidasFondo').css({ 'margin-bottom': '10%' });
                            $('#medidasAlto').removeAttr('style');
                            $('#medidasAlto').attr('style');
                            $('#medidasAlto').css({ width: '58%' });
                            $('#medidasAlto').css({ float: 'right' });
                            $('#medidasAlto').append('<input style="float:left;margin-left:2%" id="inputAltoAncho" value="" disabled />');
                        }
                    }
                }
            }

            if (id == 3) {
                $('#imagenProdEspeciales').empty();
                $('#especialesFondo').css({ 'background-color': 'white' });
                $('#especialesAlto').css({ 'background-color': '#DFDDDC' });
                $('#especialesAncho').css({ 'background-color': 'white' });
                $('#medidasEspecialesTexto').removeAttr('style');
                $('#medidasEspecialesTexto').attr('style');
                $('#medidasEspecialesTexto').css({ 'margin-left': '40%' });
                $('#medidasEspecialesTexto').css({ 'margin-bottom': '3%' });
                for (let i = 0; i < medidasEspeciales.length; i++) {
                    if (medidasEspeciales[i]['productosDormitorio']['id'] == idProd) {
                        if (medidasEspeciales[i]['alto'] == 1) {
                            $('#medidasAncho').removeAttr('style');
                            $('#medidasAncho').attr('style');
                            $('#medidasAncho').css({ width: '58%' });
                            $('#medidasAncho').css({ float: 'right' });
                            $('#medidasAncho').css({ 'margin-bottom': '10%' });
                            $('#imagenProdEspeciales').append(
                                '<img  src="data:image/gif;base64,' +
                                    medidasEspeciales[i]['productosDormitorio']['imagen'] +
                                    '" id="imagenMedidasEspeciales" style="max-width:100%;max-height:400px">'
                            );
                            $('#medidasAncho').append(
                                '<form><select id="anchosSelect" style="margin-left: 2%;width: 30%;text-align:center"><option></option></select></form'
                            );
                            for (let j = 0; j < dimen.length; j++) {
                                $('#anchosSelect').append('<option value="' + dimen[j]['id'] + '">' + dimen[j]['ancho'] + '</option>');
                            }

                            $('#medidasAlto').append(
                                '<p style="float:left;margin-left: 2%;font-size: 20px;">Escribe un valor entre ' +
                                    medidasEspeciales[i]['min'] +
                                    ' y ' +
                                    medidasEspeciales[i]['max'] +
                                    '</p>'
                            );
                            $('#cambioAlto').append(
                                '<input type="number" style="float:left;margin-left:2%" id="inputAltoAncho" max="' +
                                    medidasEspeciales[i]['max'] +
                                    '" min="' +
                                    medidasEspeciales[i]['min'] +
                                    '" value="" />'
                            );
                            $('#medidasFondo').removeAttr('style');
                            $('#medidasFondo').attr('style');
                            $('#medidasFondo').css({ width: '58%' });
                            $('#medidasFondo').css({ float: 'right' });
                            $('#medidasFondo').css({ 'margin-bottom': '10%' });
                            $('#medidasAlto').removeAttr('style');
                            $('#medidasAlto').attr('style');
                            $('#medidasAlto').css({ width: '58%' });
                            $('#medidasAlto').css({ float: 'right' });
                            $('#medidasFondo').append('<input style="float:left;margin-left:2%" id="inputfondoAlto" value="" disabled />');
                        }
                    }
                }
            }
        });
    }

    public cambioMedidas(id) {
        var datos;
        var precioTienda = this.precioTienda;
        var imagen;
        var cont = 0;
        var acabados = [];
        var dimensiones = this.todasDimensiones;
        var dimensionProxima;
        var idProd = $('#nombreMesita').attr('class');
        var idDimenTipo = $('#dimensionEspecial').attr('class');
        if (id == 1) {
            $('#anchoInputEspeciales').css({ border: 'gray 1px solid' });
            var valor;
            valor = $('#anchoInputEspeciales').val();
            valor = parseFloat(valor);
            var max = parseFloat($('#anchoInputEspeciales').attr('max'));
            var min = parseFloat($('#anchoInputEspeciales').attr('min'));
            if (max >= valor && min <= valor) {
                for (let k = 0; k < dimensiones.length; k++) {
                    if (dimensiones[k]['productosDormitorio']['id'] == idProd) {
                        if (dimensiones[k]['ancho'] > valor && cont == 0) {
                            dimensionProxima = dimensiones[k];
                            $('#inputAltoAncho').val(dimensionProxima['alto']);
                            $('#inputFondoAncho').val(dimensionProxima['fondo']);

                            $('#datos1').append('<p>Ancho</p>');
                            $('#datos1').append('<p>Alto</p>');
                            $('#datos1').append('<p>Fondo</p>');
                            $('#datos1').append('<p>Medida Especial</p>');
                            var total = $('#total').text();
                            var totalfloat = parseFloat(total);
                            var precio = parseFloat(dimensiones[k]['precio']);
                            precio = precio * precioTienda;
                            precio = Math.round(precio * 100) / 100;
                            totalfloat = totalfloat + precio;
                            var precioAum = precio * 0.3;
                            precioAum = precio + precioAum;
                            $('#total').text(precioAum);
                            $('#precioDimension').text(precioAum);
                            $('#precios1').append('<p class="' + idDimenTipo + '" id="ancho1">' + valor + '</p>');
                            $('#idioma').attr('value', dimensiones[k]['id']);
                            $('#precios1').append('<p id="alto1" class="' + precioAum + '">' + dimensiones[k]['alto'] + '</p>');
                            $('#precios1').append('<p id="fondo1">' + dimensiones[k]['fondo'] + '</p>');
                            $('#precios1').append('<p>Incremento</p>');
                            $('#precioCalculado1').append('<p>-</p>');
                            $('#precioCalculado1').append('<p>-</p>');
                            $('#precioCalculado1').append('<p>-</p>');
                            $('#precioCalculado1').append('<p>30%</p>');
                            console.log(dimensionProxima);
                            cont++;
                        } else {
                            if (cont == 0) {
                                if (
                                    dimensiones[k]['precio'] != '' &&
                                    dimensiones[k]['precio'] != undefined &&
                                    dimensiones[k]['precio'] != 0
                                ) {
                                    dimensionProxima = dimensiones[k];
                                    $('#inputAltoAncho').val(dimensionProxima['alto']);
                                    $('#inputFondoAncho').val(dimensionProxima['fondo']);
                                    $('#datos1').empty();
                                    $('#precios1').empty();
                                    $('#precioCalculado1').empty();
                                    $('#datos1').append('<p>Ancho</p>');
                                    $('#datos1').append('<p>Alto</p>');
                                    $('#datos1').append('<p>Fondo</p>');
                                    $('#datos1').append('<p>Medida Especial</p>');
                                    var total = $('#total').text();
                                    var totalfloat = parseFloat(total);
                                    var precio = parseFloat(dimensiones[k]['precio']);
                                    precio = precio * precioTienda;
                                    precio = Math.round(precio * 100) / 100;
                                    totalfloat = totalfloat + precio;
                                    var precioAum = precio * 0.3;
                                    precioAum = precio + precioAum;
                                    $('#total').text(precioAum);
                                    $('#precioDimension').text(precioAum);
                                    $('#precios1').append('<p class="' + idDimenTipo + '" id="ancho1">' + valor + '</p>');
                                    $('#idioma').attr('value', dimensiones[k]['id']);
                                    $('#precios1').append('<p id="alto1" class="' + precioAum + '">' + dimensiones[k]['alto'] + '</p>');
                                    $('#precios1').append('<p id="fondo1">' + dimensiones[k]['fondo'] + '</p>');
                                    $('#precios1').append('<p>Incremento</p>');
                                    $('#precioCalculado1').append('<p>-</p>');
                                    $('#precioCalculado1').append('<p>-</p>');
                                    $('#precioCalculado1').append('<p>-</p>');
                                    $('#precioCalculado1').append('<p>30%</p>');
                                }
                            }
                        }
                    }
                }

                for (let i = 1; i <= 15; i++) {
                    $('#aca1' + i).empty();
                }
                $('#imagenAcabado').remove();
                $('#acabado').removeAttr('style');
                $('#acabado').attr('style');
                $('#acabado').css({ 'margin-left': '40%' });
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
                                    $('#acabados').append('<div style="height: 400px;" id="imagenAcabadoPrincipal"></div>');
                                    $('#acabados #imagenAcabadoPrincipal').append(
                                        '<img id="imagenAcabado" src="data:image/gif;base64,' +
                                            imagen +
                                            '" id="imagenDimensiones" width="500px" height="333px" style=" opacity: 0.7;margin-left:150px;max-height: 333px;max-width: 500px;">'
                                    );
                                }

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
            } else {
                $('#anchoInputEspeciales').css({ border: 'red 1px solid' });
            }
        }
        if (id == 2) {
            $('#fondoInputEspeciales').css({ border: 'gray 1px solid' });
            var ancho = $('#anchosSelect').val();
            var valor;
            valor = $('#inputFondoAncho').val();
            valor = parseFloat(valor);
            var max = parseFloat($('#inputFondoAncho').attr('max'));
            var min = parseFloat($('#inputFondoAncho').attr('min'));
            if (max >= valor && min <= valor) {
                for (let k = 0; k < dimensiones.length; k++) {
                    if (dimensiones[k]['productosDormitorio']['id'] == idProd) {
                        if (dimensiones[k]['id'] == ancho) {
                            dimensionProxima = dimensiones[k];
                            $('#inputAltoAncho').val(dimensionProxima['alto']);
                            $('#datos1').append('<p>Ancho</p>');
                            $('#datos1').append('<p>Alto</p>');
                            $('#datos1').append('<p>Fondo</p>');
                            $('#datos1').append('<p>Medida Especial</p>');
                            var total = $('#total').text();
                            var totalfloat = parseFloat(total);
                            var precio = parseFloat(dimensiones[k]['precio']);
                            precio = precio * precioTienda;
                            precio = Math.round(precio * 100) / 100;
                            totalfloat = totalfloat + precio;
                            var precioAum = precio * 0.3;
                            precioAum = precio + precioAum;
                            $('#total').text(precioAum);
                            $('#precioDimension').text(precioAum);
                            $('#precios1').append('<p class="' + idDimenTipo + '" id="ancho1">' + dimensiones[k]['ancho'] + '</p>');
                            $('#idioma').attr('value', dimensiones[k]['id']);
                            $('#precios1').append('<p>' + dimensiones[k]['alto'] + '</p>');
                            $('#precios1').append('<p>' + valor + '</p>');
                            $('#precios1').append('<p>Incremento</p>');
                            $('#precioCalculado1').append('<p>-</p>');
                            $('#precioCalculado1').append('<p>-</p>');
                            $('#precioCalculado1').append('<p>-</p>');
                            $('#precioCalculado1').append('<p>30%</p>');
                        }
                    }
                }

                for (let i = 1; i <= 15; i++) {
                    $('#aca1' + i).empty();
                }
                $('#imagenAcabado').remove();
                $('#acabado').removeAttr('style');
                $('#acabado').attr('style');
                $('#acabado').css({ 'margin-left': '40%' });
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
                                    $('#acabados').append('<div style="height: 400px;" id="imagenAcabadoPrincipal"></div>');
                                    $('#acabados #imagenAcabadoPrincipal').append(
                                        '<img id="imagenAcabado" src="data:image/gif;base64,' +
                                            imagen +
                                            '" id="imagenDimensiones" style=" opacity: 0.7;margin-left:150px;max-height: 400px;max-width: 400px;">'
                                    );
                                }

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
            } else {
                $('#anchoInputEspeciales').css({ border: 'red 1px solid' });
            }
        }
        if (id == 3) {
            $('#fondoInputEspeciales').css({ border: 'gray 1px solid' });
            var ancho = $('#anchosSelect').val();
            var valor;
            valor = $('#inputAltoAncho').val();
            valor = parseFloat(valor);
            var max = parseFloat($('#inputAltoAncho').attr('max'));
            var min = parseFloat($('#inputAltoAncho').attr('min'));
            if (max >= valor && min <= valor) {
                for (let k = 0; k < dimensiones.length; k++) {
                    if (dimensiones[k]['productosDormitorio']['id'] == idProd) {
                        if (dimensiones[k]['id'] == ancho) {
                            dimensionProxima = dimensiones[k];
                            $('#inputfondoAlto').val(dimensionProxima['alto']);
                            $('#datos1').append('<p>Ancho</p>');
                            $('#datos1').append('<p>Alto</p>');
                            $('#datos1').append('<p>Fondo</p>');
                            $('#datos1').append('<p>Medida Especial</p>');
                            var total = $('#total').text();
                            var totalfloat = parseFloat(total);
                            var precio = parseFloat(dimensiones[k]['precio']);
                            precio = precio * precioTienda;
                            precio = Math.round(precio * 100) / 100;
                            totalfloat = totalfloat + precio;
                            var precioAum = precio * 0.3;
                            precioAum = precio + precioAum;
                            $('#total').text(precioAum);
                            $('#precioDimension').text(precioAum);
                            $('#precios1').append('<p class="' + idDimenTipo + '" id="ancho1">' + dimensiones[k]['ancho'] + '</p>');
                            $('#idioma').attr('value', dimensiones[k]['id']);
                            $('#precios1').append('<p>' + valor + '</p>');
                            $('#precios1').append('<p>' + dimensiones[k]['fondo'] + '</p>');
                            $('#precios1').append('<p>Incremento</p>');
                            $('#precioCalculado1').append('<p>-</p>');
                            $('#precioCalculado1').append('<p>-</p>');
                            $('#precioCalculado1').append('<p>-</p>');
                            $('#precioCalculado1').append('<p>30%</p>');
                        }
                    }
                }

                for (let i = 1; i <= 15; i++) {
                    $('#aca1' + i).empty();
                }
                $('#imagenAcabado').remove();
                $('#acabado').removeAttr('style');
                $('#acabado').attr('style');
                $('#acabado').css({ 'margin-left': '40%' });
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
                                    $('#acabados').append('<div style="height: 400px;" id="imagenAcabadoPrincipal"></div>');
                                    $('#acabados #imagenAcabadoPrincipal').append(
                                        '<img id="imagenAcabado" height="333px" width="500px" src="data:image/gif;base64,' +
                                            imagen +
                                            '" id="imagenDimensiones" style=" opacity: 0.7;margin-left:150px;max-height: 333px;max-width: 500px;">'
                                    );
                                }

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
            } else {
                $('#anchoInputEspeciales').css({ border: 'red 1px solid' });
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
        var res = nombre.split(' ')[0];

        if (nombre == '1 cajon') {
            nombre = '1cajon';
        }
        if (res == 'mb2') {
            res = 'mb1';
        }
        nombre = res;
        var idAca = $('#myModalColores' + id1 + ' #acabadoImagen' + idImagen + ' #imagenAcabado' + idImagen).attr('class');
        var todosAcabados = this.acabados;
        $.each(todosAcabados, function(index, value) {
            if (value['id'] == idAca) {
                $('#aca1' + id1 + ' #imagenAcabadoPrincipal' + k).remove();
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
                        $('#acabados #imagenAcabadoPrincipal').append(
                            '<img id="tapa" class="' +
                                nombreAcabado +
                                '" width="500px" height="333px" src="../../../content/images/mb5/1/mb5_1_' +
                                nombreAcabado +
                                '_optimized.png">'
                        );
                    } else {
                        $('#acabados #imagenAcabadoPrincipal').append(
                            '<img id="tapa" class="' +
                                nombreAcabado +
                                '" width="500px" height="333px" src="../../../content/images/' +
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
                        $('#acabados #imagenAcabadoPrincipal').append(
                            '<img id="cajon" class="' +
                                nombreAcabado +
                                '" width="500px" height="333px"  src="../../../content/images/mb5/2/mb5_2_' +
                                nombreAcabado +
                                '_optimized.png">'
                        );
                    } else {
                        $('#acabados #imagenAcabadoPrincipal').append(
                            '<img id="cajon" class="' +
                                nombreAcabado +
                                '" width="500px" height="333px" src="../../../content/images/' +
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
                        $('#acabados #imagenAcabadoPrincipal').append(
                            '<img id="casco" class="' +
                                nombreAcabado +
                                '" width="500px" height="333px" src="../../../content/images/' +
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
                        $('#acabados #imagenAcabadoPrincipal').append(
                            '<img id="casco" class="' +
                                nombreAcabado +
                                '" width="500px" height="333px" src="../../../content/images/' +
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
                $('#val' + id1).remove();
                $('#val' + id1 + 'Dato').remove();
                $('#valor' + id1).remove();
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
                                $('.imagenAcabadoPrincipalImg').attr('style');
                                $('.imagenAcabadoPrincipalImg').css({ filter: 'brightness(-100%)' });
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
        $('#iluminacion').removeAttr('style');
        $('#iluminacion').attr('style');
        $('#iluminacion').css({ display: 'none' });
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
        $('#textoFinal').removeAttr('style');
        $('#textoFinal').attr('style');
        $('#textoFinal').css({ display: 'none' });
        $('.apoyoCogido5').empty();
        $('#apoyoRaya').remove();
        $('#apoyo1').remove();
        $('#nombreApoyo').remove();
        for (let j = 1; j <= 5; j++) {
            $('.apoyoCogido' + j).css({ 'background-color': 'white' });
        }
        let k = 1;
        for (k = 1; k < valoresAca.length; k++) {
            $('#val' + k).remove();
            $('#valor' + k + 'Precio').remove();
            $('#val' + k + 'Dato').remove();
            if (valoresAca[k] != '') {
                this.acabadosService.query().subscribe((res: HttpResponse<IAcabados[]>) => {
                    $.each(res['body'], function(index, value) {
                        if (valoresAca[k] == value['id']) {
                            $('#datos1').append('<p id="val' + k + '">Acabado ' + k + '</p>');
                            $('#precios1').append('<p id="val' + k + 'Dato" class="' + value['id'] + '">' + value['nombre'] + '</p>');
                            $('#precioCalculado1').append('<p id="valor' + k + 'Precio">' + value['precio'] + '</p>');
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
        $('#iluminacion').removeAttr('style');
        var precioTienda = this.precioTienda;
        $('#iluminacion').attr('style');
        $('#iluminacion').css({ display: 'none' });
        $('.apoyoCogido1').css({ 'background-color': 'white' });
        $('.apoyoCogido5').css({ 'background-color': 'white' });
        $('.apoyoCogido2').css({ 'background-color': 'white' });
        $('#textoFinal').removeAttr('style');
        $('#textoFinal').attr('style');
        $('#textoFinal').css({ display: 'none' });
        $('.apoyoCogido3').css({ 'background-color': 'white' });
        $('.apoyoCogido4').css({ 'background-color': 'white' });
        $('.apoyoCogido' + id).css({ 'background-color': '#DFDDDC' });
        var idApoyo = $('.apoyoCogido' + id + ' #imagenApoyo').attr('class');
        var idProd = $('#nombreMesita').attr('class');
        const h = $('#productoCalculadora1  #precios1 #ancho1').text();
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
                        var precio = parseFloat(value['precio']);
                        precio = precio * precioTienda;
                        precio = Math.round(precio * 100) / 100;
                        $('#datos1').append('<p id="nombreApoyo">' + value['productoApoyo']['nombre'] + '</p>');
                        $('#precios1').append('<p id="apoyoRaya">-</p>');
                        $('#precioCalculado1').append('<p id="apoyo1" class="' + value['id'] + '">' + precio + '&euro;</p>');
                        var total = $('#total').text();
                        var totalfloat = parseFloat(total);
                        totalfloat = totalfloat + precio;
                        $('#total').text(totalfloat);
                    }
                });
            });

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
            $('#textoFinal').removeAttr('style');
            $('#textoFinal').attr('style');
            $('#textoFinal').css({ width: '100%' });
            $('#textoFinal').css({ float: 'left' });
        }
        $('#botonCalculadora').removeAttr('disabled');
        $('#terminarConfiguracion').removeAttr('style');
        $('#terminarConfiguracion').attr('style');
        $('#terminarConfiguracion').css({ float: 'left' });
        $('#terminarConfiguracion').css({ width: '100%' });
    }

    public ilumina(id) {
        var precioTienda = this.precioTienda;
        var iluminacion = this.iluminacion;
        $('#ilu' + id).css({ 'background-color': '#DFDDDC' });
        if (id == 1) {
            var ilu = $('#ilu1').attr('class');
            for (let k = 0; k < iluminacion.length; k++) {
                if (iluminacion[k]['id'] == ilu) {
                    var precio = parseFloat(iluminacion[k]['precio']);
                    precio = precio * precioTienda;
                    precio = Math.round(precio * 100) / 100;
                    $('#datos1').append('<p id="nombreIluminacion">Iluminacion</p>');
                    $('#precios1').append('<p id="iluminacionRaya">-</p>');
                    $('#precioCalculado1').append('<p id="iluminacion1" class="' + iluminacion[k]['id'] + '">' + precio + '&euro;</p>');
                    $('#textoFinal').removeAttr('style');
                    $('#textoFinal').attr('style');
                    $('#textoFinal').css({ width: '100%' });
                    $('#textoFinal').css({ float: 'left' });
                    var total = $('#total').text();
                    var totalfloat = parseFloat(total);
                    totalfloat = totalfloat + precio;
                    $('#total').text(totalfloat);
                }
            }
        } else {
            $('#textoFinal').removeAttr('style');
            $('#textoFinal').attr('style');
            $('#textoFinal').css({ width: '100%' });
            $('#textoFinal').css({ float: 'left' });
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
            const todasDimensiones = this.dimensionesProductoTipoService.todos;
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

            if (todasDimensiones['id'] == dimen) {
                for (let w = 1; w < aca.length; w++) {
                    todasDimensiones['acabado' + w] = aca[w];
                }

                todasDimensiones['apoyo'] = apoyoBueno[1];
                todasDimensiones['iluminacion'] = iluBuena[1];
                prod[1] = todasDimensiones;
                sessionStorage.setItem('prod' + contadorDimen, JSON.stringify(prod));
                contadorDimen++;
            }
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
        $('#imagenAcabadoPrincipal').empty();
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
        this.todasDimensiones = this.dimensionesProductoTipoService.todos;

        var numeroProductos = [];
        this.productosPresupuestoPedidosService
            .query({
                size: 1000
            })
            .subscribe(data => {
                for (let i = 0; i < data.body.length; i++) {
                    numeroProductos[i] = data.body[i];
                }
                this.acaProdPed = numeroProductos;
                if (numeroProductos.length != 0) {
                    var prodCarr = [];
                    var todoCarr;
                    var contProd = 0;
                    for (let i = 1; i < 100; i++) {
                        todoCarr = JSON.parse(sessionStorage.getItem('prod' + i));
                        if (todoCarr != undefined) {
                            prodCarr[contProd] = todoCarr;
                            contProd++;
                        }
                    }
                    var numeroAcaProd = [];
                    var aux = [];
                    var acab = [];
                    var prodAca = [];
                    var prodIlu = [];
                    var dimensionEspecialBien = [];
                    var contAcab = 0;
                    for (let j = 0; j < prodCarr.length; j++) {
                        for (let i = 0; i < 15; i++) {
                            if (prodCarr[j][1]['acabado' + (i + 1)] != undefined) {
                                acab[contAcab] = prodCarr[j][1]['acabado' + (i + 1)];
                                contAcab++;
                            }
                        }
                        contAcab = 1;
                        numeroAcaProd[j] = acab;
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
                    this.subscribeToSaveResponse(this.presupuestoPedidoService.create(this.presupuestoPedido));
                    var presupuesto = this.presupuesto;
                    var id = localStorage.getItem('ultimoPresupuesto');
                    var id1 = parseFloat(id);
                    id1 = id1 + 1;
                    localStorage.setItem('ultimoPresupuesto', JSON.stringify(id1));
                    var idDefinitiva;
                    this.presupuestoPedidoService
                        .query({
                            size: 10000
                        })
                        .subscribe(
                            (res: HttpResponse<IPresupuestoPedido[]>) => {
                                var aux = [];
                                for (let w = 0; w < res.body.length; w++) {
                                    if (aux.length == 0 || aux[0]['id'] < res.body[w]['id']) {
                                        aux[0] = res.body[w];
                                    }
                                }
                                idDefinitiva = aux[0]['id'] + 1;
                                const prueba1 = {
                                    id: aux[0]['id'],
                                    codigo: 'PR-' + usuario['id'],
                                    pedido: 0,
                                    user: usuario,
                                    fecha_presupuesto: output
                                };
                                var prodPrePed;
                                for (let m = 0; m < prodCarr.length; m++) {
                                    const dimen = {
                                        id: prodCarr[m][1]['id'],
                                        nombre: prodCarr[m][1]['nombre'],
                                        anchoMesitaIdeal: prodCarr[m][1]['anchoMesitaIdeal'],
                                        fondo: prodCarr[m][1]['fondo'],
                                        alto: prodCarr[m][1]['alto'],
                                        ancho: prodCarr[m][1]['ancho'],
                                        imagen: prodCarr[m][1]['imagen'],
                                        imagenContentType: prodCarr[m][1]['imagenContentType'],
                                        mensaje: prodCarr[m][1]['mensaje'],
                                        precio: prodCarr[m][1]['precio'],
                                        productosDormitorio: prodCarr[m][1]['productosDormitorio']
                                    };
                                    var dimensionesFinal = dimen;
                                    if (prodCarr[m][1]['apoyo'] == undefined) {
                                        prodPrePed = {
                                            productosDormitorio: prodCarr[m][1]['productosDormitorio'],
                                            presupuestoPedido: prueba1,
                                            dimensionesProductoTipo: dimen
                                        };
                                    } else {
                                        prodPrePed = {
                                            productosDormitorio: prodCarr[m][1]['productosDormitorio'],
                                            presupuestoPedido: prueba1,
                                            dimensionesProductoTipo: dimen,
                                            tiposApoyo: prodCarr[m][1]['apoyo']
                                        };
                                    }
                                    numeroAcaProd[m]['prod'] = prodPrePed;
                                    prodAca[m] = prodPrePed;
                                    prodIlu[m] = prodPrePed;
                                    dimensionEspecialBien[m] = prodPrePed;
                                    this.productosPresupuestoPedidos = prodPrePed;
                                    this.subscribeToSaveResponse1(
                                        this.productosPresupuestoPedidosService.create(this.productosPresupuestoPedidos)
                                    );
                                    if (dimensionesFinal['mensaje'] == 'Medidas Especiales') {
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
                                    if (prodCarr[m][1]['iluminacion'] != undefined && prodCarr[m][1]['iluminacion'] != '') {
                                        var acaPedProd = this.acaProdPed.length;
                                        acaPedProd = this.acaProdPed[acaPedProd - 1];
                                        prodIlu[m]['id'] = acaPedProd['id'] + m + 1;
                                        const iluProd = {
                                            iluminacion: prodCarr[m][1]['iluminacion'],
                                            productosPresupuestoPedidos: prodIlu[m]
                                        };
                                        this.subscribeToSaveResponse(this.iluminacionProdPrePedService.create(iluProd));
                                    }
                                }
                                let b = 0;

                                for (let w = 0; w < numeroAcaProd.length; w++) {
                                    for (let b = 0; b < numeroAcaProd[w].length; b++) {
                                        const acabados1 = {
                                            acabados: numeroAcaProd[w][b],
                                            productosPresupuestoPedidos: prodAca[w]
                                        };
                                        this.subscribeToSaveResponse(this.acabadosProductosPresupuestoPedidoService.create(acabados1));
                                    }
                                }
                            },
                            (res: HttpErrorResponse) => this.onError(res.message)
                        );
                }
            });
    }

    loadAll() {
        var productos = [];
        var apoyos = [];
        var cont = 0;
        $('#producto').append('<datalist id="listaAnchos"></datalist>');
        $('#producto').append('<datalist id="listaAltura"></datalist>');
        for (let i = 1; i < 457; i++) {
            if (i >= 1 && i <= 9) {
                $('#listaAnchos').append('<option value="NA00' + i + '">NA00' + i + '</option>');
            }
            if (i >= 10 && i <= 99) {
                $('#listaAnchos').append('<option value="NA0' + i + '">NA0' + i + '</option>');
            }
            if (i >= 100) {
                $('#listaAnchos').append('<option value="NA' + i + '">NA' + i + '</option>');
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
        var todasDimensiones = [];
        var contDimenTipo = 0;
        this.loadAll();
        this.pruebaCargar();

        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        var tienda = JSON.parse(sessionStorage.getItem('tiendaUsuario'));

        this.precioTiendaProductosService.findProdId(8, tienda.id).subscribe(data => {
            this.precioTiendaProductosService.todos = data.body;
        });
        this.precioTienda = sessionStorage.getItem('precioTienda');
    }

    ngOnDestroy() {
        this.eventSubscriber;
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
    public pruebaCargar() {
        var todasDimensiones = [];
        var apoyo = [];
        var usuarios = [];
        var acabados = [];
        var sistemasApoyo = [];
        var numeroProductos = [];
        var ilu = [];
        var interiores = [];
        var especiales = [];
        var tienda = JSON.parse(sessionStorage.getItem('tiendaUsuario'));

        this.iluminacionService
            .query({
                size: 100000
            })
            .subscribe(data => {
                for (let i = 0; i < data['body'].length; i++) {
                    ilu[i] = data['body'][i];
                }
            });
        this.iluminacion = ilu;

        this.acabadosService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                for (let i = 0; i < data.body.length; i++) {
                    acabados[i] = data.body[i];
                }
            });
        this.acabados = acabados;
        this.userService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                for (let i = 0; i < data.body.length; i++) {
                    usuarios[i] = data.body[i];
                }
            });
        this.user = usuarios;

        this.tiposApoyoService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                for (let i = 0; i < data.body.length; i++) {
                    sistemasApoyo[i] = data.body[i];
                }
            });
        this.sistemasApoyo = sistemasApoyo;

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
        this.eventSubscriber = Subscription;
    }
}

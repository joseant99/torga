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
import { RepresentanteTiendaService } from '../representante-tienda/representante-tienda.service';
import { IRepresentanteTienda } from 'app/shared/model/representante-tienda.model';
import { RepresenTorgaService } from '../represen-torga/represen-torga.service';
import { IRepresenTorga } from 'app/shared/model/represen-torga.model';

@Component({
    selector: 'jhi-productos-dormitorio',
    templateUrl: './productos-editar.component.html'
})
export class ProductosEditarComponent implements OnInit, OnDestroy {
    currentAccount: any;
    productosDormitorios: IProductosDormitorio[];
    dimensionesProductos: IDimensionesProducto[];
    productosDormitorioPrueba: IProductosDormitorio;
    error: any;
    success: any;
    productosArrayNombre: any;
    apoyo: any;
    isSaving: boolean;
    especiales: any;
    medidasModal: any;
    acaProd: IAcaProd;
    iluminacion: any;
    precioPunto: any;
    acabados: any;
    todosAcabados: any;
    acaProdsCar: any;
    ruta: any;
    tiendasRepresentante: any;
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
    precioDimension: any;
    cambioDimension: any;
    modalAcabadosCargados: any;
    cambiadoAcabado: any;
    cambiarApoyo: any;
    especialNuevo: any;
    dimensionCogidaTodo: any;
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
        protected represenTorgaService: RepresenTorgaService,
        protected representanteTiendaService: RepresentanteTiendaService,
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
        $('#medidasEspecialesTexto').css({ display: 'none' });
        $('#medidasEspeciales').css({ display: 'none' });
        $('#medidasAncho').css({ display: 'none' });
        $('#medidasFondo').css({ display: 'none' });
        $('#medidasAlto').css({ display: 'none' });
        $('#especiales').css({ display: 'none' });
        $('#productoCalculadora1 #precios1').empty();
        $('#euroCalculadora').attr('style');
        $('#euroCalculadora').css({ display: 'none' });
        $('#productoCalculadora1 #precioCalculado1').empty();
        $('#productoCalculadora1 #datos1').empty();
        $('#nombreMesita').empty();
        $('#acabados').css({ display: 'none' });
        $('#dimensiones').css({ display: 'none' });
        $('#precioDimension').empty();
        $('.productosColor107').css({ 'background-color': 'white' });
        $('.productosColor108').css({ 'background-color': 'white' });
        $('.productosColor109').css({ 'background-color': 'white' });
        $('.productosColor110').css({ 'background-color': 'white' });
        $('.productosColor111').css({ 'background-color': 'white' });
        $('.productosColor112').css({ 'background-color': 'white' });
        $('.productosColor113').css({ 'background-color': 'white' });
        $('.productosColor114').css({ 'background-color': 'white' });
        $('.productosColor115').css({ 'background-color': 'white' });
        $('.productosColor116').css({ 'background-color': 'white' });
        $('.productosColor117').css({ 'background-color': 'white' });
        $('.productosColor118').css({ 'background-color': 'white' });
        $('.productosColor119').css({ 'background-color': 'white' });
        $('#imagenAcabadoPrincipal').empty();
        $('#total').empty();
        $('.dimensionesColor1').empty();
        $('.dimensionesColor2').empty();
        $('.dimensionesColor3').empty();
        $('#botonCalculadora').attr('class', 'displayBoton');
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
        $('.dimensionesColor4').css({ border: '0px' });
        $('.dimensionesColor5').css({ border: '0px' });
        $('.dimensionesColor6').css({ border: '0px' });
        $('.dimensionesColor1').css({ border: '0px' });
        $('.dimensionesColor2').css({ border: '0px' });
        $('.dimensionesColor3').css({ border: '0px' });

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
        $('#botonEliminar').attr('class', 'displayBoton');
    }

    public open(producto, productoNombre) {
        $('#botonEliminar').removeAttr('class');
        $('#dimensiones').css({ display: 'block' });
        $('#botonApoyoNuevo').empty();
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
        $('#medidasEspecialesTexto').css({ display: 'none' });
        $('#medidasEspeciales').css({ display: 'none' });
        $('#medidasAncho').css({ display: 'none' });
        $('#medidasFondo').css({ display: 'none' });
        $('#medidasAlto').css({ display: 'none' });
        $('#especiales').css({ display: 'none' });
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

        $('.productosColor107').css({ 'background-color': 'white' });
        $('.productosColor108').css({ 'background-color': 'white' });
        $('.productosColor109').css({ 'background-color': 'white' });
        $('.productosColor110').css({ 'background-color': 'white' });
        $('.productosColor111').css({ 'background-color': 'white' });
        $('.productosColor112').css({ 'background-color': 'white' });
        $('.productosColor113').css({ 'background-color': 'white' });
        $('.productosColor114').css({ 'background-color': 'white' });
        $('.productosColor115').css({ 'background-color': 'white' });
        $('.productosColor116').css({ 'background-color': 'white' });
        $('.productosColor117').css({ 'background-color': 'white' });
        $('.productosColor118').css({ 'background-color': 'white' });
        $('.productosColor119').css({ 'background-color': 'white' });

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
                            '<p class="dimensionesId' +
                                (cont + 1) +
                                '" id="' +
                                datos[i]['id'] +
                                '" style="position:absolute;z-index:1"></p>'
                        );
                        $('.dimensionesColor1').append(
                            '<a href="#imagenAcabadoPrincipal"><img  src="data:image/gif;base64,' +
                                datos[i]['imagen'] +
                                '" id="imagenDimensiones" class="' +
                                datos[i]['id'] +
                                '" width="500px" height="283.73px" style=" opacity: 0.7;"></a>'
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
                            '<p class="dimensionesId' +
                                (cont + 1) +
                                '" id="' +
                                datos[i]['id'] +
                                '" style="position:absolute;z-index:1"></p>'
                        );
                        $('.dimensionesColor2').append(
                            '<a href="#imagenAcabadoPrincipal"><img  src="data:image/gif;base64,' +
                                datos[i]['imagen'] +
                                '" id="imagenDimensiones" class="' +
                                datos[i] +
                                '" width="500px" height="283.73px"  style=" opacity: 0.7;"></a>'
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
                            '<p class="dimensionesId' +
                                (cont + 1) +
                                '" id="' +
                                datos[i]['id'] +
                                '" style="position:absolute;z-index:1"></p>'
                        );
                        $('.dimensionesColor3').append(
                            '<a href="#imagenAcabadoPrincipal"><img  src="data:image/gif;base64,' +
                                datos[i]['imagen'] +
                                '" id="imagenDimensiones" class="' +
                                datos[i] +
                                '" width="500px" height="283.73px" style=" opacity: 0.7;"></a>'
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
                            '<p class="dimensionesId' +
                                (cont + 1) +
                                '" id="' +
                                datos[i]['id'] +
                                '" style="position:absolute;z-index:1"></p>'
                        );
                        $('.dimensionesColor4').append(
                            '<a href="#imagenAcabadoPrincipal"><img  src="data:image/gif;base64,' +
                                datos[i]['imagen'] +
                                '" id="imagenDimensiones" class="' +
                                datos[i] +
                                '" width="500px" height="283.73px" style=" opacity: 0.7;"></a>'
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
                            '<p class="dimensionesId' +
                                (cont + 1) +
                                '" id="' +
                                datos[i]['id'] +
                                '" style="position:absolute;z-index:1"></p>'
                        );
                        $('.dimensionesColor5').append(
                            '<a href="#imagenAcabadoPrincipal"><img  src="data:image/gif;base64,' +
                                datos[i]['imagen'] +
                                '" id="imagenDimensiones" class="' +
                                datos[i] +
                                '" width="500px" height="283.73px"  style=" opacity: 0.7;"></a>'
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
                            '<p class="dimensionesId' +
                                (cont + 1) +
                                '" id="' +
                                datos[i]['id'] +
                                '" style="position:absolute;z-index:1"></p>'
                        );
                        $('.dimensionesColor6').append(
                            '<a href="#imagenAcabadoPrincipal"><img  src="data:image/gif;base64,' +
                                datos[i]['imagen'] +
                                '" id="imagenDimensiones" class="' +
                                datos[i] +
                                '"width="500px" height="283.73px"  style=" opacity: 0.7;"></a>'
                        );
                    }
                    cont++;
                }
            }
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
        $('#iluminacion').removeAttr('style');
        $('#iluminacion').attr('style');
        $('#iluminacion').css({ display: 'none' });
        var acaprodCont = 0;
        var acaProdSer = [];
    }

    public open1(producto1) {
        $('#botonEliminar').removeAttr('class');
        $('#dimensiones').css({ display: 'block' });
        $('#botonApoyoNuevo').empty();
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

        $('.productosColor107').css({ 'background-color': 'white' });
        $('.productosColor108').css({ 'background-color': 'white' });
        $('.productosColor109').css({ 'background-color': 'white' });
        $('.productosColor110').css({ 'background-color': 'white' });
        $('.productosColor111').css({ 'background-color': 'white' });
        $('.productosColor112').css({ 'background-color': 'white' });
        $('.productosColor113').css({ 'background-color': 'white' });
        $('.productosColor114').css({ 'background-color': 'white' });
        $('.productosColor115').css({ 'background-color': 'white' });
        $('.productosColor116').css({ 'background-color': 'white' });
        $('.productosColor117').css({ 'background-color': 'white' });
        $('.productosColor118').css({ 'background-color': 'white' });
        $('.productosColor119').css({ 'background-color': 'white' });

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
                        $('#nombreMesita').attr('class', datos[i]['productosDormitorio']['id']);
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
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1"></p>'
                            );
                            $('.dimensionesColor1').append(
                                '<a href="#imagenAcabadoPrincipal"><img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i]['id'] +
                                    '" width="500px" height="283.73px" style=" opacity: 0.7;"></a>'
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
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1"></p>'
                            );
                            $('.dimensionesColor2').append(
                                '<a href="#imagenAcabadoPrincipal"><img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i] +
                                    '" width="500px" height="283.73px"  style=" opacity: 0.7;"></a>'
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
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1"></p>'
                            );
                            $('.dimensionesColor3').append(
                                '<a href="#imagenAcabadoPrincipal"><img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i] +
                                    '" width="500px" height="283.73px" style=" opacity: 0.7;"></a>'
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
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1"></p>'
                            );
                            $('.dimensionesColor4').append(
                                '<a href="#imagenAcabadoPrincipal"><img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i] +
                                    '" width="500px" height="283.73px" style=" opacity: 0.7;"></a>'
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
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1"></p>'
                            );
                            $('.dimensionesColor5').append(
                                '<a href="#imagenAcabadoPrincipal"><img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i] +
                                    '" width="500px" height="283.73px"  style=" opacity: 0.7;"></a>'
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
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1"></p>'
                            );
                            $('.dimensionesColor6').append(
                                '<a href="#imagenAcabadoPrincipal"><img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i] +
                                    '"width="500px" height="283.73px"  style=" opacity: 0.7;"></a>'
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
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1"></p>'
                            );
                            $('.dimensionesColor1').append(
                                '<a href="#imagenAcabadoPrincipal"><img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i]['id'] +
                                    '" width="500px" height="283.73px" style=" opacity: 0.7;"></a>'
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
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1"></p>'
                            );
                            $('.dimensionesColor2').append(
                                '<a href="#imagenAcabadoPrincipal"><img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i] +
                                    '" width="500px" height="283.73px"  style=" opacity: 0.7;"></a>'
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
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1"></p>'
                            );
                            $('.dimensionesColor3').append(
                                '<a href="#imagenAcabadoPrincipal"><img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i] +
                                    '" width="500px" height="283.73px" style=" opacity: 0.7;"></a>'
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
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1"></p>'
                            );
                            $('.dimensionesColor4').append(
                                '<a href="#imagenAcabadoPrincipal"><img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i] +
                                    '" width="500px" height="333px" style=" opacity: 0.7;"></a>'
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
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1"></p>'
                            );
                            $('.dimensionesColor5').append(
                                '<a href="#imagenAcabadoPrincipal"><img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i] +
                                    '" width="500px" height="283.73px"  style=" opacity: 0.7;"></a>'
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
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1"></p>'
                            );
                            $('.dimensionesColor6').append(
                                '<a href="#imagenAcabadoPrincipal"><img  src="data:image/gif;base64,' +
                                    datos[i]['imagen'] +
                                    '" id="imagenDimensiones" class="' +
                                    datos[i] +
                                    '"width="500px" height="283.73px"  style=" opacity: 0.7;"></a>'
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
        var precioPunto = this.precioPunto[0];
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
        this.borrarProdCalculadora();
        var precio = this.precioTiendaProductosService.todos;

        if (filtro == 'ancho') {
            var altura = $('.selectectAltura').text();

            if (id == 0 && altura == 'Todos') {
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
                for (let v = 1; v <= 24; v++) {
                    $('#prod' + v).empty();
                    $('#prod' + v).removeAttr('style');
                    $('#prod' + v).css({ float: 'left' });
                    $('#prod' + v).removeAttr('class');
                }
            } else {
                if (altura != 'Todos' && id == 0) {
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
                                $('#prod' + contador).attr('class', 'productosColor' + value[4]['id']);
                                $('.prodDiv' + contador).append(
                                    '<img class="producto" id="imagenProd" src="data:image/gif;base64,' +
                                        imagen +
                                        '" id="imagenProd" width="500px" height="290.5px"  style=" opacity: 0.7">'
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
                                        '-' +
                                        value[0] +
                                        '</p>'
                                );
                                var precio1 = value[3];
                                for (let r = 0; r < precio['length']; r++) {
                                    if (precio[r][2] == value[4]['id']) {
                                        var cuenta = precio[r][1] / 100;
                                        cuenta = cuenta + 1;
                                        precio1 = precio1 * precioPunto;
                                        precio1 = precio1 * cuenta;
                                        $('.prodDiv' + contador).append(
                                            '<p style="text-align:center">Desde ' + precio1.toFixed(2) + ' &euro;</p>'
                                        );
                                    }
                                }

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
                if (altura == 'Todos') {
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
                            $('#prod' + contador).attr('class', 'productosColor' + value[4]['id']);
                            $('.prodDiv' + contador).append(
                                '<img class="producto" id="imagenProd" src="data:image/gif;base64,' +
                                    imagen +
                                    '" id="imagenProd" width="500px" height="290.5px"  style=" opacity: 0.7">'
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
                                    '</p>'
                            );
                            var precio1 = value[3];
                            for (let r = 0; r < precio['length']; r++) {
                                if (precio[r][2] == value[4]['id']) {
                                    var cuenta = precio[r][1] / 100;
                                    cuenta = cuenta + 1;
                                    precio1 = precio1 * precioPunto;
                                    precio1 = precio1 * cuenta;
                                    $('.prodDiv' + contador).append(
                                        '<p style="text-align:center">Desde ' + precio1.toFixed(2) + ' &euro;</p>'
                                    );
                                }
                            }
                            $('#prod' + contador).css({ border: '1px solid #dfdddc' });
                            contador++;
                        });
                    });
                } else {
                    if (altura != 'Todos') {
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
                                $('#prod' + contador).attr('class', 'productosColor' + value[4]['id']);
                                $('.prodDiv' + contador).append(
                                    '<img class="producto" id="imagenProd" src="data:image/gif;base64,' +
                                        imagen +
                                        '" id="imagenProd" width="500px" height="290.5px"  style=" opacity: 0.7">'
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
                                        '</p>'
                                );
                                var precio1 = value[3];
                                for (let r = 0; r < precio['length']; r++) {
                                    if (precio[r][2] == value[4]['id']) {
                                        var cuenta = precio[r][1] / 100;
                                        cuenta = cuenta + 1;
                                        precio1 = precio1 * precioPunto;
                                        precio1 = precio1 * cuenta;
                                        $('.prodDiv' + contador).append(
                                            '<p style="text-align:center">Desde ' + precio1.toFixed(2) + ' &euro;</p>'
                                        );
                                    }
                                }
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
            if (anchoFiltrado == 'Todos') {
                if (id == 0) {
                    for (let i = 1; i <= 24; i++) {
                        $('#prod' + i).empty();
                        $('#prod' + i).removeAttr('style');
                        $('#prod' + i).removeAttr('class');
                        $('#prod' + i).css({ float: 'left' });
                    }
                    $('#ProductosCargados').css({ display: 'block' });
                    $('#ProductosCargados1').css({ display: 'block' });
                    $('#altura0').attr('class', 'selectectAltura');
                    $('#altura1').removeAttr('class');
                    $('#altura2').removeAttr('class');
                    for (let v = 1; v <= 24; v++) {
                        $('#prod' + v).empty();
                    }
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
                                $('#prod' + contador).attr('class', 'productosColor' + value[4]['id']);
                                $('.prodDiv' + contador).append(
                                    '<img class="producto" id="imagenProd" src="data:image/gif;base64,' +
                                        imagen +
                                        '" id="imagenProd" width="500px" height="290.5px"  style=" opacity: 0.7">'
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
                                        '-' +
                                        value[0] +
                                        '</p>'
                                );
                                var precio1 = value[3];
                                for (let r = 0; r < precio['length']; r++) {
                                    if (precio[r][2] == value[4]['id']) {
                                        var cuenta = precio[r][1] / 100;
                                        cuenta = cuenta + 1;
                                        precio1 = precio1 * precioPunto;
                                        precio1 = precio1 * cuenta;
                                        $('.prodDiv' + contador).append(
                                            '<p style="text-align:center">Desde ' + precio1.toFixed(2) + ' &euro;</p>'
                                        );
                                    }
                                }
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
                            $('#prod' + contador).attr('class', 'productosColor' + value[4]['id']);
                            $('.prodDiv' + contador).append(
                                '<img class="producto" id="imagenProd" src="data:image/gif;base64,' +
                                    imagen +
                                    '" id="imagenProd" width="500px" height="290.5px"  style=" opacity: 0.7">'
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
                                    '</p>'
                            );
                            var precio1 = value[3];
                            for (let r = 0; r < precio['length']; r++) {
                                if (precio[r][2] == value[4]['id']) {
                                    var cuenta = precio[r][1] / 100;
                                    cuenta = cuenta + 1;
                                    precio1 = precio1 * precioPunto;
                                    precio1 = precio1 * cuenta;
                                    $('.prodDiv' + contador).append(
                                        '<p style="text-align:center">Desde ' + precio1.toFixed(2) + ' &euro;</p>'
                                    );
                                }
                            }
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
                            $('#prod' + contador).attr('class', 'productosColor' + value[4]['id']);
                            $('.prodDiv' + contador).append(
                                '<img class="producto" id="imagenProd" src="data:image/gif;base64,' +
                                    imagen +
                                    '" id="imagenProd" width="500px" height="290.5px"  style=" opacity: 0.7">'
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
                                    '</p>'
                            );
                            var precio1 = value[3];
                            for (let r = 0; r < precio['length']; r++) {
                                if (precio[r][2] == value[4]['id']) {
                                    var cuenta = precio[r][1] / 100;
                                    cuenta = cuenta + 1;
                                    precio1 = precio1 * precioPunto;
                                    precio1 = precio1 * cuenta;
                                    $('.prodDiv' + contador).append(
                                        '<p style="text-align:center">Desde ' + precio1.toFixed(2) + ' &euro;</p>'
                                    );
                                }
                            }
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
            if (anchoFiltrado == 'Todos' && altura == 'Todos') {
                if (id == 0) {
                    for (let i = 1; i <= 24; i++) {
                        $('#prod' + i).empty();
                        $('#prod' + i).removeAttr('style');
                        $('#prod' + i).removeAttr('class');
                        $('#prod' + i).css({ float: 'left' });
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
                                $('#prod' + contador).attr('class', 'productosColor' + value[4]['id']);
                                $('.prodDiv' + contador).append(
                                    '<img class="producto" id="imagenProd" src="data:image/gif;base64,' +
                                        imagen +
                                        '" id="imagenProd" width="500px" height="290.5px"  style=" opacity: 0.7">'
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
                                        '</p>'
                                );
                                var precio1 = value[3];
                                for (let r = 0; r < precio['length']; r++) {
                                    if (precio[r][2] == value[4]['id']) {
                                        var cuenta = precio[r][1] / 100;
                                        cuenta = cuenta + 1;
                                        precio1 = precio1 * precioPunto;
                                        precio1 = precio1 * cuenta;
                                        $('.prodDiv' + contador).append(
                                            '<p style="text-align:center">Desde ' + precio1.toFixed(2) + ' &euro;</p>'
                                        );
                                    }
                                }
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
                    if (anchoFiltrado != 'Todos' && altura == 'Todos') {
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
                                $('#prod' + contador).attr('class', 'productosColor' + value[4]['id']);
                                $('.prodDiv' + contador).append(
                                    '<img class="producto" id="imagenProd" src="data:image/gif;base64,' +
                                        imagen +
                                        '" id="imagenProd" width="500px" height="290.5px"  style=" opacity: 0.7">'
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
                                        '</p>'
                                );
                                var precio1 = value[3];
                                for (let r = 0; r < precio['length']; r++) {
                                    if (precio[r][2] == value[4]['id']) {
                                        var cuenta = precio[1][2] / 100;
                                        cuenta = cuenta + 1;
                                        precio1 = precio1 * precioPunto;
                                        precio1 = precio1 * cuenta;
                                        $('.prodDiv' + contador).append(
                                            '<p style="text-align:center">Desde ' + precio1.toFixed(2) + ' &euro;</p>'
                                        );
                                    }
                                }
                                $('#prod' + contador).css({ border: '1px solid #dfdddc' });
                                contador++;
                            });
                        });
                    } else {
                        if (anchoFiltrado == 'Todos' && altura != 'Todos') {
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
                                        $('#prod' + contador).attr('class', 'productosColor' + value[4]['id']);
                                        $('.prodDiv' + contador).append(
                                            '<img class="producto" id="imagenProd" src="data:image/gif;base64,' +
                                                imagen +
                                                '" id="imagenProd" width="500px" height="290.5px"  style=" opacity: 0.7">'
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
                                                '-' +
                                                value[0] +
                                                '</p>'
                                        );
                                        var precio1 = value[3];
                                        for (let r = 0; r < precio['length']; r++) {
                                            if (precio[r][2] == value[4]['id']) {
                                                var cuenta = precio[r][1] / 100;
                                                cuenta = cuenta + 1;
                                                precio1 = precio1 * precioPunto;
                                                precio1 = precio1 * cuenta;
                                                $('.prodDiv' + contador).append(
                                                    '<p style="text-align:center">Desde ' + precio1.toFixed(2) + ' &euro;</p>'
                                                );
                                            }
                                        }
                                        $('#prod' + contador).css({ border: '1px solid #dfdddc' });
                                        contador++;
                                        saberNumero = 1;
                                    } else {
                                        saberNumero = 1;
                                    }
                                });
                            });
                        } else {
                            if (anchoFiltrado != 'Todos' && altura != 'Todos') {
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
                                        $('#prod' + contador).attr('class', 'productosColor' + value[4]['id']);
                                        $('#prod' + contador).append(
                                            '<div id="productosDormitorioCargados" class="prodDiv' + contador + '"></div>'
                                        );

                                        $('.prodDiv' + contador).append(
                                            '<img class="producto" id="imagenProd" src="data:image/gif;base64,' +
                                                imagen +
                                                '" id="imagenProd" width="500px" height="290.5px"  style=" opacity: 0.7">'
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
                                                '</p>'
                                        );
                                        var precio1 = value[3];
                                        for (let r = 0; r < precio['length']; r++) {
                                            if (precio[r][2] == value[4]['id']) {
                                                var cuenta = precio[r][1] / 100;
                                                cuenta = cuenta + 1;
                                                precio1 = precio1 * precioPunto;
                                                precio1 = precio1 * cuenta;
                                                $('.prodDiv' + contador).append(
                                                    '<p style="text-align:center">Desde ' + precio1.toFixed(2) + ' &euro;</p>'
                                                );
                                            }
                                        }
                                        $('#prod' + contador).css({ border: '1px solid #dfdddc' });
                                        contador++;
                                    });
                                });
                            }
                        }
                    }
                } else {
                    if (anchoFiltrado != 'Todos' && altura == 'Todos') {
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
                                $('#prod' + contador).attr('class', 'productosColor' + value[4]['id']);
                                $('.prodDiv' + contador).append(
                                    '<img class="producto" id="imagenProd" src="data:image/gif;base64,' +
                                        imagen +
                                        '" id="imagenProd" width="500px" height="290.5px"  style=" opacity: 0.7">'
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
                                        '</p>'
                                );
                                var precio1 = value[3];
                                for (let r = 0; r < precio['length']; r++) {
                                    if (precio[r][2] == value[4]['id']) {
                                        var cuenta = precio[r][1] / 100;
                                        cuenta = cuenta + 1;
                                        precio1 = precio1 * precioPunto;
                                        precio1 = precio1 * cuenta;
                                        $('.prodDiv' + contador).append(
                                            '<p style="text-align:center">Desde ' + precio1.toFixed(2) + ' &euro;</p>'
                                        );
                                    }
                                }
                                $('#prod' + contador).css({ border: '1px solid #dfdddc' });
                                contador++;
                            });
                        });
                    } else {
                        if (anchoFiltrado == 'Todos' && altura != 'Todos') {
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
                                        $('#prod' + contador).attr('class', 'productosColor' + value[4]['id']);
                                        $('#prod' + contador).append(
                                            '<div id="productosDormitorioCargados" class="prodDiv' + contador + '"></div>'
                                        );
                                        var imagen = value[4]['imagen'];

                                        $('.prodDiv' + contador).append(
                                            '<img class="producto" id="imagenProd" src="data:image/gif;base64,' +
                                                imagen +
                                                '" id="imagenProd" width="500px" height="290.5px"  style=" opacity: 0.7">'
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
                                                '</p>'
                                        );
                                        var precio1 = value[3];
                                        for (let r = 0; r < precio['length']; r++) {
                                            if (precio[r][2] == value[4]['id']) {
                                                var cuenta = precio[r][1] / 100;
                                                cuenta = cuenta + 1;
                                                precio1 = precio1 * precioPunto;
                                                precio1 = precio1 * cuenta;
                                                $('.prodDiv' + contador).append(
                                                    '<p style="text-align:center">Desde ' + precio1.toFixed(2) + ' &euro;</p>'
                                                );
                                            }
                                        }
                                        $('#prod' + contador).css({ border: '1px solid #dfdddc' });
                                        contador++;
                                        saberNumero = 1;
                                    } else {
                                        saberNumero = 1;
                                    }
                                });
                            });
                        } else {
                            if (anchoFiltrado != 'Todos' && altura != 'Todos') {
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
                                                '<img class="producto" id="imagenProd" src="data:image/gif;base64,' +
                                                    imagen +
                                                    '" id="imagenProd" width="500px" height="290.5px"  style=" opacity: 0.7">'
                                            );
                                            $('#prod' + contador).attr('class', 'productosColor' + value[4]['id']);
                                            $('.prodDiv' + contador).append(
                                                '<p id="nombreMesita' +
                                                    contador +
                                                    '" class="' +
                                                    value[4]['id'] +
                                                    ' ' +
                                                    value[5] +
                                                    '" style="text-align:center">' +
                                                    value[4]['nombre'] +
                                                    '</p>'
                                            );
                                            var precio1 = value[3];
                                            for (let r = 0; r < precio['length']; r++) {
                                                if (precio[r][2] == value[4]['id']) {
                                                    var cuenta = precio[r][1] / 100;
                                                    cuenta = cuenta + 1;
                                                    precio1 = precio1 * precioPunto;
                                                    precio1 = precio1 * cuenta;
                                                    $('.prodDiv' + contador).append(
                                                        '<p style="text-align:center">Desde ' + precio1.toFixed(2) + ' &euro;</p>'
                                                    );
                                                }
                                            }
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

        $('#euroCalculadora').removeAttr('style');
        $('#medidasEspecialesTexto').css({ display: 'none' });
        $('#medidasAncho').css({ display: 'none' });
        $('#medidasFondo').css({ display: 'none' });
        $('#medidasAlto').css({ display: 'none' });
        var precioTienda = this.precioTienda;
        this.interiores = JSON.parse(sessionStorage.getItem('interiores'));
        var dimensiones = this.dimensionesProductoTipoService.todos;

        $('#precios1').empty();

        $('#precioCalculado1').empty();
        $('#dimensionesInput1').css({ 'background-color': 'white' });
        $('#dimensionesInput5').css({ 'background-color': 'white' });
        $('#dimensionesInput6').css({ 'background-color': 'white' });
        $('#dimensionesInput2').css({ 'background-color': 'white' });
        $('#dimensionesInput3').css({ 'background-color': 'white' });
        $('#dimensionesInput4').css({ 'background-color': 'white' });
        $('#dimensionesInput' + id).css({ 'background-color': '#DFDDDC' });
        var idProd;
        idProd = $('#nombreMesita').attr('class');
        var precioPunto = this.precioPunto[0];
        var todosLosPrecios = this.precioTiendaProductosService.todos;

        for (let y = 0; y < todosLosPrecios.length; y++) {
            if (idProd == todosLosPrecios[y][2]) {
                var precioProducto = todosLosPrecios[y][1];
            }
        }
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
                    var text = $('#nombreMesita').text();
                    var total = $('#total').text();
                    var totalfloat = parseFloat(total);
                    var precio = parseFloat(datos[h]['precio']);
                    precio = precio * precioPunto;
                    precioProducto = precioProducto / 100;
                    var cuenta = precio * precioProducto;
                    precio = precio + cuenta;
                    precio = Math.round(precio * 100) / 100;
                    totalfloat = totalfloat + precio;
                    this.precioDimension = totalfloat;
                    $('#total').text(totalfloat);
                    $('#precioDimension').text(totalfloat);
                    $('#idioma').attr('value', datos[h]['id']);
                    $('#datos1 #ancho1').text(datos[h]['ancho']);
                    $('#datos1 #ancho1').attr('class', datos[h]['id']);
                    $('#datos1 #alto1').text(datos[h]['alto']);
                    $('#datos1 #fondoDatosDimen').text(datos[h]['fondo']);
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

    public especiales1(id) {
        var medidasEspeciales = this.especiales;
        $('#especiales').removeAttr('style');
        $('#especiales').attr('style');
        $('#especiales').css({ width: '100%' });
        $('#especiales').css({ float: 'left' });
        $('#cambioAncho').empty();
        $('#medidasEspeciales').css({ display: 'block' });
        $('#inputFondoAncho').remove();
        $('#inputAltoAncho').remove();
        $('#textoAncho').remove();
        $('#anchoForm').remove();
        $('#cambioFondo').empty();
        $('#textoFondo').remove();
        $('#inputfondoAlto').remove();
        $('#altoTexto').remove();
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

        $('#imagenAcabado').remove();
        $('#acabados').css({ display: 'none' });
        for (let i = 1; i <= 5; i++) {
            $('.apoyoCogido' + i).empty();
        }
        for (let i = 1; i <= 15; i++) {
            $('#aca1' + i).empty();
        }
        $('#productoCalculadora1 #datos1').empty();

        this.medidasEspecialesService.findProd(idProd, 1).subscribe(data => {
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
                                '<p id="textoAncho" style="float:left;margin-left: 2%;font-size: 20px;">Escribe un valor entre ' +
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
                $('#medidasEspecialesTexto').css({ 'margin-top': '5%' });
                $('#medidasEspecialesTexto').css({ 'margin-bottom': '5%' });
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
                                '<form id="anchoForm"><select id="anchosSelect" style="margin-left: 2%;width: 30%;text-align:center"><option></option></select></form'
                            );
                            for (let j = 0; j < dimen.length; j++) {
                                $('#anchosSelect').append('<option value="' + dimen[j]['id'] + '">' + dimen[j]['ancho'] + '</option>');
                            }

                            $('#medidasFondo').append(
                                '<p id="textoFondo" style="float:left;margin-left: 2%;font-size: 20px;">Escribe un valor entre ' +
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
                $('#medidasEspecialesTexto').css({ 'margin-top': '5%' });
                $('#medidasEspecialesTexto').css({ 'margin-bottom': '5%' });
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
                                '<form id="anchoForm"><select id="anchosSelect" style="margin-left: 2%;width: 30%;text-align:center"><option></option></select></form'
                            );
                            for (let j = 0; j < dimen.length; j++) {
                                $('#anchosSelect').append('<option value="' + dimen[j]['id'] + '">' + dimen[j]['ancho'] + '</option>');
                            }

                            $('#medidasAlto').append(
                                '<p id="altoTexto" style="float:left;margin-left: 2%;font-size: 20px;">Escribe un valor entre ' +
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
    public cambiarMedidasEspeciales() {
        var idProd;
        idProd = $('#nombreMesita').attr('class');
        $('#dimensionesInput20').css({ 'background-color': 'white' });
        $('#dimensionesInput20').removeAttr('disabled');
        var ancho = $('#anchoEspecial').val();
        this.dimensionesProductoTipoService.findProducto(idProd).subscribe(data => {
            var ole = 0;
            var datos = data.body;
            var todo;
            var especiales;
            for (let i = 0; i < datos['length']; i++) {
                if (datos[i]['mensaje'] == 'Medidas Especiales') {
                    especiales = datos[i];
                }
                if (datos[i]['ancho'] >= ancho) {
                    if (ole == 0) {
                        ole = 1;
                        todo = datos[i];
                    }
                }
            }
            especiales['ancho'] = 'Ancho especial:' + ancho;
            especiales['alto'] = 'Alto: ' + todo['alto'];
            especiales['fondo'] = 'Fondo: ' + todo['fondo'];
            especiales['precio'] = todo['precio'];
            this.especialNuevo = especiales;
            for (let i = 0; i < datos['length']; i++) {
                if (datos[i]['mensaje'] == 'Medidas Especiales') {
                    data.body[i] = especiales;
                }
            }
            this.todasDimensiones = data.body;
            this.dimensionCogidaTodo = todo;
            var precio = parseFloat(todo['precio']);
            $('#precioEspecialAncho').text((precio * 1.3).toFixed(2) + ' €');
        });
    }

    public medEspecialMeter() {
        var especiales = this.especialNuevo;
        var todo = this.dimensionCogidaTodo;
        $('#ancho1').text(especiales['ancho']);
        $('#dimensionesInput20').css({ 'background-color': '#DFDDDC' });
        this.cambioDimension = 1;
        console.log(especiales);
        console.log(todo);
        $('#botonCalculadoraMod').removeAttr('class');
    }

    public cambioMedidas(id) {
        var datos;
        var precioTienda = this.precioTienda;
        var imagen;
        var cont = 0;
        var acabados = [];
        var dimensiones = this.todasDimensiones;
        var dimensionProxima;
        var idProd;
        $('#imagenAcabado').remove();
        $('#acabados').css({ display: 'none' });
        $('#nombreApoyoTitulo').css({ display: 'none' });
        for (let i = 1; i <= 5; i++) {
            $('.apoyoCogido' + i).empty();
        }
        for (let i = 1; i <= 15; i++) {
            $('#aca1' + i).empty();
        }
        $('#productoCalculadora1 #datos1').empty();
        $('#imagenAcabadoPrincipal').empty();
        $('#imagenAcabado').remove();
        idProd = $('#nombreMesita').attr('class');
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
                            $('#idioma').attr('value', dimensiones[k]['id']);
                            $('#datos1').append(
                                '<p class="' +
                                    idDimenTipo +
                                    '" id="ancho1" style="width:100%">Ancho<span style="float:right" id="valorAnchoESPECIAL"></span></p>'
                            );
                            $('#datos1').append(
                                '<p id="alto1" class="' +
                                    precioAum +
                                    '" style="width:100%">Alto<span style="float:right" id="valorAltoESPECIAL"></span></p>'
                            );
                            $('#datos1').append(
                                '<p id="fondo1" style="width:100%">Fondo<span style="float:right" id="valorFondoESPECIAL"></span></p>'
                            );
                            $('#datos1').append(
                                '<p style="width:100%">Incremento 30%<span style="float:right">+ <span id="precioAum" ></span> &euro;</span></p>'
                            );
                            var total = $('#total').text();
                            var totalfloat = parseFloat(total);
                            var precio = parseFloat(dimensiones[k]['precio']);
                            precio = precio * precioTienda;
                            precio = Math.round(precio * 100) / 100;
                            totalfloat = totalfloat + precio;
                            var precioAum = precio * 0.3;
                            var precioAumGuardado = precioAum;
                            precioAum = precio + precioAum;
                            $('#total').text(precioAum);
                            $('#precioDimension').text(precioAum);
                            $('#valorAnchoESPECIAL').text(valor);
                            $('#idioma').attr('value', dimensiones[k]['id']);
                            $('#valorAltoESPECIAL').text(dimensiones[k]['alto']);
                            $('#valorFondoESPECIAL').text(dimensiones[k]['fondo']);
                            $('#precioAum').text(precioAumGuardado);
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
                                    $('#datos1').append(
                                        '<p class="' +
                                            idDimenTipo +
                                            '" id="ancho1" style="width:100%">Ancho<span style="float:right" id="valorAnchoESPECIAL"></span></p>'
                                    );
                                    $('#datos1').append(
                                        '<p id="alto1" class="' +
                                            precioAum +
                                            '" style="width:100%">Alto<span style="float:right" id="valorAltoESPECIAL"></span></p>'
                                    );
                                    $('#datos1').append(
                                        '<p id="fondo1" style="width:100%">Fondo<span style="float:right" id="valorFondoESPECIAL"></span></p>'
                                    );
                                    $('#datos1').append(
                                        '<p style="width:100%">Incremento 30%<span id="precioAum" style="float:right"></span></p>'
                                    );
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
                                    $('#valorAnchoESPECIAL').text(valor);
                                    $('#idioma').attr('value', dimensiones[k]['id']);
                                    $('#valorAltoESPECIAL').text(dimensiones[k]['alto']);
                                    $('#valorFondoESPECIAL').text(dimensiones[k]['fondo']);
                                    $('#precioAum').text(precioAum);
                                }
                            }
                        }
                    }
                }
                $('#acabados').css({ display: 'block' });
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
                                        '" class="imagenAcabadoPrincipalImg"  width="650px" height="433px">'
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

                            $('#aca1' + u).append(
                                '<button class="cambiarAcabado" style="float:left;margin-bottom:35px;margin-top:15px;background-color: white;border: 1px solid #d5d5d5;height: 40px; width: 100px;" class="cambiarAca1" id="color" data-toggle="modal" data-target="#myModalColores' +
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

                this.productosDormitorioService.categoria(2).subscribe(data => {
                    for (let w = 0; w < data.body['length']; w++) {
                        $('#modalApoyo #apoyoModal' + w).empty();
                        $('#modalApoyo #apoyoModal' + w).append(
                            '<img  src="data:image/gif;base64,' +
                                data.body[w]['imagen'] +
                                '" id="imagenApoyo' +
                                w +
                                '" class="' +
                                data.body[w]['id'] +
                                '" height="160px" width="280px" style=" opacity: 0.7;">'
                        );
                        $('#modalApoyo #apoyoModal' + w).append(
                            '<strong><p style="color:black;position: absolute;margin-top: -105px;font-size: 30px;margin-left: 80px;">' +
                                data.body[w]['nombre'] +
                                '</strong></p>'
                        );
                    }
                });
                for (let i = 1; i <= 14; i++) {
                    for (let k = 0; k < 14; k++) {
                        $('#myModalColores' + i + ' #acabadoImagen' + k).empty();
                    }
                }

                $('#botonApoyoNuevo').empty();
                $('#botonApoyoNuevo').append(
                    '<button style="float:left;margin-bottom:35px;margin-top:15px;background-color: white;border: 1px solid #d5d5d5;height: 40px; width: 100px;" class="cambiarApoyo" id="color" data-toggle="modal" data-target="#modalApoyo">Apoyo</button>'
                );
                $('#botonApoyoNuevo').append(
                    '<img id="imagenAcabadoPrincipal1" src"../../../content/images/blanco.jpg" height="60px" border="0" width="200px" style=" opacity: 0.7;margin-left:20px;"/>'
                );
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

                            var total = $('#total').text();
                            var totalfloat = parseFloat(total);
                            var precio = parseFloat(dimensiones[k]['precio']);
                            precio = precio * precioTienda;
                            precio = Math.round(precio * 100) / 100;
                            totalfloat = totalfloat + precio;
                            var precioAum = precio * 0.3;
                            var precioAumGuardado = precioAum;
                            precioAum = precio + precioAum;

                            $('#total').text(precioAum);
                            $('#precioDimension').text(precioAum);

                            $('#idioma').attr('value', dimensiones[k]['id']);
                            $('#datos1').append(
                                '<p class="' +
                                    idDimenTipo +
                                    '" id="ancho1" style="width:100%">Ancho<span style="float:right" id="valorAnchoESPECIAL"></span></p>'
                            );
                            $('#datos1').append(
                                '<p id="alto1" class="' +
                                    precioAum +
                                    '" style="width:100%">Alto<span style="float:right" id="valorAltoESPECIAL"></span></p>'
                            );
                            $('#datos1').append(
                                '<p id="fondo1" style="width:100%">Fondo<span style="float:right" id="valorFondoESPECIAL"></span></p>'
                            );
                            $('#datos1').append(
                                '<p style="width:100%">Incremento 30%<span style="float:right">+ <span id="precioAum" ></span> &euro;</span></p>'
                            );
                            var total = $('#total').text();
                            var totalfloat = parseFloat(total);
                            var precio = parseFloat(dimensiones[k]['precio']);
                            precio = precio * precioTienda;
                            precio = Math.round(precio * 100) / 100;
                            totalfloat = totalfloat + precio;
                            var precioAum = precio * 0.3;
                            var precioAumGuardado = precioAum;
                            precioAum = precio + precioAum;
                            $('#total').text(precioAum);
                            $('#precioDimension').text(precioAum);
                            $('#valorAnchoESPECIAL').text(valor);
                            $('#idioma').attr('value', dimensiones[k]['id']);
                            $('#valorAltoESPECIAL').text(dimensiones[k]['alto']);
                            $('#valorFondoESPECIAL').text(dimensiones[k]['fondo']);
                            $('#precioAum').text(precioAumGuardado);
                        }
                    }
                }
                $('#acabados').css({ display: 'block' });
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
                                        '" class="imagenAcabadoPrincipalImg"  width="650px" height="433px">'
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

                            $('#aca1' + u).append(
                                '<button class="cambiarAcabado" style="float:left;margin-bottom:35px;margin-top:15px;background-color: white;border: 1px solid #d5d5d5;height: 40px; width: 100px;" class="cambiarAca1" id="color" data-toggle="modal" data-target="#myModalColores' +
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

                this.productosDormitorioService.categoria(2).subscribe(data => {
                    for (let w = 0; w < data.body['length']; w++) {
                        $('#modalApoyo #apoyoModal' + w).empty();
                        $('#modalApoyo #apoyoModal' + w).append(
                            '<img  src="data:image/gif;base64,' +
                                data.body[w]['imagen'] +
                                '" id="imagenApoyo' +
                                w +
                                '" class="' +
                                data.body[w]['id'] +
                                '" height="160px" width="280px" style=" opacity: 0.7;">'
                        );
                        $('#modalApoyo #apoyoModal' + w).append(
                            '<strong><p style="color:black;position: absolute;margin-top: -105px;font-size: 30px;margin-left: 80px;">' +
                                data.body[w]['nombre'] +
                                '</strong></p>'
                        );
                    }
                });
                for (let i = 1; i <= 14; i++) {
                    for (let k = 0; k < 14; k++) {
                        $('#myModalColores' + i + ' #acabadoImagen' + k).empty();
                    }
                }

                $('#botonApoyoNuevo').empty();
                $('#botonApoyoNuevo').append(
                    '<button style="float:left;margin-bottom:35px;margin-top:15px;background-color: white;border: 1px solid #d5d5d5;height: 40px; width: 100px;" class="cambiarApoyo" id="color" data-toggle="modal" data-target="#modalApoyo">Apoyo</button>'
                );
                $('#botonApoyoNuevo').append(
                    '<img id="imagenAcabadoPrincipal1" src"../../../content/images/blanco.jpg" height="60px" border="0" width="200px" style=" opacity: 0.7;margin-left:20px;"/>'
                );
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
                            $('#idioma').attr('value', dimensiones[k]['id']);
                            $('#datos1').append(
                                '<p class="' +
                                    idDimenTipo +
                                    '" id="ancho1" style="width:100%">Ancho<span style="float:right" id="valorAnchoESPECIAL"></span></p>'
                            );
                            $('#datos1').append(
                                '<p id="alto1" class="' +
                                    precioAum +
                                    '" style="width:100%">Alto<span style="float:right" id="valorAltoESPECIAL"></span></p>'
                            );
                            $('#datos1').append(
                                '<p id="fondo1" style="width:100%">Fondo<span style="float:right" id="valorFondoESPECIAL"></span></p>'
                            );
                            $('#datos1').append(
                                '<p style="width:100%">Incremento 30%<span style="float:right">+ <span id="precioAum" ></span> &euro;</span></p>'
                            );
                            var total = $('#total').text();
                            var totalfloat = parseFloat(total);
                            var precio = parseFloat(dimensiones[k]['precio']);
                            precio = precio * precioTienda;
                            precio = Math.round(precio * 100) / 100;
                            totalfloat = totalfloat + precio;
                            var precioAum = precio * 0.3;
                            var precioAumGuardado = precioAum;
                            precioAum = precio + precioAum;
                            $('#total').text(precioAum);
                            $('#precioDimension').text(precioAum);
                            $('#valorAnchoESPECIAL').text(valor);
                            $('#idioma').attr('value', dimensiones[k]['id']);
                            $('#valorAltoESPECIAL').text(dimensiones[k]['alto']);
                            $('#valorFondoESPECIAL').text(dimensiones[k]['fondo']);
                            $('#precioAum').text(precioAumGuardado);
                        }
                    }
                }
                $('#acabados').css({ display: 'block' });
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
                                        '" class="imagenAcabadoPrincipalImg"  width="650px" height="433px">'
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

                            $('#aca1' + u).append(
                                '<button class="cambiarAcabado" style="float:left;margin-bottom:35px;margin-top:15px;background-color: white;border: 1px solid #d5d5d5;height: 40px; width: 100px;" class="cambiarAca1" id="color" data-toggle="modal" data-target="#myModalColores' +
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

                this.productosDormitorioService.categoria(2).subscribe(data => {
                    for (let w = 0; w < data.body['length']; w++) {
                        $('#modalApoyo #apoyoModal' + w).empty();
                        $('#modalApoyo #apoyoModal' + w).append(
                            '<img  src="data:image/gif;base64,' +
                                data.body[w]['imagen'] +
                                '" id="imagenApoyo' +
                                w +
                                '" class="' +
                                data.body[w]['id'] +
                                '" height="160px" width="280px" style=" opacity: 0.7;">'
                        );
                        $('#modalApoyo #apoyoModal' + w).append(
                            '<strong><p style="color:black;position: absolute;margin-top: -105px;font-size: 30px;margin-left: 80px;">' +
                                data.body[w]['nombre'] +
                                '</strong></p>'
                        );
                    }
                });
                for (let i = 1; i <= 14; i++) {
                    for (let k = 0; k < 14; k++) {
                        $('#myModalColores' + i + ' #acabadoImagen' + k).empty();
                    }
                }

                $('#botonApoyoNuevo').empty();
                $('#botonApoyoNuevo').append(
                    '<button style="float:left;margin-bottom:35px;margin-top:15px;background-color: white;border: 1px solid #d5d5d5;height: 40px; width: 100px;" class="cambiarApoyo" id="color" data-toggle="modal" data-target="#modalApoyo">Apoyo</button>'
                );
                $('#botonApoyoNuevo').append(
                    '<img id="imagenAcabadoPrincipal1" src"../../../content/images/blanco.jpg" height="60px" border="0" width="200px" style=" opacity: 0.7;margin-left:20px;"/>'
                );
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
        $('#botonCalculadoraMod').removeAttr('class');
        var k = 1;
        var nombreAcabado;
        var nombre = $('#nombreMesita').text();
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

                $('#datos1 #nombreAcaCalcu' + id1).text(value['nombre']);

                var src = 'data:image/gif;base64,' + value['imagenFondo'];
                $('#datos1 #acabado' + id1 + ' #imagenAcabadoPrincipal1').attr('src', src);
                $('#datos1 #acabado' + id1 + ' #imagenAcabadoPrincipal1').attr('class', value['id']);

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
                        $('#acabados #imagenAcabadoPrincipal').append(
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
                        $('#acabados #imagenAcabadoPrincipal').append(
                            '<img id="cajon" class="' +
                                nombreAcabado +
                                '" width="650px" height="433px"  src="../../../content/images/mb5/2/mb5_2_' +
                                nombreAcabado +
                                '_optimized.png">'
                        );
                    } else {
                        $('#acabados #imagenAcabadoPrincipal').append(
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
                        $('#acabados #imagenAcabadoPrincipal').append(
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
                        $('#acabados #imagenAcabadoPrincipal').append(
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
                $('#val' + id1).remove();
                $('#val' + id1 + 'Dato').remove();
                $('#valor' + id1).remove();
                $('#datos1').append(
                    '<p style="width:100%;display:none"> <span id="val' +
                        id1 +
                        '">Acabado ' +
                        id1 +
                        ' : </span><span id="val' +
                        id1 +
                        'Dato" class="' +
                        value['id'] +
                        '">' +
                        value['nombre'] +
                        '</span></p>'
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
        $('#apoyoDatosTexto').remove();
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
        var idApoyo;
        idApoyo = $('#apoyoModal' + id + ' #imagenApoyo' + id).attr('class');
        var idProd = $('#nombreMesita').attr('class');
        var h;
        h = $('#productoCalculadora1  #datos1 #ancho1').text();
        var precioPunto = this.precioPunto[0];
        var todosLosPrecios = this.precioTiendaProductosService.apoyo;
        var precioDimension = this.precioDimension;
        var dimension = [];
        var datos = [];
        var datosApoyo;
        var valoresAca = [];
        var cont = 1;
        var contadorApoyo = 0;
        var fondo;
        fondo = $('#fondoDatosDimen').text();
        if (fondo == 42) {
            fondo = 38.5;
        }
        if (fondo == 47) {
            fondo = 43.5;
        }
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
        if (idApoyo == 18) {
            var hbueno = parseFloat(h) - 5;
        }
        if (idApoyo == 17) {
            var hbueno = parseFloat(h) - 12.5;
        }
        this.tiposApoyoService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                datos = data['body'];
                this.tiposApoyoService.todos = datos;
                this.cambiarApoyo = 1;
                $.each(datos, function(index, value) {
                    if (idApoyo == 15 || idApoyo == 16) {
                        if (idApoyo == 16) {
                            if (h < 175) {
                                if (idApoyo == value['productoApoyo']['id'] && value['ancho'] < 175 && value['fondo'] == fondo - 1) {
                                    var precio = parseFloat(value['precio']);
                                    for (let f = 0; f < todosLosPrecios.length; f++) {
                                        if (idApoyo == todosLosPrecios[f][2]) {
                                            var precioProducto = todosLosPrecios[f][1];
                                        }
                                    }
                                    precioProducto = precioProducto / 100;
                                    precio = precio * precioPunto;
                                    var cuenta = precio * precioProducto;
                                    cuenta = precio + cuenta;
                                    precio = cuenta;
                                    precio = Math.round(precio * 100) / 100;
                                    var totalfloat = parseFloat(precioDimension);
                                    totalfloat = totalfloat + precio;
                                    $('#precioDimension').text(totalfloat.toFixed(2));
                                    $('#datos1').append(
                                        '<p id="apoyoDatosTexto" style="width:100%;display:none;"><span id="nombreApoyo">Apoyo : ' +
                                            value['productoApoyo']['nombre'] +
                                            '</span><span style="float:right" id="apoyo1" class="' +
                                            value['id'] +
                                            '">+' +
                                            precio +
                                            '&euro;</span></p>'
                                    );
                                    $('#datos1 #apoyoCalculadoraTexto').val(value['productoApoyo']['nombre']);
                                    $('#datos1 #precioApoyo').text('+ ' + precio + ' ');
                                    $('#botonApoyoNuevo #nombreApoyoCajon').remove();
                                    $('#botonApoyoNuevo').append(
                                        '<p id="nombreApoyoCajon" style="color:black;margin-left: 180px;margin-top: -42px;position:absolute" >' +
                                            value['productoApoyo']['nombre'] +
                                            '</p>'
                                    );
                                    var total = $('#total').text();
                                    var totalfloat = parseFloat(total);
                                    totalfloat = totalfloat + precio;
                                    $('#total').text(totalfloat);
                                }
                            }

                            if (h >= 175) {
                                if (idApoyo == value['productoApoyo']['id'] && value['ancho'] >= 175 && value['fondo'] == fondo - 1) {
                                    var precio = parseFloat(value['precio']);
                                    for (let f = 0; f < todosLosPrecios.length; f++) {
                                        if (idApoyo == todosLosPrecios[f][2]) {
                                            var precioProducto = todosLosPrecios[f][1];
                                        }
                                    }
                                    precioProducto = precioProducto / 100;
                                    precio = precio * precioPunto;
                                    var cuenta = precio * precioProducto;
                                    cuenta = precio + cuenta;
                                    precio = cuenta;
                                    precio = Math.round(precio * 100) / 100;
                                    var totalfloat = parseFloat(precioDimension);
                                    totalfloat = totalfloat + precio;
                                    $('#precioDimension').text(totalfloat.toFixed(2));
                                    $('#datos1').append(
                                        '<p id="apoyoDatosTexto" style="width:100%;display:none"><span id="nombreApoyo">Apoyo : ' +
                                            value['productoApoyo']['nombre'] +
                                            '</span><span style="float:right" id="apoyo1" class="' +
                                            value['id'] +
                                            '">+' +
                                            precio +
                                            '&euro;</span></p>'
                                    );
                                    $('#datos1 #apoyoCalculadoraTexto').val(value['productoApoyo']['nombre']);
                                    $('#datos1 #precioApoyo').text('+ ' + precio + ' ');
                                    $('#botonApoyoNuevo #nombreApoyoCajon').remove();
                                    $('#botonApoyoNuevo').append(
                                        '<p id="nombreApoyoCajon" style="color:black;margin-left: 180px;margin-top: -42px;position:absolute" >' +
                                            value['productoApoyo']['nombre'] +
                                            '</p>'
                                    );
                                    var total = $('#total').text();
                                    var totalfloat = parseFloat(total);
                                    totalfloat = totalfloat + precio;
                                    $('#total').text(totalfloat);
                                }
                            }
                        }

                        if (idApoyo == 15) {
                            if (h < 150) {
                                if (idApoyo == value['productoApoyo']['id'] && value['ancho'] < 150) {
                                    var precio = parseFloat(value['precio']);
                                    for (let f = 0; f < todosLosPrecios.length; f++) {
                                        if (idApoyo == todosLosPrecios[f][2]) {
                                            var precioProducto = todosLosPrecios[f][1];
                                        }
                                    }
                                    precioProducto = precioProducto / 100;
                                    precio = precio * precioPunto;
                                    var cuenta = precio * precioProducto;
                                    cuenta = precio + cuenta;
                                    precio = cuenta;
                                    precio = Math.round(precio * 100) / 100;
                                    var totalfloat = parseFloat(precioDimension);
                                    totalfloat = totalfloat + precio;
                                    $('#precioDimension').text(totalfloat.toFixed(2));
                                    $('#datos1').append(
                                        '<p id="apoyoDatosTexto" style="width:100%;display:none"><span id="nombreApoyo">Apoyo : ' +
                                            value['productoApoyo']['nombre'] +
                                            '</span><span style="float:right" id="apoyo1" class="' +
                                            value['id'] +
                                            '">+' +
                                            precio +
                                            '&euro;</span></p>'
                                    );
                                    $('#datos1 #apoyoCalculadoraTexto').val(value['productoApoyo']['nombre']);
                                    $('#datos1 #precioApoyo').text('+ ' + precio + ' ');
                                    $('#botonApoyoNuevo #nombreApoyoCajon').remove();
                                    $('#botonApoyoNuevo').append(
                                        '<p id="nombreApoyoCajon" style="color:black;margin-left: 180px;margin-top: -42px;position:absolute" >' +
                                            value['productoApoyo']['nombre'] +
                                            '</p>'
                                    );
                                    var total = $('#total').text();
                                    var totalfloat = parseFloat(total);
                                    totalfloat = totalfloat + precio;
                                    $('#total').text(totalfloat);
                                }
                            }

                            if (h >= 150) {
                                if (idApoyo == value['productoApoyo']['id'] && value['ancho'] >= 150) {
                                    var precio = parseFloat(value['precio']);
                                    for (let f = 0; f < todosLosPrecios.length; f++) {
                                        if (idApoyo == todosLosPrecios[f][2]) {
                                            var precioProducto = todosLosPrecios[f][1];
                                        }
                                    }
                                    precioProducto = precioProducto / 100;
                                    precio = precio * precioPunto;
                                    var cuenta = precio * precioProducto;
                                    cuenta = precio + cuenta;
                                    precio = cuenta;
                                    precio = Math.round(precio * 100) / 100;
                                    var totalfloat = parseFloat(precioDimension);
                                    totalfloat = totalfloat + precio;
                                    $('#precioDimension').text(totalfloat.toFixed(2));
                                    $('#datos1').append(
                                        '<p id="apoyoDatosTexto" style="width:100%;display:none"><span id="nombreApoyo">Apoyo : ' +
                                            value['productoApoyo']['nombre'] +
                                            '</span><span style="float:right" id="apoyo1" class="' +
                                            value['id'] +
                                            '">+' +
                                            precio +
                                            '&euro;</span></p>'
                                    );
                                    $('#botonApoyoNuevo #nombreApoyoCajon').remove();
                                    $('#datos1 #apoyoCalculadoraTexto').val(value['productoApoyo']['nombre']);
                                    $('#datos1 #precioApoyo').text('+ ' + precio + ' ');
                                    $('#botonApoyoNuevo').append(
                                        '<p id="nombreApoyoCajon" style="color:black;margin-left: 180px;margin-top: -42px;position:absolute" >' +
                                            value['productoApoyo']['nombre'] +
                                            '</p>'
                                    );
                                    var total = $('#total').text();
                                    var totalfloat = parseFloat(total);
                                    totalfloat = totalfloat + precio;
                                    $('#total').text(totalfloat);
                                }
                            }
                        }
                    } else {
                        if (idApoyo == 18) {
                            if (idApoyo == value['productoApoyo']['id'] && value['ancho'] == hbueno && value['fondo'] == fondo) {
                                var precio = parseFloat(value['precio']);
                                for (let f = 0; f < todosLosPrecios.length; f++) {
                                    if (idApoyo == todosLosPrecios[f][2]) {
                                        var precioProducto = todosLosPrecios[f][1];
                                    }
                                }
                                precioProducto = precioProducto / 100;
                                precio = precio * precioPunto;
                                var cuenta = precio * precioProducto;
                                cuenta = precio + cuenta;
                                precio = cuenta;
                                precio = Math.round(precio * 100) / 100;
                                var totalfloat = parseFloat(precioDimension);
                                totalfloat = totalfloat + precio;
                                $('#precioDimension').text(totalfloat.toFixed(2));
                                $('#datos1').append(
                                    '<p id="apoyoDatosTexto" style="width:100%;display:none"><span id="nombreApoyo">Apoyo : ' +
                                        value['productoApoyo']['nombre'] +
                                        '</span><span style="float:right" id="apoyo1" class="' +
                                        value['id'] +
                                        '">+' +
                                        precio +
                                        '&euro;</span></p>'
                                );
                                $('#botonApoyoNuevo #nombreApoyoCajon').remove();
                                $('#datos1 #apoyoCalculadoraTexto').val(value['productoApoyo']['nombre']);
                                $('#datos1 #precioApoyo').text('+ ' + precio + ' ');
                                $('#botonApoyoNuevo').append(
                                    '<p id="nombreApoyoCajon" style="color:black;margin-left: 180px;margin-top: -42px;position:absolute" >' +
                                        value['productoApoyo']['nombre'] +
                                        '</p>'
                                );
                                var total = $('#total').text();
                                var totalfloat = parseFloat(total);
                                totalfloat = totalfloat + precio;
                                $('#total').text(totalfloat);
                            }
                        }

                        if (idApoyo == 17) {
                            if (idApoyo == value['productoApoyo']['id'] && value['ancho'] == hbueno) {
                                var precio = parseFloat(value['precio']);
                                for (let f = 0; f < todosLosPrecios.length; f++) {
                                    if (idApoyo == todosLosPrecios[f][2]) {
                                        var precioProducto = todosLosPrecios[f][1];
                                    }
                                }
                                precioProducto = precioProducto / 100;
                                precio = precio * precioPunto;
                                var cuenta = precio * precioProducto;
                                cuenta = precio + cuenta;
                                precio = cuenta;
                                precio = Math.round(precio * 100) / 100;
                                var totalfloat = parseFloat(precioDimension);
                                totalfloat = totalfloat + precio;
                                $('#precioDimension').text(totalfloat.toFixed(2));
                                $('#datos1').append(
                                    '<p id="apoyoDatosTexto" style="width:100%;display:none"><span id="nombreApoyo">Apoyo : ' +
                                        value['productoApoyo']['nombre'] +
                                        '</span><span style="float:right" id="apoyo1" class="' +
                                        value['id'] +
                                        '">+' +
                                        precio +
                                        '&euro;</span></p>'
                                );
                                $('#datos1 #apoyoCalculadoraTexto').val(value['productoApoyo']['nombre']);
                                $('#datos1 #precioApoyo').text('+ ' + precio + ' ');
                                $('#botonApoyoNuevo #nombreApoyoCajon').remove();
                                $('#botonApoyoNuevo').append(
                                    '<p id="nombreApoyoCajon" style="color:black;margin-left: 180px;margin-top: -42px;position:absolute" >' +
                                        value['productoApoyo']['nombre'] +
                                        '</p>'
                                );
                                var total = $('#total').text();
                                var totalfloat = parseFloat(total);
                                totalfloat = totalfloat + precio;
                                $('#total').text(totalfloat);
                            }
                        }
                    }
                });
            });
        if (contadorApoyo == cont - 1) {
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
                $('#botonCalculadora').removeAttr('class');
            }
            $('#terminarConfiguracion').removeAttr('style');
            $('#terminarConfiguracion').attr('style');
            $('#terminarConfiguracion').css({ float: 'left' });
            $('#terminarConfiguracion').css({ width: '100%' });
        }
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
            $('#botonCalculadora').removeAttr('class');
        } else {
            $('#textoFinal').removeAttr('style');
            $('#textoFinal').attr('style');
            $('#textoFinal').css({ width: '100%' });
            $('#textoFinal').css({ float: 'left' });
            $('#botonCalculadora').removeAttr('class');
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
            const dimen = $('#productoCalculadora1 #datos1 #ancho' + i).attr('class');
            const idApoyo = $('#productoCalculadora1 #datos1 #apoyo' + i).attr('class');
            const idIluminacion = $('#productoCalculadora1 #datos1 #iluminacion' + i).attr('class');
            const ancho = $('#productoCalculadora1 #datos1 #ancho' + i).text();
            const alto = $('#productoCalculadora1 #datos1 #alto' + i).text();
            const fondo = $('#productoCalculadora1 #datos1 #fondo' + i).text();
            const precio = $('#productoCalculadora1 #datos1 #alto' + i).attr('class');
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
                acabadoCogido = $('#productoCalculadora1 #datos1 #val' + j + 'Dato').attr('class');
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
                        aca[w]['imagenFondo'] = '';
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
                    prod[1]['imagen'] = '';
                    prod[1]['productosDormitorio']['imagen'] = '';
                    prod[1]['apoyo']['imagen'] = '';
                    console.log(prod);
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
        this.borrarProdCalculadora();
    }

    public cargarComposicion() {
        var productosArrayNombres = this.productosArrayNombre;
        var medidas = this.medidasModal;
        var acabados = [];
        $('#myModalComposicion .modal-body').empty();
        var contAca = 1;
        var nombreCarpeta;
        for (let i = 1; i <= 100; i++) {
            var sesion = JSON.parse(sessionStorage.getItem('prod' + i));
            if (sesion != null) {
                $('#myModalComposicion .modal-body').append(
                    '<div style="float: left;width: 500px;text-align: center;" id="cuerpo' + i + '"></div>'
                );
                var nombre = productosArrayNombres[sesion[1]['productosDormitorio']['id']];
                console.log(nombre);
                for (let j = 1; j < 15; j++) {
                    if (sesion[1]['acabado' + j] != undefined) {
                        acabados[contAca] = sesion[1]['acabado' + j]['nombre'];
                        contAca++;
                    }
                }

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
                    nombreCarpeta = 'mb5';
                } else {
                    nombreCarpeta = nombre;
                }

                contAca = 1;
                for (let k = 1; k < acabados.length; k++) {
                    if (k == 1) {
                        if (i == 1) {
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            $('#cuerpo' + i).append(
                                '<img style="z-index:100;' +
                                    height +
                                    ';' +
                                    width +
                                    '" id="' +
                                    nombre +
                                    '" class="' +
                                    acabados[k].toLowerCase() +
                                    'Modal" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/' +
                                    k +
                                    '/' +
                                    nombreCarpeta +
                                    '_' +
                                    k +
                                    '_' +
                                    acabados[k].toLowerCase() +
                                    '_optimized.png"><p> </p>'
                            );
                        } else {
                            var prodMed = this.medidasModal[nombre];
                            var left = prodMed.split(';')[0];
                            var bottom = prodMed.split(';')[1];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            $('#cuerpo' + i).append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';' +
                                    left +
                                    ';' +
                                    bottom +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    '"  class="' +
                                    acabados[k].toLowerCase() +
                                    'Modal" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/' +
                                    k +
                                    '/' +
                                    nombreCarpeta +
                                    '_' +
                                    k +
                                    '_' +
                                    acabados[k].toLowerCase() +
                                    '_optimized.png"><p> </p>'
                            );
                        }
                    } else {
                        if (k == 2) {
                            if (i == 1) {
                                var prodMed = this.medidasModal[nombre];
                                var height = prodMed.split(';')[3];
                                var width = prodMed.split(';')[2];
                                $('#cuerpo' + i).append(
                                    '<img style="margin-top:-15px;z-index:100;' +
                                        height +
                                        ';' +
                                        width +
                                        '" id="' +
                                        nombre +
                                        '" class="' +
                                        acabados[k].toLowerCase() +
                                        'Modal" width="1000px" height="1000px" src="../../../content/images/' +
                                        nombreCarpeta +
                                        '/' +
                                        k +
                                        '/' +
                                        nombreCarpeta +
                                        '_' +
                                        k +
                                        '_' +
                                        acabados[k].toLowerCase() +
                                        '_optimized.png"><p> </p>'
                                );
                            } else {
                                var prodMed = this.medidasModal[nombre];
                                var left = prodMed.split(';')[0];
                                var bottom = prodMed.split(';')[1];
                                var height = prodMed.split(';')[3];
                                var width = prodMed.split(';')[2];
                                $('#cuerpo' + i).append(
                                    '<img style="z-index:' +
                                        (100 - i) +
                                        ';margin-top:-15px;' +
                                        left +
                                        ';' +
                                        bottom +
                                        ';' +
                                        height +
                                        ';' +
                                        width +
                                        '" class="' +
                                        acabados[k].toLowerCase() +
                                        'Modal" width="1000px" height="1000px" src="../../../content/images/' +
                                        nombreCarpeta +
                                        '/' +
                                        k +
                                        '/' +
                                        nombreCarpeta +
                                        '_' +
                                        k +
                                        '_' +
                                        acabados[k].toLowerCase() +
                                        '_optimized.png"><p> </p>'
                                );
                            }
                        } else {
                            if (i == 1) {
                                var prodMed = this.medidasModal[nombre];
                                var height = prodMed.split(';')[3];
                                var width = prodMed.split(';')[2];
                                $('#cuerpo' + i).append(
                                    '<img style="margin-top:-15px;z-index:100;' +
                                        height +
                                        ';' +
                                        width +
                                        '" id="' +
                                        nombre +
                                        '" class="' +
                                        acabados[k].toLowerCase() +
                                        'Modal" width="1000px" height="1000px" src="../../../content/images/' +
                                        nombre +
                                        '/' +
                                        k +
                                        '/' +
                                        nombre +
                                        '_' +
                                        k +
                                        '_' +
                                        acabados[k].toLowerCase() +
                                        '_optimized.png"><p> </p>'
                                );
                            } else {
                                var prodMed = this.medidasModal[nombre];
                                var left = prodMed.split(';')[0];
                                var bottom = prodMed.split(';')[1];
                                var height = prodMed.split(';')[3];
                                var width = prodMed.split(';')[2];
                                $('#cuerpo' + i).append(
                                    '<img style="z-index:' +
                                        (100 - i) +
                                        ';margin-top:-15px;' +
                                        left +
                                        ';' +
                                        bottom +
                                        ';' +
                                        height +
                                        ';' +
                                        width +
                                        '" class="' +
                                        acabados[k].toLowerCase() +
                                        'Modal" width="1000px" height="1000px" src="../../../content/images/' +
                                        nombre +
                                        '/' +
                                        k +
                                        '/' +
                                        nombre +
                                        '_' +
                                        k +
                                        '_' +
                                        acabados[k].toLowerCase() +
                                        '_optimized.png"><p> </p>'
                                );
                            }
                        }
                    }
                }
                acabados = [];
            }
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
                    var account = this.accountService.userIdentity;
                    if (account.authorities.indexOf('ROLE_REPRESENTATE') >= 0) {
                        var idTienda = $('#selectTienda').val();
                        var todosTiendas = this.representanteTiendaService.todos;
                        for (let w = 0; w < todosTiendas['length']; w++) {
                            if (todosTiendas[w]['id'] == idTienda) {
                                var usuario = todosTiendas[w]['datosUsuario']['user'];
                            }
                        }
                        var usuarios = this.user;
                        var usuarioCreado;
                        var idUsu = this.currentAccount['id'];
                        for (let i = 0; i < usuarios.length; i++) {
                            if (usuarios[i]['id'] == idUsu) {
                                usuarioCreado = usuarios[i];
                            }
                        }
                    } else {
                        if (account.authorities.indexOf('ROLE_CLIENTE') >= 0) {
                            var idTienda = $('#selectTienda').val();
                            var tiendaUsuarioAdmin = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
                            var usuario = tiendaUsuarioAdmin['user'];
                            var usuarios = this.user;
                            var usuarioCreado;
                            var idUsu = this.currentAccount['id'];
                            for (let i = 0; i < usuarios.length; i++) {
                                if (usuarios[i]['id'] == idUsu) {
                                    usuarioCreado = usuarios[i];
                                }
                            }
                        } else {
                            this.isSaving = true;
                            var usuarios = this.user;
                            var usuario;
                            var idUsu = this.currentAccount['id'];
                            for (let i = 0; i < usuarios.length; i++) {
                                if (usuarios[i]['id'] == idUsu) {
                                    usuario = usuarios[i];
                                }
                            }
                        }
                    }
                    var d = new Date();

                    var month = d.getMonth() + 1;
                    var day = d.getDate();
                    var prueba;
                    var output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
                    if (account.authorities.indexOf('ROLE_CLIENTE') >= 0) {
                        prueba = {
                            codigo: 'PR-' + usuario['id'],
                            pedido: 0,
                            user: usuario,
                            fecha_presupuesto: output,
                            usuarioCreadoPre: usuarioCreado
                        };
                    } else {
                        if (account.authorities.indexOf('ROLE_REPRESENTATE') >= 0) {
                            prueba = {
                                codigo: 'PR-' + usuario['id'],
                                pedido: 0,
                                user: usuario,
                                fecha_presupuesto: output,
                                usuarioCreadoPre: usuarioCreado
                            };
                        } else {
                            prueba = {
                                codigo: 'PR-' + usuario['id'],
                                pedido: 0,
                                user: usuario,
                                fecha_presupuesto: output
                            };
                        }
                    }
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
    public modificarCarrito() {
        var idProd = sessionStorage.getItem('idEditarProd');
        var prod = JSON.parse(sessionStorage.getItem('prod' + idProd));
        var dimenCambio = this.cambioDimension;
        var acabadoCambio = this.cambiadoAcabado;
        var todosAcabados = this.acaProdService.parte;
        var cont = 0;
        var apoyos = this.tiposApoyoService.todos;
        var cambiarApoyo = this.cambiarApoyo;
        var idApoyo = $('#apoyoDatosTexto #apoyo1').attr('class');
        for (let i = 1; i < 20; i++) {
            var aca = prod[1]['acabado' + i];
            if (aca != undefined) {
                cont++;
            }
        }
        var dimensionesTodas = this.todasDimensiones;
        var idDimen = $('#datos1 #ancho1').attr('class');
        if (dimenCambio == 1) {
            for (let k = 0; k < dimensionesTodas.length; k++) {
                if (dimensionesTodas[k]['id'] == idDimen) {
                    prod[1]['id'] = dimensionesTodas[k]['id'];
                    prod[1]['ancho'] = dimensionesTodas[k]['ancho'];
                    prod[1]['alto'] = dimensionesTodas[k]['alto'];
                    prod[1]['precio'] = dimensionesTodas[k]['precio'];
                    prod[1]['mensaje'] = dimensionesTodas[k]['mensaje'];
                    prod[1]['fondo'] = dimensionesTodas[k]['fondo'];
                }
            }
        }
        if (acabadoCambio == 1) {
            for (let j = 1; j < 20; j++) {
                var aca;
                aca = $('#val' + j + 'Dato').attr('class');
                if (aca != undefined) {
                    if (aca != prod[1]['acabado' + j]['id']) {
                        for (let n = 0; n < todosAcabados.length; n++) {
                            if (todosAcabados[n]['id'] == aca) {
                                todosAcabados[n]['imagen'] == '';
                                prod[1]['acabado' + j] = todosAcabados[n];
                            }
                        }
                    }
                }
            }
        }
        if (cambiarApoyo == 1) {
            for (let l = 0; l < apoyos.length; l++) {
                if (apoyos[l]['id'] == idApoyo) {
                    prod[1]['apoyo'] = apoyos[l];
                }
            }
        }

        sessionStorage.setItem('prod' + idProd, JSON.stringify(prod));
        this.router.navigate(['/inicio']);
    }
    loadAll() {
        var productos = [];
        var apoyos = [];
        var cont = 0;
        var precioPunto = this.precioPunto[0];
        var precio = this.precioTiendaProductosService.todos;
        console.log(precio);

        var todos = this.productosDormitorioService.todos;
        $('#acabado').removeAttr('style');
        $('#acabado').attr('style');
        $('#acabado').css({ 'text-align': 'center' });
        $('#acabado').css({ 'margin-top': '5%' });
        $('#acabado').css({ 'margin-bottom': '5%' });
        var contador = 1;
        var contnuevo = 1;
        var u = 1;
        var i = 0;
        var acabados = [];
        $('#acabados').css({ display: 'block' });
        var imagen;
        this.cambioDimension = 0;
        var idProd = sessionStorage.getItem('idEditarProd');
        var prod = JSON.parse(sessionStorage.getItem('prod' + idProd));

        var productoDormitorio = prod[1]['productosDormitorio'];
        var nombre = productoDormitorio['nombre'];

        var datos = prod[1];
        var todosLosPrecios = this.precioTiendaProductosService.todos;

        for (let y = 0; y < todosLosPrecios.length; y++) {
            if (productoDormitorio['id'] == todosLosPrecios[y][2]) {
                var precioProducto = todosLosPrecios[y][1];
            }
        }
        $('#nombreMesita').text(productoDormitorio['nombre']);
        $('#nombreMesita').attr('class', productoDormitorio['id']);

        var total = $('#total').text();
        var totalfloat = parseFloat(total);
        var precio;
        precio = parseFloat(datos['precio']);
        precio = precio * precioPunto;
        precioProducto = precioProducto / 100;
        var cuenta = precio * precioProducto;
        precio = precio + cuenta;
        precio = Math.round(precio * 100) / 100;
        totalfloat = totalfloat + precio;
        this.precioDimension = totalfloat;
        $('#total').text(prod[1]['todoSumadoPrecio'] + ' €');
        $('#precioDimension').text(totalfloat);
        $('#idioma').attr('value', datos['id']);
        $('#datos1').append(
            '<p style="width:100%"><span>Ancho : </span><span class="' + datos['id'] + '" id="ancho1">' + datos['ancho'] + '</span></p>'
        );
        $('#datos1').append('<p style="width:100%"><span>Alto : </span><span id="alto1">' + datos['alto'] + '</span></p>');
        $('#datos1').append('<p style="width:100%"><span>Fondo : </span><span id="fondoDatosDimen">' + datos['fondo'] + '</span></p>');

        var acabadosProd = [];
        for (let i = 1; i < 20; i++) {
            var aca = prod[1]['acabado' + i];
            if (aca != undefined) {
                acabadosProd[i] = aca;
            }
        }
        this.cambiadoAcabado = 0;
        this.modalAcabadosCargados = acabadosProd;
        console.log(acabadosProd);
        var precioTienda1;
        precioTienda1 = localStorage.getItem('preciosTiendas');
        var precioTienda = this.precioTienda;
        this.dimensionesProductoTipoService.findProducto(productoDormitorio['id']).subscribe(data => {
            this.dimensionesProductoTipoService.todos = data.body;
            this.todasDimensiones = data.body;
            var cont = 0;
            var dimensionesPrueba;
            dimensionesPrueba = data.body;
            var datos = dimensionesPrueba;
            $('#dimensiones').css({ display: 'block' });
            for (let i = 0; i < datos.length; i++) {
                if (productoDormitorio['id'] == datos[i]['productosDormitorio']['id']) {
                    if (prod[1]['id'] == datos[i]['id']) {
                        $('#dimensionesInput' + (cont + 1)).css({ 'background-color': '#DFDDDC' });
                    }
                    if (prod[1]['mensaje'] == 'Medidas Especiales') {
                        $('#especialesTexto').css({ display: 'block' });
                        var anchoEspecial = prod[1]['ancho'];
                        var anchoEspecial1 = anchoEspecial.split(':')[0];
                        var altoEspecial = prod[1]['alto'];
                        var altoEspecial1 = altoEspecial.split(':')[0];
                        var fondoEspecial = prod[1]['fondo'];
                        var fondoEspecial1 = fondoEspecial.split(':')[0];

                        if (anchoEspecial1 == 'Ancho especial' && i == 0) {
                            $('.dimensionesColor20').css({ display: 'block' });
                            $('.dimensionesColor20').css({ 'margin-left': '20%' });
                            $('#anchoEspecial').val(anchoEspecial.split(':')[1]);
                            $('#altoAncho').val(altoEspecial.split(':')[1]);
                            $('#fondoAncho').val(fondoEspecial.split(':')[1]);
                            $('#dimensionesInput20').removeAttr('style');
                            $('#dimensionesInput20').attr('style');
                            $('#dimensionesInput20').val('Seleccionar');
                            $('#dimensionesInput20').css({ 'text-align': 'center' });
                            $('#dimensionesInput20').css({ 'background-color': '#DFDDDC' });
                            $('.dimensionesColor21').css({ display: 'block' });
                            $('.dimensionesColor21').css({ 'margin-left': '20%' });
                        }
                        if (altoEspecial1 == 'Alto especial' && i == 0) {
                            $('.dimensionesColor21').css({ display: 'block' });
                            $('.dimensionesColor21').css({ 'margin-left': '20%' });
                            $('#dimensionesInput21').removeAttr('style');
                            $('#anchoEspecialAltura').append('<option>' + anchoEspecial.split(':')[1] + '</option>');
                            $('#altoAltoEspecial').val(altoEspecial.split(':')[1]);
                            $('#fondoAnchoAlto').val(fondoEspecial.split(':')[1]);
                            $('#dimensionesInput21').attr('style');
                            $('#dimensionesInput21').val('Seleccionar');
                            $('#dimensionesInput21').css({ 'text-align': 'center' });
                            $('#dimensionesInput21').css({ 'background-color': '#DFDDDC' });
                            $('.dimensionesColor20').css({ display: 'block' });
                            $('.dimensionesColor20').css({ 'margin-left': '20%' });
                        }
                        if (fondoEspecial1 == 'Fondo especial' && i == 0) {
                            $('.dimensionesColor22').css({ display: 'block' });
                            $('.dimensionesColor22').css({ 'margin-left': '20%' });
                            $('#dimensionesInput22').removeAttr('style');
                            $('#anchoEspecialFondo').append('<option>' + anchoEspecial.split(':')[1] + '</option>');
                            $('#altoFondoEspecial').val(altoEspecial.split(':')[1]);
                            $('#fondoFondoEspecial').val(fondoEspecial.split(':')[1]);
                            $('#dimensionesInput22').attr('style');
                            $('#dimensionesInput22').val('Seleccionar');
                            $('#dimensionesInput22').css({ 'text-align': 'center' });
                            $('#dimensionesInput22').css({ 'background-color': '#DFDDDC' });
                            $('.dimensionesColor20').css({ display: 'block' });
                            $('.dimensionesColor20').css({ 'margin-left': '20%' });
                            $('.dimensionesColor21').css({ display: 'block' });
                            $('.dimensionesColor21').css({ 'margin-left': '20%' });
                        }
                    }
                    if (cont == 0 && datos[i]['mensaje'] != 'Medidas Especiales') {
                        $('#dimensionesText1').text(
                            datos[i]['mensaje'] +
                                ' | Ancho ' +
                                datos[i]['ancho'] +
                                ' - Alto ' +
                                datos[i]['alto'] +
                                ' - Fondo ' +
                                datos[i]['fondo']
                        );
                        $('.dimensionesColor1').css({ 'margin-left': '20%' });

                        $('#dimensiones').css({ width: '100%' });
                        $('#dimensiones').css({ display: 'block' });
                        $('#dimensiones').css({ 'background-color': 'white' });
                        $('#medidas').css({ display: 'block' });
                        $('.dimensionesColor1').css({ display: 'block' });
                        $('.dimensionesColor1').append(
                            '<p class="dimensionesId' +
                                (cont + 1) +
                                '" id="' +
                                datos[i]['id'] +
                                '" style="position:absolute;z-index:1;display_none"></p>'
                        );
                    }
                    if (cont == 1 && datos[i]['mensaje'] != 'Medidas Especiales') {
                        $('#dimensionesText2').text(
                            datos[i]['mensaje'] +
                                ' | Ancho ' +
                                datos[i]['ancho'] +
                                ' - Alto ' +
                                datos[i]['alto'] +
                                ' - Fondo ' +
                                datos[i]['fondo']
                        );
                        $('.dimensionesColor2').css({ display: 'block' });
                        $('.dimensionesColor2').css({ 'margin-left': '20%' });
                        $('.dimensionesColor2').append(
                            '<p class="dimensionesId' +
                                (cont + 1) +
                                '" id="' +
                                datos[i]['id'] +
                                '" style="position:absolute;z-index:1;display_none"></p>'
                        );
                    }
                    if (cont == 2 && datos[i]['mensaje'] != 'Medidas Especiales') {
                        $('#dimensionesText3').text(
                            datos[i]['mensaje'] +
                                ' | Ancho ' +
                                datos[i]['ancho'] +
                                ' - Alto ' +
                                datos[i]['alto'] +
                                ' - Fondo ' +
                                datos[i]['fondo']
                        );
                        $('.dimensionesColor3').css({ display: 'block' });
                        $('.dimensionesColor3').css({ 'margin-left': '20%' });
                        $('.dimensionesColor3').append(
                            '<p class="dimensionesId' +
                                (cont + 1) +
                                '" id="' +
                                datos[i]['id'] +
                                '" style="position:absolute;z-index:1;display_none"></p>'
                        );
                    }
                    if (cont == 3 && datos[i]['mensaje'] != 'Medidas Especiales') {
                        $('#dimensionesText4').text(
                            datos[i]['mensaje'] +
                                ' | Ancho ' +
                                datos[i]['ancho'] +
                                ' - Alto ' +
                                datos[i]['alto'] +
                                ' - Fondo ' +
                                datos[i]['fondo']
                        );
                        $('.dimensionesColor4').css({ display: 'block' });
                        $('.dimensionesColor4').css({ 'margin-left': '20%' });
                        $('.dimensionesColor4').append(
                            '<p class="dimensionesId' +
                                (cont + 1) +
                                '" id="' +
                                datos[i]['id'] +
                                '" style="position:absolute;z-index:1;display_none"></p>'
                        );
                    }
                    if (cont == 4 && datos[i]['mensaje'] != 'Medidas Especiales') {
                        $('#dimensionesText5').text(
                            datos[i]['mensaje'] +
                                ' | Ancho ' +
                                datos[i]['ancho'] +
                                ' - Alto ' +
                                datos[i]['alto'] +
                                ' - Fondo ' +
                                datos[i]['fondo']
                        );
                        $('.dimensionesColor5').css({ display: 'block' });
                        $('.dimensionesColor5').css({ 'margin-left': '20%' });
                        $('.dimensionesColor5').append(
                            '<p class="dimensionesId' +
                                (cont + 1) +
                                '" id="' +
                                datos[i]['id'] +
                                '" style="position:absolute;z-index:1;display_none"></p>'
                        );
                    }
                    if (cont == 5 && datos[i]['mensaje'] != 'Medidas Especiales') {
                        $('#dimensionesText6').text(
                            datos[i]['mensaje'] +
                                ' | Ancho ' +
                                datos[i]['ancho'] +
                                ' - Alto ' +
                                datos[i]['alto'] +
                                ' - Fondo ' +
                                datos[i]['fondo']
                        );
                        $('.dimensionesColor6').css({ display: 'block' });
                        $('.dimensionesColor6').css({ 'margin-left': '20%' });
                        $('.dimensionesColor6').append(
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
        var acabadosTodos;
        this.acaProdService.findAca(productoDormitorio['id']).subscribe(data => {
            this.acaProdService.todos = data.body;
            this.acaProdService.parte = data.body[0]['acabados'];
            $.each(this.acaProdService.todos, function(index, value) {
                if (value['productosDormitorio']['id'] == productoDormitorio['id']) {
                    imagen = value['imagen'];
                    if (contador == 1) {
                        $('#acabados #imagenAcabadoPrincipal').append(
                            '<img id="imagenAcabado" src="data:image/gif;base64,' +
                                imagen +
                                '" class="imagenAcabadoPrincipalImg"  width="650px" height="433px">'
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

                    if (u == 1) {
                        $('#datos1').append('<p style="width:100%"><strong>ACABADOS</strong></p>');
                    }
                    $('#datos1').append(
                        '<p style="width:100%" id="acabado' +
                            u +
                            '"><span>' +
                            u +
                            '</span><img id="imagenAcabadoPrincipal1" data-toggle="modal" data-target="#myModalColores' +
                            u +
                            '" src="../../../content/images/blanco.jpg" height="60px" border="0" width="100px" style=";margin-left:20px;"/><span id="nombreAcaCalcu' +
                            u +
                            '" style="margin-left:10px"></span></p>'
                    );

                    u++;
                    i = 0;
                    contnuevo++;
                }
            });
            if (datos['apoyo'] != undefined) {
                $('#datos1').append(
                    '<p style="width:95%"><strong>APOYO </strong><span style="float:right">&euro;</span><span id="precioApoyo" style="float:right"></span></p>'
                );
                $('#datos1').append(
                    '<p style="width:100%"><input id="apoyoCalculadoraTexto" data-toggle="modal" data-target="#modalApoyo" height="30px" border="0" width="200px" style="margin-left:20px;text-align:center" readonly="readonly"/></p>'
                );
            }

            this.productosDormitorioService.categoria(2).subscribe(data => {
                for (let w = 0; w < data.body['length']; w++) {
                    $('#modalApoyo #apoyoModal' + w).empty();
                    $('#modalApoyo #apoyoModal' + w).append(
                        '<img  src="data:image/gif;base64,' +
                            data.body[w]['imagen'] +
                            '" id="imagenApoyo' +
                            w +
                            '" class="' +
                            data.body[w]['id'] +
                            '" height="160px" width="280px" style=" ">'
                    );
                    $('#modalApoyo #apoyoModal' + w).append('<strong><p>' + data.body[w]['nombre'] + '</strong></p>');
                }
            });
            for (let j = 1; j < acabadosProd.length; j++) {
                for (let w = 0; w < acabadosTodos.length; w++) {
                    if (acabadosTodos[w]['nombre'] == acabadosProd[j]['nombre']) {
                        var src = 'data:image/gif;base64,' + acabadosTodos[w]['imagenFondo'];
                        $('#datos1 #acabado' + j + ' #imagenAcabadoPrincipal1').attr('src', src);
                        $('#datos1 #acabado' + j + ' #imagenAcabadoPrincipal1').attr('class', acabadosTodos[w]['id']);
                        $('#datos1 #nombreAcaCalcu' + j).text(acabadosTodos[w]['nombre']);
                    }
                }
                var nombreAcabado = acabadosProd[j]['nombre'].toLowerCase();
                if (nombreAcabado == 'marmol blanco') {
                    nombreAcabado = 'marmolblanco';
                }
                if (nombreAcabado == 'marmol negro') {
                    nombreAcabado = 'marmolnegro';
                }

                if (nombreAcabado == 'cristal bronce') {
                    var aca1Nombre = $('#productoCalculadora1 #acabado1 #nombreAcaCalcu1')
                        .text()
                        .toLowerCase();
                    $('#imagenAcabadoPrincipal').append(
                        '<img id="tapa" class="' +
                            nombreAcabado +
                            '" width="650px" height="433px" style="position: absolute;" src="../../../content/images/' +
                            nombre +
                            '/' +
                            j +
                            ' BRONCE/' +
                            nombre +
                            '_' +
                            j +
                            '_' +
                            aca1Nombre +
                            '_bronce_optimized.png">'
                    );
                }
                if (nombreAcabado == 'cristal transparente') {
                    var aca1Nombre = $('#productoCalculadora1 #acabado1 #nombreAcaCalcu1')
                        .text()
                        .toLowerCase();
                    $('#imagenAcabadoPrincipal').append(
                        '<img id="tapa" class="' +
                            nombreAcabado +
                            '" width="650px" height="433px" style="position: absolute;" src="../../../content/images/' +
                            nombre +
                            '/' +
                            j +
                            ' TRANSPARENTE/' +
                            nombre +
                            '_' +
                            j +
                            '_' +
                            aca1Nombre +
                            '_transparente_optimized.png">'
                    );
                }
                if (nombreAcabado != 'cristal transparente' && nombreAcabado != 'cristal bronce') {
                    $('#imagenAcabadoPrincipal').append(
                        '<img id="tapa" class="' +
                            nombreAcabado +
                            '" width="650px" height="433px" style="position: absolute;" src="../../../content/images/' +
                            nombre +
                            '/' +
                            j +
                            '/' +
                            nombre +
                            '_' +
                            j +
                            '_' +
                            nombreAcabado +
                            '_optimized.png">'
                    );
                }

                $('#val' + j).remove();
                $('#val' + j + 'Dato').remove();
                $('#valor' + j).remove();
                $('#datos1').append(
                    '<p style="width:100%;display:none"> <span id="val' +
                        j +
                        '">Acabado ' +
                        j +
                        ' : </span><span id="val' +
                        j +
                        'Dato" class="' +
                        acabadosProd[j]['id'] +
                        '">' +
                        acabadosProd[j]['nombre'] +
                        '</span></p>'
                );
            }
        });
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

        if (nombre == 'singular 1 apertura derecha') {
            nombre = 'sg1';
        }

        if (nombre == 'singular 1 apertura izquierda') {
            nombre = 'sg1';
        }

        if (nombre == 'singular 2 apertura derecha') {
            nombre = 'sg2';
        }

        if (nombre == 'singular 2 apertura izquierda') {
            nombre = 'sg2';
        }

        if (nombre == 'singular 3 apertura derecha') {
            nombre = 'sg3';
        }

        if (nombre == 'singular 3 apertura izquierda') {
            nombre = 'sg3';
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
        if (nombre == 'singular 14') {
            nombre = 'sg14';
        }
        if (nombre == 'singular 15') {
            nombre = 'sg15';
        }
        if (nombre == 'singular 16') {
            nombre = 'sg16';
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
        if (datos['apoyo'] != undefined) {
            $('#botonApoyoNuevo').append(
                '<p id="nombreApoyoCajon" style="color:black;margin-left: 180px;margin-top: -42px;position:absolute;display:none" >' +
                    datos['apoyo']['nombre'].split(' ')[0] +
                    '</p>'
            );
            this.cambiarApoyo = 0;
            $('#datos1').append(
                '<p id="apoyoDatosTexto" style="width:100%;display:none"><span id="nombreApoyo">Apoyo : ' +
                    datos['apoyo']['nombre'].split(' ')[0] +
                    '</span><span style="float:right" id="apoyo1" class="' +
                    datos['apoyo']['id'] +
                    '">+' +
                    datos['apoyo']['precio'] +
                    '&euro;</span></p>'
            );
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

        this.pruebaCargar();

        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        var tienda = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
        this.precioTiendaService.findBus(tienda.id).subscribe(data => {
            this.precioPunto = data.body;
        });
        this.precioTiendaProductosService.findProdId(8, tienda.id).subscribe(data => {
            this.precioTiendaProductosService.todos = data.body;
        });

        this.precioTiendaProductosService.findProdId(2, tienda.id).subscribe(data => {
            this.precioTiendaProductosService.apoyo = data.body;
            this.loadAll();
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

        var medidasModal = [];
        medidasModal['mb4'] = 'margin-left:-140px;bottom:125px;max-width:500px;max-height:300px;';
        medidasModal['mb1'] = 'margin-left:-60px;bottom:105px;max-width:500px;max-height:300px;';
        medidasModal['mb6'] = 'margin-left:-70px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['mb7'] = 'margin-left:-70px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['mb8'] = 'margin-left:-70px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['mb9'] = 'margin-left:-70px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['mb10'] = 'margin-left:-70px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['mb11'] = 'margin-left:-70px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['mb12'] = 'margin-left:-70px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['mb13'] = 'margin-left:-70px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['mb14'] = 'margin-left:-70px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['sg1'] = 'margin-left:-130px;bottom:113px;max-width:300px;max-height:535.65px;';

        this.medidasModal = medidasModal;

        var productosArrayNombres = [];
        productosArrayNombres[107] = 'mb1';
        productosArrayNombres[72] = 'sg1';
        productosArrayNombres[73] = 'sg1';
        productosArrayNombres[108] = 'mb';
        productosArrayNombres[109] = 'mb4';
        productosArrayNombres[110] = 'mb6';
        productosArrayNombres[111] = 'mb5';
        productosArrayNombres[112] = 'mb8';
        productosArrayNombres[113] = 'mb7';
        productosArrayNombres[114] = 'mb9';
        productosArrayNombres[115] = 'mb11';
        productosArrayNombres[116] = 'mb10';
        productosArrayNombres[117] = 'mb13';
        productosArrayNombres[118] = 'mb12';
        productosArrayNombres[119] = 'mb14';
        this.productosArrayNombre = productosArrayNombres;
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
        var account = this.accountService.userIdentity;
        if (account.authorities.indexOf('ROLE_REPRESENTATE') >= 0) {
            this.represenTorgaService.findUsu(account.id).subscribe(data => {
                this.representanteTiendaService.findUsu(data.body[0]['id']).subscribe(data => {
                    this.representanteTiendaService.todos = data.body;
                    this.representanteTiendaService.representante = data.body[0]['represenTorga'];
                    this.tiendasRepresentante = data.body;
                });
            });
        }
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

        this.medidasEspecialesService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                for (let i = 0; i < data.body.length; i++) {
                    especiales[i] = data.body[i];
                }
            });
        this.especiales = especiales;

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

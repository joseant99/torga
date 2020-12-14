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
import { IvaProductoTiendaService } from '../iva-producto-tienda/iva-producto-tienda.service';

@Component({
    selector: 'jhi-productos-dormitorio',
    templateUrl: './productos-dormitorio-apoyo.component.html'
})
export class ProductosDormitorioApoyoComponent implements OnInit, OnDestroy {
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
    acabados1: any;
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
    precioDimension1: any;
    iva: any;
    acabados1234: any;
    arrayMostrar: any;
    bancada42: any;
    zocalo: any;
    bancada47: any;
    constructor(
        protected tiposApoyoService: TiposApoyoService,
        protected medidasEspecialesService: MedidasEspecialesService,
        protected dimensionesProductoTipoService: DimensionesProductoTipoService,
        protected acabadosService: AcabadosService,
        protected precioTiendaService: PrecioTiendaService,
        protected iluminacionProdPrePedService: IluminacionProdPrePedService,
        protected iluminacionService: IluminacionService,
        protected ivaProductoTiendaService: IvaProductoTiendaService,
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
        $('#precioIluminacion').text(' ');
        $('#datos12').css({ display: 'none' });

        $('.productosColorBan42 #dimensionesApoyo').css({ display: 'none' });
        $('.productosColorBan47 #dimensionesApoyo').css({ display: 'none' });
        $('.productosColorZo #dimensionesApoyo').css({ display: 'none' });

        $('.productosColorBan42').css({ 'background-color': 'white' });
        $('.productosColorBan47').css({ 'background-color': 'white' });
        $('.productosColorZo').css({ 'background-color': 'white' });

        $('.productosColorBan42').css({ border: '1px solid #dfdddc' });
        $('.productosColorBan47').css({ border: '1px solid #dfdddc' });
        $('.productosColorZo').css({ border: '1px solid #dfdddc' });

        $('.productosColorBan42').css({ 'margin-bottom': '0px' });
        $('.productosColorBan47').css({ 'margin-bottom': '0px' });
        $('.productosColorZo').css({ 'margin-bottom': '0px' });

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

        $('.productosColor107 #acabados').css({ display: 'none' });
        $('.productosColor108 #acabados').css({ display: 'none' });
        $('.productosColor109 #acabados').css({ display: 'none' });
        $('.productosColor110 #acabados').css({ display: 'none' });
        $('.productosColor111 #acabados').css({ display: 'none' });
        $('.productosColor112 #acabados').css({ display: 'none' });
        $('.productosColor113 #acabados').css({ display: 'none' });
        $('.productosColor114 #acabados').css({ display: 'none' });
        $('.productosColor115 #acabados').css({ display: 'none' });
        $('.productosColor116 #acabados').css({ display: 'none' });
        $('.productosColor117 #acabados').css({ display: 'none' });
        $('.productosColor118 #acabados').css({ display: 'none' });
        $('.productosColor119 #acabados').css({ display: 'none' });

        $('.productosColor107 #dimensiones').css({ display: 'none' });
        $('.productosColor108 #dimensiones').css({ display: 'none' });
        $('.productosColor109 #dimensiones').css({ display: 'none' });
        $('.productosColor110 #dimensiones').css({ display: 'none' });
        $('.productosColor111 #dimensiones').css({ display: 'none' });
        $('.productosColor112 #dimensiones').css({ display: 'none' });
        $('.productosColor113 #dimensiones').css({ display: 'none' });
        $('.productosColor114 #dimensiones').css({ display: 'none' });
        $('.productosColor115 #dimensiones').css({ display: 'none' });
        $('.productosColor116 #dimensiones').css({ display: 'none' });
        $('.productosColor117 #dimensiones').css({ display: 'none' });
        $('.productosColor118 #dimensiones').css({ display: 'none' });
        $('.productosColor119 #dimensiones').css({ display: 'none' });

        $('#imagenAcabadoPrincipal').empty();
        $('#total').empty();

        $('#botonCalculadora').attr('class', 'displayBoton');
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
        $('.productosColor107').removeAttr('style');
        $('.productosColor108').removeAttr('style');
        $('.productosColor109').removeAttr('style');
        $('.productosColor110').removeAttr('style');
        $('.productosColor111').removeAttr('style');
        $('.productosColor112').removeAttr('style');
        $('.productosColor113').removeAttr('style');
        $('.productosColor114').removeAttr('style');
        $('.productosColor115').removeAttr('style');
        $('.productosColor116').removeAttr('style');
        $('.productosColor117').removeAttr('style');
        $('.productosColor118').removeAttr('style');
        $('.productosColor119').removeAttr('style');
        $('.productosColorSolo107').removeAttr('style');
        $('.productosColorSolo108').removeAttr('style');
        $('.productosColorSolo109').removeAttr('style');
        $('.productosColorSolo110').removeAttr('style');
        $('.productosColorSolo111').removeAttr('style');
        $('.productosColorSolo112').removeAttr('style');
        $('.productosColorSolo113').removeAttr('style');
        $('.productosColorSolo114').removeAttr('style');
        $('.productosColorSolo115').removeAttr('style');
        $('.productosColorSolo116').removeAttr('style');
        $('.productosColorSolo117').removeAttr('style');
        $('.productosColorSolo118').removeAttr('style');
        $('.productosColorSolo119').removeAttr('style');
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
        var arrayComprobar = this.arrayMostrar;
        if (arrayComprobar[producto] == undefined) {
            arrayComprobar[producto] = 'hola';
            if (producto == 107) {
                arrayComprobar[108] = undefined;
                arrayComprobar[110] = undefined;
                arrayComprobar[111] = undefined;
                arrayComprobar[112] = undefined;
                arrayComprobar[113] = undefined;
                arrayComprobar[114] = undefined;
                arrayComprobar[115] = undefined;
                arrayComprobar[116] = undefined;
                arrayComprobar[117] = undefined;
                arrayComprobar[118] = undefined;
                arrayComprobar[119] = undefined;
                arrayComprobar[109] = undefined;
            }
            if (producto == 108) {
                arrayComprobar[107] = undefined;
                arrayComprobar[110] = undefined;
                arrayComprobar[111] = undefined;
                arrayComprobar[112] = undefined;
                arrayComprobar[113] = undefined;
                arrayComprobar[114] = undefined;
                arrayComprobar[115] = undefined;
                arrayComprobar[116] = undefined;
                arrayComprobar[117] = undefined;
                arrayComprobar[118] = undefined;
                arrayComprobar[119] = undefined;
                arrayComprobar[109] = undefined;
            }
            if (producto == 109) {
                arrayComprobar[108] = undefined;
                arrayComprobar[110] = undefined;
                arrayComprobar[111] = undefined;
                arrayComprobar[112] = undefined;
                arrayComprobar[113] = undefined;
                arrayComprobar[114] = undefined;
                arrayComprobar[115] = undefined;
                arrayComprobar[116] = undefined;
                arrayComprobar[117] = undefined;
                arrayComprobar[118] = undefined;
                arrayComprobar[119] = undefined;
                arrayComprobar[107] = undefined;
            }
            if (producto == 110) {
                arrayComprobar[108] = undefined;
                arrayComprobar[107] = undefined;
                arrayComprobar[111] = undefined;
                arrayComprobar[112] = undefined;
                arrayComprobar[113] = undefined;
                arrayComprobar[114] = undefined;
                arrayComprobar[115] = undefined;
                arrayComprobar[116] = undefined;
                arrayComprobar[117] = undefined;
                arrayComprobar[118] = undefined;
                arrayComprobar[119] = undefined;
                arrayComprobar[109] = undefined;
            }
            if (producto == 111) {
                arrayComprobar[108] = undefined;
                arrayComprobar[110] = undefined;
                arrayComprobar[107] = undefined;
                arrayComprobar[112] = undefined;
                arrayComprobar[113] = undefined;
                arrayComprobar[114] = undefined;
                arrayComprobar[115] = undefined;
                arrayComprobar[116] = undefined;
                arrayComprobar[117] = undefined;
                arrayComprobar[118] = undefined;
                arrayComprobar[119] = undefined;
                arrayComprobar[109] = undefined;
            }
            if (producto == 112) {
                arrayComprobar[108] = undefined;
                arrayComprobar[110] = undefined;
                arrayComprobar[111] = undefined;
                arrayComprobar[107] = undefined;
                arrayComprobar[113] = undefined;
                arrayComprobar[114] = undefined;
                arrayComprobar[115] = undefined;
                arrayComprobar[116] = undefined;
                arrayComprobar[117] = undefined;
                arrayComprobar[118] = undefined;
                arrayComprobar[119] = undefined;
                arrayComprobar[109] = undefined;
            }
            if (producto == 113) {
                arrayComprobar[108] = undefined;
                arrayComprobar[110] = undefined;
                arrayComprobar[111] = undefined;
                arrayComprobar[112] = undefined;
                arrayComprobar[107] = undefined;
                arrayComprobar[114] = undefined;
                arrayComprobar[115] = undefined;
                arrayComprobar[116] = undefined;
                arrayComprobar[117] = undefined;
                arrayComprobar[118] = undefined;
                arrayComprobar[119] = undefined;
                arrayComprobar[109] = undefined;
            }
            if (producto == 114) {
                arrayComprobar[108] = undefined;
                arrayComprobar[110] = undefined;
                arrayComprobar[111] = undefined;
                arrayComprobar[112] = undefined;
                arrayComprobar[113] = undefined;
                arrayComprobar[107] = undefined;
                arrayComprobar[115] = undefined;
                arrayComprobar[116] = undefined;
                arrayComprobar[117] = undefined;
                arrayComprobar[118] = undefined;
                arrayComprobar[119] = undefined;
                arrayComprobar[109] = undefined;
            }
            if (producto == 115) {
                arrayComprobar[108] = undefined;
                arrayComprobar[110] = undefined;
                arrayComprobar[111] = undefined;
                arrayComprobar[112] = undefined;
                arrayComprobar[113] = undefined;
                arrayComprobar[114] = undefined;
                arrayComprobar[107] = undefined;
                arrayComprobar[116] = undefined;
                arrayComprobar[117] = undefined;
                arrayComprobar[118] = undefined;
                arrayComprobar[119] = undefined;
                arrayComprobar[109] = undefined;
            }
            if (producto == 116) {
                arrayComprobar[108] = undefined;
                arrayComprobar[110] = undefined;
                arrayComprobar[111] = undefined;
                arrayComprobar[112] = undefined;
                arrayComprobar[113] = undefined;
                arrayComprobar[114] = undefined;
                arrayComprobar[115] = undefined;
                arrayComprobar[107] = undefined;
                arrayComprobar[117] = undefined;
                arrayComprobar[118] = undefined;
                arrayComprobar[119] = undefined;
                arrayComprobar[109] = undefined;
            }
            if (producto == 117) {
                arrayComprobar[108] = undefined;
                arrayComprobar[110] = undefined;
                arrayComprobar[111] = undefined;
                arrayComprobar[112] = undefined;
                arrayComprobar[113] = undefined;
                arrayComprobar[114] = undefined;
                arrayComprobar[115] = undefined;
                arrayComprobar[116] = undefined;
                arrayComprobar[107] = undefined;
                arrayComprobar[118] = undefined;
                arrayComprobar[119] = undefined;
                arrayComprobar[109] = undefined;
            }
            if (producto == 118) {
                arrayComprobar[108] = undefined;
                arrayComprobar[110] = undefined;
                arrayComprobar[111] = undefined;
                arrayComprobar[112] = undefined;
                arrayComprobar[113] = undefined;
                arrayComprobar[114] = undefined;
                arrayComprobar[115] = undefined;
                arrayComprobar[116] = undefined;
                arrayComprobar[117] = undefined;
                arrayComprobar[107] = undefined;
                arrayComprobar[119] = undefined;
                arrayComprobar[109] = undefined;
            }
            if (producto == 119) {
                arrayComprobar[108] = undefined;
                arrayComprobar[110] = undefined;
                arrayComprobar[111] = undefined;
                arrayComprobar[112] = undefined;
                arrayComprobar[113] = undefined;
                arrayComprobar[114] = undefined;
                arrayComprobar[115] = undefined;
                arrayComprobar[116] = undefined;
                arrayComprobar[117] = undefined;
                arrayComprobar[118] = undefined;
                arrayComprobar[107] = undefined;
                arrayComprobar[109] = undefined;
            }

            $('#botonCalculadora').attr('class', 'displayBoton');

            this.arrayMostrar = arrayComprobar;
            $('.productosColor107 #acabados').css({ display: 'none' });
            $('.productosColor108 #acabados').css({ display: 'none' });
            $('.productosColor109 #acabados').css({ display: 'none' });
            $('.productosColor110 #acabados').css({ display: 'none' });
            $('.productosColor111 #acabados').css({ display: 'none' });
            $('.productosColor112 #acabados').css({ display: 'none' });
            $('.productosColor113 #acabados').css({ display: 'none' });
            $('.productosColor114 #acabados').css({ display: 'none' });
            $('.productosColor115 #acabados').css({ display: 'none' });
            $('.productosColor116 #acabados').css({ display: 'none' });
            $('.productosColor117 #acabados').css({ display: 'none' });
            $('.productosColor118 #acabados').css({ display: 'none' });
            $('.productosColor119 #acabados').css({ display: 'none' });

            $('.productosColor' + producto + ' #dimensionesInput1').css({ 'background-color': 'white' });
            $('.productosColor' + producto + ' #dimensionesInput2').css({ 'background-color': 'white' });
            $('.productosColor' + producto + ' #dimensionesInput3').css({ 'background-color': 'white' });
            $('.productosColor' + producto + ' #dimensionesInput4').css({ 'background-color': 'white' });
            $('.productosColor' + producto + ' #dimensionesInput5').css({ 'background-color': 'white' });
            $('.productosColor' + producto + ' #dimensionesInput6').css({ 'background-color': 'white' });
            $('.productosColor' + producto + ' #dimensionesInput7').css({ 'background-color': 'white' });
            $('.productosColor' + producto + ' #dimensionesInput20').css({ 'background-color': 'white' });
            $('.productosColor' + producto + ' #dimensionesInput21').css({ 'background-color': 'white' });
            $('.productosColor' + producto + ' #dimensionesInput22').css({ 'background-color': 'white' });

            $('.productosColor107 #dimensiones').css({ display: 'none' });
            $('.productosColor108 #dimensiones').css({ display: 'none' });
            $('.productosColor109 #dimensiones').css({ display: 'none' });
            $('.productosColor110 #dimensiones').css({ display: 'none' });
            $('.productosColor111 #dimensiones').css({ display: 'none' });
            $('.productosColor112 #dimensiones').css({ display: 'none' });
            $('.productosColor113 #dimensiones').css({ display: 'none' });
            $('.productosColor114 #dimensiones').css({ display: 'none' });
            $('.productosColor115 #dimensiones').css({ display: 'none' });
            $('.productosColor116 #dimensiones').css({ display: 'none' });
            $('.productosColor117 #dimensiones').css({ display: 'none' });
            $('.productosColor118 #dimensiones').css({ display: 'none' });
            $('.productosColor119 #dimensiones').css({ display: 'none' });

            var acabados = [];
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
            this.acabados1 = acabados;
            this.acabados1234 = acabados;
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
            $('#dimensiones #medidas').css({ 'margin-bottom': '5%' });
            $('#productoCalculadora1 #precios1').empty();
            $('#productoCalculadora1 #precioCalculado1').empty();
            $('#productoCalculadora1 #datos1').empty();
            $('#nombreMesita').empty();
            $('#precioDimension').empty();
            $('#total').empty();

            $('#textoFinal').removeAttr('style');
            $('#textoFinal').attr('style');
            $('#textoFinal').css({ display: 'none' });
            $('#datos12').css({ display: 'none' });
            $('.dimensionesColor1').css({ 'background-color': 'white' });
            $('.dimensionesColor2').css({ 'background-color': 'white' });
            $('.dimensionesColor3').css({ 'background-color': 'white' });
            $('.dimensionesColor4').css({ 'background-color': 'white' });
            $('.dimensionesColor5').css({ 'background-color': 'white' });
            $('.dimensionesColor6').css({ 'background-color': 'white' });
            $('.productosColor107').removeAttr('style');
            $('.productosColor108').removeAttr('style');
            $('.productosColor109').removeAttr('style');
            $('.productosColor110').removeAttr('style');
            $('.productosColor111').removeAttr('style');
            $('.productosColor112').removeAttr('style');
            $('.productosColor113').removeAttr('style');
            $('.productosColor114').removeAttr('style');
            $('.productosColor115').removeAttr('style');
            $('.productosColor116').removeAttr('style');
            $('.productosColor117').removeAttr('style');
            $('.productosColor118').removeAttr('style');
            $('.productosColor119').removeAttr('style');
            $('.productosColorSolo107').removeAttr('style');
            $('.productosColorSolo108').removeAttr('style');
            $('.productosColorSolo109').removeAttr('style');
            $('.productosColorSolo110').removeAttr('style');
            $('.productosColorSolo111').removeAttr('style');
            $('.productosColorSolo112').removeAttr('style');
            $('.productosColorSolo113').removeAttr('style');
            $('.productosColorSolo114').removeAttr('style');
            $('.productosColorSolo115').removeAttr('style');
            $('.productosColorSolo116').removeAttr('style');
            $('.productosColorSolo117').removeAttr('style');
            $('.productosColorSolo118').removeAttr('style');
            $('.productosColorSolo119').removeAttr('style');
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
            $('.productosColor107 #dimensiones').css({ display: 'none' });
            $('.productosColor' + producto).css({ 'overflow-x': 'hidden' });
            $('.productosColor' + producto).css({ border: '1px solid white' });
            $('.productosColor' + producto + ' #medidas').css({ display: 'block' });
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
            var precioPunto = this.precioPunto[0];
            var todosLosPrecios = this.precioTiendaProductosService.todos;

            for (let y = 0; y < todosLosPrecios.length; y++) {
                if (producto == todosLosPrecios[y][2]) {
                    var precioProducto = todosLosPrecios[y][1];
                }
            }
            this.dimensionesProductoTipoService.findProducto(producto).subscribe(data => {
                this.dimensionesProductoTipoService.todos = data.body;
                this.todasDimensiones = data.body;
                var cont = 0;
                var dimensionesPrueba;
                dimensionesPrueba = data.body;
                var datos = dimensionesPrueba;

                for (let i = 0; i < datos.length; i++) {
                    if (producto == datos[i]['productosDormitorio']['id']) {
                        if (cont == 0 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var precioDimen = datos[i]['precio'];
                            var precioDimen1 = precioDimen * precioPunto;
                            precioDimen = precioDimen1;
                            var predAum = precioDimen * (precioProducto / 100);
                            precioDimen = precioDimen + predAum;
                            $('.productosColor' + producto + ' #dimensionesText1').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('.productosColor' + producto + ' .dimensionesColor1').css({ 'margin-left': '20%' });
                            $('.productosColor' + producto + ' .dimensionesColor1').css({ 'margin-bottom': '6%' });
                            $('#anchoEspecialAltura' + producto).append('<option> </option>');
                            $('#anchoEspecialAltura' + producto).append(
                                '<option value="' + datos[i]['id'] + '">' + datos[i]['ancho'] + '</option>'
                            );
                            $('#anchoEspecialFondo' + producto).append('<option> </option>');
                            $('#anchoEspecialFondo' + producto).append(
                                '<option value="' + datos[i]['id'] + '">' + datos[i]['ancho'] + '</option>'
                            );

                            $('.productosColor' + producto + ' #precioDimenText1').text(precioDimen + ' €');
                            $('.productosColor' + producto + ' #dimensiones').css({ width: '63.3%' });
                            $('.productosColor' + producto + ' #dimensiones').css({ border: '1px solid #7AC8FE' });
                            $('.productosColor' + producto + ' #dimensiones').css({ display: 'block' });
                            $('.productosColor' + producto + ' #dimensiones').css({ 'margin-top': '20px' });
                            $('.productosColor' + producto + ' #dimensiones').css({ left: '28.5%' });
                            $('.productosColor' + producto + ' #dimensiones').css({ position: 'absolute' });
                            $('.productosColor' + producto + ' #dimensiones').css({ 'background-color': 'white' });

                            $('.productosColor' + producto + ' .dimensionesColor1').css({ display: 'block' });
                            $('.productosColor' + producto + ' .dimensionesColor1').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1;display_none"></p>'
                            );
                        }
                        if (cont == 1 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var precioDimen = datos[i]['precio'];
                            var precioDimen1 = precioDimen * precioPunto;
                            precioDimen = precioDimen1;
                            var predAum = precioDimen * (precioProducto / 100);
                            precioDimen = precioDimen + predAum;
                            $('.productosColor' + producto + ' #dimensionesText2').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('#anchoEspecialAltura' + producto).append(
                                '<option value="' + datos[i]['id'] + '">' + datos[i]['ancho'] + '</option>'
                            );
                            $('#anchoEspecialFondo' + producto).append(
                                '<option value="' + datos[i]['id'] + '">' + datos[i]['ancho'] + '</option>'
                            );
                            $('.productosColor' + producto + ' #precioDimenText2').text(precioDimen + ' €');
                            $('.productosColor' + producto + ' .dimensionesColor2').css({ display: 'block' });
                            $('.productosColor' + producto + ' .dimensionesColor2').css({ 'margin-left': '20%' });
                            $('.productosColor' + producto + ' .dimensionesColor1').css({ 'margin-bottom': '1%' });
                            $('.productosColor' + producto + ' .dimensionesColor2').css({ 'margin-bottom': '6%' });
                            $('.productosColor' + producto + ' .dimensionesColor2').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1;display_none"></p>'
                            );
                        }
                        if (cont == 2 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var precioDimen = datos[i]['precio'];
                            var precioDimen1 = precioDimen * precioPunto;
                            precioDimen = precioDimen1;
                            var predAum = precioDimen * (precioProducto / 100);
                            precioDimen = precioDimen + predAum;
                            $('.productosColor' + producto + ' #dimensionesText3').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('.productosColor' + producto + ' #precioDimenText3').text(precioDimen + ' €');
                            $('#anchoEspecialAltura' + producto).append(
                                '<option value="' + datos[i]['id'] + '">' + datos[i]['ancho'] + '</option>'
                            );
                            $('#anchoEspecialFondo' + producto).append(
                                '<option value="' + datos[i]['id'] + '">' + datos[i]['ancho'] + '</option>'
                            );
                            $('.productosColor' + producto + ' .dimensionesColor3').css({ display: 'block' });
                            $('.productosColor' + producto + ' .dimensionesColor3').css({ 'margin-left': '20%' });
                            $('.productosColor' + producto + ' .dimensionesColor2').css({ 'margin-bottom': '1%' });
                            $('.productosColor' + producto + ' .dimensionesColor3').css({ 'margin-bottom': '6%' });
                            $('.productosColor' + producto + ' .dimensionesColor3').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1;display_none"></p>'
                            );
                        }
                        if (cont == 3 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var precioDimen = datos[i]['precio'];
                            var precioDimen1 = precioDimen * precioPunto;
                            precioDimen = precioDimen1;
                            var predAum = precioDimen * (precioProducto / 100);
                            precioDimen = precioDimen + predAum;
                            $('.productosColor' + producto + ' #dimensionesText4').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('.productosColor' + producto + ' #precioDimenText4').text(precioDimen + ' €');
                            $('#anchoEspecialAltura' + producto).append(
                                '<option value="' + datos[i]['id'] + '">' + datos[i]['ancho'] + '</option>'
                            );
                            $('#anchoEspecialFondo' + producto).append(
                                '<option value="' + datos[i]['id'] + '">' + datos[i]['ancho'] + '</option>'
                            );
                            $('.productosColor' + producto + ' .dimensionesColor3').css({ 'margin-bottom': '1%' });
                            $('.productosColor' + producto + ' .dimensionesColor4').css({ 'margin-bottom': '6%' });
                            $('.productosColor' + producto + ' .dimensionesColor4').css({ display: 'block' });
                            $('.productosColor' + producto + ' .dimensionesColor4').css({ 'margin-left': '20%' });
                            $('.productosColor' + producto + ' .dimensionesColor4').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1;display_none"></p>'
                            );
                        }
                        if (cont == 4 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var precioDimen = datos[i]['precio'];
                            var precioDimen1 = precioDimen * precioPunto;
                            precioDimen = precioDimen1;
                            var predAum = precioDimen * (precioProducto / 100);
                            precioDimen = precioDimen + predAum;
                            $('.productosColor' + producto + ' #dimensionesText5').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('.productosColor' + producto + ' #precioDimenText5').text(precioDimen + ' €');
                            $('#anchoEspecialAltura' + producto).append(
                                '<option value="' + datos[i]['id'] + '">' + datos[i]['ancho'] + '</option>'
                            );
                            $('#anchoEspecialFondo' + producto).append(
                                '<option value="' + datos[i]['id'] + '">' + datos[i]['ancho'] + '</option>'
                            );
                            $('.productosColor' + producto + ' .dimensionesColor4').css({ 'margin-bottom': '1%' });
                            $('.productosColor' + producto + ' .dimensionesColor5').css({ 'margin-bottom': '6%' });
                            $('.productosColor' + producto + ' .dimensionesColor5').css({ display: 'block' });
                            $('.productosColor' + producto + ' .dimensionesColor5').css({ 'margin-left': '20%' });
                            $('.productosColor' + producto + ' .dimensionesColor5').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1;display_none"></p>'
                            );
                        }
                        if (cont == 5 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var precioDimen = datos[i]['precio'];
                            var precioDimen1 = precioDimen * precioPunto;
                            precioDimen = precioDimen1;
                            var predAum = precioDimen * (precioProducto / 100);
                            precioDimen = precioDimen + predAum;
                            $('.productosColor' + producto + ' #dimensionesText6').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('.productosColor' + producto + ' #precioDimenText6').text(precioDimen + ' €');
                            $('#anchoEspecialAltura' + producto).append(
                                '<option value="' + datos[i]['id'] + '">' + datos[i]['ancho'] + '</option>'
                            );
                            $('#anchoEspecialFondo' + producto).append(
                                '<option value="' + datos[i]['id'] + '">' + datos[i]['ancho'] + '</option>'
                            );
                            $('.productosColor' + producto + ' .dimensionesColor5').css({ 'margin-bottom': '1%' });
                            $('.productosColor' + producto + ' .dimensionesColor6').css({ 'margin-bottom': '6%' });
                            $('.productosColor' + producto + ' .dimensionesColor6').css({ display: 'block' });
                            $('.productosColor' + producto + ' .dimensionesColor6').css({ 'margin-left': '20%' });
                            $('.productosColor' + producto + ' .dimensionesColor6').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1;display_none"></p>'
                            );
                        }
                        if (cont == 6 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var precioDimen = datos[i]['precio'];
                            var precioDimen1 = precioDimen * precioPunto;
                            precioDimen = precioDimen1;
                            var predAum = precioDimen * (precioProducto / 100);
                            precioDimen = precioDimen + predAum;
                            $('.productosColor' + producto + ' #dimensionesText7').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('.productosColor' + producto + ' #precioDimenText7').text(precioDimen + ' €');
                            $('#anchoEspecialAltura' + producto).append(
                                '<option value="' + datos[i]['id'] + '">' + datos[i]['ancho'] + '</option>'
                            );
                            $('#anchoEspecialFondo' + producto).append(
                                '<option value="' + datos[i]['id'] + '">' + datos[i]['ancho'] + '</option>'
                            );
                            $('.productosColor' + producto + ' .dimensionesColor6').css({ 'margin-bottom': '1%' });
                            $('.productosColor' + producto + ' .dimensionesColor5').css({ 'margin-bottom': '1%' });
                            $('.productosColor' + producto + ' .dimensionesColor4').css({ 'margin-bottom': '1%' });
                            $('.productosColor' + producto + ' .dimensionesColor7').css({ 'margin-bottom': '6%' });
                            $('.productosColor' + producto + ' .dimensionesColor7').css({ display: 'block' });
                            $('.productosColor' + producto + ' .dimensionesColor7').css({ 'margin-left': '20%' });
                            $('.productosColor' + producto + ' .dimensionesColor7').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1;display_none"></p>'
                            );
                        }

                        if (cont == 7 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var precioDimen = datos[i]['precio'];
                            var precioDimen1 = precioDimen * precioPunto;
                            precioDimen = precioDimen1;
                            var predAum = precioDimen * (precioProducto / 100);
                            precioDimen = precioDimen + predAum;
                            $('.productosColor' + producto + ' #dimensionesText8').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('.productosColor' + producto + ' #precioDimenText8').text(precioDimen + ' €');
                            $('#anchoEspecialAltura' + producto).append(
                                '<option value="' + datos[i]['id'] + '">' + datos[i]['ancho'] + '</option>'
                            );
                            $('#anchoEspecialFondo' + producto).append(
                                '<option value="' + datos[i]['id'] + '">' + datos[i]['ancho'] + '</option>'
                            );
                            $('.productosColor' + producto + ' .dimensionesColor7').css({ 'margin-bottom': '1%' });
                            $('.productosColor' + producto + ' .dimensionesColor8').css({ 'margin-bottom': '6%' });
                            $('.productosColor' + producto + ' .dimensionesColor8').css({ display: 'block' });
                            $('.productosColor' + producto + ' .dimensionesColor8').css({ 'margin-left': '20%' });
                            $('.productosColor' + producto + ' .dimensionesColor8').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1;display_none"></p>'
                            );
                        }

                        if (cont == 8 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var precioDimen = datos[i]['precio'];
                            var precioDimen1 = precioDimen * precioPunto;
                            precioDimen = precioDimen1;
                            var predAum = precioDimen * (precioProducto / 100);
                            precioDimen = precioDimen + predAum;
                            $('.productosColor' + producto + ' #dimensionesText9').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('.productosColor' + producto + ' #precioDimenText9').text(precioDimen + ' €');
                            $('#anchoEspecialAltura' + producto).append(
                                '<option value="' + datos[i]['id'] + '">' + datos[i]['ancho'] + '</option>'
                            );
                            $('#anchoEspecialFondo' + producto).append(
                                '<option value="' + datos[i]['id'] + '">' + datos[i]['ancho'] + '</option>'
                            );
                            $('.productosColor' + producto + ' .dimensionesColor8').css({ 'margin-bottom': '1%' });
                            $('.productosColor' + producto + ' .dimensionesColor9').css({ 'margin-bottom': '6%' });
                            $('.productosColor' + producto + ' .dimensionesColor9').css({ display: 'block' });
                            $('.productosColor' + producto + ' .dimensionesColor9').css({ 'margin-left': '20%' });
                            $('.productosColor' + producto + ' .dimensionesColor9').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1;display_none"></p>'
                            );
                        }

                        if (cont == 9 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var precioDimen = datos[i]['precio'];
                            var precioDimen1 = precioDimen * precioPunto;
                            precioDimen = precioDimen1;
                            var predAum = precioDimen * (precioProducto / 100);
                            precioDimen = precioDimen + predAum;
                            $('.productosColor' + producto + ' #dimensionesText10').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('.productosColor' + producto + ' #precioDimenText10').text(precioDimen + ' €');
                            $('#anchoEspecialAltura' + producto).append(
                                '<option value="' + datos[i]['id'] + '">' + datos[i]['ancho'] + '</option>'
                            );
                            $('#anchoEspecialFondo' + producto).append(
                                '<option value="' + datos[i]['id'] + '">' + datos[i]['ancho'] + '</option>'
                            );
                            $('.productosColor' + producto + ' .dimensionesColor9').css({ 'margin-bottom': '1%' });
                            $('.productosColor' + producto + ' .dimensionesColor10').css({ 'margin-bottom': '6%' });
                            $('.productosColor' + producto + ' .dimensionesColor10').css({ display: 'block' });
                            $('.productosColor' + producto + ' .dimensionesColor10').css({ 'margin-left': '20%' });
                            $('.productosColor' + producto + ' .dimensionesColor10').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1;display_none"></p>'
                            );
                        }

                        if (cont == 10 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var precioDimen = datos[i]['precio'];
                            var precioDimen1 = precioDimen * precioPunto;
                            precioDimen = precioDimen1;
                            var predAum = precioDimen * (precioProducto / 100);
                            precioDimen = precioDimen + predAum;
                            $('.productosColor' + producto + ' #dimensionesText11').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('#anchoEspecialAltura' + producto).append(
                                '<option value="' + datos[i]['id'] + '">' + datos[i]['ancho'] + '</option>'
                            );
                            $('#anchoEspecialFondo' + producto).append(
                                '<option value="' + datos[i]['id'] + '">' + datos[i]['ancho'] + '</option>'
                            );
                            $('.productosColor' + producto + ' #precioDimenText11').text(precioDimen + ' €');
                            $('.productosColor' + producto + ' .dimensionesColor10').css({ 'margin-bottom': '1%' });
                            $('.productosColor' + producto + ' .dimensionesColor11').css({ 'margin-bottom': '6%' });
                            $('.productosColor' + producto + ' .dimensionesColor11').css({ display: 'block' });
                            $('.productosColor' + producto + ' .dimensionesColor11').css({ 'margin-left': '20%' });
                            $('.productosColor' + producto + ' .dimensionesColor11').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1;display_none"></p>'
                            );
                        }

                        if (cont == 11 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            var precioDimen = datos[i]['precio'];
                            var precioDimen1 = precioDimen * precioPunto;
                            precioDimen = precioDimen1;
                            var predAum = precioDimen * (precioProducto / 100);
                            precioDimen = precioDimen + predAum;
                            $('.productosColor' + producto + ' #dimensionesText12').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('#anchoEspecialAltura' + producto).append(
                                '<option value="' + datos[i]['id'] + '">' + datos[i]['ancho'] + '</option>'
                            );
                            $('#anchoEspecialFondo' + producto).append(
                                '<option value="' + datos[i]['id'] + '">' + datos[i]['ancho'] + '</option>'
                            );
                            $('.productosColor' + producto + ' #precioDimenText12').text(precioDimen + ' €');
                            $('.productosColor' + producto + ' .dimensionesColor11').css({ 'margin-bottom': '1%' });
                            $('.productosColor' + producto + ' .dimensionesColor12').css({ 'margin-bottom': '6%' });
                            $('.productosColor' + producto + ' .dimensionesColor12').css({ display: 'block' });
                            $('.productosColor' + producto + ' .dimensionesColor12').css({ 'margin-left': '20%' });
                            $('.productosColor' + producto + ' .dimensionesColor12').append(
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
                /**
                this.medidasEspecialesService.findProd(producto).subscribe(data => {
                    for (let j = 0; j < data.body['length']; j++) {
                        if (data.body[j] != undefined) {
                            if (data.body[j]['ancho'] == 1) {
                                $('.productosColor' + producto + ' #dimensionesText20').text('Ancho Especial');
                                $('.productosColor' + producto + ' .dimensionesColor20').css({ display: 'block' });
                                $('.productosColor' + producto + ' .dimensionesColor20').css({ 'margin-left': '20%' });
                                $('#productosPrincipal').append('<datalist id="listaEspecialAncho"></datalist>');

                                for (let i = data.body[j]['min']; i <= data.body[j]['max']; i + 10) {
                                    $('#listaEspecialAncho').append('<option value="' + i + '">' + i + '</option>');
                                    i = i + 10;
                                }
                            }

                            if (data.body[j]['alto'] == 1) {
                                $('.productosColor' + producto + ' #dimensionesText21').text('Altura Especial');
                                $('.productosColor' + producto + ' .dimensionesColor21').css({ display: 'block' });
                                $('.productosColor' + producto + ' .dimensionesColor21').css({ 'margin-left': '20%' });
                                $('#productosPrincipal').append('<datalist id="listaEspecialAlto"></datalist>');

                                for (let i = data.body[j]['min']; i <= data.body[j]['max']; i + 10) {
                                    $('#listaEspecialAlto').append('<option value="' + i + '">' + i + '</option>');
                                    i = i + 10;
                                }
                            }

                            if (data.body[j]['fondo'] == 1) {
                                $('.productosColor' + producto + ' #dimensionesText22').text('Fondo Especial');
                                $('.productosColor' + producto + ' .dimensionesColor22').css({ display: 'block' });
                                $('.productosColor' + producto + ' .dimensionesColor22').css({ 'margin-left': '20%' });
                                $('#productosPrincipal').append('<datalist id="listaEspecialFondo"></datalist>');

                                for (let i = data.body[j]['min']; i <= data.body[j]['max']; i + 10) {
                                    $('#listaEspecialFondo').append('<option value="' + i + '">' + i + '</option>');
                                    i = i + 10;
                                }
                            }
                        }
                    }
                });
                **/
            });

            if (producto == 110 || producto == 111) {
                $('.productosColor110').css({ 'margin-bottom': '650px' });
                $('.productosColor111').css({ 'margin-bottom': '650px' });
            }
            if (producto == 112 || producto == 113) {
                $('.productosColor112').css({ 'margin-bottom': '650px' });
                $('.productosColor113').css({ 'margin-bottom': '650px' });
            }
            if (producto == 115 || producto == 116) {
                $('.productosColor115').css({ 'margin-bottom': '650px' });
                $('.productosColor116').css({ 'margin-bottom': '650px' });
            }
            if (producto == 117 || producto == 118) {
                $('.productosColor117').css({ 'margin-bottom': '650px' });
                $('.productosColor118').css({ 'margin-bottom': '650px' });
            }
            if (producto == 107 || producto == 108 || producto == 109 || producto == 114 || producto == 119) {
                $('.productosColor' + producto).css({ 'margin-bottom': '650px' });
            }

            $('.productosColor').css({ 'background-color': 'white' });
            $('.productosColor' + producto).css({ 'background-color': '#DFDDDC' });
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
        } else {
            arrayComprobar[producto] = undefined;
            this.arrayMostrar = arrayComprobar;
            $('.productosColor107 #acabados').css({ display: 'none' });
            $('.productosColor108 #acabados').css({ display: 'none' });
            $('.productosColor109 #acabados').css({ display: 'none' });
            $('.productosColor110 #acabados').css({ display: 'none' });
            $('.productosColor111 #acabados').css({ display: 'none' });
            $('.productosColor112 #acabados').css({ display: 'none' });
            $('.productosColor113 #acabados').css({ display: 'none' });
            $('.productosColor114 #acabados').css({ display: 'none' });
            $('.productosColor115 #acabados').css({ display: 'none' });
            $('.productosColor116 #acabados').css({ display: 'none' });
            $('.productosColor117 #acabados').css({ display: 'none' });
            $('.productosColor118 #acabados').css({ display: 'none' });
            $('.productosColor119 #acabados').css({ display: 'none' });

            $('.productosColor107 #dimensiones').css({ display: 'none' });
            $('.productosColor108 #dimensiones').css({ display: 'none' });
            $('.productosColor109 #dimensiones').css({ display: 'none' });
            $('.productosColor110 #dimensiones').css({ display: 'none' });
            $('.productosColor111 #dimensiones').css({ display: 'none' });
            $('.productosColor112 #dimensiones').css({ display: 'none' });
            $('.productosColor113 #dimensiones').css({ display: 'none' });
            $('.productosColor114 #dimensiones').css({ display: 'none' });
            $('.productosColor115 #dimensiones').css({ display: 'none' });
            $('.productosColor116 #dimensiones').css({ display: 'none' });
            $('.productosColor117 #dimensiones').css({ display: 'none' });
            $('.productosColor118 #dimensiones').css({ display: 'none' });
            $('.productosColor119 #dimensiones').css({ display: 'none' });

            $('.dimensionesColor1').css({ 'background-color': 'white' });
            $('.dimensionesColor2').css({ 'background-color': 'white' });
            $('.dimensionesColor3').css({ 'background-color': 'white' });
            $('.dimensionesColor4').css({ 'background-color': 'white' });
            $('.dimensionesColor5').css({ 'background-color': 'white' });
            $('.dimensionesColor6').css({ 'background-color': 'white' });
            $('.productosColor107').removeAttr('style');
            $('.productosColor108').removeAttr('style');
            $('.productosColor109').removeAttr('style');
            $('.productosColor110').removeAttr('style');
            $('.productosColor111').removeAttr('style');
            $('.productosColor112').removeAttr('style');
            $('.productosColor113').removeAttr('style');
            $('.productosColor114').removeAttr('style');
            $('.productosColor115').removeAttr('style');
            $('.productosColor116').removeAttr('style');
            $('.productosColor117').removeAttr('style');
            $('.productosColor118').removeAttr('style');
            $('.productosColor119').removeAttr('style');
            $('.productosColorSolo107').removeAttr('style');
            $('.productosColorSolo108').removeAttr('style');
            $('.productosColorSolo109').removeAttr('style');
            $('.productosColorSolo110').removeAttr('style');
            $('.productosColorSolo111').removeAttr('style');
            $('.productosColorSolo112').removeAttr('style');
            $('.productosColorSolo113').removeAttr('style');
            $('.productosColorSolo114').removeAttr('style');
            $('.productosColorSolo115').removeAttr('style');
            $('.productosColorSolo116').removeAttr('style');
            $('.productosColorSolo117').removeAttr('style');
            $('.productosColorSolo118').removeAttr('style');
            $('.productosColorSolo119').removeAttr('style');
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

            $('#productoCalculadora1 #precios1').empty();
            $('#productoCalculadora1 #precioCalculado1').empty();
            $('#productoCalculadora1 #datos1').empty();
            $('#nombreMesita').empty();
            $('#precioDimension').empty();
            $('#total').empty();
            $('#botonEliminar').attr('class', 'displayBoton');
            $('#euroCalculadora').attr('style');
            $('#euroCalculadora').css({ display: 'none' });
        }
    }
    public cambiarMedidasEspecialesAltura(idProd) {
        var ancho = $('#anchoEspecialAltura' + idProd).val();
        var anchoBueno;
        var alto = $('#altoAltoEspecial' + idProd).val();
        var precio;
        var precio1;
        var fondo;
        if (ancho != '' && alto != '') {
            var datos = this.todasDimensiones;
            for (let i = 0; i < datos['length']; i++) {
                if (datos[i]['id'] == ancho) {
                    precio = datos[i]['precio'];
                    anchoBueno = datos[i]['ancho'];
                    fondo = datos[i]['fondo'];
                    var precio1 = datos[i]['precio'];
                    precio = precio * 1.3;
                    $('#precioEspecialAltura' + idProd).text(precio.toFixed(2) + ' €');
                }
            }

            for (let i = 0; i < datos['length']; i++) {
                if (datos[i]['mensaje'] == 'Medidas Especiales') {
                    datos[i]['ancho'] = anchoBueno;
                    datos[i]['fondo'] = fondo;
                    datos[i]['alto'] = alto;
                    datos[i]['precio'] = precio1;
                }
            }
            this.todasDimensiones = datos;
            $('.altoEspecial' + idProd).removeAttr('style');
            $('.altoEspecial' + idProd).removeAttr('disabled');
            $('.altoEspecial' + idProd).attr('style');
            $('.altoEspecial' + idProd).attr('value', 'Seleccionar');
            $('.altoEspecial' + idProd).css({ 'text-align': 'center' });
        }
    }

    public cambiarMedidasEspecialesFondo(idProd) {
        var ancho = $('#anchoEspecialFondo' + idProd).val();
        var anchoBueno;
        var fondo = $('#fondoFondoEspecial' + idProd).val();
        var precio;
        var precio1;
        var alto;
        if (ancho != '' && fondo != '') {
            var datos = this.todasDimensiones;
            for (let i = 0; i < datos['length']; i++) {
                if (datos[i]['id'] == ancho) {
                    precio = datos[i]['precio'];
                    anchoBueno = datos[i]['ancho'];
                    alto = datos[i]['alto'];
                    var precio1 = datos[i]['precio'];
                    precio = precio * 1.3;
                    $('#precioEspecialFondo' + idProd).text(precio.toFixed(2) + ' €');
                }
            }

            for (let i = 0; i < datos['length']; i++) {
                if (datos[i]['mensaje'] == 'Medidas Especiales') {
                    datos[i]['ancho'] = anchoBueno;
                    datos[i]['fondo'] = fondo;
                    datos[i]['alto'] = alto;
                    datos[i]['precio'] = precio1;
                }
            }
            this.todasDimensiones = datos;
            $('.fondoEspecial' + idProd).removeAttr('style');
            $('.fondoEspecial' + idProd).removeAttr('disabled');
            $('.fondoEspecial' + idProd).attr('style');
            $('.fondoEspecial' + idProd).attr('value', 'Seleccionar');
            $('.fondoEspecial' + idProd).css({ 'text-align': 'center' });
        }
    }

    public especialAlturaAncho(idProd) {
        var especiales;
        $('#datos1').empty();
        $('#imagenAcabadoPrincipal').empty();

        var todas = this.todasDimensiones;
        for (let j = 0; j < todas['length']; j++) {
            if (todas[j]['mensaje'] == 'Medidas Especiales') {
                especiales = todas[j];
            }
        }

        $('#datos1').append('<p style="width:100%"><strong>MEDIDAS</strong></p>');
        $('#datos1').append(
            '<p class="' + especiales['id'] + '" id="ancho1" style="width:100%">Ancho: <span style="" id="valorAnchoESPECIAL"></span></p>'
        );

        $('#datos1').append(
            '<p id="alto1" class="' +
                especiales['precio'] +
                '" style="width:100%">Alto especial: <span style="" id="valorAltoESPECIAL"></span></p>'
        );
        $('#datos1').append('<p style="width:90%;font-style: italic;">Incremento 30%<span id="precioAum" style="float:right"></span></p>');
        $('#datos1').append('<p id="fondo1" style="width:100%">Fondo: <span style="" id="valorFondoESPECIAL"></span></p>');
        $('#valorAnchoESPECIAL').text(especiales['ancho']);
        $('#valorAltoESPECIAL').text(especiales['alto']);
        $('#valorFondoESPECIAL').text(especiales['fondo']);
        var precio = especiales['precio'];
        precio = precio * 1.3;
        $('#datos1').css({ display: 'block' });
        var totalfloat = 0;
        totalfloat = parseFloat(precio.toFixed(2));
        $('#valorAnchoESPECIAL').attr('class', especiales['precio']);
        this.precioDimension = totalfloat;
        this.precioDimension1 = totalfloat;
        $('#total').text(totalfloat);
        $('#precioDimension').text(totalfloat);
        $('#precioAum').text((especiales['precio'] * 0.3).toFixed(2));

        $('.altoEspecial' + idProd).css({ 'background-color': 'rgb(223, 221, 220)' });

        var idProd1;
        var acabados = [];
        var imagen;
        $('#datos1').css({ display: 'block' });
        idProd1 = parseFloat(idProd);
        $('.productosColor' + idProd1 + ' #acabados').removeAttr('style');
        $('.productosColor' + idProd1 + ' #acabados').attr('style');
        $('.productosColor' + idProd1 + ' #acabados').css({ 'text-align': 'center' });
        $('.productosColor' + idProd1 + ' #acabados').css({ float: 'left' });
        $('.productosColor' + idProd1 + ' #acabados').css({ width: '90%' });
        $('.productosColor' + idProd1 + ' #acabados').css({ border: '1px solid #7AC8FE' });
        $('.productosColor' + idProd1 + ' #acabado').css({ display: 'block' });
        $('.productosColor' + idProd1).css({ 'overflow-y': 'hidden' });
        $('.productosColor' + idProd1).css({ 'padding-bottom': '15%' });
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
                        $('.productosColor' + idProd1 + ' #acabados #imagenAcabadoPrincipal').append(
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
                                '" height="250px" width="130px" style="">'
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
                    $('#aca1' + u).append(
                        '<img id="imagenAcabadoPrincipal1" src"../../../content/images/blanco.jpg" height="60px" border="0" width="200px" style=" opacity: 0.7;margin-left:20px;"/>'
                    );
                    u++;
                    i = 0;
                    contnuevo++;
                }
            });
            $('#datos1').append(
                '<p style="width:95%"><strong>APOYO </strong><span style="float:right">&euro;</span><span id="precioApoyo" style="float:right"></span></p>'
            );
            $('#datos1').append(
                '<p style="width:100%"><input id="apoyoCalculadoraTexto" data-toggle="modal" data-target="#modalApoyo" height="30px" border="0" width="200px" style="margin-left:20px;text-align:center" readonly="readonly"/></p>'
            );
        });
        this.iluminacionService.findProd(idProd).subscribe(data => {
            if (data.body.length != 0) {
                $('#datos12').css({ display: 'block' });
                this.iluminacionService.todos = data.body[0];
            }
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
                        '" height="160px" width="280px" style=" ">'
                );
                $('#modalApoyo #apoyoModal' + w).append('<strong><p>' + data.body[w]['nombre'] + '</strong></p>');
            }
        });
        for (let i = 1; i <= 14; i++) {
            for (let k = 0; k < 14; k++) {
                $('#myModalColores' + i + ' #acabadoImagen' + k).empty();
            }
        }

        $('#botonApoyoNuevo').empty();
        $('#botonApoyoNuevo').append(
            '<button style="float:left;margin-bottom:35px;margin-top:15px;background-color: white;border: 1px solid #d5d5d5;height: 40px; width: 100px;" class="" id="color" data-toggle="modal" data-target="#modalApoyo">Apoyo</button>'
        );
        $('#botonApoyoNuevo').append(
            '<img id="imagenAcabadoPrincipal1" src"../../../content/images/blanco.jpg" height="60px" border="0" width="200px" style="margin-left:20px;"/>'
        );
    }

    public especialFondoAncho(idProd) {
        var especiales;
        $('#datos1').empty();
        $('#imagenAcabadoPrincipal').empty();

        var todas = this.todasDimensiones;
        for (let j = 0; j < todas['length']; j++) {
            if (todas[j]['mensaje'] == 'Medidas Especiales') {
                especiales = todas[j];
            }
        }

        $('#datos1').append('<p style="width:100%"><strong>MEDIDAS</strong></p>');
        $('#datos1').append(
            '<p class="' + especiales['id'] + '" id="ancho1" style="width:100%">Ancho: <span style="" id="valorAnchoESPECIAL"></span></p>'
        );

        $('#datos1').append(
            '<p id="alto1" class="' + especiales['precio'] + '" style="width:100%">Alto: <span style="" id="valorAltoESPECIAL"></span></p>'
        );

        $('#datos1').append('<p id="fondo1" style="width:100%">Fondo especial: <span style="" id="valorFondoESPECIAL"></span></p>');
        $('#datos1').append('<p style="width:90%;font-style: italic;">Incremento 30%<span id="precioAum" style="float:right"></span></p>');
        $('#valorAnchoESPECIAL').text(especiales['ancho']);
        $('#valorAltoESPECIAL').text(especiales['alto']);
        $('#valorFondoESPECIAL').text(especiales['fondo']);
        var precio = especiales['precio'];
        precio = precio * 1.3;
        $('#datos1').css({ display: 'block' });
        var totalfloat = 0;
        totalfloat = parseFloat(precio.toFixed(2));
        $('#valorAnchoESPECIAL').attr('class', especiales['precio']);
        this.precioDimension = totalfloat;
        this.precioDimension1 = totalfloat;
        $('#total').text(totalfloat);
        $('#precioDimension').text(totalfloat);
        $('#precioAum').text((especiales['precio'] * 0.3).toFixed(2));

        $('.fondoEspecial' + idProd).css({ 'background-color': 'rgb(223, 221, 220)' });

        var idProd1;
        var acabados = [];
        var imagen;
        $('#datos1').css({ display: 'block' });
        idProd1 = parseFloat(idProd);
        $('.productosColor' + idProd1 + ' #acabados').removeAttr('style');
        $('.productosColor' + idProd1 + ' #acabados').attr('style');
        $('.productosColor' + idProd1 + ' #acabados').css({ 'text-align': 'center' });
        $('.productosColor' + idProd1 + ' #acabados').css({ float: 'left' });
        $('.productosColor' + idProd1 + ' #acabados').css({ width: '90%' });
        $('.productosColor' + idProd1 + ' #acabados').css({ border: '1px solid #7AC8FE' });
        $('.productosColor' + idProd1 + ' #acabado').css({ display: 'block' });
        $('.productosColor' + idProd1).css({ 'overflow-y': 'hidden' });
        $('.productosColor' + idProd1).css({ 'padding-bottom': '15%' });
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
                        $('.productosColor' + idProd1 + ' #acabados #imagenAcabadoPrincipal').append(
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
                                '" height="250px" width="130px" style="">'
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
                    $('#aca1' + u).append(
                        '<img id="imagenAcabadoPrincipal1" src"../../../content/images/blanco.jpg" height="60px" border="0" width="200px" style=" opacity: 0.7;margin-left:20px;"/>'
                    );
                    u++;
                    i = 0;
                    contnuevo++;
                }
            });
            $('#datos1').append(
                '<p style="width:95%"><strong>APOYO </strong><span style="float:right">&euro;</span><span id="precioApoyo" style="float:right"></span></p>'
            );
            $('#datos1').append(
                '<p style="width:100%"><input id="apoyoCalculadoraTexto" data-toggle="modal" data-target="#modalApoyo" height="30px" border="0" width="200px" style="margin-left:20px;text-align:center" readonly="readonly"/></p>'
            );
        });
        this.iluminacionService.findProd(idProd).subscribe(data => {
            if (data.body.length != 0) {
                $('#datos12').css({ display: 'block' });
                this.iluminacionService.todos = data.body[0];
            }
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
                        '" height="160px" width="280px" style=" ">'
                );
                $('#modalApoyo #apoyoModal' + w).append('<strong><p>' + data.body[w]['nombre'] + '</strong></p>');
            }
        });
        for (let i = 1; i <= 14; i++) {
            for (let k = 0; k < 14; k++) {
                $('#myModalColores' + i + ' #acabadoImagen' + k).empty();
            }
        }

        $('#botonApoyoNuevo').empty();
        $('#botonApoyoNuevo').append(
            '<button style="float:left;margin-bottom:35px;margin-top:15px;background-color: white;border: 1px solid #d5d5d5;height: 40px; width: 100px;" class="" id="color" data-toggle="modal" data-target="#modalApoyo">Apoyo</button>'
        );
        $('#botonApoyoNuevo').append(
            '<img id="imagenAcabadoPrincipal1" src"../../../content/images/blanco.jpg" height="60px" border="0" width="200px" style="margin-left:20px;"/>'
        );
    }

    public especialDimensionesAncho(idProd) {
        $('#productoCalculadora1 #precios1').empty();
        $('#productoCalculadora1 #precioCalculado1').empty();
        $('#productoCalculadora1 #datos1').empty();
        $('#precioDimension').empty();
        $('#total').empty();
        $('#datos1').css({ display: 'none' });
        $('#datos12').css({ display: 'none' });
        $('#imagenAcabadoPrincipal').empty();

        $('#textoFinal').removeAttr('style');
        $('#textoFinal').attr('style');
        $('#textoFinal').css({ display: 'none' });
        $('#datos1').empty();

        this.dimensionesProductoTipoService.findProducto(idProd).subscribe(data => {
            console.log(data.body);
            var datos = data.body;
            var ancho;
            ancho = $('#anchoEspecialDat' + idProd).val();
            var ole = 0;
            var todo;
            var especiales;
            if (ancho == 125 || ancho == 150 || ancho == 175 || ancho == 200) {
                $('#mensajeErrorAlert').css({ display: 'block' });
            }
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
            console.log(todo);
            var precio = todo['precio'];
            precio = precio * 1.3;
            $('#precioEspecialAncho' + idProd).text(precio.toFixed(2) + ' €');
            $('#altoAncho' + idProd).val(todo['alto']);
            $('#fondoAncho' + idProd).val(todo['fondo']);
            $('.anchoEspecial' + idProd).removeAttr('style');
            $('.anchoEspecial' + idProd).removeAttr('disabled');
            $('.anchoEspecial' + idProd).attr('style');
            $('.anchoEspecial' + idProd).attr('value', 'Seleccionar');
            $('.anchoEspecial' + idProd).css({ 'text-align': 'center' });

            $('.productosColor' + idProd + ' .dimensionesColor20').append(
                '<p class="dimensionesId20" id="' + todo['id'] + '" style="position:absolute;z-index:1;display:none"></p>'
            );

            $('#datos1').append('<p style="width:100%"><strong>MEDIDAS</strong></p>');
            $('#datos1').append(
                '<p class="' +
                    especiales['id'] +
                    '" id="ancho1" style="width:100%">Ancho especial: <span style="" id="valorAnchoESPECIAL"></span></p>'
            );
            $('#datos1').append(
                '<p style="width:90%;font-style: italic;">Incremento 30%<span id="precioAum" style="float:right"></span></p>'
            );
            $('#datos1').append(
                '<p id="alto1" class="' + todo['precio'] + '" style="width:100%">Alto: <span style="" id="valorAltoESPECIAL"></span></p>'
            );
            $('#datos1').append('<p id="fondo1" style="width:100%">Fondo: <span style="" id="valorFondoESPECIAL"></span></p>');
            var totalfloat = 0;
            totalfloat = parseFloat(precio.toFixed(2));
            $('#valorAnchoESPECIAL').attr('class', todo['precio']);
            this.precioDimension = totalfloat;
            this.precioDimension1 = totalfloat;
            $('#total').text(totalfloat);
            $('#precioDimension').text(totalfloat);
            $('#valorAnchoESPECIAL').text(ancho);
            $('#precioAum').text((todo['precio'] * 0.3).toFixed(2));
            $('#valorAltoESPECIAL').text(todo['alto']);
            $('#valorFondoESPECIAL').text(todo['fondo']);
        });
    }
    public mostrarAcabadosEspeciales(idProd) {
        var idProd1;
        var acabados = [];
        var imagen;
        $('#imagenAcabadoPrincipal').empty();

        $('#datos1').css({ display: 'block' });
        $('.anchoEspecial' + idProd).css({ 'background-color': 'rgb(223, 221, 220)' });
        idProd1 = parseFloat(idProd);
        $('.productosColor' + idProd1 + ' #acabados').removeAttr('style');
        $('.productosColor' + idProd1 + ' #acabados').attr('style');
        $('.productosColor' + idProd1 + ' #acabados').css({ 'text-align': 'center' });
        $('.productosColor' + idProd1 + ' #acabados').css({ float: 'left' });
        $('.productosColor' + idProd1 + ' #acabados').css({ width: '90%' });
        $('.productosColor' + idProd1 + ' #acabados').css({ border: '1px solid #7AC8FE' });
        $('.productosColor' + idProd1 + ' #acabado').css({ display: 'block' });
        $('.productosColor' + idProd1).css({ 'overflow-y': 'hidden' });
        $('.productosColor' + idProd1).css({ 'padding-bottom': '15%' });
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
                        $('.productosColor' + idProd1 + ' #acabados #imagenAcabadoPrincipal').append(
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
                                '" height="250px" width="130px" style="">'
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
                    $('#aca1' + u).append(
                        '<img id="imagenAcabadoPrincipal1" src"../../../content/images/blanco.jpg" height="60px" border="0" width="200px" style=" opacity: 0.7;margin-left:20px;"/>'
                    );
                    u++;
                    i = 0;
                    contnuevo++;
                }
            });
            $('#datos1').append(
                '<p style="width:95%"><strong>APOYO </strong><span style="float:right">&euro;</span><span id="precioApoyo" style="float:right"></span></p>'
            );
            $('#datos1').append(
                '<p style="width:100%"><input id="apoyoCalculadoraTexto" data-toggle="modal" data-target="#modalApoyo" height="30px" border="0" width="200px" style="margin-left:20px;text-align:center" readonly="readonly"/></p>'
            );
        });
        this.iluminacionService.findProd(idProd).subscribe(data => {
            if (data.body.length != 0) {
                $('#datos12').css({ display: 'block' });
                this.iluminacionService.todos = data.body[0];
            }
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
                        '" height="160px" width="280px" style=" ">'
                );
                $('#modalApoyo #apoyoModal' + w).append('<strong><p>' + data.body[w]['nombre'] + '</strong></p>');
            }
        });
        for (let i = 1; i <= 14; i++) {
            for (let k = 0; k < 14; k++) {
                $('#myModalColores' + i + ' #acabadoImagen' + k).empty();
            }
        }

        $('#botonApoyoNuevo').empty();
        $('#botonApoyoNuevo').append(
            '<button style="float:left;margin-bottom:35px;margin-top:15px;background-color: white;border: 1px solid #d5d5d5;height: 40px; width: 100px;" class="" id="color" data-toggle="modal" data-target="#modalApoyo">Apoyo</button>'
        );
        $('#botonApoyoNuevo').append(
            '<img id="imagenAcabadoPrincipal1" src"../../../content/images/blanco.jpg" height="60px" border="0" width="200px" style="margin-left:20px;"/>'
        );
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
                                    '" width="500px" height="283.73px" style=""></a>'
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
                                    '" width="500px" height="283.73px"  style=""></a>'
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
                                    '" width="500px" height="283.73px" style=""></a>'
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
                                    '" width="500px" height="283.73px" style=""></a>'
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
                                    '" width="500px" height="283.73px"  style=""></a>'
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
                                    '"width="500px" height="283.73px"  style=""></a>'
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
                                    '" width="500px" height="283.73px" style=""></a>'
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
                                    '" width="500px" height="283.73px"  style=""></a>'
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
                                    '" width="500px" height="283.73px" style=""></a>'
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
                                    '" width="500px" height="333px" style=""></a>'
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
                                    '" width="500px" height="283.73px"  style=""></a>'
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
                                    '"width="500px" height="283.73px"  style=""></a>'
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
                                        '" id="imagenProd" width="500px" height="290.5px"  style="">'
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
                                    '" id="imagenProd" width="500px" height="290.5px"  style="">'
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
        $('#datos1').empty();
        $('#datos1').css({ display: 'block' });
        $('#euroCalculadora').removeAttr('style');
        $('#medidasEspecialesTexto').css({ display: 'none' });
        $('#medidasAncho').css({ display: 'none' });
        $('#medidasFondo').css({ display: 'none' });
        $('#medidasAlto').css({ display: 'none' });
        var precioTienda = this.precioTienda;
        this.interiores = JSON.parse(sessionStorage.getItem('interiores'));
        var dimensiones = this.dimensionesProductoTipoService.todos;
        for (let i = 1; i <= 15; i++) {
            $('#aca1' + i).empty();
        }

        var iva = this.iva;
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

        var idProd;
        idProd = $('#nombreMesita').attr('class');
        $('.productosColor' + idProd + ' #imagenAcabadoPrincipal').empty();
        $('.productosColor' + idProd + ' #dimensionesInput1').css({ 'background-color': 'white' });
        $('.productosColor' + idProd + ' #dimensionesInput2').css({ 'background-color': 'white' });
        $('.productosColor' + idProd + ' #dimensionesInput3').css({ 'background-color': 'white' });
        $('.productosColor' + idProd + ' #dimensionesInput4').css({ 'background-color': 'white' });
        $('.productosColor' + idProd + ' #dimensionesInput5').css({ 'background-color': 'white' });
        $('.productosColor' + idProd + ' #dimensionesInput6').css({ 'background-color': 'white' });
        $('.productosColor' + idProd + ' #dimensionesInput7').css({ 'background-color': 'white' });
        $('.productosColor' + idProd + ' #dimensionesInput20').css({ 'background-color': 'white' });
        $('.productosColor' + idProd + ' #dimensionesInput21').css({ 'background-color': 'white' });
        $('.productosColor' + idProd + ' #dimensionesInput22').css({ 'background-color': 'white' });
        $('.productosColor' + idProd + ' #dimensionesInput' + id).css({ 'background-color': '#DFDDDC' });
        var precioPunto = this.precioPunto[0];
        var todosLosPrecios = this.precioTiendaProductosService.todos;

        for (let y = 0; y < todosLosPrecios.length; y++) {
            if (idProd == todosLosPrecios[y][2]) {
                var precioProducto = todosLosPrecios[y][1];
            }
        }
        var idDimenTipo = $('.productosColor' + idProd + ' .dimensionesId' + id).attr('id');
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
                    if (iva == 1) {
                        var todasCuenta = totalfloat * 1.21;
                    } else {
                        var todasCuenta = 0;
                        todasCuenta = totalfloat;
                    }
                    var totalfloat = 0;
                    totalfloat = parseFloat(todasCuenta.toFixed(2));
                    this.precioDimension = totalfloat;
                    this.precioDimension1 = totalfloat;
                    $('#total').text(totalfloat);
                    $('#precioDimension').text(totalfloat);
                    $('#idioma').attr('value', datos[h]['id']);
                    $('#datos1').append('<p style="width:100%"><strong>MEDIDAS</strong></p>');
                    $('#datos1').append(
                        '<p style="width:100%"><span>Ancho : </span><span class="' +
                            datos[h]['id'] +
                            '" id="ancho1">' +
                            datos[h]['ancho'] +
                            '</span></p>'
                    );
                    $('#datos1').append('<p style="width:100%"><span>Alto : </span><span>' + datos[h]['alto'] + '</span></p>');
                    $('#datos1').append(
                        '<p style="width:100%"><span>Fondo : </span><span id="fondoDatosDimen">' + datos[h]['fondo'] + '</span></p>'
                    );
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
                    $('#especialesAncho').css({ border: '1px gray solid' });
                    $('#especialesAncho').css({ 'text-align': 'center' });
                    $('#especialesFondo').css({ float: 'left' });
                    $('#especialesFondo').css({ width: '20%' });
                    $('#especialesFondo').css({ border: '1px gray solid' });
                    $('#especialesFondo').css({ 'text-align': 'center' });
                    $('#especialesAlto').css({ float: 'left' });
                    $('#especialesAlto').css({ width: '20%' });
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

        if (acaSi == 0) {
            var idProd1;
            idProd1 = parseFloat(idProd);
            if (idProd1 == 110 || idProd1 == 111) {
                $('.productosColor110').css({ 'margin-bottom': '1130px' });
                $('.productosColor111').css({ 'margin-bottom': '1130px' });
            }
            if (idProd1 == 112 || idProd1 == 113) {
                $('.productosColor112').css({ 'margin-bottom': '1130px' });
                $('.productosColor113').css({ 'margin-bottom': '1130px' });
            }
            if (idProd1 == 115 || idProd1 == 116) {
                $('.productosColor115').css({ 'margin-bottom': '1130px' });
                $('.productosColor116').css({ 'margin-bottom': '1130px' });
            }
            if (idProd1 == 117 || idProd1 == 118) {
                $('.productosColor117').css({ 'margin-bottom': '1130px' });
                $('.productosColor118').css({ 'margin-bottom': '1130px' });
            }
            if (idProd1 == 108 || idProd1 == 109) {
                $('.productosColor' + idProd1).css({ 'margin-bottom': '1130px' });
            }
            if (idProd1 == 119) {
                $('.productosColor' + idProd1).css({ 'margin-bottom': '1200px' });
            }
            if (idProd1 == 107) {
                $('.productosColor' + idProd1).css({ 'margin-bottom': '1350px' });
            }
            if (idProd1 == 114) {
                $('.productosColor' + idProd1).css({ 'margin-bottom': '1200px' });
            }
            $('.productosColor107 #acabados').css({ display: 'none' });
            $('.productosColor108 #acabados').css({ display: 'none' });
            $('.productosColor109 #acabados').css({ display: 'none' });
            $('.productosColor110 #acabados').css({ display: 'none' });
            $('.productosColor111 #acabados').css({ display: 'none' });
            $('.productosColor112 #acabados').css({ display: 'none' });
            $('.productosColor113 #acabados').css({ display: 'none' });
            $('.productosColor114 #acabados').css({ display: 'none' });
            $('.productosColor115 #acabados').css({ display: 'none' });
            $('.productosColor116 #acabados').css({ display: 'none' });
            $('.productosColor117 #acabados').css({ display: 'none' });
            $('.productosColor118 #acabados').css({ display: 'none' });
            $('.productosColor119 #acabados').css({ display: 'none' });
            $('.productosColor' + idProd1 + ' #acabados').removeAttr('style');
            $('.productosColor' + idProd1 + ' #acabados').attr('style');
            $('.productosColor' + idProd1 + ' #acabados').css({ 'text-align': 'center' });
            $('.productosColor' + idProd1 + ' #acabados').css({ float: 'left' });
            $('.productosColor' + idProd1 + ' #acabados').css({ position: 'absolute' });
            $('.productosColor' + idProd1 + ' #acabados').css({ width: '63.3%' });
            $('.productosColor' + idProd1 + ' #acabados').css({ left: '28.5%' });
            if (idProd1 != 107) {
                $('.productosColor' + idProd1 + ' #acabados').css({ 'margin-top': '465px' });
            }
            if (idProd1 == 107) {
                $('.productosColor' + idProd1 + ' #acabados').css({ 'margin-top': '680px' });
            }
            if (idProd1 == 119) {
                $('.productosColor' + idProd1 + ' #acabados').css({ 'margin-top': '510px' });
            }
            if (idProd1 == 114) {
                $('.productosColor' + idProd1 + ' #acabados').css({ 'margin-top': '510px' });
            }
            $('.productosColor' + idProd1 + ' #acabados').css({ border: '1px solid #7AC8FE' });
            $('.productosColor' + idProd1 + ' #acabado').css({ display: 'block' });
            $('.productosColor' + idProd1).css({ 'overflow-y': 'hidden' });
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
                            $('.productosColor' + idProd1 + ' #acabados #imagenAcabadoPrincipal').append(
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
                                    '" height="250px" width="130px" style="">'
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
                        $('#aca1' + u).append(
                            '<img id="imagenAcabadoPrincipal1" src"../../../content/images/blanco.jpg" height="60px" border="0" width="200px" style=" opacity: 0.7;margin-left:20px;"/>'
                        );
                        u++;
                        i = 0;
                        contnuevo++;
                    }
                });
                $('#datos1').append(
                    '<p style="width:95%"><strong>APOYO </strong><span style="float:right">&euro;</span><span id="precioApoyo" style="float:right"></span></p>'
                );
                $('#datos1').append(
                    '<p style="width:100%"><input id="apoyoCalculadoraTexto" data-toggle="modal" data-target="#modalApoyo" height="30px" border="0" width="200px" style="margin-left:20px;text-align:center" readonly="readonly"/></p>'
                );
            });
            this.iluminacionService.findProd(idProd).subscribe(data => {
                if (data.body.length != 0) {
                    $('#datos12').css({ display: 'block' });
                    this.iluminacionService.todos = data.body[0];
                }
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
                            '" height="160px" width="280px" style=" ">'
                    );
                    $('#modalApoyo #apoyoModal' + w).append('<strong><p>' + data.body[w]['nombre'] + '</strong></p>');
                }
            });
            for (let i = 1; i <= 14; i++) {
                for (let k = 0; k < 14; k++) {
                    $('#myModalColores' + i + ' #acabadoImagen' + k).empty();
                }
            }

            $('#botonApoyoNuevo').empty();
            $('#botonApoyoNuevo').append(
                '<button style="float:left;margin-bottom:35px;margin-top:15px;background-color: white;border: 1px solid #d5d5d5;height: 40px; width: 100px;" class="" id="color" data-toggle="modal" data-target="#modalApoyo">Apoyo</button>'
            );
            $('#botonApoyoNuevo').append(
                '<img id="imagenAcabadoPrincipal1" src"../../../content/images/blanco.jpg" height="60px" border="0" width="200px" style="margin-left:20px;"/>'
            );
        }
    }

    public escogidaLuz(id) {
        var precioPunto = this.precioPunto[0];
        $('#' + id + 'MeterIluminacion').css({ 'background-color': '#CDCDCD' });
        if (id == 'si') {
            var todoFloat = $('#precioDimension').text();
            var totalFloat = parseFloat(todoFloat);

            $('#noMeterIluminacion').css({ 'background-color': 'white' });
            var ilu = this.iluminacionService.todos;
            var precio = ilu['precio'];
            precio = precio * precioPunto;
            totalFloat = totalFloat + precio;

            this.precioDimension = totalFloat;
            $('#precioDimension').text(totalFloat);
            $('#precioIluminacion').text(ilu['precio'] + ' €');
            $('#precioIluminacion').attr('class', 'si');
        } else {
            $('#siMeterIluminacion').css({ 'background-color': 'white' });
            $('#precioIluminacion').text(' ');
            this.precioDimension = this.precioDimension1;
            $('#precioDimension').text(this.precioDimension1);
            $('#precioIluminacion').attr('class', 'no');
        }

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

        var apoyoBueno = $('#datos1 #nombreApoyo').text();
        var idProd = $('#nombreMesita').attr('class');
        if (contadorApoyo == cont - 1 && apoyoBueno != '') {
            $('#divDentroCalcu').css({ height: '76%' });
            if (this.iluminacionService.todos != undefined) {
                var precioIlu = $('#precioIluminacion').attr('class');
                if (precioIlu != ' ' && precioIlu != '' && precioIlu != undefined && precioIlu != null) {
                    $('#textoFinal').removeAttr('style');
                    $('#textoFinal').attr('style');
                    $('#textoFinal').css({ width: '100%' });
                    $('#textoFinal').css({ float: 'left' });
                    $('#botonCalculadora').removeAttr('class');
                }
            } else {
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
                                '<input style="float:left;text-align: center;width:100px;" value="" min="' +
                                    medidasEspeciales[i]['min'] +
                                    '" max="' +
                                    medidasEspeciales[i]['max'] +
                                    '"  type="number" id="anchoInputEspeciales"/>'
                            );
                            $('#medidasFondo').append(
                                '<input style="float:left;margin-left:2%;width:100px;" id="inputFondoAncho" value="" disabled />'
                            );
                            $('#medidasFondo').removeAttr('style');
                            $('#medidasFondo').attr('style');
                            $('#medidasFondo').css({ float: 'right' });
                            $('#medidasFondo').css({ 'margin-bottom': '10%' });
                            $('#medidasAlto').removeAttr('style');
                            $('#medidasAlto').attr('style');
                            $('#medidasAlto').css({ float: 'right' });
                            $('#medidasAlto').append(
                                '<input style="float:left;margin-left:2%;width:100px;" id="inputAltoAncho" value="" disabled />'
                            );
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
                                '<input type="number" style="float:left;margin-left:2%;width:100px;" id="inputFondoAncho" max="' +
                                    medidasEspeciales[i]['max'] +
                                    '" min="' +
                                    medidasEspeciales[i]['min'] +
                                    '" value="" />'
                            );
                            $('#medidasFondo').removeAttr('style');
                            $('#medidasFondo').attr('style');
                            $('#medidasFondo').css({ float: 'right' });
                            $('#medidasFondo').css({ 'margin-bottom': '10%' });
                            $('#medidasAlto').removeAttr('style');
                            $('#medidasAlto').attr('style');
                            $('#medidasAlto').css({ float: 'right' });
                            $('#medidasAlto').append(
                                '<input style="float:left;margin-left:2%;width:100px;" id="inputAltoAncho" value="" disabled />'
                            );
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
                                '<input type="number" style="float:left;margin-left:2%;width:100px;" id="inputAltoAncho" max="' +
                                    medidasEspeciales[i]['max'] +
                                    '" min="' +
                                    medidasEspeciales[i]['min'] +
                                    '" value="" />'
                            );
                            $('#medidasFondo').removeAttr('style');
                            $('#medidasFondo').attr('style');
                            $('#medidasFondo').css({ float: 'right' });
                            $('#medidasFondo').css({ 'margin-bottom': '10%' });
                            $('#medidasAlto').removeAttr('style');
                            $('#medidasAlto').attr('style');
                            $('#medidasAlto').css({ float: 'right' });
                            $('#medidasFondo').append(
                                '<input style="float:left;margin-left:2%;width:100px;" id="inputfondoAlto" value="" disabled />'
                            );
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
        var idProd;
        $('#imagenAcabado').remove();
        $('#acabados').css({ display: 'block' });
        $('#nombreApoyoTitulo').css({ display: 'none' });
        for (let i = 1; i <= 5; i++) {
            $('.apoyoCogido' + i).empty();
        }
        for (let i = 1; i <= 15; i++) {
            $('#aca1' + i).empty();
        }
        var precioPunto = this.precioPunto[0];
        var todosLosPrecios = this.precioTiendaProductosService.todos;

        $('#productoCalculadora1 #datos1').empty();
        $('#imagenAcabadoPrincipal').empty();
        $('#imagenAcabado').remove();
        idProd = $('#nombreMesita').attr('class');
        for (let y = 0; y < todosLosPrecios.length; y++) {
            if (parseFloat(idProd) == todosLosPrecios[y][2]) {
                var precioProducto = todosLosPrecios[y][1];
            }
        }
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
                            $('#datos1').append('<p style="width:100%"><strong>MEDIDAS</strong></p>');
                            $('#datos1').append(
                                '<p class="' +
                                    idDimenTipo +
                                    '" id="ancho1" style="width:95%">Ancho Especial: <span style="" id="valorAnchoESPECIAL"></span></p>'
                            );
                            $('#datos1').append(
                                '<p style="width:95%;font-style: italic;" id="pIncremento">Incremento 30%<span style="float:right">+ <span id="precioAum" ></span> &euro;</span></p>'
                            );
                            $('#datos1').append(
                                '<p id="alto1" class="' +
                                    precioAum +
                                    '" style="width:95%">Alto: <span style="" id="valorAltoESPECIAL"></span></p>'
                            );
                            $('#datos1').append(
                                '<p id="fondo1" style="width:95%">Fondo: <span style="" id="valorFondoESPECIAL"></span></p>'
                            );

                            var total = $('#total').text();
                            var totalfloat = parseFloat(total);
                            var precio = parseFloat(dimensiones[k]['precio']);
                            $('#valorAnchoESPECIAL').attr('class', precio);
                            $('#pIncremento').attr('class', precio);
                            precio = precio * precioPunto;
                            var cuenta = precio * (precioProducto / 100);
                            precio = precio + cuenta;
                            precio = Math.round(precio * 100) / 100;
                            totalfloat = totalfloat + precio;

                            var precioAum = precio * 0.3;
                            var precioAumGuardado = precioAum;
                            precioAum = precio + precioAum;
                            $('#total').text(precioAum.toFixed(2));
                            $('#precioDimension').text(precioAum.toFixed(2));
                            $('#valorAnchoESPECIAL').text(valor);
                            $('#idioma').attr('value', dimensiones[k]['id']);
                            $('#valorAltoESPECIAL').text(dimensiones[k]['alto']);
                            $('#valorFondoESPECIAL').text(dimensiones[k]['fondo']);
                            $('#precioAum').text(precioAumGuardado.toFixed(2));
                            this.precioDimension = precioAum.toFixed(2);
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
                                    $('#datos1').append('<p style="width:100%"><strong>MEDIDAS</strong></p>');
                                    $('#datos1').append(
                                        '<p class="' +
                                            idDimenTipo +
                                            '" id="ancho1" style="width:100%">Ancho especial: <span style="" id="valorAnchoESPECIAL"></span></p>'
                                    );
                                    $('#datos1').append(
                                        '<p style="width:100%;font-style: italic;">Incremento 30%<span id="precioAum" style="float:right"></span></p>'
                                    );
                                    $('#datos1').append(
                                        '<p id="alto1" class="' +
                                            precioAum +
                                            '" style="width:100%">Alto: <span style="" id="valorAltoESPECIAL"></span></p>'
                                    );
                                    $('#datos1').append(
                                        '<p id="fondo1" style="width:100%">Fondo: <span style="" id="valorFondoESPECIAL"></span></p>'
                                    );

                                    var total = $('#total').text();
                                    var totalfloat = parseFloat(total);
                                    var precio = parseFloat(dimensiones[k]['precio']);
                                    precio = precio * precioPunto;
                                    var cuenta = precio * (precioProducto / 100);
                                    precio = precio + cuenta;
                                    precio = Math.round(precio * 100) / 100;
                                    totalfloat = totalfloat + precio;
                                    var precioAum = precio * 0.3;
                                    var precioAumGuardado = precioAum;
                                    precioAum = precio + precioAum;
                                    $('#total').text(precioAum.toFixed(2));
                                    $('#precioDimension').text(precioAum.toFixed(2));
                                    $('#valorAnchoESPECIAL').text(valor);
                                    $('#idioma').attr('value', dimensiones[k]['id']);
                                    $('#valorAltoESPECIAL').text(dimensiones[k]['alto']);
                                    $('#valorFondoESPECIAL').text(dimensiones[k]['fondo']);
                                    $('#precioAum').text(precioAumGuardado.toFixed(2));
                                    this.precioDimension = precioAum.toFixed(2);
                                }
                            }
                        }
                    }
                }
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
                                    '" src="../../../content/images/blanco.jpg" height="60px" border="0" width="100px" style=" opacity: 0.7;margin-left:20px;"/><span id="nombreAcaCalcu' +
                                    u +
                                    '" style="margin-left:10px"></span></p>'
                            );
                            $('#aca1' + u).append(
                                '<img id="imagenAcabadoPrincipal1" src"../../../content/images/blanco.jpg" height="60px" border="0" width="200px" style=" opacity: 0.7;margin-left:20px;"/>'
                            );
                            u++;
                            i = 0;
                            contnuevo++;
                        }
                    });
                    $('#datos1').append(
                        '<p style="width:95%"><strong>APOYO </strong><span style="float:right">&euro;</span><span id="precioApoyo" style="float:right"></span></p>'
                    );
                    $('#datos1').append(
                        '<p style="width:100%"><input id="apoyoCalculadoraTexto" data-toggle="modal" data-target="#modalApoyo" height="30px" border="0" width="200px" style="margin-left:20px;text-align:center" readonly="readonly"/></p>'
                    );
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
                                '" height="160px" width="280px" style=" ">'
                        );
                        $('#modalApoyo #apoyoModal' + w).append('<strong><p>' + data.body[w]['nombre'] + '</strong></p>');
                    }
                });
                for (let i = 1; i <= 14; i++) {
                    for (let k = 0; k < 14; k++) {
                        $('#myModalColores' + i + ' #acabadoImagen' + k).empty();
                    }
                }

                $('#botonApoyoNuevo').empty();
                $('#botonApoyoNuevo').append(
                    '<button style="float:left;margin-bottom:35px;margin-top:15px;background-color: white;border: 1px solid #d5d5d5;height: 40px; width: 100px;" class="" id="color" data-toggle="modal" data-target="#modalApoyo">Apoyo</button>'
                );
                $('#botonApoyoNuevo').append(
                    '<img id="imagenAcabadoPrincipal1" src"../../../content/images/blanco.jpg" height="60px" border="0" width="200px" style="margin-left:20px;"/>'
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
                            $('#datos1').append('<p style="width:100%"><strong>MEDIDAS</strong></p>');
                            $('#datos1').append(
                                '<p class="' +
                                    idDimenTipo +
                                    '" id="ancho1" style="width:95%">Ancho: <span style="" id="valorAnchoESPECIAL"></span></p>'
                            );
                            $('#datos1').append(
                                '<p id="alto1" class="' +
                                    precioAum +
                                    '" style="width:95%">Alto: <span style="" id="valorAltoESPECIAL"></span></p>'
                            );

                            $('#datos1').append(
                                '<p id="fondo1" style="width:95%;">Fondo Especial: <span style="" id="valorFondoESPECIAL"></span></p>'
                            );
                            $('#datos1').append(
                                '<p style="width:95%;font-style: italic;">Incremento 30%<span style="float:right">+ <span id="precioAum" ></span> &euro;</span></p>'
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
                            $('#valorAnchoESPECIAL').text(dimensiones[k]['ancho']);
                            $('#idioma').attr('value', dimensiones[k]['id']);
                            $('#valorAltoESPECIAL').text(dimensiones[k]['alto']);
                            $('#inputAltoAncho').val(dimensiones[k]['alto']);
                            $('#valorFondoESPECIAL').text(valor);
                            $('#precioAum').text(precioAumGuardado);
                            this.precioDimension = precioAum.toFixed(2);
                        }
                    }
                }
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
                                    '" src="../../../content/images/blanco.jpg" height="60px" border="0" width="100px" style=" opacity: 0.7;margin-left:20px;"/><span id="nombreAcaCalcu' +
                                    u +
                                    '" style="margin-left:10px"></span></p>'
                            );
                            $('#aca1' + u).append(
                                '<img id="imagenAcabadoPrincipal1" src"../../../content/images/blanco.jpg" height="60px" border="0" width="200px" style=" opacity: 0.7;margin-left:20px;"/>'
                            );
                            u++;
                            i = 0;
                            contnuevo++;
                        }
                    });
                    $('#datos1').append(
                        '<p style="width:95%"><strong>APOYO </strong><span style="float:right">&euro;</span><span id="precioApoyo" style="float:right"></span></p>'
                    );
                    $('#datos1').append(
                        '<p style="width:100%"><input id="apoyoCalculadoraTexto" data-toggle="modal" data-target="#modalApoyo" height="30px" border="0" width="200px" style="margin-left:20px;text-align:center" readonly="readonly"/></p>'
                    );
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
                                '" height="160px" width="280px" style=" ">'
                        );
                        $('#modalApoyo #apoyoModal' + w).append('<strong><p>' + data.body[w]['nombre'] + '</strong></p>');
                    }
                });
                for (let i = 1; i <= 14; i++) {
                    for (let k = 0; k < 14; k++) {
                        $('#myModalColores' + i + ' #acabadoImagen' + k).empty();
                    }
                }

                $('#botonApoyoNuevo').empty();
                $('#botonApoyoNuevo').append(
                    '<button style="float:left;margin-bottom:35px;margin-top:15px;background-color: white;border: 1px solid #d5d5d5;height: 40px; width: 100px;" class="" id="color" data-toggle="modal" data-target="#modalApoyo">Apoyo</button>'
                );
                $('#botonApoyoNuevo').append(
                    '<img id="imagenAcabadoPrincipal1" src"../../../content/images/blanco.jpg" height="60px" border="0" width="200px" style="margin-left:20px;"/>'
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
                            $('#datos1').append('<p style="width:100%"><strong>MEDIDAS</strong></p>');
                            $('#datos1').append(
                                '<p class="' +
                                    idDimenTipo +
                                    '" id="ancho1" style="width:95%">Ancho: <span style="" id="valorAnchoESPECIAL"></span></p>'
                            );
                            $('#datos1').append(
                                '<p id="alto1" class="' +
                                    precioAum +
                                    '" style="width:95%">Alto Especial: <span style="" id="valorAltoESPECIAL"></span></p>'
                            );
                            $('#datos1').append(
                                '<p style="width:95%;font-style: italic;">Incremento 30%<span style="float:right">+ <span id="precioAum" ></span> &euro;</span></p>'
                            );
                            $('#datos1').append(
                                '<p id="fondo1" style="width:95%;">Fondo: <span style="" id="valorFondoESPECIAL"></span></p>'
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
                            $('#valorAnchoESPECIAL').text(dimensiones[k]['ancho']);
                            $('#idioma').attr('value', dimensiones[k]['id']);
                            $('#valorAltoESPECIAL').text(valor);
                            $('#valorFondoESPECIAL').text(dimensiones[k]['fondo']);
                            $('#inputfondoAlto').val(dimensiones[k]['fondo']);
                            $('#precioAum').text(precioAumGuardado);
                            this.precioDimension = precioAum.toFixed(2);
                        }
                    }
                }
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
                                    '" src="../../../content/images/blanco.jpg" height="60px" border="0" width="100px" style=" opacity: 0.7;margin-left:20px;"/><span id="nombreAcaCalcu' +
                                    u +
                                    '" style="margin-left:10px"></span></p>'
                            );
                            $('#aca1' + u).append(
                                '<img id="imagenAcabadoPrincipal1" src"../../../content/images/blanco.jpg" height="60px" border="0" width="200px" style=" opacity: 0.7;margin-left:20px;"/>'
                            );
                            u++;
                            i = 0;
                            contnuevo++;
                        }
                    });
                    $('#datos1').append(
                        '<p style="width:95%"><strong>APOYO </strong><span style="float:right">&euro;</span><span id="precioApoyo" style="float:right"></span></p>'
                    );
                    $('#datos1').append(
                        '<p style="width:100%"><input id="apoyoCalculadoraTexto" data-toggle="modal" data-target="#modalApoyo" height="30px" border="0" width="200px" style="margin-left:20px;text-align:center" readonly="readonly"/></p>'
                    );
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
                                '" height="160px" width="280px" style=" ">'
                        );
                        $('#modalApoyo #apoyoModal' + w).append('<strong><p>' + data.body[w]['nombre'] + '</strong></p>');
                    }
                });
                for (let i = 1; i <= 14; i++) {
                    for (let k = 0; k < 14; k++) {
                        $('#myModalColores' + i + ' #acabadoImagen' + k).empty();
                    }
                }

                $('#botonApoyoNuevo').empty();
                $('#botonApoyoNuevo').append(
                    '<button style="float:left;margin-bottom:35px;margin-top:15px;background-color: white;border: 1px solid #d5d5d5;height: 40px; width: 100px;" class="" id="color" data-toggle="modal" data-target="#modalApoyo">Apoyo</button>'
                );
                $('#botonApoyoNuevo').append(
                    '<img id="imagenAcabadoPrincipal1" src"../../../content/images/blanco.jpg" height="60px" border="0" width="200px" style="margin-left:20px;"/>'
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
        var idProd = '';
        idProd = $('#nombreMesita').attr('class');
        nombre = res;
        var idAca = $('#myModalColores' + id1 + ' #acabadoImagen' + idImagen + ' #imagenAcabado' + idImagen).attr('class');
        var todosAcabados = this.acabados1234;
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
                        '" height="60px" width="200px" style="margin-left:20px">'
                );
                $('#aca' + id + '' + id1 + ' #acabadoNombrePrincipal').remove();
                $('#aca' + id + '' + id1).append(
                    '<p id="acabadoNombrePrincipal" style="color:black;margin-left: 180px;margin-top: -42px;position:absolute" >' +
                        value['nombre'] +
                        '</p>'
                );
                $('#datos1 #nombreAcaCalcu' + id1).text(value['nombre']);

                var src = 'data:image/gif;base64,' + value['imagenFondo'];
                $('#datos1 #acabado' + id1 + ' #imagenAcabadoPrincipal1').attr('src', src);
                $('#datos1 #acabado' + id1 + ' #imagenAcabadoPrincipal1').attr('class', value['id']);
                /*
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
                        $('.productosColor' + idProd + ' #acabados #imagenAcabadoPrincipal').append(
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
                        $('.productosColor' + idProd + ' #acabados #imagenAcabadoPrincipal').append(
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
                        $('.productosColor' + idProd + ' #acabados #imagenAcabadoPrincipal').append(
                            '<img id="cajon" class="' +
                                nombreAcabado +
                                '" width="650px" height="433px"  src="../../../content/images/mb5/2/mb5_2_' +
                                nombreAcabado +
                                '_optimized.png">'
                        );
                    } else {
                        $('.productosColor' + idProd + ' #acabados #imagenAcabadoPrincipal').append(
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
                        $('.productosColor' + idProd + ' #acabados #imagenAcabadoPrincipal').append(
                            '<img id="tapa' +
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
                        $('.productosColor' + idProd + ' #acabados #imagenAcabadoPrincipal').append(
                            '<img id="tapa' +
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
                */
                $('#val' + id1).remove();
                $('#val' + id1 + 'Dato').remove();
                $('#valor' + id1).remove();
                $('#datos1').append(
                    '<p style="width:100%;display:none"> <span id="val' +
                        id1 +
                        '">Acabado ' +
                        id1 +
                        ' : </span><span style="display:none" id="val' +
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

        if (contadorApoyo == cont - 1) {
            // $('.imagenAcabadoPrincipalImg').attr('style');
            // $('.imagenAcabadoPrincipalImg').css({ opacity: 0 });
        }
        var datos = [];

        for (let j = 1; j <= 5; j++) {
            $('.apoyoCogido' + j).css({ 'background-color': 'white' });
        }
        var apoyoBueno = $('#datos1 #nombreApoyo').text();
        var idProd = $('#nombreMesita').attr('class');
        if (contadorApoyo == cont - 1) {
            $('#divDentroCalcu').css({ height: '76%' });
            if (this.iluminacionService.todos != undefined) {
                var precioIlu = $('#precioIluminacion').attr('class');
                if (precioIlu != ' ' && precioIlu != '' && precioIlu != undefined && precioIlu != null) {
                    $('#textoFinal').removeAttr('style');
                    $('#textoFinal').attr('style');
                    $('#textoFinal').css({ width: '100%' });
                    $('#textoFinal').css({ float: 'left' });
                    $('#botonCalculadora').removeAttr('class');
                }
            } else {
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
                                        '" width="350px"  style="">'
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
                                        '" width="350px"  style=" ">'
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
                                        '" width="350px"  style="">'
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
                                        '" width="350px"  style="">'
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
                                        '" width="350px"  style="">'
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
        if (isNaN(parseFloat(h))) {
            h = $('#productoCalculadora1  #datos1 #ancho1 #valorAnchoESPECIAL').text();
            console.log(h);
            if (h >= 75 && h < 100) {
                h = 100;
            } else {
                if (h >= 100 && h < 125) {
                    h = 125;
                } else {
                    if (h >= 125 && h < 150) {
                        h = 150;
                    } else {
                        if (h >= 150 && h < 175) {
                            h = 175;
                        } else {
                            if (h >= 175 && h < 200) {
                                h = 200;
                            } else {
                                if (h >= 200 && h < 245) {
                                    h = 245;
                                }
                            }
                        }
                    }
                }
            }
        }
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
                                    this.precioDimension1 = totalfloat;
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
                                    this.precioDimension1 = totalfloat;
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
                                    this.precioDimension1 = totalfloat;
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
                                    this.precioDimension1 = totalfloat;
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
                                this.precioDimension1 = totalfloat;
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

                        if (idApoyo == 212) {
                            if (idApoyo == value['productoApoyo']['id']) {
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
                                this.precioDimension1 = totalfloat;
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
                                this.precioDimension1 = totalfloat;
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
            $('#divDentroCalcu').css({ height: '76%' });
            if (this.iluminacionService.todos != undefined) {
                var precioIlu = $('#precioIluminacion').attr('class');
                if (precioIlu != ' ' && precioIlu != '' && precioIlu != undefined && precioIlu != null) {
                    $('#textoFinal').removeAttr('style');
                    $('#textoFinal').attr('style');
                    $('#textoFinal').css({ width: '100%' });
                    $('#textoFinal').css({ float: 'left' });
                    $('#botonCalculadora').removeAttr('class');
                }
            } else {
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
        var acabados1 = this.acabados1;
        var acabados = acabados1;
        var iluminacion = this.iluminacionService.todos;
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
        for (let i = 1; i <= 1; i++) {
            const idProd = $('#nombreProd' + i).attr('class');
            const dimen = $('#productoCalculadora1 #datos1 #ancho' + i).attr('class');
            const idApoyo = $('#productoCalculadora1 #datos1 #apoyo').attr('class');
            const idIluminacion = $('#productoCalculadora1 #datos1 #iluminacion' + i).attr('class');
            const ancho = $('#productoCalculadora1 #datos1 #ancho' + i).text();
            const alto = $('#productoCalculadora1 #datos1 #alto' + i).text();
            const fondo = $('#productoCalculadora1 #datos1 #fondo' + i).text();
            const precio = $('#productoCalculadora1 #datos1 #valorAnchoESPECIAL').attr('class');
            const todoSumadoPrecio = $('#precioDimension').text();
            const todasDimensiones = this.dimensionesProductoTipoService.todos;
            console.log(sessionStorage);
            const prod = [];
            const prods = this.apoyo;
            const apoyoBueno = [];
            const iluBuena = [];
            const iluminacionBuenaSiONo = $('#precioIluminacion').text();
            const sistemasApoyo = this.sistemasApoyo;
            for (let k = 0; k < sistemasApoyo.length; k++) {
                if (sistemasApoyo[k]['id'] == idApoyo) {
                    apoyoBueno[1] = sistemasApoyo[k];
                }
            }

            if (iluminacionBuenaSiONo != ' ') {
                iluBuena[1] = iluminacion;
            }
            const aca = [];
            var acabadoCogido;
            for (let j = 1; j <= 100; j++) {
                acabadoCogido = $('#productoCalculadora1 #datos1 #val' + j + 'Dato').attr('class');
                if (acabadoCogido != undefined) {
                    var id1 = parseFloat(acabadoCogido);
                    for (let k = 0; k < 17; k++) {
                        if (acabados[k]['id'] == id1) {
                            aca[j] = acabados[k];
                        }
                    }
                }
            }

            var array12 = [];
            prod[1] = {};
            for (let w = 1; w < aca.length; w++) {
                prod[1]['acabado' + w] = aca[w];
                prod[1]['acabado' + w]['imagenFondo'] = '';
            }
            prod[1]['apoyo'] = apoyoBueno[1];
            prod[1]['productosDormitorio'] = apoyoBueno[1]['productoApoyo'];
            prod[1]['apoyo']['imagen'] = '';
            prod[1]['id'] = 0;
            prod[1]['todoSumadoPrecio'] = todoSumadoPrecio;
            prod[1]['nombre'] = 'apoyo';
            console.log(prod);
            sessionStorage.setItem('prod' + contadorDimen, JSON.stringify(prod));
            contadorDimen++;
        }

        for (let i = 1; i <= 100; i++) {
            var sesion = JSON.parse(sessionStorage.getItem('prod' + i));
            if (sesion != null) {
                this.productosDormitorioService.numeroCesta = i;
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

    loadAll() {
        var productos = [];
        var apoyos = [];

        var precioPunto = this.precioPunto[0];
        var precio = this.precioTiendaProductosService.todos;
        console.log(precio);
        var todos = this.productosDormitorioService.todos;
        var iva = this.iva;
        if (todos != undefined) {
            var prod = todos;
            for (let q = 0; q < prod.length; q++) {
                prod[q]['precio'] = 0;
            }
            this.dimensionesProductoTipoService.findPrecio().subscribe(data => {
                console.log(data.body);
                var datos = data.body;
                var tiene = 0;
                var prod = this.productosDormitorioService.todos;
                for (let q = 0; q < prod.length; q++) {
                    prod[q]['precio'] = 0;
                    tiene = 0;
                    for (let n = 0; n < datos['length']; n++) {
                        if (datos[n][0] == prod[q]['id'] && datos[n][1] != 0) {
                            tiene++;
                        }
                    }
                    prod[q]['numeroDimen'] = tiene;
                }
                for (let n = 0; n < datos['length']; n++) {
                    var cont = 0;
                    for (let q = 0; q < prod.length; q++) {
                        if (prod[q]['id'] == datos[n][0]) {
                            if (prod[q]['precio'] == 0) {
                                if (datos[n][1] != 0) {
                                    prod[q]['precio'] = datos[n][1];
                                    if (precio[q][2] == prod[q]['id']) {
                                        var cuenta = precio[q][1] / 100;
                                        var cuenta = cuenta + 1;
                                        var precio1 = prod[q]['precio'];
                                        precio1 = precio1 * precioPunto;
                                        precio1 = precio1 * cuenta;
                                        if (iva == 1) {
                                            var todasCuenta = precio1 * 1.21;
                                        } else {
                                            var todasCuenta = 0;
                                            todasCuenta = precio1;
                                        }
                                        prod[q]['precio'] = todasCuenta.toFixed(2);
                                    }
                                }
                            }
                        }
                    }
                }

                this.productosDormitorioService.todos = prod;
            });
            this.productosDormitorios = todos;
        } else {
            this.productosDormitorioService.categoria(2).subscribe(data => {
                this.productosDormitorioService.todos = data.body;
                this.dimensionesProductoTipoService.findPrecio().subscribe(data => {
                    console.log(data.body);
                    var datos = data.body;
                    var tiene = 0;
                    var prod = this.productosDormitorioService.todos;
                    for (let q = 0; q < prod.length; q++) {
                        tiene = 0;
                        prod[q]['precio'] = 0;
                        for (let n = 0; n < datos['length']; n++) {
                            if (datos[n][0] == prod[q]['id'] && datos[n][1] != 0) {
                                tiene++;
                            }
                        }
                        prod[q]['numeroDimen'] = tiene;
                    }
                    var cont1 = 0;
                    for (let n = 0; n < datos['length']; n++) {
                        var cont = 0;
                        for (let q = 0; q < prod.length; q++) {
                            if (prod[q]['id'] == datos[n][0]) {
                                if (prod[q]['precio'] == 0) {
                                    if (datos[n][1] != 0) {
                                        prod[q]['precio'] = datos[n][1];
                                        if (precio[q][2] == prod[q]['id']) {
                                            var cuenta = precio[q][1] / 100;
                                            var cuenta = cuenta + 1;
                                            var precio1 = prod[q]['precio'];
                                            precio1 = precio1 * precioPunto;
                                            precio1 = precio1 * cuenta;
                                            if (iva == 1) {
                                                var todasCuenta = precio1 * 1.21;
                                            } else {
                                                var todasCuenta = 0;
                                                todasCuenta = precio1;
                                            }
                                            prod[q]['precio'] = todasCuenta.toFixed(2);
                                        }
                                    }
                                }
                            }
                        }
                    }

                    this.productosDormitorioService.todos = prod;
                });
            });
            this.productosDormitorios = this.productosDormitorioService.todos;
        }
    }
    public apoyoBancada(id) {
        $('.productosColorBan42 #dimensionesApoyo').css({ display: 'none' });
        $('.productosColorBan47 #dimensionesApoyo').css({ display: 'none' });
        $('.productosColorZo #dimensionesApoyo').css({ display: 'none' });

        $('.productosColorBan42').css({ 'background-color': 'white' });
        $('.productosColorBan47').css({ 'background-color': 'white' });
        $('.productosColorZo').css({ 'background-color': 'white' });

        $('.productosColorBan42').css({ border: '1px solid #dfdddc' });
        $('.productosColorBan47').css({ border: '1px solid #dfdddc' });
        $('.productosColorZo').css({ border: '1px solid #dfdddc' });

        $('.productosColorBan42').css({ 'margin-bottom': '0px' });
        $('.productosColorBan47').css({ 'margin-bottom': '0px' });
        $('.productosColorZo').css({ 'margin-bottom': '0px' });

        $('.productosColorBan' + id + ' #dimensionesApoyo').css({ display: 'block' });
        $('.productosColorBan' + id).css({ border: '0px' });
        $('.productosColorBan' + id).css({ 'margin-bottom': '700px' });
        $('.productosColorBan' + id).css({ 'background-color': '#dfdddc' });
        $('.productosColorBan' + id + ' #dimensionesApoyo').css({ width: '63%' });
        $('.productosColorBan' + id + ' #dimensionesApoyo').css({ 'margin-top': '2%' });
        $('.productosColorBan' + id + ' #dimensionesApoyo').css({ border: '1px solid #7AC8FE' });
        $('#nombreMesita').text('Bancada');
        var cont = 0;
        var array = [];
        if (id == 42) {
            this.tiposApoyoService.query({ size: 1000000 }).subscribe(data => {
                for (let i = 0; i < data.body.length; i++) {
                    if (data.body[i]['productoApoyo']['id'] == 18) {
                        if (data.body[i]['fondo'] == 38.5) {
                            array[cont] = data.body[i];
                            cont++;
                        }
                    }
                }
                this.bancada42 = array;
            });
        }
        if (id == 47) {
            this.tiposApoyoService.query({ size: 1000000 }).subscribe(data => {
                for (let i = 0; i < data.body.length; i++) {
                    if (data.body[i]['productoApoyo']['id'] == 18) {
                        if (data.body[i]['fondo'] == 43.5) {
                            array[cont] = data.body[i];
                            cont++;
                        }
                    }
                }
                this.bancada47 = array;
            });
        }
    }

    public apoyoZocalo() {
        $('.productosColorBan42 #dimensionesApoyo').css({ display: 'none' });
        $('.productosColorBan47 #dimensionesApoyo').css({ display: 'none' });

        $('.productosColorBan42').css({ 'background-color': 'white' });
        $('.productosColorBan47').css({ 'background-color': 'white' });

        $('.productosColorBan42').css({ border: '1px solid #dfdddc' });
        $('.productosColorBan47').css({ border: '1px solid #dfdddc' });
        $('.productosColorZo').css({ border: '1px solid #dfdddc' });

        $('.productosColorZo #dimensionesApoyo').css({ display: 'block' });
        $('.productosColorZo').css({ border: '0px' });
        $('.productosColorZo').css({ 'margin-bottom': '1095px' });
        $('.productosColorZo').css({ 'background-color': '#dfdddc' });
        $('.productosColorZo #dimensionesApoyo').css({ width: '63%' });
        $('.productosColorZo #dimensionesApoyo').css({ 'margin-top': '2%' });
        $('.productosColorZo #dimensionesApoyo').css({ border: '1px solid #7AC8FE' });
        var cont = 0;
        var array = [];
        $('#nombreMesita').text('Zocalo');

        this.tiposApoyoService.query({ size: 1000000 }).subscribe(data => {
            for (let i = 0; i < data.body.length; i++) {
                if (data.body[i]['productoApoyo']['id'] == 17) {
                    array[cont] = data.body[i];
                    cont++;
                }
            }
            this.zocalo = array;
        });
    }

    public apoyoRegulables(id) {
        $('.productosColorBan42 #dimensionesApoyo').css({ display: 'none' });
        $('.productosColorBan47 #dimensionesApoyo').css({ display: 'none' });
        $('.productosColorZo #dimensionesApoyo').css({ display: 'none' });

        $('.productosColorBan42').css({ 'background-color': 'white' });
        $('.productosColorBan47').css({ 'background-color': 'white' });
        $('.productosColorZo').css({ 'background-color': 'white' });

        $('.productosColorBan42').css({ border: '1px solid #dfdddc' });
        $('.productosColorBan47').css({ border: '1px solid #dfdddc' });
        $('.productosColorZo').css({ border: '1px solid #dfdddc' });
        $('.productosColorReg140').css({ 'background-color': 'white' });
        $('.productosColorReg140').css({ border: '#1px solid #dfdddc' });
        $('.productosColorReg150').css({ 'background-color': 'white' });
        $('.productosColorReg150').css({ border: '#1px solid #dfdddc' });

        $('.productosColorReg' + id).css({ 'background-color': '#dfdddc' });
        $('#nombreMesita').text('Patas Regulables');

        this.tiposApoyoService.query({ size: 1000000 }).subscribe(data => {
            for (let i = 0; i < data.body.length; i++) {
                if (data.body[i]['productoApoyo']['id'] == 15) {
                    if (id == 140) {
                        if (data.body[i]['ancho'] == 149) {
                            $('#datos1').append(
                                '<p style="display:none" id="apoyo" class="' +
                                    data.body[i]['id'] +
                                    '">Ancho: ' +
                                    data.body[i]['ancho'] +
                                    '</p>'
                            );
                            $('#precioDimension').text(data.body[i]['precio']);
                            $('#euroCalculadora').removeAttr('style');
                        }
                    } else {
                        if (data.body[i]['ancho'] == 151) {
                            $('#datos1').append(
                                '<p style="display:none" id="apoyo" class="' +
                                    data.body[i]['id'] +
                                    '">Ancho: ' +
                                    data.body[i]['ancho'] +
                                    '</p>'
                            );
                            $('#precioDimension').text(data.body[i]['precio']);
                            $('#euroCalculadora').removeAttr('style');
                        }
                    }
                }
            }
            $('#botonCalculadora').removeAttr('class');
        });
    }

    public apoyoMetalicas(id, id1) {
        $('.productosColorBan42 #dimensionesApoyo').css({ display: 'none' });
        $('.productosColorBan47 #dimensionesApoyo').css({ display: 'none' });
        $('.productosColorZo #dimensionesApoyo').css({ display: 'none' });

        $('.productosColorBan42').css({ 'background-color': 'white' });
        $('.productosColorBan47').css({ 'background-color': 'white' });
        $('.productosColorZo').css({ 'background-color': 'white' });

        $('.productosColorBan42').css({ border: '1px solid #dfdddc' });
        $('.productosColorBan47').css({ border: '1px solid #dfdddc' });
        $('.productosColorZo').css({ border: '1px solid #dfdddc' });
        $('.productosColorMet42170').css({ 'background-color': 'white' });
        $('.productosColorMet47170').css({ 'background-color': 'white' });
        $('.productosColorMet42175').css({ 'background-color': 'white' });
        $('.productosColorMet47175').css({ 'background-color': 'white' });

        $('.productosColorMet' + id + '' + id1).css({ 'background-color': '#dfdddc' });
        $('#nombreMesita').text('Patas Metalicas');
        this.tiposApoyoService.query({ size: 1000000 }).subscribe(data => {
            for (let i = 0; i < data.body.length; i++) {
                if (data.body[i]['productoApoyo']['id'] == 16) {
                    if (id == 42) {
                        if (id1 == 170) {
                            if (data.body[i]['ancho'] == 174 && data.body[i]['fondo'] == 37.5) {
                                $('#datos1').append(
                                    '<p style="display:none" id="apoyo" class="' +
                                        data.body[i]['id'] +
                                        '">Ancho: ' +
                                        data.body[i]['ancho'] +
                                        '</p>'
                                );
                                $('#precioDimension').text(data.body[i]['precio']);
                                $('#euroCalculadora').removeAttr('style');
                            }
                        } else {
                            if (data.body[i]['ancho'] == 174 && data.body[i]['fondo'] == 42.5) {
                                $('#datos1').append(
                                    '<p style="display:none" id="apoyo" class="' +
                                        data.body[i]['id'] +
                                        '">Ancho: ' +
                                        data.body[i]['ancho'] +
                                        '</p>'
                                );
                                $('#precioDimension').text(data.body[i]['precio']);
                                $('#euroCalculadora').removeAttr('style');
                            }
                        }
                    } else {
                        if (id1 == 170) {
                            if (data.body[i]['ancho'] == 176 && data.body[i]['fondo'] == 37.5) {
                                $('#datos1').append(
                                    '<p style="display:none" id="apoyo" class="' +
                                        data.body[i]['id'] +
                                        '">Ancho: ' +
                                        data.body[i]['ancho'] +
                                        '</p>'
                                );
                                $('#precioDimension').text(data.body[i]['precio']);
                                $('#euroCalculadora').removeAttr('style');
                            }
                        } else {
                            if (data.body[i]['ancho'] == 176 && data.body[i]['fondo'] == 42.5) {
                                $('#datos1').append(
                                    '<p style="display:none" id="apoyo" class="' +
                                        data.body[i]['id'] +
                                        '">Ancho: ' +
                                        data.body[i]['ancho'] +
                                        '</p>'
                                );
                                $('#precioDimension').text(data.body[i]['precio']);
                                $('#euroCalculadora').removeAttr('style');
                            }
                        }
                    }
                }
            }
            $('#botonCalculadora').removeAttr('class');
        });
    }

    public cogerDimen(id, fondo) {
        $('#seleccionar' + id).css({ 'background-color': '#dfdddc' });
        this.tiposApoyoService.query({ size: 1000000 }).subscribe(data => {
            for (let i = 0; i < data.body.length; i++) {
                if (data.body[i]['id'] == id) {
                    $('#datos1').css({ display: 'block' });
                    $('#precioDimension').text(data.body[i]['precio']);
                    $('#euroCalculadora').removeAttr('style');
                    $('#datos1').append('<p id="apoyo" class="' + data.body[i]['id'] + '">Ancho: ' + data.body[i]['ancho'] + '</p>');
                    $('#datos1').append('<p>Alto: ' + data.body[i]['altura'] + '</p>');
                    $('#datos1').append('<p>Fondo: ' + data.body[i]['fondo'] + '</p>');
                }
            }

            var contador = 1;
            var contnuevo = 1;
            var u = 1;
            var i = 0;
            var imagen;
            this.acaProdService.findAca(18).subscribe(data => {
                this.acaProdService.todos = data.body;
                $.each(this.acaProdService.todos, function(index, value) {
                    if (value['productosDormitorio']['id'] == 18) {
                        imagen = value['imagen'];
                        if (contador == 1) {
                            $('.productosColorBan' + fondo + ' #acabados #imagenAcabadoPrincipal').append(
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
                                    '" height="250px" width="130px" style="">'
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
                        $('#aca1' + u).append(
                            '<img id="imagenAcabadoPrincipal1" src"../../../content/images/blanco.jpg" height="60px" border="0" width="200px" style=" opacity: 0.7;margin-left:20px;"/>'
                        );
                        u++;
                        i = 0;
                        contnuevo++;
                    }
                });
            });
        });

        $('#bancada' + fondo + ' #acabados').css({ display: 'block' });
        $('#bancada' + fondo + ' #acabados').css({ height: '600px' });
        $('#bancada' + fondo + ' #acabados').css({ border: '1px solid #7AC8FE' });
        $('#bancada' + fondo + ' #acabados').css({ width: '63%' });
        $('#bancada' + fondo + ' #acabados').css({ left: '0px' });
        $('#bancada' + fondo + ' #acabados').css({ 'margin-left': '29%' });
        $('#bancada' + fondo + ' #acabados').css({ 'margin-top': '720px' });
        $('.productosColorBan' + fondo).css({ 'margin-bottom': '1360px' });
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
        this.arrayMostrar = [];
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
        this.precioTiendaProductosService.findProdId(2, tienda.id).subscribe(data => {
            this.precioTiendaProductosService.todos = data.body;
            this.loadAll();
        });

        this.precioTiendaProductosService.findProdId(2, tienda.id).subscribe(data => {
            this.precioTiendaProductosService.apoyo = data.body;
            this.loadAll();
        });
        this.ivaProductoTiendaService.bus(tienda['id']).subscribe(data => {
            if (data.body[0] != null) {
                if (data.body[0]['iva'] == 1) {
                    this.iva = 1;
                } else {
                    this.iva = 0;
                }
            } else {
                this.iva = 0;
            }
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
        this.acabados1 = acabados;
        this.acabados1234 = acabados;
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

        this.eventSubscriber = Subscription;
    }
}

import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { Observable } from 'rxjs';

import { IPresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';
import { AccountService } from 'app/core';
import { IProductosPresupuestoPedidos } from 'app/shared/model/productos-presupuesto-pedidos.model';
import { AcabadosProductosPresupuestoPedidoService } from '../acabados-productos-presupuesto-pedido/acabados-productos-presupuesto-pedido.service';
import { IluminacionProdPrePedService } from '../iluminacion-prod-pre-ped/iluminacion-prod-pre-ped.service';
import { PagosTiendaService } from '../pagos-tienda/pagos-tienda.service';
import { ITEMS_PER_PAGE } from 'app/shared';
import { PresupuestoPedidoService } from './presupuesto-pedido.service';
import { ProductosPresupuestoPedidosService } from '../productos-presupuesto-pedidos/productos-presupuesto-pedidos.service';
import { MedEspProductoPedidoPresuService } from '../med-esp-producto-pedido-presu/med-esp-producto-pedido-presu.service';
import { IPagosTienda } from 'app/shared/model/pagos-tienda.model';
import { ProvinciasService } from '../provincias/provincias.service';
import { MunicipiosService } from '../municipios/municipios.service';
import { IContactoFabrica } from 'app/shared/model/contacto-fabrica.model';
import { IMunicipios } from 'app/shared/model/municipios.model';
import { DatosClienteService } from '../datos-cliente/datos-cliente.service';
import { IDatosCliente } from 'app/shared/model/datos-cliente.model';
import { ContactoFabricaService } from '../contacto-fabrica/contacto-fabrica.service';
import { IAcabadosProductosPresupuestoPedido } from 'app/shared/model/acabados-productos-presupuesto-pedido.model';
import { PresupuestoArmarioService } from '../presupuesto-armario/presupuesto-armario.service';
import { PresupuestoArmarioInterioresService } from '../presupuesto-armario-interiores/presupuesto-armario-interiores.service';
import { PresupuestoArmarioPuertasService } from '../presupuesto-armario-puertas/presupuesto-armario-puertas.service';
import { PrecioTiendaProductosService } from '../precio-tienda-productos/precio-tienda-productos.service';
import { PrecioTiendaService } from '../precio-tienda/precio-tienda.service';
import { DireccionTiendasService } from '../direccion-tiendas/direccion-tiendas.service';
import { PrecioFinalPresuService } from '../precio-final-presu/precio-final-presu.service';
import { DimensionesProductoTipoService } from '../dimensiones-producto-tipo/dimensiones-producto-tipo.service';
import { DatosUsuarioService } from '../datos-usuario/datos-usuario.service';
@Component({
    selector: 'jhi-presupuesto-productos',
    templateUrl: './presupuesto-productos.component.html'
})
export class PresupuestoProductosComponent implements OnInit, OnDestroy, AfterViewInit {
    currentAccount: any;
    error: any;
    isSaving: boolean;
    success: any;
    presupuestoPedidos: IPresupuestoPedido[];
    eventSubscriber: Subscription;
    productos: any;
    provincias: any;
    municipios: any;
    acabados: any;
    iluminacion: any;
    routeData: any;
    presupuestos = [];
    precioTienda: any;
    links: any;
    totalItems: any;
    queryCount: any;
    account: any;
    itemsPerPage: any;
    idPresu: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    interioresArmario: any;
    armario: any;
    idArmario: any;
    modulosBajos: any;
    precioPunto: any;
    aparadores: any;
    apoyoPrecios: any;
    productosPresupuestoPedidos: any;
    tiendaNombre: any;
    numero: any;
    tiendaCargadaPresu: any;
    singulares: any;
    vitrinas: any;
    constructor(
        protected productosPresupuestoPedidosService: ProductosPresupuestoPedidosService,
        public presupuestoArmarioPuertasService: PresupuestoArmarioPuertasService,
        public presupuestoArmarioInterioresService: PresupuestoArmarioInterioresService,
        public presupuestoPedidoService: PresupuestoPedidoService,
        protected dimensionesProductoTipoService: DimensionesProductoTipoService,
        protected contactoFabricaService: ContactoFabricaService,
        protected precioFinalPresuService: PrecioFinalPresuService,
        protected iluminacionProdPrePedService: IluminacionProdPrePedService,
        protected parseLinks: JhiParseLinks,
        protected precioTiendaService: PrecioTiendaService,
        protected direccionTiendasService: DireccionTiendasService,
        protected precioTiendaProductosService: PrecioTiendaProductosService,
        protected jhiAlertService: JhiAlertService,
        protected provinciasService: ProvinciasService,
        protected municipiosService: MunicipiosService,
        protected datosClienteService: DatosClienteService,
        public datosUsuarioService: DatosUsuarioService,
        protected pagosTiendaService: PagosTiendaService,
        protected presupuestoArmarioService: PresupuestoArmarioService,
        protected acabadosProductosPresupuestoPedidoService: AcabadosProductosPresupuestoPedidoService,
        protected accountService: AccountService,
        protected medEspProductoPedidoPresuService: MedEspProductoPedidoPresuService,
        protected activatedRoute: ActivatedRoute,
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

    public imprimir() {
        var divToPrint = document.getElementById('imprimir');
        var ventana = window.open('');
        ventana.document.write(
            '<html><head><style type="text/css">#tapa {max-width:250px;max-height:183px} #datosMeter0 {width:50% !important;font-size:12px} #pNombreProd{font-size:18px !important;} #datosMeter1 {width:50% !important;font-size:12px} #datosMeter2 {width:50% !important;font-size:12px} #datosMeter3 {width:50% !important;font-size:12px} .primerDivPresu{margin-top:0px !important; margin-bottom:0px !important;} #imagen0{ width:20% !important; height:183px !important;} #imagen1{ width:20% !important; height:183px !important;} #imagen2{ width:20% !important; height:183px !important;} #imagen3{ width:20% !important; height:183px !important;} #hrUltimo{ display: none} #logoPresu{max-width: 60px !important;position: absolute !important;margin-top: 100px !important;margin-left: 110px !important;} #idLineaDiv{float:right !important; width:45% !important; margin-right:50px !important; } #bajarFontSize{font-size:15px !important;} #totalDescuentoTexto{font-size:15px !important;} #euro{font-size:15px !important;} #bajarFontSize{font-size:15px !important;} #ivaPrecioQuitar{font-size:15px !important;} #bajarFontSize{font-size:15px !important;} #precioIvaSumado{font-size:15px !important;} #rightImprimir{float:right !important; margin-right:-100px !important; right:0; text-align:right; width:80% !important;} .pietrasin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(125%);} .norwaysin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(140%);} .broncesin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;} .transparentesin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;} .nocesin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(140%);} .naturesin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(150%);} .tabaksin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(150%);} .kobesin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(150%);} .blancosin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(140%);} .beigesin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(140%);} .lattesin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(190%);} .grafenosin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(150%);} .lagosin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(130%);} .maresin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(130%);} .marmolblancosin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(190%);} .marmolnegrosin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(190%);} .norway {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(140%);} .bronce {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;} .transparente {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;} .noce {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(140%);} .nature {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(150%);} .tabak {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(150%);} .kobe {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(150%);} .blanco {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(140%);} .beige {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(140%);} .latte {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(190%);} .grafeno {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(150%);} .lago {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(130%);} .mare {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(130%);} .marmolblanco {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(190%);} .marmolnegro {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(190%);}</style><title>' +
                document.title +
                '</title>'
        );
        ventana.document.write('</head><body style="font-family: Lato , sans-serif;font-weight: 400;">');
        ventana.document.write(divToPrint.innerHTML);
        ventana.document.write('</body></html>');

        ventana.document.close();
        ventana.focus();
        ventana.print();
        return true;
    }

    public eliminar() {
        var id = parseFloat(sessionStorage.getItem('presupuesto'));
        this.presupuestoPedidoService.delete(id).subscribe();
        var actualizar;
        var todosPresupuestos = this.presupuestos;
        for (let i = 0; i < todosPresupuestos.length; i++) {
            if (todosPresupuestos[i]['presupuestoPedido'] != null) {
                if (todosPresupuestos[i]['presupuestoPedido']['id'] == sessionStorage.getItem('presupuesto')) {
                    actualizar = todosPresupuestos[i];
                    this.productosPresupuestoPedidosService.delete(actualizar['id']).subscribe();
                }
            }
        }
    }
    public mostrarPrecioFabrica() {
        var productos = this.productos;
        for (let i = 0; i < productos.length; i++) {
            $('.' + productos[i]['id'] + 'Datos #precioGanancias' + i).removeAttr('style');
            $('.' + productos[i]['id'] + 'Datos #precioGanancias' + i).attr('style');
            $('.' + productos[i]['id'] + 'Datos #precioGanancias' + i).css({ float: 'right' });
            $('.' + productos[i]['id'] + 'Datos #precioGanancias' + i).css({ 'margin-right': '10%' });
            $('.' + productos[i]['id'] + 'Datos #precioFabrica' + i).removeAttr('style');
            $('.' + productos[i]['id'] + 'Datos #precioFabrica' + i).attr('style');
            $('.' + productos[i]['id'] + 'Datos #precioFabrica' + i).css({ float: 'right' });
            $('.' + productos[i]['id'] + 'Datos #precioFabrica' + i).css({ 'margin-right': '20%' });
        }
    }
    public cargarDireccion() {
        var tienda = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
        this.direccionTiendasService.query1(tienda.id).subscribe(data => {
            console.log(data.body);
            var datos = data.body;
            this.direccionTiendasService.todos = data.body;
            $('#direccion').append('<option></option>');
            for (let u = 0; u < data.body.length; u++) {
                $('#direccion').append(
                    '<option id="idDirec' +
                        data.body[u]['id'] +
                        '" value="' +
                        data.body[u]['id'] +
                        '">' +
                        data.body[u]['direccion'] +
                        '</option>'
                );
            }
        });
    }
    public pedido() {
        var actualizar;
        var todasDirecciones = this.direccionTiendasService.todos;
        var todosPresupuestos = this.productosPresupuestoPedidosService.todos;
        var actualizar = todosPresupuestos[0];
        var d = new Date();
        var totalSinIva = $('#totalDescuentoTexto').text();
        var descuento;
        descuento = $('#descuentoPago').val();
        var meterQuitadoDescuento = $('#meterQuitadoDescuento').text();
        var ivaPrecioQuitar = $('#ivaPrecioQuitar').text();
        var precioIvaSumado = $('#precioIvaSumado').text();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var cogerPrecioProds = '';
        for (let i = 0; i < todosPresupuestos.length; i++) {
            var precioProd = $('#precioTotal' + i).text();
            var precioApo = $('#precioApoyo' + i).text();

            cogerPrecioProds = cogerPrecioProds + '' + i + ':' + precioProd + '-' + precioApo + ',';
        }
        console.log(cogerPrecioProds);
        var output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
        var idDireccion = $('#direccion').val();
        for (let m = 0; m < todasDirecciones.length; m++) {
            if (todasDirecciones[m]['id'] == idDireccion) {
                var direccion = todasDirecciones[m];
            }
        }
        actualizar['presupuestoPedido']['pedido'] = 1;
        actualizar['presupuestoPedido']['fecha_pedido'] = output;
        var presupuestoActualizado = actualizar['presupuestoPedido'];
        var precioPresu = {
            presupuestoPedido: presupuestoActualizado,
            precioProds: cogerPrecioProds,
            totalSinIva: parseFloat(totalSinIva),
            iva: parseFloat(ivaPrecioQuitar),
            totalConIva: parseFloat(precioIvaSumado),
            descuentoPorcentaje: descuento,
            precioDescuento: parseFloat(meterQuitadoDescuento),
            direccionTiendas: direccion
        };
        this.subscribeToSaveResponse(this.presupuestoPedidoService.update(presupuestoActualizado));
        this.subscribeToSaveResponse(this.precioFinalPresuService.create(precioPresu));
    }
    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPresupuestoPedido>>) {
        result.subscribe((res: HttpResponse<IPresupuestoPedido>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }
    protected subscribeToSaveResponse1(result: Observable<HttpResponse<IProductosPresupuestoPedidos>>) {
        result.subscribe(
            (res: HttpResponse<IProductosPresupuestoPedidos>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    ngAfterViewInit() {}
    protected onSaveSuccess() {
        this.isSaving = false;
        this.router.navigate(['/pedidos-producto']);
    }

    public soloMedBuen() {
        var medidasEspeciales;
        this.medEspProductoPedidoPresuService
            .query({
                size: 10000000
            })
            .subscribe(data => {
                medidasEspeciales = data['body'];
                this.medEspProductoPedidoPresuService.todo = medidasEspeciales;
                this.loadAll();
            });
    }
    previousState() {
        window.history.back();
    }
    protected onSaveError() {
        this.isSaving = false;
    }
    protected subscribeToSaveResponse3(result: Observable<HttpResponse<IDatosCliente>>) {
        result.subscribe((res: HttpResponse<IDatosCliente>) => this.onSaveSuccess3(), (res: HttpErrorResponse) => this.onSaveError());
    }
    protected onSaveSuccess3() {
        this.isSaving = false;
    }

    loadAll() {
        var medidasEspeciales;
        this.medEspProductoPedidoPresuService
            .query({
                size: 10000000
            })
            .subscribe(data => {
                medidasEspeciales = data['body'];
                this.medEspProductoPedidoPresuService.todo = medidasEspeciales;
            });

        var productosPresupuesto = [];
        var acabados1 = [];
        var precioTienda = this.precioTienda;
        var cont = 0;
        var item = JSON.parse(sessionStorage.getItem('seccionPrecios'));
        var precioMulti = JSON.parse(sessionStorage.getItem(item));
        var presu;
        presu = sessionStorage.getItem('presupuesto');
        var todaTienda = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
        this.tiendaNombre = todaTienda['nombreComercial'];
        this.numero = todaTienda['telefono'];
        var acabados = [];
        var todosInteriores;
        var iluminacion = this.iluminacionProdPrePedService.metidos;
        this.productosPresupuestoPedidosService.query1(parseFloat(presu)).subscribe(
            (res: HttpResponse<IProductosPresupuestoPedidos[]>) => {
                for (let i = 0; i < res.body.length; i++) {
                    if (this.precioPunto != undefined) {
                        var precioPunto = this.precioPunto[0];
                    }
                    if (res.body[i]['presupuestoPedido'] != null) {
                        if (parseFloat(presu) == res.body[i]['presupuestoPedido']['id']) {
                            if (res.body[i]['productosDormitorio']['categoriasDormi']['id'] == 9) {
                                console.log(cont);
                                this.presupuestoArmarioService.findBus(presu).subscribe(data => {
                                    var idCat = 9;
                                    var cat = {
                                        id: idCat
                                    };

                                    var uno = {
                                        nombre: data.body[0]['armario']['mensaje'],
                                        categoriasDormi: cat
                                    };
                                    var codigo = {
                                        codigo: data.body[0]['productosPresupuestoPedidos']['presupuestoPedido']['codigo'],
                                        fecha_presupuesto:
                                            data.body[0]['productosPresupuestoPedidos']['presupuestoPedido']['fecha_presupuesto']
                                    };
                                    var dimen = {
                                        incremento: undefined,
                                        ancho: data.body[0]['ancho'],
                                        alto: data.body[0]['alto'],
                                        fondo: data.body[0]['fondo']
                                    };
                                    var todo = {
                                        productosDormitorio: uno,
                                        presupuestoPedido: codigo,
                                        dimensionesProductoTipo: dimen
                                    };

                                    productosPresupuesto[cont] = todo;
                                    cont++;

                                    this.presupuestoArmarioInterioresService.busqueda(data.body[0]['id']).subscribe(data => {
                                        this.presupuestoArmarioInterioresService.todos = data.body;
                                        var datosInteriores = data.body;
                                        console.log(data.body);
                                        var casco = data.body[0]['presupuestoArmario']['acabadosCasco']['nombre'].toLowerCase();
                                        var trasera = data.body[0]['presupuestoArmario']['acabados']['nombre'].toLowerCase();
                                        var interiorAca = data.body[0]['presupuestoArmario']['acabadosInterior']['nombre'].toLowerCase();
                                        $('#datosMeter' + (cont - 1)).append(
                                            '<p>Acabado Casco: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + casco + '</p>'
                                        );
                                        $('#datosMeter' + (cont - 1)).append(
                                            '<p>Acabado trasera: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + trasera + '</p>'
                                        );
                                        $('#datosMeter' + (cont - 1)).append(
                                            '<p>Acabado Interiores: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + interiorAca + '</p>'
                                        );
                                        var nombre = data.body[0]['presupuestoArmario']['armario']['mensaje'];
                                        var precioTodo1 = 0;
                                        for (let p = 0; p < datosInteriores.length; p++) {
                                            if (p == 0) {
                                                $('#datosMeter' + (cont - 1)).append(
                                                    '<p>Casco  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>+ ' +
                                                        datosInteriores[p]['presupuestoArmario']['cascoPrecio'] +
                                                        ' €</span></p>'
                                                );
                                                $('#precioTotal' + (cont - 1)).text(
                                                    datosInteriores[p]['presupuestoArmario']['precioTotal']
                                                );
                                                var cogerlo = parseFloat($('#precioTotal' + (cont - 1)).text());
                                                var precioTotal = parseFloat($('#totalDescuentoTexto').text());
                                                precioTotal = cogerlo + precioTotal;
                                                $('#totalDescuentoTexto').text(precioTotal.toFixed(2));

                                                var ivaTodo = precioTotal * 0.21;
                                                $('#ivaPrecioQuitar').text(ivaTodo.toFixed(2) + ' €');
                                                $('#precioIvaSumado').text((ivaTodo + precioTotal).toFixed(2) + ' €');
                                            }

                                            precioTodo1 = precioTodo1 + datosInteriores[p]['precio'];
                                            $('#datosMeter' + (cont - 1)).append(
                                                '<p><strong>Interior ' +
                                                    datosInteriores[p]['productosDormitorio']['nombre'] +
                                                    '&nbsp;&nbsp;&nbsp;&nbsp;</strong><span>+ ' +
                                                    datosInteriores[p]['precio'] +
                                                    ' €</span></p>'
                                            );
                                        }

                                        if ('3 PUERTAS IZQUIERDA' == nombre) {
                                            var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).css({ 'margin-left': '0px' });
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 350px;position: absolute;z-index:50" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 350px;position: absolute;z-index:50;margin-top:315px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            var nombreInt = datosInteriores[1]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;margin-left: 74px;margin-top: -24px;position: absolute;z-index:49" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:49;margin-top:291px;margin-left:74px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );
                                        }

                                        if ('4 PUERTAS ASIMETRICAS' == nombre) {
                                            var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).css({ 'margin-left': '0px' });
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 350px;position: absolute;z-index:50" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 350px;position: absolute;z-index:50;margin-top:315px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            var nombreInt = datosInteriores[1]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;margin-left: 74px;margin-top: -24px;position: absolute;z-index:49" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:49;margin-top:291px;margin-left:74px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            var nombreInt = datosInteriores[2]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).css({ 'margin-left': '0px' });
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 350px;position: absolute;z-index:48;margin-top:-34px;margin-left:164px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 350px;position: absolute;z-index:48;margin-top:279px;margin-left:164px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );
                                        }

                                        if ('1 PUERTA' == nombre) {
                                            var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).css({ 'margin-left': '0px' });
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 350px;position: absolute;z-index:50" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 350px;position: absolute;z-index:50;margin-top:315px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );
                                        }

                                        if ('7 PUERTAS IZQUIERDA' == nombre) {
                                            var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).css({ 'margin-left': '0px' });
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 350px;position: absolute;z-index:50" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 350px;position: absolute;z-index:50;margin-top:315px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            var nombreInt = datosInteriores[1]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;margin-left: 74px;margin-top: -24px;position: absolute;z-index:49" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:49;margin-top:291px;margin-left:74px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            var nombreInt = datosInteriores[2]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;margin-left: 183px;margin-top: -47px;position: absolute;z-index:48" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:48;margin-top:268px;margin-left:183px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            var nombreInt = datosInteriores[3]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;margin-left: 292px;margin-top: -70px;position: absolute;z-index:47" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:47;margin-top:245px;margin-left:292px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );
                                        }

                                        if ('2 PUERTAS' == nombre) {
                                            var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:50" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:50;margin-top:315px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );
                                        }

                                        if ('3 PUERTAS DERECHA' == nombre) {
                                            var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:50" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:50;margin-top:315px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            var nombreInt = datosInteriores[1]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).css({ 'margin-left': '0px' });
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 350px;position: absolute;z-index:49;margin-left:90px;margin-top:-10px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 350px;position: absolute;z-index:49;margin-top:305px;margin-left:90px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );
                                        }

                                        if ('5 PUERTAS CENTRAL' == nombre) {
                                            var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:50" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:50;margin-top:315px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            var nombreInt = datosInteriores[1]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).css({ 'margin-left': '0px' });
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 350px;position: absolute;z-index:49;margin-left:90px;margin-top:-10px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 350px;position: absolute;z-index:49;margin-top:305px;margin-left:90px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            var nombreInt = datosInteriores[2]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:48;margin-left:164px;margin-top:-34px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:48;margin-top:281px;margin-left:164px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );
                                        }
                                        if ('7 PUERTA ASIMETRICAS' == nombre) {
                                            var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:50" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:50;margin-top:315px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            var nombreInt = datosInteriores[1]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).css({ 'margin-left': '0px' });
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 350px;position: absolute;z-index:49;margin-left:90px;margin-top:-10px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 350px;position: absolute;z-index:49;margin-top:305px;margin-left:90px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            var nombreInt = datosInteriores[2]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:48;margin-left:164px;margin-top:-34px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:48;margin-top:281px;margin-left:164px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );
                                            var nombreInt = datosInteriores[3]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;margin-left: 274px;margin-top: -57px;position: absolute;z-index:47" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:47;margin-top:258px;margin-left:274px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );
                                        }

                                        if ('7 PUERTAS DERECHA' == nombre) {
                                            var nombreInt = datosInteriores[3]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).css({ 'margin-left': '0px' });
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 350px;position: absolute;z-index:47;margin-left:307px;margin-top:-55px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 350px;position: absolute;z-index:47;margin-top:260px;margin-left:307px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:50" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:50;margin-top:315px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            var nombreInt = datosInteriores[1]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;margin-left: 109px;margin-top: -23px;position: absolute;z-index:49" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:49;margin-top:292px;margin-left:109px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            var nombreInt = datosInteriores[2]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;margin-left: 218px;margin-top: -45px;position: absolute;z-index:48" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:48;margin-top:270px;margin-left:218px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );
                                        }

                                        if ('6 PUERTAS -3 HUECOS GRANDES' == nombre) {
                                            var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:50" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:50;margin-top:315px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            var nombreInt = datosInteriores[1]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;margin-left: 109px;margin-top: -23px;position: absolute;z-index:49" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:49;margin-top:292px;margin-left:109px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            var nombreInt = datosInteriores[2]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;margin-left: 218px;margin-top: -45px;position: absolute;z-index:48" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:48;margin-top:270px;margin-left:218px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );
                                        }

                                        if ('4 PUERTAS - 2 HUECOS GRANDES' == nombre) {
                                            var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:50" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:50;margin-top:315px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            var nombreInt = datosInteriores[1]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;margin-left: 109px;margin-top: -23px;position: absolute;z-index:49" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:49;margin-top:292px;margin-left:109px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );
                                        }

                                        if ('5 PUERTAS DERECHA' == nombre) {
                                            var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:50" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:50;margin-top:315px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            var nombreInt = datosInteriores[1]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;margin-left: 109px;margin-top: -23px;position: absolute;z-index:49" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:49;margin-top:292px;margin-left:109px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            var nombreInt = datosInteriores[2]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).css({ 'margin-left': '0px' });
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 350px;position: absolute;z-index:48;margin-left:198px;margin-top:-33px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 350px;position: absolute;z-index:48;margin-top:282px;margin-left:198px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );
                                        }

                                        if ('5 PUERTAS IZQUIERDA' == nombre) {
                                            var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).css({ 'margin-left': '0px' });
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 350px;position: absolute;z-index:50" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 350px;position: absolute;z-index:50;margin-top:315px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            var nombreInt = datosInteriores[1]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;margin-left: 74px;margin-top: -24px;position: absolute;z-index:49" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:49;margin-top:291px;margin-left:74px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            var nombreInt = datosInteriores[2]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;margin-left: 183px;margin-top: -47px;position: absolute;z-index:48" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:48;margin-top:268px;margin-left:183px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );
                                        }
                                        if ('6 PUERTAS ASIMETRICAS' == nombre) {
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                                    casco +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;margin-left:91px;margin-top:-19px;z-index:99" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                                    casco +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;margin-left:212px;margin-top:-44px;z-index:98" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                                    casco +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-top:315px" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                                    casco +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;margin-left:91px;margin-top: 296px;z-index:99" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                                    casco +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;margin-left:212px;margin-top: 271px;z-index:98" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                                    casco +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                                    trasera +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;margin-left:91px;margin-top:-19px;z-index:99" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                                    trasera +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;margin-left:212px;margin-top:-44px;z-index:98" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                                    trasera +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-top:315px" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                                    trasera +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;margin-left:91px;margin-top: 296px;z-index:99" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                                    trasera +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;margin-left:212px;margin-top: 271px;z-index:98" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                                    trasera +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:97;margin-left: 302px;margin-top: -63px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                                    casco +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:97;margin-left: 302px;margin-top: -63px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                                    trasera +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:97;margin-left: 302px;margin-top: 253px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                                    casco +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:97;margin-left: 302px;margin-top: 253px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                                    trasera +
                                                    '.png">'
                                            );

                                            var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                                    nombreInt +
                                                    '/peque_interior_' +
                                                    nombreInt +
                                                    '_' +
                                                    interiorAca +
                                                    '_optimized.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-top:315px" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                                    nombreInt +
                                                    '/peque_interior_' +
                                                    nombreInt +
                                                    '_' +
                                                    interiorAca +
                                                    '_optimized.png">'
                                            );

                                            var nombreInt = datosInteriores[1]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-left:91px;margin-top:-19px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                    nombreInt +
                                                    '/grande_interior_' +
                                                    nombreInt +
                                                    '_' +
                                                    interiorAca +
                                                    '_optimized.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-left:91px;margin-top:296px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                    nombreInt +
                                                    '/grande_interior_' +
                                                    nombreInt +
                                                    '_' +
                                                    interiorAca +
                                                    '_optimized.png">'
                                            );

                                            var nombreInt = datosInteriores[2]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-left:212px;margin-top:-44px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                    nombreInt +
                                                    '/grande_interior_' +
                                                    nombreInt +
                                                    '_' +
                                                    interiorAca +
                                                    '_optimized.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-left:212px;margin-top:271px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                    nombreInt +
                                                    '/grande_interior_' +
                                                    nombreInt +
                                                    '_' +
                                                    interiorAca +
                                                    '_optimized.png">'
                                            );
                                            var nombreInt = datosInteriores[3]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-left:302px;margin-top:-63px;" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                                    nombreInt +
                                                    '/peque_interior_' +
                                                    nombreInt +
                                                    '_' +
                                                    interiorAca +
                                                    '_optimized.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-left:302px;margin-top:253px" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                                    nombreInt +
                                                    '/peque_interior_' +
                                                    nombreInt +
                                                    '_' +
                                                    interiorAca +
                                                    '_optimized.png">'
                                            );
                                        }
                                        $('#imagen' + (cont - 1)).css({ height: '650px' });
                                    });
                                    this.presupuestoArmarioPuertasService.busqueda(data.body[0]['id']).subscribe(data => {
                                        this.presupuestoArmarioPuertasService.todos = data.body;
                                        var datosInteriores = data.body;
                                        console.log(data.body);
                                        var precioTodo = $('#precioTotal' + (cont - 1)).text();

                                        var precioTodo1 = 0;
                                        var nombre = data.body[0]['presupuestoArmario']['armario']['mensaje'];
                                        for (let p = 0; p < datosInteriores.length; p++) {
                                            $('#datosMeter' + (cont - 1)).append(
                                                '<p><strong>Puerta ' +
                                                    (p + 1) +
                                                    ' ' +
                                                    datosInteriores[p]['productosDormitorio']['nombre'] +
                                                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong><span>+ ' +
                                                    datosInteriores[p]['precio'] +
                                                    ' €</span></p>'
                                            );
                                            precioTodo1 = precioTodo1 + datosInteriores[p]['precio'];
                                        }
                                        if ('3 PUERTAS IZQUIERDA' == nombre) {
                                            var tipo = data.body[0]['productosDormitorio']['nombre'];
                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:315px;opacity:0.4" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:315px;opacity:0.4" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[1]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px;opacity:0.4" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#cuerpo' + i + ' #derecha').append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px;opacity:0.4" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[2]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px;opacity:0.4" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#cuerpo' + i + ' #derecha').append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px;opacity:0.4" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                        }

                                        if ('4 PUERTAS ASIMETRICAS' == nombre) {
                                            var tipo = data.body[0]['productosDormitorio']['nombre'];
                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:315px;opacity:0.4" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:315px;opacity:0.4" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[1]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px;opacity:0.4" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#cuerpo' + i + ' #derecha').append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px;opacity:0.4" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[2]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px;opacity:0.4" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#cuerpo' + i + ' #derecha').append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px;opacity:0.4" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 365px;position: absolute;z-index:99;margin-top:291px;margin-left:74px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[3]['productosDormitorio']['nombre'];
                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:279px;opacity:0.4;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:279px;margin-left:164px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:279px;opacity:0.4;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:279px;margin-left:164px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:279px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:279px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:279px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:279px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                        }

                                        if ('1 PUERTA' == nombre) {
                                            var tipo = data.body[0]['productosDormitorio']['nombre'];
                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:315px;opacity:0.4" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:315px;opacity:0.4" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="max-width: 350px;position: absolute;z-index:100;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                        }

                                        if ('5 PUERTAS IZQUIERDA' == nombre) {
                                            var tipo = data.body[0]['productosDormitorio']['nombre'];
                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[1]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[2]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:5;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[3]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[4]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:5;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                        }

                                        if ('7 PUERTAS IZQUIERDA' == nombre) {
                                            var tipo = data.body[0]['productosDormitorio']['nombre'];
                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[1]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[2]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:5;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 74px;margin-top: 291px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[3]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[4]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:5;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 183px;margin-top: 268px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[5]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 292px;margin-top: 245px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 292px;margin-top: 245px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 292px;margin-top: 245px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 292px;margin-top: 245px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 292px;margin-top: 245px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 292px;margin-top: 245px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 292px;margin-top: 245px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 292px;margin-top: 245px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 292px;margin-top: 245px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 292px;margin-top: 245px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 292px;margin-top: 245px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 292px;margin-top: 245px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[6]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 292px;margin-top: 245px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 292px;margin-top: 245px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 292px;margin-top: 245px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:5;margin-left: 292px;margin-top: 245px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 292px;margin-top: 245px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 292px;margin-top: 245px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 292px;margin-top: 245px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 292px;margin-top: 245px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 292px;margin-top: 245px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 292px;margin-top: 245px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 292px;margin-top: 245px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 292px;margin-top: 245px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                        }

                                        if ('3 PUERTAS DERECHA' == nombre) {
                                            var tipo = data.body[0]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[1]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:5;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[2]['productosDormitorio']['nombre'];
                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;opacity:0.4;margin-top:305px;margin-left:90px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:305px;margin-left:90px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;opacity:0.4;margin-top:305px;margin-left:90px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:305px;margin-left:90px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:305px;margin-left:90px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:305px;margin-left:90px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:305px;margin-left:90px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:305px;margin-left:90px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                        }

                                        if ('5 PUERTAS CENTRAL' == nombre) {
                                            var tipo = data.body[0]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[1]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:5;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[2]['productosDormitorio']['nombre'];
                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;opacity:0.4;margin-top:305px;margin-left:90px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:305px;margin-left:90px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;opacity:0.4;margin-top:305px;margin-left:90px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:305px;margin-left:90px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:305px;margin-left:90px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:305px;margin-left:90px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:305px;margin-left:90px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:305px;margin-left:90px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[3]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[4]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:5;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                        }

                                        if ('7 PUERTA ASIMETRICAS' == nombre) {
                                            var tipo = data.body[0]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[1]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:5;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[2]['productosDormitorio']['nombre'];
                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;opacity:0.4;margin-top:305px;margin-left:90px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:305px;margin-left:90px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;opacity:0.4;margin-top:305px;margin-left:90px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:305px;margin-left:90px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:305px;margin-left:90px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:305px;margin-left:90px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:305px;margin-left:90px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:305px;margin-left:90px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[3]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[4]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:5;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:281px;margin-left:164px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[5]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:258px;margin-top:258px;margin-left:276px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:258px;margin-left:276px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:258px;margin-top:258px;margin-left:276px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:258px;margin-top:258px;margin-left:276px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:258px;margin-top:258px;margin-left:276px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:258px;margin-top:258px;margin-left:276px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:258px;margin-top:258px;margin-left:276px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:258px;margin-top:258px;margin-left:276px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:258px;margin-top:258px;margin-left:276px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:258px;margin-top:258px;margin-left:276px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:258px;margin-top:258px;margin-left:276px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:258px;margin-top:258px;margin-left:276px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[6]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:258px;margin-left:276px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:258px;margin-top:258px;margin-left:276px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:258px;margin-top:258px;margin-left:276px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:5;margin-top:315px;margin-top:258px;margin-left:276px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:258px;margin-left:276px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:258px;margin-left:276px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:258px;margin-left:276px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:258px;margin-left:276px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:258px;margin-left:276px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:258px;margin-left:276px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:258px;margin-left:276px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px;margin-top:258px;margin-left:276px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                        }

                                        if ('2 PUERTAS' == nombre) {
                                            var tipo = data.body[0]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[1]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:5;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                        }

                                        if ('4 PUERTAS - 2 HUECOS GRANDES' == nombre) {
                                            var tipo = data.body[0]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[1]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:5;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[2]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[3]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:5;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                        }

                                        if ('5 PUERTAS DERECHA' == nombre) {
                                            var tipo = data.body[0]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[1]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:5;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[2]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[3]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:5;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            var tipo = data.body[4]['productosDormitorio']['nombre'];
                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;opacity:0.4;margin-top:282px;margin-left:198px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:282px;margin-left:198px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;opacity:0.4;margin-top:282px;margin-left:198px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:282px;margin-left:198px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:282px;margin-left:198px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:282px;margin-left:198px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:282px;margin-left:198px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:282px;margin-left:198px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                        }

                                        if ('7 PUERTAS DERECHA' == nombre) {
                                            var tipo = data.body[6]['productosDormitorio']['nombre'];
                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;opacity:0.4;margin-top:260px;margin-left:307px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:260px;margin-left:307px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;opacity:0.4;margin-top:260px;margin-left:307px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:260px;margin-left:307px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:260px;margin-left:307px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:260px;margin-left:307px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:260px;margin-left:307px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:260px;margin-left:307px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[0]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[1]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:5;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[2]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[3]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:5;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[4]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[5]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:5;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                        }

                                        if ('6 PUERTAS -3 HUECOS GRANDES' == nombre) {
                                            var tipo = data.body[0]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[1]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:5;margin-top:315px" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[2]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[3]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:5;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[4]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[5]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:5;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                        }

                                        if ('6 PUERTAS ASIMETRICAS' == nombre) {
                                            var tipo = data.body[0]['productosDormitorio']['nombre'];
                                            var acabado = data.body[0]['acabados']['nombre'].toLowerCase();
                                            if (tipo == 'Puerta Madera') {
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 150px;position: absolute;z-index:101;margin-top:315px" src="../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_' +
                                                        acabado +
                                                        '_optimized.png">'
                                                );
                                            }

                                            var tipo = data.body[1]['productosDormitorio']['nombre'];
                                            var acabado = data.body[1]['acabados']['nombre'].toLowerCase();
                                            if (tipo == 'Puerta Madera') {
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 150px;position: absolute;z-index:101;margin-top: 297px;margin-left: 92px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                                        acabado +
                                                        '_optimized.png">'
                                                );
                                            }
                                            var tipo = data.body[2]['productosDormitorio']['nombre'];
                                            var acabado = data.body[2]['acabados']['nombre'].toLowerCase();
                                            if (tipo == 'Puerta Madera') {
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 150px;position: absolute;z-index:101;margin-top: 297px;margin-left: 92px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_' +
                                                        acabado +
                                                        '_optimized.png">'
                                                );
                                            }

                                            var tipo = data.body[3]['productosDormitorio']['nombre'];
                                            var acabado = data.body[3]['acabados']['nombre'].toLowerCase();
                                            if (tipo == 'Puerta Madera') {
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 150px;position: absolute;z-index:101;margin-top: 272px;margin-left: 213px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                                        acabado +
                                                        '_optimized.png">'
                                                );
                                            }
                                            var tipo = data.body[4]['productosDormitorio']['nombre'];
                                            var acabado = data.body[4]['acabados']['nombre'].toLowerCase();
                                            if (tipo == 'Puerta Madera') {
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 150px;position: absolute;z-index:101;margin-top: 272px;margin-left: 213px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_' +
                                                        acabado +
                                                        '_optimized.png">'
                                                );
                                            }
                                            var tipo = data.body[5]['productosDormitorio']['nombre'];
                                            var acabado = data.body[3]['acabados']['nombre'].toLowerCase();
                                            if (tipo == 'Puerta Madera') {
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 150px;position: absolute;z-index:101;margin-top: 247px;margin-left: 333px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                                        acabado +
                                                        '_optimized.png">'
                                                );
                                            }
                                        }
                                    });
                                });
                            } else {
                                if (res.body[i]['dimensionesProductoTipo'] != undefined) {
                                    if (res.body[i]['dimensionesProductoTipo']['mensaje'] == 'Medidas Especiales') {
                                        var medidasEspeciales = this.medEspProductoPedidoPresuService.todo;

                                        for (let k = 0; k < medidasEspeciales.length; k++) {
                                            if (medidasEspeciales[k]['productosPresupuestoPedidos']['id'] == res.body[i]['id']) {
                                                res.body[i]['dimensionesProductoTipo']['ancho'] = medidasEspeciales[k]['ancho'];
                                                res.body[i]['dimensionesProductoTipo']['alto'] = medidasEspeciales[k]['alto'];
                                                res.body[i]['dimensionesProductoTipo']['fondo'] = medidasEspeciales[k]['fondo'];
                                                res.body[i]['dimensionesProductoTipo']['precio'] = medidasEspeciales[k]['precio'];
                                                var precioEspecial = parseFloat(medidasEspeciales[k]['precio']);
                                                precioEspecial = precioEspecial * precioPunto;
                                                var menosPrecio = precioEspecial * 0.3;
                                                res.body[i]['dimensionesProductoTipo']['incremento'] = menosPrecio.toFixed(2);
                                                menosPrecio = precioEspecial + menosPrecio;
                                                res.body[i]['dimensionesProductoTipo']['precio'] = menosPrecio;
                                                var incremento = menosPrecio;
                                                var mejorIncremento = incremento * precioPunto;
                                                mejorIncremento = incremento + mejorIncremento;

                                                productosPresupuesto[cont] = res.body[i];
                                                cont++;
                                            }
                                        }
                                    } else {
                                        productosPresupuesto[cont] = res.body[i];
                                        cont++;
                                    }
                                } else {
                                    productosPresupuesto[cont] = res.body[i];
                                    cont++;
                                }
                            }
                        }
                    }
                }
                this.productosPresupuestoPedidos = productosPresupuesto;

                this.productos = productosPresupuesto;
                this.interioresArmario = todosInteriores;
                console.log(this.interioresArmario);
                console.log(this.productos);
                var precioModulosBajos = this.modulosBajos;
                var productos = this.productos;
                var ilu = [];
                this.iluminacionProdPrePedService
                    .query({
                        size: 1000000
                    })
                    .subscribe(data => {
                        for (let i = 0; i < data['body'].length; i++) {
                            ilu[i] = data['body'][i];
                        }
                        this.iluminacionProdPrePedService.metidos = ilu;
                    });
                var precioPunto = this.precioPunto[0];
                var apoyoPrecios = this.apoyoPrecios;
                var olauseleles = this.precioTiendaService.precioTienda[0].precio / 100 + 1;
                var yeahburi = this.precioTiendaService.precioTienda[0].precio / 100 + 1;
                var precioAparadores = this.aparadores;
                var precioVitrinas = this.vitrinas;
                var precioSingulares = this.singulares;
                for (let w = 0; w < productos.length; w++) {
                    if (productos[w]['productosDormitorio']['categoriasDormi']['id'] != 9) {
                        this.acabadosProductosPresupuestoPedidoService
                            .query1(productos[w]['id'])
                            .subscribe((res: HttpResponse<IAcabadosProductosPresupuestoPedido[]>) => {
                                for (let i = 0; i < res.body.length; i++) {
                                    acabados[i] = res.body[i];
                                }
                                var iluminacion = this.iluminacionProdPrePedService.metidos;
                                console.log(res.body);
                                var apoyo;
                                setTimeout(function() {
                                    if (productos != undefined) {
                                        var i = w;
                                        for (let j = 0; j < iluminacion.length; j++) {
                                            if (iluminacion[j]['productosPresupuestoPedidos']['id'] == productos[i]['id']) {
                                                $('.' + productos[i]['id'] + 'DatosIluminacion').append(
                                                    '<p>Luz&nbsp;&nbsp;&nbsp;' + iluminacion[j]['iluminacion']['precio'] + '&euro;</p>'
                                                );
                                                var precioLuz = iluminacion[j]['iluminacion']['precio'];
                                                var precioTotal = $('.' + productos[i]['id'] + 'Datos #precioTotal' + i).text();
                                                if (precioTotal != '') {
                                                    var precioFloat = parseFloat(precioTotal);
                                                }
                                                precioFloat = precioFloat + precioLuz;
                                                $('.' + productos[i]['id'] + 'Datos #precioTotal' + i).text(precioFloat);
                                                $('.' + productos[i]['id'] + 'DatosIluminacion').css({ display: 'block' });
                                            }
                                        }
                                        var contador = 1;
                                        apoyo = undefined;
                                        for (let k = 0; k < acabados.length; k++) {
                                            if (productos[i]['id'] == acabados[k]['productosPresupuestoPedidos']['id']) {
                                                $('.' + productos[i]['id'] + 'Datos').append(
                                                    '<p >Acabado ' +
                                                        contador +
                                                        '&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                        contador +
                                                        '">' +
                                                        acabados[k]['acabados']['nombre'] +
                                                        '</span></p>'
                                                );
                                                var prodNombre =
                                                    acabados[k]['productosPresupuestoPedidos']['productosDormitorio']['nombre'];
                                                var idProdNombre = acabados[k]['productosPresupuestoPedidos']['productosDormitorio']['id'];
                                                if (prodNombre == 'Modulo Bajo 1' || idProdNombre == 107) {
                                                    prodNombre = 'mb1';
                                                }
                                                if (prodNombre == 'Modulo Bajo 2') {
                                                    prodNombre = 'mb2';
                                                }
                                                if (prodNombre == 'Modulo Bajo 3') {
                                                    prodNombre = 'mb4';
                                                }
                                                if (prodNombre == 'Modulo Bajo 4 Apertura Izquierda') {
                                                    prodNombre = 'mb6';
                                                }
                                                if (prodNombre == 'Modulo Bajo 4 Apertura Derecha') {
                                                    prodNombre = 'mb5';
                                                }
                                                if (prodNombre == 'Modulo Bajo 5 Apertura Izquierda') {
                                                    prodNombre = 'mb8';
                                                }
                                                if (prodNombre == 'Modulo Bajo 5 Apertura Derecha') {
                                                    prodNombre = 'mb7';
                                                }
                                                if (prodNombre == 'Modulo Bajo 6') {
                                                    prodNombre = 'mb9';
                                                }
                                                if (prodNombre == 'Modulo Bajo 7 Apertura Izquierda') {
                                                    prodNombre = 'mb11';
                                                }
                                                if (prodNombre == 'Modulo Bajo 7 Apertura Derecha') {
                                                    prodNombre = 'mb10';
                                                }
                                                if (prodNombre == 'Modulo Bajo 8 Apertura Izquierda') {
                                                    prodNombre = 'mb13';
                                                }
                                                if (prodNombre == 'Modulo Bajo 8 Apertura Derecha') {
                                                    prodNombre = 'mb12';
                                                }
                                                if (prodNombre == 'Modulo Bajo 9') {
                                                    prodNombre = 'mb14';
                                                }
                                                if (prodNombre == 'Aparador 2') {
                                                    prodNombre = 'ap2';
                                                }

                                                if (prodNombre == 'Aparador 3') {
                                                    prodNombre = 'ap3';
                                                }

                                                if (prodNombre == 'singular 1 apertura derecha') {
                                                    prodNombre = 'sg1';
                                                }

                                                if (prodNombre == 'singular 1 apertura izquierda') {
                                                    prodNombre = 'sg1';
                                                }

                                                if (prodNombre == 'singular 2 apertura derecha') {
                                                    prodNombre = 'sg2';
                                                }

                                                if (prodNombre == 'singular 2 apertura izquierda') {
                                                    prodNombre = 'sg2';
                                                }

                                                if (prodNombre == 'singular 3 apertura derecha') {
                                                    prodNombre = 'sg3';
                                                }

                                                if (prodNombre == 'singular 3 apertura izquierda') {
                                                    prodNombre = 'sg3';
                                                }
                                                if (prodNombre == 'singular 4') {
                                                    prodNombre = 'sg4';
                                                }
                                                if (prodNombre == 'singular 5') {
                                                    prodNombre = 'sg5';
                                                }

                                                if (prodNombre == 'singular 6') {
                                                    prodNombre = 'sg6';
                                                }
                                                if (prodNombre == 'singular 7') {
                                                    prodNombre = 'sg7';
                                                }

                                                if (prodNombre == 'singular 8') {
                                                    prodNombre = 'sg8';
                                                }

                                                if (prodNombre == 'singular 9') {
                                                    prodNombre = 'sg9';
                                                }
                                                if (prodNombre == 'singular 10') {
                                                    prodNombre = 'sg10';
                                                }
                                                if (prodNombre == 'singular 11') {
                                                    prodNombre = 'sg11';
                                                }
                                                if (prodNombre == 'singular 12 apertura izquierda') {
                                                    prodNombre = 'sg12';
                                                }
                                                if (prodNombre == 'singular 12 apertura derecha') {
                                                    prodNombre = 'sg12';
                                                }
                                                if (prodNombre == 'singular 13 apertura izquierda') {
                                                    prodNombre = 'sg13';
                                                }
                                                if (prodNombre == 'singular 13 apertura derecha') {
                                                    prodNombre = 'sg13';
                                                }
                                                if (prodNombre == 'singular 14') {
                                                    prodNombre = 'sg14';
                                                }
                                                if (prodNombre == 'singular 15') {
                                                    prodNombre = 'sg15';
                                                }
                                                if (prodNombre == 'singular 16') {
                                                    prodNombre = 'sg16';
                                                }

                                                if (prodNombre == 'Aparador 4') {
                                                    prodNombre = 'ap4';
                                                }
                                                if (prodNombre == 'Aparador 5') {
                                                    prodNombre = 'ap5';
                                                }
                                                if (prodNombre == 'Aparador 6') {
                                                    prodNombre = 'ap6';
                                                }
                                                if (prodNombre == 'Aparador 7') {
                                                    prodNombre = 'ap7';
                                                }
                                                if (prodNombre == 'Aparador 8') {
                                                    prodNombre = 'ap8';
                                                }
                                                if (prodNombre == 'Aparador 9') {
                                                    prodNombre = 'ap9';
                                                }
                                                if (prodNombre == 'Aparador 10') {
                                                    prodNombre = 'ap10';
                                                }
                                                if (prodNombre == 'Colgante vertical 1 izquierdo') {
                                                    prodNombre = 'cv27';
                                                }
                                                if (prodNombre == 'Colgante vertical 1 derecho') {
                                                    prodNombre = 'cv27';
                                                }
                                                if (prodNombre == 'Colgante vertical 2 izquierdo') {
                                                    prodNombre = 'cv25';
                                                }
                                                if (prodNombre == 'Colgante vertical 2 derecho') {
                                                    prodNombre = 'cv25';
                                                }
                                                if (prodNombre == 'Colgante vertical 3 izquierdo') {
                                                    prodNombre = 'cv6';
                                                }
                                                if (prodNombre == 'Colgante vertical 3 derecho') {
                                                    prodNombre = 'cv6';
                                                }
                                                if (prodNombre == 'Colgante vertical 4 izquierdo') {
                                                    prodNombre = 'cv19';
                                                }
                                                if (prodNombre == 'Colgante vertical 4 derecha') {
                                                    prodNombre = 'cv19';
                                                }
                                                if (prodNombre == 'Colgante vertical 5 izquierdo') {
                                                    prodNombre = 'cv10';
                                                }
                                                if (prodNombre == 'Colgante vertical 5 derecho') {
                                                    prodNombre = 'cv10';
                                                }
                                                if (prodNombre == 'Colgante vertical 6 izquierdo') {
                                                    prodNombre = 'cv12';
                                                }
                                                if (prodNombre == 'Colgante vertical 6 derecho') {
                                                    prodNombre = 'cv12';
                                                }
                                                var nombreAcabado = acabados[k]['acabados']['nombre'].toLowerCase();
                                                if (nombreAcabado == 'marmol blanco') {
                                                    nombreAcabado = 'marmolblanco';
                                                }
                                                if (nombreAcabado == 'marmol negro') {
                                                    nombreAcabado = 'marmolnegro';
                                                }
                                                if (
                                                    prodNombre != 'sg1' &&
                                                    prodNombre != 'sg2' &&
                                                    prodNombre != 'sg3' &&
                                                    prodNombre != 'sg4' &&
                                                    prodNombre != 'sg5' &&
                                                    prodNombre != 'sg6' &&
                                                    prodNombre != 'sg7' &&
                                                    prodNombre != 'sg8' &&
                                                    prodNombre != 'sg9' &&
                                                    prodNombre != 'sg10' &&
                                                    prodNombre != 'sg11' &&
                                                    prodNombre != 'sg12' &&
                                                    prodNombre != 'sg13' &&
                                                    prodNombre != 'sg14' &&
                                                    prodNombre != 'sg15' &&
                                                    prodNombre != 'sg16'
                                                ) {
                                                    /*
                                                    if (nombreAcabado == 'cristal bronce') {
                                                        var aca1Nombre = $('.' + productos[i]['id'] + 'Datos .acabado1')
                                                            .text()
                                                            .toLowerCase();
                                                        $('#imagen' + i).append(
                                                            '<img id="tapa" class="' +
                                                                nombreAcabado +
                                                                '" width="500px" height="333px" style="position: absolute;margin-top: 5px;margin-left:0px" src="../../../content/images/' +
                                                                prodNombre +
                                                                '/' +
                                                                contador +
                                                                ' BRONCE/' +
                                                                prodNombre +
                                                                '_' +
                                                                contador +
                                                                '_' +
                                                                aca1Nombre +
                                                                '_bronce_optimized.png">'
                                                        );
                                                    }
                                                    if (nombreAcabado == 'cristal transparente') {
                                                        var aca1Nombre = $('.' + productos[i]['id'] + 'Datos .acabado1')
                                                            .text()
                                                            .toLowerCase();
                                                        $('#imagen' + i).append(
                                                            '<img id="tapa" class="' +
                                                                nombreAcabado +
                                                                '" width="500px" height="333px" style="position: absolute;margin-top: 5px;margin-left:0px" src="../../../content/images/' +
                                                                prodNombre +
                                                                '/' +
                                                                contador +
                                                                ' TRANSPARENTE/' +
                                                                prodNombre +
                                                                '_' +
                                                                contador +
                                                                '_' +
                                                                aca1Nombre +
                                                                '_transparente_optimized.png">'
                                                        );
                                                    }
                                                    if (nombreAcabado != 'cristal transparente' && nombreAcabado != 'cristal bronce') {
                                                        $('#imagen' + i).append(
                                                            '<img id="tapa" class="' +
                                                                nombreAcabado +
                                                                '" width="500px" height="333px" style="position: absolute;margin-top: 5px;margin-left:0px" src="../../../content/images/' +
                                                                prodNombre +
                                                                '/' +
                                                                contador +
                                                                '/' +
                                                                prodNombre +
                                                                '_' +
                                                                contador +
                                                                '_' +
                                                                nombreAcabado +
                                                                '_optimized.png">'
                                                        );
                                                    }
                                                    */

                                                    $('#imagen' + i).append(
                                                        '<img id="tapa" class="' +
                                                            nombreAcabado +
                                                            '" width="500px" height="333px" style="position: absolute;margin-top: 5px;margin-left:0px" src="../../../content/images/' +
                                                            prodNombre +
                                                            '/0 NUMEROS/' +
                                                            prodNombre +
                                                            '_numeros_optimized.png">'
                                                    );
                                                } else {
                                                    /*
                                                    if (nombreAcabado == 'cristal bronce') {
                                                        var aca1Nombre = $('.' + productos[i]['id'] + 'Datos .acabado1')
                                                            .text()
                                                            .toLowerCase();
                                                        $('#imagen' + i).append(
                                                            '<img id="tapa" class="' +
                                                                nombreAcabado +
                                                                '" width="250px" height="383px" style="position: absolute;margin-top: 5px;margin-left:0px" src="../../../content/images/' +
                                                                prodNombre +
                                                                '/' +
                                                                contador +
                                                                ' BRONCE/' +
                                                                prodNombre +
                                                                '_' +
                                                                contador +
                                                                '_' +
                                                                aca1Nombre +
                                                                '_bronce_optimized.png">'
                                                        );
                                                    }
                                                    if (nombreAcabado == 'cristal transparente') {
                                                        var aca1Nombre = $('.' + productos[i]['id'] + 'Datos .acabado1')
                                                            .text()
                                                            .toLowerCase();
                                                        $('#imagen' + i).append(
                                                            '<img id="tapa" class="' +
                                                                nombreAcabado +
                                                                '" width="250px" height="383px" style="position: absolute;margin-top: 5px;margin-left:0px" src="../../../content/images/' +
                                                                prodNombre +
                                                                '/' +
                                                                contador +
                                                                ' TRANSPARENTE/' +
                                                                prodNombre +
                                                                '_' +
                                                                contador +
                                                                '_' +
                                                                aca1Nombre +
                                                                '_transparente_optimized.png">'
                                                        );
                                                    }
                                                    if (nombreAcabado != 'cristal transparente' && nombreAcabado != 'cristal bronce') {
                                                        $('#imagen' + i).append(
                                                            '<img id="tapa" class="' +
                                                                nombreAcabado +
                                                                '" width="250px" height="383px" style="position: absolute;margin-top: 5px;margin-left:0px" src="../../../content/images/' +
                                                                prodNombre +
                                                                '/' +
                                                                contador +
                                                                '/' +
                                                                prodNombre +
                                                                '_' +
                                                                contador +
                                                                '_' +
                                                                nombreAcabado +
                                                                '_optimized.png">'
                                                        );
                                                    }
                                                    */
                                                    $('#imagen' + i).append(
                                                        '<img id="tapa" class="' +
                                                            nombreAcabado +
                                                            '" width="250px" height="383px" style="position: absolute;margin-top: 5px;margin-left:0px" src="../../../content/images/' +
                                                            prodNombre +
                                                            '/0 NUMEROS/' +
                                                            prodNombre +
                                                            '_numeros_optimized.png">'
                                                    );
                                                }
                                                if (
                                                    contador == 1 &&
                                                    acabados[k]['productosPresupuestoPedidos']['tiposApoyo'] != undefined
                                                ) {
                                                    apoyo = acabados[k];
                                                }

                                                contador++;
                                            }
                                        }

                                        if (
                                            productos[i]['productosDormitorio']['categoriasDormi']['id'] != 8 &&
                                            productos[i]['productosDormitorio']['categoriasDormi']['id'] != 9 &&
                                            productos[i]['productosDormitorio']['categoriasDormi']['id'] != 11 &&
                                            productos[i]['productosDormitorio']['categoriasDormi']['id'] != 12 &&
                                            productos[i]['productosDormitorio']['categoriasDormi']['id'] != 13 &&
                                            productos[i]['productosDormitorio']['categoriasDormi']['id'] != 16
                                        ) {
                                            $('#imagen' + i).append(
                                                '<img style="z-index:' +
                                                    (100 - i) +
                                                    ';max-width:400px;max-height:400px;;max-width:400px;max-height:250px;position:absolute;" width="1000px" height="1000px" src="../../../content/images/numeros' +
                                                    productos[i]['productosDormitorio']['id'] +
                                                    '.png">'
                                            );
                                        }

                                        if (apoyo != undefined) {
                                            $('.' + productos[i]['id'] + 'Datos').append(
                                                '<p>' +
                                                    apoyo['productosPresupuestoPedidos']['tiposApoyo']['productoApoyo']['nombre'] +
                                                    '&nbsp;&nbsp;&nbsp; <span id="precioApoyo' +
                                                    i +
                                                    '">' +
                                                    apoyo['productosPresupuestoPedidos']['tiposApoyo']['precio'] +
                                                    '</span>&euro;</p>'
                                            );
                                            var precioTotal = $('.' + productos[i]['id'] + 'Datos #precioTotal' + i).text();
                                            if (precioTotal != '') {
                                                var precioFloat = parseFloat(precioTotal);
                                            }

                                            if (productos[i]['productosDormitorio']['categoriasDormi']['id'] == 8) {
                                                for (let s = 0; s < precioModulosBajos.length; s++) {
                                                    if (precioModulosBajos[s][2] == productos[i]['productosDormitorio']['id']) {
                                                        var precioProd = precioModulosBajos[s][1];
                                                        precioProd = precioProd / 100 + 1;
                                                    }
                                                }
                                            }
                                            if (productos[i]['productosDormitorio']['categoriasDormi']['id'] == 11) {
                                                for (let s = 0; s < precioAparadores.length; s++) {
                                                    if (precioAparadores[s][2] == productos[i]['productosDormitorio']['id']) {
                                                        var precioProd = precioAparadores[s][1];
                                                        precioProd = precioProd / 100 + 1;
                                                    }
                                                }
                                            }

                                            if (productos[i]['productosDormitorio']['categoriasDormi']['id'] == 13) {
                                                for (let s = 0; s < precioSingulares.length; s++) {
                                                    if (precioSingulares[s][2] == productos[i]['productosDormitorio']['id']) {
                                                        var precioProd = precioSingulares[s][1];
                                                        precioProd = precioProd / 100 + 1;
                                                    }
                                                }
                                            }

                                            if (productos[i]['productosDormitorio']['categoriasDormi']['id'] == 12) {
                                                for (let s = 0; s < precioVitrinas.length; s++) {
                                                    if (precioVitrinas[s][2] == productos[i]['productosDormitorio']['id']) {
                                                        var precioProd = precioVitrinas[s][1];
                                                        precioProd = precioProd / 100 + 1;
                                                    }
                                                }
                                            }
                                            precioPunto = precioMulti;
                                            precioFloat = precioFloat * precioPunto;
                                            var todoApoyo = apoyo['productosPresupuestoPedidos']['tiposApoyo']['productoApoyo'];
                                            for (let s = 0; s < apoyoPrecios.length; s++) {
                                                if (apoyoPrecios[s][2] == todoApoyo['id']) {
                                                    var precioApo = precioModulosBajos[s][1];
                                                    precioApo = precioApo / 100 + 1;
                                                }
                                            }
                                            precioProd = olauseleles;
                                            precioApo = yeahburi;
                                            var precioApoyo = apoyo['productosPresupuestoPedidos']['tiposApoyo']['precio'];
                                            precioApoyo = precioApoyo * precioPunto;
                                            precioFloat = precioFloat + precioApoyo;
                                            var subTotal = parseFloat($('#precioSubtotal').text());
                                            subTotal = subTotal + precioFloat;
                                            $('#precioSubtotal').text(subTotal.toFixed(2));
                                            $('#totalDescuentoTexto').text(subTotal.toFixed(2));

                                            var iva = subTotal * 0.21;
                                            $('#ivaPrecioQuitar').remove();
                                            $('#ivaQuitar').append('<p id="ivaPrecioQuitar">' + iva.toFixed(2) + ' €</p>');
                                            iva = subTotal + iva;
                                            $('#precioIvaSumado').remove();
                                            $('#precioCalculadoIva').append(
                                                '<p id="precioIvaSumado" style="font-size:25px">' + iva.toFixed(2) + ' €</p>'
                                            );
                                            var total;
                                            total = precioFloat * precioTienda;
                                            console.log(total);
                                            total = total - precioFloat;
                                            $('.' + productos[i]['id'] + 'Datos #precioTotal' + i).text(precioFloat.toFixed(2));
                                            $('.' + productos[i]['id'] + 'Datos #precioFabrica' + i).text(precioFloat);
                                            $('.' + productos[i]['id'] + 'Datos #precioGanancias' + i).text(total);
                                        }
                                    }
                                }, 0);
                            });
                    }
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.datosClienteService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IDatosCliente[]>) => {
                    for (let m = 0; m < res.body.length; m++) {
                        if (res.body[m]['presupuestoPedido']['id'] == presu) {
                            $('#nombre').val(res.body[m]['nombre']);
                            $('#correo').val(res.body[m]['correo']);
                            $('#telefono').val(res.body[m]['telefono']);
                            $('#provincia').val(res.body[m]['provincias']['nombre']);
                            $('#municipios').val(res.body[m]['municipios']['nombre']);
                            $('#direccion').val(res.body[m]['direccion']);
                            $('#codPostal').val(res.body[m]['codigoPostal']);
                            $('#enviar').val(res.body[m]['fines']);
                            $('#mandar').val(res.body[m]['enviar']);
                            $('#nombre').css({ 'background-color': '#D7D9DA' });
                            $('#correo').css({ 'background-color': '#D7D9DA' });
                            $('#telefono').css({ 'background-color': '#D7D9DA' });
                            $('#provincia').css({ 'background-color': '#D7D9DA' });
                            $('#municipios').css({ 'background-color': '#D7D9DA' });
                            $('#direccion').css({ 'background-color': '#D7D9DA' });
                            $('#codPostal').css({ 'background-color': '#D7D9DA' });
                            $('#enviar').css({ 'background-color': '#D7D9DA' });
                            $('#mandar').css({ 'background-color': '#D7D9DA' });
                        }
                    }
                },
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
        this.router.navigate(['/productos-presupuesto-pedidos'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    public contactoPresupuesto() {
        var pedido = this.productos[0]['presupuestoPedido'];
        var usuario = this.currentAccount;
        $('#modal #relacion').val('Presupuestos');
        if (usuario['id'] == pedido['user']['id'] && pedido['pedido'] == 0) {
            $('#relacionCodigo').val(pedido['id']);
        }
    }
    public crearChat() {
        var pedido;
        pedido = this.productos[0]['presupuestoPedido'];
        var d = new Date();

        var month = d.getMonth() + 1;
        var day = d.getDate();
        var output;
        output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
        var numero;
        numero = 1;
        const contacto = {
            fechaInicio: output,
            tipo: numero,
            codigo: pedido['id'],
            user: this.currentAccount,
            presupuestoPedido: pedido
        };

        this.subscribeToSaveResponse2(this.contactoFabricaService.create(contacto));
    }

    public modificarDatos() {
        var id;
        var nombre;
        var correo;
        var telefono;
        var provinciaCoger;
        var municipioCoger;
        var provinciaBuena;
        var municipioBueno;
        var direccion;
        var provincias = this.provincias;
        var municipios = this.municipios;
        var todosPresupuestos = this.productosPresupuestoPedidos;
        var codPostal;
        var pres;
        var enviar;
        var mandar;
        id = $('#nombre').attr('class');
        if (id == 'id') {
            nombre = $('#nombre').val();
            correo = $('#correo').val();
            telefono = $('#telefono').val();
            provinciaCoger = $('#provincia').val();
            municipioCoger = $('#municipios').val();
            direccion = $('#direccion').val();
            codPostal = $('#codPostal').val();
            enviar = $('#enviar').val();
            mandar = $('#mandar').val();
            for (let i = 0; i < provincias.length; i++) {
                if (provincias[i]['id'] == provinciaCoger) {
                    provinciaBuena = provincias[i];
                }
            }

            for (let k = 0; k < municipios.length; k++) {
                if (municipios[k]['id'] == municipioCoger) {
                    municipioBueno = municipios[k];
                }
            }

            for (let i = 0; i < todosPresupuestos.length; i++) {
                if (todosPresupuestos[i]['presupuestoPedido'] != null) {
                    if (todosPresupuestos[i]['presupuestoPedido']['id'] == sessionStorage.getItem('presupuesto')) {
                        pres = todosPresupuestos[i]['presupuestoPedido'];
                    }
                }
            }
            const datos = {
                nombre: nombre,
                correo: correo,
                telefono: telefono,
                direccion: direccion,
                codigoPostal: codPostal,
                fines: enviar,
                enviar: mandar,
                provincias: provinciaBuena,
                municipios: municipioBueno,
                presupuestoPedido: pres
            };
            this.subscribeToSaveResponse3(this.datosClienteService.create(datos));
            $('#nombre').css({ 'background-color': '#D7D9DA' });
            $('#correo').css({ 'background-color': '#D7D9DA' });
            $('#telefono').css({ 'background-color': '#D7D9DA' });
            $('#provincia').css({ 'background-color': '#D7D9DA' });
            $('#municipios').css({ 'background-color': '#D7D9DA' });
            $('#direccion').css({ 'background-color': '#D7D9DA' });
            $('#codPostal').css({ 'background-color': '#D7D9DA' });
            $('#enviar').css({ 'background-color': '#D7D9DA' });
            $('#mandar').css({ 'background-color': '#D7D9DA' });
        } else {
            nombre = $('#nombre').val();
            correo = $('#correo').val();
            telefono = $('#telefono').val();
            provincias = $('#provincia').val();
            municipios = $('#municipio').val();
            direccion = $('#direccion').val();
            codPostal = $('#codPostal').val();
            enviar = $('#enviar').val();
            mandar = $('#mandar').val();
        }
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
        var tienda = JSON.parse(sessionStorage.getItem('tiendaUsuario'));

        var idPresu;
        idPresu = sessionStorage.getItem('presupuesto');

        var ilu = [];
        this.iluminacionProdPrePedService
            .query({
                size: 1000000
            })
            .subscribe(data => {
                for (let i = 0; i < data['body'].length; i++) {
                    ilu[i] = data['body'][i];
                }
                this.iluminacionProdPrePedService.metidos = ilu;
            });
        var buenaPrueba = sessionStorage.getItem('vengoDe');
        if (buenaPrueba == 'pruebaaaaaa') {
            sessionStorage.removeItem('vengoDe');
            location.reload();
        }

        this.precioTiendaProductosService.findProdId(8, tienda.id).subscribe(data => {
            this.modulosBajos = data.body;
        });

        this.precioTiendaProductosService.findProdId(11, tienda.id).subscribe(data => {
            this.aparadores = data.body;
        });
        this.precioTiendaProductosService.findProdId(13, tienda.id).subscribe(data => {
            this.singulares = data.body;
        });
        this.precioTiendaProductosService.findProdId(12, tienda.id).subscribe(data => {
            this.vitrinas = data.body;
        });
        this.precioTiendaProductosService.findProdId(2, tienda.id).subscribe(data => {
            this.apoyoPrecios = data.body;
        });
        this.presupuestoArmarioInterioresService.todos = undefined;
        this.precioTienda = sessionStorage.getItem('precioTienda');
        $('body').removeAttr('class');
        var presupuestos = [];
        var saber = 0;
        var acabados = [];

        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProductosPresupuestoPedidos();

        this.idPresu = idPresu;
        this.contactoFabricaService
            .query({
                size: 1000000
            })
            .subscribe(
                (res: HttpResponse<IContactoFabrica[]>) => {
                    for (let i = 0; i < res.body.length; i++) {
                        if (res.body[i] != undefined) {
                            if (res.body[i]['user']['id'] == this.currentAccount['id']) {
                                if (res.body[i]['presupuestoPedido'] != null) {
                                    if (res.body[i]['presupuestoPedido']['id'] == parseFloat(idPresu)) {
                                        saber = 1;
                                    }
                                }
                            }
                        }
                    }
                    if (saber == 1) {
                        $('#contacto1').remove();
                    } else {
                        $('#contacto2').remove();
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        var municipios = [];
        var provincias = [];
        this.accountService.identity().then(account => {
            this.account = account;
        });

        this.municipiosService.query1({}).subscribe(data => {
            for (let i = 0; i < data['body'].length; i++) {
                municipios[i] = data['body'][i];
            }
        });
        this.municipios = municipios;

        this.provinciasService
            .query({
                size: 100000
            })
            .subscribe(data => {
                for (let i = 0; i < data['body'].length; i++) {
                    provincias[i] = data['body'][i];
                }
            });
        this.provincias = provincias;

        this.productosPresupuestoPedidosService.query1(idPresu).subscribe(data => {
            this.productosPresupuestoPedidosService.todos = data.body;
        });
        this.presupuestoPedidoService.find(idPresu).subscribe(data => {
            var usuario = data.body.user;
            this.datosUsuarioService
                .query({
                    size: 1000000
                })
                .subscribe(data => {
                    for (let b = 0; b < data.body.length; b++) {
                        if (data.body[b]['user'] != null) {
                            if (data.body[b]['user']['id'] == usuario['id']) {
                                tienda = data.body[b];
                                this.datosUsuarioService.tiendaCargadaPresu = tienda;
                                this.precioTiendaService.findBus(this.datosUsuarioService.tiendaCargadaPresu.id).subscribe(data => {
                                    this.precioPunto = data.body;
                                    this.precioTiendaService.findBus1(this.datosUsuarioService.tiendaCargadaPresu.id, 1).subscribe(data => {
                                        this.precioTiendaService.precioTienda = data.body;
                                        this.soloMedBuen();
                                    });
                                });
                            }
                        }
                    }
                });
        });

        var tienda = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
    }

    public cargarMunicipios() {
        var idProv = $('#provincia').val();
        $('#municipios').empty();
        $('#municipios').append('<option></option>');
        this.municipiosService.query1({}).subscribe(data => {
            for (let i = 0; i < data['body'].length; i++) {
                if (data['body'][i]['provincias']['id'] == idProv) {
                    $('#municipios').append('<option value="' + data['body'][i]['id'] + '">' + data['body'][i]['nombre'] + '</option>');
                }
            }
        });
    }

    public provinciasCargar() {
        this.provinciasService
            .query({
                size: 100000
            })
            .subscribe(data => {
                for (let i = 0; i < data['body'].length; i++) {
                    $('#provincia').append('<option value="' + data['body'][i]['id'] + '">' + data['body'][i]['nombre'] + '</option>');
                }
            });
    }
    public descuento() {
        var valor;
        var precioNormal = parseFloat($('#precioSubtotal').text());
        valor = $('#descuentoPago').val();
        valor = parseFloat(valor);
        valor = valor / 100;
        var cuenta = precioNormal * valor;
        $('#cuentatextodivDescuento').css({ display: 'block' });
        $('#meterQuitadoDescuento').text(cuenta.toFixed(2));
        cuenta = precioNormal - cuenta;
        var iva = cuenta * 0.21;
        $('#ivaPrecioQuitar').text(iva.toFixed(2) + ' €');
        var todo = iva + cuenta;
        $('#precioIvaSumado').text(todo.toFixed(2) + ' €');
    }

    public pago() {
        var id = $('.tipoPago').val();

        this.pagosTiendaService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IPagosTienda[]>) => {
                    for (let i = 0; i < res.body.length; i++) {
                        if (res.body[i]['id'] == id) {
                            var arr = res.body[i]['descuento'].split('%');
                            console.log(arr);
                            $('#descuentoPago').attr('max', arr[0]);
                        }
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
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

    protected subscribeToSaveResponse2(result: Observable<HttpResponse<IContactoFabrica>>) {
        result.subscribe((res: HttpResponse<IContactoFabrica>) => this.onSaveSuccess2(), (res: HttpErrorResponse) => this.onSaveError2());
    }

    public onSaveSuccess2() {
        this.isSaving = false;
        var ultimo;
        this.contactoFabricaService
            .query({
                size: 1000000
            })
            .subscribe(
                (res: HttpResponse<IContactoFabrica[]>) => {
                    ultimo = res.body.length;
                    ultimo = ultimo - 1;
                    this.router.navigate(['/contacto-fabrica', res.body[ultimo]['id'], 'chat']);
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    protected onSaveError2() {
        this.isSaving = false;
    }
}

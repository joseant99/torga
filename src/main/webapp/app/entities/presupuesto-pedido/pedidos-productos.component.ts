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
    selector: 'jhi-pedidos-productos',
    templateUrl: './pedidos-productos.component.html'
})
export class PedidosProductosComponent implements OnInit, OnDestroy, AfterViewInit {
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
                                                        ' pp</span></p>'
                                                );
                                                $('#precioTotal' + (cont - 1)).text(
                                                    datosInteriores[p]['presupuestoArmario']['precioTotal']
                                                );
                                                var cogerlo = parseFloat($('#precioTotal' + (cont - 1)).text());
                                                var precioTotal = parseFloat($('#totalDescuentoTexto').text());
                                                precioTotal = cogerlo + precioTotal;
                                                $('#totalDescuentoTexto').text(precioTotal.toFixed(2));

                                                var ivaTodo = precioTotal * 0.21;
                                                $('#ivaPrecioQuitar').text(ivaTodo.toFixed(2) + ' pp');
                                                $('#precioIvaSumado').text((ivaTodo + precioTotal).toFixed(2) + ' pp');
                                            }

                                            precioTodo1 = precioTodo1 + datosInteriores[p]['precio'];
                                            if (datosInteriores[p]['mensajeLuz'] != null) {
                                                $('#datosMeter' + (cont - 1)).append(
                                                    '<p><strong>Interior ' +
                                                        datosInteriores[p]['productosDormitorio']['nombre'] +
                                                        '&nbsp;&nbsp;&nbsp;&nbsp;</strong><span>' +
                                                        datosInteriores[p]['mensajeLuz'] +
                                                        '</span><span>+ ' +
                                                        datosInteriores[p]['precio'] +
                                                        ' pp</span></p>'
                                                );
                                            } else {
                                                $('#datosMeter' + (cont - 1)).append(
                                                    '<p><strong>Interior ' +
                                                        datosInteriores[p]['productosDormitorio']['nombre'] +
                                                        '&nbsp;&nbsp;&nbsp;&nbsp;</strong><span>+ ' +
                                                        datosInteriores[p]['precio'] +
                                                        ' pp</span></p>'
                                                );
                                            }
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

                                        if ('8 PUERTAS ASIMETRICAS' == nombre) {
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

                                            var nombreInt = datosInteriores[3]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;margin-left: 327px;margin-top: -67px;position: absolute;z-index:47" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                                    nombreInt +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 365px;position: absolute;z-index:47;margin-top:248px;margin-left:327px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
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
                                                    ' pp</span></p>'
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
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
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
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
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
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
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

                                        if ('8 PUERTAS ASIMETRICAS' == nombre) {
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
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
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
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 109px;margin-top: 292px;" src="' +
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
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 218px;margin-top: 270px;" src="' +
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

                                            var tipo = data.body[6]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 327px;margin-top: 248px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 327px;margin-top: 248px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 327px;margin-top: 248px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 327px;margin-top: 248px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 327px;margin-top: 248px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 327px;margin-top: 248px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 327px;margin-top: 248px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 327px;margin-top: 248px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 327px;margin-top: 248px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 327px;margin-top: 248px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 327px;margin-top: 248px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 327px;margin-top: 248px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            var tipo = data.body[7]['productosDormitorio']['nombre'];

                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 327px;margin-top: 248px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 327px;margin-top: 248px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;opacity:0.4;margin-left: 327px;margin-top: 248px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 327px;margin-top: 248px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 327px;margin-top: 248px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 327px;margin-top: 248px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 327px;margin-top: 248px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 327px;margin-top: 248px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 327px;margin-top: 248px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle TIM Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 327px;margin-top: 248px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }

                                            if (tipo == '2 Puertas Fuelle NYE Izquierda') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 327px;margin-top: 248px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == '2 Puertas Fuelle NYE Derecha') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:365px;position:absolute;z-index:105;margin-left: 327px;margin-top: 248px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                        }

                                        if ('6 PUERTAS ASIMETRICAS' == nombre) {
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

                                            var tipo = data.body[0]['productosDormitorio']['nombre'];
                                            if (tipo == 'Puerta Aluminio Transparente') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;opacity:0.4;margin-top:260px;margin-left:272px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:260px;margin-left:272px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Aluminio Gris') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;opacity:0.4;margin-top:260px;margin-left:272px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                                var src1 =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:260px;margin-left:272px;" src="' +
                                                        src1 +
                                                        '">'
                                                );
                                            }

                                            if (tipo == 'Puerta Batiente sin tirador') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:260px;margin-left:272px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador TIM') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/4.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:260px;margin-left:272px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador NYE') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/6.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:260px;margin-left:272px;" src="' +
                                                        src +
                                                        '">'
                                                );
                                            }
                                            if (tipo == 'Puerta Batiente tirador DRAW') {
                                                var src =
                                                    '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/8.png';
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img class="armarioCalculadora" style="width:350px;position:absolute;z-index:105;margin-top:260px;margin-left:272px;" src="' +
                                                        src +
                                                        '">'
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
                                                    '<p>Luz&nbsp;&nbsp;&nbsp;' + iluminacion[j]['iluminacion']['precio'] + ' pp</p>'
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

                                                var nombreCargarImagen;
                                                if (idProdNombre == 277) {
                                                    nombreCargarImagen = 'NT007_NT022';
                                                }
                                                if (idProdNombre == 275) {
                                                    nombreCargarImagen = 'NT001_NT004';
                                                }
                                                if (idProdNombre == 276) {
                                                    nombreCargarImagen = 'NT005_NT006';
                                                }
                                                if (idProdNombre == 278) {
                                                    nombreCargarImagen = 'NT023_NT038';
                                                }
                                                if (idProdNombre == 279) {
                                                    nombreCargarImagen = 'NT039_NT054';
                                                }
                                                if (idProdNombre == 280) {
                                                    nombreCargarImagen = 'NT055_NT070';
                                                }
                                                if (idProdNombre == 281) {
                                                    nombreCargarImagen = 'NT071_NT078';
                                                }
                                                if (idProdNombre == 246) {
                                                    nombreCargarImagen = 'NT079_NT094';
                                                }
                                                if (idProdNombre == 282) {
                                                    nombreCargarImagen = 'NT095_NT110';
                                                }
                                                if (idProdNombre == 247) {
                                                    nombreCargarImagen = 'NT111_NT115';
                                                }
                                                if (idProdNombre == 249) {
                                                    nombreCargarImagen = 'NT116_NT123';
                                                }
                                                if (idProdNombre == 250) {
                                                    nombreCargarImagen = 'NT116_NT123';
                                                }
                                                if (idProdNombre == 248) {
                                                    nombreCargarImagen = 'NT124_NT143';
                                                }
                                                if (idProdNombre == 251) {
                                                    nombreCargarImagen = 'NT144_NT148';
                                                }
                                                if (idProdNombre == 253) {
                                                    nombreCargarImagen = 'NT149_NT156';
                                                }
                                                if (idProdNombre == 254) {
                                                    nombreCargarImagen = 'NT149_NT156';
                                                }
                                                if (idProdNombre == 252) {
                                                    nombreCargarImagen = 'NT157_NT176';
                                                }
                                                if (idProdNombre == 255) {
                                                    nombreCargarImagen = 'NT177_NT181';
                                                }
                                                if (idProdNombre == 257) {
                                                    nombreCargarImagen = 'NT182_NT189';
                                                }
                                                if (idProdNombre == 258) {
                                                    nombreCargarImagen = 'NT182_NT189';
                                                }
                                                if (idProdNombre == 256) {
                                                    nombreCargarImagen = 'NT190_NT209';
                                                }
                                                if (idProdNombre == 259) {
                                                    nombreCargarImagen = 'NT210_NT211';
                                                }
                                                if (idProdNombre == 261) {
                                                    nombreCargarImagen = 'NT212_NT219';
                                                }
                                                if (idProdNombre == 262) {
                                                    nombreCargarImagen = 'NT212_NT219';
                                                }
                                                if (idProdNombre == 260) {
                                                    nombreCargarImagen = 'NT220_NT227';
                                                }

                                                if (idProdNombre == 263) {
                                                    nombreCargarImagen = 'NT228_NT229';
                                                }
                                                if (idProdNombre == 266) {
                                                    nombreCargarImagen = 'NT230_NT237';
                                                }
                                                if (idProdNombre == 265) {
                                                    nombreCargarImagen = 'NT230_NT237';
                                                }
                                                if (idProdNombre == 264) {
                                                    nombreCargarImagen = 'NT238_NT245';
                                                }

                                                if (idProdNombre == 271) {
                                                    nombreCargarImagen = 'NT246_NT250';
                                                }
                                                if (idProdNombre == 274) {
                                                    nombreCargarImagen = 'NT251_NT258';
                                                }
                                                if (idProdNombre == 273) {
                                                    nombreCargarImagen = 'NT251_NT258';
                                                }
                                                if (idProdNombre == 272) {
                                                    nombreCargarImagen = 'NT259_NT278';
                                                }

                                                if (idProdNombre == 267) {
                                                    nombreCargarImagen = 'NT279_NT280';
                                                }
                                                if (idProdNombre == 269) {
                                                    nombreCargarImagen = 'NT281_NT288';
                                                }
                                                if (idProdNombre == 270) {
                                                    nombreCargarImagen = 'NT281_NT288';
                                                }
                                                if (idProdNombre == 268) {
                                                    nombreCargarImagen = 'NT289_NT296';
                                                }

                                                if (idProdNombre == 283) {
                                                    nombreCargarImagen = 'NT297_NT314';
                                                }
                                                if (idProdNombre == 284) {
                                                    nombreCargarImagen = 'NT315_NT332';
                                                }
                                                if (idProdNombre == 285) {
                                                    nombreCargarImagen = 'NT333_NT350';
                                                }
                                                if (idProdNombre == 1) {
                                                    nombreCargarImagen = 'NX009_NX012';
                                                }
                                                if (idProdNombre == 2) {
                                                    nombreCargarImagen = 'NX009_NX012';
                                                }
                                                if (idProdNombre == 3) {
                                                    nombreCargarImagen = 'NX009_NX012';
                                                }
                                                if (idProdNombre == 4) {
                                                    nombreCargarImagen = 'NX013_NX016';
                                                }
                                                if (idProdNombre == 5) {
                                                    nombreCargarImagen = 'NX017_NX020';
                                                }
                                                if (idProdNombre == 6) {
                                                    nombreCargarImagen = 'NX021_NX024';
                                                }
                                                if (idProdNombre == 7) {
                                                    nombreCargarImagen = 'NX025_NX028';
                                                }
                                                if (idProdNombre == 8) {
                                                    nombreCargarImagen = 'NX029_NX032';
                                                }
                                                if (idProdNombre == 9) {
                                                    nombreCargarImagen = 'NX033_NX036';
                                                }
                                                if (idProdNombre == 10) {
                                                    nombreCargarImagen = 'NX037_NX040';
                                                }
                                                if (idProdNombre == 11) {
                                                    nombreCargarImagen = 'NX041_NX044';
                                                }
                                                if (idProdNombre == 12) {
                                                    nombreCargarImagen = 'NX045_NX048';
                                                }
                                                if (idProdNombre == 13) {
                                                    nombreCargarImagen = 'NX049_NX052';
                                                }
                                                if (idProdNombre == 229) {
                                                    nombreCargarImagen = 'NX053';
                                                }
                                                if (idProdNombre == 239) {
                                                    nombreCargarImagen = 'NX058_NX061';
                                                }
                                                if (idProdNombre == 240) {
                                                    nombreCargarImagen = 'NX062_NX065';
                                                }
                                                if (idProdNombre == 241) {
                                                    nombreCargarImagen = 'NX066_NX069';
                                                }
                                                if (idProdNombre == 107) {
                                                    nombreCargarImagen = 'NH001-NH006';
                                                }
                                                if (idProdNombre == 108) {
                                                    nombreCargarImagen = 'NH011-NH014';
                                                }
                                                if (idProdNombre == 109) {
                                                    nombreCargarImagen = 'NH015-NH016';
                                                }

                                                if (idProdNombre == 295) {
                                                    nombreCargarImagen = 'NH017-NH018';
                                                }
                                                if (idProdNombre == 296) {
                                                    nombreCargarImagen = 'NH019-NH020';
                                                }
                                                if (idProdNombre == 111) {
                                                    nombreCargarImagen = 'NH021-NH024';
                                                }
                                                if (idProdNombre == 110) {
                                                    nombreCargarImagen = 'NH025_NH028';
                                                }
                                                if (idProdNombre == 113) {
                                                    nombreCargarImagen = 'NH029_NH032';
                                                }
                                                if (idProdNombre == 112) {
                                                    nombreCargarImagen = 'NH033_NH036';
                                                }
                                                if (idProdNombre == 114) {
                                                    nombreCargarImagen = 'NH037_NH041';
                                                }
                                                if (idProdNombre == 116) {
                                                    nombreCargarImagen = 'NH042_NH045';
                                                }
                                                if (idProdNombre == 115) {
                                                    nombreCargarImagen = 'NH046_NH049';
                                                }
                                                if (idProdNombre == 298) {
                                                    nombreCargarImagen = 'NH050_NH051';
                                                }
                                                if (idProdNombre == 297) {
                                                    nombreCargarImagen = 'NH052_NH053';
                                                }
                                                if (idProdNombre == 118) {
                                                    nombreCargarImagen = 'NH054_NH057';
                                                }
                                                if (idProdNombre == 117) {
                                                    nombreCargarImagen = 'NH058_NH061';
                                                }
                                                if (idProdNombre == 119) {
                                                    nombreCargarImagen = 'NH062_NH066';
                                                }
                                                if (idProdNombre == 299) {
                                                    nombreCargarImagen = 'NH067_NH069';
                                                }
                                                if (idProdNombre == 301) {
                                                    nombreCargarImagen = 'NH070_NH071';
                                                }
                                                if (idProdNombre == 300) {
                                                    nombreCargarImagen = 'NH072_NH073';
                                                }
                                                if (idProdNombre == 302) {
                                                    nombreCargarImagen = 'NH074_NH077';
                                                }
                                                if (idProdNombre == 334) {
                                                    nombreCargarImagen = 'NH078_NH079';
                                                }
                                                if (idProdNombre == 303) {
                                                    nombreCargarImagen = 'NH080_NH081';
                                                }
                                                if (idProdNombre == 14) {
                                                    nombreCargarImagen = 'NH082_NH083';
                                                }
                                                if (idProdNombre == 304) {
                                                    nombreCargarImagen = 'NH084';
                                                }
                                                if (idProdNombre == 53) {
                                                    nombreCargarImagen = 'NH085';
                                                }
                                                if (idProdNombre == 305) {
                                                    nombreCargarImagen = 'NH086_NH088';
                                                }
                                                if (idProdNombre == 62) {
                                                    nombreCargarImagen = 'NH089_NH091';
                                                }
                                                if (idProdNombre == 306) {
                                                    nombreCargarImagen = 'NH092_NH094';
                                                }
                                                if (idProdNombre == 63) {
                                                    nombreCargarImagen = 'NH095_NH097';
                                                }
                                                if (idProdNombre == 307) {
                                                    nombreCargarImagen = 'NH098_NH100';
                                                }
                                                if (idProdNombre == 64) {
                                                    nombreCargarImagen = 'NH101_NH103';
                                                }
                                                if (idProdNombre == 308) {
                                                    nombreCargarImagen = 'NH104_NH106';
                                                }
                                                if (idProdNombre == 65) {
                                                    nombreCargarImagen = 'NH107_NH109';
                                                }
                                                if (idProdNombre == 308) {
                                                    nombreCargarImagen = 'NH104_NH106';
                                                }
                                                if (idProdNombre == 65) {
                                                    nombreCargarImagen = 'NH107_NH109';
                                                }
                                                if (idProdNombre == 309) {
                                                    nombreCargarImagen = 'NH110_NH112';
                                                }
                                                if (idProdNombre == 66) {
                                                    nombreCargarImagen = 'NH113_NH115';
                                                }
                                                if (idProdNombre == 310) {
                                                    nombreCargarImagen = 'NH116_NH118';
                                                }
                                                if (idProdNombre == 67) {
                                                    nombreCargarImagen = 'NH119_NH121';
                                                }
                                                if (idProdNombre == 311) {
                                                    nombreCargarImagen = 'NH122_NH124';
                                                }
                                                if (idProdNombre == 68) {
                                                    nombreCargarImagen = 'NH125_NH127';
                                                }
                                                if (idProdNombre == 171) {
                                                    nombreCargarImagen = 'NH136';
                                                }
                                                if (idProdNombre == 172) {
                                                    nombreCargarImagen = 'NH137';
                                                }
                                                if (idProdNombre == 173) {
                                                    nombreCargarImagen = 'NH138';
                                                }
                                                if (idProdNombre == 73) {
                                                    nombreCargarImagen = 'NH139_NH140';
                                                }
                                                if (idProdNombre == 72) {
                                                    nombreCargarImagen = 'NH141_NH142';
                                                }
                                                if (idProdNombre == 75) {
                                                    nombreCargarImagen = 'NH143';
                                                }
                                                if (idProdNombre == 74) {
                                                    nombreCargarImagen = 'NH144';
                                                }
                                                if (idProdNombre == 87) {
                                                    nombreCargarImagen = 'NH145';
                                                }
                                                if (idProdNombre == 86) {
                                                    nombreCargarImagen = 'NH146';
                                                }
                                                if (idProdNombre == 77) {
                                                    nombreCargarImagen = 'NH147';
                                                }
                                                if (idProdNombre == 76) {
                                                    nombreCargarImagen = 'NH148';
                                                }
                                                if (idProdNombre == 313) {
                                                    nombreCargarImagen = 'NH149';
                                                }
                                                if (idProdNombre == 79) {
                                                    nombreCargarImagen = 'NH152';
                                                }
                                                if (idProdNombre == 319) {
                                                    nombreCargarImagen = 'NH154';
                                                }
                                                if (idProdNombre == 320) {
                                                    nombreCargarImagen = 'NH156';
                                                }
                                                if (idProdNombre == 325) {
                                                    nombreCargarImagen = 'NH168';
                                                }
                                                if (idProdNombre == 320) {
                                                    nombreCargarImagen = 'NH179';
                                                }
                                                if (idProdNombre == 89) {
                                                    nombreCargarImagen = 'NH189';
                                                }
                                                if (idProdNombre == 88) {
                                                    nombreCargarImagen = 'NH190';
                                                }
                                                if (idProdNombre == 322) {
                                                    nombreCargarImagen = 'NH191';
                                                }
                                                if (idProdNombre == 80) {
                                                    nombreCargarImagen = 'NH194';
                                                }
                                                if (idProdNombre == 316) {
                                                    nombreCargarImagen = 'NH195';
                                                }
                                                if (idProdNombre == 81) {
                                                    nombreCargarImagen = 'NH196';
                                                }
                                                if (idProdNombre == 174) {
                                                    nombreCargarImagen = 'NH197';
                                                }
                                                if (idProdNombre == 175) {
                                                    nombreCargarImagen = 'NH198';
                                                }

                                                if (idProdNombre == 177) {
                                                    nombreCargarImagen = 'NH234-NH235';
                                                }
                                                if (idProdNombre == 178) {
                                                    nombreCargarImagen = 'NH236-NH240';
                                                }
                                                if (idProdNombre == 179) {
                                                    nombreCargarImagen = 'NH241-NH245';
                                                }
                                                if (idProdNombre == 159) {
                                                    nombreCargarImagen = 'NH246';
                                                }
                                                if (idProdNombre == 158) {
                                                    nombreCargarImagen = 'NH247';
                                                }
                                                if (idProdNombre == 161) {
                                                    nombreCargarImagen = 'NH248';
                                                }
                                                if (idProdNombre == 160) {
                                                    nombreCargarImagen = 'NH249';
                                                }
                                                if (idProdNombre == 163) {
                                                    nombreCargarImagen = 'NH250';
                                                }
                                                if (idProdNombre == 162) {
                                                    nombreCargarImagen = 'NH251';
                                                }
                                                if (idProdNombre == 165) {
                                                    nombreCargarImagen = 'NH258';
                                                }
                                                if (idProdNombre == 164) {
                                                    nombreCargarImagen = 'NH259';
                                                }
                                                if (idProdNombre == 167) {
                                                    nombreCargarImagen = 'NH268';
                                                }
                                                if (idProdNombre == 166) {
                                                    nombreCargarImagen = 'NH269';
                                                }
                                                if (idProdNombre == 169) {
                                                    nombreCargarImagen = 'NH270';
                                                }
                                                if (idProdNombre == 168) {
                                                    nombreCargarImagen = 'NH271';
                                                }
                                                if (idProdNombre == 170) {
                                                    nombreCargarImagen = 'NH272';
                                                }
                                                if (idProdNombre == 180) {
                                                    nombreCargarImagen = 'NH279_NH280';
                                                }
                                                if (idProdNombre == 181) {
                                                    nombreCargarImagen = 'NH281_NH282';
                                                }
                                                if (idProdNombre == 182) {
                                                    nombreCargarImagen = 'NH283';
                                                }
                                                if (idProdNombre == 183) {
                                                    nombreCargarImagen = 'NH284';
                                                }
                                                if (idProdNombre == 184) {
                                                    nombreCargarImagen = 'NH289_NH293';
                                                }
                                                if (idProdNombre == 185) {
                                                    nombreCargarImagen = 'NH294_NH298';
                                                }
                                                if (idProdNombre == 186) {
                                                    nombreCargarImagen = 'NH299_NH303';
                                                }
                                                if (idProdNombre == 188) {
                                                    nombreCargarImagen = 'NH304_NH308';
                                                }

                                                if (idProdNombre == 187) {
                                                    nombreCargarImagen = 'NH309_NH313';
                                                }
                                                if (idProdNombre == 189) {
                                                    nombreCargarImagen = 'NH314_NH318';
                                                }
                                                if (idProdNombre == 194) {
                                                    nombreCargarImagen = 'NH319_NH320';
                                                }
                                                if (idProdNombre == 190) {
                                                    nombreCargarImagen = 'NH321_NH322';
                                                }
                                                if (idProdNombre == 195) {
                                                    nombreCargarImagen = 'NH323_NH324';
                                                }
                                                if (idProdNombre == 191) {
                                                    nombreCargarImagen = 'NH325_NH326';
                                                }
                                                if (idProdNombre == 196) {
                                                    nombreCargarImagen = 'NH327_NH331';
                                                }
                                                if (idProdNombre == 200) {
                                                    nombreCargarImagen = 'NH332_NH336';
                                                }
                                                if (idProdNombre == 192) {
                                                    nombreCargarImagen = 'NH337_NH341';
                                                }
                                                if (idProdNombre == 198) {
                                                    nombreCargarImagen = 'NH342_NH346';
                                                }
                                                if (idProdNombre == 197) {
                                                    nombreCargarImagen = 'NH347_NH351';
                                                }
                                                if (idProdNombre == 201) {
                                                    nombreCargarImagen = 'NH352_NH356';
                                                }
                                                if (idProdNombre == 193) {
                                                    nombreCargarImagen = 'NH357_NH361';
                                                }
                                                if (idProdNombre == 199) {
                                                    nombreCargarImagen = 'NH362_NH366';
                                                }
                                                if (idProdNombre == 203) {
                                                    nombreCargarImagen = 'NH372_NH373';
                                                }
                                                if (idProdNombre == 204) {
                                                    nombreCargarImagen = 'NH455_NH458';
                                                }
                                                if (idProdNombre == 333) {
                                                    nombreCargarImagen = 'NH461';
                                                }
                                                if (idProdNombre == 206) {
                                                    nombreCargarImagen = 'NH462';
                                                }
                                                if (idProdNombre == 207) {
                                                    nombreCargarImagen = 'NH463_NH468';
                                                }
                                                if (idProdNombre == 208) {
                                                    nombreCargarImagen = 'NH469_NH474';
                                                }
                                                if (idProdNombre == 209) {
                                                    nombreCargarImagen = 'NH475_NH480';
                                                }
                                                if (idProdNombre == 210) {
                                                    nombreCargarImagen = 'NH481_NH486';
                                                }
                                                if (idProdNombre == 211) {
                                                    nombreCargarImagen = 'NH487_NH492';
                                                }
                                                if (idProdNombre == 213) {
                                                    nombreCargarImagen = 'NH493_NH496';
                                                }
                                                if (idProdNombre == 214) {
                                                    nombreCargarImagen = 'NH493_NH496';
                                                }
                                                if (idProdNombre == 215) {
                                                    nombreCargarImagen = 'NH497_NH500';
                                                }
                                                if (idProdNombre == 216) {
                                                    nombreCargarImagen = 'NH497_NH500';
                                                }
                                                if (idProdNombre == 217) {
                                                    nombreCargarImagen = 'NH501_NH502';
                                                }
                                                if (idProdNombre == 218) {
                                                    nombreCargarImagen = 'NH503';
                                                }
                                                if (idProdNombre == 219) {
                                                    nombreCargarImagen = 'NH504';
                                                }
                                                if (idProdNombre == 220) {
                                                    nombreCargarImagen = 'NH505';
                                                }
                                                if (idProdNombre == 221) {
                                                    nombreCargarImagen = 'NH506';
                                                }

                                                if (idProdNombre == 222) {
                                                    nombreCargarImagen = 'NH507_NH510';
                                                }
                                                if (contador == 1) {
                                                    $('#imagen' + i).append(
                                                        '<img style="z-index:' +
                                                            (100 - i) +
                                                            ';max-width:400px;max-height:400px;;max-width:410px;max-height:410px;" width="1000px" height="1000px" src="../../../content/images/1- PARA WEB/DORMITORIO/' +
                                                            nombreCargarImagen +
                                                            '.jpg">'
                                                    );
                                                }
                                                contador++;
                                            }
                                        }
                                        var precioTotProd = productos[w]['precioTotal'];
                                        var subTotal = parseFloat($('#precioSubtotal').text());
                                        subTotal = subTotal + precioTotProd;
                                        $('#precioSubtotal').text(subTotal.toFixed(2));
                                        $('#totalDescuentoTexto').text(subTotal.toFixed(2));

                                        if (productos[w]['tiposApoyo'] != null) {
                                            apoyo = productos[w]['tiposApoyo'];
                                        }
                                        var luz = undefined;
                                        if (productos[w]['iluminacion'] != undefined) {
                                            luz = productos[w]['iluminacion'];
                                        }
                                        var usb = undefined;
                                        if (productos[w]['usb'] != undefined) {
                                            usb = productos[w]['usb'];
                                        }

                                        if (luz != undefined) {
                                            $('.' + productos[i]['id'] + 'Datos').append(
                                                '<p>Luz: &nbsp;&nbsp;&nbsp; <span id="precioLuz' +
                                                    i +
                                                    '">' +
                                                    luz['precio'] +
                                                    '</span> pp</p>'
                                            );
                                            var precioTotal = $('.' + productos[i]['id'] + 'Datos #precioTotal' + i).text();
                                            if (precioTotal != '') {
                                                var precioFloat = parseFloat(precioTotal);
                                            }
                                            var precioTotProd = productos[w]['precioTotal'];
                                            var precioLuz = luz['precio'];
                                            precioLuz = precioLuz * 1;
                                            precioFloat = precioFloat + precioLuz;
                                            var subTotal = parseFloat($('#precioSubtotal').text());
                                            subTotal = subTotal + precioFloat;

                                            $('.' + productos[i]['id'] + 'Datos #precioTotal' + i).text(precioTotProd.toFixed(2));
                                        }

                                        if (usb != undefined) {
                                            $('.' + productos[i]['id'] + 'Datos').append(
                                                '<p>' +
                                                    usb['mensaje'] +
                                                    ': &nbsp;&nbsp;&nbsp; <span id="precioUsb' +
                                                    i +
                                                    '">' +
                                                    usb['precio'] +
                                                    '</span> pp</p>'
                                            );
                                            var precioTotal = $('.' + productos[i]['id'] + 'Datos #precioTotal' + i).text();
                                            var precioFloat = 0;
                                            var precioLuz = usb['precio'];
                                            var precioTotProd = productos[w]['precioTotal'];
                                            precioLuz = precioLuz * 1;
                                            precioFloat = precioFloat + precioLuz;
                                            var subTotal = parseFloat($('#precioSubtotal').text());
                                            subTotal = subTotal + precioFloat;

                                            $('.' + productos[i]['id'] + 'Datos #precioTotal' + i).text(precioTotProd.toFixed(2));
                                        }

                                        if (apoyo != undefined) {
                                            $('.' + productos[i]['id'] + 'Datos').append(
                                                '<p>' +
                                                    apoyo['productoApoyo']['nombre'] +
                                                    '&nbsp;&nbsp;&nbsp; <span id="precioApoyo' +
                                                    i +
                                                    '">' +
                                                    apoyo['precio'] +
                                                    '</span> pp</p>'
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
                                            var todoApoyo = apoyo['productoApoyo'];
                                            for (let s = 0; s < apoyoPrecios.length; s++) {
                                                if (apoyoPrecios[s][2] == todoApoyo['id']) {
                                                    var precioApo = precioModulosBajos[s][1];
                                                    precioApo = precioApo / 100 + 1;
                                                }
                                            }
                                            precioProd = olauseleles;
                                            precioApo = yeahburi;
                                            var precioApoyo = apoyo['precio'];
                                            precioApoyo = precioApoyo * precioPunto;
                                            precioFloat = precioFloat + precioApoyo;
                                            var subTotal = parseFloat($('#precioSubtotal').text());
                                            subTotal = subTotal + precioFloat;

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

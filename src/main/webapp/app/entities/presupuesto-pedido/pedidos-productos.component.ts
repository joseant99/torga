import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { Observable } from 'rxjs';
import { IPresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';
import { jsPDF } from 'jspdf';
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
import { ImagenDeCestaProdService } from '../imagen-de-cesta-prod/imagen-de-cesta-prod.service';
import { VistaAdminService } from '../vista-admin/vista-admin.service';
import { JhiMainComponent } from '../../layouts/main/main.component';
@Component({
    providers: [JhiMainComponent],
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
    arraysaberimagenes: any;
    tiendaCargadaPresu: any;
    singulares: any;
    vitrinas: any;
    currentFileUploadExcel: File;
    selectedFilesExcel: FileList;
    iddelpedido: any;
    nombrearchivoadjunto: any;
    iddefactura: any;
    tieneObservacion: any;
    progressExcel: { percentage: number } = { percentage: 0 };
    constructor(
        protected productosPresupuestoPedidosService: ProductosPresupuestoPedidosService,
        public presupuestoArmarioPuertasService: PresupuestoArmarioPuertasService,
        public presupuestoArmarioInterioresService: PresupuestoArmarioInterioresService,
        public presupuestoPedidoService: PresupuestoPedidoService,
        protected dimensionesProductoTipoService: DimensionesProductoTipoService,
        protected contactoFabricaService: ContactoFabricaService,
        public precioFinalPresuService: PrecioFinalPresuService,
        protected iluminacionProdPrePedService: IluminacionProdPrePedService,
        protected parseLinks: JhiParseLinks,
        protected precioTiendaService: PrecioTiendaService,
        protected direccionTiendasService: DireccionTiendasService,
        protected precioTiendaProductosService: PrecioTiendaProductosService,
        protected jhiAlertService: JhiAlertService,
        protected provinciasService: ProvinciasService,
        protected municipiosService: MunicipiosService,
        protected datosClienteService: DatosClienteService,
        protected vistaadminService: VistaAdminService,
        public datosUsuarioService: DatosUsuarioService,
        protected pagosTiendaService: PagosTiendaService,
        protected mainComponent: JhiMainComponent,
        protected presupuestoArmarioService: PresupuestoArmarioService,
        protected acabadosProductosPresupuestoPedidoService: AcabadosProductosPresupuestoPedidoService,
        protected accountService: AccountService,
        protected medEspProductoPedidoPresuService: MedEspProductoPedidoPresuService,
        protected activatedRoute: ActivatedRoute,
        protected imagenDeCestaProdService: ImagenDeCestaProdService,
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

    selectFileExcel(event) {
        var presu;
        presu = sessionStorage.getItem('presupuesto');
        this.selectedFilesExcel = event.target.files;
    }

    public pushFileToStorageExcelftp() {
        var dato_archivo = $('#inputfilecoger').prop('files')[0];
        this.vistaadminService.pushFileToStorageExcelftp(dato_archivo, dato_archivo.name).subscribe(event => {
            if (event['status'] == 200) {
                console.log(event);
                var presu = this.productosPresupuestoPedidos[0]['presupuestoPedido'];
                presu['archivoAdjunto'] = dato_archivo.name;
                $('#modalnoestasubidoarchivo').css({ display: 'none' });
                $('#botonarchivosubido').css({ display: 'block' });
                this.nombrearchivoadjunto = this.productosPresupuestoPedidos[0]['presupuestoPedido']['archivoAdjunto'];
                this.subscribeToSaveResponse5(this.presupuestoPedidoService.update(presu));
            }
        });
    }

    public aparadescargarpdf() {
        var prueba = this.arraysaberimagenes;
        if (prueba.length == 2) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
        }
        if (prueba.length == 3) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
        }
        if (prueba.length == 4) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
            $('.paraverespacio2').css({ 'margin-bottom': '65px' });
            $('.paraverespacio3').css({ 'margin-top': '30px' });
        }
        if (prueba.length == 5) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
            $('.paraverespacio2').css({ 'margin-bottom': '65px' });
            $('.paraverespacio3').css({ 'margin-top': '30px' });
            $('.paraverespacio3').css({ 'margin-bottom': '60px' });
            $('.paraverespacio4').css({ 'margin-top': '35px' });
        }
        if (prueba.length == 6) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
            $('.paraverespacio2').css({ 'margin-bottom': '65px' });
            $('.paraverespacio3').css({ 'margin-top': '30px' });
            $('.paraverespacio3').css({ 'margin-bottom': '60px' });
            $('.paraverespacio4').css({ 'margin-top': '35px' });
            $('.paraverespacio4').css({ 'margin-bottom': '65px' });
            $('.paraverespacio5').css({ 'margin-top': '30px' });
        }
        if (prueba.length == 5) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
            $('.paraverespacio2').css({ 'margin-bottom': '65px' });
            $('.paraverespacio3').css({ 'margin-top': '35px' });
            $('.paraverespacio3').css({ 'margin-bottom': '65px' });
            $('.paraverespacio4').css({ 'margin-top': '35px' });
            $('.paraverespacio4').css({ 'margin-bottom': '65px' });
            $('.paraverespacio5').css({ 'margin-top': '30px' });
        }
        if (prueba.length == 7) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
            $('.paraverespacio2').css({ 'margin-bottom': '65px' });
            $('.paraverespacio3').css({ 'margin-top': '35px' });
            $('.paraverespacio3').css({ 'margin-bottom': '65px' });
            $('.paraverespacio4').css({ 'margin-top': '35px' });
            $('.paraverespacio4').css({ 'margin-bottom': '65px' });
            $('.paraverespacio5').css({ 'margin-top': '30px' });
            $('.paraverespacio5').css({ 'margin-bottom': '60px' });
            $('.paraverespacio6').css({ 'margin-top': '35px' });
            $('.paraverespacio6').css({ 'margin-bottom': '65px' });
            $('.paraverespacio7').css({ 'margin-top': '30px' });
        }
        if (prueba.length == 8) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
            $('.paraverespacio2').css({ 'margin-bottom': '65px' });
            $('.paraverespacio3').css({ 'margin-top': '35px' });
            $('.paraverespacio3').css({ 'margin-bottom': '65px' });
            $('.paraverespacio4').css({ 'margin-top': '35px' });
            $('.paraverespacio4').css({ 'margin-bottom': '65px' });
            $('.paraverespacio5').css({ 'margin-top': '35px' });
            $('.paraverespacio5').css({ 'margin-bottom': '65px' });
            $('.paraverespacio6').css({ 'margin-top': '35px' });
            $('.paraverespacio6').css({ 'margin-bottom': '65px' });
            $('.paraverespacio7').css({ 'margin-top': '35px' });
            $('.paraverespacio7').css({ 'margin-bottom': '65px' });
            $('.paraverespacio8').css({ 'margin-top': '35px' });
        }
        if (prueba.length == 9) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
            $('.paraverespacio2').css({ 'margin-bottom': '65px' });
            $('.paraverespacio3').css({ 'margin-top': '35px' });
            $('.paraverespacio3').css({ 'margin-bottom': '65px' });
            $('.paraverespacio4').css({ 'margin-top': '35px' });
            $('.paraverespacio4').css({ 'margin-bottom': '65px' });
            $('.paraverespacio5').css({ 'margin-top': '35px' });
            $('.paraverespacio5').css({ 'margin-bottom': '65px' });
            $('.paraverespacio6').css({ 'margin-top': '35px' });
            $('.paraverespacio6').css({ 'margin-bottom': '65px' });
            $('.paraverespacio7').css({ 'margin-top': '35px' });
            $('.paraverespacio7').css({ 'margin-bottom': '65px' });
            $('.paraverespacio8').css({ 'margin-top': '35px' });
            $('.paraverespacio8').css({ 'margin-bottom': '65px' });
            $('.paraverespacio9').css({ 'margin-top': '35px' });
        }
        if (prueba.length == 12) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
            $('.paraverespacio2').css({ 'margin-bottom': '65px' });
            $('.paraverespacio3').css({ 'margin-top': '35px' });
            $('.paraverespacio3').css({ 'margin-bottom': '65px' });
            $('.paraverespacio4').css({ 'margin-top': '35px' });
            $('.paraverespacio4').css({ 'margin-bottom': '65px' });
            $('.paraverespacio5').css({ 'margin-top': '35px' });
            $('.paraverespacio5').css({ 'margin-bottom': '65px' });
            $('.paraverespacio6').css({ 'margin-top': '35px' });
            $('.paraverespacio6').css({ 'margin-bottom': '65px' });
            $('.paraverespacio7').css({ 'margin-top': '35px' });
            $('.paraverespacio7').css({ 'margin-bottom': '65px' });
            $('.paraverespacio8').css({ 'margin-top': '35px' });
            $('.paraverespacio8').css({ 'margin-bottom': '65px' });
            $('.paraverespacio9').css({ 'margin-top': '35px' });
            $('.paraverespacio9').css({ 'margin-bottom': '65px' });
            $('.paraverespacio10').css({ 'margin-top': '35px' });
            $('.paraverespacio10').css({ 'margin-bottom': '65px' });
            $('.paraverespacio11').css({ 'margin-top': '35px' });
            $('.paraverespacio11').css({ 'margin-bottom': '65px' });
            $('.paraverespacio12').css({ 'margin-top': '35px' });
        }
        if (prueba.length == 13) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
            $('.paraverespacio2').css({ 'margin-bottom': '65px' });
            $('.paraverespacio3').css({ 'margin-top': '35px' });
            $('.paraverespacio3').css({ 'margin-bottom': '65px' });
            $('.paraverespacio4').css({ 'margin-top': '35px' });
            $('.paraverespacio4').css({ 'margin-bottom': '65px' });
            $('.paraverespacio5').css({ 'margin-top': '35px' });
            $('.paraverespacio5').css({ 'margin-bottom': '65px' });
            $('.paraverespacio6').css({ 'margin-top': '35px' });
            $('.paraverespacio6').css({ 'margin-bottom': '65px' });
            $('.paraverespacio7').css({ 'margin-top': '35px' });
            $('.paraverespacio7').css({ 'margin-bottom': '65px' });
            $('.paraverespacio8').css({ 'margin-top': '35px' });
            $('.paraverespacio8').css({ 'margin-bottom': '65px' });
            $('.paraverespacio9').css({ 'margin-top': '35px' });
            $('.paraverespacio9').css({ 'margin-bottom': '65px' });
            $('.paraverespacio10').css({ 'margin-top': '35px' });
            $('.paraverespacio10').css({ 'margin-bottom': '65px' });
            $('.paraverespacio11').css({ 'margin-top': '35px' });
            $('.paraverespacio11').css({ 'margin-bottom': '65px' });
            $('.paraverespacio12').css({ 'margin-top': '35px' });
        }

        var divToPrint = document.getElementById('imprimir');

        var correoMensaje =
            '<html><head><style type="text/css">@page{size: A4;} .imagensolobotonimprimir{display:none} .imagensolobotonimprimir1{display:block} #estoparaesconderenmovilpc{display:block !important;} #esteDivPrueba0{margin-bottom: 0px !important;position: inherit;display: block !important;} #esteDivPrueba1{margin-top: 0px !important;margin-bottom: 0px !important;position: inherit;display: block !important;} #esteDivPrueba2{margin-top: 0px !important;margin-bottom: 0px !important;position: inherit;display: block !important;} #esteDivPrueba3{margin-top: 0px !important;margin-bottom: 0px !important;position: inherit;display: block !important;} #esteDivPrueba4{margin-top: 0px !important;margin-bottom: 0px !important;position: inherit;display: block !important;} #esteDivPrueba5{margin-top: 0px !important;margin-bottom: 0px !important;position: inherit;display: block !important;} #esteDivPrueba6{margin-top: 0px !important;margin-bottom: 0px !important;position: inherit;display: block !important;} #esteDivPrueba7{margin-top: 0px !important;margin-bottom: 0px !important;position: inherit;display: block !important;} #aquisoloparaimprimir{display:block !important;} #aquisoloparamostrar{display:none !important;} #divTotalPuntosParaTodo{display:none} #quitamoseldisplaydeldiv{display:block !important;} #divobservacionesparaimprimir{display:none} #divobservacionesparaimprimir1{border: 1px solid;float: left;width: 55%;display:block !important;} #pimprimirdatostexto{margin-top:4px !important; margin-bottom:4px !important;} #basesImponiblesDiv{display:block !important;float:left;width:12%;border: 1px solid;} .queremosquenosevea{display:block !important;} #divparaimagendatosmeter{float: left;display: block !important;width: 35% !important;height: 750px !important;border: 1px solid;} #divUnidadespedido{float: left;display: block !important;width: 9% !important;height: 750px !important;border: 1px solid;} #referenciapdivreferencia{FONT-SIZE: 14PX;MARGIN-TOP: 0;BORDER-BOTTOM: 1PX SOLID;TEXT-ALIGN: CENTER;BACKGROUND-COLOR: #2E2E2E;COLOR: WHITE;padding-top: 5px;padding-bottom: 3px;margin-bottom:5px;} #divreferenciapedido{float: left;display: block !important;width: 35% !important;height: 750px !important;margin-left: 8px !important;border: 1px solid;} #imagenlogopedidosprod{width: 10% !important;position: absolute !important;left: 2% !important;} #divderechapedidodatos{width: 25%;position: absolute;right: 2%;border: 1px solid;top: 5%;} #pmetidoimprimir{margin-top: 0;margin-bottom: 5px;margin-left: 10;} #metertamanotienda{margin-bottom: 2px;} #elultimopadentrop{margin-top: 2;} #metertamanotienda{margin-top:0;} #clienteDivTienda{margin-top: 40px;border: 1px solid;width: 49%;float: left;} #clienteDivDireccion{margin-top: 40px;border: 1px solid;width: 49%;float: left;margin-left:0.8%} #primeroMeterMargin{margin-top:-60px !important;} #clienteDiv{margin-top:0px !important;} #metertamanotienda{font-size:20px !important;} #divObserPoner{display:none} #esteDiv0{float:initial !important} #imagenPresupues{max-width:300px !important; max-height:300px !important;} #estoParaImprimir {float: left;width: 100%;} #datosMeter4 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter5 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #datosMeter6 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter7 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #datosMeter8 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter9 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #datosMeter10 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter11 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #datosMeter12 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter13 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #datosMeter14 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter15 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #datosMeter16 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter17 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #datosMeter18 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter19 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #datosMeter20 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter21 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;} #tapa {max-width:250px;max-height:183px} #datosMeter0 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #pNombreProd{display:none;} #datosMeter1 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #datosMeter2 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter3 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #spanobser{margin-top:0% !important;margin-left: 1% !important;font-size: 15px; } #textoObservaciones{margin-top:0% !important;display: block !important;float: left !important;margin-left: 1% !important;width: 80% !important;height: 45px !important;border: 0 !important;} .primerDivPresu{display:none} .estoesundivparaprobar{margin-top:0px !important; margin-bottom:0px !important;margin-top: 50px !important;float: initial;width: 100%;margin-bottom: 40px !important;position: inherit;display:block !important;} #imagen0{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen1{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen2{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen3{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen4{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen5{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen6{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen7{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen8{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen9{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen10{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen11{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen12{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen13{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen14{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen15{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen16{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen17{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen18{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #hrUltimo{ display: none} #logoPresu{max-width: 60px !important;position: absolute !important;margin-top: 100px !important;margin-left: 110px !important;} #idLineaDiv{display:none} #bajarFontSize{font-size:15px !important;} #totalDescuentoTexto{font-size:15px !important;} #euro{font-size:15px !important;} #bajarFontSize{font-size:15px !important;} #ivaPrecioQuitar{font-size:15px !important;} #bajarFontSize{font-size:15px !important;} #precioIvaSumado{font-size:15px !important;} #rightImprimir{float:right !important; right:0; text-align:right; width:100% !important;}</style><title>' +
            document.title +
            '</title></head><body "font-family: Lato , sans-serif;font-weight: 400;zoom:78% !important;-webkit-print-color-adjust:exact;">' +
            divToPrint.innerHTML +
            '</body></html>';

        this.vistaadminService.pushFileToStorageExcel2(correoMensaje).subscribe(event => {
            if (event['status'] == 200) {
                console.log(event);
                setTimeout(function() {
                    $('#aparadescargarpdf')[0].click();
                }, 1000);
            }
        });
    }

    public clicdescargarweb() {
        var nombre = this.nombrearchivoadjunto;
        var array = [];
        array = nombre.split('-');
        for (let i = 0; i < array.length; i++) {
            $('#descargararchivoswebsubidos').attr(
                'href',
                'https://pedidostorga:Torga56pedidos123.@pedidospdftorga.com/confirmaciones/' + array[i]
            );
            $('#descargararchivoswebsubidos')[0].click();
        }
    }

    public imprimir() {
        var prueba = this.arraysaberimagenes;
        if (prueba.length == 2) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
        }
        if (prueba.length == 3) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
        }
        if (prueba.length == 4) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
            $('.paraverespacio2').css({ 'margin-bottom': '65px' });
            $('.paraverespacio3').css({ 'margin-top': '30px' });
        }
        if (prueba.length == 5) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
            $('.paraverespacio2').css({ 'margin-bottom': '65px' });
            $('.paraverespacio3').css({ 'margin-top': '30px' });
            $('.paraverespacio3').css({ 'margin-bottom': '60px' });
            $('.paraverespacio4').css({ 'margin-top': '35px' });
        }
        if (prueba.length == 6) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
            $('.paraverespacio2').css({ 'margin-bottom': '65px' });
            $('.paraverespacio3').css({ 'margin-top': '30px' });
            $('.paraverespacio3').css({ 'margin-bottom': '60px' });
            $('.paraverespacio4').css({ 'margin-top': '35px' });
            $('.paraverespacio4').css({ 'margin-bottom': '65px' });
            $('.paraverespacio5').css({ 'margin-top': '30px' });
        }
        if (prueba.length == 5) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
            $('.paraverespacio2').css({ 'margin-bottom': '65px' });
            $('.paraverespacio3').css({ 'margin-top': '35px' });
            $('.paraverespacio3').css({ 'margin-bottom': '65px' });
            $('.paraverespacio4').css({ 'margin-top': '35px' });
            $('.paraverespacio4').css({ 'margin-bottom': '65px' });
            $('.paraverespacio5').css({ 'margin-top': '30px' });
        }
        if (prueba.length == 7) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
            $('.paraverespacio2').css({ 'margin-bottom': '65px' });
            $('.paraverespacio3').css({ 'margin-top': '35px' });
            $('.paraverespacio3').css({ 'margin-bottom': '65px' });
            $('.paraverespacio4').css({ 'margin-top': '35px' });
            $('.paraverespacio4').css({ 'margin-bottom': '65px' });
            $('.paraverespacio5').css({ 'margin-top': '30px' });
            $('.paraverespacio5').css({ 'margin-bottom': '60px' });
            $('.paraverespacio6').css({ 'margin-top': '35px' });
            $('.paraverespacio6').css({ 'margin-bottom': '65px' });
            $('.paraverespacio7').css({ 'margin-top': '30px' });
        }
        if (prueba.length == 8) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
            $('.paraverespacio2').css({ 'margin-bottom': '65px' });
            $('.paraverespacio3').css({ 'margin-top': '35px' });
            $('.paraverespacio3').css({ 'margin-bottom': '65px' });
            $('.paraverespacio4').css({ 'margin-top': '35px' });
            $('.paraverespacio4').css({ 'margin-bottom': '65px' });
            $('.paraverespacio5').css({ 'margin-top': '35px' });
            $('.paraverespacio5').css({ 'margin-bottom': '65px' });
            $('.paraverespacio6').css({ 'margin-top': '35px' });
            $('.paraverespacio6').css({ 'margin-bottom': '65px' });
            $('.paraverespacio7').css({ 'margin-top': '35px' });
            $('.paraverespacio7').css({ 'margin-bottom': '65px' });
            $('.paraverespacio8').css({ 'margin-top': '35px' });
        }
        if (prueba.length == 9) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
            $('.paraverespacio2').css({ 'margin-bottom': '65px' });
            $('.paraverespacio3').css({ 'margin-top': '35px' });
            $('.paraverespacio3').css({ 'margin-bottom': '65px' });
            $('.paraverespacio4').css({ 'margin-top': '35px' });
            $('.paraverespacio4').css({ 'margin-bottom': '65px' });
            $('.paraverespacio5').css({ 'margin-top': '35px' });
            $('.paraverespacio5').css({ 'margin-bottom': '65px' });
            $('.paraverespacio6').css({ 'margin-top': '35px' });
            $('.paraverespacio6').css({ 'margin-bottom': '65px' });
            $('.paraverespacio7').css({ 'margin-top': '35px' });
            $('.paraverespacio7').css({ 'margin-bottom': '65px' });
            $('.paraverespacio8').css({ 'margin-top': '35px' });
            $('.paraverespacio8').css({ 'margin-bottom': '65px' });
            $('.paraverespacio9').css({ 'margin-top': '35px' });
        }
        if (prueba.length == 12) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
            $('.paraverespacio2').css({ 'margin-bottom': '65px' });
            $('.paraverespacio3').css({ 'margin-top': '35px' });
            $('.paraverespacio3').css({ 'margin-bottom': '65px' });
            $('.paraverespacio4').css({ 'margin-top': '35px' });
            $('.paraverespacio4').css({ 'margin-bottom': '65px' });
            $('.paraverespacio5').css({ 'margin-top': '35px' });
            $('.paraverespacio5').css({ 'margin-bottom': '65px' });
            $('.paraverespacio6').css({ 'margin-top': '35px' });
            $('.paraverespacio6').css({ 'margin-bottom': '65px' });
            $('.paraverespacio7').css({ 'margin-top': '35px' });
            $('.paraverespacio7').css({ 'margin-bottom': '65px' });
            $('.paraverespacio8').css({ 'margin-top': '35px' });
            $('.paraverespacio8').css({ 'margin-bottom': '65px' });
            $('.paraverespacio9').css({ 'margin-top': '35px' });
            $('.paraverespacio9').css({ 'margin-bottom': '65px' });
            $('.paraverespacio10').css({ 'margin-top': '35px' });
            $('.paraverespacio10').css({ 'margin-bottom': '65px' });
            $('.paraverespacio11').css({ 'margin-top': '35px' });
            $('.paraverespacio11').css({ 'margin-bottom': '65px' });
            $('.paraverespacio12').css({ 'margin-top': '35px' });
        }
        if (prueba.length == 13) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
            $('.paraverespacio2').css({ 'margin-bottom': '65px' });
            $('.paraverespacio3').css({ 'margin-top': '35px' });
            $('.paraverespacio3').css({ 'margin-bottom': '65px' });
            $('.paraverespacio4').css({ 'margin-top': '35px' });
            $('.paraverespacio4').css({ 'margin-bottom': '65px' });
            $('.paraverespacio5').css({ 'margin-top': '35px' });
            $('.paraverespacio5').css({ 'margin-bottom': '65px' });
            $('.paraverespacio6').css({ 'margin-top': '35px' });
            $('.paraverespacio6').css({ 'margin-bottom': '65px' });
            $('.paraverespacio7').css({ 'margin-top': '35px' });
            $('.paraverespacio7').css({ 'margin-bottom': '65px' });
            $('.paraverespacio8').css({ 'margin-top': '35px' });
            $('.paraverespacio8').css({ 'margin-bottom': '65px' });
            $('.paraverespacio9').css({ 'margin-top': '35px' });
            $('.paraverespacio9').css({ 'margin-bottom': '65px' });
            $('.paraverespacio10').css({ 'margin-top': '35px' });
            $('.paraverespacio10').css({ 'margin-bottom': '65px' });
            $('.paraverespacio11').css({ 'margin-top': '35px' });
            $('.paraverespacio11').css({ 'margin-bottom': '65px' });
            $('.paraverespacio12').css({ 'margin-top': '35px' });
        }
        var divToPrint = document.getElementById('imprimir');
        var ventana = window.open('');
        ventana.document.write(
            '<html><head><style type="text/css">@page{size: A4;} .imagensolobotonimprimir{display:block} .imagensolobotonimprimir1{display:none} #estoparaesconderenmovilpc{display:block !important;} #esteDivPrueba0{margin-bottom: 0px !important;position: inherit;display: block !important;} #esteDivPrueba1{margin-top: 0px !important;margin-bottom: 0px !important;position: inherit;display: block !important;} #esteDivPrueba2{margin-top: 0px !important;margin-bottom: 0px !important;position: inherit;display: block !important;} #esteDivPrueba3{margin-top: 0px !important;margin-bottom: 0px !important;position: inherit;display: block !important;} #esteDivPrueba4{margin-top: 0px !important;margin-bottom: 0px !important;position: inherit;display: block !important;} #esteDivPrueba5{margin-top: 0px !important;margin-bottom: 0px !important;position: inherit;display: block !important;} #esteDivPrueba6{margin-top: 0px !important;margin-bottom: 0px !important;position: inherit;display: block !important;} #esteDivPrueba7{margin-top: 0px !important;margin-bottom: 0px !important;position: inherit;display: block !important;} #aquisoloparaimprimir{display:block !important;} #aquisoloparamostrar{display:none !important;} #divTotalPuntosParaTodo{display:none} #quitamoseldisplaydeldiv{display:block !important;} #divobservacionesparaimprimir{display:none} #divobservacionesparaimprimir1{border: 1px solid;float: left;width: 55%;display:block !important;} #pimprimirdatostexto{margin-top:4px !important; margin-bottom:4px !important;} #basesImponiblesDiv{display:block !important;float:left;width:12%;border: 1px solid;} .queremosquenosevea{display:block !important;} #divparaimagendatosmeter{float: left;display: block !important;width: 35% !important;height: 750px !important;border: 1px solid;} #divUnidadespedido{float: left;display: block !important;width: 9% !important;height: 750px !important;border: 1px solid;} #referenciapdivreferencia{FONT-SIZE: 14PX;MARGIN-TOP: 0;BORDER-BOTTOM: 1PX SOLID;TEXT-ALIGN: CENTER;BACKGROUND-COLOR: #2E2E2E;COLOR: WHITE;padding-top: 5px;padding-bottom: 3px;margin-bottom:5px;} #divreferenciapedido{float: left;display: block !important;width: 35% !important;height: 750px !important;margin-left: 8px !important;border: 1px solid;} #imagenlogopedidosprod{width: 10% !important;position: absolute !important;left: 2% !important;} #divderechapedidodatos{width: 25%;position: absolute;right: 2%;border: 1px solid;top: 5%;} #pmetidoimprimir{margin-top: 0;margin-bottom: 5px;margin-left: 10;} #metertamanotienda{margin-bottom: 2px;} #elultimopadentrop{margin-top: 2;} #metertamanotienda{margin-top:0;} #clienteDivTienda{margin-top: 40px;border: 1px solid;width: 49%;float: left;} #clienteDivDireccion{margin-top: 40px;border: 1px solid;width: 49%;float: left;margin-left:0.8%} #primeroMeterMargin{margin-top:-60px !important;} #clienteDiv{margin-top:0px !important;} #metertamanotienda{font-size:20px !important;} #divObserPoner{display:none} #esteDiv0{float:initial !important} #imagenPresupues{max-width:300px !important; max-height:300px !important;} #estoParaImprimir {float: left;width: 100%;} #datosMeter4 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter5 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #datosMeter6 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter7 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #datosMeter8 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter9 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #datosMeter10 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter11 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #datosMeter12 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter13 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #datosMeter14 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter15 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #datosMeter16 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter17 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #datosMeter18 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter19 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #datosMeter20 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter21 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;} #tapa {max-width:250px;max-height:183px} #datosMeter0 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #pNombreProd{display:none;} #datosMeter1 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #datosMeter2 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter3 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #spanobser{margin-top:0% !important;margin-left: 1% !important;font-size: 15px; } #textoObservaciones{margin-top:0% !important;display: block !important;float: left !important;margin-left: 1% !important;width: 80% !important;height: 45px !important;border: 0 !important;} .primerDivPresu{display:none} .estoesundivparaprobar{margin-top:0px !important; margin-bottom:0px !important;margin-top: 50px !important;float: initial;width: 100%;margin-bottom: 40px !important;position: inherit;display:block !important;} #imagen0{width: 100% !important;height: 330px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen1{width: 100% !important;height: 330px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen2{width: 100% !important;height: 330px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen3{width: 100% !important;height: 330px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen4{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen5{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen6{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen7{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen8{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen9{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen10{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen11{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen12{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen13{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen14{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen15{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen16{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen17{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen18{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #hrUltimo{ display: none} #logoPresu{max-width: 60px !important;position: absolute !important;margin-top: 100px !important;margin-left: 110px !important;} #idLineaDiv{display:none} #bajarFontSize{font-size:15px !important;} #totalDescuentoTexto{font-size:15px !important;} #euro{font-size:15px !important;} #bajarFontSize{font-size:15px !important;} #ivaPrecioQuitar{font-size:15px !important;} #bajarFontSize{font-size:15px !important;} #precioIvaSumado{font-size:15px !important;} #rightImprimir{float:right !important; right:0; text-align:right; width:100% !important;} .pietrasin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(125%);} .norwaysin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(140%);} .broncesin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;} .transparentesin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;} .nocesin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(140%);} .naturesin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(150%);} .tabaksin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(150%);} .kobesin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(150%);} .blancosin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(140%);} .beigesin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(140%);} .lattesin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(190%);} .grafenosin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(150%);} .lagosin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(130%);} .maresin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(130%);} .marmolblancosin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(190%);} .marmolnegrosin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(190%);} .norway {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(140%);} .bronce {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;} .transparente {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;} .noce {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(140%);} .nature {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(150%);} .tabak {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(150%);} .kobe {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(150%);} .blanco {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(140%);} .beige {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(140%);} .latte {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(190%);} .grafeno {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(150%);} .lago {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(130%);} .mare {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(130%);} .marmolblanco {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(190%);} .marmolnegro {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(190%);}</style><title>' +
                document.title +
                '</title>'
        );
        ventana.document.write(
            '</head><body style="font-family: Lato , sans-serif;font-weight: 400;zoom:78% !important;-webkit-print-color-adjust:exact;">'
        );
        ventana.document.write(divToPrint.innerHTML);
        ventana.document.write('</body></html>');
        console.log(ventana);
        ventana.focus();
        ventana.document.title = 'CONFIRMACION DE PEDIDO';
        ventana.document.close();
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
        var output = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear();
        var direccion;
        //var idDireccion = $('#direccion').val();
        //for (let m = 0; m < todasDirecciones.length; m++) {
        //if (todasDirecciones[m]['id'] == idDireccion) {
        //var direccion = todasDirecciones[m];
        //}
        //}
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
        var idPresu;
        idPresu = sessionStorage.getItem('presupuesto');
        this.precioFinalPresuService.query12(idPresu).subscribe(data => {
            this.precioFinalPresuService.todos = data.body[0];
            console.log(this.precioFinalPresuService.todos);
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
    public cambiarVisto() {
        var id = parseFloat(sessionStorage.getItem('presupuesto'));
        this.presupuestoPedidoService
            .query({
                size: 10000000
            })
            .subscribe(data => {
                for (let i = 0; i < data.body['length']; i++) {
                    if (data.body[i]['id'] == id) {
                        data.body[i]['visto'] = 0;
                        this.subscribeToSaveResponse10(this.presupuestoPedidoService.update(data.body[i]));
                    }
                }
            });
    }

    protected subscribeToSaveResponse10(result: Observable<HttpResponse<IPresupuestoPedido>>) {
        result.subscribe(
            (res: HttpResponse<IPresupuestoPedido>) => this.onSaveSuccess10(),
            (res: HttpErrorResponse) => this.onSaveError10()
        );
    }

    protected onSaveSuccess10() {
        this.isSaving = false;
        for (let i = 0; i <= 10000; i++) {
            if (i == 10000) {
                this.router.navigate(['/pedidos-usuario']);
            }
        }
    }

    protected onSaveError10() {
        this.isSaving = false;
    }

    public subirpdfweb() {
        this.progressExcel.percentage = 0;
        this.currentFileUploadExcel = this.selectedFilesExcel.item(0);
        this.vistaadminService.pushFileToStorageExcel(this.currentFileUploadExcel).subscribe(event => {});

        this.selectedFilesExcel = undefined;
    }

    loadAll() {
        var medidasEspeciales;

        var productosPresupuesto = [];
        var acabados1 = [];
        var precioTienda = this.precioTienda;
        var cont = 0;
        var item = JSON.parse(sessionStorage.getItem('seccionPrecios'));
        var precioMulti = JSON.parse(sessionStorage.getItem(item));
        var presu;
        presu = sessionStorage.getItem('presupuesto');
        this.iddelpedido = presu;
        var todaTienda = this.datosUsuarioService.tiendaCargadaPresu;
        this.tiendaNombre = todaTienda['nombreComercial'];
        this.numero = todaTienda['telefono'];
        var acabados = [];
        var primeroAcabados = [];
        var todosInteriores;
        var contToma = 0;
        var iluminacion = this.iluminacionProdPrePedService.metidos;
        this.productosPresupuestoPedidosService.query1(parseFloat(presu)).subscribe(
            (res: HttpResponse<IProductosPresupuestoPedidos[]>) => {
                console.log(res.body);
                var toma = [];
                for (let f = 0; f < res.body.length; f++) {
                    if (
                        res.body[f]['productosDormitorio'] != null &&
                        res.body[f]['productosDormitorio'] != '' &&
                        res.body[f]['productosDormitorio'] != undefined
                    ) {
                        toma[contToma] = res.body[f];
                        contToma++;
                    }
                }

                var contnewaca = 0;
                for (let b = 0; b < toma.length; b++) {
                    var arrpres = [];
                    for (let x = contToma; x < res.body.length; x++) {
                        if (toma[b]['id'] == res.body[x]['productosPresupuestoPedidos']['id']) {
                            arrpres[contnewaca] = res.body[x];
                            contnewaca++;
                            console.log(arrpres);
                        }
                    }
                    toma[b]['acabados'] = arrpres;
                    console.log(toma[b]);
                    console.log('aqui1');
                    contnewaca = 0;
                }

                for (let i = 0; i < toma.length; i++) {
                    if (this.precioPunto != undefined) {
                        var precioPunto = this.precioPunto[0];
                    }
                    if (toma[i]['presupuestoPedido'] != null) {
                        this.iddelpedido = toma[i]['presupuestoPedido']['numero_pedido'];
                        this.iddefactura = toma[i]['presupuestoPedido']['numero_factura'];

                        if (toma[i]['presupuestoPedido']['estapedido'] != 0) {
                            $('#botonsepuededescargar').css({ display: 'block' });
                            $('#botonnosepuededescargar').css({ display: 'none' });
                        } else {
                            $('#botonsepuededescargar').css({ display: 'none' });
                            $('#botonnosepuededescargar').css({ display: 'block' });
                        }

                        if (toma[i]['presupuestoPedido']['estafactura'] != 0) {
                            $('#botonsepuededescargar1').css({ display: 'block' });
                            $('#botonnosepuededescargar1').css({ display: 'none' });
                        } else {
                            $('#botonnosepuededescargar1').css({ display: 'block' });
                            $('#botonsepuededescargar1').css({ display: 'none' });
                        }

                        if (
                            toma[i]['presupuestoPedido']['archivoAdjunto'] != null &&
                            toma[i]['presupuestoPedido']['archivoAdjunto'] != undefined
                        ) {
                            $('#modalnoestasubidoarchivo').css({ display: 'none' });
                            $('#botonarchivosubido').css({ display: 'block' });
                            this.nombrearchivoadjunto = toma[i]['presupuestoPedido']['archivoAdjunto'];
                        } else {
                            $('#modalnoestasubidoarchivo').css({ display: 'block' });
                            $('#botonarchivosubido').css({ display: 'none' });
                        }

                        $('#textoObservaciones').css({ display: 'block' });
                        if (toma[i]['presupuestoPedido']['observaciones'] != null && i == 0) {
                            $('#divobservacionesparaimprimir').append(
                                '<div class="primerDivPresu" style="margin-top:50px;float:left;width:100%;margin-bottom:40px;" id="esteDiv0"><div style="float:left;width:40%;margin-left:100px;height:333px;" id="imagen0"> <img id="imagenPresupues" style="z-index:100;max-width:400px;max-height:400px;;max-width:410px;max-height:410px;" width="1000px" height="1000px" src="../../../content/images/1- PARA WEB/DORMITORIO2/OBSERVACIONES.jpg"></div><div style="float:right;width:25%;font-size:12px;letter-spacing:1px;" id="datosMeter0"><p style="font-size:16px;">OBSERVACIONES<strong><p id="pimprimirdatostexto" style="color:red">' +
                                    toma[i]['presupuestoPedido']['observaciones'] +
                                    '</p></div></div>'
                            );
                            this.tieneObservacion = toma[i]['presupuestoPedido']['observaciones'];
                        }
                        if (toma[i]['presupuestoPedido']['archivoAdjunto'] != null && i == 0) {
                            $('#divobservacionesparaimprimir').append(
                                '<div class="primerDivPresu" style="margin-top:50px;float:left;width:100%;margin-bottom:40px;" id="esteDiv0"><div style="float:left;width:40%;margin-left:100px;height:333px;" id="imagen0"> <img id="imagenPresupues" style="z-index:100;max-width:400px;max-height:400px;max-width:410px;max-height:410px;" width="1000px" height="1000px" src="../../../content/images/1- PARA WEB/DORMITORIO2/ARCHIVOS ADJUNTOS.jpg"></div><div style="float:right;width:25%;font-size:12px;letter-spacing:1px;" id="datosMeter0" class="aquisemetelinksmen"><p style="font-size:16px;">ARCHIVOS ADJUNTOS<strong></div></div>'
                            );
                            var nombreArchivos = toma[i]['presupuestoPedido']['archivoAdjunto'];
                            var arrayarchivos = [];
                            arrayarchivos = nombreArchivos.split('%');
                            for (let w = 0; w < arrayarchivos.length; w++) {
                                $('.aquisemetelinksmen').append(
                                    '<p id="pimprimirdatostexto"><a style="color: #007bff;" href="https://pedidostorga:Torga56pedidos123.@pedidospdftorga.com/confirmaciones/' +
                                        arrayarchivos[w] +
                                        '">' +
                                        arrayarchivos[w] +
                                        '</a></p>'
                                );
                            }
                        }
                        if (toma[i]['textoEspecial'] == 'Ancho Especial') {
                            toma[i]['dimensionesProductoTipo']['ancho'] == toma[i]['ancho'];
                        }

                        if (parseFloat(presu) == toma[i]['presupuestoPedido']['id']) {
                            if (toma[i]['productosDormitorio'] != null) {
                                if (toma[i]['productosDormitorio']['categoriasDormi']['id'] == 9) {
                                    this.presupuestoArmarioService.findBus(presu).subscribe(data => {
                                        var idCat = 9;
                                        var cat = {
                                            id: idCat
                                        };

                                        if (data.body.length == 1) {
                                            data.body[i] = data.body[0];
                                        }

                                        var uno = {
                                            nombre: data.body[i]['armario']['mensaje'],
                                            categoriasDormi: cat
                                        };
                                        var codigo = {
                                            id: data.body[i]['productosPresupuestoPedidos']['presupuestoPedido']['id'],
                                            codigo: data.body[i]['productosPresupuestoPedidos']['presupuestoPedido']['codigo'],
                                            fecha_presupuesto:
                                                data.body[i]['productosPresupuestoPedidos']['presupuestoPedido']['fecha_presupuesto']
                                        };
                                        var dimen = {
                                            incremento: undefined,
                                            ancho: data.body[i]['ancho'],
                                            alto: data.body[i]['alto'],
                                            fondo: data.body[i]['fondo'],
                                            mensaje: data.body[i]['codigo']
                                        };
                                        var todo = {
                                            productosDormitorio: uno,
                                            presupuestoPedido: data.body[i]['productosPresupuestoPedidos']['presupuestoPedido'],
                                            dimensionesProductoTipo: dimen,
                                            cont: cont
                                        };

                                        productosPresupuesto[cont] = todo;
                                        this.productosPresupuestoPedidos = productosPresupuesto;
                                        cont++;
                                        var imagenes = this.imagenDeCestaProdService.todos1;
                                        setTimeout(function() {
                                            var casco = data.body[0]['acabadosCasco']['nombre'].toLowerCase();
                                            if (data.body[0]['acabados'] != undefined) {
                                                var trasera = data.body[0]['acabados']['nombre'].toLowerCase();
                                            }
                                            var interiorAca = data.body[0]['acabadosInterior']['nombre'].toLowerCase();

                                            $('#datosMeter' + (cont - 1) + ' #primeroint').append(
                                                '<p  id="pimprimirdatostexto"><span style="font-weight:600">Acabado Casco</span>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                                                    casco +
                                                    '</p>'
                                            );
                                            if (data.body[0]['acabados'] != undefined) {
                                                $('#datosMeter' + (cont - 1) + ' #primeroint').append(
                                                    '<p  id="pimprimirdatostexto"><span style="font-weight:600">Acabado trasera</span>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                                                        trasera +
                                                        '</p>'
                                                );
                                            }
                                            $('#datosMeter' + (cont - 1) + ' #primeroint').append(
                                                '<p  id="pimprimirdatostexto"><span style="font-weight:600">Acabado Interiores</span>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                                                    interiorAca +
                                                    '</p>'
                                            );
                                            $('#imagen' + (cont - 1)).empty();

                                            for (let z = 0; z < imagenes.length; z++) {
                                                if (imagenes[z]['nombre'] == data.body[0]['nombreParaCargarCestaInterior']) {
                                                    $('#imagen' + (cont - 1)).css({ height: '730px' });
                                                    $('#imagen' + (cont - 1)).css({ 'margin-left': '0px' });
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img style="max-width: 400px;position: absolute;z-index:50;max-height:400px;" height="400px" src="' +
                                                            imagenes[z]['imagen'] +
                                                            '">'
                                                    );
                                                }
                                                if (imagenes[z]['nombre'] == data.body[0]['nombreParaCargarCesta']) {
                                                    $('#imagen' + (cont - 1)).css({ 'margin-left': '0px' });
                                                    $('#imagen' + (cont - 1)).css({ height: '730px' });
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img style="max-width: 400px;max-height:400px;position: absolute;z-index:50;margin-top:415px" height="400px" src="' +
                                                            imagenes[z]['imagen'] +
                                                            '">'
                                                    );
                                                }
                                            }
                                        }, 1000);
                                        this.presupuestoArmarioInterioresService.busqueda(data.body[i]['id']).subscribe(data => {
                                            var cont = 0;
                                            var secogeparaprobar = this.productosPresupuestoPedidos;
                                            for (let joven = 0; joven < secogeparaprobar.length; joven++) {
                                                if (
                                                    secogeparaprobar[joven]['productosDormitorio']['nombre'] ==
                                                    data.body[0]['presupuestoArmario']['armario']['mensaje']
                                                ) {
                                                    cont = secogeparaprobar[joven]['cont'] + 1;
                                                }
                                            }
                                            this.presupuestoArmarioInterioresService.todos = data.body;
                                            var datosInteriores = data.body;
                                            console.log(data.body);
                                            var casco = data.body[0]['presupuestoArmario']['acabadosCasco']['nombre'].toLowerCase();
                                            if (data.body[0]['presupuestoArmario']['acabados'] != undefined) {
                                                var trasera = data.body[0]['presupuestoArmario']['acabados']['nombre'].toLowerCase();
                                            }
                                            var interiorAca = data.body[0]['presupuestoArmario']['acabadosInterior'][
                                                'nombre'
                                            ].toLowerCase();

                                            if (
                                                data.body[0]['presupuestoArmario']['acabadosTirador'] != null &&
                                                data.body[0]['presupuestoArmario']['acabadosTirador'] != undefined
                                            ) {
                                                var tiradorAca = data.body[0]['presupuestoArmario']['acabadosTirador'][
                                                    'nombre'
                                                ].toLowerCase();
                                                $('#datosMeter' + (cont - 1) + ' #primeroint').append(
                                                    '<p  id="pimprimirdatostexto"><span style="font-weight:600">Acabado Tiradores y perfiles</span>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                                                        tiradorAca +
                                                        '</p>'
                                                );
                                            }

                                            var nombre = data.body[0]['presupuestoArmario']['armario']['mensaje'];
                                            var codigodelarmario = data.body[0]['presupuestoArmario']['codigo'];
                                            var precioTodo1 = 0;
                                            for (let p = 0; p < datosInteriores.length; p++) {
                                                if (p == 0) {
                                                    if (data.body[0]['presupuestoArmario']['niveladores']['id'] != 25000) {
                                                        $('#datosMeter' + (cont - 1) + ' #primeroint').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">Niveladores</span> : Si</p>'
                                                        );
                                                    } else {
                                                        $('#datosMeter' + (cont - 1) + ' #primeroint').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">Niveladores</span> : Sin niveladores</p>'
                                                        );
                                                    }
                                                    if (data.body[0]['presupuestoArmario']['cajeado']['id'] != 25000) {
                                                        $('#datosMeter' + (cont - 1) + ' #primeroint').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">Cajeado</span> : Si</p>'
                                                        );
                                                    } else {
                                                        $('#datosMeter' + (cont - 1) + ' #primeroint').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">Cajeado</span> : Sin Cajeado</p>'
                                                        );
                                                    }
                                                    if (data.body[0]['presupuestoArmario']['enmarcados']['id'] != 25000) {
                                                        $('#datosMeter' + (cont - 1) + ' #primeroint').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">Enmarcados</span> : Si</p>'
                                                        );
                                                    } else {
                                                        $('#datosMeter' + (cont - 1) + ' #primeroint').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">Enmarcados</span> : Sin Enmarcados</p>'
                                                        );
                                                    }
                                                    $('#precioTotal' + (cont - 1)).text(
                                                        datosInteriores[p]['presupuestoArmario']['precioTotal']
                                                    );
                                                    var cogerlo = parseFloat($('#precioTotal' + (cont - 1)).text());
                                                    var precioTotal = parseFloat($('#totalDescuentoTexto').text());
                                                    precioTotal = cogerlo + precioTotal;
                                                    $('#totalDescuentoTexto').text(precioTotal.toFixed(0));

                                                    var ivaTodo = precioTotal * 0.21;
                                                    $('#ivaPrecioQuitar').text(ivaTodo.toFixed(0) + ' pp');
                                                    $('#precioIvaSumado').text((ivaTodo + precioTotal).toFixed(0) + ' pp');
                                                }
                                                var mai = [
                                                    'A',
                                                    'B',
                                                    'C',
                                                    'D',
                                                    'E',
                                                    'F',
                                                    'G',
                                                    'H',
                                                    'I',
                                                    'J',
                                                    'K',
                                                    'L',
                                                    'M',
                                                    'N',
                                                    'O',
                                                    'P',
                                                    'Q',
                                                    'R',
                                                    'S',
                                                    'U',
                                                    'V',
                                                    'W',
                                                    'X',
                                                    'Y',
                                                    'Z'
                                                ];
                                                precioTodo1 = precioTodo1 + datosInteriores[p]['precio'];
                                                if (datosInteriores[p]['presupuestoArmario']['armario']['id'] != 154) {
                                                    $('#datosMeter' + (cont - 1) + ' #primeroint').append(
                                                        '<p id="pimprimirdatostexto"><strong>Hueco ' +
                                                            mai[p] +
                                                            ': Interior ' +
                                                            datosInteriores[p]['productosDormitorio']['nombre'] +
                                                            '&nbsp;&nbsp;&nbsp;&nbsp;</strong></p>'
                                                    );

                                                    if (datosInteriores[p]['mensajeLuz'] != null) {
                                                        $('#datosMeter' + (cont - 1) + ' #primeroint').append(
                                                            '<p id="pimprimirdatostexto"><strong>Iluminacion ' +
                                                                mai[p] +
                                                                ': </strong><span>' +
                                                                datosInteriores[p]['mensajeLuz'] +
                                                                '</span></p>'
                                                        );
                                                    }

                                                    if (datosInteriores[p]['observacion'] != null) {
                                                        $('#datosMeter' + (cont - 1) + ' #primeroint').append(
                                                            '<p id="pimprimirdatostexto"><strong>Observaciones Hueco ' +
                                                                mai[p] +
                                                                ':&nbsp;&nbsp;&nbsp;&nbsp;</strong><span>' +
                                                                datosInteriores[p]['observacion'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (datosInteriores[p]['adicionales'] != null) {
                                                        $('#datosMeter' + (cont - 1) + ' #primeroint').append(
                                                            '<p id="pimprimirdatostexto"><strong>Adicionales Hueco ' +
                                                                mai[p] +
                                                                ':&nbsp;&nbsp;&nbsp;&nbsp;</strong><span>' +
                                                                datosInteriores[p]['adicionales'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                } else {
                                                    $('#datosMeter' + (cont - 1) + ' #primeroint').append(
                                                        '<p id="pimprimirdatostexto"><strong>Hueco</strong></p>'
                                                    );

                                                    if (datosInteriores[p]['mensajeLuz'] != null) {
                                                        $('#datosMeter' + (cont - 1) + ' #primeroint').append(
                                                            '<p id="pimprimirdatostexto"><strong>Iluminacion Hueco: </strong><span>' +
                                                                datosInteriores[p]['mensajeLuz'] +
                                                                '</span></p>'
                                                        );
                                                    }

                                                    if (datosInteriores[p]['observacion'] != null) {
                                                        $('#datosMeter' + (cont - 1) + ' #primeroint').append(
                                                            '<p id="pimprimirdatostexto"><strong>Observaciones Hueco :&nbsp;&nbsp;&nbsp;&nbsp;</strong><span>' +
                                                                datosInteriores[p]['observacion'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (datosInteriores[p]['adicionales'] != null) {
                                                        $('#datosMeter' + (cont - 1) + ' #primeroint').append(
                                                            '<p id="pimprimirdatostexto"><strong>Adicionales Hueco :&nbsp;&nbsp;&nbsp;&nbsp;</strong><span>' +
                                                                datosInteriores[p]['adicionales'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                            }
                                            if ('1 CUERPO TIPO 1' == nombre) {
                                                if (screen.width >= 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                }
                                                if (screen.width < 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 25%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                    if (screen.width < 800) {
                                                        var elem1 = $('#datosMeter' + (cont - 1));
                                                        elem1[0].style.setProperty('padding-left', '0%', 'important');
                                                        elem1[0].style.setProperty('font-size', '14px', 'important');
                                                        elem1[0].style.setProperty('margin-top', '15%', 'important');
                                                    }
                                                }
                                            }
                                            if ('Armario Rincon' == nombre) {
                                                if (
                                                    codigodelarmario == 'NB277' ||
                                                    codigodelarmario == 'NB278' ||
                                                    codigodelarmario == 'NB279' ||
                                                    codigodelarmario == 'NB280' ||
                                                    codigodelarmario == 'NB289' ||
                                                    codigodelarmario == 'NB290' ||
                                                    codigodelarmario == 'NB291' ||
                                                    codigodelarmario == 'NB292' ||
                                                    codigodelarmario == 'NB301' ||
                                                    codigodelarmario == 'NB302' ||
                                                    codigodelarmario == 'NB303' ||
                                                    codigodelarmario == 'NB304' ||
                                                    codigodelarmario == 'NB313' ||
                                                    codigodelarmario == 'NB314' ||
                                                    codigodelarmario == 'NB315' ||
                                                    codigodelarmario == 'NB316'
                                                ) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img style="max-width: 320px;position: absolute;z-index:50" src="../../../content/images/pruebaarmarios/ARMARIOS/interior1rincon.jpeg">'
                                                    );
                                                }
                                                if (
                                                    codigodelarmario == 'NB281' ||
                                                    codigodelarmario == 'NB282' ||
                                                    codigodelarmario == 'NB283' ||
                                                    codigodelarmario == 'NB284' ||
                                                    codigodelarmario == 'NB293' ||
                                                    codigodelarmario == 'NB294' ||
                                                    codigodelarmario == 'NB295' ||
                                                    codigodelarmario == 'NB296' ||
                                                    codigodelarmario == 'NB305' ||
                                                    codigodelarmario == 'NB306' ||
                                                    codigodelarmario == 'NB307' ||
                                                    codigodelarmario == 'NB308' ||
                                                    codigodelarmario == 'NB317' ||
                                                    codigodelarmario == 'NB318' ||
                                                    codigodelarmario == 'NB319' ||
                                                    codigodelarmario == 'NB320'
                                                ) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img style="max-width: 320px;position: absolute;z-index:50" src="../../../content/images/pruebaarmarios/ARMARIOS/interior2rincon.jpeg">'
                                                    );
                                                }
                                                if (
                                                    codigodelarmario == 'NB285' ||
                                                    codigodelarmario == 'NB286' ||
                                                    codigodelarmario == 'NB287' ||
                                                    codigodelarmario == 'NB288' ||
                                                    codigodelarmario == 'NB297' ||
                                                    codigodelarmario == 'NB298' ||
                                                    codigodelarmario == 'NB299' ||
                                                    codigodelarmario == 'NB300' ||
                                                    codigodelarmario == 'NB309' ||
                                                    codigodelarmario == 'NB310' ||
                                                    codigodelarmario == 'NB311' ||
                                                    codigodelarmario == 'NB312' ||
                                                    codigodelarmario == 'NB321' ||
                                                    codigodelarmario == 'NB322' ||
                                                    codigodelarmario == 'NB323' ||
                                                    codigodelarmario == 'NB324'
                                                ) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img style="max-width: 320px;position: absolute;z-index:50" src="../../../content/images/pruebaarmarios/ARMARIOS/interior3rincon.jpeg">'
                                                    );
                                                }

                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 320px;position: absolute;z-index:50;margin-top:315px;" src="../../../content/images/pruebaarmarios/ARMARIOS/rinconpuertas.jpeg">'
                                                );
                                            }
                                            if ('1 CUERPO TIPO 2' == nombre) {
                                                if (screen.width >= 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                }
                                                if (screen.width < 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 25%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                    if (screen.width < 800) {
                                                        var elem1 = $('#datosMeter' + (cont - 1));
                                                        elem1[0].style.setProperty('padding-left', '0%', 'important');
                                                        elem1[0].style.setProperty('font-size', '14px', 'important');
                                                        elem1[0].style.setProperty('margin-top', '15%', 'important');
                                                    }
                                                }
                                            }
                                            if ('1 CUERPO TIPO 3' == nombre) {
                                                if (screen.width >= 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                }
                                                if (screen.width < 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 25%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                    if (screen.width < 800) {
                                                        var elem1 = $('#datosMeter' + (cont - 1));
                                                        elem1[0].style.setProperty('padding-left', '0%', 'important');
                                                        elem1[0].style.setProperty('font-size', '14px', 'important');
                                                        elem1[0].style.setProperty('margin-top', '15%', 'important');
                                                    }
                                                }
                                            }
                                            if ('2 CUERPO TIPO 1' == nombre) {
                                                if (screen.width >= 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                }
                                                if (screen.width < 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 25%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                    if (screen.width < 800) {
                                                        var elem1 = $('#datosMeter' + (cont - 1));
                                                        elem1[0].style.setProperty('padding-left', '0%', 'important');
                                                        elem1[0].style.setProperty('font-size', '14px', 'important');
                                                        elem1[0].style.setProperty('margin-top', '15%', 'important');
                                                    }
                                                }
                                            }
                                            if ('2 CUERPO TIPO 2' == nombre) {
                                                if (screen.width >= 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                }
                                                if (screen.width < 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 25%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                    if (screen.width < 800) {
                                                        var elem1 = $('#datosMeter' + (cont - 1));
                                                        elem1[0].style.setProperty('padding-left', '0%', 'important');
                                                        elem1[0].style.setProperty('font-size', '14px', 'important');
                                                        elem1[0].style.setProperty('margin-top', '15%', 'important');
                                                    }
                                                }
                                            }
                                            if ('2 CUERPO TIPO 3' == nombre) {
                                                if (screen.width >= 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                }
                                                if (screen.width < 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 25%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                    if (screen.width < 800) {
                                                        var elem1 = $('#datosMeter' + (cont - 1));
                                                        elem1[0].style.setProperty('padding-left', '0%', 'important');
                                                        elem1[0].style.setProperty('font-size', '14px', 'important');
                                                        elem1[0].style.setProperty('margin-top', '15%', 'important');
                                                    }
                                                }
                                            }
                                            if ('3 CUERPO TIPO 1' == nombre) {
                                                if (screen.width >= 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                }
                                                if (screen.width < 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 25%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                    if (screen.width < 800) {
                                                        var elem1 = $('#datosMeter' + (cont - 1));
                                                        elem1[0].style.setProperty('padding-left', '0%', 'important');
                                                        elem1[0].style.setProperty('font-size', '14px', 'important');
                                                        elem1[0].style.setProperty('margin-top', '15%', 'important');
                                                    }
                                                }
                                            }
                                            if ('3 CUERPO TIPO 2' == nombre) {
                                                if (screen.width >= 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                }
                                                if (screen.width < 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 25%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                    if (screen.width < 800) {
                                                        var elem1 = $('#datosMeter' + (cont - 1));
                                                        elem1[0].style.setProperty('padding-left', '0%', 'important');
                                                        elem1[0].style.setProperty('font-size', '14px', 'important');
                                                        elem1[0].style.setProperty('margin-top', '15%', 'important');
                                                    }
                                                }
                                            }
                                            if ('3 CUERPO TIPO 3' == nombre) {
                                                if (screen.width >= 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                }
                                                if (screen.width < 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 25%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                    if (screen.width < 800) {
                                                        var elem1 = $('#datosMeter' + (cont - 1));
                                                        elem1[0].style.setProperty('padding-left', '0%', 'important');
                                                        elem1[0].style.setProperty('font-size', '14px', 'important');
                                                        elem1[0].style.setProperty('margin-top', '15%', 'important');
                                                    }
                                                }
                                            }
                                            if ('4 CUERPO TIPO 1' == nombre) {
                                                if (screen.width >= 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                }
                                                if (screen.width < 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 25%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                    if (screen.width < 800) {
                                                        var elem1 = $('#datosMeter' + (cont - 1));
                                                        elem1[0].style.setProperty('padding-left', '0%', 'important');
                                                        elem1[0].style.setProperty('font-size', '14px', 'important');
                                                        elem1[0].style.setProperty('margin-top', '15%', 'important');
                                                    }
                                                }
                                            }
                                            if ('4 CUERPO TIPO 2' == nombre) {
                                                if (screen.width >= 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                }
                                                if (screen.width < 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 25%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                    if (screen.width < 800) {
                                                        var elem1 = $('#datosMeter' + (cont - 1));
                                                        elem1[0].style.setProperty('padding-left', '0%', 'important');
                                                        elem1[0].style.setProperty('font-size', '14px', 'important');
                                                        elem1[0].style.setProperty('margin-top', '15%', 'important');
                                                    }
                                                }
                                            }
                                            if ('4 CUERPO TIPO 3' == nombre) {
                                                if (screen.width >= 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                }
                                                if (screen.width < 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 25%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                    if (screen.width < 800) {
                                                        var elem1 = $('#datosMeter' + (cont - 1));
                                                        elem1[0].style.setProperty('padding-left', '0%', 'important');
                                                        elem1[0].style.setProperty('font-size', '14px', 'important');
                                                        elem1[0].style.setProperty('margin-top', '15%', 'important');
                                                    }
                                                }
                                            }
                                            if ('5 CUERPO TIPO 1' == nombre) {
                                                if (screen.width >= 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                }
                                                if (screen.width < 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 25%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                    if (screen.width < 800) {
                                                        var elem1 = $('#datosMeter' + (cont - 1));
                                                        elem1[0].style.setProperty('padding-left', '0%', 'important');
                                                        elem1[0].style.setProperty('font-size', '14px', 'important');
                                                        elem1[0].style.setProperty('margin-top', '15%', 'important');
                                                    }
                                                }
                                            }
                                            if ('5 CUERPO TIPO 2' == nombre) {
                                                if (screen.width >= 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                }
                                                if (screen.width < 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 25%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                    if (screen.width < 800) {
                                                        var elem1 = $('#datosMeter' + (cont - 1));
                                                        elem1[0].style.setProperty('padding-left', '0%', 'important');
                                                        elem1[0].style.setProperty('font-size', '14px', 'important');
                                                        elem1[0].style.setProperty('margin-top', '15%', 'important');
                                                    }
                                                }
                                            }
                                            if ('5 CUERPO TIPO 3' == nombre) {
                                                if (screen.width >= 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                }
                                                if (screen.width < 800) {
                                                    $('#imagen' + (cont - 1)).append(
                                                        '<img id="imagenNoDisponible" style="width: 700px;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 25%;" src="../../../content/images/nodisponible.png">'
                                                    );
                                                    if (screen.width < 800) {
                                                        var elem1 = $('#datosMeter' + (cont - 1));
                                                        elem1[0].style.setProperty('padding-left', '0%', 'important');
                                                        elem1[0].style.setProperty('font-size', '14px', 'important');
                                                        elem1[0].style.setProperty('margin-top', '15%', 'important');
                                                    }
                                                }
                                            }
                                            if ('3 PUERTAS IZQUIERDA' == nombre) {
                                                var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            }

                                            if ('4 PUERTAS ASIMETRICAS' == nombre) {
                                                var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            }

                                            if ('1 PUERTA' == nombre) {
                                                var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            }

                                            if ('7 PUERTAS IZQUIERDA' == nombre) {
                                                var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            }

                                            if ('2 PUERTAS' == nombre) {
                                                var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            }

                                            if ('3 PUERTAS DERECHA' == nombre) {
                                                var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            }
                                            if ('2 PUERTAS CORREDERA' == nombre) {
                                                var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img  style="position:absolute;width: 365px;height: 365px;z-index:101" src="../../../content/images/pruebaarmarios/OCULTA/2 PNG/2-A-' +
                                                        nombreInt +
                                                        '.png">'
                                                );
                                                $('.estoesundivparaprobar #divreferenciapedido #imagen' + (cont - 1)).append(
                                                    '<img  style="position:absolute;width: 310px;height: 310px;z-index:101" src="../../../content/images/pruebaarmarios/OCULTA/2 PNG/2-A-' +
                                                        nombreInt +
                                                        '.png">'
                                                );
                                                $('.estoesundivparaprobar #divreferenciapedido #imagen' + (cont - 1)).append(
                                                    '<img  style="position:absolute;width: 310px;height: 310px;z-index:101;margin-top:285px" src="../../../content/images/pruebaarmarios/OCULTA/2 PNG/2-A-' +
                                                        nombreInt +
                                                        '.png">'
                                                );
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 365px;height: 365px;position: absolute;z-index:50;margin-top:315px;" src="../../../content/images/pruebaarmarios/OCULTA/2 PNG/2-A-' +
                                                        nombreInt +
                                                        '.png">'
                                                );

                                                var nombreInt = datosInteriores[1]['productosDormitorio']['nombre'];

                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 365px;height:365px;position: absolute;z-index:49;margin-top:315px;" src="../../../content/images/pruebaarmarios/OCULTA/2 PNG/2-B-' +
                                                        nombreInt +
                                                        '.png">'
                                                );
                                                $('.estoesundivparaprobar #divreferenciapedido #imagen' + (cont - 1)).append(
                                                    '<img  style="position:absolute;width: 310px;height: 310px;z-index:100" src="../../../content/images/pruebaarmarios/OCULTA/2 PNG/2-B-' +
                                                        nombreInt +
                                                        '.png">'
                                                );

                                                $('.estoesundivparaprobar #divreferenciapedido #imagen' + (cont - 1)).append(
                                                    '<img  style="position:absolute;width: 310px;height: 310px;z-index:100;margin-top:285px" src="../../../content/images/pruebaarmarios/OCULTA/2 PNG/2-B-' +
                                                        nombreInt +
                                                        '.png">'
                                                );

                                                $('#imagen' + (cont - 1)).append(
                                                    '<img  style="position:absolute;width: 365px;height: 365px;z-index:100" src="../../../content/images/pruebaarmarios/OCULTA/2 PNG/2-B-' +
                                                        nombreInt +
                                                        '.png">'
                                                );
                                                if (screen.width < 800) {
                                                    var elem1 = $('#datosMeter' + (cont - 1));
                                                    elem1[0].style.setProperty('padding-left', '0%', 'important');
                                                    elem1[0].style.setProperty('font-size', '14px', 'important');
                                                    var elem = $('#imagen' + (cont - 1));
                                                    elem[0].style.setProperty('margin-left', '7%', 'important');
                                                    elem[0].style.setProperty('margin-top', '5%', 'important');
                                                    elem[0].style.setProperty('height', '700px', 'important');
                                                    elem[0].style.setProperty('zoom', '85%', 'important');
                                                }
                                            }

                                            if ('3 PUERTAS CORREDERA' == nombre) {
                                                var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 380px;position: absolute;z-index:50" src="../../../content/images/pruebaarmarios/OCULTA/3 PNG/3-A-' +
                                                        nombreInt +
                                                        '.png">'
                                                );

                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 380px;position: absolute;z-index:50;margin-top:315px;" src="../../../content/images/pruebaarmarios/OCULTA/3 PNG/3-A-' +
                                                        nombreInt +
                                                        '.png">'
                                                );

                                                var nombreInt = datosInteriores[1]['productosDormitorio']['nombre'];
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 380px;position: absolute;z-index:49" src="../../../content/images/pruebaarmarios/OCULTA/3 PNG/3-B-' +
                                                        nombreInt +
                                                        '.png">'
                                                );

                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 380px;position: absolute;z-index:49;margin-top:315px;" src="../../../content/images/pruebaarmarios/OCULTA/3 PNG/3-B-' +
                                                        nombreInt +
                                                        '.png">'
                                                );

                                                var nombreInt = datosInteriores[2]['productosDormitorio']['nombre'];
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 380px;position: absolute;z-index:48" src="../../../content/images/pruebaarmarios/OCULTA/3 PNG/3-C-' +
                                                        nombreInt +
                                                        '.png">'
                                                );

                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 380px;position: absolute;z-index:48;margin-top:315px;" src="../../../content/images/pruebaarmarios/OCULTA/3 PNG/3-C-' +
                                                        nombreInt +
                                                        '.png">'
                                                );
                                            }
                                            if ('2 PUERTAS CORREDERA VISTA' == nombre) {
                                                var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img  style="position:absolute;width: 365px;height: 365px;z-index:101" src="../../../content/images/pruebaarmarios/VISTA/2 PNG/2-A-' +
                                                        nombreInt +
                                                        '.png">'
                                                );
                                                $('.estoesundivparaprobar #divreferenciapedido #imagen' + (cont - 1)).append(
                                                    '<img  style="position:absolute;width: 310px;height: 310px;z-index:101" src="../../../content/images/pruebaarmarios/VISTA/2 PNG/2-A-' +
                                                        nombreInt +
                                                        '.png">'
                                                );
                                                $('.estoesundivparaprobar #divreferenciapedido #imagen' + (cont - 1)).append(
                                                    '<img  style="position:absolute;width: 310px;height: 310px;z-index:101;margin-top:285px" src="../../../content/images/pruebaarmarios/VISTA/2 PNG/2-A-' +
                                                        nombreInt +
                                                        '.png">'
                                                );
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 365px;height: 365px;position: absolute;z-index:50;margin-top:315px;" src="../../../content/images/pruebaarmarios/VISTA/2 PNG/2-A-' +
                                                        nombreInt +
                                                        '.png">'
                                                );

                                                var nombreInt = datosInteriores[1]['productosDormitorio']['nombre'];

                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 365px;height:365px;position: absolute;z-index:49;margin-top:315px;" src="../../../content/images/pruebaarmarios/VISTA/2 PNG/2-B-' +
                                                        nombreInt +
                                                        '.png">'
                                                );
                                                $('.estoesundivparaprobar #divreferenciapedido #imagen' + (cont - 1)).append(
                                                    '<img  style="position:absolute;width: 310px;height: 310px;z-index:100" src="../../../content/images/pruebaarmarios/VISTA/2 PNG/2-B-' +
                                                        nombreInt +
                                                        '.png">'
                                                );

                                                $('.estoesundivparaprobar #divreferenciapedido #imagen' + (cont - 1)).append(
                                                    '<img  style="position:absolute;width: 310px;height: 310px;z-index:100;margin-top:285px" src="../../../content/images/pruebaarmarios/VISTA/2 PNG/2-B-' +
                                                        nombreInt +
                                                        '.png">'
                                                );

                                                $('#imagen' + (cont - 1)).append(
                                                    '<img  style="position:absolute;width: 365px;height: 365px;z-index:100" src="../../../content/images/pruebaarmarios/VISTA/2 PNG/2-B-' +
                                                        nombreInt +
                                                        '.png">'
                                                );
                                                if (screen.width < 800) {
                                                    var elem1 = $('#datosMeter' + (cont - 1));
                                                    elem1[0].style.setProperty('padding-left', '0%', 'important');
                                                    elem1[0].style.setProperty('font-size', '14px', 'important');
                                                    var elem = $('#imagen' + (cont - 1));
                                                    elem[0].style.setProperty('margin-left', '7%', 'important');
                                                    elem[0].style.setProperty('margin-top', '5%', 'important');
                                                    elem[0].style.setProperty('height', '700px', 'important');
                                                    elem[0].style.setProperty('zoom', '85%', 'important');
                                                }
                                            }
                                            if ('3 PUERTAS CORREDERA VISTA' == nombre) {
                                                var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 380px;position: absolute;z-index:50" src="../../../content/images/pruebaarmarios/VISTA/3 PNG/3-A-' +
                                                        nombreInt +
                                                        '.png">'
                                                );

                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 380px;position: absolute;z-index:50;margin-top:315px;" src="../../../content/images/pruebaarmarios/VISTA/3 PNG/3-A-' +
                                                        nombreInt +
                                                        '.png">'
                                                );

                                                var nombreInt = datosInteriores[1]['productosDormitorio']['nombre'];
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 380px;position: absolute;z-index:49" src="../../../content/images/pruebaarmarios/VISTA/3 PNG/3-B-' +
                                                        nombreInt +
                                                        '.png">'
                                                );

                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 380px;position: absolute;z-index:49;margin-top:315px;" src="../../../content/images/pruebaarmarios/VISTA/3 PNG/3-B-' +
                                                        nombreInt +
                                                        '.png">'
                                                );

                                                var nombreInt = datosInteriores[2]['productosDormitorio']['nombre'];
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 380px;position: absolute;z-index:48" src="../../../content/images/pruebaarmarios/VISTA/3 PNG/3-C-' +
                                                        nombreInt +
                                                        '.png">'
                                                );

                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 380px;position: absolute;z-index:48;margin-top:315px;" src="../../../content/images/pruebaarmarios/VISTA/3 PNG/3-C-' +
                                                        nombreInt +
                                                        '.png">'
                                                );
                                            }
                                            if ('5 PUERTAS CENTRAL' == nombre) {
                                                var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            }
                                            if ('7 PUERTA ASIMETRICAS' == nombre) {
                                                var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            }

                                            if ('7 PUERTAS DERECHA' == nombre) {
                                                var nombreInt = datosInteriores[3]['productosDormitorio']['nombre'];
                                            }

                                            if ('6 PUERTAS -3 HUECOS GRANDES' == nombre) {
                                                var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            }

                                            if ('8 PUERTAS ASIMETRICAS' == nombre) {
                                                var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            }

                                            if ('4 PUERTAS - 2 HUECOS GRANDES' == nombre) {
                                                var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            }

                                            if ('5 PUERTAS DERECHA' == nombre) {
                                                var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            }

                                            if ('5 PUERTAS IZQUIERDA' == nombre) {
                                                var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            }
                                            if ('6 PUERTAS ASIMETRICAS' == nombre) {
                                                var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            }
                                            $('#imagen' + (cont - 1)).css({ height: '650px' });
                                        });
                                        this.presupuestoArmarioPuertasService.busqueda(data.body[i]['id']).subscribe(data => {
                                            var cont = 0;
                                            var secogeparaprobar = this.productosPresupuestoPedidos;
                                            for (let joven = 0; joven < secogeparaprobar.length; joven++) {
                                                if (
                                                    secogeparaprobar[joven]['productosDormitorio']['nombre'] ==
                                                    data.body[0]['presupuestoArmario']['armario']['mensaje']
                                                ) {
                                                    cont = secogeparaprobar[joven]['cont'] + 1;
                                                }
                                            }
                                            this.presupuestoArmarioPuertasService.todos = data.body;
                                            var datosInteriores = data.body;
                                            console.log(data.body);
                                            var precioTodo = $('#precioTotal' + (cont - 1)).text();

                                            var precioTodo1 = 0;
                                            var nombre = data.body[0]['presupuestoArmario']['armario']['mensaje'];
                                            for (let p = 0; p < datosInteriores.length; p++) {
                                                $('#datosMeter' + (cont - 1) + ' #segundopuerta').append(
                                                    '<p id="pimprimirdatostexto"><strong>Puerta ' +
                                                        (p + 1) +
                                                        ': ' +
                                                        datosInteriores[p]['terminacion'] +
                                                        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></p>'
                                                );
                                                for (let j = 0; j < 5; j++) {
                                                    if (j == 0) {
                                                        if (datosInteriores[p]['acabados'] != undefined) {
                                                            $('#datosMeter' + (cont - 1) + ' #segundopuerta').append(
                                                                '<p id="pimprimirdatostexto"><strong>Plafon ' +
                                                                    (j + 1) +
                                                                    '</strong> ' +
                                                                    datosInteriores[p]['acabados']['nombre'] +
                                                                    '</span></p>'
                                                            );
                                                        }
                                                    } else {
                                                        if (datosInteriores[p]['acabados' + j] != undefined) {
                                                            $('#datosMeter' + (cont - 1) + ' #segundopuerta').append(
                                                                '<p id="pimprimirdatostexto"><strong>Plafon ' +
                                                                    (j + 1) +
                                                                    '</strong> ' +
                                                                    datosInteriores[p]['acabados' + j]['nombre'] +
                                                                    '</span></p>'
                                                            );
                                                        }
                                                    }
                                                }
                                                precioTodo1 = precioTodo1 + datosInteriores[p]['precio'];
                                            }

                                            if ('3 PUERTAS IZQUIERDA' == nombre) {
                                                var tipo = data.body[0]['productosDormitorio']['nombre'];
                                            }

                                            if ('2 PUERTAS CORREDERA' == nombre) {
                                                if (screen.width < 800) {
                                                    var elem1 = $('#datosMeter' + (cont - 1));
                                                    elem1[0].style.setProperty('padding-left', '0%', 'important');
                                                    elem1[0].style.setProperty('font-size', '14px', 'important');
                                                    var elem = $('#imagen' + (cont - 1));
                                                    elem[0].style.setProperty('margin-left', '7%', 'important');
                                                    elem[0].style.setProperty('margin-top', '5%', 'important');
                                                    elem[0].style.setProperty('height', '700px', 'important');
                                                    elem[0].style.setProperty('zoom', '85%', 'important');
                                                }
                                                for (let u = 0; u <= 1; u++) {
                                                    var tipo = data.body[u]['productosDormitorio']['nombre'];

                                                    if (tipo == 'Puerta Lisa') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/OCULTA/2 PTAS PNG/' +
                                                            (u + 1) +
                                                            '-A.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }

                                                    if (tipo == 'Puerta 2 Plafones') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/OCULTA/2 PTAS PNG/' +
                                                            (u + 1) +
                                                            '-B.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }

                                                    if (tipo == 'Puerta 3 Plafones') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/OCULTA/2 PTAS PNG/' +
                                                            (u + 1) +
                                                            '-C.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }
                                                    if (tipo == 'Puerta 5 Plafones') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/OCULTA/2 PTAS PNG/' +
                                                            (u + 1) +
                                                            '-D.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }
                                                    if (tipo == 'Puerta 2 Plafones Verticales') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/OCULTA/2 PTAS PNG/' +
                                                            (u + 1) +
                                                            '-E.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }
                                                    if (tipo == 'Puerta 2 Plafones Verticales Cristal Estrecha') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/OCULTA/2 PTAS PNG/' +
                                                            (u + 1) +
                                                            '-F.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }
                                                    if (tipo == 'Puerta 2 Plafones Verticales Cristal Ancha') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/OCULTA/2 PTAS PNG/' +
                                                            (u + 1) +
                                                            '-G.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }
                                                    if (tipo == 'Puerta 2 Plafones Verticales DER') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/OCULTA/2 PTAS PNG/' +
                                                            (u + 1) +
                                                            '-H.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }

                                                    if (tipo == 'Puerta 2 Plafones Verticales Cristal Estrecha DER') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/OCULTA/2 PTAS PNG/' +
                                                            (u + 1) +
                                                            '-I.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }
                                                    if (tipo == 'Puerta 2 Plafones Verticales Cristal Ancha DER') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/OCULTA/2 PTAS PNG/' +
                                                            (u + 1) +
                                                            '-J.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }
                                                }
                                            }

                                            if ('2 PUERTAS CORREDERA VISTA' == nombre) {
                                                if (screen.width < 800) {
                                                    var elem1 = $('#datosMeter' + (cont - 1));
                                                    elem1[0].style.setProperty('padding-left', '0%', 'important');
                                                    elem1[0].style.setProperty('font-size', '14px', 'important');
                                                    var elem = $('#imagen' + (cont - 1));
                                                    elem[0].style.setProperty('margin-left', '7%', 'important');
                                                    elem[0].style.setProperty('margin-top', '5%', 'important');
                                                    elem[0].style.setProperty('height', '700px', 'important');
                                                    elem[0].style.setProperty('zoom', '85%', 'important');
                                                }
                                                for (let u = 0; u <= 1; u++) {
                                                    var tipo = data.body[u]['productosDormitorio']['nombre'];

                                                    if (tipo == 'Puerta Lisa') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/VISTA/2 PTAS PNG/' + (u + 1) + '-A.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }

                                                    if (tipo == 'Puerta 2 Plafones') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/VISTA/2 PTAS PNG/' + (u + 1) + '-B.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }

                                                    if (tipo == 'Puerta 3 Plafones') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/VISTA/2 PTAS PNG/' + (u + 1) + '-C.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }
                                                    if (tipo == 'Puerta 5 Plafones') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/VISTA/2 PTAS PNG/' + (u + 1) + '-D.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }
                                                    if (tipo == 'Puerta 2 Plafones Verticales') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/VISTA/2 PTAS PNG/' + (u + 1) + '-E.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }
                                                    if (tipo == 'Puerta 2 Plafones Verticales Cristal Estrecha') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/VISTA/2 PTAS PNG/' + (u + 1) + '-F.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }
                                                    if (tipo == 'Puerta 2 Plafones Verticales Cristal Ancha') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/VISTA/2 PTAS PNG/' + (u + 1) + '-G.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }
                                                    if (tipo == 'Puerta 2 Plafones Verticales DER') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/VISTA/2 PTAS PNG/' + (u + 1) + '-H.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }

                                                    if (tipo == 'Puerta 2 Plafones Verticales Cristal Estrecha DER') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/VISTA/2 PTAS PNG/' + (u + 1) + '-I.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }
                                                    if (tipo == 'Puerta 2 Plafones Verticales Cristal Ancha DER') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/VISTA/2 PTAS PNG/' + (u + 1) + '-J.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:365px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }
                                                }
                                            }

                                            if ('3 PUERTAS CORREDERA' == nombre) {
                                                if (screen.width < 800) {
                                                    var elem1 = $('#datosMeter' + (cont - 1));
                                                    elem1[0].style.setProperty('padding-left', '0%', 'important');
                                                    elem1[0].style.setProperty('font-size', '14px', 'important');
                                                    var elem = $('#imagen' + (cont - 1));
                                                    elem[0].style.setProperty('margin-left', '7%', 'important');
                                                    elem[0].style.setProperty('margin-top', '5%', 'important');
                                                    elem[0].style.setProperty('zoom', '85%', 'important');
                                                    elem[0].style.setProperty('height', '710px', 'important');
                                                }
                                                for (let u = 0; u <= 2; u++) {
                                                    var tipo = data.body[u]['productosDormitorio']['nombre'];

                                                    if (tipo == 'Puerta Lisa') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/OCULTA/3 PTAS PNG/' +
                                                            (u + 1) +
                                                            '-A.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:380px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }

                                                    if (tipo == 'Puerta 2 Plafones') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/OCULTA/3 PTAS PNG/' +
                                                            (u + 1) +
                                                            '-B.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:380px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }

                                                    if (tipo == 'Puerta 3 Plafones') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/OCULTA/3 PTAS PNG/' +
                                                            (u + 1) +
                                                            '-C.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:380px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }
                                                    if (tipo == 'Puerta 5 Plafones') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/OCULTA/3 PTAS PNG/' +
                                                            (u + 1) +
                                                            '-D.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:380px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }
                                                    if (tipo == 'Puerta 2 Plafones Verticales') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/OCULTA/3 PTAS PNG/' +
                                                            (u + 1) +
                                                            '-E.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:380px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }
                                                    if (tipo == 'Puerta 2 Plafones Verticales Cristal Estrecha') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/OCULTA/3 PTAS PNG/' +
                                                            (u + 1) +
                                                            '-F.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:380px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }
                                                    if (tipo == 'Puerta 2 Plafones Verticales Cristal Ancha') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/OCULTA/3 PTAS PNG/' +
                                                            (u + 1) +
                                                            '-G.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:380px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }
                                                    if (tipo == 'Puerta 2 Plafones Verticales DER') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/OCULTA/3 PTAS PNG/' +
                                                            (u + 1) +
                                                            '-H.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:380px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }

                                                    if (tipo == 'Puerta 2 Plafones Verticales Cristal Estrecha DER') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/OCULTA/3 PTAS PNG/' +
                                                            (u + 1) +
                                                            '-I.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:380px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }
                                                    if (tipo == 'Puerta 2 Plafones Verticales Cristal Ancha DER') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/OCULTA/3 PTAS PNG/' +
                                                            (u + 1) +
                                                            '-J.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:380px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }
                                                    if (screen.width < 800) {
                                                        var elem = $('#imagen' + (cont - 1));
                                                        elem[0].style.setProperty('height', '710px', 'important');
                                                    }
                                                }
                                            }

                                            if ('3 PUERTAS CORREDERA VISTA' == nombre) {
                                                if (screen.width < 800) {
                                                    var elem1 = $('#datosMeter' + (cont - 1));
                                                    elem1[0].style.setProperty('padding-left', '0%', 'important');
                                                    elem1[0].style.setProperty('font-size', '14px', 'important');
                                                    var elem = $('#imagen' + (cont - 1));
                                                    elem[0].style.setProperty('margin-left', '7%', 'important');
                                                    elem[0].style.setProperty('margin-top', '5%', 'important');
                                                    elem[0].style.setProperty('zoom', '85%', 'important');
                                                    elem[0].style.setProperty('height', '710px', 'important');
                                                }
                                                for (let u = 0; u <= 2; u++) {
                                                    var tipo = data.body[u]['productosDormitorio']['nombre'];

                                                    if (tipo == 'Puerta Lisa') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/VISTA/3 PTAS PNG/' + (u + 1) + '-A.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:380px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }

                                                    if (tipo == 'Puerta 2 Plafones') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/VISTA/3 PTAS PNG/' + (u + 1) + '-B.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:380px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }

                                                    if (tipo == 'Puerta 3 Plafones') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/VISTA/3 PTAS PNG/' + (u + 1) + '-C.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:380px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }
                                                    if (tipo == 'Puerta 5 Plafones') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/VISTA/3 PTAS PNG/' + (u + 1) + '-D.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:380px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }
                                                    if (tipo == 'Puerta 2 Plafones Verticales') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/VISTA/3 PTAS PNG/' + (u + 1) + '-E.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:380px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }
                                                    if (tipo == 'Puerta 2 Plafones Verticales Cristal Estrecha') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/VISTA/3 PTAS PNG/' + (u + 1) + '-F.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:380px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }
                                                    if (tipo == 'Puerta 2 Plafones Verticales Cristal Ancha') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/VISTA/3 PTAS PNG/' + (u + 1) + '-G.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:380px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }
                                                    if (tipo == 'Puerta 2 Plafones Verticales DER') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/VISTA/3 PTAS PNG/' + (u + 1) + '-H.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:380px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }

                                                    if (tipo == 'Puerta 2 Plafones Verticales Cristal Estrecha DER') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/VISTA/3 PTAS PNG/' + (u + 1) + '-I.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:380px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }
                                                    if (tipo == 'Puerta 2 Plafones Verticales Cristal Ancha DER') {
                                                        var src =
                                                            '../../../content/images/pruebaarmarios/VISTA/3 PTAS PNG/' + (u + 1) + '-J.png';
                                                        $('#imagen' + (cont - 1)).append(
                                                            '<img style="width:380px;position:absolute;z-index:105;margin-top:315px" src="' +
                                                                src +
                                                                '">'
                                                        );
                                                    }
                                                    if (screen.width < 800) {
                                                        var elem = $('#imagen' + (cont - 1));
                                                        elem[0].style.setProperty('height', '710px', 'important');
                                                    }
                                                }
                                            }

                                            if ('4 PUERTAS ASIMETRICAS' == nombre) {
                                                var tipo = data.body[0]['productosDormitorio']['nombre'];
                                            }

                                            if ('1 PUERTA' == nombre) {
                                                var tipo = data.body[0]['productosDormitorio']['nombre'];
                                            }

                                            if ('5 PUERTAS IZQUIERDA' == nombre) {
                                            }

                                            if ('7 PUERTAS IZQUIERDA' == nombre) {
                                            }

                                            if ('3 PUERTAS DERECHA' == nombre) {
                                                var tipo = data.body[0]['productosDormitorio']['nombre'];
                                            }

                                            if ('5 PUERTAS CENTRAL' == nombre) {
                                            }

                                            if ('7 PUERTA ASIMETRICAS' == nombre) {
                                            }

                                            if ('2 PUERTAS' == nombre) {
                                            }

                                            if ('4 PUERTAS - 2 HUECOS GRANDES' == nombre) {
                                            }

                                            if ('5 PUERTAS DERECHA' == nombre) {
                                            }

                                            if ('7 PUERTAS DERECHA' == nombre) {
                                            }

                                            if ('6 PUERTAS -3 HUECOS GRANDES' == nombre) {
                                            }

                                            if ('8 PUERTAS ASIMETRICAS' == nombre) {
                                            }

                                            if ('6 PUERTAS ASIMETRICAS' == nombre) {
                                            }
                                        });
                                    });
                                } else {
                                    if (toma[i]['dimensionesProductoTipo'] != undefined) {
                                        if (toma[i]['dimensionesProductoTipo']['mensaje'] == 'Medidas Especiales') {
                                            var medidasEspeciales = this.medEspProductoPedidoPresuService.todo;

                                            for (let k = 0; k < medidasEspeciales.length; k++) {
                                                if (medidasEspeciales[k]['productosPresupuestoPedidos']['id'] == toma[i]['id']) {
                                                    res.body[i]['dimensionesProductoTipo']['ancho'] = medidasEspeciales[k]['ancho'];
                                                    res.body[i]['dimensionesProductoTipo']['alto'] = medidasEspeciales[k]['alto'];
                                                    res.body[i]['dimensionesProductoTipo']['fondo'] = medidasEspeciales[k]['fondo'];
                                                    res.body[i]['dimensionesProductoTipo']['precio'] = medidasEspeciales[k]['precio'];
                                                    var precioEspecial = parseFloat(medidasEspeciales[k]['precio']);
                                                    precioEspecial = precioEspecial * precioPunto;
                                                    var menosPrecio = precioEspecial * 0.3;
                                                    toma[i]['dimensionesProductoTipo']['incremento'] = menosPrecio.toFixed(0);
                                                    menosPrecio = precioEspecial + menosPrecio;
                                                    toma[i]['dimensionesProductoTipo']['precio'] = menosPrecio;
                                                    var incremento = menosPrecio;
                                                    var mejorIncremento = incremento * precioPunto;
                                                    mejorIncremento = incremento + mejorIncremento;

                                                    productosPresupuesto[cont] = toma[i];
                                                    cont++;
                                                }
                                            }
                                        } else {
                                            productosPresupuesto[cont] = toma[i];
                                            cont++;
                                        }
                                    } else {
                                        productosPresupuesto[cont] = toma[i];
                                        cont++;
                                    }
                                }
                            }
                        }
                    }
                }
                for (let x = 0; x < productosPresupuesto.length; x++) {
                    if (productosPresupuesto[x]['dimensionesProductoTipo'] != null) {
                        productosPresupuesto[x]['dimensionesProductoTipo']['precio'] = productosPresupuesto[x]['dimensionesProductoTipo'][
                            'precio'
                        ].toFixed(0);
                    }
                }
                console.log(toma);
                var arraymeterparasaberespacio = [];
                if (toma.length == 1) {
                    arraymeterparasaberespacio[0] = 1;
                }
                if (toma.length == 2) {
                    arraymeterparasaberespacio[0] = 2;
                    if (toma[0]['productosDormitorio']['categoriasDormi']['id'] == 9) {
                        arraymeterparasaberespacio[0] = 2;
                        arraymeterparasaberespacio[1] = 3;
                    }
                }
                if (toma.length == 3) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 3;
                }
                if (toma.length == 4) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 4;
                }
                if (toma.length == 5) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 4;
                    arraymeterparasaberespacio[2] = 5;
                }
                if (toma.length == 6) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 4;
                    arraymeterparasaberespacio[2] = 6;
                }
                if (toma.length == 7) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 4;
                    arraymeterparasaberespacio[2] = 6;
                    arraymeterparasaberespacio[3] = 7;
                }
                if (toma.length == 8) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 4;
                    arraymeterparasaberespacio[2] = 6;
                    arraymeterparasaberespacio[3] = 8;
                }
                if (toma.length == 9) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 4;
                    arraymeterparasaberespacio[2] = 6;
                    arraymeterparasaberespacio[3] = 8;
                    arraymeterparasaberespacio[4] = 9;
                }
                if (toma.length == 10) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 4;
                    arraymeterparasaberespacio[2] = 6;
                    arraymeterparasaberespacio[3] = 8;
                    arraymeterparasaberespacio[4] = 10;
                }
                if (toma.length == 11) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 4;
                    arraymeterparasaberespacio[2] = 6;
                    arraymeterparasaberespacio[3] = 8;
                    arraymeterparasaberespacio[4] = 10;
                    arraymeterparasaberespacio[5] = 11;
                }
                if (toma.length == 12) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 4;
                    arraymeterparasaberespacio[2] = 6;
                    arraymeterparasaberespacio[3] = 8;
                    arraymeterparasaberespacio[4] = 10;
                    arraymeterparasaberespacio[5] = 12;
                }
                if (toma.length == 13) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 4;
                    arraymeterparasaberespacio[2] = 6;
                    arraymeterparasaberespacio[3] = 8;
                    arraymeterparasaberespacio[4] = 10;
                    arraymeterparasaberespacio[5] = 12;
                    arraymeterparasaberespacio[6] = 13;
                }
                if (toma.length == 14) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 4;
                    arraymeterparasaberespacio[2] = 6;
                    arraymeterparasaberespacio[3] = 8;
                    arraymeterparasaberespacio[4] = 10;
                    arraymeterparasaberespacio[5] = 12;
                    arraymeterparasaberespacio[6] = 14;
                }
                if (toma.length == 15) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 4;
                    arraymeterparasaberespacio[2] = 6;
                    arraymeterparasaberespacio[3] = 8;
                    arraymeterparasaberespacio[4] = 10;
                    arraymeterparasaberespacio[5] = 12;
                    arraymeterparasaberespacio[6] = 14;
                    arraymeterparasaberespacio[7] = 15;
                }
                if (toma.length == 16) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 4;
                    arraymeterparasaberespacio[2] = 6;
                    arraymeterparasaberespacio[3] = 8;
                    arraymeterparasaberespacio[4] = 10;
                    arraymeterparasaberespacio[5] = 12;
                    arraymeterparasaberespacio[6] = 14;
                    arraymeterparasaberespacio[7] = 16;
                }
                if (toma.length == 17) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 4;
                    arraymeterparasaberespacio[2] = 6;
                    arraymeterparasaberespacio[3] = 8;
                    arraymeterparasaberespacio[4] = 10;
                    arraymeterparasaberespacio[5] = 12;
                    arraymeterparasaberespacio[6] = 14;
                    arraymeterparasaberespacio[7] = 16;
                    arraymeterparasaberespacio[8] = 17;
                }
                this.arraysaberimagenes = arraymeterparasaberespacio;
                console.log(this.arraysaberimagenes);
                console.log('prueba');
                this.productos = productosPresupuesto;

                this.interioresArmario = todosInteriores;
                console.log(this.interioresArmario);
                console.log(this.productos);
                var precioModulosBajos = this.modulosBajos;
                var productos = toma;
                this.productosPresupuestoPedidosService.todos = toma;
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
                var olauseleles = 0;
                var yeahburi = 0;
                var precioAparadores = this.aparadores;
                var precioVitrinas = this.vitrinas;
                var precioSingulares = this.singulares;
                var acaComprobar = 0;
                console.log(productos);
                var arraymeterparasaberespacio = [];
                if (toma.length == 1) {
                    arraymeterparasaberespacio[0] = 1;
                }
                if (toma.length == 2) {
                    arraymeterparasaberespacio[0] = 2;
                    if (toma[0]['productosDormitorio']['categoriasDormi']['id'] == 9) {
                        arraymeterparasaberespacio[0] = 1;
                        arraymeterparasaberespacio[1] = 2;
                    }
                }
                if (toma.length == 3) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 3;
                }
                if (toma.length == 4) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 4;
                }
                if (toma.length == 5) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 4;
                    arraymeterparasaberespacio[2] = 5;
                }
                if (toma.length == 6) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 4;
                    arraymeterparasaberespacio[2] = 6;
                }
                if (toma.length == 7) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 4;
                    arraymeterparasaberespacio[2] = 6;
                    arraymeterparasaberespacio[3] = 7;
                }
                if (toma.length == 8) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 4;
                    arraymeterparasaberespacio[2] = 6;
                    arraymeterparasaberespacio[3] = 8;
                }
                if (toma.length == 9) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 4;
                    arraymeterparasaberespacio[2] = 6;
                    arraymeterparasaberespacio[3] = 8;
                    arraymeterparasaberespacio[4] = 9;
                }
                if (toma.length == 10) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 4;
                    arraymeterparasaberespacio[2] = 6;
                    arraymeterparasaberespacio[3] = 8;
                    arraymeterparasaberespacio[4] = 10;
                }
                if (toma.length == 11) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 4;
                    arraymeterparasaberespacio[2] = 6;
                    arraymeterparasaberespacio[3] = 8;
                    arraymeterparasaberespacio[4] = 10;
                    arraymeterparasaberespacio[5] = 11;
                }
                if (toma.length == 12) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 4;
                    arraymeterparasaberespacio[2] = 6;
                    arraymeterparasaberespacio[3] = 8;
                    arraymeterparasaberespacio[4] = 10;
                    arraymeterparasaberespacio[5] = 12;
                }
                if (toma.length == 13) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 4;
                    arraymeterparasaberespacio[2] = 6;
                    arraymeterparasaberespacio[3] = 8;
                    arraymeterparasaberespacio[4] = 10;
                    arraymeterparasaberespacio[5] = 12;
                    arraymeterparasaberespacio[6] = 13;
                }
                if (toma.length == 14) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 4;
                    arraymeterparasaberespacio[2] = 6;
                    arraymeterparasaberespacio[3] = 8;
                    arraymeterparasaberespacio[4] = 10;
                    arraymeterparasaberespacio[5] = 12;
                    arraymeterparasaberespacio[6] = 14;
                }
                if (toma.length == 15) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 4;
                    arraymeterparasaberespacio[2] = 6;
                    arraymeterparasaberespacio[3] = 8;
                    arraymeterparasaberespacio[4] = 10;
                    arraymeterparasaberespacio[5] = 12;
                    arraymeterparasaberespacio[6] = 14;
                    arraymeterparasaberespacio[7] = 15;
                }
                if (toma.length == 16) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 4;
                    arraymeterparasaberespacio[2] = 6;
                    arraymeterparasaberespacio[3] = 8;
                    arraymeterparasaberespacio[4] = 10;
                    arraymeterparasaberespacio[5] = 12;
                    arraymeterparasaberespacio[6] = 14;
                    arraymeterparasaberespacio[7] = 16;
                }
                if (toma.length == 17) {
                    arraymeterparasaberespacio[0] = 2;
                    arraymeterparasaberespacio[1] = 4;
                    arraymeterparasaberespacio[2] = 6;
                    arraymeterparasaberespacio[3] = 8;
                    arraymeterparasaberespacio[4] = 10;
                    arraymeterparasaberespacio[5] = 12;
                    arraymeterparasaberespacio[6] = 14;
                    arraymeterparasaberespacio[7] = 16;
                    arraymeterparasaberespacio[8] = 17;
                }

                this.arraysaberimagenes = arraymeterparasaberespacio;

                for (let w = 0; w < productos.length; w++) {
                    //setTimeout(function() {
                    for (let p = 0; p <= 10; p++) {
                        if (p == 10) {
                            if (
                                productos[w]['productosDormitorio'] != null &&
                                productos[w]['productosDormitorio'] != '' &&
                                productos[w]['productosDormitorio'] != undefined
                            ) {
                                if (productos[w]['productosDormitorio']['categoriasDormi']['id'] != 9) {
                                    if (productos[w]['productosDormitorio']['categoriasDormi']['id'] == 4) {
                                        if (productos[w]['direccion'] != null) {
                                            $('#datosMeter' + w).append(
                                                '<p id="pimprimirdatostexto"><span style="font-weight:600">Posicion plafones</span> &nbsp;&nbsp;&nbsp;' +
                                                    productos[w]['direccion'] +
                                                    '</p>'
                                            );
                                        }
                                    }
                                    this.productosPresupuestoPedidosService.todos[w]['acabados'] = productos[w]['acabados'];
                                    acaComprobar = 0;
                                    acabados = productos[w]['acabados'];
                                    var iluminacion = this.iluminacionProdPrePedService.metidos;
                                    console.log(productos[w]['acabados']);
                                    var apoyo;
                                    var contadorMeterImagenYTodo = 0;
                                    if (acaComprobar == 0) {
                                        if (productos != undefined) {
                                            var i = w;
                                            for (let j = 0; j < iluminacion.length; j++) {
                                                if (iluminacion[j]['productosPresupuestoPedidos']['id'] == productos[i]['id']) {
                                                    $('.' + productos[i]['id'] + 'DatosIluminacion').append(
                                                        '<p id="pimprimirdatostexto">Luz&nbsp;&nbsp;&nbsp;' +
                                                            iluminacion[j]['iluminacion']['precio'] +
                                                            ' pp</p>'
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
                                            var nombreCargarImagen;
                                            if (productos[i]['productosDormitorio']['id'] == 406) {
                                                nombreCargarImagen = 'NH232';
                                                $('#imagen' + w).append(
                                                    '<img id="imagenPresupues" style="z-index:' +
                                                        (100 - i) +
                                                        ';max-width:400px;max-height:400px;;max-width:410px;max-height:410px;" width="1000px" height="1000px" src="../../../content/images/1- PARA WEB/DORMITORIO2/' +
                                                        nombreCargarImagen +
                                                        '.jpeg">'
                                                );
                                            }
                                            if (productos[i]['productosDormitorio']['id'] == 407) {
                                                nombreCargarImagen = 'NH233';
                                                $('#imagen' + w).append(
                                                    '<img id="imagenPresupues" style="z-index:' +
                                                        (100 - i) +
                                                        ';max-width:400px;max-height:400px;;max-width:410px;max-height:410px;" width="1000px" height="1000px" src="../../../content/images/1- PARA WEB/DORMITORIO2/' +
                                                        nombreCargarImagen +
                                                        '.jpeg">'
                                                );
                                            }
                                            console.log(productos);
                                            console.log('productos');
                                            for (let k = 0; k < acabados.length; k++) {
                                                var idProdNombre = acabados[k]['productosPresupuestoPedidos']['productosDormitorio']['id'];
                                                var idProd = idProdNombre;
                                                if (idProdNombre == 315) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' TAPA :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' CASCO :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' PUERTA SUP IZQ :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 3) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' PUERTA SUP DCH :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 4) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' CUBO :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 5) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' PUERTA CEN :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 6) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' CAJON INF :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }

                                                if (idProd == 107) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cajon :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 410) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta Abatible :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 108) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cajon :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 3) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Suplemento :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 109) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta IZQ :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 3) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta DCH :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 295) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta IZQ :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 3) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta CEN :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 4) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta DCH :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 296) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">Puerta 1 :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 3) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">Puerta 2 :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 4) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">Puerta 3 :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 5) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">Puerta 4 :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }

                                                if (idProd == 111) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta Abatible :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 3) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta DCH :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 110) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta IZQ :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 3) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta Abatible :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 113) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta Abatible :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 3) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta Dch :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 112) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta IZQ :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 3) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta Abatible :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 114) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cajon Sup :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 3) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cajon Inf :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 116) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cajon Sup :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 3) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cajon Inf :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 4) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta Dch :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 115) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta IZQ :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 3) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cajon Sup :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 4) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cajon Inf :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 298) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }

                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cajon SUP :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 3) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cajon INF :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 4) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta IZQ :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 5) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta DCH :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }

                                                if (idProd == 297) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta IZQ :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 3) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta DCH :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 4) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cajon SUP :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 5) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cajon INF :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 118) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cajon Sup :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 3) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cajon Inf :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 4) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta Dch :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 117) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta IZQ :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 3) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cajon SUP :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 4) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cajon INF :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 119) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta Abatible :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 299) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cajon Interior :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 3) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta Abatible :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 301) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cajon Interior :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 3) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta Abatible :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 4) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta Dch :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 300) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta IZQ :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 3) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cajon Interior :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 4) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta Abatible :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }

                                                if (idProd == 302) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Costados y suelo :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 3) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cajon Sup :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 4) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cajon Inf :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 171) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cajon Interior :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cristal :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 172) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cajon Interior :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cristal :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 173) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cajon Interior :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cristal :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 174) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta Abatible :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 3) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Interior :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 4) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cajon CEN :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 5) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta INF IZQ :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 6) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta INF DCH :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }

                                                if (idProd == 175) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta Abatible :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 3) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Interior :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 176) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cajon IZQ :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 3) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cajon DCH :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 4) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Patas :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }

                                                if (idProd == 177) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Trasera :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 178) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 179) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }

                                                if (idProd == 159) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 158) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 161) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta IZQ :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta DCH :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 160) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta IZQ :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta DCH :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 163) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }

                                                if (idProd == 162) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 331) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 330) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 165) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta IZQ :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta DCH :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 164) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta IZQ :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta DCH :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 167) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta Sup :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta Inf :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 166) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta Sup :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta Inf :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 169) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta Sup :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta Inf :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 168) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta Sup :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta Inf :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 170) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cruceta :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta Sup :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 3) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta Cen :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 4) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta Inf :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }

                                                if (idProd == 180) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Estantes :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Trasera :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 181) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Estantes :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Trasera :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 183) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Estantes :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Trasera :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 3) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 182) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Estantes :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Trasera :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 3) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Puerta :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }

                                                if (idProd == 204) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 332) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 205) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 333) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 206) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 207) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 208) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 209) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 210) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 211) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }

                                                if (idProd == 213) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Patas :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 214) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Patas :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }

                                                if (idProd == 21) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Patas :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 216) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Patas :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 217) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 2) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cajones :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }

                                                if (idProd == 218) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Patas :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 219) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Patas :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 220) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cubo :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 221) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Casco :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Cubo DCH:</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 222) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Patas :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }
                                                if (idProd == 223) {
                                                    if (k == 0) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Tapa :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                    if (k == 1) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                                (k + 1) +
                                                                ' Patas :</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                                contador +
                                                                '">' +
                                                                acabados[k]['acabados']['nombre'] +
                                                                '</span></p>'
                                                        );
                                                    }
                                                }

                                                this.mainComponent.presuSaberAca(idProd, acabados, k, productos, i, contador);

                                                if (
                                                    idProd != 107 &&
                                                    idProd != 410 &&
                                                    idProd != 81 &&
                                                    idProd != 316 &&
                                                    idProd != 315 &&
                                                    idProd != 108 &&
                                                    idProd != 109 &&
                                                    idProd != 295 &&
                                                    idProd != 296 &&
                                                    idProd != 111 &&
                                                    idProd != 110 &&
                                                    idProd != 113 &&
                                                    idProd != 112 &&
                                                    idProd != 114 &&
                                                    idProd != 116 &&
                                                    idProd != 115 &&
                                                    idProd != 298 &&
                                                    idProd != 297 &&
                                                    idProd != 118 &&
                                                    idProd != 117 &&
                                                    idProd != 119 &&
                                                    idProd != 299 &&
                                                    idProd != 301 &&
                                                    idProd != 300 &&
                                                    idProd != 302 &&
                                                    idProd != 171 &&
                                                    idProd != 172 &&
                                                    idProd != 173 &&
                                                    idProd != 174 &&
                                                    idProd != 175 &&
                                                    idProd != 176 &&
                                                    idProd != 177 &&
                                                    idProd != 178 &&
                                                    idProd != 179 &&
                                                    idProd != 159 &&
                                                    idProd != 158 &&
                                                    idProd != 161 &&
                                                    idProd != 160 &&
                                                    idProd != 163 &&
                                                    idProd != 162 &&
                                                    idProd != 331 &&
                                                    idProd != 330 &&
                                                    idProd != 165 &&
                                                    idProd != 164 &&
                                                    idProd != 167 &&
                                                    idProd != 166 &&
                                                    idProd != 169 &&
                                                    idProd != 168 &&
                                                    idProd != 170 &&
                                                    idProd != 180 &&
                                                    idProd != 181 &&
                                                    idProd != 183 &&
                                                    idProd != 182 &&
                                                    idProd != 204 &&
                                                    idProd != 332 &&
                                                    idProd != 205 &&
                                                    idProd != 333 &&
                                                    idProd != 206 &&
                                                    idProd != 207 &&
                                                    idProd != 208 &&
                                                    idProd != 209 &&
                                                    idProd != 210 &&
                                                    idProd != 211 &&
                                                    idProd != 213 &&
                                                    idProd != 214 &&
                                                    idProd != 215 &&
                                                    idProd != 216 &&
                                                    idProd != 217 &&
                                                    idProd != 218 &&
                                                    idProd != 219 &&
                                                    idProd != 220 &&
                                                    idProd != 221 &&
                                                    idProd != 222 &&
                                                    idProd != 223 &&
                                                    idProd != 334 &&
                                                    idProd != 303 &&
                                                    idProd != 14 &&
                                                    idProd != 304 &&
                                                    idProd != 53 &&
                                                    idProd != 305 &&
                                                    idProd != 62 &&
                                                    idProd != 306 &&
                                                    idProd != 63 &&
                                                    idProd != 307 &&
                                                    idProd != 64 &&
                                                    idProd != 308 &&
                                                    idProd != 65 &&
                                                    idProd != 309 &&
                                                    idProd != 66 &&
                                                    idProd != 310 &&
                                                    idProd != 67 &&
                                                    idProd != 311 &&
                                                    idProd != 68 &&
                                                    idProd != 312 &&
                                                    idProd != 69 &&
                                                    idProd != 336 &&
                                                    idProd != 335 &&
                                                    idProd != 338 &&
                                                    idProd != 337 &&
                                                    idProd != 184 &&
                                                    idProd != 185 &&
                                                    idProd != 186 &&
                                                    idProd != 188 &&
                                                    idProd != 187 &&
                                                    idProd != 189 &&
                                                    idProd != 194 &&
                                                    idProd != 190 &&
                                                    idProd != 195 &&
                                                    idProd != 191 &&
                                                    idProd != 196 &&
                                                    idProd != 200 &&
                                                    idProd != 192 &&
                                                    idProd != 198 &&
                                                    idProd != 197 &&
                                                    idProd != 201 &&
                                                    idProd != 202 &&
                                                    idProd != 203 &&
                                                    idProd != 193 &&
                                                    idProd != 199 &&
                                                    idProd != 275 &&
                                                    idProd != 276 &&
                                                    idProd != 73 &&
                                                    idProd != 72 &&
                                                    idProd != 75 &&
                                                    idProd != 74 &&
                                                    idProd != 87 &&
                                                    idProd != 86 &&
                                                    idProd != 77 &&
                                                    idProd != 76 &&
                                                    idProd != 313 &&
                                                    idProd != 78 &&
                                                    idProd != 314 &&
                                                    idProd != 79 &&
                                                    idProd != 92 &&
                                                    idProd != 319 &&
                                                    idProd != 84 &&
                                                    idProd != 320 &&
                                                    idProd != 85 &&
                                                    idProd != 325 &&
                                                    idProd != 324 &&
                                                    idProd != 327 &&
                                                    idProd != 326 &&
                                                    idProd != 317 &&
                                                    idProd != 82 &&
                                                    idProd != 318 &&
                                                    idProd != 83 &&
                                                    idProd != 321 &&
                                                    idProd != 90 &&
                                                    idProd != 329 &&
                                                    idProd != 328 &&
                                                    idProd != 330 &&
                                                    idProd != 331 &&
                                                    idProd != 89 &&
                                                    idProd != 88 &&
                                                    idProd != 322 &&
                                                    idProd != 91 &&
                                                    idProd != 80 &&
                                                    idProd != 277 &&
                                                    idProd != 278 &&
                                                    idProd != 279 &&
                                                    idProd != 280 &&
                                                    idProd != 281 &&
                                                    idProd != 282 &&
                                                    idProd != 246 &&
                                                    idProd != 283 &&
                                                    idProd != 284 &&
                                                    idProd != 285 &&
                                                    idProd != 1 &&
                                                    idProd != 2 &&
                                                    idProd != 3 &&
                                                    idProd != 4 &&
                                                    idProd != 5 &&
                                                    idProd != 6 &&
                                                    idProd != 7 &&
                                                    idProd != 8 &&
                                                    idProd != 9 &&
                                                    idProd != 10 &&
                                                    idProd != 11 &&
                                                    idProd != 12 &&
                                                    idProd != 13 &&
                                                    idProd != 376 &&
                                                    idProd != 238 &&
                                                    idProd != 239 &&
                                                    idProd != 240 &&
                                                    idProd != 241 &&
                                                    idProd != 242 &&
                                                    idProd != 243 &&
                                                    idProd != 244 &&
                                                    idProd != 245 &&
                                                    idProd != 230 &&
                                                    idProd != 231 &&
                                                    idProd != 232 &&
                                                    idProd != 233 &&
                                                    idProd != 234 &&
                                                    idProd != 235 &&
                                                    idProd != 246 &&
                                                    idProd != 247 &&
                                                    idProd != 248 &&
                                                    idProd != 249 &&
                                                    idProd != 250 &&
                                                    idProd != 251 &&
                                                    idProd != 252 &&
                                                    idProd != 253 &&
                                                    idProd != 254 &&
                                                    idProd != 255 &&
                                                    idProd != 256 &&
                                                    idProd != 257 &&
                                                    idProd != 258 &&
                                                    idProd != 259 &&
                                                    idProd != 260 &&
                                                    idProd != 261 &&
                                                    idProd != 262 &&
                                                    idProd != 263 &&
                                                    idProd != 264 &&
                                                    idProd != 265 &&
                                                    idProd != 266 &&
                                                    idProd != 267 &&
                                                    idProd != 268 &&
                                                    idProd != 269 &&
                                                    idProd != 270 &&
                                                    idProd != 271 &&
                                                    idProd != 272 &&
                                                    idProd != 273 &&
                                                    idProd != 274 &&
                                                    idProd != 275 &&
                                                    idProd != 276 &&
                                                    idProd != 277 &&
                                                    idProd != 278 &&
                                                    idProd != 279 &&
                                                    idProd != 280 &&
                                                    idProd != 281 &&
                                                    idProd != 282 &&
                                                    idProd != 340 &&
                                                    idProd != 360 &&
                                                    idProd != 361 &&
                                                    idProd != 362 &&
                                                    idProd != 363 &&
                                                    idProd != 364 &&
                                                    idProd != 365 &&
                                                    idProd != 366 &&
                                                    idProd != 367 &&
                                                    idProd != 368 &&
                                                    idProd != 369 &&
                                                    idProd != 370 &&
                                                    idProd != 371 &&
                                                    idProd != 372 &&
                                                    idProd != 373 &&
                                                    idProd != 374 &&
                                                    idProd != 375 &&
                                                    idProd != 316 &&
                                                    idProd != 236 &&
                                                    idProd != 237 &&
                                                    idProd != 339 &&
                                                    idProd != 81 &&
                                                    idProd != 352 &&
                                                    idProd != 353 &&
                                                    idProd != 354 &&
                                                    idProd != 355 &&
                                                    idProd != 356 &&
                                                    idProd != 357 &&
                                                    idProd != 358 &&
                                                    idProd != 359 &&
                                                    idProd != 409 &&
                                                    idProd != 413 &&
                                                    idProd != 414 &&
                                                    idProd != 418
                                                ) {
                                                    $('.' + productos[i]['id'] + 'Datos').append(
                                                        '<p id="pimprimirdatostexto"><span style="font-weight:600">Acabado ' +
                                                            contador +
                                                            '</span>&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                            contador +
                                                            '">' +
                                                            acabados[k]['acabados']['nombre'] +
                                                            '</span></p>'
                                                    );
                                                }
                                                var prodNombre =
                                                    acabados[k]['productosPresupuestoPedidos']['productosDormitorio']['nombre'];

                                                var nombreCargarImagen;
                                                if (idProdNombre == 277) {
                                                    nombreCargarImagen = 'NT007-NT022';
                                                }
                                                if (idProdNombre == 277) {
                                                    nombreCargarImagen = 'NT007-NT022';
                                                }
                                                if (idProdNombre == 275) {
                                                    nombreCargarImagen = 'NT001-NT004';
                                                }
                                                if (idProdNombre == 276) {
                                                    nombreCargarImagen = 'NT005-NT006';
                                                }
                                                if (idProdNombre == 278) {
                                                    nombreCargarImagen = 'NT023-NT038';
                                                }
                                                if (idProdNombre == 352) {
                                                    nombreCargarImagen = productos[w]['dimensionesProductoTipo']['mensaje'];
                                                }
                                                if (idProdNombre == 353) {
                                                    nombreCargarImagen = productos[w]['dimensionesProductoTipo']['mensaje'];
                                                }
                                                if (idProdNombre == 354) {
                                                    nombreCargarImagen = productos[w]['dimensionesProductoTipo']['mensaje'];
                                                }
                                                if (idProdNombre == 355) {
                                                    nombreCargarImagen = productos[w]['dimensionesProductoTipo']['mensaje'];
                                                }
                                                if (idProdNombre == 356) {
                                                    nombreCargarImagen = productos[w]['dimensionesProductoTipo']['mensaje'];
                                                }
                                                if (idProdNombre == 357) {
                                                    nombreCargarImagen = productos[w]['dimensionesProductoTipo']['mensaje'];
                                                }
                                                if (idProdNombre == 358) {
                                                    nombreCargarImagen = productos[w]['dimensionesProductoTipo']['mensaje'];
                                                }
                                                if (idProdNombre == 359) {
                                                    nombreCargarImagen = productos[w]['dimensionesProductoTipo']['mensaje'];
                                                }
                                                if (idProdNombre == 402) {
                                                    nombreCargarImagen = productos[w]['dimensionesProductoTipo']['mensaje'];
                                                }
                                                if (idProdNombre == 408) {
                                                    nombreCargarImagen = 'NH200-NH210';
                                                }
                                                if (idProdNombre == 279) {
                                                    nombreCargarImagen = 'NT039-NT054';
                                                }
                                                if (idProdNombre == 280) {
                                                    nombreCargarImagen = 'NT055-NT070';
                                                }
                                                if (idProdNombre == 281) {
                                                    nombreCargarImagen = 'NT071-NT078';
                                                }
                                                if (idProdNombre == 246) {
                                                    nombreCargarImagen = 'NT079-NT094';
                                                }
                                                if (idProdNombre == 413) {
                                                    nombreCargarImagen = 'NT087-NT094';
                                                }
                                                if (idProdNombre == 18) {
                                                    nombreCargarImagen = 'NH200-NH210';
                                                }
                                                if (idProdNombre == 17) {
                                                    nombreCargarImagen = 'NH211-NH229';
                                                }
                                                if (idProdNombre == 404) {
                                                    nombreCargarImagen = 'NH230';
                                                }
                                                if (idProdNombre == 405) {
                                                    nombreCargarImagen = 'NH231';
                                                }
                                                if (idProdNombre == 406) {
                                                    nombreCargarImagen = 'NH232';
                                                }
                                                if (idProdNombre == 407) {
                                                    nombreCargarImagen = 'NH233';
                                                }
                                                if (idProdNombre == 282) {
                                                    nombreCargarImagen = 'NT095-NT110';
                                                }
                                                if (idProdNombre == 414) {
                                                    nombreCargarImagen = 'NT103-NT110';
                                                }
                                                if (idProdNombre == 247) {
                                                    nombreCargarImagen = 'NT111-NT115';
                                                }
                                                if (idProdNombre == 249) {
                                                    nombreCargarImagen = 'NT116-NT123';
                                                }
                                                if (idProdNombre == 250) {
                                                    nombreCargarImagen = 'NT116-NT123';
                                                }
                                                if (idProdNombre == 248) {
                                                    nombreCargarImagen = 'NT124-NT143';
                                                }
                                                if (idProdNombre == 251) {
                                                    nombreCargarImagen = 'NT144-NT148';
                                                }
                                                if (idProdNombre == 253) {
                                                    nombreCargarImagen = 'NT149-NT156';
                                                }
                                                if (idProdNombre == 254) {
                                                    nombreCargarImagen = 'NT149-NT156';
                                                }
                                                if (idProdNombre == 252) {
                                                    nombreCargarImagen = 'NT157-NT176';
                                                }
                                                if (idProdNombre == 255) {
                                                    nombreCargarImagen = 'NT177-NT181';
                                                }
                                                if (idProdNombre == 257) {
                                                    nombreCargarImagen = 'NT182-NT185';
                                                }
                                                if (idProdNombre == 258) {
                                                    nombreCargarImagen = 'NT186-NT189';
                                                }
                                                if (idProdNombre == 256) {
                                                    nombreCargarImagen = 'NT190-NT209';
                                                }
                                                if (idProdNombre == 259) {
                                                    nombreCargarImagen = 'NT210-NT211';
                                                }
                                                if (idProdNombre == 261) {
                                                    nombreCargarImagen = 'NT212-NT219';
                                                }
                                                if (idProdNombre == 262) {
                                                    nombreCargarImagen = 'NT212-NT219';
                                                }
                                                if (idProdNombre == 260) {
                                                    nombreCargarImagen = 'NT220-NT227';
                                                }

                                                if (idProdNombre == 263) {
                                                    nombreCargarImagen = 'NT228-NT229';
                                                }
                                                if (idProdNombre == 266) {
                                                    nombreCargarImagen = 'NT230-NT237';
                                                }
                                                if (idProdNombre == 265) {
                                                    nombreCargarImagen = 'NT230-NT237';
                                                }
                                                if (idProdNombre == 264) {
                                                    nombreCargarImagen = 'NT238-NT245';
                                                }

                                                if (idProdNombre == 271) {
                                                    nombreCargarImagen = 'NT246-NT250';
                                                }
                                                if (idProdNombre == 274) {
                                                    nombreCargarImagen = 'NT251-NT258';
                                                }
                                                if (idProdNombre == 273) {
                                                    nombreCargarImagen = 'NT251-NT258';
                                                }
                                                if (idProdNombre == 272) {
                                                    nombreCargarImagen = 'NT259-NT278';
                                                }

                                                if (idProdNombre == 267) {
                                                    nombreCargarImagen = 'NT279-NT280';
                                                }
                                                if (idProdNombre == 269) {
                                                    nombreCargarImagen = 'NT281-NT288';
                                                }
                                                if (idProdNombre == 270) {
                                                    nombreCargarImagen = 'NT281-NT288';
                                                }
                                                if (idProdNombre == 268) {
                                                    nombreCargarImagen = 'NT289-NT296';
                                                }
                                                if (idProdNombre == 418) {
                                                    nombreCargarImagen = 'NH512';
                                                }
                                                if (idProdNombre == 283) {
                                                    nombreCargarImagen = 'NT297-NT314';
                                                }
                                                if (idProdNombre == 284) {
                                                    nombreCargarImagen = 'NT315-NT332';
                                                }
                                                if (idProdNombre == 285) {
                                                    nombreCargarImagen = 'NT333-NT350';
                                                }
                                                if (idProdNombre == 1) {
                                                    nombreCargarImagen = 'NX001-NX004';
                                                }
                                                if (idProdNombre == 2) {
                                                    nombreCargarImagen = 'NX005-NX008';
                                                }
                                                if (idProdNombre == 3) {
                                                    nombreCargarImagen = 'NX009-NX012';
                                                }
                                                if (idProdNombre == 4) {
                                                    nombreCargarImagen = 'NX013-NX016';
                                                }
                                                if (idProdNombre == 5) {
                                                    nombreCargarImagen = 'NX017-NX020';
                                                }
                                                if (idProdNombre == 6) {
                                                    nombreCargarImagen = 'NX021-NX024';
                                                }
                                                if (idProdNombre == 7) {
                                                    nombreCargarImagen = 'NX025-NX028';
                                                }
                                                if (idProdNombre == 8) {
                                                    nombreCargarImagen = 'NX029-NX032';
                                                }
                                                if (idProdNombre == 9) {
                                                    nombreCargarImagen = 'NX033-NX036';
                                                }
                                                if (idProdNombre == 10) {
                                                    nombreCargarImagen = 'NX037-NX040';
                                                }
                                                if (idProdNombre == 11) {
                                                    nombreCargarImagen = 'NX041-NX044';
                                                }
                                                if (idProdNombre == 12) {
                                                    nombreCargarImagen = 'NX045-NX048';
                                                }
                                                if (idProdNombre == 13) {
                                                    nombreCargarImagen = 'NX049-NX052';
                                                }
                                                if (idProdNombre == 376) {
                                                    nombreCargarImagen = 'NX053';
                                                }
                                                if (idProdNombre == 238) {
                                                    nombreCargarImagen = 'NX054-NX057';
                                                }
                                                if (idProdNombre == 239) {
                                                    nombreCargarImagen = 'NX058-NX061';
                                                }
                                                if (idProdNombre == 240) {
                                                    nombreCargarImagen = 'NX062-NX065';
                                                }
                                                if (idProdNombre == 241) {
                                                    nombreCargarImagen = 'NX066-NX069';
                                                }

                                                if (idProdNombre == 242) {
                                                    nombreCargarImagen = 'NX070';
                                                }
                                                if (idProdNombre == 243) {
                                                    nombreCargarImagen = 'NX071';
                                                }
                                                if (idProdNombre == 244) {
                                                    nombreCargarImagen = 'NX072';
                                                }
                                                if (idProdNombre == 245) {
                                                    nombreCargarImagen = 'NX073';
                                                }
                                                if (idProdNombre == 230) {
                                                    nombreCargarImagen = 'NX074';
                                                }
                                                if (idProdNombre == 231) {
                                                    nombreCargarImagen = 'NX075';
                                                }
                                                if (idProdNombre == 232) {
                                                    nombreCargarImagen = 'NX076';
                                                }
                                                if (idProdNombre == 233) {
                                                    nombreCargarImagen = 'NX077';
                                                }
                                                if (idProdNombre == 234) {
                                                    nombreCargarImagen = 'NX078';
                                                }
                                                if (idProdNombre == 235) {
                                                    nombreCargarImagen = 'NX079';
                                                }
                                                if (idProdNombre == 236) {
                                                    nombreCargarImagen = 'NX080';
                                                }
                                                if (idProdNombre == 237) {
                                                    nombreCargarImagen = 'NX081';
                                                }
                                                if (idProdNombre == 107) {
                                                    nombreCargarImagen = 'NH001-NH006';
                                                }
                                                if (idProdNombre == 410) {
                                                    nombreCargarImagen = 'NH007-NH010';
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
                                                    nombreCargarImagen = 'NH025-NH028';
                                                }
                                                if (idProdNombre == 113) {
                                                    nombreCargarImagen = 'NH029-NH032';
                                                }
                                                if (idProdNombre == 112) {
                                                    nombreCargarImagen = 'NH033-NH036';
                                                }
                                                if (idProdNombre == 114) {
                                                    nombreCargarImagen = 'NH037-NH041';
                                                }
                                                if (idProdNombre == 116) {
                                                    nombreCargarImagen = 'NH042-NH045';
                                                }
                                                if (idProdNombre == 115) {
                                                    nombreCargarImagen = 'NH046-NH049';
                                                }
                                                if (idProdNombre == 298) {
                                                    nombreCargarImagen = 'NH050-NH051';
                                                }
                                                if (idProdNombre == 297) {
                                                    nombreCargarImagen = 'NH052-NH053';
                                                }
                                                if (idProdNombre == 118) {
                                                    nombreCargarImagen = 'NH054-NH057';
                                                }
                                                if (idProdNombre == 117) {
                                                    nombreCargarImagen = 'NH058-NH061';
                                                }
                                                if (idProdNombre == 119) {
                                                    nombreCargarImagen = 'NH062-NH066';
                                                }
                                                if (idProdNombre == 299) {
                                                    nombreCargarImagen = 'NH067-NH069';
                                                }
                                                if (idProdNombre == 301) {
                                                    nombreCargarImagen = 'NH070-NH071';
                                                }
                                                if (idProdNombre == 300) {
                                                    nombreCargarImagen = 'NH072-NH073';
                                                }
                                                if (idProdNombre == 302) {
                                                    nombreCargarImagen = 'NH074-NH077';
                                                }
                                                if (idProdNombre == 334) {
                                                    nombreCargarImagen = 'NH078-NH079';
                                                }
                                                if (idProdNombre == 303) {
                                                    nombreCargarImagen = 'NH080-NH081';
                                                }
                                                if (idProdNombre == 14) {
                                                    nombreCargarImagen = 'NH082-NH083';
                                                }
                                                if (idProdNombre == 304) {
                                                    nombreCargarImagen = 'NH084';
                                                }
                                                if (idProdNombre == 53) {
                                                    nombreCargarImagen = 'NH085';
                                                }
                                                if (idProdNombre == 305) {
                                                    nombreCargarImagen = 'NH086-NH088';
                                                }
                                                if (idProdNombre == 62) {
                                                    nombreCargarImagen = 'NH089-NH091';
                                                }
                                                if (idProdNombre == 306) {
                                                    nombreCargarImagen = 'NH092-NH094';
                                                }
                                                if (idProdNombre == 63) {
                                                    nombreCargarImagen = 'NH095-NH097';
                                                }
                                                if (idProdNombre == 307) {
                                                    nombreCargarImagen = 'NH098-NH100';
                                                }
                                                if (idProdNombre == 64) {
                                                    nombreCargarImagen = 'NH101-NH103';
                                                }
                                                if (idProdNombre == 308) {
                                                    nombreCargarImagen = 'NH104-NH106';
                                                }
                                                if (idProdNombre == 65) {
                                                    nombreCargarImagen = 'NH107-NH109';
                                                }
                                                if (idProdNombre == 308) {
                                                    nombreCargarImagen = 'NH104-NH106';
                                                }
                                                if (idProdNombre == 65) {
                                                    nombreCargarImagen = 'NH107-NH109';
                                                }
                                                if (idProdNombre == 309) {
                                                    nombreCargarImagen = 'NH110-NH112';
                                                }
                                                if (idProdNombre == 66) {
                                                    nombreCargarImagen = 'NH113-NH115';
                                                }
                                                if (idProdNombre == 310) {
                                                    nombreCargarImagen = 'NH116-NH118';
                                                }
                                                if (idProdNombre == 67) {
                                                    nombreCargarImagen = 'NH119-NH121';
                                                }
                                                if (idProdNombre == 311) {
                                                    nombreCargarImagen = 'NH122-NH124';
                                                }
                                                if (idProdNombre == 68) {
                                                    nombreCargarImagen = 'NH125-NH127';
                                                }
                                                if (idProdNombre == 312) {
                                                    nombreCargarImagen = 'NH128';
                                                }
                                                if (idProdNombre == 69) {
                                                    nombreCargarImagen = 'NH129';
                                                }
                                                if (idProdNombre == 336) {
                                                    nombreCargarImagen = 'NH130-NH131';
                                                }
                                                if (idProdNombre == 335) {
                                                    nombreCargarImagen = 'NH132-NH133';
                                                }
                                                if (idProdNombre == 338) {
                                                    nombreCargarImagen = 'NH134';
                                                }
                                                if (idProdNombre == 337) {
                                                    nombreCargarImagen = 'NH135';
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
                                                    nombreCargarImagen = 'NH139-NH140';
                                                }
                                                if (idProdNombre == 72) {
                                                    nombreCargarImagen = 'NH141-NH142';
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
                                                if (idProdNombre == 78) {
                                                    nombreCargarImagen = 'NH150';
                                                }
                                                if (idProdNombre == 314) {
                                                    nombreCargarImagen = 'NH151';
                                                }
                                                if (idProdNombre == 79) {
                                                    nombreCargarImagen = 'NH152';
                                                }
                                                if (idProdNombre == 92) {
                                                    nombreCargarImagen = 'NH153';
                                                }
                                                if (idProdNombre == 319) {
                                                    nombreCargarImagen = 'NH154';
                                                }
                                                if (idProdNombre == 320) {
                                                    nombreCargarImagen = 'NH156';
                                                }
                                                if (idProdNombre == 85) {
                                                    nombreCargarImagen = 'NH157';
                                                }
                                                if (idProdNombre == 73) {
                                                    nombreCargarImagen = 'NH158-NH159';
                                                }
                                                if (idProdNombre == 72) {
                                                    nombreCargarImagen = 'NH160-NH161';
                                                }
                                                if (idProdNombre == 75) {
                                                    nombreCargarImagen = 'NH162';
                                                }
                                                if (idProdNombre == 74) {
                                                    nombreCargarImagen = 'NH163';
                                                }
                                                if (idProdNombre == 87) {
                                                    nombreCargarImagen = 'NH164';
                                                }
                                                if (idProdNombre == 86) {
                                                    nombreCargarImagen = 'NH165';
                                                }
                                                if (idProdNombre == 77) {
                                                    nombreCargarImagen = 'NH166';
                                                }
                                                if (idProdNombre == 76) {
                                                    nombreCargarImagen = 'NH167';
                                                }
                                                if (idProdNombre == 325) {
                                                    nombreCargarImagen = 'NH168';
                                                }
                                                if (idProdNombre == 324) {
                                                    nombreCargarImagen = 'NH169';
                                                }
                                                if (idProdNombre == 327) {
                                                    nombreCargarImagen = 'NH170';
                                                }
                                                if (idProdNombre == 326) {
                                                    nombreCargarImagen = 'NH171';
                                                }
                                                if (idProdNombre == 317) {
                                                    nombreCargarImagen = 'NH172';
                                                }
                                                if (idProdNombre == 82) {
                                                    nombreCargarImagen = 'NH173';
                                                }
                                                if (idProdNombre == 318) {
                                                    nombreCargarImagen = 'NH174';
                                                }
                                                if (idProdNombre == 83) {
                                                    nombreCargarImagen = 'NH175';
                                                }
                                                if (idProdNombre == 321) {
                                                    nombreCargarImagen = 'NH176';
                                                }
                                                if (idProdNombre == 90) {
                                                    nombreCargarImagen = 'NH177';
                                                }
                                                if (idProdNombre == 92) {
                                                    nombreCargarImagen = 'NH178';
                                                }
                                                if (idProdNombre == 320) {
                                                    nombreCargarImagen = 'NH179';
                                                }
                                                if (idProdNombre == 85) {
                                                    nombreCargarImagen = 'NH180';
                                                }
                                                if (idProdNombre == 329) {
                                                    nombreCargarImagen = 'NH181';
                                                }
                                                if (idProdNombre == 328) {
                                                    nombreCargarImagen = 'NH182';
                                                }
                                                if (idProdNombre == 340) {
                                                    nombreCargarImagen = 'NH183';
                                                }
                                                if (idProdNombre == 339) {
                                                    nombreCargarImagen = 'NH184';
                                                }
                                                if (idProdNombre == 73) {
                                                    nombreCargarImagen = 'NH185';
                                                }
                                                if (idProdNombre == 72) {
                                                    nombreCargarImagen = 'NH186';
                                                }
                                                if (idProdNombre == 77) {
                                                    nombreCargarImagen = 'NH187';
                                                }
                                                if (idProdNombre == 76) {
                                                    nombreCargarImagen = 'NH188';
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
                                                if (idProdNombre == 91) {
                                                    nombreCargarImagen = 'NH192';
                                                }
                                                if (idProdNombre == 315) {
                                                    nombreCargarImagen = 'NH193';
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
                                                if (idProdNombre == 176) {
                                                    nombreCargarImagen = 'NH199';
                                                }
                                                if (idProdNombre == 18) {
                                                    nombreCargarImagen = 'NH200-NH210';
                                                }
                                                if (idProdNombre == 17) {
                                                    nombreCargarImagen = 'NH211-NH229';
                                                }
                                                if (idProdNombre == 404) {
                                                    nombreCargarImagen = 'NH230';
                                                }
                                                if (idProdNombre == 405) {
                                                    nombreCargarImagen = 'NH231';
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
                                                if (idProdNombre == 159) {
                                                    nombreCargarImagen = 'NH252';
                                                }
                                                if (idProdNombre == 158) {
                                                    nombreCargarImagen = 'NH253';
                                                }
                                                if (idProdNombre == 331) {
                                                    nombreCargarImagen = 'NH254';
                                                }
                                                if (idProdNombre == 330) {
                                                    nombreCargarImagen = 'NH255';
                                                }
                                                if (idProdNombre == 161) {
                                                    nombreCargarImagen = 'NH256';
                                                }
                                                if (idProdNombre == 160) {
                                                    nombreCargarImagen = 'NH257';
                                                }
                                                if (idProdNombre == 165) {
                                                    nombreCargarImagen = 'NH258';
                                                }
                                                if (idProdNombre == 164) {
                                                    nombreCargarImagen = 'NH259';
                                                }
                                                if (idProdNombre == 159) {
                                                    nombreCargarImagen = 'NH260-NH262';
                                                }
                                                if (idProdNombre == 158) {
                                                    nombreCargarImagen = 'NH263-NH265';
                                                }
                                                if (idProdNombre == 331) {
                                                    nombreCargarImagen = 'NH266';
                                                }
                                                if (idProdNombre == 330) {
                                                    nombreCargarImagen = 'NH267';
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
                                                if (idProdNombre == 167) {
                                                    nombreCargarImagen = 'NH273';
                                                }
                                                if (idProdNombre == 166) {
                                                    nombreCargarImagen = 'NH274';
                                                }
                                                if (idProdNombre == 159) {
                                                    nombreCargarImagen = 'NH275';
                                                }
                                                if (idProdNombre == 158) {
                                                    nombreCargarImagen = 'NH276';
                                                }
                                                if (idProdNombre == 331) {
                                                    nombreCargarImagen = 'NH277';
                                                }
                                                if (idProdNombre == 330) {
                                                    nombreCargarImagen = 'NH278';
                                                }
                                                if (idProdNombre == 180) {
                                                    nombreCargarImagen = 'NH279-NH280';
                                                }
                                                if (idProdNombre == 181) {
                                                    nombreCargarImagen = 'NH281-NH282';
                                                }
                                                if (idProdNombre == 182) {
                                                    nombreCargarImagen = 'NH283';
                                                }
                                                if (idProdNombre == 183) {
                                                    nombreCargarImagen = 'NH284';
                                                }
                                                if (idProdNombre == 181) {
                                                    nombreCargarImagen = 'NH285-NH286';
                                                }
                                                if (idProdNombre == 183) {
                                                    nombreCargarImagen = 'NH287';
                                                }
                                                if (idProdNombre == 182) {
                                                    nombreCargarImagen = 'NH288';
                                                }
                                                if (idProdNombre == 184) {
                                                    nombreCargarImagen = 'NH289-NH293';
                                                }
                                                if (idProdNombre == 185) {
                                                    nombreCargarImagen = 'NH294-NH298';
                                                }
                                                if (idProdNombre == 186) {
                                                    nombreCargarImagen = 'NH299-NH303';
                                                }
                                                if (idProdNombre == 188) {
                                                    nombreCargarImagen = 'NH304-NH308';
                                                }

                                                if (idProdNombre == 187) {
                                                    nombreCargarImagen = 'NH309-NH313';
                                                }
                                                if (idProdNombre == 189) {
                                                    nombreCargarImagen = 'NH314-NH318';
                                                }
                                                if (idProdNombre == 194) {
                                                    nombreCargarImagen = 'NH319-NH320';
                                                }
                                                if (idProdNombre == 190) {
                                                    nombreCargarImagen = 'NH321-NH322';
                                                }
                                                if (idProdNombre == 195) {
                                                    nombreCargarImagen = 'NH323-NH324';
                                                }
                                                if (idProdNombre == 191) {
                                                    nombreCargarImagen = 'NH325-NH326';
                                                }
                                                if (idProdNombre == 196) {
                                                    nombreCargarImagen = 'NH327-NH331';
                                                }
                                                if (idProdNombre == 200) {
                                                    nombreCargarImagen = 'NH332-NH336';
                                                }
                                                if (idProdNombre == 192) {
                                                    nombreCargarImagen = 'NH337-NH341';
                                                }
                                                if (idProdNombre == 198) {
                                                    nombreCargarImagen = 'NH342-NH346';
                                                }
                                                if (idProdNombre == 197) {
                                                    nombreCargarImagen = 'NH347-NH351';
                                                }
                                                if (idProdNombre == 201) {
                                                    nombreCargarImagen = 'NH352-NH356';
                                                }
                                                if (idProdNombre == 193) {
                                                    nombreCargarImagen = 'NH357-NH361';
                                                }
                                                if (idProdNombre == 199) {
                                                    nombreCargarImagen = 'NH362-NH366';
                                                }
                                                if (idProdNombre == 202) {
                                                    nombreCargarImagen = 'NH367-NH371';
                                                }
                                                if (idProdNombre == 203) {
                                                    nombreCargarImagen = 'NH372-NH373';
                                                }
                                                if (idProdNombre == 360) {
                                                    nombreCargarImagen = 'NH374-NH376';
                                                }
                                                if (idProdNombre == 361) {
                                                    nombreCargarImagen = 'NH377-NH379';
                                                }
                                                if (idProdNombre == 362) {
                                                    nombreCargarImagen = 'NH380-NH382';
                                                }
                                                if (idProdNombre == 363) {
                                                    nombreCargarImagen = 'NH383-NH385';
                                                }
                                                if (idProdNombre == 364) {
                                                    nombreCargarImagen = 'NH386-NH388';
                                                }
                                                if (idProdNombre == 365) {
                                                    nombreCargarImagen = 'NH389-NH391';
                                                }
                                                if (idProdNombre == 366) {
                                                    nombreCargarImagen = 'NH392-NH394';
                                                }
                                                if (idProdNombre == 367) {
                                                    nombreCargarImagen = 'NH395-NH397';
                                                }
                                                if (idProdNombre == 368) {
                                                    nombreCargarImagen = 'NH398-NH400';
                                                }
                                                if (idProdNombre == 369) {
                                                    nombreCargarImagen = 'NH401-NH403';
                                                }
                                                if (idProdNombre == 370) {
                                                    nombreCargarImagen = 'NH404-NH406';
                                                }
                                                if (idProdNombre == 371) {
                                                    nombreCargarImagen = 'NH407-NH409';
                                                }
                                                if (idProdNombre == 372) {
                                                    nombreCargarImagen = 'NH410-NH412';
                                                }
                                                if (idProdNombre == 373) {
                                                    nombreCargarImagen = 'NH413-NH415';
                                                }
                                                if (idProdNombre == 374) {
                                                    nombreCargarImagen = 'NH416-NH418';
                                                }
                                                if (idProdNombre == 375) {
                                                    nombreCargarImagen = 'NH419-NH421';
                                                }
                                                if (idProdNombre == 352) {
                                                    nombreCargarImagen = 'NH422-NH424';
                                                }
                                                if (idProdNombre == 353) {
                                                    nombreCargarImagen = 'NH425-NH427';
                                                }
                                                if (idProdNombre == 354) {
                                                    nombreCargarImagen = 'NH428-NH430';
                                                }
                                                if (idProdNombre == 355) {
                                                    nombreCargarImagen = 'NH431-NH432';
                                                }
                                                if (idProdNombre == 356) {
                                                    nombreCargarImagen = 'NH433-NH435';
                                                }
                                                if (idProdNombre == 357) {
                                                    nombreCargarImagen = 'NH436-NH438';
                                                }
                                                if (idProdNombre == 358) {
                                                    nombreCargarImagen = 'NH439-NH441';
                                                }
                                                if (idProdNombre == 359) {
                                                    nombreCargarImagen = 'NH442-NH444';
                                                }
                                                if (idProdNombre == 375) {
                                                    nombreCargarImagen = 'NH445-NH454';
                                                }
                                                if (idProdNombre == 203) {
                                                    nombreCargarImagen = 'NH372-NH373';
                                                }
                                                if (idProdNombre == 204) {
                                                    nombreCargarImagen = 'NH455-NH458';
                                                }
                                                if (idProdNombre == 332) {
                                                    nombreCargarImagen = 'NH459';
                                                }
                                                if (idProdNombre == 205) {
                                                    nombreCargarImagen = 'NH460';
                                                }
                                                if (idProdNombre == 333) {
                                                    nombreCargarImagen = 'NH461';
                                                }
                                                if (idProdNombre == 206) {
                                                    nombreCargarImagen = 'NH462';
                                                }
                                                if (idProdNombre == 207) {
                                                    nombreCargarImagen = 'NH463-NH468';
                                                }
                                                if (idProdNombre == 208) {
                                                    nombreCargarImagen = 'NH469-NH474';
                                                }
                                                if (idProdNombre == 209) {
                                                    nombreCargarImagen = 'NH475-NH480';
                                                }
                                                if (idProdNombre == 210) {
                                                    nombreCargarImagen = 'NH481-NH486';
                                                }
                                                if (idProdNombre == 211) {
                                                    nombreCargarImagen = 'NH487-NH492';
                                                }
                                                if (idProdNombre == 213) {
                                                    nombreCargarImagen = 'NH493-NH496';
                                                }
                                                if (idProdNombre == 214) {
                                                    nombreCargarImagen = 'NH493-NH496';
                                                }
                                                if (idProdNombre == 215) {
                                                    nombreCargarImagen = 'NH497-NH500';
                                                }
                                                if (idProdNombre == 216) {
                                                    nombreCargarImagen = 'NH497-NH500';
                                                }
                                                if (idProdNombre == 217) {
                                                    nombreCargarImagen = 'NH501-NH502';
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
                                                if (idProdNombre == 223) {
                                                    nombreCargarImagen = 'NH511';
                                                }
                                                if (idProdNombre == 222) {
                                                    nombreCargarImagen = 'NH507-NH510';
                                                }
                                                if (productos[w - 1] != undefined) {
                                                    if (productos[w]['nombreImagenShape'] == null) {
                                                        if (
                                                            productos[w - 1]['productosDormitorio'] != null &&
                                                            productos[w - 1]['productosDormitorio'] != '' &&
                                                            productos[w - 1]['productosDormitorio'] != undefined
                                                        ) {
                                                            if (contador == 1) {
                                                                $('#imagen' + w).append(
                                                                    '<img id="imagenPresupues" style="z-index:' +
                                                                        (100 - i) +
                                                                        ';max-width:400px;max-height:400px;;max-width:410px;max-height:410px;" width="1000px" height="1000px" src="../../../content/images/1- PARA WEB/DORMITORIO2/' +
                                                                        nombreCargarImagen +
                                                                        '.jpeg">'
                                                                );
                                                                $('.estoesundivparaprobar #divreferenciapedido #imagen' + w).append(
                                                                    '<img id="imagenPresupues" class="imagensolobotonimprimir" style="z-index:' +
                                                                        (100 - i) +
                                                                        ';max-width:400px;max-height:400px;;max-width:410px;max-height:410px;" width="1000px" height="1000px" src="../../../content/images/1- PARA WEB/DORMITORIO2/' +
                                                                        nombreCargarImagen +
                                                                        '.jpeg">'
                                                                );
                                                                $('.estoesundivparaprobar #divreferenciapedido #imagen' + w).append(
                                                                    '<img id="imagenPresupues" class="imagensolobotonimprimir1" style="z-index:' +
                                                                        (100 - i) +
                                                                        ';max-width:400px;max-height:400px;;max-width:410px;max-height:410px;" width="1000px" height="1000px" src="https://www.pedidosTorga.com/content/images/1- PARA WEB/DORMITORIO2/' +
                                                                        nombreCargarImagen +
                                                                        '.jpeg">'
                                                                );
                                                            }
                                                        } else {
                                                            if (contador == 1) {
                                                                $('#imagen' + w).append(
                                                                    '<img id="imagenPresupues" style="z-index:' +
                                                                        (100 - i) +
                                                                        ';max-width:400px;max-height:400px;;max-width:410px;max-height:410px;" width="1000px" height="1000px" src="../../../content/images/1- PARA WEB/DORMITORIO2/' +
                                                                        nombreCargarImagen +
                                                                        '.jpeg">'
                                                                );
                                                                $('.estoesundivparaprobar #divreferenciapedido #imagen' + w).append(
                                                                    '<img id="imagenPresupues" class="imagensolobotonimprimir" style="z-index:' +
                                                                        (100 - i) +
                                                                        ';max-width:400px;max-height:400px;;max-width:410px;max-height:410px;" width="1000px" height="1000px" src="../../../content/images/1- PARA WEB/DORMITORIO2/' +
                                                                        nombreCargarImagen +
                                                                        '.jpeg">'
                                                                );
                                                                $('.estoesundivparaprobar #divreferenciapedido #imagen' + w).append(
                                                                    '<img id="imagenPresupues" class="imagensolobotonimprimir1" style="z-index:' +
                                                                        (100 - i) +
                                                                        ';max-width:400px;max-height:400px;;max-width:410px;max-height:410px;" width="1000px" height="1000px" src="https://www.pedidosTorga.com/content/images/1- PARA WEB/DORMITORIO2/' +
                                                                        nombreCargarImagen +
                                                                        '.jpeg">'
                                                                );
                                                            }
                                                        }
                                                    } else {
                                                        //nuevo
                                                        var arrayImagenShape = this.imagenDeCestaProdService.todos1;
                                                        for (let g = 0; g < arrayImagenShape.length; g++) {
                                                            if (arrayImagenShape[g]['nombre'] == productos[w]['nombreImagenShape']) {
                                                                if (contador == 1) {
                                                                    $('#imagen' + w).append(
                                                                        '<img id="imagenPresupues" style="z-index:' +
                                                                            (100 - i) +
                                                                            ';max-width:400px;max-height:400px;;max-width:410px;max-height:410px;" width="1000px" height="1000px" src="' +
                                                                            arrayImagenShape[g]['imagen'] +
                                                                            '">'
                                                                    );
                                                                    $('.estoesundivparaprobar #divreferenciapedido #imagen' + w).append(
                                                                        '<img id="imagenPresupues" class="imagensolobotonimprimir" style="z-index:' +
                                                                            (100 - i) +
                                                                            ';max-width:400px;max-height:400px;;max-width:410px;max-height:410px;" width="1000px" height="1000px" src="' +
                                                                            arrayImagenShape[g]['imagen'] +
                                                                            '">'
                                                                    );
                                                                    $('.estoesundivparaprobar #divreferenciapedido #imagen' + w).append(
                                                                        '<img id="imagenPresupues" class="imagensolobotonimprimir1" style="z-index:' +
                                                                            (100 - i) +
                                                                            ';max-width:400px;max-height:400px;;max-width:410px;max-height:410px;" width="1000px" height="1000px" src="' +
                                                                            arrayImagenShape[g]['imagen'] +
                                                                            '">'
                                                                    );
                                                                }
                                                            }
                                                        }
                                                    }
                                                } else {
                                                    if (productos[w]['nombreImagenShape'] == null) {
                                                        if (contador == 1) {
                                                            $('#imagen' + w).append(
                                                                '<img id="imagenPresupues" style="z-index:' +
                                                                    (100 - i) +
                                                                    ';max-width:400px;max-height:400px;;max-width:410px;max-height:410px;" width="1000px" height="1000px" src="../../../content/images/1- PARA WEB/DORMITORIO2/' +
                                                                    nombreCargarImagen +
                                                                    '.jpeg">'
                                                            );
                                                            $('.estoesundivparaprobar #divreferenciapedido #imagen' + w).append(
                                                                '<img id="imagenPresupues" class="imagensolobotonimprimir" style="z-index:' +
                                                                    (100 - i) +
                                                                    ';max-width:400px;max-height:400px;;max-width:410px;max-height:410px;" width="1000px" height="1000px" src="../../../content/images/1- PARA WEB/DORMITORIO2/' +
                                                                    nombreCargarImagen +
                                                                    '.jpeg">'
                                                            );
                                                            $('.estoesundivparaprobar #divreferenciapedido #imagen' + w).append(
                                                                '<img id="imagenPresupues" class="imagensolobotonimprimir1" style="z-index:' +
                                                                    (100 - i) +
                                                                    ';max-width:400px;max-height:400px;;max-width:410px;max-height:410px;" width="1000px" height="1000px" src="https://www.pedidosTorga.com/content/images/1- PARA WEB/DORMITORIO2/' +
                                                                    nombreCargarImagen +
                                                                    '.jpeg">'
                                                            );
                                                        }
                                                    } else {
                                                        //nuevo
                                                        var arrayImagenShape = this.imagenDeCestaProdService.todos1;
                                                        for (let g = 0; g < arrayImagenShape.length; g++) {
                                                            if (arrayImagenShape[g]['nombre'] == productos[w]['nombreImagenShape']) {
                                                                $('#imagen' + w).empty();
                                                                $('#imagen' + w).append(
                                                                    '<img id="imagenPresupues" style="z-index:' +
                                                                        (100 - i) +
                                                                        ';max-width:400px;max-height:400px;;max-width:410px;max-height:410px;" width="1000px" height="1000px" src="' +
                                                                        arrayImagenShape[g]['imagen'] +
                                                                        '">'
                                                                );
                                                                $('.estoesundivparaprobar #divreferenciapedido #imagen' + w).append(
                                                                    '<img id="imagenPresupues" class="imagensolobotonimprimir" style="z-index:' +
                                                                        (100 - i) +
                                                                        ';max-width:400px;max-height:400px;;max-width:410px;max-height:410px;" width="1000px" height="1000px" src="' +
                                                                        arrayImagenShape[g]['imagen'] +
                                                                        '">'
                                                                );
                                                                $('.estoesundivparaprobar #divreferenciapedido #imagen' + w).append(
                                                                    '<img id="imagenPresupues" class="imagensolobotonimprimir1" style="z-index:' +
                                                                        (100 - i) +
                                                                        ';max-width:400px;max-height:400px;;max-width:410px;max-height:410px;" width="1000px" height="1000px" src="' +
                                                                        arrayImagenShape[g]['imagen'] +
                                                                        '">'
                                                                );
                                                            }
                                                        }
                                                    }
                                                }
                                                contador++;
                                                contadorMeterImagenYTodo++;
                                            }
                                            var subTotal = parseFloat($('#precioSubtotal').text());
                                            if (productos[w]['precioTotal'] != undefined) {
                                                var precioTotProd = productos[w]['precioTotal'];
                                                subTotal = subTotal + precioTotProd;
                                                if (productos[w - 1] != undefined) {
                                                    if (
                                                        productos[w - 1]['productosDormitorio'] != null &&
                                                        productos[w - 1]['productosDormitorio'] != '' &&
                                                        productos[w - 1]['productosDormitorio'] != undefined
                                                    ) {
                                                        $('.' + productos[i]['id'] + 'Datos #precioTotal' + i).text(
                                                            precioTotProd.toFixed(0)
                                                        );
                                                    } else {
                                                        $('.' + productos[i]['id'] + 'Datos #precioTotal' + (i - 1)).text(
                                                            precioTotProd.toFixed(0)
                                                        );
                                                    }
                                                } else {
                                                    $('.' + productos[i]['id'] + 'Datos #precioTotal' + i).text(precioTotProd.toFixed(0));
                                                }
                                            }
                                            $('#precioSubtotal').text(subTotal.toFixed(0));
                                            $('#totalDescuentoTexto').text(subTotal.toFixed(0));
                                            $('#divimprimirtotalapagar' + i).text(subTotal.toFixed(0));
                                            if (i == 1) {
                                                $('#divimprimirtotalapagar0').text(subTotal.toFixed(0));
                                            }
                                            if (i == 3) {
                                                $('#divimprimirtotalapagar1').text(subTotal.toFixed(0));
                                            }

                                            if (i == 5) {
                                                $('#divimprimirtotalapagar2').text(subTotal.toFixed(0));
                                            }

                                            if (i == 7) {
                                                $('#divimprimirtotalapagar3').text(subTotal.toFixed(0));
                                            }

                                            if (i == 9) {
                                                $('#divimprimirtotalapagar4').text(subTotal.toFixed(0));
                                            }

                                            if (i == 11) {
                                                $('#divimprimirtotalapagar5').text(subTotal.toFixed(0));
                                            }

                                            if (i == 13) {
                                                $('#divimprimirtotalapagar6').text(subTotal.toFixed(0));
                                            }

                                            if (i == 15) {
                                                $('#divimprimirtotalapagar7').text(subTotal.toFixed(0));
                                            }

                                            if (i == 17) {
                                                $('#divimprimirtotalapagar8').text(subTotal.toFixed(0));
                                            }

                                            if (i == 19) {
                                                $('#divimprimirtotalapagar9').text(subTotal.toFixed(0));
                                            }
                                            if (i == 2) {
                                                $('#divimprimirtotalapagar0').text('Sigue..');
                                                $('#divimprimirtotalapagar1').text(subTotal.toFixed(0));
                                            }
                                            if (i == 4) {
                                                $('#divimprimirtotalapagar1').text('Sigue..');
                                                $('#divimprimirtotalapagar2').text(subTotal.toFixed(0));
                                            }

                                            if (i == 6) {
                                                $('#divimprimirtotalapagar2').text('Sigue..');
                                                $('#divimprimirtotalapagar3').text(subTotal.toFixed(0));
                                            }

                                            if (i == 8) {
                                                $('#divimprimirtotalapagar3').text('Sigue..');
                                                $('#divimprimirtotalapagar4').text(subTotal.toFixed(0));
                                            }

                                            if (i == 10) {
                                                $('#divimprimirtotalapagar4').text('Sigue..');
                                                $('#divimprimirtotalapagar5').text(subTotal.toFixed(0));
                                            }

                                            if (i == 12) {
                                                $('#divimprimirtotalapagar5').text('Sigue..');
                                                $('#divimprimirtotalapagar6').text(subTotal.toFixed(0));
                                            }

                                            if (i == 14) {
                                                $('#divimprimirtotalapagar6').text('Sigue..');
                                                $('#divimprimirtotalapagar7').text(subTotal.toFixed(0));
                                            }

                                            if (i == 16) {
                                                $('#divimprimirtotalapagar7').text('Sigue..');
                                                $('#divimprimirtotalapagar8').text(subTotal.toFixed(0));
                                            }

                                            if (i == 18) {
                                                $('#divimprimirtotalapagar8').text('Sigue..');
                                                $('#divimprimirtotalapagar9').text(subTotal.toFixed(0));
                                            }

                                            if (i == 20) {
                                                $('#divimprimirtotalapagar9').text('Sigue..');
                                                $('#divimprimirtotalapagar10').text(subTotal.toFixed(0));
                                            }
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

                                            var observaciones = undefined;
                                            if (productos[w]['observaciones'] != undefined) {
                                                observaciones = productos[w]['observaciones'];
                                            }

                                            if (luz != undefined) {
                                                $('.' + productos[i]['id'] + 'Datos').append(
                                                    '<p id="pimprimirdatostexto"><span style="font-weight:600">Luz</span>: Si</p>'
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

                                                $('.' + productos[i]['id'] + 'Datos #precioTotal' + i).text(precioTotProd.toFixed(0));
                                            }

                                            if (usb != undefined) {
                                                $('.' + productos[i]['id'] + 'Datos').append(
                                                    '<p id="pimprimirdatostexto"><span style="font-weight:600">' +
                                                        usb['mensaje'] +
                                                        '</span>: Si</p>'
                                                );
                                                var precioTotal = $('.' + productos[i]['id'] + 'Datos #precioTotal' + i).text();
                                                var precioFloat = 0;
                                                var precioLuz = usb['precio'];
                                                var precioTotProd = productos[w]['precioTotal'];
                                                precioLuz = precioLuz * 1;
                                                precioFloat = precioFloat + precioLuz;
                                                var subTotal = parseFloat($('#precioSubtotal').text());
                                                subTotal = subTotal + precioFloat;

                                                $('.' + productos[i]['id'] + 'Datos #precioTotal' + i).text(precioTotProd.toFixed(0));
                                            }
                                            if (productos[w]['textoEspecial'] != undefined && productos[w]['textoEspecial'] != null) {
                                                if (productos[w]['textoEspecial'] == 'Ancho especial') {
                                                    $('#datosMeter' + w + ' #anchoSoloSecambiaEspecial').text('Ancho especial');
                                                }
                                                if (productos[w]['textoEspecial'] == 'Alto especial') {
                                                    $('#datosMeter' + w + '  #altoSoloSecambiaEspecial').text('Alto especial');
                                                }
                                                if (productos[w]['textoEspecial'] == 'Fondo especial') {
                                                    $('#datosMeter' + w + '  #fondoSoloSecambiaEspecial').text('Fondo especial');
                                                }
                                            }
                                            if (apoyo != undefined) {
                                                if (productos[i]['pilotoApoyo'] != 8 && productos[i]['pilotoApoyo'] != 9) {
                                                    if (
                                                        productos[i]['textoEspecial'] != undefined &&
                                                        productos[i]['textoEspecial'] != null
                                                    ) {
                                                        if (productos[i]['textoEspecial'] == 'Ancho especial') {
                                                            if (productos[i]['pilotoApoyo'] != 6 && productos[i]['pilotoApoyo'] != 1) {
                                                                $('.' + productos[i]['id'] + 'Datos').append(
                                                                    '<p id="pimprimirdatostexto"><span style="font-weight:600">Apoyo: </span>' +
                                                                        apoyo['productoApoyo']['nombre'] +
                                                                        '</p>'
                                                                );
                                                            } else {
                                                                var totalfloatApoyo = apoyo['precio'] * 1.3;
                                                                totalfloatApoyo = Math.ceil(totalfloatApoyo);
                                                                $('.' + productos[i]['id'] + 'Datos').append(
                                                                    '<p id="pimprimirdatostexto"><span style="font-weight:600">Apoyo: </span>' +
                                                                        apoyo['productoApoyo']['nombre'] +
                                                                        '</p>'
                                                                );
                                                                $('.' + productos[i]['id'] + 'Datos').append(
                                                                    '<p id="pimprimirdatostexto"><span style="font-weight:600">Incremento apoyo especial 30%</span></p>'
                                                                );
                                                            }
                                                        }
                                                        if (productos[i]['textoEspecial'] == 'Fondo especial') {
                                                            if (
                                                                productos[i]['pilotoApoyo'] != 6 &&
                                                                productos[i]['pilotoApoyo'] != 1 &&
                                                                productos[i]['pilotoApoyo'] != 3 &&
                                                                productos[i]['pilotoApoyo'] != 7
                                                            ) {
                                                                $('.' + productos[i]['id'] + 'Datos').append(
                                                                    '<p id="pimprimirdatostexto"><span style="font-weight:600">Apoyo: </span>' +
                                                                        apoyo['productoApoyo']['nombre'] +
                                                                        '</p>'
                                                                );
                                                            } else {
                                                                var totalfloatApoyo = apoyo['precio'] * 1.3;
                                                                totalfloatApoyo = Math.ceil(totalfloatApoyo);
                                                                $('.' + productos[i]['id'] + 'Datos').append(
                                                                    '<p id="pimprimirdatostexto"><span style="font-weight:600">Apoyo: </span>' +
                                                                        apoyo['productoApoyo']['nombre'] +
                                                                        '</p>'
                                                                );
                                                                $('.' + productos[i]['id'] + 'Datos').append(
                                                                    '<p id="pimprimirdatostexto"><span style="font-weight:600">Incremento apoyo especial 30%</span></p>'
                                                                );
                                                            }
                                                        }
                                                        if (productos[i]['textoEspecial'] == 'Alto especial') {
                                                            $('.' + productos[i]['id'] + 'Datos').append(
                                                                '<p id="pimprimirdatostexto"><span style="font-weight:600">Apoyo: </span>' +
                                                                    apoyo['productoApoyo']['nombre'] +
                                                                    '</p>'
                                                            );
                                                        }
                                                    } else {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">Apoyo: </span>' +
                                                                apoyo['productoApoyo']['nombre'] +
                                                                '</p>'
                                                        );
                                                    }
                                                } else {
                                                    if (productos[i]['pilotoApoyo'] == 8) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">Apoyo: </span>Zocalo del mismo ancho del mueble</p>'
                                                        );
                                                    }

                                                    if (productos[i]['pilotoApoyo'] == 9) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><span style="font-weight:600">Apoyo: </span>Bancada del mismo ancho del mueble</p>'
                                                        );
                                                    }
                                                }
                                                var precioTotal = $('.' + productos[i]['id'] + 'Datos #precioTotal' + i).text();
                                                if (precioTotal != '') {
                                                    var precioFloat = parseFloat(precioTotal);
                                                } else {
                                                    var precioFloat = 0;
                                                }

                                                precioPunto = precioMulti;
                                                precioFloat = precioFloat * precioPunto;
                                                var todoApoyo = apoyo['productoApoyo'];

                                                var precioApoyo = apoyo['precio'];
                                                precioApoyo = precioApoyo * precioPunto;
                                                precioFloat = precioFloat + precioApoyo;
                                                var subTotal = parseFloat($('#precioSubtotal').text());
                                                subTotal = subTotal + precioFloat;

                                                var iva = subTotal * 0.21;
                                                $('#ivaPrecioQuitar').remove();
                                                $('#ivaQuitar').append('<p id="ivaPrecioQuitar">' + iva.toFixed(0) + ' €</p>');
                                                iva = subTotal + iva;
                                                $('#precioIvaSumado').remove();
                                                $('#precioCalculadoIva').append(
                                                    '<p id="precioIvaSumado" style="font-size:25px">' + iva.toFixed(0) + ' €</p>'
                                                );
                                                var total;
                                                total = precioFloat * precioTienda;
                                                console.log(total);
                                                total = total - precioFloat;
                                            }
                                            if (productos[i]['productosDormitorio']['id'] != 415) {
                                                if (observaciones != undefined) {
                                                    $('.' + productos[i]['id'] + 'Datos').append(
                                                        '<p id="pimprimirdatostexto"><span style="font-weight:600">Observaciones</span>: &nbsp;&nbsp;&nbsp; <span id="textareaobservaciones">' +
                                                            observaciones +
                                                            '</span></p>'
                                                    );
                                                }
                                            } else {
                                                $('#imagen' + w).append(
                                                    '<img id="imagenPresupues" style="z-index:' +
                                                        (100 - i) +
                                                        ';max-width:400px;max-height:400px;;max-width:410px;max-height:410px;" width="1000px" height="1000px" src="../../../content/images/1- PARA WEB/DORMITORIO2/PROPIO.jpg">'
                                                );
                                                if (productos[i]['nombreArchivo'] != undefined) {
                                                    var nombreArch = productos[i]['nombreArchivo'];
                                                    var arrayNombreArch = [];
                                                    arrayNombreArch = nombreArch.split('%');
                                                    $('.' + productos[i]['id'] + 'Datos').append(
                                                        '<p id="pimprimirdatostexto"><span style="font-weight:600">Archivos Adjuntos</span></p>'
                                                    );
                                                    for (let j = 0; j < arrayNombreArch.length; j++) {
                                                        $('.' + productos[i]['id'] + 'Datos').append(
                                                            '<p id="pimprimirdatostexto"><a style="color: #007bff;" href="https://pedidostorga:Torga56pedidos123.@pedidospdftorga.com/confirmaciones/disePropio1/' +
                                                                arrayNombreArch[j] +
                                                                '">' +
                                                                arrayNombreArch[j] +
                                                                '</a></p>'
                                                        );
                                                    }
                                                }
                                                if (observaciones != undefined) {
                                                    $('.' + productos[i]['id'] + 'Datos').append(
                                                        '<p id="pimprimirdatostexto"><span style="font-weight:600">Descripcion</span>: &nbsp;&nbsp;&nbsp; <span id="textareaobservaciones">' +
                                                            observaciones +
                                                            '</span></p>'
                                                    );
                                                }
                                            }
                                        }
                                        acaComprobar = 1;
                                    }
                                }
                            } else {
                                $('#meterEspeciales').css({ display: 'block' });
                                $('#meterEspeciales').append(
                                    '<div style="float:right;width:25%;text-align:center;display:block" id="especial' + w + '"></div>'
                                );
                                $('#especial' + w).append(
                                    '<p style="font-size:30px" id="pNombreProd"><strong>Articulo Especial &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i id="precioEspecial' +
                                        w +
                                        '"></i>'
                                );
                                $('#especial' + w).append('<p>' + productos[w]['textoEspecial'] + '</p>');
                                $('#especial' + w).append(
                                    '<p><a download href="../../../content/images/imagenesSubidas/' +
                                        productos[w]['nombreArchivo'] +
                                        '">Descargar Archivo</a></p>'
                                );
                                if (
                                    productos[w]['precioTotal'] != null &&
                                    productos[w]['precioTotal'] != '' &&
                                    productos[w]['precioTotal'] != undefined
                                ) {
                                    $('#precioEspecial' + w).text(productos[w]['precioTotal']);
                                } else {
                                    $('#precioEspecial' + w).text('No Definido');
                                }
                                var total;
                                var subTotal = 0;
                                total = parseFloat($('#precioSubtotal').text());
                                subTotal = total + productos[w]['precioTotal'];
                                $('#precioSubtotal').text(subTotal.toFixed(0));
                                $('#totalDescuentoTexto').text(subTotal.toFixed(0));
                                $('#divimprimirtotalapagar' + w).text(subTotal.toFixed(0));
                                if (w == 1) {
                                    $('#divimprimirtotalapagar' + (w - 1)).text(subTotal.toFixed(0));
                                }
                                if (w == 3) {
                                    $('#divimprimirtotalapagar' + (w - 1)).text(subTotal.toFixed(0));
                                }

                                if (w == 5) {
                                    $('#divimprimirtotalapagar' + (w - 1)).text(subTotal.toFixed(0));
                                }

                                if (w == 7) {
                                    $('#divimprimirtotalapagar' + (w - 1)).text(subTotal.toFixed(0));
                                }

                                if (w == 9) {
                                    $('#divimprimirtotalapagar' + (w - 1)).text(subTotal.toFixed(0));
                                }

                                if (w == 11) {
                                    $('#divimprimirtotalapagar' + (w - 1)).text(subTotal.toFixed(0));
                                }

                                if (w == 13) {
                                    $('#divimprimirtotalapagar' + (w - 1)).text(subTotal.toFixed(0));
                                }

                                if (w == 15) {
                                    $('#divimprimirtotalapagar' + (w - 1)).text(subTotal.toFixed(0));
                                }

                                if (w == 17) {
                                    $('#divimprimirtotalapagar' + (w - 1)).text(subTotal.toFixed(0));
                                }

                                if (w == 19) {
                                    $('#divimprimirtotalapagar' + (w - 1)).text(subTotal.toFixed(0));
                                }
                                if (w == 2) {
                                    $('#divimprimirtotalapagar' + (w - 1)).text('Sigue..');
                                }
                                if (w == 4) {
                                    $('#divimprimirtotalapagar' + (w - 1)).text('Sigue..');
                                }

                                if (w == 6) {
                                    $('#divimprimirtotalapagar' + (w - 1)).text('Sigue..');
                                }

                                if (w == 8) {
                                    $('#divimprimirtotalapagar' + (w - 1)).text('Sigue..');
                                }

                                if (w == 10) {
                                    $('#divimprimirtotalapagar' + (w - 1)).text('Sigue..');
                                }

                                if (w == 12) {
                                    $('#divimprimirtotalapagar' + (w - 1)).text('Sigue..');
                                }

                                if (w == 14) {
                                    $('#divimprimirtotalapagar' + (w - 1)).text('Sigue..');
                                }

                                if (w == 16) {
                                    $('#divimprimirtotalapagar' + (w - 1)).text('Sigue..');
                                }

                                if (w == 18) {
                                    $('#divimprimirtotalapagar' + (w - 1)).text('Sigue..');
                                }

                                if (w == 20) {
                                    $('#divimprimirtotalapagar' + (w - 1)).text('Sigue..');
                                }
                            }
                            $('#modalcargandotodo').attr('class', 'modal fade');
                            $('#modalcargandotodo').css({ display: 'none' });
                            $('#quitarelbackroundcolor').remove();
                        }
                    }
                    //}, 1000);
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
        this.tieneObservacion = 0;
        $('#modalcargandotodo').attr('class', 'modal fade show');
        $('#modalcargandotodo').css({ display: 'block' });
        $('body').append('<div id="quitarelbackroundcolor" class="modal-backdrop fade show"></div>');
        var tienda = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
        var arraymeterparasaberespacio = [];

        arraymeterparasaberespacio[0] = 1;
        arraymeterparasaberespacio[0] = 2;

        arraymeterparasaberespacio[0] = 2;
        arraymeterparasaberespacio[1] = 3;

        arraymeterparasaberespacio[0] = 2;
        arraymeterparasaberespacio[1] = 4;

        arraymeterparasaberespacio[0] = 2;
        arraymeterparasaberespacio[1] = 4;
        arraymeterparasaberespacio[2] = 5;

        arraymeterparasaberespacio[0] = 2;
        arraymeterparasaberespacio[1] = 4;
        arraymeterparasaberespacio[2] = 6;

        arraymeterparasaberespacio[0] = 2;
        arraymeterparasaberespacio[1] = 4;
        arraymeterparasaberespacio[2] = 6;
        arraymeterparasaberespacio[3] = 7;

        arraymeterparasaberespacio[0] = 2;
        arraymeterparasaberespacio[1] = 4;
        arraymeterparasaberespacio[2] = 6;
        arraymeterparasaberespacio[3] = 8;

        arraymeterparasaberespacio[0] = 2;
        arraymeterparasaberespacio[1] = 4;
        arraymeterparasaberespacio[2] = 6;
        arraymeterparasaberespacio[3] = 8;
        arraymeterparasaberespacio[4] = 9;

        arraymeterparasaberespacio[0] = 2;
        arraymeterparasaberespacio[1] = 4;
        arraymeterparasaberespacio[2] = 6;
        arraymeterparasaberespacio[3] = 8;
        arraymeterparasaberespacio[4] = 10;
        arraymeterparasaberespacio[5] = 12;
        arraymeterparasaberespacio[6] = 14;
        arraymeterparasaberespacio[7] = 16;
        arraymeterparasaberespacio[8] = 18;
        arraymeterparasaberespacio[9] = 20;

        this.arraysaberimagenes = arraymeterparasaberespacio;

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

        var municipios = [];
        var provincias = [];
        this.accountService.identity().then(account => {
            this.account = account;
        });

        this.presupuestoPedidoService.find(idPresu).subscribe(data => {
            var usuario = data.body.user;
            var todosImagenesShape = [];
            var conttodosImagenesShape = 0;
            this.imagenDeCestaProdService.findCoger(data.body['nombreCesta']).subscribe(data => {
                for (let h = 0; h < data.body['length']; h++) {
                    todosImagenesShape[conttodosImagenesShape] = data.body[h];
                    conttodosImagenesShape++;
                }
                this.imagenDeCestaProdService.todos1 = todosImagenesShape;

                this.datosUsuarioService.findCoger12(usuario['id']).subscribe(data => {
                    if (data.body[0]['user'] != null) {
                        if (data.body[0]['user']['id'] == usuario['id']) {
                            tienda = data.body[0];
                            this.datosUsuarioService.tiendaCargadaPresu = tienda;
                            JSON.parse(sessionStorage.getItem('tiendaUsuario'));
                            this.precioPunto = 0;
                            this.precioTiendaService.precioTienda = 0;
                            this.productosPresupuestoPedidosService.query1(idPresu).subscribe(data => {
                                this.productosPresupuestoPedidosService.todos = data.body;
                                var toma = [];
                                var contToma = 0;
                                for (let f = 0; f < data.body.length; f++) {
                                    if (
                                        data.body[f]['productosDormitorio'] != null &&
                                        data.body[f]['productosDormitorio'] != '' &&
                                        data.body[f]['productosDormitorio'] != undefined
                                    ) {
                                        toma[contToma] = data.body[f];
                                        if (toma[contToma]['textoEspecial'] == 'Ancho especial') {
                                            toma[contToma]['dimensionesProductoTipo']['ancho'] = toma[contToma]['ancho'];
                                        }
                                        if (toma[contToma]['textoEspecial'] == 'Alto especial') {
                                            toma[contToma]['dimensionesProductoTipo']['alto'] = toma[contToma]['alto'];
                                        }
                                        if (toma[contToma]['textoEspecial'] == 'Fondo especial') {
                                            toma[contToma]['dimensionesProductoTipo']['fondo'] = toma[contToma]['fondo'];
                                        }

                                        contToma++;
                                    }
                                }
                                this.productosPresupuestoPedidos = toma;
                                this.soloMedBuen();
                            });
                        }
                    }
                });
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
        $('#meterQuitadoDescuento').text(cuenta.toFixed(0));
        cuenta = precioNormal - cuenta;
        var iva = cuenta * 0.21;
        $('#ivaPrecioQuitar').text(iva.toFixed(0) + ' €');
        var todo = iva + cuenta;
        $('#precioIvaSumado').text(todo.toFixed(0) + ' €');
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

    public textoObservacionesFuncion() {
        $('#textoObservaciones').css({ display: 'block' });
        $('#botonGuardarobser').attr('disabled', 'disabled');
        var texto = $('#textAreaObs').val();
        setTimeout(function() {
            $('#botonGuardarobser').removeAttr('disabled');
        }, 5000);
        if (texto != '') {
            $('#textAreaObs').empty();
            $('#divobservacionesparaimprimir #textoObservaciones').empty();
            $('#divobservacionesparaimprimir #textoObservaciones').append('<p>' + texto + '</p>');
            $('#divobservacionesparaimprimir1 #textoObservaciones').append('<p>' + texto + '</p>');
            $('#textoObservaciones').append('<p>' + texto + '</p>');
            $('#textAreaObs').val('');
            var presu = this.productos[0]['presupuestoPedido'];
            presu['observaciones'] = texto;
            this.subscribeToSaveResponse5(this.presupuestoPedidoService.update(presu));
        }
    }

    protected subscribeToSaveResponse5(result: Observable<HttpResponse<IPresupuestoPedido>>) {
        result.subscribe((res: HttpResponse<IPresupuestoPedido>) => this.onSaveSuccess5(), (res: HttpErrorResponse) => this.onSaveError5());
    }

    protected onSaveSuccess5() {
        this.isSaving = false;
    }

    protected onSaveError5() {
        this.isSaving = false;
    }

    public generopdfgg() {
        var doc = new jsPDF('p', 'mm', 'letter');
        var correo = '';
        correo = $('#correoEnviarPdf')
            .val()
            .toString();
        var contador = 0;
        var contadorMeterImagenYTodo = 0;
        doc.setFontSize(20);
        doc.setFontSize(12);

        var logo = new Image();
        logo.src = '../../../content/images/Logo.jpg';
        doc.addImage(logo, 'JPG', 10, 5, 18, 18);
        console.log(doc);
        var productos = this.productosPresupuestoPedidosService.todos;
        console.log(productos);
        for (let w = 0; w < productos.length; w++) {
            doc.setFontSize(20);
            doc.text('Presupuesto: ' + productos[w]['presupuestoPedido']['codigo'], 70, 30);
            doc.text('Fecha Presupuesto: ' + productos[w]['presupuestoPedido']['fecha_presupuesto'], 60, 38);
            doc.setFontSize(16);
            doc.text('Tienda', 100, 50);
            doc.text(this.datosUsuarioService.tiendaCargadaPresu.nombreComercial, 60, 60);
            //doc.text(this.datosUsuarioService.tiendaCargadaPresu.telefono, 80, 70);
            doc.setFontSize(14);
            if (w == 0) {
                doc.text(productos[w]['productosDormitorio']['nombre'] + ' ' + productos[w]['precioTotal'] + ' PP', 155, 90);
                doc.setFontSize(12);
                doc.text('Ancho: ' + productos[w]['dimensionesProductoTipo']['ancho'], 165, 98);
                doc.text('Alto: ' + productos[w]['dimensionesProductoTipo']['alto'], 165, 103);
                doc.text('Fondo: ' + productos[w]['dimensionesProductoTipo']['fondo'], 165, 108);
                var cont = 0;
                for (let h = 0; h < productos[w]['acabados'].length; h++) {
                    doc.text('Acabado ' + (h + 1) + ': ' + productos[w]['acabados'][h]['acabados']['nombre'], 165, 113 + cont);
                    cont = cont + 5;
                }
            }

            if (w == 1) {
                doc.text(productos[w]['productosDormitorio']['nombre'] + ' ' + productos[w]['precioTotal'] + ' PP', 155, 200);
                doc.setFontSize(12);
                doc.text('Ancho: ' + productos[w]['dimensionesProductoTipo']['ancho'], 165, 208);
                doc.text('Alto: ' + productos[w]['dimensionesProductoTipo']['alto'], 165, 213);
                doc.text('Fondo: ' + productos[w]['dimensionesProductoTipo']['fondo'], 165, 218);
                var cont = 0;
                for (let h = 0; h < productos[w]['acabados'].length; h++) {
                    doc.text('Acabado ' + (h + 1) + ': ' + productos[w]['acabados'][h]['acabados']['nombre'], 165, 223 + cont);
                    cont = cont + 5;
                }
            }

            var prodNombre = productos[w]['productosDormitorio']['nombre'];
            var idProdNombre = productos[w]['productosDormitorio']['id'];

            var nombreCargarImagen;
            if (idProdNombre == 277) {
                nombreCargarImagen = 'NT007-NT022';
            }
            if (idProdNombre == 275) {
                nombreCargarImagen = 'NT001-NT004';
            }
            if (idProdNombre == 276) {
                nombreCargarImagen = 'NT005-NT006';
            }
            if (idProdNombre == 278) {
                nombreCargarImagen = 'NT023-NT038';
            }
            if (idProdNombre == 279) {
                nombreCargarImagen = 'NT039-NT054';
            }
            if (idProdNombre == 280) {
                nombreCargarImagen = 'NT055-NT070';
            }
            if (idProdNombre == 281) {
                nombreCargarImagen = 'NT071-NT078';
            }
            if (idProdNombre == 246) {
                nombreCargarImagen = 'NT079-NT094';
            }
            if (idProdNombre == 413) {
                nombreCargarImagen = 'NT087-NT094';
            }
            if (idProdNombre == 282) {
                nombreCargarImagen = 'NT095-NT110';
            }
            if (idProdNombre == 414) {
                nombreCargarImagen = 'NT103-NT110';
            }
            if (idProdNombre == 247) {
                nombreCargarImagen = 'NT111-NT115';
            }
            if (idProdNombre == 249) {
                nombreCargarImagen = 'NT116-NT123';
            }
            if (idProdNombre == 250) {
                nombreCargarImagen = 'NT116-NT123';
            }
            if (idProdNombre == 248) {
                nombreCargarImagen = 'NT124-NT143';
            }
            if (idProdNombre == 251) {
                nombreCargarImagen = 'NT144-NT148';
            }
            if (idProdNombre == 253) {
                nombreCargarImagen = 'NT149-NT156';
            }
            if (idProdNombre == 254) {
                nombreCargarImagen = 'NT149-NT156';
            }
            if (idProdNombre == 252) {
                nombreCargarImagen = 'NT157-NT176';
            }
            if (idProdNombre == 255) {
                nombreCargarImagen = 'NT177-NT181';
            }
            if (idProdNombre == 257) {
                nombreCargarImagen = 'NT182-NT185';
            }
            if (idProdNombre == 258) {
                nombreCargarImagen = 'NT186-NT189';
            }
            if (idProdNombre == 256) {
                nombreCargarImagen = 'NT190-NT209';
            }
            if (idProdNombre == 259) {
                nombreCargarImagen = 'NT210-NT211';
            }
            if (idProdNombre == 261) {
                nombreCargarImagen = 'NT212-NT219';
            }
            if (idProdNombre == 262) {
                nombreCargarImagen = 'NT212-NT219';
            }
            if (idProdNombre == 260) {
                nombreCargarImagen = 'NT220-NT227';
            }

            if (idProdNombre == 263) {
                nombreCargarImagen = 'NT228-NT229';
            }
            if (idProdNombre == 266) {
                nombreCargarImagen = 'NT230-NT237';
            }
            if (idProdNombre == 265) {
                nombreCargarImagen = 'NT230-NT237';
            }
            if (idProdNombre == 264) {
                nombreCargarImagen = 'NT238-NT245';
            }

            if (idProdNombre == 271) {
                nombreCargarImagen = 'NT246-NT250';
            }
            if (idProdNombre == 274) {
                nombreCargarImagen = 'NT251-NT258';
            }
            if (idProdNombre == 273) {
                nombreCargarImagen = 'NT251-NT258';
            }
            if (idProdNombre == 272) {
                nombreCargarImagen = 'NT259-NT278';
            }

            if (idProdNombre == 267) {
                nombreCargarImagen = 'NT279-NT280';
            }
            if (idProdNombre == 269) {
                nombreCargarImagen = 'NT281-NT288';
            }
            if (idProdNombre == 270) {
                nombreCargarImagen = 'NT281-NT288';
            }
            if (idProdNombre == 268) {
                nombreCargarImagen = 'NT289-NT296';
            }

            if (idProdNombre == 283) {
                nombreCargarImagen = 'NT297-NT314';
            }
            if (idProdNombre == 284) {
                nombreCargarImagen = 'NT315-NT332';
            }
            if (idProdNombre == 285) {
                nombreCargarImagen = 'NT333-NT350';
            }
            if (idProdNombre == 1) {
                nombreCargarImagen = 'NX009-NX012';
            }
            if (idProdNombre == 2) {
                nombreCargarImagen = 'NX009-NX012';
            }
            if (idProdNombre == 3) {
                nombreCargarImagen = 'NX009-NX012';
            }
            if (idProdNombre == 4) {
                nombreCargarImagen = 'NX013-NX016';
            }
            if (idProdNombre == 5) {
                nombreCargarImagen = 'NX017-NX020';
            }
            if (idProdNombre == 6) {
                nombreCargarImagen = 'NX021-NX024';
            }
            if (idProdNombre == 7) {
                nombreCargarImagen = 'NX025-NX028';
            }
            if (idProdNombre == 8) {
                nombreCargarImagen = 'NX029-NX032';
            }
            if (idProdNombre == 9) {
                nombreCargarImagen = 'NX033-NX036';
            }
            if (idProdNombre == 10) {
                nombreCargarImagen = 'NX037-NX040';
            }
            if (idProdNombre == 11) {
                nombreCargarImagen = 'NX041-NX044';
            }
            if (idProdNombre == 12) {
                nombreCargarImagen = 'NX045-NX048';
            }
            if (idProdNombre == 13) {
                nombreCargarImagen = 'NX049-NX052';
            }
            if (idProdNombre == 376) {
                nombreCargarImagen = 'NX053';
            }
            if (idProdNombre == 239) {
                nombreCargarImagen = 'NX058-NX061';
            }
            if (idProdNombre == 240) {
                nombreCargarImagen = 'NX062-NX065';
            }
            if (idProdNombre == 241) {
                nombreCargarImagen = 'NX066-NX069';
            }
            if (idProdNombre == 107) {
                nombreCargarImagen = 'NH001-NH006';
            }
            if (idProdNombre == 410) {
                nombreCargarImagen = 'NH007-NH010';
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
                nombreCargarImagen = 'NH025-NH028';
            }
            if (idProdNombre == 113) {
                nombreCargarImagen = 'NH029-NH032';
            }
            if (idProdNombre == 112) {
                nombreCargarImagen = 'NH033-NH036';
            }
            if (idProdNombre == 114) {
                nombreCargarImagen = 'NH037-NH041';
            }
            if (idProdNombre == 116) {
                nombreCargarImagen = 'NH042-NH045';
            }
            if (idProdNombre == 115) {
                nombreCargarImagen = 'NH046-NH049';
            }
            if (idProdNombre == 298) {
                nombreCargarImagen = 'NH050-NH051';
            }
            if (idProdNombre == 297) {
                nombreCargarImagen = 'NH052-NH053';
            }
            if (idProdNombre == 118) {
                nombreCargarImagen = 'NH054-NH057';
            }
            if (idProdNombre == 117) {
                nombreCargarImagen = 'NH058-NH061';
            }
            if (idProdNombre == 119) {
                nombreCargarImagen = 'NH062-NH066';
            }
            if (idProdNombre == 299) {
                nombreCargarImagen = 'NH067-NH069';
            }
            if (idProdNombre == 301) {
                nombreCargarImagen = 'NH070-NH071';
            }
            if (idProdNombre == 300) {
                nombreCargarImagen = 'NH072-NH073';
            }
            if (idProdNombre == 302) {
                nombreCargarImagen = 'NH074-NH077';
            }
            if (idProdNombre == 334) {
                nombreCargarImagen = 'NH078-NH079';
            }
            if (idProdNombre == 303) {
                nombreCargarImagen = 'NH080-NH081';
            }
            if (idProdNombre == 14) {
                nombreCargarImagen = 'NH082-NH083';
            }
            if (idProdNombre == 304) {
                nombreCargarImagen = 'NH084';
            }
            if (idProdNombre == 53) {
                nombreCargarImagen = 'NH085';
            }
            if (idProdNombre == 305) {
                nombreCargarImagen = 'NH086-NH088';
            }
            if (idProdNombre == 62) {
                nombreCargarImagen = 'NH089-NH091';
            }
            if (idProdNombre == 306) {
                nombreCargarImagen = 'NH092-NH094';
            }
            if (idProdNombre == 63) {
                nombreCargarImagen = 'NH095-NH097';
            }
            if (idProdNombre == 307) {
                nombreCargarImagen = 'NH098-NH100';
            }
            if (idProdNombre == 64) {
                nombreCargarImagen = 'NH101-NH103';
            }
            if (idProdNombre == 308) {
                nombreCargarImagen = 'NH104-NH106';
            }
            if (idProdNombre == 65) {
                nombreCargarImagen = 'NH107-NH109';
            }
            if (idProdNombre == 308) {
                nombreCargarImagen = 'NH104-NH106';
            }
            if (idProdNombre == 65) {
                nombreCargarImagen = 'NH107-NH109';
            }
            if (idProdNombre == 309) {
                nombreCargarImagen = 'NH110-NH112';
            }
            if (idProdNombre == 66) {
                nombreCargarImagen = 'NH113-NH115';
            }
            if (idProdNombre == 310) {
                nombreCargarImagen = 'NH116-NH118';
            }
            if (idProdNombre == 67) {
                nombreCargarImagen = 'NH119-NH121';
            }
            if (idProdNombre == 311) {
                nombreCargarImagen = 'NH122-NH124';
            }
            if (idProdNombre == 68) {
                nombreCargarImagen = 'NH125-NH127';
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
                nombreCargarImagen = 'NH139-NH140';
            }
            if (idProdNombre == 72) {
                nombreCargarImagen = 'NH141-NH142';
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
                nombreCargarImagen = 'NH279-NH280';
            }
            if (idProdNombre == 181) {
                nombreCargarImagen = 'NH281-NH282';
            }
            if (idProdNombre == 182) {
                nombreCargarImagen = 'NH283';
            }
            if (idProdNombre == 183) {
                nombreCargarImagen = 'NH284';
            }
            if (idProdNombre == 184) {
                nombreCargarImagen = 'NH289-NH293';
            }
            if (idProdNombre == 185) {
                nombreCargarImagen = 'NH294-NH298';
            }
            if (idProdNombre == 186) {
                nombreCargarImagen = 'NH299-NH303';
            }
            if (idProdNombre == 188) {
                nombreCargarImagen = 'NH304-NH308';
            }

            if (idProdNombre == 187) {
                nombreCargarImagen = 'NH309-NH313';
            }
            if (idProdNombre == 189) {
                nombreCargarImagen = 'NH314-NH318';
            }
            if (idProdNombre == 194) {
                nombreCargarImagen = 'NH319-NH320';
            }
            if (idProdNombre == 190) {
                nombreCargarImagen = 'NH321-NH322';
            }
            if (idProdNombre == 195) {
                nombreCargarImagen = 'NH323-NH324';
            }
            if (idProdNombre == 191) {
                nombreCargarImagen = 'NH325-NH326';
            }
            if (idProdNombre == 196) {
                nombreCargarImagen = 'NH327-NH331';
            }
            if (idProdNombre == 200) {
                nombreCargarImagen = 'NH332-NH336';
            }
            if (idProdNombre == 192) {
                nombreCargarImagen = 'NH337-NH341';
            }
            if (idProdNombre == 198) {
                nombreCargarImagen = 'NH342-NH346';
            }
            if (idProdNombre == 197) {
                nombreCargarImagen = 'NH347-NH351';
            }
            if (idProdNombre == 201) {
                nombreCargarImagen = 'NH352-NH356';
            }
            if (idProdNombre == 193) {
                nombreCargarImagen = 'NH357-NH361';
            }
            if (idProdNombre == 199) {
                nombreCargarImagen = 'NH362-NH366';
            }
            if (idProdNombre == 203) {
                nombreCargarImagen = 'NH372-NH373';
            }
            if (idProdNombre == 204) {
                nombreCargarImagen = 'NH455-NH458';
            }
            if (idProdNombre == 333) {
                nombreCargarImagen = 'NH461';
            }
            if (idProdNombre == 206) {
                nombreCargarImagen = 'NH462';
            }
            if (idProdNombre == 207) {
                nombreCargarImagen = 'NH463-NH468';
            }
            if (idProdNombre == 208) {
                nombreCargarImagen = 'NH469-NH474';
            }
            if (idProdNombre == 209) {
                nombreCargarImagen = 'NH475-NH480';
            }
            if (idProdNombre == 210) {
                nombreCargarImagen = 'NH481-NH486';
            }
            if (idProdNombre == 211) {
                nombreCargarImagen = 'NH487-NH492';
            }
            if (idProdNombre == 213) {
                nombreCargarImagen = 'NH493-NH496';
            }
            if (idProdNombre == 214) {
                nombreCargarImagen = 'NH493-NH496';
            }
            if (idProdNombre == 215) {
                nombreCargarImagen = 'NH497-NH500';
            }
            if (idProdNombre == 216) {
                nombreCargarImagen = 'NH497-NH500';
            }
            if (idProdNombre == 217) {
                nombreCargarImagen = 'NH501-NH502';
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
                nombreCargarImagen = 'NH507-NH510';
            }
            var logo = new Image();
            logo.src = '../../../content/images/1- PARA WEB/DORMITORIO/' + nombreCargarImagen + '.jpeg';
            if (w == 0) {
                doc.addImage(logo, 'JPEG', 15, 80, 80, 80);
            }
            if (w == 1) {
                doc.addImage(logo, 'JPEG', 15, 190, 80, 80);
            }

            contador++;
            contadorMeterImagenYTodo++;
        }

        var blob = doc.output('blob');
        var prueba = this.arraysaberimagenes;
        if (prueba.length == 2) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
        }
        if (prueba.length == 3) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
        }
        if (prueba.length == 4) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
            $('.paraverespacio2').css({ 'margin-bottom': '65px' });
            $('.paraverespacio3').css({ 'margin-top': '30px' });
        }
        if (prueba.length == 5) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
            $('.paraverespacio2').css({ 'margin-bottom': '65px' });
            $('.paraverespacio3').css({ 'margin-top': '30px' });
            $('.paraverespacio3').css({ 'margin-bottom': '60px' });
            $('.paraverespacio4').css({ 'margin-top': '35px' });
        }
        if (prueba.length == 6) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
            $('.paraverespacio2').css({ 'margin-bottom': '65px' });
            $('.paraverespacio3').css({ 'margin-top': '30px' });
            $('.paraverespacio3').css({ 'margin-bottom': '60px' });
            $('.paraverespacio4').css({ 'margin-top': '35px' });
            $('.paraverespacio4').css({ 'margin-bottom': '65px' });
            $('.paraverespacio5').css({ 'margin-top': '30px' });
            $('.paraverespacio5').css({ 'margin-bottom': '60px' });
            $('.paraverespacio6').css({ 'margin-top': '35px' });
        }
        if (prueba.length == 5) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
            $('.paraverespacio2').css({ 'margin-bottom': '65px' });
            $('.paraverespacio3').css({ 'margin-top': '30px' });
            $('.paraverespacio3').css({ 'margin-bottom': '60px' });
            $('.paraverespacio4').css({ 'margin-top': '35px' });
            $('.paraverespacio4').css({ 'margin-bottom': '65px' });
            $('.paraverespacio5').css({ 'margin-top': '30px' });
        }
        if (prueba.length == 7) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
            $('.paraverespacio2').css({ 'margin-bottom': '65px' });
            $('.paraverespacio3').css({ 'margin-top': '35px' });
            $('.paraverespacio3').css({ 'margin-bottom': '65px' });
            $('.paraverespacio4').css({ 'margin-top': '35px' });
            $('.paraverespacio4').css({ 'margin-bottom': '65px' });
            $('.paraverespacio5').css({ 'margin-top': '35px' });
            $('.paraverespacio5').css({ 'margin-bottom': '65px' });
            $('.paraverespacio6').css({ 'margin-top': '35px' });
            $('.paraverespacio6').css({ 'margin-bottom': '65px' });
            $('.paraverespacio7').css({ 'margin-top': '35px' });
        }
        if (prueba.length == 8) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
            $('.paraverespacio2').css({ 'margin-bottom': '65px' });
            $('.paraverespacio3').css({ 'margin-top': '35px' });
            $('.paraverespacio3').css({ 'margin-bottom': '65px' });
            $('.paraverespacio4').css({ 'margin-top': '35px' });
            $('.paraverespacio4').css({ 'margin-bottom': '65px' });
            $('.paraverespacio5').css({ 'margin-top': '35px' });
            $('.paraverespacio5').css({ 'margin-bottom': '65px' });
            $('.paraverespacio6').css({ 'margin-top': '35px' });
            $('.paraverespacio6').css({ 'margin-bottom': '65px' });
            $('.paraverespacio7').css({ 'margin-top': '35px' });
            $('.paraverespacio7').css({ 'margin-bottom': '65px' });
            $('.paraverespacio8').css({ 'margin-top': '35px' });
        }
        if (prueba.length == 9) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
            $('.paraverespacio2').css({ 'margin-bottom': '65px' });
            $('.paraverespacio3').css({ 'margin-top': '35px' });
            $('.paraverespacio3').css({ 'margin-bottom': '65px' });
            $('.paraverespacio4').css({ 'margin-top': '35px' });
            $('.paraverespacio4').css({ 'margin-bottom': '65px' });
            $('.paraverespacio5').css({ 'margin-top': '35px' });
            $('.paraverespacio5').css({ 'margin-bottom': '65px' });
            $('.paraverespacio6').css({ 'margin-top': '35px' });
            $('.paraverespacio6').css({ 'margin-bottom': '65px' });
            $('.paraverespacio7').css({ 'margin-top': '35px' });
            $('.paraverespacio7').css({ 'margin-bottom': '65px' });
            $('.paraverespacio8').css({ 'margin-top': '35px' });
            $('.paraverespacio8').css({ 'margin-bottom': '65px' });
            $('.paraverespacio9').css({ 'margin-top': '35px' });
        }
        if (prueba.length == 12) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
            $('.paraverespacio2').css({ 'margin-bottom': '65px' });
            $('.paraverespacio3').css({ 'margin-top': '35px' });
            $('.paraverespacio3').css({ 'margin-bottom': '65px' });
            $('.paraverespacio4').css({ 'margin-top': '35px' });
            $('.paraverespacio4').css({ 'margin-bottom': '65px' });
            $('.paraverespacio5').css({ 'margin-top': '35px' });
            $('.paraverespacio5').css({ 'margin-bottom': '65px' });
            $('.paraverespacio6').css({ 'margin-top': '35px' });
            $('.paraverespacio6').css({ 'margin-bottom': '65px' });
            $('.paraverespacio7').css({ 'margin-top': '35px' });
            $('.paraverespacio7').css({ 'margin-bottom': '65px' });
            $('.paraverespacio8').css({ 'margin-top': '35px' });
            $('.paraverespacio8').css({ 'margin-bottom': '65px' });
            $('.paraverespacio9').css({ 'margin-top': '35px' });
            $('.paraverespacio9').css({ 'margin-bottom': '65px' });
            $('.paraverespacio10').css({ 'margin-top': '35px' });
            $('.paraverespacio10').css({ 'margin-bottom': '65px' });
            $('.paraverespacio11').css({ 'margin-top': '35px' });
            $('.paraverespacio11').css({ 'margin-bottom': '65px' });
            $('.paraverespacio12').css({ 'margin-top': '35px' });
        }
        if (prueba.length == 13) {
            $('.paraverespacio0').css({ 'margin-bottom': '65px' });
            $('.paraverespacio1').css({ 'margin-top': '35px' });
            $('.paraverespacio1').css({ 'margin-bottom': '65px' });
            $('.paraverespacio2').css({ 'margin-top': '35px' });
            $('.paraverespacio2').css({ 'margin-bottom': '65px' });
            $('.paraverespacio3').css({ 'margin-top': '35px' });
            $('.paraverespacio3').css({ 'margin-bottom': '65px' });
            $('.paraverespacio4').css({ 'margin-top': '35px' });
            $('.paraverespacio4').css({ 'margin-bottom': '65px' });
            $('.paraverespacio5').css({ 'margin-top': '35px' });
            $('.paraverespacio5').css({ 'margin-bottom': '65px' });
            $('.paraverespacio6').css({ 'margin-top': '35px' });
            $('.paraverespacio6').css({ 'margin-bottom': '65px' });
            $('.paraverespacio7').css({ 'margin-top': '35px' });
            $('.paraverespacio7').css({ 'margin-bottom': '65px' });
            $('.paraverespacio8').css({ 'margin-top': '35px' });
            $('.paraverespacio8').css({ 'margin-bottom': '65px' });
            $('.paraverespacio9').css({ 'margin-top': '35px' });
            $('.paraverespacio9').css({ 'margin-bottom': '65px' });
            $('.paraverespacio10').css({ 'margin-top': '35px' });
            $('.paraverespacio10').css({ 'margin-bottom': '65px' });
            $('.paraverespacio11').css({ 'margin-top': '35px' });
            $('.paraverespacio11').css({ 'margin-bottom': '65px' });
            $('.paraverespacio12').css({ 'margin-top': '35px' });
        }
        var divToPrint = document.getElementById('imprimir');

        var correoMensaje =
            '<html><head><style type="text/css">@page{size: A4;} .imagensolobotonimprimir{display:block} .imagensolobotonimprimir1{display:none} #estoparaesconderenmovilpc{display:block !important;} #esteDivPrueba0{margin-bottom: 0px !important;position: inherit;display: block !important;} #esteDivPrueba1{margin-top: 0px !important;margin-bottom: 0px !important;position: inherit;display: block !important;} #esteDivPrueba2{margin-top: 0px !important;margin-bottom: 0px !important;position: inherit;display: block !important;} #esteDivPrueba3{margin-top: 0px !important;margin-bottom: 0px !important;position: inherit;display: block !important;} #esteDivPrueba4{margin-top: 0px !important;margin-bottom: 0px !important;position: inherit;display: block !important;} #esteDivPrueba5{margin-top: 0px !important;margin-bottom: 0px !important;position: inherit;display: block !important;} #esteDivPrueba6{margin-top: 0px !important;margin-bottom: 0px !important;position: inherit;display: block !important;} #esteDivPrueba7{margin-top: 0px !important;margin-bottom: 0px !important;position: inherit;display: block !important;} #aquisoloparaimprimir{display:block !important;} #aquisoloparamostrar{display:none !important;} #divTotalPuntosParaTodo{display:none} #quitamoseldisplaydeldiv{display:block !important;} #divobservacionesparaimprimir{display:none} #divobservacionesparaimprimir1{border: 1px solid;float: left;width: 55%;display:block !important;} #pimprimirdatostexto{margin-top:4px !important; margin-bottom:4px !important;} #basesImponiblesDiv{display:block !important;float:left;width:12%;border: 1px solid;} .queremosquenosevea{display:block !important;} #divparaimagendatosmeter{float: left;display: block !important;width: 35% !important;height: 750px !important;border: 1px solid;} #divUnidadespedido{float: left;display: block !important;width: 9% !important;height: 750px !important;border: 1px solid;} #referenciapdivreferencia{FONT-SIZE: 14PX;MARGIN-TOP: 0;BORDER-BOTTOM: 1PX SOLID;TEXT-ALIGN: CENTER;BACKGROUND-COLOR: #2E2E2E;COLOR: WHITE;padding-top: 5px;padding-bottom: 3px;margin-bottom:5px;} #divreferenciapedido{float: left;display: block !important;width: 35% !important;height: 750px !important;margin-left: 8px !important;border: 1px solid;} #imagenlogopedidosprod{width: 10% !important;position: absolute !important;left: 2% !important;} #divderechapedidodatos{width: 25%;position: absolute;right: 2%;border: 1px solid;top: 5%;} #pmetidoimprimir{margin-top: 0;margin-bottom: 5px;margin-left: 10;} #metertamanotienda{margin-bottom: 2px;} #elultimopadentrop{margin-top: 2;} #metertamanotienda{margin-top:0;} #clienteDivTienda{margin-top: 40px;border: 1px solid;width: 49%;float: left;} #clienteDivDireccion{margin-top: 40px;border: 1px solid;width: 49%;float: left;margin-left:0.8%} #primeroMeterMargin{margin-top:-60px !important;} #clienteDiv{margin-top:0px !important;} #metertamanotienda{font-size:20px !important;} #divObserPoner{display:none} #esteDiv0{float:initial !important} #imagenPresupues{max-width:300px !important; max-height:300px !important;} #estoParaImprimir {float: left;width: 100%;} #datosMeter4 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter5 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #datosMeter6 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter7 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #datosMeter8 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter9 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #datosMeter10 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter11 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #datosMeter12 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter13 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #datosMeter14 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter15 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #datosMeter16 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter17 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #datosMeter18 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter19 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #datosMeter20 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter21 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;} #tapa {max-width:250px;max-height:183px} #datosMeter0 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #pNombreProd{display:none;} #datosMeter1 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #datosMeter2 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 365px;} #datosMeter3 {float:left !important;width: 100% !important;font-size: 12px;text-align: left !important;margin-left: 2%;height: 350px;} #spanobser{margin-top:0% !important;margin-left: 1% !important;font-size: 15px; } #textoObservaciones{margin-top:0% !important;display: block !important;float: left !important;margin-left: 1% !important;width: 80% !important;height: 45px !important;border: 0 !important;} .primerDivPresu{display:none} .estoesundivparaprobar{margin-top:0px !important; margin-bottom:0px !important;margin-top: 50px !important;float: initial;width: 100%;margin-bottom: 40px !important;position: inherit;display:block !important;} #imagen0{width: 100% !important;height: 330px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen1{width: 100% !important;height: 330px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen2{width: 100% !important;height: 330px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen3{width: 100% !important;height: 330px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen4{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen5{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen6{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen7{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen8{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen9{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen10{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen11{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen12{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen13{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen14{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen15{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen16{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen17{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #imagen18{width: 100% !important;height: 310px !important;margin-left: 1% !important;margin-top:1% !important;} #hrUltimo{ display: none} #logoPresu{max-width: 60px !important;position: absolute !important;margin-top: 100px !important;margin-left: 110px !important;} #idLineaDiv{display:none} #bajarFontSize{font-size:15px !important;} #totalDescuentoTexto{font-size:15px !important;} #euro{font-size:15px !important;} #bajarFontSize{font-size:15px !important;} #ivaPrecioQuitar{font-size:15px !important;} #bajarFontSize{font-size:15px !important;} #precioIvaSumado{font-size:15px !important;} #rightImprimir{float:right !important; right:0; text-align:right; width:100% !important;} .pietrasin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(125%);} .norwaysin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(140%);} .broncesin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;} .transparentesin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;} .nocesin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(140%);} .naturesin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(150%);} .tabaksin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(150%);} .kobesin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(150%);} .blancosin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(140%);} .beigesin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(140%);} .lattesin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(190%);} .grafenosin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(150%);} .lagosin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(130%);} .maresin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(130%);} .marmolblancosin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(190%);} .marmolnegrosin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(190%);} .norway {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(140%);} .bronce {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;} .transparente {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;} .noce {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(140%);} .nature {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(150%);} .tabak {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(150%);} .kobe {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(150%);} .blanco {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(140%);} .beige {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(140%);} .latte {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(190%);} .grafeno {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(150%);} .lago {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(130%);} .mare {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(130%);} .marmolblanco {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(190%);} .marmolnegro {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(190%);}</style><title>' +
            document.title +
            '</title></head><body style="font-family: Lato , sans-serif;font-weight: 400;zoom:78% !important;-webkit-print-color-adjust:exact;">' +
            divToPrint.innerHTML +
            '</body></html>';
        console.log(blob);
        var file = new File([blob], 'presupdf.pdf');
        this.vistaadminService.pushFileToStorageExcel1(file, correo, correoMensaje).subscribe(event => {
            console.log(event);
        });
    }
}

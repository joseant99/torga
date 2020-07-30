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
import { ArmariosDormitorioComponent } from './armarios-dormitorio.component';
import { VestidoresDormitorioComponent } from './vestidores-dormitorio.component';
import { ArmariosDormitorioOcultaComponent } from './armarios-dormitorio-oculta.component';
import { ArmariosDormitorioVistaComponent } from './armarios-dormitorio-vista.component';
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
import { IvaProductoTiendaService } from '../iva-producto-tienda/iva-producto-tienda.service';
import { UsbService } from '../usb/usb.service';
import { VistaAdminService } from '../vista-admin/vista-admin.service';
import { HttpEventType } from '@angular/common/http';

@Component({
    providers: [
        ArmariosDormitorioComponent,
        ArmariosDormitorioOcultaComponent,
        ArmariosDormitorioVistaComponent,
        VestidoresDormitorioComponent
    ],
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
    saberNumArrayAca: any;
    acaProdsCar: any;
    ruta: any;
    iva: any;
    acaProdPed: any;
    precioTienda: any;
    presupuestoPedido: IPresupuestoPedido;
    presupuesto: any;
    mostrarTextoSINO: any;
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
    precioPunto: any;
    mostrarAcabadosPuerta: any;
    cogerLuz: any;
    guardarIdInterior: any;
    numeroInteriorArmario: any;
    cogerIdAcabados: any;
    numeroPuertas: any;
    interiorArmario: any;
    acabadosPuerta2: any;
    puertasTabla: any;
    cogidoTirador: any;
    precioDimension: any;
    modulosBajos: any;
    aparadores: any;
    singulares: any;
    alturaEstan: any;
    estantModu: any;
    catalogoDormi: any;
    catalogoCome: any;
    estanteria: any;
    acabadosEstanteria: any;
    uid: any;
    idDelProducto: any;
    idMeterimagen: any;
    estaEsLaLUZ: any;
    usbCogido: any;
    usb: any;
    selectedFilesFactura: FileList;
    selectedFilesConfirmacion: FileList;
    selectedFilesExcel: FileList;
    currentFileUploadFactura: File;
    currentFileUploadConfirmacion: File;
    currentFileUploadExcel: File;
    progressFactura: { percentage: number } = { percentage: 0 };
    progressConfirmacion: { percentage: number } = { percentage: 0 };
    progressExcel: { percentage: number } = { percentage: 0 };
    errormessage: string;
    posicionEstanteria: any;
    acabados1: any;

    constructor(
        protected tiposApoyoService: TiposApoyoService,
        protected medidasEspecialesService: MedidasEspecialesService,
        protected ivaProductoTiendaService: IvaProductoTiendaService,
        protected dimensionesProductoTipoService: DimensionesProductoTipoService,
        protected acabadosService: AcabadosService,
        protected precioTiendaService: PrecioTiendaService,
        protected iluminacionProdPrePedService: IluminacionProdPrePedService,
        protected iluminacionService: IluminacionService,
        protected precioTiendaProductosService: PrecioTiendaProductosService,
        protected medEspProductoPedidoPresuService: MedEspProductoPedidoPresuService,
        protected vistaadminService: VistaAdminService,
        protected interioresService: InterioresService,
        protected acabadosProductosPresupuestoPedidoService: AcabadosProductosPresupuestoPedidoService,
        protected acaProdService: AcaProdService,
        protected productosPresupuestoPedidosService: ProductosPresupuestoPedidosService,
        protected presupuestoPedidoService: PresupuestoPedidoService,
        protected userService: UserService,
        protected dimensionesProductoService: DimensionesProductoService,
        public productosDormitorioService: ProductosDormitorioService,
        protected parseLinks: JhiParseLinks,
        protected usbService: UsbService,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected dataUtils: JhiDataUtils,
        protected router: Router,
        protected eventManager: JhiEventManager,
        private loginService: LoginService,
        public armariosDormitorioComponent: ArmariosDormitorioComponent,
        public armariosDormitorioOcultaComponent: ArmariosDormitorioOcultaComponent,
        public armariosDormitorioVistaComponent: ArmariosDormitorioVistaComponent,
        public vestidoresDormitorioComponent: VestidoresDormitorioComponent,
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
    public cargarEstanterias(altura) {
        this.alturaEstan = altura;
        var preciosPuntos = this.precioPunto;
        var precioCat = this.catalogoCome;
        this.dimensionesProductoTipoService.findProducto(352).subscribe(data => {
            for (let i = 0; i < data.body['length']; i++) {
                if (data.body[i]['alto'] == altura) {
                    var precio = data.body[i]['precio'];
                    precio = precio * preciosPuntos[0];
                    var preciosum = precio * (precioCat[0]['precio'] / 100);
                    precio = precio + preciosum;
                    $('#divEstant').css({ display: 'block' });
                    $('#articulosEstanterias').css({ display: 'block' });
                    $('#articulosEstanterias').append(
                        '<img style="z-index:100;position: absolute;max-width: 400px;" src="../../../content/images/ESTANTERIAS/1-min.png">'
                    );
                    $('#precioCostado').text(precio + ' €');
                    $('#anchoEstant').text(data.body[i]['ancho']);
                    $('#precioDimension').text(precio);
                    $('#euroCalculadora').css({ display: 'block' });
                }
            }
        });
    }

    selectedFilesFacturas(event) {
        this.selectedFilesFactura = event.target.files;
    }
    selectedFilesConfirmaciones(event) {
        this.selectedFilesConfirmacion = event.target.files;
    }
    selectFileExcel(event) {
        this.selectedFilesExcel = event.target.files;
    }

    uploadFactura() {
        var long = this.selectedFilesFactura.length;
        for (var i = 0; i < long; i++) {
            this.progressFactura.percentage = 0;

            this.currentFileUploadFactura = this.selectedFilesFactura.item(i);
            this.vistaadminService.pushFileToStorageFactura(this.currentFileUploadFactura).subscribe(event => {
                if (i === long) {
                    if (event.type === HttpEventType.UploadProgress) {
                        this.progressFactura.percentage = Math.round((100 * event.loaded) / event.total);
                    } else if (event instanceof HttpResponse) {
                        console.log('File is completely uploaded!');
                    }
                }
            });
        }

        this.selectedFilesFactura = undefined;
    }

    public fondoArmarioBatientes() {
        $('#inputFondoBatientes').css({ 'background-color': 'white' });
        $('#inputFondoBatientes').removeAttr('readonly');
        $('#inputFondoBatientes').removeAttr('data-target');
        $('#inputFondoBatientes').removeAttr('data-toggle');
        $('#productosPrincipal').append('<datalist id="listaFondoBat"></datalist>');
        for (let i = 45; i < 66; i++) {
            $('#listaFondoBat').append('<option value="' + i + '">' + i + '</option>');
        }
    }

    uploadConfirmacion() {
        var long = this.selectedFilesConfirmacion.length;
        for (var i = 0; i < long; i++) {
            this.progressConfirmacion.percentage = 0;
            this.currentFileUploadConfirmacion = this.selectedFilesConfirmacion.item(i);
            this.vistaadminService.pushFileToStorageConfirmacion(this.selectedFilesConfirmacion.item(i)).subscribe(event => {
                if (i === long) {
                    if (event.type === HttpEventType.UploadProgress) {
                        this.progressConfirmacion.percentage = Math.round((100 * event.loaded) / event.total);
                    } else if (event instanceof HttpResponse) {
                        console.log('File is completely uploaded!');
                    }
                }
            });
        }

        this.selectedFilesConfirmacion = undefined;
    }

    uploadExcel() {
        this.progressExcel.percentage = 0;

        this.currentFileUploadExcel = this.selectedFilesExcel.item(0);

        this.vistaadminService.pushFileToStorageExcel(this.currentFileUploadExcel).subscribe(event => {});

        this.selectedFilesExcel = undefined;
    }
    public mostrarTexto(id) {
        if (id == 'Si') {
            $('#inputSi').css({ display: 'block' });
            this.mostrarTextoSINO = 1;
        } else {
            $('#inputSi').css({ display: 'none' });
            this.mostrarTextoSINO = 2;
        }
    }

    public abrirBotonEspecial() {
        var textarticulo = $('#textArticulo').val();
        if (textarticulo != '') {
            $('#botonEnviarEspecial').css({ display: 'block' });
        }
    }

    public enviarCarritoEspecial() {
        var nombre = this.currentFileUploadExcel['name'];
        var textarticulo = $('#textArticulo').val();
        var valor;
        if (this.mostrarTextoSINO == 1) {
            valor = $('#inputSi').val();
        } else {
            valor = 'No definido';
        }

        var contador = 1;
        var conta = 0;
        for (let k = 1; k < sessionStorage.length; k++) {
            if (sessionStorage['prod' + k] != null) {
                contador++;
            }
        }
        var contadorProd = contador;
        var contadorDimen = contador;
        var prod = [];
        prod[1] = {};
        prod[1]['texto'] = textarticulo;
        prod[1]['precio'] = valor;
        prod[1]['imagen'] = nombre;
        prod[1]['especial'] = 0;
        sessionStorage.setItem('prod' + contadorDimen, JSON.stringify(prod));
    }

    public escogidaEstanteria(estant) {
        var altura = this.alturaEstan;
        var arrayMedidas = [];
        var posicion = this.posicionEstanteria;
        arrayMedidas[0] = 'z-index:99;margin-left: 25px;margin-top: -9px;';
        arrayMedidas[1] = 'z-index:97;margin-left: 75px;margin-top: -21px;';
        arrayMedidas[2] = 'z-index:96;margin-left: 114px;margin-top: -26px;';
        arrayMedidas[3] = 'z-index:95;margin-left: 157px;margin-top: -38px;';
        arrayMedidas[4] = 'z-index:94;margin-left: 25px;margin-top: -9px;';

        var array = this.estanteria;
        var preciosPuntos = this.precioPunto;
        var precioCat = this.catalogoCome;
        var anchoEstant = $('#anchoEstant').text();
        var precioTodo = $('#precioDimension').text();
        if (estant.id == 353) {
            $('#articulosEstanterias').append(
                '<img style="' +
                    arrayMedidas[posicion] +
                    'position: absolute;max-width: 400px;" src="../../../content/images/ESTANTERIAS/2-min.png">'
            );
        }
        if (estant.id == 354) {
            $('#articulosEstanterias').append(
                '<img style="' +
                    arrayMedidas[posicion] +
                    'position: absolute;max-width: 400px;" src="../../../content/images/ESTANTERIAS/3-min.png">'
            );
        }
        if (estant.id == 355) {
        }
        if (estant.id == 356) {
            $('#articulosEstanterias').append(
                '<img style="' +
                    arrayMedidas[posicion] +
                    'position: absolute;max-width: 400px;" src="../../../content/images/ESTANTERIAS/4-min.png">'
            );
        }
        if (estant.id == 357) {
            $('#articulosEstanterias').append(
                '<img style="' +
                    arrayMedidas[posicion] +
                    'position: absolute;max-width: 400px;" src="../../../content/images/ESTANTERIAS/5-min.png">'
            );
        }
        if (estant.id == 358) {
            $('#articulosEstanterias').append(
                '<img style="' +
                    arrayMedidas[posicion] +
                    'position: absolute;max-width: 400px;" src="../../../content/images/ESTANTERIAS/6-min.png">'
            );
        }
        if (estant.id == 359) {
            $('#articulosEstanterias').append(
                '<img style="' +
                    arrayMedidas[posicion] +
                    'position: absolute;max-width: 400px;" src="../../../content/images/ESTANTERIAS/7-min.png">'
            );
        }
        this.posicionEstanteria = posicion + 1;
        this.dimensionesProductoTipoService.findProducto(estant.id).subscribe(data => {
            for (let i = 0; i < data.body['length']; i++) {
                if (data.body[i]['alto'] == altura) {
                    var precio = data.body[i]['precio'];
                    precio = precio * preciosPuntos[0];
                    var preciosum = precio * (precioCat[0]['precio'] / 100);
                    precio = precio + preciosum;
                    var ancho = parseFloat(anchoEstant) + data.body[i]['ancho'];
                    var todoPrecio = parseFloat(precioTodo) + precio;
                    $('#precioDimension').text(todoPrecio);
                    $('#anchoEstant').text(ancho);
                    data.body[i]['precio'] = precio;
                    array[array['length']] = data.body[i];
                    this.estanteria = array;
                }
            }
        });

        this.acaProdService.findAca(estant.id).subscribe(data => {
            var arrayAca = this.saberNumArrayAca;
            var otro = [];
            this.acabadosEstanteria = data.body[0]['acabados'];
            for (let i = 0; i < data.body['length']; i++) {
                otro[i] = data.body[i];
            }
            arrayAca[arrayAca.length] = otro;
            console.log(arrayAca);
            this.saberNumArrayAca = arrayAca;
        });
    }

    public acabadoPonerDiv(id, texto) {
        var acabados = this.acabadosEstanteria;
        this.uid = id;
        this.idMeterimagen = texto;
    }

    public acabadosModal(id, nombre) {
        var acabados = this.acabadosEstanteria;
        var u = this.uid;
        var texto = this.idMeterimagen;
        for (let i = 0; i < acabados.length; i++) {
            if (acabados[i]['id'] == id) {
                var src = 'data:image/gif;base64,' + acabados[i]['imagenFondo'];
            }
        }
        $('#estanteria' + u + ' #inputAcabado' + texto).empty();
        $('#estanteria' + u + ' #inputAcabado' + texto).append('<img src="' + src + '" height="60px" border="0" width="120px" />');
        $('#estanteria' + u + ' #inputAcabado' + texto).append('<p style="margin-top:-40px">' + nombre + '</p>');
    }

    public cargarAntesEstant() {
        var altura = this.alturaEstan;
        this.productosDormitorioService.categoria(28).subscribe(data => {
            $('#otroCuerpo').css({ display: 'block' });
            if (altura == 125) {
                var yes = [];
                var cont = 0;
                for (let i = 0; i < data.body['length']; i++) {
                    if (i != 3 && i != 0) {
                        yes[cont] = data.body[i];
                        cont++;
                    }
                }
                this.estantModu = yes;
                console.log(yes);
            } else {
                var yes = [];
                var cont = 0;
                for (let i = 0; i < data.body['length']; i++) {
                    if (i != 0) {
                        yes[cont] = data.body[i];
                        cont++;
                    }
                }
                this.estantModu = yes;
            }
        });
    }

    public elegirBusqueda(id) {
        $('.armariosDivTodo').css({ display: 'none' });
        $('#inputBusca').css({ display: 'none' });
        $('#calcuBatientes').css({ display: 'none' });
        $('.armariosDivTodo1').css({ display: 'none' });
        $('#calcuOculta').css({ display: 'none' });
        $('#modalesOculta').css({ display: 'none' });
        $('#modalesBatientes').css({ display: 'none' });
        $('.armariosDivTodo2').css({ display: 'none' });
        $('#calcuVista').css({ display: 'none' });
        $('#modalesVista').css({ display: 'none' });
        $('.armariosDivTodo3').css({ display: 'none' });
        $('#calcuVesti').css({ display: 'none' });
        $('#modalesVesti').css({ display: 'none' });
        $('#datos1').empty();
        $('#precioDimension').empty();
        $('#nombreMesita').empty();
        $('#articulosEspeciales').css({ display: 'none' });
        $('#euroCalculadora').css({ display: 'none' });
        $('.vestidoresDivInputCodigo').css({ display: 'none' });
        $('#estanteriaDiv').css({ display: 'none' });
        $('#botonCalculadora').attr('class', 'displayBoton');
        $('.armariosDivInputCodigo').css({ display: 'none' });
        $('.armariosVistaDivInputCodigo').css({ display: 'none' });

        $('#inputCodigoArmario').removeAttr('readonly');
        $('#inputCodigoArmario').val('');
        $('#inputCodigoArmario').css({ 'background-color': 'white' });
        $('#inputCodigoArmario').removeAttr('readonly');
        $('#inputCodigoArmario').val('');
        $('#inputCodigoArmario').css({ overflow: 'hidden' });
        $('#alturaSelect4').css({ overflow: 'hidden' });
        $('#anchosSelect4').css({ overflow: 'hidden' });
        $('#inputCodigoArmario').css({ 'background-color': 'white' });
        $('#anchosSelect').removeAttr('readonly');
        $('#anchosSelect').val('');
        $('#anchosSelect').css({ 'background-color': 'white' });
        $('#alturaSelect').removeAttr('readonly');
        $('#alturaSelect').val('');
        $('#alturaSelect').css({ 'background-color': 'white' });
        $('.armariosDivTodo #imagenesArmario1').empty();
        $('.armariosDivTodo #imagenesArmario2').empty();
        $('#calcuBatientes #cajeadoCalcu').css({ display: 'none' });
        $('#calcuBatientes #enmarcadoCalcu').css({ display: 'none' });
        $('#calcuBatientes #botonesAcabadosCuerpo').css({ display: 'none' });
        $('#calcuBatientes #niveladoresCalcu').css({ display: 'none' });
        $('#nombreMesitaArma').css({ display: 'none' });
        $('#imagenAcabadoPrincipal').css({ display: 'none' });
        $('#ppCalculadora').css({ display: 'block' });
        if (id == 0) {
            $('#inputBusca').css({ display: 'block' });
        }

        if (id == 1) {
            $('#nombreMesita').text('ESTANTERIA A MEDIDA');
            $('#estanteriaDiv').css({ display: 'block' });
        }

        if (id == 2) {
            $('.armariosDivInputCodigo').css({ display: 'block' });
            $('#calcuBatientes').css({ display: 'block' });
            $('#modalesBatientes').css({ display: 'block' });
            $('.armariosDivInputCodigo #botonOkAnchos').removeAttr('disabled');
        }

        if (id == 3) {
            $('#calcuOculta').css({ display: 'block' });
            $('#modalesOculta').css({ display: 'block' });
            $('.armariosOcultaDivInputCodigo').css({ display: 'block' });
            $('.armariosOcultaDivInputCodigo').removeAttr('disabled');
        }

        if (id == 4) {
            $('.armariosVistaDivInputCodigo').css({ display: 'block' });
            $('#calcuVista').css({ display: 'block' });
            $('#modalesVista').css({ display: 'block' });
            $('.armariosVistaDivInputCodigo').removeAttr('disabled');
        }

        if (id == 5) {
            $('.vestidoresDivInputCodigo').css({ display: 'block' });
            $('#calcuVesti').css({ display: 'block' });
            $('#modalesVesti').css({ display: 'block' });
        }

        if (id == 6) {
            $('#articulosEspeciales').css({ display: 'block' });
        }
    }

    public quitarnone(id) {
        if (id == 1) {
            $('#calcuBatientes #niveladoresCalcu').css({ display: 'block' });
            $('#calcuBatientes #cajeadoCalcu').css({ display: 'block' });
            $('#calcuBatientes #enmarcadoCalcu').css({ display: 'block' });
            $('#calcuBatientes #botonesAcabadosCuerpo').css({ display: 'block' });
        }
        if (id == 2) {
            $('#calcuOculta #niveladoresCalcu').css({ display: 'block' });
            $('#calcuOculta #cajeadoCalcu').css({ display: 'block' });
            $('#calcuOculta #enmarcadoCalcu').css({ display: 'none' });
            $('#calcuOculta #botonesAcabadosCuerpo').css({ display: 'block' });
        }

        if (id == 3) {
            $('#calcuVista #niveladoresCalcu').css({ display: 'block' });
            $('#calcuVista #cajeadoCalcu').css({ display: 'block' });
            $('#calcuVista #enmarcadoCalcu').css({ display: 'block' });
            $('#calcuVista #botonesAcabadosCuerpo').css({ display: 'block' });
        }

        if (id == 4) {
            $('#calcuVesti #niveladoresCalcu').css({ display: 'block' });
            $('#calcuVesti #cajeadoCalcu').css({ display: 'block' });
            $('#calcuVesti #enmarcadoCalcu').css({ display: 'none' });
            $('#calcuVesti #botonesAcabadosCuerpo').css({ display: 'block' });
        }
    }

    public cargarDimen() {
        var precioTienda1;
        $('#total').text(0);
        $('.dimensionesColor1').css({ 'background-color': 'white' });
        $('#imagenAcabado').remove();
        $('#datos1').empty();
        $('#datos1').css({ display: 'block' });
        $('#acabado').css({ display: 'none' });
        var acabados = [];
        this.acabadosService
            .query({
                size: 1000
            })
            .subscribe(data => {
                for (let i = 0; i < data.body.length; i++) {
                    acabados[i] = data.body[i];
                }
            });
        this.acabados = acabados;
        this.acabados1 = acabados;
        $('.productosColor').css({ 'background-color': 'white' });
        $('#nombreApoyoTitulo').css({ display: 'none' });
        $('#dimensionesInput1').css({ 'background-color': 'white' });
        $('#dimensionesInput5').css({ 'background-color': 'white' });
        $('#dimensionesInput6').css({ 'background-color': 'white' });
        $('#dimensionesInput2').css({ 'background-color': 'white' });
        $('#dimensionesInput3').css({ 'background-color': 'white' });
        $('#dimensionesInput4').css({ 'background-color': 'white' });
        $('#dimensionesInput7').css({ 'background-color': 'white' });
        $('#dimensionesInput8').css({ 'background-color': 'white' });
        $('#dimensionesInput9').css({ 'background-color': 'white' });
        $('#dimensionesInput10').css({ 'background-color': 'white' });
        $('#dimensionesInput11').css({ 'background-color': 'white' });
        $('#divBuscadorArticulos #acabados').css({ display: 'block' });
        for (let i = 1; i <= 5; i++) {
            $('.apoyoCogido' + i).empty();
        }
        for (let i = 1; i <= 15; i++) {
            $('#aca1' + i).empty();
        }
        precioTienda1 = localStorage.getItem('preciosTiendas');
        var precioTienda = this.precioTienda;
        var nombre;
        var productoTocho;
        nombre = $('#anchosSelect1').val();
        this.dimensionesProductoTipoService.findDimensionNombre(nombre.toUpperCase()).subscribe(data => {
            var datos = data.body[0];
            var todosLosDatos = data.body;
            if (
                datos['productosDormitorio']['categoriasDormi']['id'] == 8 ||
                datos['productosDormitorio']['categoriasDormi']['id'] == 14 ||
                datos['productosDormitorio']['categoriasDormi']['id'] == 15 ||
                datos['productosDormitorio']['categoriasDormi']['id'] == 18 ||
                datos['productosDormitorio']['categoriasDormi']['id'] == 20 ||
                datos['productosDormitorio']['categoriasDormi']['id'] == 21 ||
                datos['productosDormitorio']['categoriasDormi']['id'] == 22 ||
                datos['productosDormitorio']['categoriasDormi']['id'] == 25 ||
                datos['productosDormitorio']['categoriasDormi']['id'] == 26 ||
                datos['productosDormitorio']['categoriasDormi']['id'] == 27 ||
                datos['productosDormitorio']['categoriasDormi']['id'] == 2 ||
                datos['productosDormitorio']['categoriasDormi']['id'] == 1 ||
                datos['productosDormitorio']['categoriasDormi']['id'] == 5
            ) {
                this.modulosBajos = datos;
            }
            if (datos['productosDormitorio']['categoriasDormi']['id'] == 11) {
                this.aparadores = datos;
            }
            if (
                datos['productosDormitorio']['categoriasDormi']['id'] == 13 ||
                datos['productosDormitorio']['categoriasDormi']['id'] == 12 ||
                datos['productosDormitorio']['categoriasDormi']['id'] == 17 ||
                datos['productosDormitorio']['categoriasDormi']['id'] == 4
            ) {
                this.singulares = datos;
            }
            var producto = datos.productosDormitorio.id;
            var precioPunto = parseFloat(this.precioPunto);
            var iva = this.iva;
            var cont = 0;

            this.dimensionesProductoTipoService.todos = data.body;
            this.todasDimensiones = data.body;
            if (nombre.toUpperCase() == datos['mensaje']) {
                var text = $('#nombreMesita').text();
                $('#nombreMesita').text(datos['productosDormitorio']['nombre']);

                var total = $('#total').text();

                var totalfloat = parseFloat(total);
                var precio = parseFloat(datos['precio']);
                precio = precio * precioPunto;
                precio = Math.round(precio * 100) / 100;
                totalfloat = totalfloat + precio;
                if (iva == 1) {
                    var todasCuenta = totalfloat * 1.21;
                } else {
                    var todasCuenta = totalfloat;
                }
                var totalfloat = 0;
                this.precioDimension = todasCuenta;
                totalfloat = parseFloat(todasCuenta.toFixed(2));
                $('#dimensionesInput' + (cont + 1)).css({ 'background-color': '#DFDDDC' });
                $('#total').text(totalfloat);
                $('#precioDimension').text(totalfloat);
                var saberlo = JSON.parse(sessionStorage.getItem('seccionPrecios'));
                if (saberlo != 'A') {
                    $('#euroCalculadora').css({ display: 'block' });
                } else {
                    $('#ppCalculadora').css({ display: 'block' });
                }

                $('#datos1').append(
                    '<p style="width:100%"><span>Ancho : </span><span class="' +
                        datos['id'] +
                        '" id="ancho1">' +
                        datos['ancho'] +
                        '</span></p>'
                );

                $('#datos1').append('<p style="width:100%"><span>Alto : </span><span>' + datos['alto'] + '</span></p>');
                $('#datos1').append(
                    '<p style="width:100%"><span>Fondo : </span><span id="fondoDatosDimen">' + datos['fondo'] + '</span></p>'
                );
                $('#datos1').append(
                    '<p style="width:100%"><span>Código : </span><span id="codigoMensajeDatos">' + datos['mensaje'] + '</span></p>'
                );
            }

            /** this.dimensionesProductoTipoService.findProducto(datos.productosDormitorio.id).subscribe(data => {
                this.dimensionesProductoTipoService.todos = data.body;
                this.todasDimensiones = data.body;
                var cont = 0;
                var dimensionesPrueba;
                dimensionesPrueba = data.body;
                var datos = dimensionesPrueba;
                
                $('#dimensiones').css({ display: 'block' });
                for (let i = 0; i < datos.length; i++) {
                    if (producto == datos[i]['productosDormitorio']['id']) {
                    	productoTocho = datos[i]['productosDormitorio'];
                        if (nombre.toUpperCase() == datos[i]['mensaje']) {
                            var text = $('#nombreMesita').text();
                            $('#nombreMesita').text(datos[i]['productosDormitorio']['nombre']);

                            var total = $('#total').text();

                            var totalfloat = parseFloat(total);
                            var precio = parseFloat(datos[i]['precio']);
                            precio = precio * precioPunto;
                            precio = Math.round(precio * 100) / 100;
                            totalfloat = totalfloat + precio;
                            if (iva == 1) {
                                var todasCuenta = totalfloat * 1.21;
                            } else {
                                var todasCuenta = totalfloat;
                            }
                            var totalfloat = 0;
                            this.precioDimension = todasCuenta;
                            totalfloat = parseFloat(todasCuenta.toFixed(2));
                            $('#dimensionesInput' + (cont + 1)).css({ 'background-color': '#DFDDDC' });
                            $('#total').text(totalfloat);
                            $('#precioDimension').text(totalfloat);
                            $('#datos1').append(
                                '<p style="width:100%"><span>Ancho : </span><span class="' +
                                    datos[i]['id'] +
                                    '" id="ancho1">' +
                                    datos[i]['ancho'] +
                                    '</span></p>'
                            );
                            $('#datos1').append('<p style="width:100%"><span>Alto : </span><span>' + datos[i]['alto'] + '</span></p>');
                            $('#datos1').append(
                                '<p style="width:100%"><span>Fondo : </span><span id="fondoDatosDimen">' + datos[i]['fondo'] + '</span></p>'
                            );
                        }
                        if (cont == 0 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            $('#dimensionesText1').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('#precioDimenText1').text(datos[i]['precio'] + ' €');
                            $('.dimensionesColor1').css({ 'margin-left': '20%' });
                            $('.dimensionesColor1').css({ 'margin-bottom': '6%' });
                            $('#dimensiones').css({ width: '90%' });
                            $('#dimensiones').css({ display: 'block' });
                            $('#dimensiones').css({ 'background-color': 'white' });
                            $('#medidas').css({ display: 'block' });
                            $('.dimensionesColor1').css({ display: 'block' });
                            $('#dimensiones').css({ border: '1px solid #7AC8FE' });
                            $('#dimensiones').css({ 'margin-top': '50px' });
                            $('.dimensionesColor1').css({ float: 'left' });
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
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('#precioDimenText2').text(datos[i]['precio'] + ' €');
                            $('.dimensionesColor2').css({ display: 'block' });
                            $('.dimensionesColor2').css({ 'margin-left': '20%' });
                            $('.dimensionesColor1').css({ 'margin-bottom': '1%' });
                            $('.dimensionesColor2').css({ 'margin-bottom': '6%' });
                            $('#dimensiones').css({ width: '90%' });
                            $('#dimensiones').css({ display: 'block' });
                            $('#dimensiones').css({ 'background-color': 'white' });
                            $('#medidas').css({ display: 'block' });
                            $('#dimensiones').css({ border: '1px solid #7AC8FE' });
                            $('#dimensiones').css({ 'margin-top': '50px' });
                            $('.dimensionesColor2').css({ float: 'left' });
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
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('#precioDimenText3').text(datos[i]['precio'] + ' €');
                            $('.dimensionesColor3').css({ display: 'block' });
                            $('.dimensionesColor3').css({ 'margin-left': '20%' });
                            $('.dimensionesColor2').css({ 'margin-bottom': '1%' });
                            $('.dimensionesColor3').css({ 'margin-bottom': '6%' });
                            $('.dimensionesColor3').css({ float: 'left' });
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
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('#precioDimenText4').text(datos[i]['precio'] + ' €');
                            $('.dimensionesColor4').css({ display: 'block' });
                            $('.dimensionesColor4').css({ 'margin-left': '20%' });
                            $('.dimensionesColor3').css({ 'margin-bottom': '1%' });
                            $('.dimensionesColor4').css({ 'margin-bottom': '6%' });
                            $('.dimensionesColor4').css({ float: 'left' });
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
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('#precioDimenText5').text(datos[i]['precio'] + ' €');
                            $('.dimensionesColor5').css({ display: 'block' });
                            $('.dimensionesColor5').css({ 'margin-left': '20%' });
                            $('.dimensionesColor4').css({ 'margin-bottom': '1%' });
                            $('.dimensionesColor5').css({ 'margin-bottom': '6%' });
                            $('.dimensionesColor5').css({ float: 'left' });
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
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('#precioDimenText6').text(datos[i]['precio'] + ' €');
                            $('.dimensionesColor6').css({ display: 'block' });
                            $('.dimensionesColor5').css({ 'margin-bottom': '1%' });
                            $('.dimensionesColor4').css({ 'margin-bottom': '1%' });
                            $('.dimensionesColor6').css({ 'margin-bottom': '6%' });
                            $('.dimensionesColor6').css({ 'margin-left': '20%' });
                            $('.dimensionesColor6').css({ float: 'left' });
                            $('.dimensionesColor6').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1;display_none"></p>'
                            );
                        }
                        if (cont == 6 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            $('#dimensionesText7').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('#precioDimenText7').text(datos[i]['precio'] + ' €');
                            $('.dimensionesColor7').css({ display: 'block' });
                            $('.dimensionesColor7').css({ 'margin-left': '20%' });
                            $('.dimensionesColor6').css({ 'margin-bottom': '1%' });
                            $('.dimensionesColor7').css({ 'margin-bottom': '6%' });
                            $('.dimensionesColor7').css({ float: 'left' });
                            $('.dimensionesColor7').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1;display_none"></p>'
                            );
                        }
                        if (cont == 7 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            $('#dimensionesText8').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('#precioDimenText8').text(datos[i]['precio'] + ' €');
                            $('.dimensionesColor8').css({ display: 'block' });
                            $('.dimensionesColor8').css({ 'margin-left': '20%' });
                            $('.dimensionesColor7').css({ 'margin-bottom': '1%' });
                            $('.dimensionesColor8').css({ 'margin-bottom': '6%' });
                            $('.dimensionesColor8').css({ float: 'left' });
                            $('.dimensionesColor8').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1;display_none"></p>'
                            );
                        }
                        if (cont == 8 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            $('#dimensionesText9').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('#precioDimenText9').text(datos[i]['precio'] + ' €');
                            $('.dimensionesColor9').css({ display: 'block' });
                            $('.dimensionesColor9').css({ 'margin-left': '20%' });
                            $('.dimensionesColor8').css({ 'margin-bottom': '1%' });
                            $('.dimensionesColor9').css({ 'margin-bottom': '6%' });
                            $('.dimensionesColor9').css({ float: 'left' });
                            $('.dimensionesColor9').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1;display_none"></p>'
                            );
                        }
                        if (cont == 9 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            $('#dimensionesText10').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('#precioDimenText10').text(datos[i]['precio'] + ' €');
                            $('.dimensionesColor10').css({ display: 'block' });
                            $('.dimensionesColor10').css({ 'margin-left': '20%' });
                            $('.dimensionesColor9').css({ 'margin-bottom': '1%' });
                            $('.dimensionesColor10').css({ 'margin-bottom': '6%' });
                            $('.dimensionesColor10').css({ float: 'left' });
                            $('.dimensionesColor10').append(
                                '<p class="dimensionesId' +
                                    (cont + 1) +
                                    '" id="' +
                                    datos[i]['id'] +
                                    '" style="position:absolute;z-index:1;display_none"></p>'
                            );
                        }
                        if (cont == 10 && datos[i]['mensaje'] != 'Medidas Especiales') {
                            $('#dimensionesText11').text(
                                datos[i]['mensaje'] +
                                    ' | Ancho ' +
                                    datos[i]['ancho'] +
                                    ' - Alto ' +
                                    datos[i]['alto'] +
                                    ' - Fondo ' +
                                    datos[i]['fondo'] +
                                    ' | '
                            );
                            $('#precioDimenText11').text(datos[i]['precio'] + ' €');
                            $('.dimensionesColor11').css({ display: 'block' });
                            $('.dimensionesColor11').css({ 'margin-left': '20%' });
                            $('.dimensionesColor10').css({ 'margin-bottom': '1%' });
                            $('.dimensionesColor11').css({ 'margin-bottom': '6%' });
                            $('.dimensionesColor11').css({ float: 'left' });
                            $('.dimensionesColor11').append(
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
			**/
            var idProd = producto;
            this.idDelProducto = idProd;
            $('#tenerLUZ').css({ display: 'none' });
            this.iluminacionService.findProd(idProd).subscribe(data => {
                console.log(data.body);
                if (data.body.length != 0) {
                    $('#tenerLUZ').css({ display: 'block' });
                }
            });
            var arrayUsb = [];
            var contUsb = 0;
            if (
                idProd == 277 ||
                idProd == 278 ||
                idProd == 279 ||
                idProd == 280 ||
                idProd == 281 ||
                idProd == 292 ||
                idProd == 246 ||
                idProd == 249 ||
                idProd == 250 ||
                idProd == 248 ||
                idProd == 253 ||
                idProd == 254 ||
                idProd == 252 ||
                idProd == 257 ||
                idProd == 258 ||
                idProd == 256 ||
                idProd == 261 ||
                idProd == 262 ||
                idProd == 260 ||
                idProd == 265 ||
                idProd == 266 ||
                idProd == 264 ||
                idProd == 273 ||
                idProd == 274 ||
                idProd == 272 ||
                idProd == 269 ||
                idProd == 270 ||
                idProd == 268
            ) {
                this.usbService
                    .query({
                        size: 1000000
                    })
                    .subscribe(data => {
                        for (let x = 0; x < data.body.length; x++) {
                            if (data.body[x]['productosDormitorio']['id'] == idProd) {
                                arrayUsb[contUsb] = data.body[x];
                                contUsb++;
                            }
                        }
                        this.usb = arrayUsb;
                    });
            }

            var imagen;
            $('#acabado').removeAttr('style');
            $('#acabado').attr('style');
            $('#acabado').css({ 'text-align': 'center' });
            $('#acabado').css({ 'margin-top': '5%' });
            $('#acabado').css({ 'margin-bottom': '5%' });
            $('#acabados').css({ width: '90%' });
            $('#acabados').css({ 'padding-top': '35px' });

            var contador = 1;
            var contnuevo = 1;
            var u = 1;
            var i = 0;
            this.acaProdService.findAca(idProd).subscribe(data => {
                this.acaProdService.todos = data.body;
                $.each(this.acaProdService.todos, function(index, value) {
                    if (value['productosDormitorio']['id'] == idProd) {
                        imagen = value['imagen'];
                        72;

                        if (
                            idProd != 72 &&
                            idProd != 73 &&
                            idProd != 74 &&
                            idProd != 75 &&
                            idProd != 76 &&
                            idProd != 77 &&
                            idProd != 78 &&
                            idProd != 79 &&
                            idProd != 80 &&
                            idProd != 81 &&
                            idProd != 82 &&
                            idProd != 83 &&
                            idProd != 84 &&
                            idProd != 85 &&
                            idProd != 86 &&
                            idProd != 87 &&
                            idProd != 88 &&
                            idProd != 89 &&
                            idProd != 90 &&
                            idProd != 91 &&
                            idProd != 92
                        ) {
                            if (contador == 1) {
                                $('#acabados #imagenAcabadoPrincipal').css({ display: 'block' });
                                $('#acabados #imagenAcabadoPrincipalSin').css({ display: 'none' });
                                $('#acabados #imagenAcabadoPrincipal').append(
                                    '<img id="imagenAcabado" src="data:image/gif;base64,' +
                                        imagen +
                                        '" class="imagenAcabadoPrincipalImg"  width="650px" height="650px">'
                                );
                            }
                        } else {
                            if (contador == 1) {
                                $('#acabados #imagenAcabadoPrincipal').css({ display: 'none' });
                                $('#acabados #imagenAcabadoPrincipalSin').css({ display: 'block' });
                                $('#acabados #imagenAcabadoPrincipalSin').append(
                                    '<img style="margin-left:37%" id="imagenAcabado" src="data:image/gif;base64,' +
                                        imagen +
                                        '" class="imagenAcabadoPrincipalImgSin"  width="650px">'
                                );
                            }
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
                if (
                    idProd != 175 &&
                    idProd != 176 &&
                    idProd != 177 &&
                    idProd != 178 &&
                    idProd != 179 &&
                    idProd != 180 &&
                    idProd != 181 &&
                    idProd != 182 &&
                    idProd != 183 &&
                    idProd != 184 &&
                    idProd != 185 &&
                    idProd != 186 &&
                    idProd != 187 &&
                    idProd != 188 &&
                    idProd != 189 &&
                    idProd != 190 &&
                    idProd != 191 &&
                    idProd != 192 &&
                    idProd != 193 &&
                    idProd != 194 &&
                    idProd != 195 &&
                    idProd != 196 &&
                    idProd != 197 &&
                    idProd != 198 &&
                    idProd != 199 &&
                    idProd != 200 &&
                    idProd != 201 &&
                    idProd != 202 &&
                    idProd != 203 &&
                    idProd != 204 &&
                    idProd != 205 &&
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
                    idProd != 158 &&
                    idProd != 159 &&
                    idProd != 160 &&
                    idProd != 161 &&
                    idProd != 162 &&
                    idProd != 163 &&
                    idProd != 164 &&
                    idProd != 165 &&
                    idProd != 166 &&
                    idProd != 167 &&
                    idProd != 168 &&
                    idProd != 169 &&
                    idProd != 170 &&
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
                    idProd != 283 &&
                    idProd != 284 &&
                    idProd != 285 &&
                    idProd != 229 &&
                    idProd != 5
                ) {
                    var saberlo = JSON.parse(sessionStorage.getItem('seccionPrecios'));
                    if (saberlo != 'A') {
                        $('#datos1').append(
                            '<p style="width:95%"><strong>APOYO </strong><span style="float:right">&euro;</span><span id="precioApoyo" style="float:right"></span></p>'
                        );
                    } else {
                        $('#datos1').append(
                            '<p style="width:95%"><strong>APOYO </strong><span style="float:right">PP</span><span id="precioApoyo" style="float:right"></span></p>'
                        );
                    }

                    $('#datos1').append(
                        '<p style="width:100%"><input id="apoyoCalculadoraTexto" data-toggle="modal" data-target="#modalApoyo" height="30px" border="0" width="200px" style="margin-left:20px;text-align:center" readonly="readonly"/></p>'
                    );
                }
            });
            for (let h = 0; h < 14; h++) {
                $('#modalApoyo #apoyoModal' + h).empty();
            }
            if (
                idProd != 175 &&
                idProd != 176 &&
                idProd != 177 &&
                idProd != 178 &&
                idProd != 179 &&
                idProd != 180 &&
                idProd != 181 &&
                idProd != 182 &&
                idProd != 183 &&
                idProd != 184 &&
                idProd != 185 &&
                idProd != 186 &&
                idProd != 187 &&
                idProd != 188 &&
                idProd != 189 &&
                idProd != 190 &&
                idProd != 191 &&
                idProd != 192 &&
                idProd != 193 &&
                idProd != 194 &&
                idProd != 195 &&
                idProd != 196 &&
                idProd != 197 &&
                idProd != 198 &&
                idProd != 199 &&
                idProd != 200 &&
                idProd != 201 &&
                idProd != 202 &&
                idProd != 203 &&
                idProd != 204 &&
                idProd != 205 &&
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
                idProd != 158 &&
                idProd != 159 &&
                idProd != 160 &&
                idProd != 161 &&
                idProd != 162 &&
                idProd != 163 &&
                idProd != 164 &&
                idProd != 165 &&
                idProd != 166 &&
                idProd != 167 &&
                idProd != 168 &&
                idProd != 169 &&
                idProd != 170 &&
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
                idProd != 283 &&
                idProd != 284 &&
                idProd != 285
            ) {
                this.productosDormitorioService.categoria(2).subscribe(data => {
                    for (let w = 0; w < data.body['length']; w++) {
                        if (data.body[w]['nombre'] == 'Colgado') {
                            if (
                                idProd == 107 ||
                                idProd == 108 ||
                                idProd == 109 ||
                                idProd == 110 ||
                                idProd == 111 ||
                                idProd == 112 ||
                                idProd == 113 ||
                                idProd == 114 ||
                                idProd == 115 ||
                                idProd == 116 ||
                                idProd == 117 ||
                                idProd == 118 ||
                                idProd == 119 ||
                                idProd == 295 ||
                                idProd == 296 ||
                                idProd == 297 ||
                                idProd == 298 ||
                                idProd == 299 ||
                                idProd == 300 ||
                                idProd == 301 ||
                                idProd == 302 ||
                                idProd == 1 ||
                                idProd == 2 ||
                                idProd == 3 ||
                                idProd == 4 ||
                                idProd == 5 ||
                                idProd == 6 ||
                                idProd == 7 ||
                                idProd == 8 ||
                                idProd == 9 ||
                                idProd == 10 ||
                                idProd == 11 ||
                                idProd == 12 ||
                                idProd == 13 ||
                                idProd == 229
                            ) {
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
                        } else {
                            $('#modalApoyo #apoyoModal' + w).empty();
                            console.log(productoTocho);
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
                    }
                });
            }

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
                '<img id="imagenAcabadoPrincipal1" src"../../../content/images/blanco.jpg" height="60px" border="0" width="200px" style="margin-left:20px;"/>'
            );

            $('#nombreMesita').text(datos.productosDormitorio.nombre);
            $('#nombreMesita').attr('class', datos.productosDormitorio.id);
        });
        this.modulosBajos = undefined;
        this.aparadores = undefined;
        this.singulares = undefined;
    }
    public formularioSubirImagen() {}
    public cogidoUsb(id) {
        var precioPunto = parseFloat(this.precioPunto);
        var idProd = this.idDelProducto;
        if (id != 'no') {
            this.usbService
                .query({
                    size: 1000000
                })
                .subscribe(data => {
                    for (let x = 0; x < data.body.length; x++) {
                        if (data.body[x]['id'] == id) {
                            if (this.usbCogido != undefined) {
                                var precioDimen = parseFloat($('#precioDimension').text());
                                $('#precioDimension').text(precioDimen - this.usbCogido['precio'] * precioPunto);
                            }
                            this.usbCogido = data.body[x];
                            $('#precioUSB').text(data.body[x]['precio'] * precioPunto);
                            $('#precioUSB').css({ display: 'block' });
                            var precioDimen = parseFloat($('#precioDimension').text());
                            $('#precioDimension').text(precioDimen + data.body[x]['precio'] * precioPunto);
                        }
                    }
                });
        } else {
            var usb = this.usbCogido;
            if (usb != undefined) {
                var precioDimen = parseFloat($('#precioDimension').text());
                $('#precioDimension').text(precioDimen - usb['precio'] * precioPunto);
                $('#precioUSB').text('');
            }
            this.usbCogido = undefined;
        }
    }

    public escogidaLuz(id) {}
    public cargarComposicion() {}
    public borrarProdCalculadora() {
        $('#medidasEspecialesTexto').css({ display: 'none' });
        $('#medidasEspeciales').css({ display: 'none' });
        $('#anchosSelect1').val('');
        $('#medidasAncho').css({ display: 'none' });
        $('#medidasFondo').css({ display: 'none' });
        $('#medidasAlto').css({ display: 'none' });
        $('#especiales').css({ display: 'none' });
        $('#tenerLUZ').css({ display: 'none' });
        $('#productoCalculadora1 #precios1').empty();
        $('#euroCalculadora').attr('style');
        $('#euroCalculadora').css({ display: 'none' });
        $('#productoCalculadora1 #precioCalculado1').empty();
        $('#productoCalculadora1 #datos1').empty();
        $('#ppCalculadora').css({ display: 'none' });
        $('#nombreMesita').empty();
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

        this.modulosBajos = undefined;
        this.aparadores = undefined;
        this.singulares = undefined;

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
        $('#datos1').empty();
        $('#datos1').css({ display: 'block' });

        if (
            producto == 107 ||
            producto == 108 ||
            producto == 109 ||
            producto == 110 ||
            producto == 111 ||
            producto == 112 ||
            producto == 113 ||
            producto == 114 ||
            producto == 115 ||
            producto == 116 ||
            producto == 117 ||
            producto == 118 ||
            producto == 119 ||
            producto == 14 ||
            producto == 69 ||
            producto == 62 ||
            producto == 63 ||
            producto == 64 ||
            producto == 65 ||
            producto == 66 ||
            producto == 67 ||
            producto == 68
        ) {
            $('.productosColor' + producto).css({ 'background-color': '#dfdddc' });
        }
        if (
            producto == 72 ||
            producto == 73 ||
            producto == 74 ||
            producto == 75 ||
            producto == 76 ||
            producto == 77 ||
            producto == 78 ||
            producto == 79 ||
            producto == 80 ||
            producto == 81 ||
            producto == 82 ||
            producto == 83 ||
            producto == 84 ||
            producto == 85 ||
            producto == 86 ||
            producto == 87 ||
            producto == 88 ||
            producto == 89 ||
            producto == 90 ||
            producto == 91 ||
            producto == 92
        ) {
            $('.productosColorSin' + producto).css({ 'background-color': '#dfdddc' });
        }

        this.dimensionesProductoTipoService.findProducto(producto).subscribe(data => {
            this.dimensionesProductoTipoService.todos = data.body;
            this.todasDimensiones = data.body;
            var cont = 0;
            var dimensionesPrueba;
            dimensionesPrueba = data.body;
            var datos = dimensionesPrueba;
            $('#dimensiones').css({ display: 'block' });
            for (let i = 0; i < datos.length; i++) {
                if (producto == datos[i]['productosDormitorio']['id']) {
                    if (cont == 0 && datos[i]['mensaje'] != 'Medidas Especiales') {
                        $('#dimensionesText1').text(
                            datos[i]['mensaje'] +
                                ' | Ancho ' +
                                datos[i]['ancho'] +
                                ' - Alto ' +
                                datos[i]['alto'] +
                                ' - Fondo ' +
                                datos[i]['fondo'] +
                                ' | '
                        );
                        $('#precioDimenText1').text(datos[i]['precio'] + ' €');
                        $('.dimensionesColor1').css({ 'margin-left': '20%' });
                        $('.dimensionesColor1').css({ 'margin-bottom': '6%' });
                        $('#dimensiones').css({ width: '90%' });
                        $('#dimensiones').css({ display: 'block' });
                        $('#dimensiones').css({ 'background-color': 'white' });
                        $('#medidas').css({ display: 'block' });
                        $('.dimensionesColor1').css({ display: 'block' });
                        $('#dimensiones').css({ border: '1px solid #7AC8FE' });
                        $('#dimensiones').css({ 'margin-top': '50px' });
                        $('.dimensionesColor1').css({ float: 'left' });
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
                                datos[i]['fondo'] +
                                ' | '
                        );
                        $('#precioDimenText2').text(datos[i]['precio'] + ' €');
                        $('.dimensionesColor2').css({ display: 'block' });
                        $('.dimensionesColor2').css({ 'margin-left': '20%' });
                        $('.dimensionesColor1').css({ 'margin-bottom': '1%' });
                        $('.dimensionesColor2').css({ 'margin-bottom': '6%' });
                        $('#dimensiones').css({ width: '90%' });
                        $('#dimensiones').css({ display: 'block' });
                        $('#dimensiones').css({ 'background-color': 'white' });
                        $('#medidas').css({ display: 'block' });
                        $('#dimensiones').css({ border: '1px solid #7AC8FE' });
                        $('#dimensiones').css({ 'margin-top': '50px' });
                        $('.dimensionesColor2').css({ float: 'left' });
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
                                datos[i]['fondo'] +
                                ' | '
                        );
                        $('#precioDimenText3').text(datos[i]['precio'] + ' €');
                        $('.dimensionesColor3').css({ display: 'block' });
                        $('.dimensionesColor3').css({ 'margin-left': '20%' });
                        $('.dimensionesColor2').css({ 'margin-bottom': '1%' });
                        $('.dimensionesColor3').css({ 'margin-bottom': '6%' });
                        $('.dimensionesColor3').css({ float: 'left' });
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
                                datos[i]['fondo'] +
                                ' | '
                        );
                        $('#precioDimenText4').text(datos[i]['precio'] + ' €');
                        $('.dimensionesColor4').css({ display: 'block' });
                        $('.dimensionesColor4').css({ 'margin-left': '20%' });
                        $('.dimensionesColor3').css({ 'margin-bottom': '1%' });
                        $('.dimensionesColor4').css({ 'margin-bottom': '6%' });
                        $('.dimensionesColor4').css({ float: 'left' });
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
                                datos[i]['fondo'] +
                                ' | '
                        );
                        $('#precioDimenText5').text(datos[i]['precio'] + ' €');
                        $('.dimensionesColor5').css({ display: 'block' });
                        $('.dimensionesColor5').css({ 'margin-left': '20%' });
                        $('.dimensionesColor4').css({ 'margin-bottom': '1%' });
                        $('.dimensionesColor5').css({ 'margin-bottom': '6%' });
                        $('.dimensionesColor5').css({ float: 'left' });
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
                                datos[i]['fondo'] +
                                ' | '
                        );
                        $('#precioDimenText6').text(datos[i]['precio'] + ' €');
                        $('.dimensionesColor6').css({ display: 'block' });
                        $('.dimensionesColor5').css({ 'margin-bottom': '1%' });
                        $('.dimensionesColor4').css({ 'margin-bottom': '1%' });
                        $('.dimensionesColor6').css({ 'margin-bottom': '6%' });
                        $('.dimensionesColor6').css({ 'margin-left': '20%' });
                        $('.dimensionesColor6').css({ float: 'left' });
                        $('.dimensionesColor6').append(
                            '<p class="dimensionesId' +
                                (cont + 1) +
                                '" id="' +
                                datos[i]['id'] +
                                '" style="position:absolute;z-index:1;display_none"></p>'
                        );
                    }
                    if (cont == 6 && datos[i]['mensaje'] != 'Medidas Especiales') {
                        $('#dimensionesText7').text(
                            datos[i]['mensaje'] +
                                ' | Ancho ' +
                                datos[i]['ancho'] +
                                ' - Alto ' +
                                datos[i]['alto'] +
                                ' - Fondo ' +
                                datos[i]['fondo'] +
                                ' | '
                        );
                        $('#precioDimenText7').text(datos[i]['precio'] + ' €');
                        $('.dimensionesColor7').css({ display: 'block' });
                        $('.dimensionesColor7').css({ 'margin-left': '20%' });
                        $('.dimensionesColor6').css({ 'margin-bottom': '1%' });
                        $('.dimensionesColor7').css({ 'margin-bottom': '6%' });
                        $('.dimensionesColor7').css({ float: 'left' });
                        $('.dimensionesColor7').append(
                            '<p class="dimensionesId' +
                                (cont + 1) +
                                '" id="' +
                                datos[i]['id'] +
                                '" style="position:absolute;z-index:1;display_none"></p>'
                        );
                    }
                    if (cont == 7 && datos[i]['mensaje'] != 'Medidas Especiales') {
                        $('#dimensionesText8').text(
                            datos[i]['mensaje'] +
                                ' | Ancho ' +
                                datos[i]['ancho'] +
                                ' - Alto ' +
                                datos[i]['alto'] +
                                ' - Fondo ' +
                                datos[i]['fondo'] +
                                ' | '
                        );
                        $('#precioDimenText8').text(datos[i]['precio'] + ' €');
                        $('.dimensionesColor8').css({ display: 'block' });
                        $('.dimensionesColor8').css({ 'margin-left': '20%' });
                        $('.dimensionesColor7').css({ 'margin-bottom': '1%' });
                        $('.dimensionesColor8').css({ 'margin-bottom': '6%' });
                        $('.dimensionesColor8').css({ float: 'left' });
                        $('.dimensionesColor8').append(
                            '<p class="dimensionesId' +
                                (cont + 1) +
                                '" id="' +
                                datos[i]['id'] +
                                '" style="position:absolute;z-index:1;display_none"></p>'
                        );
                    }
                    if (cont == 8 && datos[i]['mensaje'] != 'Medidas Especiales') {
                        $('#dimensionesText9').text(
                            datos[i]['mensaje'] +
                                ' | Ancho ' +
                                datos[i]['ancho'] +
                                ' - Alto ' +
                                datos[i]['alto'] +
                                ' - Fondo ' +
                                datos[i]['fondo'] +
                                ' | '
                        );
                        $('#precioDimenText9').text(datos[i]['precio'] + ' €');
                        $('.dimensionesColor9').css({ display: 'block' });
                        $('.dimensionesColor9').css({ 'margin-left': '20%' });
                        $('.dimensionesColor8').css({ 'margin-bottom': '1%' });
                        $('.dimensionesColor9').css({ 'margin-bottom': '6%' });
                        $('.dimensionesColor9').css({ float: 'left' });
                        $('.dimensionesColor9').append(
                            '<p class="dimensionesId' +
                                (cont + 1) +
                                '" id="' +
                                datos[i]['id'] +
                                '" style="position:absolute;z-index:1;display_none"></p>'
                        );
                    }
                    if (cont == 9 && datos[i]['mensaje'] != 'Medidas Especiales') {
                        $('#dimensionesText10').text(
                            datos[i]['mensaje'] +
                                ' | Ancho ' +
                                datos[i]['ancho'] +
                                ' - Alto ' +
                                datos[i]['alto'] +
                                ' - Fondo ' +
                                datos[i]['fondo'] +
                                ' | '
                        );
                        $('#precioDimenText10').text(datos[i]['precio'] + ' €');
                        $('.dimensionesColor10').css({ display: 'block' });
                        $('.dimensionesColor10').css({ 'margin-left': '20%' });
                        $('.dimensionesColor9').css({ 'margin-bottom': '1%' });
                        $('.dimensionesColor10').css({ 'margin-bottom': '6%' });
                        $('.dimensionesColor10').css({ float: 'left' });
                        $('.dimensionesColor10').append(
                            '<p class="dimensionesId' +
                                (cont + 1) +
                                '" id="' +
                                datos[i]['id'] +
                                '" style="position:absolute;z-index:1;display_none"></p>'
                        );
                    }
                    if (cont == 10 && datos[i]['mensaje'] != 'Medidas Especiales') {
                        $('#dimensionesText11').text(
                            datos[i]['mensaje'] +
                                ' | Ancho ' +
                                datos[i]['ancho'] +
                                ' - Alto ' +
                                datos[i]['alto'] +
                                ' - Fondo ' +
                                datos[i]['fondo'] +
                                ' | '
                        );
                        $('#precioDimenText11').text(datos[i]['precio'] + ' €');
                        $('.dimensionesColor11').css({ display: 'block' });
                        $('.dimensionesColor11').css({ 'margin-left': '20%' });
                        $('.dimensionesColor10').css({ 'margin-bottom': '1%' });
                        $('.dimensionesColor11').css({ 'margin-bottom': '6%' });
                        $('.dimensionesColor11').css({ float: 'left' });
                        $('.dimensionesColor11').append(
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
        $('#nombreMesita').text(productoNombre);
        $('#nombreMesita').attr('class', producto);
    }
    public cogidaLuz(id) {
        var precioPunto = parseFloat(this.precioPunto);
        var iva = this.iva;
        if (id == 'Si') {
            var idProd = this.idDelProducto;
            $('#precioDeLaLuz').css({ display: 'block' });
            var luz = this.estaEsLaLUZ;
            if (luz != undefined) {
                var precioLuz = luz['precio'] * precioPunto;
                var precioDimen = parseFloat($('#precioDimension').text());
                $('#precioDimension').text(precioDimen - precioLuz);
            }
            this.estaEsLaLUZ = undefined;
            this.iluminacionService.findProd(idProd).subscribe(data => {
                console.log(data.body);
                if (data.body.length != 0) {
                    $('#tenerLUZ').css({ display: 'block' });

                    $('#datos1').append('<p style="display:none" id="iluminacion1" class="' + data.body[0]['id'] + '"></p>');
                    this.estaEsLaLUZ = data.body[0];
                    var precioDimen = parseFloat($('#precioDimension').text());
                    var precioLuz = data.body[0]['precio'] * precioPunto;
                    $('#precioDeLaLuz').text(precioLuz);
                    $('#precioDimension').text(precioDimen + precioLuz);
                }
            });
        } else {
            $('#precioDeLaLuz').css({ display: 'none' });
            var luz = this.estaEsLaLUZ;
            if (luz != undefined) {
                var precioLuz = luz['precio'] * precioPunto;
                var precioDimen = parseFloat($('#precioDimension').text());
                $('#precioDimension').text(precioDimen - precioLuz);
            }
            this.estaEsLaLUZ = undefined;
        }
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
        $('#medidasAncho').css({ display: 'none' });
        $('#medidasFondo').css({ display: 'none' });
        $('#medidasAlto').css({ display: 'none' });
        var precioTienda = this.precioTienda;
        this.interiores = JSON.parse(sessionStorage.getItem('interiores'));
        var dimensiones = this.dimensionesProductoTipoService.todos;
        for (let U = 1; U <= 15; U++) {
            $('#aca1' + U).empty();
        }
        $('#terminarConfiguracion').css({ display: 'none' });
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
        var precioPunto = this.precioPunto[0];
        $('#acaba1').empty();
        $('#acaba2').empty();
        var iva = this.iva;
        $('#precios1').empty();
        $('#iluminacion').removeAttr('style');
        $('#iluminacion').attr('style');
        $('#iluminacion').css({ display: 'none' });
        $('#precioCalculado1').empty();
        $('#dimensionesInput1').css({ 'background-color': 'white' });
        $('#dimensionesInput5').css({ 'background-color': 'white' });
        $('#dimensionesInput6').css({ 'background-color': 'white' });
        $('#dimensionesInput2').css({ 'background-color': 'white' });
        $('#dimensionesInput3').css({ 'background-color': 'white' });
        $('#dimensionesInput4').css({ 'background-color': 'white' });
        $('#dimensionesInput7').css({ 'background-color': 'white' });
        $('#dimensionesInput8').css({ 'background-color': 'white' });
        $('#dimensionesInput9').css({ 'background-color': 'white' });
        $('#dimensionesInput10').css({ 'background-color': 'white' });
        $('#dimensionesInput11').css({ 'background-color': 'white' });
        $('#dimensionesInput' + id).css({ 'background-color': '#DFDDDC' });
        idProd = $('#nombreMesita').attr('class');
        var idDimenTipo = $('.dimensionesId' + id).attr('id');
        $('#total').text('0');
        var hola = $('.dimensionesColor' + id + ' #imagenDimensiones').attr('class');
        console.log(hola);
        var datos = [];
        console.log(dimensiones);
        var acaSi = 0;
        var acabados = [];
        var imagen;
        var idProd;
        datos = dimensiones;
        for (let i = 0; i <= datos.length - 1; i++) {
            if (datos[i]['id'] == idDimenTipo) {
                var text = $('#nombreMesita').text();
                $('#nombreMesita').text(datos[i]['productosDormitorio']['nombre']);

                var total = $('#total').text();
                var totalfloat = parseFloat(total);
                var precio = parseFloat(datos[i]['precio']);
                precio = precio * precioPunto;
                precio = Math.round(precio * 100) / 100;
                totalfloat = totalfloat + precio;
                if (iva == 1) {
                    var todasCuenta = totalfloat * 1.21;
                } else {
                    var todasCuenta = totalfloat;
                }
                var totalfloat = 0;
                this.precioDimension = todasCuenta;
                totalfloat = parseFloat(todasCuenta.toFixed(2));

                $('#total').text(totalfloat);
                $('#precioDimension').text(totalfloat);
                $('#datos1 #ancho1').text(datos[i]['ancho']);
                $('#datos1 #ancho1').attr(datos[i]['id']);
                $('#datos1 #fondoDatosDimen').text(datos[i]['fondo']);
                acaSi = 0;
            }
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
                                '<form><select id="anchosSelect1" style="margin-left: 2%;width: 30%;text-align:center"><option></option></select></form'
                            );
                            for (let j = 0; j < dimen.length; j++) {
                                $('#anchosSelect1').append('<option value="' + dimen[j]['id'] + '">' + dimen[j]['ancho'] + '</option>');
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
                                '<form><select id="anchosSelect1" style="margin-left: 2%;width: 30%;text-align:center"><option></option></select></form'
                            );
                            for (let j = 0; j < dimen.length; j++) {
                                $('#anchosSelect1').append('<option value="' + dimen[j]['id'] + '">' + dimen[j]['ancho'] + '</option>');
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
            var ancho = $('#anchosSelect1').val();
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
            var ancho = $('#anchosSelect1').val();
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
                /**
                if (
                    idProd == '72' ||
                    idProd == '73' ||
                    idProd == '74' ||
                    idProd == '75' ||
                    idProd == '76' ||
                    idProd == '77' ||
                    idProd == '78' ||
                    idProd == '79' ||
                    idProd == '80' ||
                    idProd == '81' ||
                    idProd == '82' ||
                    idProd == '83' ||
                    idProd == '84' ||
                    idProd == '85' ||
                    idProd == '86' ||
                    idProd == '87' ||
                    idProd == '88' ||
                    idProd == '89' ||
                    idProd == '90' ||
                    idProd == '91' ||
                    idProd == '92'
                ) {
                    if (id1 == 1) {
                        $('#tapa').remove();
                        if (nombre == 'sg1' || nombre == 'sg2' || nombre == 'sg3') {
                            $('#acabados #imagenAcabadoPrincipalSin').append(
                                '<img id="tapa" class="' +
                                    nombreAcabado +
                                    'sin" width="400px" height="692.75px" src="../../../content/images/' +
                                    nombre +
                                    ' apertura izquierda/1/' +
                                    nombre +
                                    '_1_' +
                                    nombreAcabado +
                                    '_optimized.png">'
                            );
                        } else {
                            $('#acabados #imagenAcabadoPrincipalSin').append(
                                '<img id="tapa" class="' +
                                    nombreAcabado +
                                    'sin" width="400px" height="692.75px" src="../../../content/images/' +
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
                        if (nombre == 'sg1' || nombre == 'sg2' || nombre == 'sg3') {
                            $('#acabados #imagenAcabadoPrincipalSin').append(
                                '<img id="tapa" class="' +
                                    nombreAcabado +
                                    'sin" width="400px" height="692.75px" src="../../../content/images/' +
                                    nombre +
                                    ' apertura izquierda/2/' +
                                    nombre +
                                    '_2_' +
                                    nombreAcabado +
                                    '_optimized.png">'
                            );
                        } else {
                            if (nombreAcabado == 'bronce' || nombreAcabado == 'transparente') {
                                var nombreMayus = nombreAcabado.toUpperCase();
                                var color = $('#val1Dato').text();
                                color = color.toLowerCase();
                                if (nombre == 'sg3') {
                                    nombre = 'sg3 apertura izquierda';
                                    var nombre1 = 'sg3';
                                } else {
                                    if (nombre == 'sg2') {
                                        nombre = 'sg2 apertura izquierda';
                                        var nombre1 = 'sg2';
                                    } else {
                                        var nombre1 = nombre;
                                    }
                                }
                                $('#acabados #imagenAcabadoPrincipalSin').append(
                                    '<img id="casco" class="' +
                                        nombreAcabado +
                                        'sin" width="400px" height="692.75px" src="../../../content/images/' +
                                        nombre +
                                        '/' +
                                        id1 +
                                        ' ' +
                                        nombreMayus +
                                        '/' +
                                        nombre1 +
                                        '_' +
                                        id1 +
                                        '_' +
                                        color +
                                        '_' +
                                        nombreAcabado +
                                        '_optimized.png">'
                                );
                            } else {
                                if (nombre == 'sg3') {
                                    nombre = 'sg3 apertura izquierda';
                                    var nombre1 = 'sg3';
                                } else {
                                    if (nombre == 'sg2') {
                                        nombre = 'sg2 apertura izquierda';
                                        var nombre1 = 'sg2';
                                    } else {
                                        var nombre1 = nombre;
                                    }
                                }
                                $('#acabados #imagenAcabadoPrincipalSin').append(
                                    '<img id="casco" class="' +
                                        nombreAcabado +
                                        'sin" width="400px" height="692.75px" src="../../../content/images/' +
                                        nombre +
                                        '/' +
                                        id1 +
                                        '/' +
                                        nombre1 +
                                        '_' +
                                        id1 +
                                        '_' +
                                        nombreAcabado +
                                        '_optimized.png">'
                                );
                            }
                        }
                    }
                    if (id1 != 2 && id1 != 1) {
                        if (nombreAcabado == 'bronce' || nombreAcabado == 'transparente') {
                            var nombreMayus = nombreAcabado.toUpperCase();
                            var color = $('#val1Dato').text();
                            color = color.toLowerCase();
                            if (nombre == 'sg3') {
                                nombre = 'sg3 apertura izquierda';
                                var nombre1 = 'sg3';
                            } else {
                                if (nombre == 'sg2') {
                                    nombre = 'sg2 apertura izquierda';
                                    var nombre1 = 'sg2';
                                } else {
                                    var nombre1 = nombre;
                                }
                            }
                            $('#acabados #imagenAcabadoPrincipalSin').append(
                                '<img id="casco" class="' +
                                    nombreAcabado +
                                    'sin" width="400px" height="692.75px" src="../../../content/images/' +
                                    nombre +
                                    '/' +
                                    id1 +
                                    ' ' +
                                    nombreMayus +
                                    '/' +
                                    nombre1 +
                                    '_' +
                                    id1 +
                                    '_' +
                                    color +
                                    '_' +
                                    nombreAcabado +
                                    '_optimized.png">'
                            );
                        } else {
                            if (nombre == 'sg3') {
                                nombre = 'sg3 apertura izquierda';
                                var nombre1 = 'sg3';
                            } else {
                                if (nombre == 'sg2') {
                                    nombre = 'sg2 apertura izquierda';
                                    var nombre1 = 'sg2';
                                } else {
                                    var nombre1 = nombre;
                                }
                            }
                            $('#acabados #imagenAcabadoPrincipalSin').append(
                                '<img id="casco" class="' +
                                    nombreAcabado +
                                    'sin" width="400px" height="692.75px" src="../../../content/images/' +
                                    nombre +
                                    '/' +
                                    id1 +
                                    '/' +
                                    nombre1 +
                                    '_' +
                                    id1 +
                                    '_' +
                                    nombreAcabado +
                                    '_optimized.png">'
                            );
                        }
                    }
                } else {
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
                }
                **/
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
            if ($('#val' + m + 'Dato').text() != '') {
                contadorApoyo++;
            }
        }
        var datos = [];

        for (let j = 1; j <= 5; j++) {
            $('.apoyoCogido' + j).css({ 'background-color': 'white' });
        }
        var apoyoBueno = $('#datos1 #nombreApoyo').text();
        var idProd = '';
        idProd = $('#nombreMesita').attr('class');

        if (
            idProd != '175' &&
            idProd != '176' &&
            idProd != '177' &&
            idProd != '178' &&
            idProd != '179' &&
            idProd != '180' &&
            idProd != '181' &&
            idProd != '182' &&
            idProd != '183' &&
            idProd != '184' &&
            idProd != '185' &&
            idProd != '186' &&
            idProd != '187' &&
            idProd != '188' &&
            idProd != '189' &&
            idProd != '190' &&
            idProd != '191' &&
            idProd != '192' &&
            idProd != '193' &&
            idProd != '194' &&
            idProd != '195' &&
            idProd != '196' &&
            idProd != '197' &&
            idProd != '198' &&
            idProd != '199' &&
            idProd != '200' &&
            idProd != '201' &&
            idProd != '202' &&
            idProd != '203' &&
            idProd != '204' &&
            idProd != '205' &&
            idProd != '206' &&
            idProd != '207' &&
            idProd != '208' &&
            idProd != '209' &&
            idProd != '210' &&
            idProd != '211' &&
            idProd != '213' &&
            idProd != '214' &&
            idProd != '215' &&
            idProd != '216' &&
            idProd != '217' &&
            idProd != '218' &&
            idProd != '219' &&
            idProd != '220' &&
            idProd != '221' &&
            idProd != '222' &&
            idProd != '223' &&
            idProd != '158' &&
            idProd != '159' &&
            idProd != '160' &&
            idProd != '161' &&
            idProd != '162' &&
            idProd != '163' &&
            idProd != '164' &&
            idProd != '165' &&
            idProd != '166' &&
            idProd != '167' &&
            idProd != '168' &&
            idProd != '169' &&
            idProd != '170' &&
            idProd != '246' &&
            idProd != '247' &&
            idProd != '248' &&
            idProd != '249' &&
            idProd != '250' &&
            idProd != '251' &&
            idProd != '252' &&
            idProd != '253' &&
            idProd != '254' &&
            idProd != '255' &&
            idProd != '256' &&
            idProd != '257' &&
            idProd != '258' &&
            idProd != '259' &&
            idProd != '260' &&
            idProd != '261' &&
            idProd != '262' &&
            idProd != '263' &&
            idProd != '264' &&
            idProd != '265' &&
            idProd != '266' &&
            idProd != '267' &&
            idProd != '268' &&
            idProd != '269' &&
            idProd != '270' &&
            idProd != '271' &&
            idProd != '272' &&
            idProd != '273' &&
            idProd != '274' &&
            idProd != '275' &&
            idProd != '276' &&
            idProd != '277' &&
            idProd != '278' &&
            idProd != '279' &&
            idProd != '280' &&
            idProd != '281' &&
            idProd != '282' &&
            idProd != '283' &&
            idProd != '284' &&
            idProd != '285'
        ) {
            if (contadorApoyo == this.acaProdService.todos.length && apoyoBueno != '') {
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
        } else {
            if (contadorApoyo == this.acaProdService.todos.length) {
                var iluminacion = this.iluminacion;
                var texto = 0;
                texto = 1;

                if (texto == 1) {
                    $('#botonCalculadora').removeAttr('class');
                }
                $('#terminarConfiguracion').removeAttr('style');
                $('#terminarConfiguracion').attr('style');
                $('#terminarConfiguracion').css({ float: 'left' });
                $('#terminarConfiguracion').css({ width: '100%' });
            }
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
        var precioPunto = this.precioPunto;
        var todosLosPrecios = this.precioTiendaProductosService.apoyo;
        var precioDimension = this.precioDimension;
        var dimension = [];
        var datos = [];
        var datosApoyo;
        var valoresAca = [];
        var cont = 1;
        var contadorApoyo = 0;
        var catalogoCome = this.catalogoCome;
        var fondo;
        var iva = this.iva;
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
            if (parseFloat(h) <= 100.5) {
                if (
                    parseFloat(idProd) == 2 ||
                    parseFloat(idProd) == 3 ||
                    parseFloat(idProd) == 4 ||
                    parseFloat(idProd) == 5 ||
                    parseFloat(idProd) == 6 ||
                    parseFloat(idProd) == 7 ||
                    parseFloat(idProd) == 8 ||
                    parseFloat(idProd) == 9 ||
                    parseFloat(idProd) == 10 ||
                    parseFloat(idProd) == 11 ||
                    parseFloat(idProd) == 12 ||
                    parseFloat(idProd) == 13 ||
                    parseFloat(idProd) == 295 ||
                    parseFloat(idProd) == 296 ||
                    parseFloat(idProd) == 297 ||
                    parseFloat(idProd) == 298 ||
                    parseFloat(idProd) == 299 ||
                    parseFloat(idProd) == 300 ||
                    parseFloat(idProd) == 301 ||
                    parseFloat(idProd) == 107 ||
                    parseFloat(idProd) == 108 ||
                    parseFloat(idProd) == 109 ||
                    parseFloat(idProd) == 110 ||
                    parseFloat(idProd) == 111 ||
                    parseFloat(idProd) == 112 ||
                    parseFloat(idProd) == 113 ||
                    parseFloat(idProd) == 114 ||
                    parseFloat(idProd) == 115 ||
                    parseFloat(idProd) == 116 ||
                    parseFloat(idProd) == 117 ||
                    parseFloat(idProd) == 118 ||
                    parseFloat(idProd) == 119
                ) {
                    var hbueno = parseFloat(h) - 5.5;
                } else {
                    var hbueno = parseFloat(h) - 5;
                }
            } else {
                var hbueno = parseFloat(h) - 5;
            }
        }
        if (idApoyo == 17) {
            if (parseFloat(h) <= 100.5) {
                if (
                    parseFloat(idProd) == 2 ||
                    parseFloat(idProd) == 3 ||
                    parseFloat(idProd) == 4 ||
                    parseFloat(idProd) == 5 ||
                    parseFloat(idProd) == 6 ||
                    parseFloat(idProd) == 7 ||
                    parseFloat(idProd) == 8 ||
                    parseFloat(idProd) == 9 ||
                    parseFloat(idProd) == 10 ||
                    parseFloat(idProd) == 11 ||
                    parseFloat(idProd) == 12 ||
                    parseFloat(idProd) == 13 ||
                    parseFloat(idProd) == 295 ||
                    parseFloat(idProd) == 296 ||
                    parseFloat(idProd) == 297 ||
                    parseFloat(idProd) == 298 ||
                    parseFloat(idProd) == 299 ||
                    parseFloat(idProd) == 300 ||
                    parseFloat(idProd) == 301 ||
                    parseFloat(idProd) == 107 ||
                    parseFloat(idProd) == 108 ||
                    parseFloat(idProd) == 109 ||
                    parseFloat(idProd) == 110 ||
                    parseFloat(idProd) == 111 ||
                    parseFloat(idProd) == 112 ||
                    parseFloat(idProd) == 113 ||
                    parseFloat(idProd) == 114 ||
                    parseFloat(idProd) == 115 ||
                    parseFloat(idProd) == 116 ||
                    parseFloat(idProd) == 117 ||
                    parseFloat(idProd) == 118 ||
                    parseFloat(idProd) == 119
                ) {
                    var hbueno = parseFloat(h) - 13;
                } else {
                    var hbueno = parseFloat(h) - 12.5;
                }
            } else {
                var hbueno = parseFloat(h) - 12.5;
            }
        }
        var apoyoDentro = 0;
        this.tiposApoyoService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                datos = data['body'];
                $.each(datos, function(index, value) {
                    if (idApoyo == 15 || idApoyo == 16 || idApoyo == 376) {
                        if (idApoyo == 16) {
                            if (h < 175) {
                                if (idApoyo == value['productoApoyo']['id'] && value['ancho'] < 175) {
                                    var precio = parseFloat(value['precio']);

                                    precio = precio * precioPunto;
                                    precio = Math.round(precio * 100) / 100;
                                    if (iva == 1) {
                                        var precio = precio * 1.21;
                                    } else {
                                        var precio = precio;
                                    }
                                    var totalfloat = parseFloat(precioDimension);
                                    totalfloat = totalfloat + precio;
                                    $('#precioDimension').text(totalfloat.toFixed(2));
                                    $('#datos1').append(
                                        '<p id="apoyoDatosTexto" style="width:100%;display:none"><span id="nombreApoyo">Apoyo : ' +
                                            value['productoApoyo']['nombre'] +
                                            '</span><span style="float:right" id="apoyo1" class="' +
                                            value['id'] +
                                            '">+' +
                                            precio.toFixed(2) +
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
                                if (idApoyo == value['productoApoyo']['id'] && value['ancho'] >= 175) {
                                    var precio = parseFloat(value['precio']);

                                    precio = precio * precioPunto;
                                    precio = Math.round(precio * 100) / 100;
                                    if (iva == 1) {
                                        var precio = precio * 1.21;
                                    } else {
                                        var precio = precio;
                                    }
                                    var totalfloat = parseFloat(precioDimension);
                                    totalfloat = totalfloat + precio;
                                    $('#precioDimension').text(totalfloat.toFixed(2));
                                    $('#datos1').append(
                                        '<p id="apoyoDatosTexto" style="width:100%;display:none"><span id="nombreApoyo">Apoyo : ' +
                                            value['productoApoyo']['nombre'] +
                                            '</span><span style="float:right" id="apoyo1" class="' +
                                            value['id'] +
                                            '">+' +
                                            precio.toFixed(2) +
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

                        if (idApoyo == 376) {
                            if (h < 175) {
                                if (idApoyo == value['productoApoyo']['id'] && value['ancho'] < 175) {
                                    var precio = parseFloat(value['precio']);

                                    precio = precio * precioPunto;
                                    precio = Math.round(precio * 100) / 100;
                                    if (iva == 1) {
                                        var precio = precio * 1.21;
                                    } else {
                                        var precio = precio;
                                    }
                                    var totalfloat = parseFloat(precioDimension);
                                    totalfloat = totalfloat + precio;
                                    $('#precioDimension').text(totalfloat.toFixed(2));
                                    $('#datos1').append(
                                        '<p id="apoyoDatosTexto" style="width:100%;display:none"><span id="nombreApoyo">Apoyo : ' +
                                            value['productoApoyo']['nombre'] +
                                            '</span><span style="float:right" id="apoyo1" class="' +
                                            value['id'] +
                                            '">+' +
                                            precio.toFixed(2) +
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
                                if (idApoyo == value['productoApoyo']['id'] && value['ancho'] >= 175) {
                                    var precio = parseFloat(value['precio']);
                                    precio = precio * precioPunto;
                                    precio = Math.round(precio * 100) / 100;
                                    if (iva == 1) {
                                        var precio = precio * 1.21;
                                    } else {
                                        var precio = precio;
                                    }
                                    var totalfloat = parseFloat(precioDimension);
                                    totalfloat = totalfloat + precio;
                                    $('#precioDimension').text(totalfloat.toFixed(2));
                                    $('#datos1').append(
                                        '<p id="apoyoDatosTexto" style="width:100%;display:none"><span id="nombreApoyo">Apoyo : ' +
                                            value['productoApoyo']['nombre'] +
                                            '</span><span style="float:right" id="apoyo1" class="' +
                                            value['id'] +
                                            '">+' +
                                            precio.toFixed(2) +
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

                                    precio = precio * precioPunto;
                                    precio = Math.round(precio * 100) / 100;
                                    if (iva == 1) {
                                        var precio = precio * 1.21;
                                    } else {
                                        var precio = precio;
                                    }
                                    var totalfloat = parseFloat(precioDimension);
                                    totalfloat = totalfloat + precio;
                                    $('#precioDimension').text(totalfloat.toFixed(2));
                                    $('#datos1').append(
                                        '<p id="apoyoDatosTexto" style="width:100%;display:none"><span id="nombreApoyo">Apoyo : ' +
                                            value['productoApoyo']['nombre'] +
                                            '</span><span style="float:right" id="apoyo1" class="' +
                                            value['id'] +
                                            '">+' +
                                            precio.toFixed(2) +
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

                                    precio = precio * precioPunto;
                                    precio = Math.round(precio * 100) / 100;
                                    if (iva == 1) {
                                        var precio = precio * 1.21;
                                    } else {
                                        var precio = precio;
                                    }
                                    var totalfloat = parseFloat(precioDimension);
                                    totalfloat = totalfloat + precio;
                                    $('#precioDimension').text(totalfloat.toFixed(2));
                                    $('#datos1').append(
                                        '<p id="apoyoDatosTexto" style="width:100%;display:none"><span id="nombreApoyo">Apoyo : ' +
                                            value['productoApoyo']['nombre'] +
                                            '</span><span style="float:right" id="apoyo1" class="' +
                                            value['id'] +
                                            '">+' +
                                            precio.toFixed(2) +
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
                            if (idApoyo == value['productoApoyo']['id'] && value['ancho'] == hbueno) {
                                var precio = parseFloat(value['precio']);

                                precio = precio * precioPunto;
                                precio = Math.round(precio * 100) / 100;
                                if (iva == 1) {
                                    var precio = precio * 1.21;
                                } else {
                                    var precio = precio;
                                }
                                var totalfloat = parseFloat(precioDimension);
                                totalfloat = totalfloat + precio;
                                $('#precioDimension').text(totalfloat.toFixed(2));
                                $('#datos1').append(
                                    '<p id="apoyoDatosTexto" style="width:100%;display:none"><span id="nombreApoyo">Apoyo : ' +
                                        value['productoApoyo']['nombre'] +
                                        '</span><span style="float:right" id="apoyo1" class="' +
                                        value['id'] +
                                        '">+' +
                                        precio.toFixed(2) +
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
                        if (idApoyo == 32) {
                            if (idApoyo == value['productoApoyo']['id']) {
                                $('#datos1 #apoyoCalculadoraTexto').val(value['productoApoyo']['nombre']);
                                $('#datos1 #precioApoyo').text('+ 0 ');

                                $('#precioDimension').text(precioDimension);
                                $('#botonApoyoNuevo #nombreApoyoCajon').remove();
                                $('#botonApoyoNuevo').append(
                                    '<p id="nombreApoyoCajon" style="color:black;margin-left: 180px;margin-top: -42px;position:absolute" >' +
                                        value['productoApoyo']['nombre'] +
                                        '</p>'
                                );
                                var totalfloat = parseFloat(total);
                                $('#total').text(totalfloat);
                            }
                        }

                        if (idApoyo == 212) {
                            if (idApoyo == value['productoApoyo']['id']) {
                                if (
                                    parseFloat(idProd) == 295 ||
                                    parseFloat(idProd) == 296 ||
                                    parseFloat(idProd) == 297 ||
                                    parseFloat(idProd) == 298 ||
                                    parseFloat(idProd) == 299 ||
                                    parseFloat(idProd) == 300 ||
                                    parseFloat(idProd) == 301 ||
                                    parseFloat(idProd) == 107 ||
                                    parseFloat(idProd) == 108 ||
                                    parseFloat(idProd) == 109 ||
                                    parseFloat(idProd) == 110 ||
                                    parseFloat(idProd) == 111 ||
                                    parseFloat(idProd) == 112 ||
                                    parseFloat(idProd) == 113 ||
                                    parseFloat(idProd) == 114 ||
                                    parseFloat(idProd) == 115 ||
                                    parseFloat(idProd) == 116 ||
                                    parseFloat(idProd) == 117 ||
                                    parseFloat(idProd) == 118 ||
                                    parseFloat(idProd) == 119
                                ) {
                                    if (value['id'] == 48) {
                                        var precio = parseFloat(value['precio']);

                                        precio = precio * precioPunto;
                                        precio = Math.round(precio * 100) / 100;
                                        if (iva == 1) {
                                            var precio = precio * 1.21;
                                        } else {
                                            var precio = precio;
                                        }
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
                                                precio.toFixed(2) +
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
                                        apoyoDentro = 1;
                                    }
                                } else {
                                    if (value['id'] == 54) {
                                        var precio = parseFloat(value['precio']);

                                        precio = precio * precioPunto;
                                        precio = Math.round(precio * 100) / 100;
                                        if (iva == 1) {
                                            var precio = precio * 1.21;
                                        } else {
                                            var precio = precio;
                                        }
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
                                                precio.toFixed(2) +
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
                                        apoyoDentro = 1;
                                    }
                                }
                            }
                        }
                        if (idApoyo == 17) {
                            if (idApoyo == value['productoApoyo']['id'] && value['ancho'] == hbueno) {
                                var precio = parseFloat(value['precio']);
                                precio = precio * precioPunto;
                                precio = Math.round(precio * 100) / 100;
                                if (iva == 1) {
                                    var precio = precio * 1.21;
                                } else {
                                    var precio = precio;
                                }
                                var totalfloat = parseFloat(precioDimension);
                                totalfloat = totalfloat + precio;
                                $('#precioDimension').text(totalfloat.toFixed(2));
                                $('#datos1').append(
                                    '<p id="apoyoDatosTexto" style="width:100%;display:none"><span id="nombreApoyo">Apoyo : ' +
                                        value['productoApoyo']['nombre'] +
                                        '</span><span style="float:right" id="apoyo1" class="' +
                                        value['id'] +
                                        '">+' +
                                        precio.toFixed(2) +
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
            $('#botonCalculadora').removeAttr('class');
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
        $('#botonCalculadora').removeAttr('class');
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
        var todosAcabados = this.todosAcabados;
        var acabados1 = this.acabados1;
        var acabados = acabados1;
        var usb = this.usbCogido;
        console.log(usb);
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

        $('#anchosSelect1').val('');
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
            const todoSumadoPrecio = $('#precioDimension').text();
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

            if (usb != undefined) {
                usb['productosDormitorio']['imagen'] = '';
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
                        value['acabado' + w] = aca[w];
                        value['acabado' + w]['imagenFondo'] = '';
                    }
                    if (value['mensaje'] == 'Medidas Especiales') {
                        value['ancho'] = ancho;
                        value['alto'] = alto;
                        value['fondo'] = fondo;
                        value['precio'] = precio;
                    }
                    value['apoyo'] = apoyoBueno[1];
                    value['iluminacion'] = iluBuena[1];
                    if (usb != undefined) {
                        value['usb'] = usb;
                    }
                    prod[1] = value;
                    prod[1]['todoSumadoPrecio'] = todoSumadoPrecio;
                    prod[1]['imagen'] = '';
                    prod[1]['productosDormitorio']['imagen'] = '';
                    if (prod[1]['apoyo'] != undefined) {
                        prod[1]['apoyo']['imagen'] = '';
                    }
                    console.log(prod);
                    sessionStorage.setItem('prod' + contadorDimen, JSON.stringify(prod));
                    contadorDimen++;
                }
            });
        }
        this.usb = undefined;
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
        this.posicionEstanteria = 0;
        var cont = 0;
        this.armariosDormitorioComponent.loadAll();
        this.armariosDormitorioOcultaComponent.loadAll();
        this.armariosDormitorioVistaComponent.loadAll();
        this.vestidoresDormitorioComponent.loadAll();
        $('#productosPrincipal').append('<datalist id="listaAnchos"></datalist>');
        $('#productosPrincipal').append('<datalist id="listaAltura"></datalist>');
        for (let i = 40; i < 401; i++) {
            $('#listaAnchos').append('<option value="' + i + '">' + i + '</option>');
        }
        for (let i = 220; i < 261; i++) {
            $('#listaAltura').append('<option style="color:red" value="' + i + '">' + i + '</option>');
        }
        $('#productosPrincipal').append('<datalist id="listaArmarios"></datalist>');
        for (let i = 1; i < 277; i++) {
            if (i >= 1 && i <= 9) {
                $('#listaArmarios').append('<option value="NB00' + i + '">NB00' + i + '</option>');
            }
            if (i >= 10 && i <= 99) {
                $('#listaArmarios').append('<option value="NB0' + i + '">NB0' + i + '</option>');
            }
            if (i >= 100) {
                $('#listaArmarios').append('<option value="NB' + i + '">NB' + i + '</option>');
            }
        }

        $('#productosPrincipal').append('<datalist id="listaArmariosVest"></datalist>');
        for (let i = 1; i < 505; i++) {
            if (i >= 1 && i <= 9) {
                $('#listaArmariosVest').append('<option value="NW00' + i + '">NW00' + i + '</option>');
            }
            if (i >= 10 && i <= 99) {
                $('#listaArmariosVest').append('<option value="NW0' + i + '">NW0' + i + '</option>');
            }
            if (i >= 100) {
                $('#listaArmariosVest').append('<option value="NW' + i + '">NW' + i + '</option>');
            }
        }

        $('#productosPrincipal').append('<datalist id="listaArmariosOculta"></datalist>');
        for (let i = 1; i < 77; i++) {
            if (i >= 1 && i <= 9) {
                $('#listaArmariosOculta').append('<option value="NL00' + i + '">NL00' + i + '</option>');
            }
            if (i >= 10 && i <= 76) {
                $('#listaArmariosOculta').append('<option value="NL0' + i + '">NL0' + i + '</option>');
            }
        }

        $('#productosPrincipal').append('<datalist id="listaArmariosVista"></datalist>');
        for (let i = 1; i < 77; i++) {
            if (i >= 1 && i <= 9) {
                $('#listaArmariosVista').append('<option value="NV00' + i + '">NV00' + i + '</option>');
            }
            if (i >= 10 && i <= 76) {
                $('#listaArmariosVista').append('<option value="NV0' + i + '">NV0' + i + '</option>');
            }
        }

        this.estanteria = [];
        this.saberNumArrayAca = [];
        $('#producto').append('<datalist id="listaAnchos1"></datalist>');
        for (let i = 1; i < 457; i++) {
            if (i >= 1 && i <= 9) {
                $('#listaAnchos1').append('<option value="NH00' + i + '">NH00' + i + '</option>');
            }
            if (i >= 10 && i <= 99) {
                $('#listaAnchos1').append('<option value="NH0' + i + '">NH0' + i + '</option>');
            }
            if (i >= 100) {
                $('#listaAnchos1').append('<option value="NH' + i + '">NH' + i + '</option>');
            }
        }

        for (let i = 1; i < 351; i++) {
            if (i >= 1 && i <= 9) {
                $('#listaAnchos1').append('<option value="NT00' + i + '">NT00' + i + '</option>');
            }
            if (i >= 10 && i <= 99) {
                $('#listaAnchos1').append('<option value="NT0' + i + '">NT0' + i + '</option>');
            }
            if (i >= 100) {
                $('#listaAnchos1').append('<option value="NT' + i + '">NT' + i + '</option>');
            }
        }
        for (let i = 1; i < 82; i++) {
            if (i >= 1 && i <= 9) {
                $('#listaAnchos1').append('<option value="NX00' + i + '">NX00' + i + '</option>');
            }
            if (i >= 10 && i <= 99) {
                $('#listaAnchos1').append('<option value="NX0' + i + '">NX0' + i + '</option>');
            }
            if (i >= 100) {
                $('#listaAnchos1').append('<option value="NX' + i + '">NX' + i + '</option>');
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

        this.pruebaCargar();
        var item = JSON.parse(sessionStorage.getItem('seccionPrecios'));
        var precioMulti = JSON.parse(sessionStorage.getItem(item));
        console.log(precioMulti);
        this.precioPunto = precioMulti;
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        var tienda = JSON.parse(sessionStorage.getItem('tiendaUsuario'));

        this.precioTiendaService.findBus1(tienda.id, 2).subscribe(data => {
            this.catalogoDormi = data.body;
            console.log(data.body);
        });
        this.precioTiendaService.findBus1(tienda.id, 1).subscribe(data => {
            this.catalogoCome = data.body;
            console.log(data.body);
        });
        this.precioTiendaProductosService.findProdId(8, tienda.id).subscribe(data => {
            this.precioTiendaProductosService.todos = data.body;
        });
        this.precioTiendaProductosService.findProdId(2, tienda.id).subscribe(data => {
            this.precioTiendaProductosService.apoyo = data.body;
        });

        this.ivaProductoTiendaService.bus(tienda['id']).subscribe(data => {
            this.loadAll();
        });
        this.iva = JSON.parse(sessionStorage.getItem('IVA'));

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
                size: 1000
            })
            .subscribe(data => {
                for (let i = 0; i < data.body.length; i++) {
                    acabados[i] = data.body[i];
                }
            });
        this.acabados = acabados;
        this.acabados1 = acabados;
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

        this.eventSubscriber = Subscription;
    }
}

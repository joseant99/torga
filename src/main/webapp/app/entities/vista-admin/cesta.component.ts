import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { JhiEventManager } from 'ng-jhipster';
import * as $ from 'jquery';
import { Observable } from 'rxjs';
import { IDatosUsuario } from 'app/shared/model/datos-usuario.model';
import { ActivatedRoute } from '@angular/router';
import { IContactoFabrica } from 'app/shared/model/contacto-fabrica.model';
import { LoginModalService, AccountService, Account, UserService } from 'app/core';
import { DatosUsuarioService } from '../datos-usuario/datos-usuario.service';
import { LoginService } from 'app/core/login/login.service';
import { Router } from '@angular/router';
import { StateStorageService } from 'app/core/auth/state-storage.service';
import { PagosTiendaService } from '../pagos-tienda/pagos-tienda.service';
import { VendedoresService } from '../vendedores/vendedores.service';
import { IVendedores } from 'app/shared/model/vendedores.model';
import { IPagosTienda } from 'app/shared/model/pagos-tienda.model';
import { ContactoFabricaService } from '../contacto-fabrica/contacto-fabrica.service';
import { MensajesService } from '../mensajes/mensajes.service';
import { IMensajes } from 'app/shared/model/mensajes.model';
import { PrecioTiendaService } from '../precio-tienda/precio-tienda.service';
import { IPrecioTienda } from 'app/shared/model/precio-tienda.model';
import { IvaProductoTiendaService } from '../iva-producto-tienda/iva-producto-tienda.service';
import { AcaProdService } from '../aca-prod/aca-prod.service';
import { IAcaProd } from 'app/shared/model/aca-prod.model';
import { DimensionesProductoTipoService } from '../dimensiones-producto-tipo/dimensiones-producto-tipo.service';
import { InterioresService } from '../interiores/interiores.service';
import { MedidasEspecialesService } from '../medidas-especiales/medidas-especiales.service';
import { ProductosDormitorioService } from '../productos-dormitorio/productos-dormitorio.service';
import { PresupuestoPedidoService } from '../presupuesto-pedido/presupuesto-pedido.service';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RepresentanteTiendaService } from '../representante-tienda/representante-tienda.service';
import { IRepresentanteTienda } from 'app/shared/model/representante-tienda.model';
import { IPresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';
import { AcabadosProductosPresupuestoPedidoService } from '../acabados-productos-presupuesto-pedido/acabados-productos-presupuesto-pedido.service';
import { ProductosPresupuestoPedidosService } from '../productos-presupuesto-pedidos/productos-presupuesto-pedidos.service';
import { MedEspProductoPedidoPresuService } from '../med-esp-producto-pedido-presu/med-esp-producto-pedido-presu.service';
import { IAcabadosProductosPresupuestoPedido } from 'app/shared/model/acabados-productos-presupuesto-pedido.model';
import { IProductosPresupuestoPedidos } from 'app/shared/model/productos-presupuesto-pedidos.model';
import { RepresenTorgaService } from '../represen-torga/represen-torga.service';
import { IRepresenTorga } from 'app/shared/model/represen-torga.model';
import { IluminacionProdPrePedService } from '../iluminacion-prod-pre-ped/iluminacion-prod-pre-ped.service';
import { DireccionTiendasService } from '../direccion-tiendas/direccion-tiendas.service';
import { ICategoriasDormi } from 'app/shared/model/categorias-dormi.model';
import { JhiMainComponent } from '../../layouts/main/main.component';
import { PrecioFinalPresuService } from '../precio-final-presu/precio-final-presu.service';
import { IPresupuestoArmario } from 'app/shared/model/presupuesto-armario.model';
import { PresupuestoArmarioService } from '../presupuesto-armario/presupuesto-armario.service';
import { IPresupuestoArmarioInteriores } from 'app/shared/model/presupuesto-armario-interiores.model';
import { PresupuestoArmarioInterioresService } from '../presupuesto-armario-interiores/presupuesto-armario-interiores.service';
import { IPresupuestoArmarioPuertas } from 'app/shared/model/presupuesto-armario-puertas.model';
import { PresupuestoArmarioPuertasService } from '../presupuesto-armario-puertas/presupuesto-armario-puertas.service';
import { IPrecioFinalPresu } from 'app/shared/model/precio-final-presu.model';
import { AcabadosService } from 'app/entities/acabados';
import { SessionStorageService } from 'ngx-webstorage';
import { NavbarComponent } from '../../layouts/navbar/navbar.component';
import { VistaAdminService } from './vista-admin.service';

@Component({
    providers: [NavbarComponent],
    selector: 'jhi-inicio',
    templateUrl: './cesta.component.html'
})
export class cestaComponent implements OnInit, AfterViewInit {
    account: Account;
    currentAccount: any;
    modalRef: NgbModalRef;
    isSaving: boolean;
    provincias: any;
    logo: any;
    municipios: any;
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    pagosTienda: any;
    username: string;
    credentials: any;
    contacto: any;
    mensajes: any;

    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    ruta: any;
    swaggerEnabled: boolean;
    id: any;
    medidasModal: any;
    productosArrayNombre: any;
    acaProdSer: any;
    presupuestoPedido: IPresupuestoPedido;
    presupuesto: any;
    productosPresupuestoPedidos: IProductosPresupuestoPedidos;
    numeroPedidos: any;
    user: any;
    todasDimensiones: any;
    numeroPresupuestos: any;
    acaProdPed: any;
    version: string;
    closeResult: string;
    link: string;
    settingsAccount: any;
    contador: any;
    bottomModulos: any;
    predicate: any;
    reverse: any;
    routeData: any;
    precioPunto: any;
    todasLasTiendas: any;
    acabadosPresupuesto: any;
    productoPresupuesto: any;
    presupuestoArmarioTodoLOL: any;
    mGuardar: any;
    arrayNombreFiscal: any;
    meterdireccionarray: any;
    idDeLaTiendaCogida: any;
    todosLosAcabados: any;
    iddireccioncogida;
    estaobservacion: any;
    nombrearchivoadjunto: any;
    arrayNombresArchivos: any;
    adjuntoya: any;
    constructor(
        protected presupuestoArmarioPuertasService: PresupuestoArmarioPuertasService,
        protected acabadosService: AcabadosService,
        protected vistaadminService: VistaAdminService,
        protected dimensionesProductoTipoService: DimensionesProductoTipoService,
        private sessionStorage: SessionStorageService,
        protected datosUsuarioService: DatosUsuarioService,
        protected precioTiendaService: PrecioTiendaService,
        protected medEspProductoPedidoPresuService: MedEspProductoPedidoPresuService,
        protected acabadosProductosPresupuestoPedidoService: AcabadosProductosPresupuestoPedidoService,
        protected iluminacionProdPrePedService: IluminacionProdPrePedService,
        protected productosPresupuestoPedidosService: ProductosPresupuestoPedidosService,
        protected presupuestoPedidoService: PresupuestoPedidoService,
        protected representanteTiendaService: RepresentanteTiendaService,
        protected acaProdService: AcaProdService,
        protected userService: UserService,
        protected represenTorgaService: RepresenTorgaService,
        protected presupuestoArmarioInterioresService: PresupuestoArmarioInterioresService,
        protected interioresService: InterioresService,
        public mainComponent: JhiMainComponent,
        public direccionTiendasService: DireccionTiendasService,
        protected medidasEspecialesService: MedidasEspecialesService,
        protected precioFinalPresuService: PrecioFinalPresuService,
        protected presupuestoArmarioService: PresupuestoArmarioService,
        protected navbarComponent: NavbarComponent,
        private accountService: AccountService,
        protected ivaProductoTiendaService: IvaProductoTiendaService,
        protected vendedoresService: VendedoresService,
        private loginModalService: LoginModalService,
        protected contactoFabricaService: ContactoFabricaService,
        private eventManager: JhiEventManager,
        protected mensajesService: MensajesService,
        private loginService: LoginService,
        private router: Router,
        protected activatedRoute: ActivatedRoute,
        protected pagosTiendaService: PagosTiendaService,
        private stateStorageService: StateStorageService
    ) {}

    ngOnInit() {
        $('body').css({ 'overflow-y': 'scroll' });
        var bottomModulos = [];
        bottomModulos[2] = 'bottom:0px;';
        bottomModulos[3] = 'bottom:0px;';
        bottomModulos[4] = 'bottom:0px;';
        bottomModulos[5] = 'bottom:0px;';
        bottomModulos[6] = 'bottom:0px;';
        bottomModulos[7] = 'bottom:0px;';
        bottomModulos[8] = 'bottom:0px;';
        bottomModulos[9] = 'bottom:0px;';
        bottomModulos[10] = 'bottom:0px;';
        bottomModulos[11] = 'bottom:0px;';
        bottomModulos[12] = 'bottom:0px;';
        bottomModulos[13] = 'bottom:0px;';
        this.bottomModulos = bottomModulos;
        var medidasModal = [];
        medidasModal['mb4'] = 'margin-left:-140px;bottom:125px;max-width:500px;max-height:300px;';
        medidasModal['mb1'] = 'margin-left:-60px;bottom:105px;max-width:500px;max-height:300px;';
        medidasModal['mb6'] = 'margin-left:-70px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['mb7'] = 'margin-left:-70px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['mb8'] = 'margin-left:-70px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['mb9'] = 'margin-left:-70px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['mb5'] = 'margin-left:-70px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['mb10'] = 'margin-left:-70px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['mb11'] = 'margin-left:-70px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['mb12'] = 'margin-left:-70px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['mb13'] = 'margin-left:-70px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['mb14'] = 'margin-left:-70px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['ap2'] = 'margin-left:-70px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['ap3'] = 'margin-left:-70px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['ap4'] = 'margin-left:-70px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['ap5'] = 'margin-left:-70px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['ap6'] = 'margin-left:-70px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['ap8'] = 'margin-left:-70px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['ap9'] = 'margin-left:-70px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['ap10'] = 'margin-left:-70px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['ap7'] = 'margin-left:-70px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['sg1'] = 'margin-left:0px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['sg2'] = 'margin-left:0px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['sg3'] = 'margin-left:0px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['sg4'] = 'margin-left:0px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['sg5'] = 'margin-left:0px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['sg6'] = 'margin-left:0px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['sg7'] = 'margin-left:0px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['sg8'] = 'margin-left:0px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['sg9'] = 'margin-left:0px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['sg10'] = 'margin-left:0px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['sg11'] = 'margin-left:0px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['sg12'] = 'margin-left:0px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['sg13'] = 'margin-left:0px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['sg14'] = 'margin-left:0px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['sg15'] = 'margin-left:0px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['sg16'] = 'margin-left:0px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['cv27'] = 'margin-left:0px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['cv25'] = 'margin-left:0px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['cv6'] = 'margin-left:0px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['cv19'] = 'margin-left:0px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['cv10'] = 'margin-left:0px;bottom:140px;max-width:500px;max-height:300px;';
        medidasModal['cv12'] = 'margin-left:0px;bottom:140px;max-width:500px;max-height:300px;';

        this.medidasModal = medidasModal;

        var productosArrayNombres = [];
        productosArrayNombres[107] = 'mb1';
        productosArrayNombres[72] = 'sg1';
        productosArrayNombres[73] = 'sg1';
        productosArrayNombres[74] = 'sg2';
        productosArrayNombres[75] = 'sg2';
        productosArrayNombres[76] = 'sg3';
        productosArrayNombres[77] = 'sg3';
        productosArrayNombres[78] = 'sg4';
        productosArrayNombres[79] = 'sg5';
        productosArrayNombres[80] = 'sg6';
        productosArrayNombres[81] = 'sg7';
        productosArrayNombres[82] = 'sg8';
        productosArrayNombres[83] = 'sg9';
        productosArrayNombres[84] = 'sg10';
        productosArrayNombres[85] = 'sg11';
        productosArrayNombres[86] = 'sg12';
        productosArrayNombres[87] = 'sg12';
        productosArrayNombres[88] = 'sg13';
        productosArrayNombres[89] = 'sg13';
        productosArrayNombres[90] = 'sg14';
        productosArrayNombres[91] = 'sg15';
        productosArrayNombres[92] = 'sg16';
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
        productosArrayNombres[53] = 'ap2';
        productosArrayNombres[62] = 'ap3';
        productosArrayNombres[63] = 'ap4';
        productosArrayNombres[64] = 'ap5';
        productosArrayNombres[65] = 'ap6';
        productosArrayNombres[66] = 'ap7';
        productosArrayNombres[67] = 'ap8';
        productosArrayNombres[68] = 'ap9';
        productosArrayNombres[69] = 'ap10';
        productosArrayNombres[158] = 'cv27';
        productosArrayNombres[159] = 'cv27';
        productosArrayNombres[160] = 'cv25';
        productosArrayNombres[161] = 'cv25';
        productosArrayNombres[162] = 'cv6';
        productosArrayNombres[163] = 'cv6';
        productosArrayNombres[164] = 'cv19';
        productosArrayNombres[165] = 'cv19';
        productosArrayNombres[166] = 'cv10';
        productosArrayNombres[167] = 'cv10';
        productosArrayNombres[168] = 'cv12';
        productosArrayNombres[169] = 'cv12';
        productosArrayNombres[170] = 'ap10';

        this.productosArrayNombre = productosArrayNombres;
        var usuarios = [];
        this.userService.queryCogemosAll().subscribe(data => {
            for (let i = 0; i < data.body.length; i++) {
                usuarios[i] = data.body[i];
            }
        });
        this.user = usuarios;

        $('.modal-backdrop').remove();
        productosArrayNombres = this.productosArrayNombre;
        $('#modalCesta .modal-body').empty();
        var medidas = this.medidasModal;
        var acabados = [];
        $('#cestaTotal').text('');
        $('#myModalComposicion .modal-body').empty();
        var contAca = 1;
        var nombreCarpeta;
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
        var acabados = [];
        this.acabadosService
            .query({
                size: 1000
            })
            .subscribe(data => {
                for (let i = 0; i < data.body.length; i++) {
                    acabados[i] = data.body[i];
                }
                this.acabadosService.todos = acabados;
            });
        for (let i = 1; i <= 100; i++) {
            var sesion = JSON.parse(sessionStorage.getItem('prod' + i));
            console.log(sesion);

            if (sesion != null) {
                if (sesion[1]['productosDormitorio'] != undefined) {
                    var nombre = productosArrayNombres[sesion[1]['productosDormitorio']['id']];
                    console.log(nombre);

                    if (
                        sesion[1]['productosDormitorio']['categoriasDormi']['id'] == 9 ||
                        sesion[1]['productosDormitorio']['categoriasDormi']['id'] == 32
                    ) {
                        if (sesion[1]['productosDormitorio']['categoriasDormi']['id'] == 9) {
                            $('#modalCesta .modal-body').append(
                                '<div style="float: left;width: 100%;text-align: center;height:250px;position:relative;" class="cuerpoArmario" id="cuerpo' +
                                    i +
                                    '"></div>'
                            );

                            var nombreArmario = sesion[1]['mensaje'];
                            var casco = sesion[1]['acabadoCasco']['nombre'];
                            if (sesion[1]['acabadoTrasera'] != undefined) {
                                var trasera = sesion[1]['acabadoTrasera']['nombre'];
                            }
                            var interiores = 'blanco';

                            $('#cuerpo' + i).append(
                                '<p style="letter-spacing: 1px;font-weight: 300;font-size:30px;position:absolute;width:97%;text-align:center">' +
                                    sesion[1]['productosDormitorio']['nombre'].toUpperCase() +
                                    '</p>'
                            );

                            if (nombreArmario == '1 PUERTA') {
                                var interior1 = sesion[1]['interiores'][0];
                                var puerta1 = sesion[1]['puertas'][0];
                                $('#cuerpo' + i).append(
                                    '<div id="izquierda" class="armarioIzquierda" style="margin-left: 470px;margin-top: 110px;float: left;"></div>'
                                );
                                $('#cuerpo' + i + ' .armarioIzquierda').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:2" src="../../../content/images/pruebaarmarios/ARMARIOS/1-1 PNG/1-1-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i).append(
                                    '<div id="derecha" class="armarioDerecha" style="float:left;margin-top:515px;"></div>'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:2" src="../../../content/images/pruebaarmarios/ARMARIOS/1-1 PNG/1-1-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );
                                if (screen.width < 800) {
                                    const elem = $('#cuerpo' + i + ' .armarioIzquierda');
                                    elem[0].style.setProperty('margin-left', '30px', 'important');
                                    elem[0].style.setProperty('margin-top', '100px', 'important');
                                    elem[0].style.setProperty('zoom', '70%', 'important');
                                    const elem1 = $('#cuerpo' + i + ' .armarioDerecha');
                                    elem1[0].style.setProperty('margin-left', '0px', 'important');
                                    elem1[0].style.setProperty('margin-top', '480px', 'important');
                                    elem1[0].style.setProperty('zoom', '70%', 'important');
                                    const elem2 = $('#cuerpo' + i);
                                    elem2[0].style.setProperty('height', '670px', 'important');
                                }

                                if (puerta1 != undefined) {
                                    if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/1-1 PTAS PNG/1-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/1-1 PTAS PNG/1-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;opacity:0.4" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/1-1 PTAS PNG/1-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/1-1 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/1-1 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/1-1 PTAS PNG/1-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }
                            }

                            if (nombreArmario == '3 PUERTAS IZQUIERDA') {
                                var interior1 = sesion[1]['interiores'][0];
                                var interior2 = sesion[1]['interiores'][1];
                                var puerta1 = sesion[1]['puertas'][0];
                                var puerta2 = sesion[1]['puertas'][1];
                                var puerta3 = sesion[1]['puertas'][2];

                                $('#cuerpo' + i).append(
                                    '<div id="izquierda" class="armarioIzquierda" style="margin-left: 530px;margin-top: 80px;float: left;"></div>'
                                );
                                $('#cuerpo' + i).append(
                                    '<div id="derecha" class="armarioDerecha" style="float:left;margin-top:515px;"></div>'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:2;margin-left:0px !important;margin-top:0px !important;" src="../../../content/images/pruebaarmarios/ARMARIOS/3-1 PNG/3-1-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda1"  style="width:400px !important;height:400px !important;position:absolute;margin-left:0px !important;margin-top:0px !important;" src="../../../content/images/pruebaarmarios/ARMARIOS/3-1 PNG/3-1-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );
                                if (screen.width < 800) {
                                    const elem = $('#cuerpo' + i + ' .armarioIzquierda');
                                    elem[0].style.setProperty('margin-left', '30px', 'important');
                                    elem[0].style.setProperty('margin-top', '100px', 'important');
                                    elem[0].style.setProperty('zoom', '70%', 'important');
                                    const elem1 = $('#cuerpo' + i + ' .armarioDerecha');
                                    elem1[0].style.setProperty('margin-left', '0px', 'important');
                                    elem1[0].style.setProperty('margin-top', '480px', 'important');
                                    elem1[0].style.setProperty('zoom', '70%', 'important');
                                    const elem2 = $('#cuerpo' + i);
                                    elem2[0].style.setProperty('height', '670px', 'important');
                                }
                                console.log(puerta1);
                                console.log(puerta2);
                                console.log(puerta3);
                                if (puerta1 != undefined) {
                                    if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/1-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/1-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/1-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/1-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }
                                if (puerta2 != undefined) {
                                    if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/2-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/2-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/2-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/2-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                        var src1 = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src1 +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                        var src1 = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src1 +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                        var src1 = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src1 +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                        var src1 = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src1 +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta3 != undefined) {
                                    if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/3-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/3-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/3-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                        var src1 = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src1 +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                        var src1 = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src1 +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                        var src1 = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src1 +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                        var src1 = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src1 +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                        var src1 = '../../../content/images/pruebaarmarios/ARMARIOS/3-1 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src1 +
                                                '">'
                                        );
                                    }
                                }

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:2" src="../../../content/images/pruebaarmarios/ARMARIOS/3-1 PNG/3-1-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda1"  style="width:400px !important;height:400px !important;position:absolute;" src="../../../content/images/pruebaarmarios/ARMARIOS/3-1 PNG/3-1-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );
                            }

                            if (nombreArmario == '1 CUERPO TIPO 1') {
                                if (screen.width < 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }

                                if (screen.width >= 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }
                            }

                            if (nombreArmario == '1 CUERPO TIPO 2') {
                                if (screen.width < 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }

                                if (screen.width >= 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }
                            }

                            if (nombreArmario == '1 CUERPO TIPO 3') {
                                if (screen.width < 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }

                                if (screen.width >= 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }
                            }
                            if (nombreArmario == '2 PUERTAS CORREDERA') {
                                var interior1 = sesion[1]['interiores'][0];
                                var interior2 = sesion[1]['interiores'][1];
                                var puerta1 = sesion[1]['puertas'][0];
                                var puerta2 = sesion[1]['puertas'][1];
                                var puerta3 = sesion[1]['puertas'][2];
                                var puerta4 = sesion[1]['puertas'][3];

                                $('#cuerpo' + i).append(
                                    '<div id="izquierda" class="armarioIzquierda" style="margin-left: 520px;margin-top: 50px;float: left;"></div>'
                                );
                                $('#cuerpo' + i).append(
                                    '<div id="derecha" class="armarioDerecha" style="float:left;margin-top:475px;"></div>'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:2;" src="../../../content/images/pruebaarmarios/OCULTA/2 PNG/2-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 1;" src="../../../content/images/pruebaarmarios/OCULTA/2 PNG/2-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );

                                if (screen.width < 800) {
                                    const elem = $('#cuerpo' + i + ' .armarioIzquierda');
                                    elem[0].style.setProperty('margin-left', '30px', 'important');
                                    elem[0].style.setProperty('margin-top', '100px', 'important');
                                    elem[0].style.setProperty('zoom', '70%', 'important');
                                    const elem1 = $('#cuerpo' + i + ' .armarioDerecha');
                                    elem1[0].style.setProperty('margin-left', '0px', 'important');
                                    elem1[0].style.setProperty('margin-top', '480px', 'important');
                                    elem1[0].style.setProperty('zoom', '70%', 'important');
                                    const elem2 = $('#cuerpo' + i);
                                    elem2[0].style.setProperty('height', '670px', 'important');
                                }
                                console.log(puerta1);
                                console.log(puerta2);

                                for (let e = 0; e <= 5; e++) {
                                    var puertavalidamen = sesion[1]['puertas'][e];

                                    if (puertavalidamen != undefined) {
                                        if (puertavalidamen['nombre'] == 'Puerta Lisa') {
                                            var src = '../../../content/images/pruebaarmarios/OCULTA/2 PTAS PNG/' + (e + 1) + '-A.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }

                                        if (puertavalidamen['nombre'] == 'Puerta 2 Plafones') {
                                            var src = '../../../content/images/pruebaarmarios/OCULTA/2 PTAS PNG/' + (e + 1) + '-B.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }

                                        if (puertavalidamen['nombre'] == 'Puerta 3 Plafones') {
                                            var src = '../../../content/images/pruebaarmarios/OCULTA/2 PTAS PNG/' + (e + 1) + '-C.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }
                                        if (puertavalidamen['nombre'] == 'Puerta 5 Plafones') {
                                            var src = '../../../content/images/pruebaarmarios/OCULTA/2 PTAS PNG/' + (e + 1) + '-D.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }
                                        if (puertavalidamen['nombre'] == 'Puerta 2 Plafones Verticales') {
                                            var src = '../../../content/images/pruebaarmarios/OCULTA/2 PTAS PNG/' + (e + 1) + '-E.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }
                                        if (puertavalidamen['nombre'] == 'Puerta 2 Plafones Verticales Cristal Estrecha') {
                                            var src = '../../../content/images/pruebaarmarios/OCULTA/2 PTAS PNG/' + (e + 1) + '-F.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }
                                        if (puertavalidamen['nombre'] == 'Puerta 2 Plafones Verticales Cristal Ancha') {
                                            var src = '../../../content/images/pruebaarmarios/OCULTA/2 PTAS PNG/' + (e + 1) + '-G.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }
                                        if (puertavalidamen['nombre'] == 'Puerta 2 Plafones Verticales DER') {
                                            var src = '../../../content/images/pruebaarmarios/OCULTA/2 PTAS PNG/' + (e + 1) + '-H.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }

                                        if (puertavalidamen['nombre'] == 'Puerta 2 Plafones Verticales Cristal Estrecha DER') {
                                            var src = '../../../content/images/pruebaarmarios/OCULTA/2 PTAS PNG/' + (e + 1) + '-I.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }
                                        if (puertavalidamen['nombre'] == 'Puerta 2 Plafones Verticales Cristal Ancha DER') {
                                            var src = '../../../content/images/pruebaarmarios/OCULTA/2 PTAS PNG/' + (e + 1) + '-J.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }
                                    }
                                }

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img  style="position:absolute;width: 400px !important;height: 400px !important;z-index:101" src="../../../content/images/pruebaarmarios/OCULTA/2 PNG/2-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img  style="position:absolute;width: 400px !important;height: 400px !important;z-index:100" src="../../../content/images/pruebaarmarios/OCULTA/2 PNG/2-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );
                            }
                            if (nombreArmario == '3 PUERTAS CORREDERA') {
                                var interior1 = sesion[1]['interiores'][0];
                                var interior2 = sesion[1]['interiores'][1];
                                var interior3 = sesion[1]['interiores'][2];
                                var puerta2 = sesion[1]['puertas'][0];
                                var puerta3 = sesion[1]['puertas'][1];
                                var puerta4 = sesion[1]['puertas'][2];
                                var puerta5 = sesion[1]['puertas'][3];
                                var puerta6 = sesion[1]['puertas'][4];
                                var puerta7 = sesion[1]['puertas'][5];
                                $('#cuerpo' + i).append(
                                    '<div id="izquierda" class="armarioIzquierda" style="margin-left: 520px;margin-top: 100px;float: left;"></div>'
                                );
                                $('#cuerpo' + i).append(
                                    '<div id="derecha" class="armarioDerecha" style="float:left;margin-top:470px;"></div>'
                                );
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 1;" src="../../../content/images/pruebaarmarios/OCULTA/3 PNG/3-C-' +
                                        interior3['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 3;" src="../../../content/images/pruebaarmarios/OCULTA/3 PNG/3-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 2" src="../../../content/images/pruebaarmarios/OCULTA/3 PNG/3-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );
                                if (screen.width < 800) {
                                    const elem = $('#cuerpo' + i + ' .armarioIzquierda');
                                    elem[0].style.setProperty('margin-left', '30px', 'important');
                                    elem[0].style.setProperty('margin-top', '110px', 'important');
                                    elem[0].style.setProperty('zoom', '70%', 'important');
                                    const elem1 = $('#cuerpo' + i + ' .armarioDerecha');
                                    elem1[0].style.setProperty('margin-left', '0px', 'important');
                                    elem1[0].style.setProperty('margin-top', '480px', 'important');
                                    elem1[0].style.setProperty('zoom', '70%', 'important');
                                    const elem2 = $('#cuerpo' + i);
                                    elem2[0].style.setProperty('height', '670px', 'important');
                                }
                                for (let e = 0; e <= 5; e++) {
                                    var puertavalidamen = sesion[1]['puertas'][e];

                                    if (puertavalidamen != undefined) {
                                        if (puertavalidamen['nombre'] == 'Puerta Lisa') {
                                            var src = '../../../content/images/pruebaarmarios/OCULTA/3 PTAS PNG/' + (e + 1) + '-A.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }

                                        if (puertavalidamen['nombre'] == 'Puerta 2 Plafones') {
                                            var src = '../../../content/images/pruebaarmarios/OCULTA/3 PTAS PNG/' + (e + 1) + '-B.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }

                                        if (puertavalidamen['nombre'] == 'Puerta 3 Plafones') {
                                            var src = '../../../content/images/pruebaarmarios/OCULTA/3 PTAS PNG/' + (e + 1) + '-C.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }
                                        if (puertavalidamen['nombre'] == 'Puerta 5 Plafones') {
                                            var src = '../../../content/images/pruebaarmarios/OCULTA/3 PTAS PNG/' + (e + 1) + '-D.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }
                                        if (puertavalidamen['nombre'] == 'Puerta 2 Plafones Verticales') {
                                            var src = '../../../content/images/pruebaarmarios/OCULTA/3 PTAS PNG/' + (e + 1) + '-E.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }
                                        if (puertavalidamen['nombre'] == 'Puerta 2 Plafones Verticales Cristal Estrecha') {
                                            var src = '../../../content/images/pruebaarmarios/OCULTA/3 PTAS PNG/' + (e + 1) + '-F.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }
                                        if (puertavalidamen['nombre'] == 'Puerta 2 Plafones Verticales Cristal Ancha') {
                                            var src = '../../../content/images/pruebaarmarios/OCULTA/3 PTAS PNG/' + (e + 1) + '-G.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }
                                        if (puertavalidamen['nombre'] == 'Puerta 2 Plafones Verticales DER') {
                                            var src = '../../../content/images/pruebaarmarios/OCULTA/3 PTAS PNG/' + (e + 1) + '-H.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }

                                        if (puertavalidamen['nombre'] == 'Puerta 2 Plafones Verticales Cristal Estrecha DER') {
                                            var src = '../../../content/images/pruebaarmarios/OCULTA/3 PTAS PNG/' + (e + 1) + '-I.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }
                                        if (puertavalidamen['nombre'] == 'Puerta 2 Plafones Verticales Cristal Ancha DER') {
                                            var src = '../../../content/images/pruebaarmarios/OCULTA/3 PTAS PNG/' + (e + 1) + '-J.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }
                                    }
                                }

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 3;" src="../../../content/images/pruebaarmarios/OCULTA/3 PNG/3-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 2;" src="../../../content/images/pruebaarmarios/OCULTA/3 PNG/3-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 1;" src="../../../content/images/pruebaarmarios/OCULTA/3 PNG/3-C-' +
                                        interior3['nombre'] +
                                        '.png">'
                                );
                            }
                            if (nombreArmario == '2 PUERTAS CORREDERA VISTA') {
                                var interior1 = sesion[1]['interiores'][0];
                                var interior2 = sesion[1]['interiores'][1];
                                var puerta1 = sesion[1]['puertas'][0];
                                var puerta2 = sesion[1]['puertas'][1];
                                var puerta3 = sesion[1]['puertas'][2];
                                var puerta4 = sesion[1]['puertas'][3];

                                $('#cuerpo' + i).append(
                                    '<div id="izquierda" class="armarioIzquierda" style="margin-left: 520px;margin-top: 50px;float: left;"></div>'
                                );
                                $('#cuerpo' + i).append(
                                    '<div id="derecha" class="armarioDerecha" style="float:left;margin-top:475px;"></div>'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:2;" src="../../../content/images/pruebaarmarios/VISTA/2 PNG/2-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 1;" src="../../../content/images/pruebaarmarios/VISTA/2 PNG/2-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );

                                if (screen.width < 800) {
                                    const elem = $('#cuerpo' + i + ' .armarioIzquierda');
                                    elem[0].style.setProperty('margin-left', '30px', 'important');
                                    elem[0].style.setProperty('margin-top', '100px', 'important');
                                    elem[0].style.setProperty('zoom', '70%', 'important');
                                    const elem1 = $('#cuerpo' + i + ' .armarioDerecha');
                                    elem1[0].style.setProperty('margin-left', '0px', 'important');
                                    elem1[0].style.setProperty('margin-top', '480px', 'important');
                                    elem1[0].style.setProperty('zoom', '70%', 'important');
                                    const elem2 = $('#cuerpo' + i);
                                    elem2[0].style.setProperty('height', '670px', 'important');
                                }
                                console.log(puerta1);
                                console.log(puerta2);

                                for (let e = 0; e <= 5; e++) {
                                    var puertavalidamen = sesion[1]['puertas'][e];

                                    if (puertavalidamen != undefined) {
                                        if (puertavalidamen['nombre'] == 'Puerta Lisa') {
                                            var src = '../../../content/images/pruebaarmarios/VISTA/2 PTAS PNG/' + (e + 1) + '-A.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }

                                        if (puertavalidamen['nombre'] == 'Puerta 2 Plafones') {
                                            var src = '../../../content/images/pruebaarmarios/VISTA/2 PTAS PNG/' + (e + 1) + '-B.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }

                                        if (puertavalidamen['nombre'] == 'Puerta 3 Plafones') {
                                            var src = '../../../content/images/pruebaarmarios/VISTA/2 PTAS PNG/' + (e + 1) + '-C.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }
                                        if (puertavalidamen['nombre'] == 'Puerta 5 Plafones') {
                                            var src = '../../../content/images/pruebaarmarios/VISTA/2 PTAS PNG/' + (e + 1) + '-D.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }
                                        if (puertavalidamen['nombre'] == 'Puerta 2 Plafones Verticales') {
                                            var src = '../../../content/images/pruebaarmarios/VISTA/2 PTAS PNG/' + (e + 1) + '-E.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }
                                        if (puertavalidamen['nombre'] == 'Puerta 2 Plafones Verticales Cristal Estrecha') {
                                            var src = '../../../content/images/pruebaarmarios/VISTA/2 PTAS PNG/' + (e + 1) + '-F.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }
                                        if (puertavalidamen['nombre'] == 'Puerta 2 Plafones Verticales Cristal Ancha') {
                                            var src = '../../../content/images/pruebaarmarios/VISTA/2 PTAS PNG/' + (e + 1) + '-G.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }
                                        if (puertavalidamen['nombre'] == 'Puerta 2 Plafones Verticales DER') {
                                            var src = '../../../content/images/pruebaarmarios/VISTA/2 PTAS PNG/' + (e + 1) + '-H.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }

                                        if (puertavalidamen['nombre'] == 'Puerta 2 Plafones Verticales Cristal Estrecha DER') {
                                            var src = '../../../content/images/pruebaarmarios/VISTA/2 PTAS PNG/' + (e + 1) + '-I.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }
                                        if (puertavalidamen['nombre'] == 'Puerta 2 Plafones Verticales Cristal Ancha DER') {
                                            var src = '../../../content/images/pruebaarmarios/VISTA/2 PTAS PNG/' + (e + 1) + '-J.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }
                                    }
                                }

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img  style="position:absolute;width: 400px !important;height: 400px !important;z-index:101" src="../../../content/images/pruebaarmarios/VISTA/2 PNG/2-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img  style="position:absolute;width: 400px !important;height: 400px !important;z-index:100" src="../../../content/images/pruebaarmarios/VISTA/2 PNG/2-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );
                            }
                            if (nombreArmario == '3 PUERTAS CORREDERA VISTA') {
                                var interior1 = sesion[1]['interiores'][0];
                                var interior2 = sesion[1]['interiores'][1];
                                var interior3 = sesion[1]['interiores'][2];
                                var puerta2 = sesion[1]['puertas'][0];
                                var puerta3 = sesion[1]['puertas'][1];
                                var puerta4 = sesion[1]['puertas'][2];
                                var puerta5 = sesion[1]['puertas'][3];
                                var puerta6 = sesion[1]['puertas'][4];
                                var puerta7 = sesion[1]['puertas'][5];
                                $('#cuerpo' + i).append(
                                    '<div id="izquierda" class="armarioIzquierda" style="margin-left: 520px;margin-top: 100px;float: left;"></div>'
                                );
                                $('#cuerpo' + i).append(
                                    '<div id="derecha" class="armarioDerecha" style="float:left;margin-top:470px;"></div>'
                                );
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 1;" src="../../../content/images/pruebaarmarios/VISTA/3 PNG/3-C-' +
                                        interior3['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 3;" src="../../../content/images/pruebaarmarios/VISTA/3 PNG/3-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 2" src="../../../content/images/pruebaarmarios/VISTA/3 PNG/3-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );
                                if (screen.width < 800) {
                                    const elem = $('#cuerpo' + i + ' .armarioIzquierda');
                                    elem[0].style.setProperty('margin-left', '30px', 'important');
                                    elem[0].style.setProperty('margin-top', '110px', 'important');
                                    elem[0].style.setProperty('zoom', '70%', 'important');
                                    const elem1 = $('#cuerpo' + i + ' .armarioDerecha');
                                    elem1[0].style.setProperty('margin-left', '0px', 'important');
                                    elem1[0].style.setProperty('margin-top', '480px', 'important');
                                    elem1[0].style.setProperty('zoom', '70%', 'important');
                                    const elem2 = $('#cuerpo' + i);
                                    elem2[0].style.setProperty('height', '670px', 'important');
                                }
                                for (let e = 0; e <= 5; e++) {
                                    var puertavalidamen = sesion[1]['puertas'][e];

                                    if (puertavalidamen != undefined) {
                                        if (puertavalidamen['nombre'] == 'Puerta Lisa') {
                                            var src = '../../../content/images/pruebaarmarios/VISTA/3 PTAS PNG/' + (e + 1) + '-A.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }

                                        if (puertavalidamen['nombre'] == 'Puerta 2 Plafones') {
                                            var src = '../../../content/images/pruebaarmarios/VISTA/3 PTAS PNG/' + (e + 1) + '-B.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }

                                        if (puertavalidamen['nombre'] == 'Puerta 3 Plafones') {
                                            var src = '../../../content/images/pruebaarmarios/VISTA/3 PTAS PNG/' + (e + 1) + '-C.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }
                                        if (puertavalidamen['nombre'] == 'Puerta 5 Plafones') {
                                            var src = '../../../content/images/pruebaarmarios/VISTA/3 PTAS PNG/' + (e + 1) + '-D.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }
                                        if (puertavalidamen['nombre'] == 'Puerta 2 Plafones Verticales') {
                                            var src = '../../../content/images/pruebaarmarios/VISTA/3 PTAS PNG/' + (e + 1) + '-E.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }
                                        if (puertavalidamen['nombre'] == 'Puerta 2 Plafones Verticales Cristal Estrecha') {
                                            var src = '../../../content/images/pruebaarmarios/VISTA/3 PTAS PNG/' + (e + 1) + '-F.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }
                                        if (puertavalidamen['nombre'] == 'Puerta 2 Plafones Verticales Cristal Ancha') {
                                            var src = '../../../content/images/pruebaarmarios/VISTA/3 PTAS PNG/' + (e + 1) + '-G.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }
                                        if (puertavalidamen['nombre'] == 'Puerta 2 Plafones Verticales DER') {
                                            var src = '../../../content/images/pruebaarmarios/VISTA/3 PTAS PNG/' + (e + 1) + '-H.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }

                                        if (puertavalidamen['nombre'] == 'Puerta 2 Plafones Verticales Cristal Estrecha DER') {
                                            var src = '../../../content/images/pruebaarmarios/VISTA/3 PTAS PNG/' + (e + 1) + '-I.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }
                                        if (puertavalidamen['nombre'] == 'Puerta 2 Plafones Verticales Cristal Ancha DER') {
                                            var src = '../../../content/images/pruebaarmarios/VISTA/3 PTAS PNG/' + (e + 1) + '-J.png';
                                            $('#cuerpo' + i + ' #derecha').append(
                                                '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                    src +
                                                    '">'
                                            );
                                        }
                                    }
                                }

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 3;" src="../../../content/images/pruebaarmarios/VISTA/3 PNG/3-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 2;" src="../../../content/images/pruebaarmarios/VISTA/3 PNG/3-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 1;" src="../../../content/images/pruebaarmarios/VISTA/3 PNG/3-C-' +
                                        interior3['nombre'] +
                                        '.png">'
                                );
                            }
                            if (nombreArmario == '2 CUERPO TIPO 1') {
                                if (screen.width < 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }

                                if (screen.width >= 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }
                            }

                            if (nombreArmario == '2 CUERPO TIPO 2') {
                                if (screen.width < 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }

                                if (screen.width >= 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }
                            }

                            if (nombreArmario == '2 CUERPO TIPO 3') {
                                if (screen.width < 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }

                                if (screen.width >= 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }
                            }

                            if (nombreArmario == '3 CUERPO TIPO 1') {
                                if (screen.width < 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }

                                if (screen.width >= 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }
                            }
                            if (nombreArmario == 'Armario Rincon') {
                                if (screen.width < 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }

                                if (screen.width >= 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 25%; margin-top: 140px;" src="../../../content/images/nodisponible.png">'
                                    );
                                }
                            }

                            if (nombreArmario == '3 CUERPO TIPO 2') {
                                if (screen.width < 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }

                                if (screen.width >= 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }
                            }

                            if (nombreArmario == '3 CUERPO TIPO 3') {
                                if (screen.width < 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }

                                if (screen.width >= 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }
                            }

                            if (nombreArmario == '4 CUERPO TIPO 1') {
                                if (screen.width < 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }

                                if (screen.width >= 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }
                            }

                            if (nombreArmario == '4 CUERPO TIPO 2') {
                                if (screen.width < 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }

                                if (screen.width >= 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }
                            }

                            if (nombreArmario == '4 CUERPO TIPO 3') {
                                if (screen.width < 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }

                                if (screen.width >= 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }
                            }

                            if (nombreArmario == '5 CUERPO TIPO 1') {
                                if (screen.width < 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }

                                if (screen.width >= 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }
                            }

                            if (nombreArmario == '5 CUERPO TIPO 2') {
                                if (screen.width < 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }

                                if (screen.width >= 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }
                            }

                            if (nombreArmario == '5 CUERPO TIPO 3') {
                                if (screen.width < 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;width: 335px !important;float: left !important;left: -20px !important;margin-left: 5% !important;margin-top: 50%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }

                                if (screen.width >= 800) {
                                    $('#cuerpo' + i).append(
                                        '<img id="imagenNoDisponible" style="width: 700px;position: absolute;float: left;left: 0;margin-left: 45%;" src="../../../content/images/nodisponible.png">'
                                    );
                                }
                            }

                            if (nombreArmario == '2 PUERTAS') {
                                var interior1 = sesion[1]['interiores'][0];
                                var puerta1 = sesion[1]['puertas'][0];
                                var puerta2 = sesion[1]['puertas'][1];
                                $('#cuerpo' + i).append(
                                    '<div id="izquierda" class="armarioIzquierda" style="margin-left: 520px;margin-top: 110px;float: left;"></div>'
                                );
                                $('#cuerpo' + i).append(
                                    '<div id="derecha" class="armarioDerecha" style="float:left;margin-top:515px;"></div>'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 1;" src="../../../content/images/pruebaarmarios/ARMARIOS/2 PNG/2-1-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );
                                if (screen.width < 800) {
                                    const elem = $('#cuerpo' + i + ' .armarioIzquierda');
                                    elem[0].style.setProperty('margin-left', '30px', 'important');
                                    elem[0].style.setProperty('margin-top', '100px', 'important');
                                    elem[0].style.setProperty('zoom', '70%', 'important');
                                    const elem1 = $('#cuerpo' + i + ' .armarioDerecha');
                                    elem1[0].style.setProperty('margin-left', '0px', 'important');
                                    elem1[0].style.setProperty('margin-top', '480px', 'important');
                                    elem1[0].style.setProperty('zoom', '70%', 'important');
                                    const elem2 = $('#cuerpo' + i);
                                    elem2[0].style.setProperty('height', '670px', 'important');
                                }
                                console.log(puerta1);
                                console.log(puerta2);

                                if (puerta2 != undefined) {
                                    if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/2 PTAS PNG/2-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" id="puertasArmario2puertas" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/2 PTAS PNG/2-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" id="puertasArmario2puertas" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/2 PTAS PNG/2-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" id="puertasArmario2puertas" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/2 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" id="puertasArmario2puertas" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/2 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" id="puertasArmario2puertas" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/2 PTAS PNG/2-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" id="puertasArmario2puertas" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/2 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" id="puertasArmario2puertas" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/2 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" id="puertasArmario2puertas" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/2 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" id="puertasArmario2puertas" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/2 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" id="puertasArmario2puertas" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta1 != undefined) {
                                    if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/2 PTAS PNG/1-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" id="puertasArmario2puertas" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/2 PTAS PNG/1-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" id="puertasArmario2puertas" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/2 PTAS PNG/1-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" id="puertasArmario2puertas" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/2 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" id="puertasArmario2puertas" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/2 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" id="puertasArmario2puertas" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/2 PTAS PNG/1-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" id="puertasArmario2puertas" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/2 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" id="puertasArmario2puertas" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/2 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" id="puertasArmario2puertas" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/2 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" id="puertasArmario2puertas" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/2 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" id="puertasArmario2puertas" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 1;" src="../../../content/images/pruebaarmarios/ARMARIOS/2 PNG/2-1-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );
                            }

                            if (nombreArmario == '3 PUERTAS DERECHA') {
                                var interior1 = sesion[1]['interiores'][0];
                                var interior2 = sesion[1]['interiores'][1];
                                var puerta1 = sesion[1]['puertas'][0];
                                var puerta2 = sesion[1]['puertas'][1];
                                var puerta3 = sesion[1]['puertas'][2];
                                $('#cuerpo' + i).append(
                                    '<div id="izquierda" class="armarioIzquierda" style="margin-left: 530px;margin-top: 80px;float: left;"></div>'
                                );
                                $('#cuerpo' + i).append(
                                    '<div id="derecha" class="armarioDerecha" style="float:left;margin-top:515px;"></div>'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:1;margin-left:0px !important;margin-top:0px !important;" src="../../../content/images/pruebaarmarios/ARMARIOS/3-2 PNG/3-2-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 2;margin-left:0px !important;margin-top:0px !important;" src="../../../content/images/pruebaarmarios/ARMARIOS/3-2 PNG/3-2-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );
                                if (screen.width < 800) {
                                    const elem = $('#cuerpo' + i + ' .armarioIzquierda');
                                    elem[0].style.setProperty('margin-left', '30px', 'important');
                                    elem[0].style.setProperty('margin-top', '100px', 'important');
                                    elem[0].style.setProperty('zoom', '70%', 'important');
                                    const elem1 = $('#cuerpo' + i + ' .armarioDerecha');
                                    elem1[0].style.setProperty('margin-left', '0px', 'important');
                                    elem1[0].style.setProperty('margin-top', '480px', 'important');
                                    elem1[0].style.setProperty('zoom', '70%', 'important');
                                    const elem2 = $('#cuerpo' + i);
                                    elem2[0].style.setProperty('height', '670px', 'important');
                                }

                                if (puerta3 != undefined) {
                                    if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-2 PTAS PNG/3-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-2 PTAS PNG/3-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-2 PTAS PNG/3-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-2 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-2 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-2 PTAS PNG/3-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta2 != undefined) {
                                    if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-2 PTAS PNG/2-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-2 PTAS PNG/2-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-2 PTAS PNG/2-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-2 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-2 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-2 PTAS PNG/2-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-2 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-2 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-2 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-2 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta1 != undefined) {
                                    if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-2 PTAS PNG/1-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;opacity:0.4;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-2 PTAS PNG/1-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;opacity:0.4;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-2 PTAS PNG/1-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-2 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-2 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-2 PTAS PNG/1-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-2 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-2 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-2 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/3-2 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:1;" src="../../../content/images/pruebaarmarios/ARMARIOS/3-2 PNG/3-2-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index:2;" src="../../../content/images/pruebaarmarios/ARMARIOS/3-2 PNG/3-2-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );
                            }

                            if (nombreArmario == '4 PUERTAS - 2 HUECOS GRANDES') {
                                var interior1 = sesion[1]['interiores'][0];
                                var interior2 = sesion[1]['interiores'][1];
                                var puerta1 = sesion[1]['puertas'][0];
                                var puerta2 = sesion[1]['puertas'][1];
                                var puerta3 = sesion[1]['puertas'][2];
                                var puerta4 = sesion[1]['puertas'][3];

                                $('#cuerpo' + i).append(
                                    '<div id="izquierda" class="armarioIzquierda" style="margin-left: 470px;margin-top: 50px;float: left;"></div>'
                                );
                                $('#cuerpo' + i).append(
                                    '<div id="derecha" class="armarioDerecha" style="float:left;margin-top:475px;"></div>'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:2;" src="../../../content/images/pruebaarmarios/ARMARIOS/4-1 PNG/4-1-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 1;" src="../../../content/images/pruebaarmarios/ARMARIOS/4-1 PNG/4-1-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );

                                if (screen.width < 800) {
                                    const elem = $('#cuerpo' + i + ' .armarioIzquierda');
                                    elem[0].style.setProperty('margin-left', '30px', 'important');
                                    elem[0].style.setProperty('margin-top', '100px', 'important');
                                    elem[0].style.setProperty('zoom', '70%', 'important');
                                    const elem1 = $('#cuerpo' + i + ' .armarioDerecha');
                                    elem1[0].style.setProperty('margin-left', '0px', 'important');
                                    elem1[0].style.setProperty('margin-top', '480px', 'important');
                                    elem1[0].style.setProperty('zoom', '70%', 'important');
                                    const elem2 = $('#cuerpo' + i);
                                    elem2[0].style.setProperty('height', '670px', 'important');
                                }

                                if (puerta2 != undefined) {
                                    if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/2-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/2-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/2-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/2-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src =
                                            '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src =
                                            '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src =
                                            '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src =
                                            '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta1 != undefined) {
                                    if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/1-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/1-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/1-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/1-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta3 != undefined) {
                                    if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/3-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/3-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/3-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/3-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta4 != undefined) {
                                    if (puerta4['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/4-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/4-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/4-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/4-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4 PTA CEN/PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img  style="position:absolute;width: 400px !important;height: 400px !important;z-index:101" src="../../../content/images/pruebaarmarios/ARMARIOS/4-1 PNG/4-1-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img  style="position:absolute;width: 400px !important;height: 400px !important;z-index:100" src="../../../content/images/pruebaarmarios/ARMARIOS/4-1 PNG/4-1-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );
                            }

                            if (nombreArmario == '4 PUERTAS ASIMETRICAS') {
                                var interior1 = sesion[1]['interiores'][0];
                                var interior2 = sesion[1]['interiores'][1];
                                var interior3 = sesion[1]['interiores'][2];
                                var puerta4 = sesion[1]['puertas'][3];
                                var puerta1 = sesion[1]['puertas'][0];
                                var puerta2 = sesion[1]['puertas'][1];
                                var puerta3 = sesion[1]['puertas'][2];
                                $('#cuerpo' + i).append(
                                    '<div id="izquierda" class="armarioIzquierda" style="margin-left: 470px;margin-top: 110px;float: left;"></div>'
                                );
                                $('#cuerpo' + i).append(
                                    '<div id="derecha" class="armarioDerecha" style="float:left;margin-top:515px;"></div>'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:2" src="../../../content/images/pruebaarmarios/ARMARIOS/4-2 PNG/4-2-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 1;" src="../../../content/images/pruebaarmarios/ARMARIOS/4-2 PNG/4-2-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:0;"  src="../../../content/images/pruebaarmarios/ARMARIOS/4-2 PNG/4-2-C-' +
                                        interior3['nombre'] +
                                        '.png">'
                                );

                                if (screen.width < 800) {
                                    const elem = $('#cuerpo' + i + ' .armarioIzquierda');
                                    elem[0].style.setProperty('margin-left', '30px', 'important');
                                    elem[0].style.setProperty('margin-top', '100px', 'important');
                                    elem[0].style.setProperty('zoom', '70%', 'important');
                                    const elem1 = $('#cuerpo' + i + ' .armarioDerecha');
                                    elem1[0].style.setProperty('margin-left', '0px', 'important');
                                    elem1[0].style.setProperty('margin-top', '480px', 'important');
                                    elem1[0].style.setProperty('zoom', '70%', 'important');
                                    const elem2 = $('#cuerpo' + i);
                                    elem2[0].style.setProperty('height', '670px', 'important');
                                }
                                if (puerta2 != undefined) {
                                    if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/2-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/2-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/2-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/2-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta1 != undefined) {
                                    if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/1-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/1-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/1-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/1-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta3 != undefined) {
                                    if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/3-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/3-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/3-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/3-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta4 != undefined) {
                                    if (puerta4['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/4-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/4-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/4-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/4-2 PTAS PNG/4-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:2" src="../../../content/images/pruebaarmarios/ARMARIOS/4-2 PNG/4-2-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 1;" src="../../../content/images/pruebaarmarios/ARMARIOS/4-2 PNG/4-2-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:0;" src="../../../content/images/pruebaarmarios/ARMARIOS/4-2 PNG/4-2-C-' +
                                        interior3['nombre'] +
                                        '.png">'
                                );
                            }

                            if (nombreArmario == '5 PUERTAS CENTRAL') {
                                var interior3 = sesion[1]['interiores'][2];
                                var puerta4 = sesion[1]['puertas'][3];
                                var puerta5 = sesion[1]['puertas'][4];
                                var interior1 = sesion[1]['interiores'][0];
                                var interior2 = sesion[1]['interiores'][1];
                                var puerta1 = sesion[1]['puertas'][0];
                                var puerta2 = sesion[1]['puertas'][1];
                                var puerta3 = sesion[1]['puertas'][2];
                                $('#cuerpo' + i).append(
                                    '<div id="izquierda" class="armarioIzquierda" style="margin-left: 530px;margin-top: 110px;float: left;"></div>'
                                );
                                $('#cuerpo' + i).append(
                                    '<div id="derecha" class="armarioDerecha" style="float:left;margin-top:515px;"></div>'
                                );
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:1;" src="../../../content/images/pruebaarmarios/ARMARIOS/5-1 PNG/5-1-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 2;" src="../../../content/images/pruebaarmarios/ARMARIOS/5-1 PNG/5-1-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 0;" src="../../../content/images/pruebaarmarios/ARMARIOS/5-1 PNG/5-1-C-' +
                                        interior3['nombre'] +
                                        '.png">'
                                );
                                if (screen.width < 800) {
                                    const elem = $('#cuerpo' + i + ' .armarioIzquierda');
                                    elem[0].style.setProperty('margin-left', '30px', 'important');
                                    elem[0].style.setProperty('margin-top', '100px', 'important');
                                    elem[0].style.setProperty('zoom', '70%', 'important');
                                    const elem1 = $('#cuerpo' + i + ' .armarioDerecha');
                                    elem1[0].style.setProperty('margin-left', '0px', 'important');
                                    elem1[0].style.setProperty('margin-top', '480px', 'important');
                                    elem1[0].style.setProperty('zoom', '70%', 'important');
                                    const elem2 = $('#cuerpo' + i);
                                    elem2[0].style.setProperty('height', '670px', 'important');
                                }

                                if (puerta3 != undefined) {
                                    if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/3-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/3-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/3-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/3-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta2 != undefined) {
                                    if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/2-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/2-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/2-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/2-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta1 != undefined) {
                                    if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/1-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/1-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/1-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/1-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta5 != undefined) {
                                    if (puerta5['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/5-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta5['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/5-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta5['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/5-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/5-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/5-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/5-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/5-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/5-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta5['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/5-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/5-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta4 != undefined) {
                                    if (puerta4['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/4-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/4-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/4-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/4-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-1 PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:1;" src="../../../content/images/pruebaarmarios/ARMARIOS/5-1 PNG/5-1-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index:2;" src="../../../content/images/pruebaarmarios/ARMARIOS/5-1 PNG/5-1-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index:0;" src="../../../content/images/pruebaarmarios/ARMARIOS/5-1 PNG/5-1-C-' +
                                        interior3['nombre'] +
                                        '.png">'
                                );
                            }

                            if (nombreArmario == '7 PUERTA ASIMETRICAS') {
                                var interior3 = sesion[1]['interiores'][2];
                                var interior4 = sesion[1]['interiores'][3];
                                var puerta4 = sesion[1]['puertas'][3];
                                var puerta5 = sesion[1]['puertas'][4];
                                var interior1 = sesion[1]['interiores'][0];
                                var interior2 = sesion[1]['interiores'][1];
                                var puerta1 = sesion[1]['puertas'][0];
                                var puerta2 = sesion[1]['puertas'][1];
                                var puerta3 = sesion[1]['puertas'][2];
                                var puerta6 = sesion[1]['puertas'][5];
                                var puerta7 = sesion[1]['puertas'][6];

                                $('#cuerpo' + i).append(
                                    '<div id="izquierda" class="armarioIzquierda" style="margin-left: 455px;margin-top: 90px;float: left;zoom:110%;"></div>'
                                );
                                $('#cuerpo' + i).append(
                                    '<div id="derecha" class="armarioDerecha" style="float:left;margin-top:450px;zoom:110%;"></div>'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:2;" src="../../../content/images/pruebaarmarios/ARMARIOS/7-1 PNG/7-1-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 3;" src="../../../content/images/pruebaarmarios/ARMARIOS/7-1 PNG/7-1-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 1;" src="../../../content/images/pruebaarmarios/ARMARIOS/7-1 PNG/7-1-C-' +
                                        interior3['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 0;" src="../../../content/images/pruebaarmarios/ARMARIOS/7-1 PNG/7-1-D-' +
                                        interior4['nombre'] +
                                        '.png">'
                                );
                                if (screen.width < 800) {
                                    const elem = $('#cuerpo' + i + ' .armarioIzquierda');
                                    elem[0].style.setProperty('margin-left', '30px', 'important');
                                    elem[0].style.setProperty('margin-top', '100px', 'important');
                                    elem[0].style.setProperty('zoom', '70%', 'important');
                                    const elem1 = $('#cuerpo' + i + ' .armarioDerecha');
                                    elem1[0].style.setProperty('margin-left', '0px', 'important');
                                    elem1[0].style.setProperty('margin-top', '480px', 'important');
                                    elem1[0].style.setProperty('zoom', '70%', 'important');
                                    const elem2 = $('#cuerpo' + i);
                                    elem2[0].style.setProperty('height', '670px', 'important');
                                }

                                if (puerta3 != undefined) {
                                    if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/3-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/3-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/3-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/3-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta2 != undefined) {
                                    if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/2-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/2-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/2-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/2-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta1 != undefined) {
                                    if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/1-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/1-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/1-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/1-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta5 != undefined) {
                                    if (puerta5['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/5-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta5['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/5-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta5['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/5-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/5-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/5-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/5-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/5-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/5-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta5['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/5-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/5-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta4 != undefined) {
                                    if (puerta4['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/4-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/4-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/4-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/4-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta7 != undefined) {
                                    if (puerta7['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/7-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta7['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/7-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta7['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/7-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/7-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/7-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/7-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/7-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/7-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta7['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/7-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/7-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta6 != undefined) {
                                    if (puerta6['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/6-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta6['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/6-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta6['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/6-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/6-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/6-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/6-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/6-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/6-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta6['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/6-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-1 PTAS PNG/6-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:2;" src="../../../content/images/pruebaarmarios/ARMARIOS/7-1 PNG/7-1-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index:3;" src="../../../content/images/pruebaarmarios/ARMARIOS/7-1 PNG/7-1-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index:1;" src="../../../content/images/pruebaarmarios/ARMARIOS/7-1 PNG/7-1-C-' +
                                        interior3['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index:0;" src="../../../content/images/pruebaarmarios/ARMARIOS/7-1 PNG/7-1-D-' +
                                        interior4['nombre'] +
                                        '.png">'
                                );
                            }

                            if (nombreArmario == '5 PUERTAS IZQUIERDA') {
                                var interior1 = sesion[1]['interiores'][0];
                                var interior2 = sesion[1]['interiores'][1];
                                var interior3 = sesion[1]['interiores'][2];
                                var puerta1 = sesion[1]['puertas'][0];
                                var puerta2 = sesion[1]['puertas'][1];
                                var puerta3 = sesion[1]['puertas'][2];
                                var puerta4 = sesion[1]['puertas'][3];
                                var puerta5 = sesion[1]['puertas'][4];

                                $('#cuerpo' + i).append(
                                    '<div id="izquierda" class="armarioIzquierda" style="margin-left: 530px;margin-top: 110px;float: left;"></div>'
                                );
                                $('#cuerpo' + i).append(
                                    '<div id="derecha" class="armarioDerecha" style="float:left;margin-top:515px;"></div>'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:2" src="../../../content/images/pruebaarmarios/ARMARIOS/5-2 PNG/5-2-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 1;" src="../../../content/images/pruebaarmarios/ARMARIOS/5-2 PNG/5-2-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 0;" src="../../../content/images/pruebaarmarios/ARMARIOS/5-2 PNG/5-2-C-' +
                                        interior3['nombre'] +
                                        '.png">'
                                );

                                if (screen.width < 800) {
                                    const elem = $('#cuerpo' + i + ' .armarioIzquierda');
                                    elem[0].style.setProperty('margin-left', '30px', 'important');
                                    elem[0].style.setProperty('margin-top', '100px', 'important');
                                    elem[0].style.setProperty('zoom', '70%', 'important');
                                    const elem1 = $('#cuerpo' + i + ' .armarioDerecha');
                                    elem1[0].style.setProperty('margin-left', '0px', 'important');
                                    elem1[0].style.setProperty('margin-top', '480px', 'important');
                                    elem1[0].style.setProperty('zoom', '70%', 'important');
                                    const elem2 = $('#cuerpo' + i);
                                    elem2[0].style.setProperty('height', '670px', 'important');
                                }

                                console.log(puerta1);
                                console.log(puerta2);
                                console.log(puerta3);
                                if (puerta1 != undefined) {
                                    if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/1-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/1-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/1-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/1-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta2 != undefined) {
                                    if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/2-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/2-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/2-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/2-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta3 != undefined) {
                                    if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/3-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/3-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/3-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/3-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta4 != undefined) {
                                    if (puerta4['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/4-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/4-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/4-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/4-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta5 != undefined) {
                                    if (puerta5['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/5-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta5['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/5-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta5['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/5-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/5-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/5-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/5-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/5-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/5-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta5['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/5-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-2 PTAS PNG/5-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;:height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                //this.mainComponent.puertas4izq(puerta1, puerta2, puerta3, puerta4, puerta5, i);

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:2" src="../../../content/images/pruebaarmarios/ARMARIOS/5-2 PNG/5-2-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 1;" src="../../../content/images/pruebaarmarios/ARMARIOS/5-2 PNG/5-2-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 0;" src="../../../content/images/pruebaarmarios/ARMARIOS/5-2 PNG/5-2-C-' +
                                        interior3['nombre'] +
                                        '.png">'
                                );
                            }

                            if (nombreArmario == '5 PUERTAS DERECHA') {
                                var interior1 = sesion[1]['interiores'][0];
                                var interior2 = sesion[1]['interiores'][1];
                                var interior3 = sesion[1]['interiores'][2];
                                var puerta1 = sesion[1]['puertas'][0];
                                var puerta2 = sesion[1]['puertas'][1];
                                var puerta3 = sesion[1]['puertas'][2];
                                var puerta4 = sesion[1]['puertas'][3];
                                var puerta5 = sesion[1]['puertas'][4];
                                $('#cuerpo' + i).append(
                                    '<div id="izquierda" class="armarioIzquierda" style="margin-left: 530px;margin-top: 110px;float: left;"></div>'
                                );
                                $('#cuerpo' + i).append(
                                    '<div id="derecha" class="armarioDerecha" style="float:left;margin-top:515px;"></div>'
                                );
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:1;" src="../../../content/images/pruebaarmarios/ARMARIOS/5-3 PNG/5-3-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 2;" src="../../../content/images/pruebaarmarios/ARMARIOS/5-3 PNG/5-3-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:0;" src="../../../content/images/pruebaarmarios/ARMARIOS/5-3 PNG/5-3-C-' +
                                        interior3['nombre'] +
                                        '.png">'
                                );

                                if (screen.width < 800) {
                                    const elem = $('#cuerpo' + i + ' .armarioIzquierda');
                                    elem[0].style.setProperty('margin-left', '30px', 'important');
                                    elem[0].style.setProperty('margin-top', '100px', 'important');
                                    elem[0].style.setProperty('zoom', '70%', 'important');
                                    const elem1 = $('#cuerpo' + i + ' .armarioDerecha');
                                    elem1[0].style.setProperty('margin-left', '0px', 'important');
                                    elem1[0].style.setProperty('margin-top', '480px', 'important');
                                    elem1[0].style.setProperty('zoom', '70%', 'important');
                                    const elem2 = $('#cuerpo' + i);
                                    elem2[0].style.setProperty('height', '670px', 'important');
                                }

                                if (puerta5 != undefined) {
                                    if (puerta5['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/5-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta5['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/5-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta5['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/5-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/5-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/5-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/5-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta2 != undefined) {
                                    if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/2-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/2-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/2-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/2-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta1 != undefined) {
                                    if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/1-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/1-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/1-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/1-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta3 != undefined) {
                                    if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/3-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/3-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/3-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/3-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta4 != undefined) {
                                    if (puerta4['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/4-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/4-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/4-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/4-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/5-3 PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                //this.mainComponent.puertas5der(puerta1, puerta2, puerta3, puerta4, puerta5, i);

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute; z-index:1;" src="../../../content/images/pruebaarmarios/ARMARIOS/5-3 PNG/5-3-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index:2;" src="../../../content/images/pruebaarmarios/ARMARIOS/5-3 PNG/5-3-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:0;" src="../../../content/images/pruebaarmarios/ARMARIOS/5-3 PNG/5-3-C-' +
                                        interior3['nombre'] +
                                        '.png">'
                                );
                            }

                            if (nombreArmario == '6 PUERTAS ASIMETRICAS') {
                                var interior1 = sesion[1]['interiores'][0];
                                var interior2 = sesion[1]['interiores'][1];
                                var interior3 = sesion[1]['interiores'][2];
                                var interior4 = sesion[1]['interiores'][3];
                                var puerta1 = sesion[1]['puertas'][0];
                                var puerta2 = sesion[1]['puertas'][1];
                                var puerta3 = sesion[1]['puertas'][2];
                                var puerta4 = sesion[1]['puertas'][3];
                                var puerta5 = sesion[1]['puertas'][4];
                                var puerta6 = sesion[1]['puertas'][5];
                                $('#cuerpo' + i).append(
                                    '<div id="izquierda" class="armarioIzquierda" style="margin-left: 520px;margin-top: 100px;float: left;"></div>'
                                );
                                $('#cuerpo' + i).append(
                                    '<div id="derecha" class="armarioDerecha" style="float:left;margin-top:470px;"></div>'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:3"  src="../../../content/images/pruebaarmarios/ARMARIOS/6-2 PNG/6-2-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index:2" src="../../../content/images/pruebaarmarios/ARMARIOS/6-2 PNG/6-2-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index:1" src="../../../content/images/pruebaarmarios/ARMARIOS/6-2 PNG/6-2-C-' +
                                        interior3['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:0;" src="../../../content/images/pruebaarmarios/ARMARIOS/6-2 PNG/6-2-D-' +
                                        interior4['nombre'] +
                                        '.png">'
                                );
                                if (screen.width < 800) {
                                    const elem = $('#cuerpo' + i + ' .armarioIzquierda');
                                    elem[0].style.setProperty('margin-left', '30px', 'important');
                                    elem[0].style.setProperty('margin-top', '100px', 'important');
                                    elem[0].style.setProperty('zoom', '70%', 'important');
                                    const elem1 = $('#cuerpo' + i + ' .armarioDerecha');
                                    elem1[0].style.setProperty('margin-left', '0px', 'important');
                                    elem1[0].style.setProperty('margin-top', '480px', 'important');
                                    elem1[0].style.setProperty('zoom', '70%', 'important');
                                    const elem2 = $('#cuerpo' + i);
                                    elem2[0].style.setProperty('height', '670px', 'important');
                                }
                                console.log(puerta1);
                                console.log(puerta2);
                                console.log(puerta3);
                                if (puerta1 != undefined) {
                                    if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/1-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/1-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/1-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/1-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }
                                if (puerta6 != undefined) {
                                    if (puerta6['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/6-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta6['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/6-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta6['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/6-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/6-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/6-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/6-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta2 != undefined) {
                                    if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/2-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/2-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/2-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/2-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta3 != undefined) {
                                    if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/3-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/3-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/3-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/3-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta4 != undefined) {
                                    if (puerta4['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/4-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/4-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/4-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/4-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta5 != undefined) {
                                    if (puerta5['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/5-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta5['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/5-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta5['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/5-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/5-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/5-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/5-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/5-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/5-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta5['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/5-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-2 PTAS PNG/5-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                //this.mainComponent.armario6asi(puerta1, puerta2, puerta3, puerta4, puerta5, puerta6, i);
                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:3" src="../../../content/images/pruebaarmarios/ARMARIOS/6-2 PNG/6-2-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index:2;" src="../../../content/images/pruebaarmarios/ARMARIOS/6-2 PNG/6-2-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index:1;" src="../../../content/images/pruebaarmarios/ARMARIOS/6-2 PNG/6-2-C-' +
                                        interior3['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:0" src="../../../content/images/pruebaarmarios/ARMARIOS/6-2 PNG/6-2-D-' +
                                        interior4['nombre'] +
                                        '.png">'
                                );
                            }

                            if (nombreArmario == '7 PUERTAS IZQUIERDA') {
                                var interior1 = sesion[1]['interiores'][0];
                                var interior2 = sesion[1]['interiores'][1];
                                var interior3 = sesion[1]['interiores'][2];
                                var interior4 = sesion[1]['interiores'][3];
                                var puerta1 = sesion[1]['puertas'][0];
                                var puerta2 = sesion[1]['puertas'][1];
                                var puerta3 = sesion[1]['puertas'][2];
                                var puerta4 = sesion[1]['puertas'][3];
                                var puerta5 = sesion[1]['puertas'][4];
                                var puerta6 = sesion[1]['puertas'][5];
                                var puerta7 = sesion[1]['puertas'][6];

                                $('#cuerpo' + i).append(
                                    '<div id="izquierda" class="armarioIzquierda" style="margin-left: 455px;margin-top: 90px;float: left;zoom:110%;"></div>'
                                );
                                $('#cuerpo' + i).append(
                                    '<div id="derecha" class="armarioDerecha" style="float:left;margin-top:450px;zoom:110%;"></div>'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:3" src="../../../content/images/pruebaarmarios/ARMARIOS/7-2 PNG/7-2-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 2;" src="../../../content/images/pruebaarmarios/ARMARIOS/7-2 PNG/7-2-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 1;" src="../../../content/images/pruebaarmarios/ARMARIOS/7-2 PNG/7-2-C-' +
                                        interior3['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 0;" src="../../../content/images/pruebaarmarios/ARMARIOS/7-2 PNG/7-2-D-' +
                                        interior4['nombre'] +
                                        '.png">'
                                );
                                if (screen.width < 800) {
                                    const elem = $('#cuerpo' + i + ' .armarioIzquierda');
                                    elem[0].style.setProperty('margin-left', '30px', 'important');
                                    elem[0].style.setProperty('margin-top', '100px', 'important');
                                    elem[0].style.setProperty('zoom', '70%', 'important');
                                    const elem1 = $('#cuerpo' + i + ' .armarioDerecha');
                                    elem1[0].style.setProperty('margin-left', '0px', 'important');
                                    elem1[0].style.setProperty('margin-top', '480px', 'important');
                                    elem1[0].style.setProperty('zoom', '70%', 'important');
                                    const elem2 = $('#cuerpo' + i);
                                    elem2[0].style.setProperty('height', '670px', 'important');
                                }
                                console.log(puerta1);
                                console.log(puerta2);
                                console.log(puerta3);
                                if (puerta1 != undefined) {
                                    if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/1-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/1-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/1-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/1-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta2 != undefined) {
                                    if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/2-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/2-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/2-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/2-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta3 != undefined) {
                                    if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/3-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/3-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/3-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/3-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta4 != undefined) {
                                    if (puerta4['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/4-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/4-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/4-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/4-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta5 != undefined) {
                                    if (puerta5['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/5-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta5['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/5-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta5['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/5-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/5-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/5-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/5-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/5-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/5-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta5['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/5-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/5-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta6 != undefined) {
                                    if (puerta6['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/6-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta6['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/6-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta6['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/6-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/6-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/6-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/6-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/6-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/6-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta6['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/6-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/6-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta7 != undefined) {
                                    if (puerta7['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/7-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta7['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/7-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta7['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/7-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/7-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/7-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/7-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/7-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/7-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta7['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/7-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-2 PTAS PNG/7-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                //this.mainComponent.armario7izq(puerta1, puerta2, puerta3, puerta4, puerta5, puerta6, puerta7, i);

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:3" src="../../../content/images/pruebaarmarios/ARMARIOS/7-2 PNG/7-2-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 2;" src="../../../content/images/pruebaarmarios/ARMARIOS/7-2 PNG/7-2-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 1;" src="../../../content/images/pruebaarmarios/ARMARIOS/7-2 PNG/7-2-C-' +
                                        interior3['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 0;" src="../../../content/images/pruebaarmarios/ARMARIOS/7-2 PNG/7-2-D-' +
                                        interior4['nombre'] +
                                        '.png">'
                                );
                            }

                            if (nombreArmario == '7 PUERTAS DERECHA') {
                                var interior1 = sesion[1]['interiores'][0];
                                var interior2 = sesion[1]['interiores'][1];
                                var interior3 = sesion[1]['interiores'][2];
                                var interior4 = sesion[1]['interiores'][3];
                                var puerta1 = sesion[1]['puertas'][6];
                                var puerta2 = sesion[1]['puertas'][0];
                                var puerta3 = sesion[1]['puertas'][1];
                                var puerta4 = sesion[1]['puertas'][2];
                                var puerta5 = sesion[1]['puertas'][3];
                                var puerta6 = sesion[1]['puertas'][4];
                                var puerta7 = sesion[1]['puertas'][5];
                                $('#cuerpo' + i).append(
                                    '<div id="izquierda" class="armarioIzquierda" style="margin-left: 455px;margin-top: 90px;float: left;zoom:110%;"></div>'
                                );
                                $('#cuerpo' + i).append(
                                    '<div id="derecha" class="armarioDerecha" style="float:left;margin-top:450px;zoom:110%;"></div>'
                                );
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:3;" src="../../../content/images/pruebaarmarios/ARMARIOS/7-3 PNG/7-3-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 2;" src="../../../content/images/pruebaarmarios/ARMARIOS/7-3 PNG/7-3-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 1;" src="../../../content/images/pruebaarmarios/ARMARIOS/7-3 PNG/7-3-C-' +
                                        interior3['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 0;" src="../../../content/images/pruebaarmarios/ARMARIOS/7-3 PNG/7-3-D-' +
                                        interior4['nombre'] +
                                        '.png">'
                                );
                                if (screen.width < 800) {
                                    const elem = $('#cuerpo' + i + ' .armarioIzquierda');
                                    elem[0].style.setProperty('margin-left', '30px', 'important');
                                    elem[0].style.setProperty('margin-top', '100px', 'important');
                                    elem[0].style.setProperty('zoom', '70%', 'important');
                                    const elem1 = $('#cuerpo' + i + ' .armarioDerecha');
                                    elem1[0].style.setProperty('margin-left', '0px', 'important');
                                    elem1[0].style.setProperty('margin-top', '480px', 'important');
                                    elem1[0].style.setProperty('zoom', '70%', 'important');
                                    const elem2 = $('#cuerpo' + i);
                                    elem2[0].style.setProperty('height', '670px', 'important');
                                }
                                if (puerta1 != undefined) {
                                    if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/7-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/7-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/7-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/7-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/7-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/7-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta2 != undefined) {
                                    if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/1-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/1-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/1-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/1-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta3 != undefined) {
                                    if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/2-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/2-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/2-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/2-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta4 != undefined) {
                                    if (puerta4['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/3-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/3-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/3-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/3-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta5 != undefined) {
                                    if (puerta5['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/4-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta5['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/4-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta5['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/4-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/4-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta5['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta6 != undefined) {
                                    if (puerta6['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/5-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta6['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/5-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta6['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/5-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/5-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/5-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/5-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/5-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/5-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta6['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/5-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/5-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta7 != undefined) {
                                    if (puerta7['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/6-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta7['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/6-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta7['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/6-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/6-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400pxposition:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/6-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/6-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/6-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/6-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta7['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/6-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/7-3 PTAS PNG/6-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:3;" src="../../../content/images/pruebaarmarios/ARMARIOS/7-3 PNG/7-3-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 2;" src="../../../content/images/pruebaarmarios/ARMARIOS/7-3 PNG/7-3-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 1;" src="../../../content/images/pruebaarmarios/ARMARIOS/7-3 PNG/7-3-C-' +
                                        interior3['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 0;" src="../../../content/images/pruebaarmarios/ARMARIOS/7-3 PNG/7-3-D-' +
                                        interior4['nombre'] +
                                        '.png">'
                                );
                            }

                            if (nombreArmario == '6 PUERTAS -3 HUECOS GRANDES') {
                                var interior1 = sesion[1]['interiores'][0];
                                var interior2 = sesion[1]['interiores'][1];
                                var interior3 = sesion[1]['interiores'][2];
                                var puerta2 = sesion[1]['puertas'][0];
                                var puerta3 = sesion[1]['puertas'][1];
                                var puerta4 = sesion[1]['puertas'][2];
                                var puerta5 = sesion[1]['puertas'][3];
                                var puerta6 = sesion[1]['puertas'][4];
                                var puerta7 = sesion[1]['puertas'][5];
                                $('#cuerpo' + i).append(
                                    '<div id="izquierda" class="armarioIzquierda" style="margin-left: 700px;margin-top: 100px;float: left;"></div>'
                                );
                                $('#cuerpo' + i).append(
                                    '<div id="derecha" class="armarioDerecha" style="float:left;margin-top:470px;"></div>'
                                );
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 1;" src="../../../content/images/pruebaarmarios/ARMARIOS/6-1 PNG/6-1-C-' +
                                        interior3['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 3;" src="../../../content/images/pruebaarmarios/ARMARIOS/6-1 PNG/6-1-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 2" src="../../../content/images/pruebaarmarios/ARMARIOS/6-1 PNG/6-1-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );
                                if (screen.width < 800) {
                                    const elem = $('#cuerpo' + i + ' .armarioIzquierda');
                                    elem[0].style.setProperty('margin-left', '30px', 'important');
                                    elem[0].style.setProperty('margin-top', '100px', 'important');
                                    elem[0].style.setProperty('zoom', '70%', 'important');
                                    const elem1 = $('#cuerpo' + i + ' .armarioDerecha');
                                    elem1[0].style.setProperty('margin-left', '0px', 'important');
                                    elem1[0].style.setProperty('margin-top', '480px', 'important');
                                    elem1[0].style.setProperty('zoom', '70%', 'important');
                                    const elem2 = $('#cuerpo' + i);
                                    elem2[0].style.setProperty('height', '670px', 'important');
                                }
                                if (puerta2 != undefined) {
                                    if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/1-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/1-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/1-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/1-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta3 != undefined) {
                                    if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/2-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/2-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/2-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/2-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta4 != undefined) {
                                    if (puerta4['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/3-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/3-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/3-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/3-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta5 != undefined) {
                                    if (puerta5['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/4-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta5['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/4-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta5['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/4-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/4-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta5['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta6 != undefined) {
                                    if (puerta6['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/5-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta6['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/5-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta6['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/5-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/5-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/5-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/5-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/5-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/5-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta6['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/5-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/5-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta7 != undefined) {
                                    if (puerta7['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/6-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta7['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/6-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta7['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/6-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/6-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/6-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5; src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/6-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/6-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/6-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta7['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/6-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/6-1 PTAS PNG/6-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px !important;height:400px !important;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    //this.mainComponent.puertas6sim(puerta2, puerta3, puerta4, puerta5, puerta6, puerta7, i);
                                    $('#cuerpo' + i + ' #izquierda').append(
                                        '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 3;" src="../../../content/images/pruebaarmarios/ARMARIOS/6-1 PNG/6-1-A-' +
                                            interior1['nombre'] +
                                            '.png">'
                                    );
                                    $('#cuerpo' + i + ' #izquierda').append(
                                        '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 2;" src="../../../content/images/pruebaarmarios/ARMARIOS/6-1 PNG/6-1-B-' +
                                            interior2['nombre'] +
                                            '.png">'
                                    );
                                    $('#cuerpo' + i + ' #izquierda').append(
                                        '<img class="puertas3Izquierda"  style="width:400px !important;height:400px !important;position:absolute;z-index: 1;" src="../../../content/images/pruebaarmarios/ARMARIOS/6-1 PNG/6-1-C-' +
                                            interior3['nombre'] +
                                            '.png">'
                                    );
                                }
                            }

                            if (nombreArmario == '8 PUERTAS ASIMETRICAS') {
                                var interior1 = sesion[1]['interiores'][0];
                                var interior2 = sesion[1]['interiores'][1];
                                var interior3 = sesion[1]['interiores'][2];
                                var interior4 = sesion[1]['interiores'][3];
                                var puerta2 = sesion[1]['puertas'][0];
                                var puerta3 = sesion[1]['puertas'][1];
                                var puerta4 = sesion[1]['puertas'][2];
                                var puerta5 = sesion[1]['puertas'][3];
                                var puerta6 = sesion[1]['puertas'][4];
                                var puerta7 = sesion[1]['puertas'][5];
                                var puerta8 = sesion[1]['puertas'][6];
                                var puerta9 = sesion[1]['puertas'][7];

                                $('#cuerpo' + i).append(
                                    '<div id="izquierda" class="armarioIzquierda" style="margin-left: 505px;margin-top: 20px;float: left;"></div>'
                                );
                                $('#cuerpo' + i).append(
                                    '<div id="derecha" class="armarioDerecha" style="float:left;margin-top:280px;"></div>'
                                );
                                $('#cuerpo' + i).css({ height: '0px' });

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px;height:400px;position:absolute;z-index: 1;" src="../../../content/images/pruebaarmarios/ARMARIOS/8 PNG/8-1-C-' +
                                        interior3['nombre'] +
                                        '.png">'
                                );

                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px;height:400px;position:absolute;z-index: 3;" src="../../../content/images/pruebaarmarios/ARMARIOS/8 PNG/8-1-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px;height:400px;position:absolute;z-index: 2;" src="../../../content/images/pruebaarmarios/ARMARIOS/8 PNG/8-1-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertas3Izquierda"  style="width:400px;height:400px;position:absolute;z-index: 0;"src="../../../content/images/pruebaarmarios/ARMARIOS/8 PNG/8-1-D-' +
                                        interior4['nombre'] +
                                        '.png">'
                                );

                                if (screen.width < 800) {
                                    const elem = $('#cuerpo' + i + ' .armarioIzquierda');
                                    elem[0].style.setProperty('margin-left', '12px', 'important');
                                    elem[0].style.setProperty('margin-top', '0px', 'important');
                                    const elem1 = $('#cuerpo' + i + ' .armarioDerecha');
                                    elem1[0].style.setProperty('margin-left', '12px', 'important');
                                    elem1[0].style.setProperty('margin-top', '270px', 'important');
                                    const elem2 = $('#cuerpo' + i);
                                    elem2[0].style.setProperty('height', '670px', 'important');
                                }

                                if (puerta2 != undefined) {
                                    if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/1-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/1-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/1-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/1-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/1-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/1-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta3 != undefined) {
                                    if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/2-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/2-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/2-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/2-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/2-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta3['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta3['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/2-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta4 != undefined) {
                                    if (puerta4['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/3-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/3-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/3-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/3-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/3-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta4['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta4['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/3-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta5 != undefined) {
                                    if (puerta5['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/4-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta5['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/4-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta5['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/4-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/4-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/4-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta5['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta5['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/4-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta6 != undefined) {
                                    if (puerta6['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/5-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta6['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/5-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta6['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/5-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/5-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/5-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/5-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/5-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/5-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta6['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/5-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta6['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/5-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta7 != undefined) {
                                    if (puerta7['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/6-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta7['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/6-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta7['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/6-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/6-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/6-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/6-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/6-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/6-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta7['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/6-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta7['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/6-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta8 != undefined) {
                                    if (puerta8['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/7-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta8['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/7-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta8['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/7-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta8['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/7-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta8['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/7-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta8['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/7-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta8['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/7-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta8['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/7-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta8['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/7-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta8['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/7-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                if (puerta9 != undefined) {
                                    if (puerta9['nombre'] == 'Puerta Aluminio Transparente') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/8-A.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta9['nombre'] == 'Puerta Aluminio Gris') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/8-B.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta9['nombre'] == 'Puerta Batiente sin tirador') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/8-C.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta9['nombre'] == 'Puerta Batiente tirador TIM') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/8-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta9['nombre'] == 'Puerta Batiente tirador NYE') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/8-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta9['nombre'] == 'Puerta Batiente tirador DRAW') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/8-F.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta9['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/8-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta9['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/8-D.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }

                                    if (puerta9['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/8-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                    if (puerta9['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                        var src = '../../../content/images/pruebaarmarios/ARMARIOS/8 PTAS PNG/8-E.png';
                                        $('#cuerpo' + i + ' #derecha').append(
                                            '<img class="armarioCalculadora" style="width:400px;height:400px;position:absolute;z-index:5;" src="' +
                                                src +
                                                '">'
                                        );
                                    }
                                }

                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px;height:400px;position:absolute;z-index: 3;" src="../../../content/images/pruebaarmarios/ARMARIOS/8 PNG/8-1-A-' +
                                        interior1['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px;height:400px;position:absolute;z-index: 2;" src="../../../content/images/pruebaarmarios/ARMARIOS/8 PNG/8-1-B-' +
                                        interior2['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px;height:400px;position:absolute;z-index: 1;" src="../../../content/images/pruebaarmarios/ARMARIOS/8 PNG/8-1-C-' +
                                        interior3['nombre'] +
                                        '.png">'
                                );
                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img class="puertas3Izquierda"  style="width:400px;height:400px;position:absolute;z-index: 0;" src="../../../content/images/pruebaarmarios/ARMARIOS/8 PNG/8-1-D-' +
                                        interior4['nombre'] +
                                        '.png">'
                                );
                            }

                            $('#modalCesta .modal-body').append(
                                '<div style="float: left;width: 100%;margin-top: 50%;" id="textoCesta' + i + '"></div>'
                            );
                            $('#textoCesta' + i).append(
                                '<p id="texto1Arm" style="letter-spacing: 1px;font-weight: 300;margin-left:28%;"><span style="font-weight:600">' +
                                    sesion[1]['productosDormitorio']['nombre'].toUpperCase() +
                                    '</span><i id="precioArm" style="float:right;margin-right:40%;font-weight:600">TOTAL: ' +
                                    sesion[1]['todoSumadoPrecio'] +
                                    ' pp</i></p>'
                            );
                            if (nombreArmario == '1 CUERPO TIPO 1') {
                                $('#textoCesta' + i).css({ 'margin-top': '20%' });
                            }
                            if (nombreArmario == '1 CUERPO TIPO 2') {
                                $('#textoCesta' + i).css({ 'margin-top': '20%' });
                            }
                            if (nombreArmario == '1 CUERPO TIPO 3') {
                                $('#textoCesta' + i).css({ 'margin-top': '20%' });
                            }
                            if (nombreArmario == '2 CUERPO TIPO 1') {
                                $('#textoCesta' + i).css({ 'margin-top': '20%' });
                            }
                            if (nombreArmario == '2 CUERPO TIPO 2') {
                                $('#textoCesta' + i).css({ 'margin-top': '20%' });
                            }
                            if (nombreArmario == '2 CUERPO TIPO 3') {
                                $('#textoCesta' + i).css({ 'margin-top': '20%' });
                            }
                            if (nombreArmario == '3 CUERPO TIPO 1') {
                                $('#textoCesta' + i).css({ 'margin-top': '20%' });
                            }
                            if (nombreArmario == '3 CUERPO TIPO 2') {
                                $('#textoCesta' + i).css({ 'margin-top': '20%' });
                            }
                            if (nombreArmario == '3 CUERPO TIPO 3') {
                                $('#textoCesta' + i).css({ 'margin-top': '20%' });
                            }
                            if (nombreArmario == '4 CUERPO TIPO 1') {
                                $('#textoCesta' + i).css({ 'margin-top': '20%' });
                            }
                            if (nombreArmario == '4 CUERPO TIPO 2') {
                                $('#textoCesta' + i).css({ 'margin-top': '20%' });
                            }
                            if (nombreArmario == '4 CUERPO TIPO 3') {
                                $('#textoCesta' + i).css({ 'margin-top': '20%' });
                            }
                            if (nombreArmario == '5 CUERPO TIPO 1') {
                                $('#textoCesta' + i).css({ 'margin-top': '20%' });
                            }
                            if (nombreArmario == '5 CUERPO TIPO 2') {
                                $('#textoCesta' + i).css({ 'margin-top': '20%' });
                            }
                            if (nombreArmario == '5 CUERPO TIPO 3') {
                                $('#textoCesta' + i).css({ 'margin-top': '20%' });
                            }
                            $('#textoCesta' + i).append(
                                '<p id="texto1Arm" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;"><span style="font-weight:600">Codigo</span>: ' +
                                    sesion[1]['codigo'] +
                                    '<i id="precioTdoLoOtro" style="float:right;margin-right:40%">+ ' +
                                    sesion[1]['precioCasco'] +
                                    ' pp</i></p>'
                            );
                            $('#textoCesta' + i).append(
                                '<p id="texto1Arm" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;"><span style="font-weight:600">Ancho:</span> ' +
                                    sesion[1]['ancho'] +
                                    '</p>'
                            );
                            $('#textoCesta' + i).append(
                                '<p id="texto1Arm" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;"><span style="font-weight:600">Alto</span>: ' +
                                    sesion[1]['alto'] +
                                    '</p>'
                            );
                            $('#textoCesta' + i).append(
                                '<p id="texto1Arm" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;"><span style="font-weight:600">Fondo</span>: ' +
                                    sesion[1]['fondo'] +
                                    '</p>'
                            );

                            $('#textoCesta' + i).append(
                                '<p id="texto1Arm" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;"><span style="font-weight:600">Acabado Casco</span>: ' +
                                    sesion[1]['acabadoCasco']['nombre'] +
                                    '</p>'
                            );
                            if (sesion[1]['acabadoTrasera'] != undefined) {
                                $('#textoCesta' + i).append(
                                    '<p id="texto1Arm" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;"><span style="font-weight:600">Acabado Trasera</span>: ' +
                                        sesion[1]['acabadoTrasera']['nombre'] +
                                        '</p>'
                                );
                            }

                            $('#textoCesta' + i).append(
                                '<p id="texto1Arm" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;"><span style="font-weight:600">Acabado Interiores</span>: ' +
                                    sesion[1]['acabadoInterior']['nombre'] +
                                    '</p>'
                            );
                            if (sesion[1]['acabadoTirador'] != undefined) {
                                $('#textoCesta' + i).append(
                                    '<p id="texto1Arm" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;"><span style="font-weight:600">Acabado Tirador</span>: ' +
                                        sesion[1]['acabadoTirador']['nombre'] +
                                        '</p>'
                                );
                            }
                            if (sesion[1]['interiores'] != undefined) {
                                for (let w = 0; w < sesion[1]['interiores']['length']; w++) {
                                    $('#textoCesta' + i).append(
                                        '<p id="texto1Arm" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;"><span style="font-weight:600">Interior ' +
                                            (w + 1) +
                                            '</span>: ' +
                                            sesion[1]['interiores'][w]['nombre'] +
                                            '<i id="precioTdoLoOtro" style="float:right;margin-right:40%">+ ' +
                                            sesion[1]['interiores'][w]['precio'] +
                                            ' pp</i></p>'
                                    );
                                }
                            }
                            if (sesion[1]['puertas'] != undefined) {
                                for (let w = 0; w < sesion[1]['puertas']['length']; w++) {
                                    $('#textoCesta' + i).append(
                                        '<p id="texto1Arm" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;"><span style="font-weight:600">Puerta ' +
                                            (w + 1) +
                                            '</span>: ' +
                                            sesion[1]['puertas'][w]['nombre'] +
                                            '<i id="precioTdoLoOtro" style="float:right;margin-right:40%">+ ' +
                                            sesion[1]['puertas'][w]['precio'] +
                                            ' pp</i></p>'
                                    );
                                    for (let k = 0; k < 5; k++) {
                                        if (sesion[1]['puertas'][w]['acabado' + k] != undefined) {
                                            $('#textoCesta' + i).append(
                                                '<p id="texto1Arm" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;"><span style="font-weight:600">Plafon ' +
                                                    (k + 1) +
                                                    '</span>: ' +
                                                    sesion[1]['puertas'][w]['acabado' + k]['nombre'] +
                                                    '</p>'
                                            );
                                        }
                                    }
                                }
                            }

                            if (sesion[1]['niveladores'] != undefined) {
                                $('#textoCesta' + i).append(
                                    '<p id="texto1Arm" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;"><span style="font-weight:600">Niveladores</span>: SI <i id="precioTdoLoOtro" style="float:right;margin-right:40%">+ ' +
                                        sesion[1]['niveladores']['precio'] +
                                        ' pp</i></p>'
                                );
                            } else {
                                $('#textoCesta' + i).append(
                                    '<p id="texto1Arm" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;"><span style="font-weight:600">Niveladores</span>: Sin niveladores</p>'
                                );
                            }
                            if (sesion[1]['cajeado'] != undefined) {
                                $('#textoCesta' + i).append(
                                    '<p id="texto1Arm" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;"><span style="font-weight:600">Cajeado</span>: ' +
                                        sesion[1]['cajeado']['tipo'] +
                                        '<i id="precioTdoLoOtro" style="float:right;margin-right:40%">+ ' +
                                        sesion[1]['cajeado']['precio'] +
                                        ' pp</i></p>'
                                );
                                if (sesion[1]['cajeado']['medA'] != undefined) {
                                    $('#textoCesta' + i).append(
                                        '<p id="texto1Arm" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;"><span style="font-weight:600">Cajeado Medida A</span>: ' +
                                            sesion[1]['cajeado']['medA'] +
                                            '</p>'
                                    );
                                }
                                if (sesion[1]['cajeado']['medB'] != undefined) {
                                    $('#textoCesta' + i).append(
                                        '<p id="texto1Arm" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;"><span style="font-weight:600">Cajeado Medida B</span>: ' +
                                            sesion[1]['cajeado']['medB'] +
                                            '</p>'
                                    );
                                }
                                if (sesion[1]['cajeado']['medC'] != undefined) {
                                    $('#textoCesta' + i).append(
                                        '<p id="texto1Arm" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;"><span style="font-weight:600">Cajeado Medida C</span>: ' +
                                            sesion[1]['cajeado']['medC'] +
                                            '</p>'
                                    );
                                }
                            } else {
                                $('#textoCesta' + i).append(
                                    '<p id="texto1Arm" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;"><span style="font-weight:600">Cajeado:</span> Sin cajeado</p>'
                                );
                            }
                            if (nombreArmario != '2 PUERTAS CORREDERA' && nombreArmario != '3 PUERTAS CORREDERA') {
                                if (sesion[1]['enmarcado'] != undefined) {
                                    $('#textoCesta' + i).append(
                                        '<p id="texto1Arm" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;"><span style="font-weight:600">Enmarcado:</span> ' +
                                            sesion[1]['enmarcado']['codigo'] +
                                            '<i id="precioTdoLoOtro" style="float:right;margin-right:40%">+ ' +
                                            sesion[1]['enmarcado']['precio'] +
                                            ' pp</i></p>'
                                    );
                                    if (sesion[1]['enmarcado']['medA'] != undefined) {
                                        $('#textoCesta' + i).append(
                                            '<p id="texto1Arm" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;"><span style="font-weight:600">Enmarcado Medida A</span>: ' +
                                                sesion[1]['enmarcado']['medA'] +
                                                '</p>'
                                        );
                                    }
                                    if (sesion[1]['enmarcado']['medB'] != undefined) {
                                        $('#textoCesta' + i).append(
                                            '<p id="texto1Arm" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;"><span style="font-weight:600">Enmarcado Medida B</span>: ' +
                                                sesion[1]['enmarcado']['medB'] +
                                                '</p>'
                                        );
                                    }
                                    if (sesion[1]['enmarcado']['medC'] != undefined) {
                                        $('#textoCesta' + i).append(
                                            '<p id="texto1Arm" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;"><span style="font-weight:600">Enmarcado Medida C</span>: ' +
                                                sesion[1]['enmarcado']['medC'] +
                                                '</p>'
                                        );
                                    }
                                } else {
                                    $('#textoCesta' + i).append(
                                        '<p id="texto1Arm" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;"><span style="font-weight:600">Enmarcado:</span> Sin enmarcado</p>'
                                    );
                                }
                            }
                            var cestaTodo = parseFloat($('#cestaTotal').text());

                            if ($('#cestaTotal').text() == '') {
                                cestaTodo = 0;
                            }
                            cestaTodo = cestaTodo + parseFloat(sesion[1]['todoSumadoPrecio']);

                            $('#cestaTotal').text(cestaTodo.toFixed(2));
                            $('#textoCesta' + i).append(
                                '<p id="textoeliminarprod" style="letter-spacing: 1px;font-weight: 300;font-size: 16px;text-align: center;"><span onclick="borrarProdCesta(' +
                                    i +
                                    ')" style=""><a><u>ELIMINAR</u></a></span> </p>'
                            );
                            $('#textoCesta' + i).append('<hr style="100%"></hr>');
                        }

                        if (sesion[1]['productosDormitorio']['categoriasDormi']['id'] == 32) {
                            $('#modalCesta .modal-body').append(
                                '<div class="primerDivPresu" style="margin-top:50px;float:left;width:100%;margin-bottom:40px;" id="esteDiv' +
                                    i +
                                    '"></div>'
                            );
                            $('#modalCesta .modal-body #esteDiv' + i).append(
                                '<div style="float: left;width: 500px;text-align: center;height:300px;position:relative;float: left;width: 40%;margin-left: 100px;height: 333px;" id="cuerpo' +
                                    i +
                                    '"></div>'
                            );
                            $('#cuerpo' + i).append('<div id="izquierda"  style="float: left;margin-top:20px"></div>');
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img id="imagenPresupues" style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;;max-width:410px;max-height:410px;position:absolute;top:-10px" width="1000px" height="1000px" src="../../../content/images/1- PARA WEB/DORMITORIO2/PROPIO.jpg">'
                            );
                            $('#modalCesta .modal-body #esteDiv' + i).append(
                                '<div style="float: right;width: 40%;" id="textoCesta' + i + '"></div>'
                            );
                            if (sesion[1]['puntosDisenoPropio'] != undefined) {
                                $('#textoCesta' + i).append(
                                    '<p id="nombreMueble" style="letter-spacing: 1px;font-weight: 300;margin-left: 28%;"><strong style="font-weight: 600;">DISEÑO PROPIO</strong><i id="precioMueble" style="float:right;margin-right:40%"><span id="precioTodoProd' +
                                        i +
                                        '"><strong style="font-weight: 600;">TOTAL: ' +
                                        sesion[1]['puntosDisenoPropio'] +
                                        '</strong></span><strong style="font-weight:600"> pp </strong></i></p>'
                                );
                                var precioTotalCesta;
                                precioTotalCesta = $('#cestaTotal').text();
                                if (precioTotalCesta != '') {
                                    var cogerPrecio = parseFloat(sesion[1]['puntosDisenoPropio']);
                                    precioTotalCesta = parseFloat(precioTotalCesta);
                                    precioTotalCesta = cogerPrecio + precioTotalCesta;
                                    $('#cestaTotal').text(precioTotalCesta);
                                } else {
                                    var cogerPrecio = parseFloat(sesion[1]['puntosDisenoPropio']);
                                    $('#cestaTotal').text(cogerPrecio);
                                }
                            } else {
                                $('#textoCesta' + i).append(
                                    '<p id="nombreMueble" style="letter-spacing: 1px;font-weight: 300;margin-left: 28%;"><strong style="font-weight: 600;">DISEÑO PROPIO</strong><i id="precioMueble" style="float:right;margin-right:40%"><span id="precioTodoProd' +
                                        i +
                                        '"><strong style="font-weight: 600;">TOTAL: PENDIENTE</strong></span></i></p>'
                                );
                            }
                            if (sesion[1]['arrayArchivos'] != undefined) {
                                $('#textoCesta' + i).append(
                                    '<p id="anchoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Archivos Adjuntos:</span></p>'
                                );
                                for (let z = 0; z < sesion[1]['arrayArchivos'].length; z++) {
                                    $('#textoCesta' + i).append(
                                        '<p id="anchoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span>' +
                                            sesion[1]['arrayArchivos'][z] +
                                            '</span></p>'
                                    );
                                }
                            }
                            if (sesion[1]['descripcion'] != undefined) {
                                $('#textoCesta' + i).append(
                                    '<p id="anchoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Decripcion:</span> ' +
                                        sesion[1]['descripcion'] +
                                        '</p>'
                                );
                            }
                            $('#textoCesta' + i).append(
                                '<p id="textoeliminarprod" style="letter-spacing: 1px;font-weight: 300;font-size: 16px;margin-left: 28%;"><span onclick="borrarProdCesta(' +
                                    i +
                                    ')" style=""><a><u>ELIMINAR</u></a></span> </p>'
                            );
                        }
                    } else {
                        $('#modalCesta .modal-body').append(
                            '<div class="primerDivPresu" style="margin-top:50px;float:left;width:100%;margin-bottom:40px;" id="esteDiv' +
                                i +
                                '"></div>'
                        );
                        $('#modalCesta .modal-body #esteDiv' + i).append(
                            '<div style="float: left;width: 500px;text-align: center;height:300px;position:relative;float: left;width: 40%;margin-left: 100px;height: 333px;" id="cuerpo' +
                                i +
                                '"></div>'
                        );
                        contAca = 0;
                        for (let j = 1; j < 15; j++) {
                            if (sesion[1]['acabado' + j] != undefined) {
                                acabados[contAca] = sesion[1]['acabado' + j]['nombre'];
                                contAca++;
                            }
                        }
                        console.log(nombre);

                        contAca = 1;
                        $('#cuerpo' + i).append('<div id="izquierda"  style="float: left;margin-top:20px"></div>');
                        //class="marginIzquierda"
                        $('#modalCesta .modal-body #esteDiv' + i).append(
                            '<div style="float: right;width: 40%;" id="textoCesta' + i + '"></div>'
                        );
                        if (i != 1) {
                            var elem1 = $('#cuerpo' + i);
                            elem1[0].style.setProperty('margin-top', '6%', 'important');
                            var elem2 = $('#textoCesta' + i);
                            elem2[0].style.setProperty('margin-top', '6%', 'important');
                        }
                        var saberlo = JSON.parse(sessionStorage.getItem('seccionPrecios'));
                        if (saberlo != 'A') {
                            $('#textoCesta' + i).append(
                                '<p id="nombreMueble" style="letter-spacing: 1px;font-weight: 300;margin-left: 28%;"><strong style="font-weight: 600;">' +
                                    sesion[1]['productosDormitorio']['nombre'].toUpperCase() +
                                    '</strong><i id="precioMueble" style="float:right;margin-right:40%"><span id="precioTodoProd' +
                                    i +
                                    '"><strong style="font-weight: 600;">TOTAL: ' +
                                    sesion[1]['todoSumadoPrecio'] +
                                    '</strong></span><strong style="font-weight: 600;"> pp </strong></i></p>'
                            );
                        } else {
                            $('#textoCesta' + i).append(
                                '<p id="nombreMueble" style="letter-spacing: 1px;font-weight: 300;margin-left: 28%;"><strong style="font-weight: 600;">' +
                                    sesion[1]['productosDormitorio']['nombre'].toUpperCase() +
                                    '</strong><i id="precioMueble" style="float:right;margin-right:40%"><span id="precioTodoProd' +
                                    i +
                                    '"><strong style="font-weight: 600;">TOTAL: ' +
                                    sesion[1]['todoSumadoPrecio'] +
                                    '</strong></span><strong style="font-weight:600"> pp </strong></i></p>'
                            );
                        }
                        if (sesion[1]['productosDormitorio']['categoriasDormi']['id'] != 31) {
                            $('#textoCesta' + i).append(
                                '<p id="codigoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Codigo:</span> ' +
                                    sesion[1]['mensaje'] +
                                    '</p>'
                            );
                        }
                        if (sesion[1]['mensajeEspecial'] != undefined) {
                            if (sesion[1]['mensajeEspecial'] == 'Ancho especial') {
                                $('#textoCesta' + i).append(
                                    '<p id="anchoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Ancho Especial:</span> ' +
                                        sesion[1]['ancho'] +
                                        '</p>'
                                );
                                $('#textoCesta' + i).append(
                                    '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Incremento Especial: +30%</span></p>'
                                );
                            }
                        } else {
                            $('#textoCesta' + i).append(
                                '<p id="anchoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Ancho:</span> ' +
                                    sesion[1]['ancho'] +
                                    '</p>'
                            );
                        }

                        var nombreCargarImagen;
                        if (sesion[1]['productosDormitorio']['id'] == 277) {
                            nombreCargarImagen = 'NT007-NT022';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 275) {
                            nombreCargarImagen = 'NT001-NT004';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 276) {
                            nombreCargarImagen = 'NT005-NT006';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 278) {
                            nombreCargarImagen = 'NT023-NT038';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 279) {
                            nombreCargarImagen = 'NT039-NT054';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 280) {
                            nombreCargarImagen = 'NT055-NT070';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 281) {
                            nombreCargarImagen = 'NT071-NT078';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 246) {
                            nombreCargarImagen = 'NT079-NT094';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 413) {
                            nombreCargarImagen = 'NT079-NT094';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 282) {
                            nombreCargarImagen = 'NT095-NT110';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 414) {
                            nombreCargarImagen = 'NT095-NT110';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 247) {
                            nombreCargarImagen = 'NT111-NT115';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 249) {
                            nombreCargarImagen = 'NT116-NT123';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 250) {
                            nombreCargarImagen = 'NT116-NT123';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 248) {
                            nombreCargarImagen = 'NT124-NT143';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 251) {
                            nombreCargarImagen = 'NT144-NT148';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 253) {
                            nombreCargarImagen = 'NT149-NT156';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 254) {
                            nombreCargarImagen = 'NT149-NT156';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 252) {
                            nombreCargarImagen = 'NT157-NT176';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 255) {
                            nombreCargarImagen = 'NT177-NT181';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 257) {
                            nombreCargarImagen = 'NT182-NT185';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 258) {
                            nombreCargarImagen = 'NT186-NT189';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 256) {
                            nombreCargarImagen = 'NT190-NT209';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 259) {
                            nombreCargarImagen = 'NT210-NT211';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 261) {
                            nombreCargarImagen = 'NT212-NT219';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 262) {
                            nombreCargarImagen = 'NT212-NT219';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 260) {
                            nombreCargarImagen = 'NT220-NT227';
                        }

                        if (sesion[1]['productosDormitorio']['id'] == 263) {
                            nombreCargarImagen = 'NT228-NT229';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 266) {
                            nombreCargarImagen = 'NT230-NT237';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 265) {
                            nombreCargarImagen = 'NT230-NT237';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 264) {
                            nombreCargarImagen = 'NT238-NT245';
                        }

                        if (sesion[1]['productosDormitorio']['id'] == 271) {
                            nombreCargarImagen = 'NT246-NT250';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 274) {
                            nombreCargarImagen = 'NT251-NT258';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 273) {
                            nombreCargarImagen = 'NT251-NT258';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 272) {
                            nombreCargarImagen = 'NT259-NT278';
                        }

                        if (sesion[1]['productosDormitorio']['id'] == 267) {
                            nombreCargarImagen = 'NT279-NT280';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 269) {
                            nombreCargarImagen = 'NT281-NT288';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 270) {
                            nombreCargarImagen = 'NT281-NT288';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 268) {
                            nombreCargarImagen = 'NT289-NT296';
                        }

                        if (sesion[1]['productosDormitorio']['id'] == 283) {
                            nombreCargarImagen = 'NT297-NT314';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 284) {
                            nombreCargarImagen = 'NT315-NT332';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 285) {
                            nombreCargarImagen = 'NT333-NT350';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 1) {
                            nombreCargarImagen = 'NX001-NX004';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 2) {
                            nombreCargarImagen = 'NX005-NX008';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 3) {
                            nombreCargarImagen = 'NX009-NX012';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 4) {
                            nombreCargarImagen = 'NX013-NX016';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 5) {
                            nombreCargarImagen = 'NX017-NX020';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 6) {
                            nombreCargarImagen = 'NX021-NX024';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 7) {
                            nombreCargarImagen = 'NX025-NX028';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 8) {
                            nombreCargarImagen = 'NX029-NX032';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 9) {
                            nombreCargarImagen = 'NX033-NX036';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 10) {
                            nombreCargarImagen = 'NX037-NX040';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 11) {
                            nombreCargarImagen = 'NX041-NX044';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 12) {
                            nombreCargarImagen = 'NX045-NX048';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 13) {
                            nombreCargarImagen = 'NX049-NX052';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 229) {
                            nombreCargarImagen = 'NX053';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 238) {
                            nombreCargarImagen = 'NX054-NH057';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 239) {
                            nombreCargarImagen = 'NX058-NX061';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 240) {
                            nombreCargarImagen = 'NX062-NX065';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 241) {
                            nombreCargarImagen = 'NX066-NX069';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 242) {
                            nombreCargarImagen = 'NX070';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 243) {
                            nombreCargarImagen = 'NX071';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 244) {
                            nombreCargarImagen = 'NX072';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 245) {
                            nombreCargarImagen = 'NX073';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 230) {
                            nombreCargarImagen = 'NX074';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 231) {
                            nombreCargarImagen = 'NX075';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 232) {
                            nombreCargarImagen = 'NX076';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 233) {
                            nombreCargarImagen = 'NX077';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 234) {
                            nombreCargarImagen = 'NX078';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 235) {
                            nombreCargarImagen = 'NX079';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 236) {
                            nombreCargarImagen = 'NX080';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 237) {
                            nombreCargarImagen = 'NX081';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 107) {
                            nombreCargarImagen = 'NH001-NH006';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 410) {
                            nombreCargarImagen = 'NH007-NH010';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 108) {
                            nombreCargarImagen = 'NH011-NH014';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 109) {
                            nombreCargarImagen = 'NH015-NH016';
                        }

                        if (sesion[1]['productosDormitorio']['id'] == 295) {
                            nombreCargarImagen = 'NH017-NH018';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 296) {
                            nombreCargarImagen = 'NH019-NH020';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 111) {
                            nombreCargarImagen = 'NH021-NH024';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 110) {
                            nombreCargarImagen = 'NH025-NH028';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 113) {
                            nombreCargarImagen = 'NH029-NH032';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 112) {
                            nombreCargarImagen = 'NH033-NH036';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 114) {
                            nombreCargarImagen = 'NH037-NH041';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 116) {
                            nombreCargarImagen = 'NH042-NH045';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 115) {
                            nombreCargarImagen = 'NH046-NH049';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 298) {
                            nombreCargarImagen = 'NH050-NH051';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 297) {
                            nombreCargarImagen = 'NH052-NH053';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 118) {
                            nombreCargarImagen = 'NH054-NH057';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 117) {
                            nombreCargarImagen = 'NH058-NH061';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 119) {
                            nombreCargarImagen = 'NH062-NH066';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 299) {
                            nombreCargarImagen = 'NH067-NH069';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 301) {
                            nombreCargarImagen = 'NH070-NH071';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 300) {
                            nombreCargarImagen = 'NH072-NH073';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 302) {
                            nombreCargarImagen = 'NH074-NH077';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 334) {
                            nombreCargarImagen = 'NH078-NH079';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 303) {
                            nombreCargarImagen = 'NH080-NH081';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 14) {
                            nombreCargarImagen = 'NH082-NH083';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 304) {
                            nombreCargarImagen = 'NH084';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 53) {
                            nombreCargarImagen = 'NH085';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 305) {
                            nombreCargarImagen = 'NH086-NH088';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 62) {
                            nombreCargarImagen = 'NH089-NH091';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 306) {
                            nombreCargarImagen = 'NH092-NH094';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 63) {
                            nombreCargarImagen = 'NH095-NH097';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 307) {
                            nombreCargarImagen = 'NH098-NH100';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 64) {
                            nombreCargarImagen = 'NH101-NH103';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 308) {
                            nombreCargarImagen = 'NH104-NH106';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 65) {
                            nombreCargarImagen = 'NH107-NH109';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 308) {
                            nombreCargarImagen = 'NH104-NH106';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 65) {
                            nombreCargarImagen = 'NH107-NH109';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 309) {
                            nombreCargarImagen = 'NH110-NH112';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 66) {
                            nombreCargarImagen = 'NH113-NH115';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 310) {
                            nombreCargarImagen = 'NH116-NH118';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 67) {
                            nombreCargarImagen = 'NH119-NH121';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 311) {
                            nombreCargarImagen = 'NH122-NH124';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 68) {
                            nombreCargarImagen = 'NH125-NH127';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 312) {
                            nombreCargarImagen = 'NH128';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 69) {
                            nombreCargarImagen = 'NH129';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 336) {
                            nombreCargarImagen = 'NH130-NH131';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 335) {
                            nombreCargarImagen = 'NH132-NH133';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 338) {
                            nombreCargarImagen = 'NH134';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 337) {
                            nombreCargarImagen = 'NH135';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 171) {
                            nombreCargarImagen = 'NH136';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 172) {
                            nombreCargarImagen = 'NH137';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 173) {
                            nombreCargarImagen = 'NH138';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 73) {
                            nombreCargarImagen = 'NH139-NH140';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 72) {
                            nombreCargarImagen = 'NH141-NH142';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 75) {
                            nombreCargarImagen = 'NH143';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 74) {
                            nombreCargarImagen = 'NH144';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 87) {
                            nombreCargarImagen = 'NH145';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 86) {
                            nombreCargarImagen = 'NH146';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 77) {
                            nombreCargarImagen = 'NH147';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 76) {
                            nombreCargarImagen = 'NH148';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 313) {
                            nombreCargarImagen = 'NH149';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 78) {
                            nombreCargarImagen = 'NH150';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 314) {
                            nombreCargarImagen = 'NH151';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 79) {
                            nombreCargarImagen = 'NH152';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 92) {
                            nombreCargarImagen = 'NH153';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 319) {
                            nombreCargarImagen = 'NH154';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 320) {
                            nombreCargarImagen = 'NH156';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 85) {
                            nombreCargarImagen = 'NH157';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 73) {
                            nombreCargarImagen = 'NH158-NH159';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 72) {
                            nombreCargarImagen = 'NH160-NH161';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 75) {
                            nombreCargarImagen = 'NH162';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 74) {
                            nombreCargarImagen = 'NH163';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 87) {
                            nombreCargarImagen = 'NH164';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 86) {
                            nombreCargarImagen = 'NH165';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 77) {
                            nombreCargarImagen = 'NH166';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 76) {
                            nombreCargarImagen = 'NH167';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 325) {
                            nombreCargarImagen = 'NH168';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 324) {
                            nombreCargarImagen = 'NH169';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 327) {
                            nombreCargarImagen = 'NH170';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 326) {
                            nombreCargarImagen = 'NH171';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 317) {
                            nombreCargarImagen = 'NH172';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 82) {
                            nombreCargarImagen = 'NH173';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 318) {
                            nombreCargarImagen = 'NH174';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 83) {
                            nombreCargarImagen = 'NH175';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 321) {
                            nombreCargarImagen = 'NH176';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 90) {
                            nombreCargarImagen = 'NH177';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 92) {
                            nombreCargarImagen = 'NH178';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 320) {
                            nombreCargarImagen = 'NH179';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 85) {
                            nombreCargarImagen = 'NH180';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 329) {
                            nombreCargarImagen = 'NH181';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 328) {
                            nombreCargarImagen = 'NH182';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 340) {
                            nombreCargarImagen = 'NH183';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 339) {
                            nombreCargarImagen = 'NH184';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 73) {
                            nombreCargarImagen = 'NH185';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 72) {
                            nombreCargarImagen = 'NH186';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 77) {
                            nombreCargarImagen = 'NH187';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 76) {
                            nombreCargarImagen = 'NH188';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 89) {
                            nombreCargarImagen = 'NH189';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 88) {
                            nombreCargarImagen = 'NH190';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 322) {
                            nombreCargarImagen = 'NH191';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 91) {
                            nombreCargarImagen = 'NH192';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 315) {
                            nombreCargarImagen = 'NH193';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 322) {
                            nombreCargarImagen = 'NH191';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 80) {
                            nombreCargarImagen = 'NH194';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 316) {
                            nombreCargarImagen = 'NH195';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 81) {
                            nombreCargarImagen = 'NH196';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 174) {
                            nombreCargarImagen = 'NH197';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 175) {
                            nombreCargarImagen = 'NH198';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 176) {
                            nombreCargarImagen = 'NH199';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 18) {
                            nombreCargarImagen = 'NH200-NH210';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 408) {
                            nombreCargarImagen = 'NH200-NH210';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 17) {
                            nombreCargarImagen = 'NH211-NH229';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 404) {
                            nombreCargarImagen = 'NH230';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 405) {
                            nombreCargarImagen = 'NH231';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 406) {
                            nombreCargarImagen = 'NH232';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 407) {
                            nombreCargarImagen = 'NH233';
                        }

                        if (sesion[1]['productosDormitorio']['id'] == 177) {
                            nombreCargarImagen = 'NH234-NH235';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 178) {
                            nombreCargarImagen = 'NH236-NH240';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 179) {
                            nombreCargarImagen = 'NH241-NH245';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 159) {
                            nombreCargarImagen = 'NH246';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 158) {
                            nombreCargarImagen = 'NH247';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 161) {
                            nombreCargarImagen = 'NH248';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 160) {
                            nombreCargarImagen = 'NH249';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 163) {
                            nombreCargarImagen = 'NH250';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 162) {
                            nombreCargarImagen = 'NH251';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 159) {
                            nombreCargarImagen = 'NH252';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 158) {
                            nombreCargarImagen = 'NH253';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 331) {
                            nombreCargarImagen = 'NH254';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 330) {
                            nombreCargarImagen = 'NH255';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 161) {
                            nombreCargarImagen = 'NH256';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 160) {
                            nombreCargarImagen = 'NH257';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 165) {
                            nombreCargarImagen = 'NH258';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 164) {
                            nombreCargarImagen = 'NH259';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 159) {
                            nombreCargarImagen = 'NH260-NH262';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 158) {
                            nombreCargarImagen = 'NH263-NH265';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 331) {
                            nombreCargarImagen = 'NH266';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 330) {
                            nombreCargarImagen = 'NH267';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 167) {
                            nombreCargarImagen = 'NH268';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 166) {
                            nombreCargarImagen = 'NH269';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 169) {
                            nombreCargarImagen = 'NH270';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 168) {
                            nombreCargarImagen = 'NH271';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 170) {
                            nombreCargarImagen = 'NH272';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 167) {
                            nombreCargarImagen = 'NH273';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 166) {
                            nombreCargarImagen = 'NH274';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 159) {
                            nombreCargarImagen = 'NH275';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 158) {
                            nombreCargarImagen = 'NH276';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 331) {
                            nombreCargarImagen = 'NH277';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 330) {
                            nombreCargarImagen = 'NH278';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 180) {
                            nombreCargarImagen = 'NH279-NH280';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 181) {
                            nombreCargarImagen = 'NH281-NH282';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 182) {
                            nombreCargarImagen = 'NH283';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 183) {
                            nombreCargarImagen = 'NH284';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 181) {
                            nombreCargarImagen = 'NH285-NH286';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 183) {
                            nombreCargarImagen = 'NH287';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 182) {
                            nombreCargarImagen = 'NH288';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 184) {
                            nombreCargarImagen = 'NH289-NH293';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 185) {
                            nombreCargarImagen = 'NH294-NH298';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 186) {
                            nombreCargarImagen = 'NH299-NH303';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 188) {
                            nombreCargarImagen = 'NH304-NH308';
                        }

                        if (sesion[1]['productosDormitorio']['id'] == 187) {
                            nombreCargarImagen = 'NH309-NH313';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 189) {
                            nombreCargarImagen = 'NH314-NH318';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 194) {
                            nombreCargarImagen = 'NH319-NH320';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 190) {
                            nombreCargarImagen = 'NH321-NH322';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 195) {
                            nombreCargarImagen = 'NH323-NH324';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 191) {
                            nombreCargarImagen = 'NH325-NH326';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 196) {
                            nombreCargarImagen = 'NH327-NH331';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 200) {
                            nombreCargarImagen = 'NH332-NH336';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 192) {
                            nombreCargarImagen = 'NH337-NH341';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 198) {
                            nombreCargarImagen = 'NH342-NH346';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 197) {
                            nombreCargarImagen = 'NH347-NH351';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 201) {
                            nombreCargarImagen = 'NH352-NH356';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 193) {
                            nombreCargarImagen = 'NH357-NH361';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 199) {
                            nombreCargarImagen = 'NH362-NH366';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 202) {
                            nombreCargarImagen = 'NH367-NH371';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 203) {
                            nombreCargarImagen = 'NH372-NH373';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 360) {
                            nombreCargarImagen = 'NH374-NH376';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 361) {
                            nombreCargarImagen = 'NH377-NH379';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 362) {
                            nombreCargarImagen = 'NH380-NH382';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 363) {
                            nombreCargarImagen = 'NH383-NH385';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 364) {
                            nombreCargarImagen = 'NH386-NH388';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 365) {
                            nombreCargarImagen = 'NH389-NH391';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 366) {
                            nombreCargarImagen = 'NH392-NH394';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 367) {
                            nombreCargarImagen = 'NH395-NH397';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 368) {
                            nombreCargarImagen = 'NH398-NH400';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 369) {
                            nombreCargarImagen = 'NH401-NH403';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 370) {
                            nombreCargarImagen = 'NH404-NH406';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 371) {
                            nombreCargarImagen = 'NH407-NH409';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 372) {
                            nombreCargarImagen = 'NH410-NH412';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 373) {
                            nombreCargarImagen = 'NH413-NH415';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 374) {
                            nombreCargarImagen = 'NH416-NH418';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 375) {
                            nombreCargarImagen = 'NH419-NH421';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 352) {
                            nombreCargarImagen = sesion[1]['mensaje'];
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 353) {
                            nombreCargarImagen = sesion[1]['mensaje'];
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 354) {
                            nombreCargarImagen = sesion[1]['mensaje'];
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 355) {
                            nombreCargarImagen = sesion[1]['mensaje'];
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 356) {
                            nombreCargarImagen = sesion[1]['mensaje'];
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 357) {
                            nombreCargarImagen = sesion[1]['mensaje'];
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 358) {
                            nombreCargarImagen = sesion[1]['mensaje'];
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 359) {
                            nombreCargarImagen = sesion[1]['mensaje'];
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 402) {
                            nombreCargarImagen = sesion[1]['mensaje'];
                        }

                        if (sesion[1]['productosDormitorio']['id'] == 203) {
                            nombreCargarImagen = 'NH372-NH373';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 204) {
                            nombreCargarImagen = 'NH455-NH458';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 332) {
                            nombreCargarImagen = 'NH459';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 205) {
                            nombreCargarImagen = 'NH460';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 333) {
                            nombreCargarImagen = 'NH461';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 206) {
                            nombreCargarImagen = 'NH462';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 207) {
                            nombreCargarImagen = 'NH463-NH468';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 208) {
                            nombreCargarImagen = 'NH469-NH474';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 209) {
                            nombreCargarImagen = 'NH475-NH480';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 210) {
                            nombreCargarImagen = 'NH481-NH486';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 211) {
                            nombreCargarImagen = 'NH487-NH492';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 213) {
                            nombreCargarImagen = 'NH493-NH496';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 214) {
                            nombreCargarImagen = 'NH493-NH496';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 215) {
                            nombreCargarImagen = 'NH497-NH500';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 216) {
                            nombreCargarImagen = 'NH497-NH500';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 217) {
                            nombreCargarImagen = 'NH501-NH502';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 218) {
                            nombreCargarImagen = 'NH503';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 219) {
                            nombreCargarImagen = 'NH504';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 220) {
                            nombreCargarImagen = 'NH505';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 221) {
                            nombreCargarImagen = 'NH506';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 223) {
                            nombreCargarImagen = 'NH511';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 222) {
                            nombreCargarImagen = 'NH507-NH510';
                        }

                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img id="imagenPresupues" style="z-index:' +
                                (100 - i) +
                                ';max-width:400px;max-height:400px;;max-width:410px;max-height:410px;position:absolute;top:-10px" width="1000px" height="1000px" src="../../../content/images/1- PARA WEB/DORMITORIO2/' +
                                nombreCargarImagen +
                                '.jpeg">'
                        );

                        var precioTotalCesta;
                        precioTotalCesta = $('#cestaTotal').text();
                        if (precioTotalCesta != '') {
                            var cogerPrecio = parseFloat(sesion[1]['todoSumadoPrecio']);
                            precioTotalCesta = parseFloat(precioTotalCesta);
                            precioTotalCesta = cogerPrecio + precioTotalCesta;
                            $('#cestaTotal').text(precioTotalCesta);
                        } else {
                            var cogerPrecio = parseFloat(sesion[1]['todoSumadoPrecio']);
                            $('#cestaTotal').text(cogerPrecio);
                        }
                        if (sesion[1]['mensajeEspecial'] != undefined) {
                            if (sesion[1]['mensajeEspecial'] == 'Alto especial') {
                                $('#textoCesta' + i).append(
                                    '<p id="altoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Alto especial:</span> ' +
                                        sesion[1]['alto'] +
                                        '</p>'
                                );
                                $('#textoCesta' + i).append(
                                    '<p id="altoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Incremento Especial: +30%</span></p>'
                                );
                            }
                        } else {
                            $('#textoCesta' + i).append(
                                '<p id="altoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Alto:</span> ' +
                                    sesion[1]['alto'] +
                                    '</p>'
                            );
                        }
                        if (sesion[1]['productosDormitorio']['categoriasDormi']['id'] != 31) {
                            if (sesion[1]['mensajeEspecial'] != undefined) {
                                if (sesion[1]['mensajeEspecial'] == 'Alto especial') {
                                    $('#textoCesta' + i).append(
                                        '<p id="fondoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Fondo:</span> ' +
                                            sesion[1]['fondo'] +
                                            '</p>'
                                    );
                                    $('#textoCesta' + i).append(
                                        '<p id="altoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Incremento Especial: +30%</span></p>'
                                    );
                                }
                            } else {
                                $('#textoCesta' + i).append(
                                    '<p id="fondoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Fondo especial:</span> ' +
                                        sesion[1]['fondo'] +
                                        '</p>'
                                );
                            }
                        }
                        if (sesion[1]['productosDormitorio']['categoriasDormi']['id'] == 31) {
                            $('#textoCesta' + i).append(
                                '<p id="fondoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Grosor:</span> ' +
                                    sesion[1]['grosor'] +
                                    '</p>'
                            );
                            $('#textoCesta' + i).append(
                                '<p id="fondoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Canteado:</span> ' +
                                    sesion[1]['canteado'] +
                                    '</p>'
                            );
                        }

                        if (sesion[1]['direccion'] != undefined) {
                            $('#textoCesta' + i).append(
                                '<p id="fondoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Posicion plafones:</span> ' +
                                    sesion[1]['direccion'] +
                                    '</p>'
                            );
                        }

                        for (let o = 0; o < acabados.length; o++) {
                            if (sesion[1]['productosDormitorio']['id'] == 315) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' TAPA :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' CASCO :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' PUERTA SUP IZQ :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 3) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' PUERTA SUP DCH :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 4) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' CUBO :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 5) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' PUERTA CEN :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 6) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' CAJON INF :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            var idProd = sesion[1]['productosDormitorio']['id'];
                            if (idProd == 107) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cajon :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 410) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta Abatible :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 108) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cajon :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 3) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Suplemento :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 109) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta IZQ :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 3) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta DCH :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 295) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta IZQ :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 3) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta CEN :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 4) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta DCH :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 296) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Puerta 1 :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 3) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Puerta 2 :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 4) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Puerta 3 :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 5) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Puerta 4 :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }

                            if (idProd == 111) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta Abatible :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 3) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta DCH :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 110) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta IZQ :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 3) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta Abatible :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 113) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta Abatible :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 3) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta Dch :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 112) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta IZQ :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 3) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta Abatible :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 114) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cajon Sup :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 3) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cajon Inf :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 116) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cajon Sup :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 3) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cajon Inf :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 4) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta Dch :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 115) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta IZQ :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 3) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cajon Sup :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 4) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cajon Inf :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 298) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }

                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            '  Cajon SUP :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 3) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cajon INF :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 4) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta IZQ :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 5) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta DCH :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }

                            if (idProd == 297) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta Izq :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 3) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta Dch :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 4) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cajon Sup :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 5) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cajon Inf :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 118) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cajon Sup :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 3) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cajon Inf :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 4) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta Dch :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 117) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta IZQ :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 3) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cajon SUP :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 4) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cajon INF :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 119) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta Abatible :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 299) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cajon Interior :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 3) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta Abatible :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 301) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cajon Interior :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 3) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta Abatible :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 4) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta Dch :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 300) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta IZQ :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 3) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cajon Interior :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 4) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta Abatible :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }

                            if (idProd == 302) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Costados y suelo :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 3) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cajon Sup :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 4) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cajon Inf :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 171) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cajon Interior :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cristal :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 172) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cajon Interior :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cristal :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 173) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cajon Interior :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cristal :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 174) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta Abatible :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 3) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Interior :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 4) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cajon CEN :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 5) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta INF IZQ :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 6) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta INF DCH :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }

                            if (idProd == 175) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta Abatible :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 3) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Interior :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 176) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cajon IZQ :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 3) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cajon DCH :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 4) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Patas :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }

                            if (idProd == 177) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Trasera :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 178) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 179) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }

                            if (idProd == 159) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 158) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 161) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta IZQ :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta DCH :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 160) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta IZQ :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta DCH :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 163) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }

                            if (idProd == 162) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 331) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 330) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 165) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta IZQ :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta DCH :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 164) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta IZQ :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta DCH :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 167) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta Sup :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta Inf :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 166) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta Sup :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta Inf :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 169) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta Sup :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta Inf :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 168) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta Sup :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta Inf :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 170) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cruceta :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta Sup :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 3) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta Cen :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 4) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta Inf :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }

                            if (idProd == 180) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Estantes :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Trasera :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 181) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Estantes :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Trasera :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 183) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Estantes :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Trasera :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 3) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 182) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Estantes :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Trasera :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 3) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Puerta :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }

                            if (idProd == 204) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 332) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 205) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 333) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 206) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 207) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 208) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 209) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 210) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 211) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }

                            if (idProd == 213) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Patas :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 214) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Patas :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }

                            if (idProd == 21) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Patas :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 216) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Patas :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 217) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 2) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cajones :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }

                            if (idProd == 218) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Patas :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 219) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Patas :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 220) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cubo :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 221) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Casco :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Cubo DCH:</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 222) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Patas :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            if (idProd == 223) {
                                if (o == 0) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Tapa :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                                if (o == 1) {
                                    $('#textoCesta' + i).append(
                                        '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            (o + 1) +
                                            ' Patas :</span> ' +
                                            acabados[o] +
                                            '</p>'
                                    );
                                }
                            }
                            this.mainComponent.funcionNav(idProd, o, acabados, i);
                            if (
                                idProd != 107 &&
                                idProd != 410 &&
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
                                idProd != 414
                            ) {
                                $('#textoCesta' + i).append(
                                    '<p id="acabadoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Acabado ' +
                                        (o + 1) +
                                        '</span>: ' +
                                        acabados[o] +
                                        '</p>'
                                );
                            }
                        }
                        if (saberlo != 'A') {
                            if (sesion[1]['apoyo'] != undefined) {
                                if (sesion[1]['apoyo']['apoyoSecundario'] == undefined) {
                                    $('#textoCesta' + i).append(
                                        '<p id="apoyoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Apoyo:</span> ' +
                                            sesion[1]['apoyo']['productoApoyo']['nombre'] +
                                            '<i id="apoyoPrecioCesta" style="float:right;font-size:15px;margin-right:40%">+ ' +
                                            sesion[1]['apoyo']['precio'] +
                                            ' PP</i></p>'
                                    );
                                } else {
                                    if (sesion[1]['apoyo']['apoyoSecundario'] == 411) {
                                        $('#textoCesta' + i).append(
                                            '<p id="apoyoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Apoyo:</span>Zocalo del mismo ancho del mueble<i id="apoyoPrecioCesta" style="float:right;font-size:15px;margin-right:40%">+ ' +
                                                sesion[1]['apoyo']['precio'] +
                                                ' PP</i></p>'
                                        );
                                    }
                                    if (sesion[1]['apoyo']['apoyoSecundario'] == 412) {
                                        $('#textoCesta' + i).append(
                                            '<p id="apoyoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Apoyo:</span>Bancada del mismo ancho del mueble <i id="apoyoPrecioCesta" style="float:right;font-size:15px;margin-right:40%">+ ' +
                                                sesion[1]['apoyo']['precio'] +
                                                ' PP</i></p>'
                                        );
                                    }
                                }
                            }
                            if (sesion[1]['iluminacion'] != undefined) {
                                $('#textoCesta' + i).append(
                                    '<p id="apoyoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Iluminacion</span>: SI <i id="apoyoPrecioCesta" style="float:right;font-size:15px;margin-right:40%">+ ' +
                                        sesion[1]['iluminacion']['precio'] +
                                        ' PP</i></p>'
                                );
                            }

                            if (sesion[1]['usb'] != undefined) {
                                $('#textoCesta' + i).append(
                                    '<p id="apoyoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                        sesion[1]['usb']['mensaje'] +
                                        '</span>: <i id="apoyoPrecioCesta" style="float:right;font-size:15px;margin-right:40%">+ ' +
                                        sesion[1]['usb']['precio'] +
                                        ' PP</i></p>'
                                );
                            }
                        } else {
                            if (sesion[1]['apoyo'] != undefined) {
                                if (sesion[1]['apoyo']['apoyoSecundario'] == undefined) {
                                    $('#textoCesta' + i).append(
                                        '<p id="apoyoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Apoyo:</span> ' +
                                            sesion[1]['apoyo']['productoApoyo']['nombre'] +
                                            '<i id="apoyoPrecioCesta" style="float:right;font-size:15px;margin-right:40%">+ ' +
                                            sesion[1]['apoyo']['precio'] +
                                            ' PP</i></p>'
                                    );
                                } else {
                                    if (sesion[1]['apoyo']['apoyoSecundario'] == 411) {
                                        $('#textoCesta' + i).append(
                                            '<p id="apoyoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Apoyo:</span>Zocalo del mismo ancho del mueble<i id="apoyoPrecioCesta" style="float:right;font-size:15px;margin-right:40%">+ ' +
                                                sesion[1]['apoyo']['precio'] +
                                                ' PP</i></p>'
                                        );
                                    }
                                    if (sesion[1]['apoyo']['apoyoSecundario'] == 412) {
                                        $('#textoCesta' + i).append(
                                            '<p id="apoyoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Apoyo:</span>Bancada del mismo ancho del mueble <i id="apoyoPrecioCesta" style="float:right;font-size:15px;margin-right:40%">+ ' +
                                                sesion[1]['apoyo']['precio'] +
                                                ' PP</i></p>'
                                        );
                                    }
                                }

                                if (sesion[1]['apoyo']['especial'] != undefined) {
                                    $('#textoCesta' + i).append(
                                        '<p id="apoyoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                            sesion[1]['apoyo']['especial'] +
                                            '</span></p>'
                                    );
                                }
                            }
                            if (sesion[1]['iluminacion'] != undefined) {
                                $('#textoCesta' + i).append(
                                    '<p id="apoyoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Iluminacion</span>: SI <i id="apoyoPrecioCesta" style="float:right;font-size:15px;margin-right:40%">+ ' +
                                        sesion[1]['iluminacion']['precio'] +
                                        ' PP</i></p>'
                                );
                            }
                            if (sesion[1]['usb'] != undefined) {
                                $('#textoCesta' + i).append(
                                    '<p id="apoyoCesta" style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">' +
                                        sesion[1]['usb']['mensaje'] +
                                        '</span>: <i id="apoyoPrecioCesta" style="float:right;font-size:15px;margin-right:40%">+ ' +
                                        sesion[1]['usb']['precio'] +
                                        ' PP</i></p>'
                                );
                            }
                        }
                        if (sesion[1]['obsertext'] != undefined) {
                            $('#textoCesta' + i).append(
                                '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;"><span style="font-weight:600">Observaciones: </span>' +
                                    sesion[1]['obsertext'] +
                                    '</p>'
                            );
                        }

                        $('#textoCesta' + i).append(
                            '<p id="textoeliminarprod" style="letter-spacing: 1px;font-weight: 300;font-size: 16px;margin-left: 28%;"><span onclick="borrarProdCesta(' +
                                i +
                                ')" style=""><a><u>ELIMINAR</u></a></span> </p>'
                        );
                        //$('#textoCesta' + i).append('<hr style="100%"></hr>');
                        acabados = [];
                    }
                } else {
                    if (sesion[1]['productosDormitorio'] != undefined) {
                        console.log(acabados);
                        $('#modalCesta .modal-body').append(
                            '<div style="float: left;width: 500px;text-align: center;height:300px;position:relative" id="cuerpo' +
                                i +
                                '"></div>'
                        );
                        $('#modalCesta .modal-body').append(
                            '<div style="float: left;width: 100%;height:180px:margin-bottom:50px;" id="textoCesta' + i + '"></div>'
                        );
                        var saberlo = JSON.parse(sessionStorage.getItem('seccionPrecios'));
                        if (saberlo != 'A') {
                            $('#textoCesta' + i).append(
                                '<p style="letter-spacing: 1px;font-weight: 300;margin-left: 28%;">' +
                                    sesion[1]['productosDormitorio']['nombre'].toUpperCase() +
                                    '<i style="float:right;margin-right:40%"><span id="precioTodoProd' +
                                    i +
                                    '">' +
                                    sesion[1]['todoSumadoPrecio'] +
                                    '</span> &euro; </i></p>'
                            );
                        } else {
                            $('#textoCesta' + i).append(
                                '<p style="letter-spacing: 1px;font-weight: 300;margin-left: 28%;">' +
                                    sesion[1]['productosDormitorio']['nombre'].toUpperCase() +
                                    '<i style="float:right;margin-right:40%"><span id="precioTodoProd' +
                                    i +
                                    '">' +
                                    sesion[1]['todoSumadoPrecio'] +
                                    '</span> PP </i></p>'
                            );
                        }
                        if (sesion[1]['obsertext'] != undefined) {
                            $('#textoCesta' + i).append(
                                '<p style="letter-spacing: 1px;font-weight: 300;">' + sesion[1]['obsertext'] + '</p>'
                            );
                        }

                        var precioTotalCesta;
                        precioTotalCesta = $('#cestaTotal').text();
                        if (precioTotalCesta != '') {
                            var cogerPrecio = parseFloat(sesion[1]['todoSumadoPrecio']);
                            precioTotalCesta = parseFloat(precioTotalCesta);
                            precioTotalCesta = cogerPrecio + precioTotalCesta;
                            $('#cestaTotal').text(precioTotalCesta);
                        } else {
                            var cogerPrecio = parseFloat(sesion[1]['todoSumadoPrecio']);
                            $('#cestaTotal').text(cogerPrecio);
                        }

                        $('#textoCesta' + i).append(
                            '<p id="textoeliminarprod" style="letter-spacing: 1px;font-weight: 300;font-size: 16px;"><span onclick="borrarProdCesta(' +
                                i +
                                ')" style=""><a><u>ELIMINAR</u></a></span> </p>'
                        );
                        //$('#textoCesta' + i).append('<hr style="100%"></hr>');
                        acabados = [];
                    } else {
                        if (sesion[1]['especial'] == 0) {
                            $('#modalCesta .modal-body').append(
                                '<div style="float: left;width: 500px;text-align: center;height:300px;position:relative" id="cuerpo' +
                                    i +
                                    '"></div>'
                            );

                            $('#cuerpo' + i).append(
                                '<img id="imagenEspecial" style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;;max-width:400px;max-height:250px;position:absolute;top:0px;margin-left:270px" width="1000px" height="1000px" src="../../../content/images/especial.png">'
                            );
                            $('#modalCesta .modal-body').append(
                                '<div style="float: left;width: 100%;height:180px:margin-bottom:50px;" id="textoCesta' + i + '"></div>'
                            );

                            var saberlo = JSON.parse(sessionStorage.getItem('seccionPrecios'));
                            if (saberlo != 'A') {
                                if (screen.width >= 800) {
                                    $('#textoCesta' + i).append(
                                        '<p style="letter-spacing: 1px;font-weight: 300;margin-left: 28%;">Articulo Especial<i style="float:right;margin-right:40%"><span id="precioTodoProd' +
                                            i +
                                            '">' +
                                            sesion[1]['precio'] +
                                            '</span> &euro; </i></p>'
                                    );
                                }
                                if (screen.width < 800) {
                                    $('#textoCesta' + i).append(
                                        '<p style="letter-spacing: 1px;font-weight: 300;text-align:center">Articulo Especial<i style="float:right;margin-right:20%"><span id="precioTodoProd' +
                                            i +
                                            '">' +
                                            sesion[1]['precio'] +
                                            '</span> &euro; </i></p>'
                                    );
                                }
                            } else {
                                if (screen.width >= 800) {
                                    $('#textoCesta' + i).append(
                                        '<p style="letter-spacing: 1px;font-weight: 300;margin-left: 28%;">Articulo Especial<i style="float:right;margin-right:40%"><span id="precioTodoProd' +
                                            i +
                                            '">' +
                                            sesion[1]['precio'] +
                                            '</span> PP </i></p>'
                                    );
                                }
                                if (screen.width < 800) {
                                    $('#textoCesta' + i).append(
                                        '<p style="letter-spacing: 1px;font-weight: 300;text-align:center">Articulo Especial<i style="float:right;margin-right:20%"><span id="precioTodoProd' +
                                            i +
                                            '">' +
                                            sesion[1]['precio'] +
                                            '</span> PP </i></p>'
                                    );
                                }
                            }
                            if (screen.width < 800) {
                                $('#textoCesta' + i).append(
                                    '<p style="letter-spacing: 1px;font-weight: 300;">' + sesion[1]['texto'] + '</p>'
                                );
                                $('#textoCesta' + i).append(
                                    '<p style="letter-spacing: 1px;font-weight: 300;"><a download href="../../../content/images/imagenesSubidas/' +
                                        sesion[1]['imagen'] +
                                        '">Descargar Archivo</a></p>'
                                );
                                $('#textoCesta' + i).css({ 'text-align': 'center' });
                            }
                            if (sesion[1]['obsertext'] != undefined) {
                                $('#textoCesta' + i).append(
                                    '<p style="letter-spacing: 1px;font-weight: 300;margin-left: 28%;">' + sesion[1]['obsertext'] + '</p>'
                                );
                            }

                            if (screen.width >= 800) {
                                $('#textoCesta' + i).append(
                                    '<p style="letter-spacing: 1px;font-weight: 300;margin-left: 28%;">' + sesion[1]['texto'] + '</p>'
                                );
                                $('#textoCesta' + i).append(
                                    '<p style="letter-spacing: 1px;font-weight: 300;margin-left: 28%;"><a download href="../../../content/images/imagenesSubidas/' +
                                        sesion[1]['imagen'] +
                                        '">Descargar Archivo</a></p>'
                                );
                            }

                            var precioTotalCesta;
                            precioTotalCesta = $('#cestaTotal').text();
                            if (precioTotalCesta != '') {
                                if (sesion[1]['precio'] != 'No definido') {
                                    var cogerPrecio = parseFloat(sesion[1]['precio']);
                                    precioTotalCesta = parseFloat(precioTotalCesta);
                                    precioTotalCesta = cogerPrecio + precioTotalCesta;
                                    $('#cestaTotal').text(precioTotalCesta);
                                }
                            } else {
                                if (sesion[1]['precio'] != 'No definido') {
                                    var cogerPrecio = parseFloat(sesion[1]['precio']);
                                    $('#cestaTotal').text(cogerPrecio);
                                }
                            }
                            if (screen.width < 800) {
                                $('#textoCesta' + i).append(
                                    '<p id="textoeliminarprod" style="letter-spacing: 1px;font-weight: 300;font-size: 16px;"><span onclick="borrarProdCesta(' +
                                        i +
                                        ')" style=""><a><u>ELIMINAR</u></a></span> </p>'
                                );
                            }
                            if (screen.width >= 800) {
                                $('#textoCesta' + i).append(
                                    '<p id="textoeliminarprod" style="letter-spacing: 1px;font-weight: 300;font-size: 16px;"><span onclick="borrarProdCesta(' +
                                        i +
                                        ')" style=""><a><u>ELIMINAR</u></a></span> </p>'
                                );
                            }

                            $('#textoCesta' + i).append('<hr style="100%"></hr>');
                        }
                    }
                }
            }
        }
    }
    public observacionesmodificado() {
        var cont = 0;
        for (let i = 1; i <= 100; i++) {
            var sesion = JSON.parse(sessionStorage.getItem('prod' + i));
            console.log(sesion);

            if (sesion != null) {
                cont++;
            }
        }
        if (this.estaobservacion == 0) {
            cont++;
            var texto = $('#textAreaObs').val();
            $('#modalCesta .modal-body').append(
                '<div class="primerDivPresu" style="margin-top:50px;float:left;width:100%;margin-bottom:40px;" id="esteDiv' +
                    cont +
                    '"></div>'
            );
            $('#modalCesta .modal-body #esteDiv' + cont).append(
                '<div style="float: left;width: 500px;text-align: center;height:300px;position:relative;float: left;width: 40%;margin-left: 100px;height: 333px;" id="cuerpo' +
                    cont +
                    '"></div>'
            );
            $('#modalCesta .modal-body #esteDiv' + cont).append('<div style="float: right;width: 40%;" id="textoCesta' + cont + '"></div>');
            $('#cuerpo' + cont).append('<div id="izquierda"  style="float: left;margin-top:20px"></div>');
            $('#cuerpo' + cont + ' #izquierda').append(
                '<img id="imagenPresupues" style="z-index:' +
                    (100 - cont) +
                    ';max-width:400px;max-height:400px;max-width:410px;max-height:410px;position:absolute;top:-10px" width="1000px" height="1000px" src="../../../content/images/1- PARA WEB/DORMITORIO2/OBSERVACIONES.jpg">'
            );
            $('#textoCesta' + cont).append(
                '<p style="letter-spacing: 1px;font-weight: 300;margin-left: 28%;"><strong style="font-weight:600">OBSERVACIONES</strong></p>'
            );
            $('#textoCesta' + cont).append(
                '<p style="letter-spacing: 1px;font-weight: 500;font-size: 12px;margin-left: 28%;color:red" id="textobserdiv">' +
                    texto +
                    '</p>'
            );
            $('#textoCesta' + cont).append(
                '<p style="letter-spacing: 1px;font-weight: 500;font-size: 16px;margin-left: 28%;" id="textobserdiv"><a onclick="quitarObservacionesPedido()"><u style="font-size:16px">ELIMINAR</u></a></p>'
            );

            this.estaobservacion = 1;
            var sesion = JSON.parse(sessionStorage.getItem('prod1'));
            sesion[1]['observaciones'] = texto;
            sessionStorage.setItem('prod1', JSON.stringify(sesion));
        } else {
            var texto = $('#textAreaObs').val();
            $('#textobserdiv').text(texto.toString());
            var sesion = JSON.parse(sessionStorage.getItem('prod1'));
            sesion[1]['observaciones'] = texto;
            sessionStorage.setItem('prod1', JSON.stringify(sesion));
        }
    }
    public hacerclickcambiartexto(id) {}
    public mostrarDireccionDeEntrega() {}
    public meterCuadroDireccion(id) {
        var array = [];
        this.idDeLaTiendaCogida = id;
        this.direccionTiendasService.query1(id).subscribe(data => {
            this.direccionTiendasService.todos = data.body;
            for (let u = 0; u < data.body.length; u++) {}
            this.meterdireccionarray = data.body;
            console.log(this.meterdireccionarray);
            $('.div1direccionentrega').css({ display: 'block' });

            $('.div1direccionentrega').attr('id', 'simplepruebaani');

            $('#div1nombrefiscalcesta').css({ display: 'none' });
            $('.div1direccionentrega').css({ height: 'auto' });
            $('#volverAtras4MeterCasa').css({ display: 'block' });
            $('#volverAtras1MeterCasa').css({ display: 'none' });
        });
    }

    public volverAtras(id) {
        if (id == 2) {
            $('#modalConfirmarCreacionPresu').css({ display: 'none' });
            $('#modalCesta').css({ display: 'block' });
            $('#volverAtras6MeterCasa').css({ display: 'block' });
            $('#volverAtras1MeterCasa').css({ display: 'none' });
        }
        if (id == 3) {
            $('#modalConfirmarCreacionPresu').css({ display: 'none' });
            $('#modalCesta').css({ display: 'block' });
            $('#volverAtras6MeterCasa').css({ display: 'block' });
            $('#volverAtras2MeterCasa').css({ display: 'none' });
        }
        if (id == 4) {
            $('#volverAtras1MeterCasa').css({ display: 'block' });
            $('#volverAtras4MeterCasa').css({ display: 'none' });
            $('.div1direccionentrega').css({ display: 'none' });
            $('#div1nombrefiscalcesta').css({ display: 'block' });
            $('#nombrefiscalinputcesta').val('');
            this.arrayNombreFiscal = [];
            $('#selectTiendaDelNav').val('0');
        }
        if (id == 5) {
            $('#volverAtras4MeterCasa').css({ display: 'block' });
            $('#volverAtras5MeterCasa').css({ display: 'none' });
            $('.div1direccionentrega').css({ display: 'block' });
            $('.div1referenciaCliente').css({ display: 'none' });
            var account = this.accountService.userIdentity;
            if (account['authorities'].length == 1) {
                if (account['authorities'][0] == 'ROLE_USER') {
                    $('#volverAtras4MeterCasa').css({ display: 'none' });
                    $('#volverAtras2MeterCasa').css({ display: 'block' });
                }
            }
        }
        if (id == 6) {
            var ruta = sessionStorage.getItem('ruta');
            this.router.navigate(['/' + ruta]);
        }
    }

    public direccogidamen(id) {
        this.iddireccioncogida = id;
        $('.div1referenciaCliente').css({ display: 'block' });
        $('.div1referenciaCliente').attr('id', 'simplepruebaani');

        $('.div1direccionentrega').css({ display: 'none' });
        $('.div1referenciaCliente').css({ height: 'auto' });
        $('#volverAtras4MeterCasa').css({ display: 'none' });
        $('#volverAtras2MeterCasa').css({ display: 'none' });
        $('#volverAtras5MeterCasa').css({ display: 'block' });
    }

    public consultarNombreFiscal() {
        var nombreFiscal = $('#nombrefiscalinputcesta').val();
        this.datosUsuarioService.query13(nombreFiscal).subscribe(data => {
            this.todasLasTiendas = data.body;
            if (data.body.length <= 5) {
                this.arrayNombreFiscal = data.body;
            } else {
                alert('introduce un nombre mas concreto');
            }
        });
    }

    public llamargenerar() {
        $('#botonfinalizarpedidocesta').css({ display: 'none' });
        this.navbarComponent.dimensionesProductoTipoService.todos = this.dimensionesProductoTipoService.todos;
        this.navbarComponent.idDeLaTiendaCogida = this.idDeLaTiendaCogida;
        this.navbarComponent.todasLasTiendas = this.todasLasTiendas;
        this.navbarComponent.meterdireccionarray = this.meterdireccionarray;
        this.navbarComponent.iddireccioncogida = this.iddireccioncogida;
        this.navbarComponent.user = this.user;
        this.navbarComponent.arrayNombresArchivos = this.arrayNombresArchivos;

        this.navbarComponent.generarPresupuesto();
    }

    public hacerquecargelastiendas() {
        var valor = $('#selectTiendaDelNav').val();
        var tiendas = this.todasLasTiendas;
        var val = [];
        for (let i = 0; i < tiendas.length; i++) {
            if (tiendas[i]['nombreFiscal'] == valor) {
                val[0] = tiendas[i];
            }
        }
        this.arrayNombreFiscal = val;
    }
    public cargarTodasTiendas() {
        $('#volverAtras6MeterCasa').css({ display: 'none' });
        var account = this.accountService.userIdentity;
        $('#volverAtras1MeterCasa').css({ display: 'block' });
        if (account['authorities'].length == 1) {
            if (account['authorities'][0] == 'ROLE_USER') {
                $('#div1nombrefiscalcesta').css({ display: 'none' });
                $('.div1direccionentrega').css({ display: 'block' });
                $('#volverAtras1MeterCasa').css({ display: 'none' });
                $('#volverAtras2MeterCasa').css({ display: 'block' });
            }
        }
        $('#modalCesta').css({ display: 'none' });
        $('#modalConfirmarCreacionPresu').attr('class', 'simplepruebaani599');
        $('#modalConfirmarCreacionPresu').css({ display: 'block' });

        var arrayBueno = [];
        arrayBueno[83] = 3;
        arrayBueno[84] = 4;
        arrayBueno[85] = 42;
        arrayBueno[310] = 22;
        arrayBueno[386] = 15;
        arrayBueno[541] = 47;
        arrayBueno[873] = 45;
        arrayBueno[934] = 29;
        arrayBueno[1073] = 25;
        arrayBueno[1187] = 18;
        arrayBueno[1188] = 34;
        arrayBueno[1410] = 5;
        arrayBueno[1694] = 32;
        arrayBueno[3239] = 6;
        arrayBueno[3240] = 7;
        arrayBueno[3241] = 8;
        arrayBueno[3242] = 10;
        arrayBueno[3243] = 16;
        arrayBueno[3244] = 17;
        arrayBueno[3245] = 19;
        arrayBueno[3246] = 20;
        arrayBueno[3247] = 24;
        arrayBueno[3248] = 27;
        arrayBueno[3249] = 28;
        arrayBueno[3250] = 31;
        arrayBueno[3251] = 33;
        arrayBueno[3252] = 35;
        arrayBueno[3253] = 37;
        arrayBueno[3254] = 40;
        arrayBueno[3255] = 41;
        arrayBueno[3256] = 44;
        arrayBueno[3257] = 46;
        var arrayNombreFiscal = [];
        if (account.authorities.indexOf('ROLE_ADMIN') >= 0) {
            this.datosUsuarioService
                .query({
                    size: 100000
                })
                .subscribe(data => {
                    this.todasLasTiendas = data.body;
                    for (let o = 0; o < data.body['length']; o++) {
                        $('#modalConfirmarCreacionPresu').append('<datalist id="listaTiendas"></datalist>');
                        if (screen.width < 800) {
                            $('#selectTiendaDelNav').append(
                                '<option class="' +
                                    data.body[o]['id'] +
                                    '" id="' +
                                    data.body[o]['nombreFiscal'] +
                                    '">' +
                                    data.body[o]['nombreFiscal'] +
                                    '</option>'
                            );
                            $('#selectTiendaDelNav').css({ display: 'initial' });
                            $('#selectTiendas').css({ display: 'none' });
                        }
                        $('#listaTiendas').append(
                            '<option class="' +
                                data.body[o]['id'] +
                                '" id="' +
                                data.body[o]['nombreFiscal'] +
                                '">' +
                                data.body[o]['nombreFiscal'] +
                                '</option>'
                        );
                    }
                });
        }
        if (account.authorities[0] == 'ROLE_REPRESENTATE') {
            this.datosUsuarioService.reprebuscar(arrayBueno[account.id]).subscribe(data => {
                this.todasLasTiendas = data.body;
                for (let o = 0; o < data.body['length']; o++) {
                    $('#modalConfirmarCreacionPresu').append('<datalist id="listaTiendas"></datalist>');

                    $('#selectTiendaDelNav').append(
                        '<option class="' +
                            data.body[o]['id'] +
                            '" id="' +
                            data.body[o]['nombreFiscal'] +
                            '">' +
                            data.body[o]['nombreFiscal'] +
                            '</option>'
                    );
                    $('#estoelrepresentantenolove').css({ display: 'none' });
                    $('#selectTiendaDelNav').css({ display: 'initial' });
                    $('#selectTiendas').css({ display: 'none' });
                }
            });
        }
        $('#modalConfirmarCreacionPresu #listaDireccionTiendas').remove();
        $('#selectDireccionTiendaDelNav').empty();
        $('#selectDireccionTiendaDelNav').append('<option></option>');
        $('#modalConfirmarCreacionPresu').append('<datalist id="listaDireccionTiendas"></datalist>');

        if (account['authorities'].length == 1) {
            if (account['authorities'][0] == 'ROLE_USER') {
                $('#div1nombrefiscalcesta').css({ display: 'none' });
                $('.div1direccionentrega').css({ display: 'block' });
            }
        }

        var tiendaUsada = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
        this.direccionTiendasService.query1(tiendaUsada['id']).subscribe(data => {
            this.meterdireccionarray = data.body;
            console.log(data.body);
            this.direccionTiendasService.todos = data.body;
            for (let u = 0; u < data.body.length; u++) {
                $('#listaDireccionTiendas').append(
                    '<option class="' +
                        data.body[u]['id'] +
                        '" id="' +
                        data.body[u]['direccion'] +
                        '">' +
                        data.body[u]['direccion'] +
                        '</option>'
                );
                $('#selectDireccionTiendaDelNav').append(
                    '<option class="' +
                        data.body[u]['id'] +
                        '" id="' +
                        data.body[u]['direccion'] +
                        '">' +
                        data.body[u]['direccion'] +
                        '</option>'
                );
            }
        });
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    // login() {
    //     this.modalRef = this.loginModalService.open();
    // }

    register() {
        this.router.navigate(['/register']);
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDatosUsuario>>) {
        result.subscribe((res: HttpResponse<IDatosUsuario>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }
    protected onError(errorMessage: string) {}
    previousState() {}
    protected onSaveError() {
        this.isSaving = false;
    }

    login() {
        this.loginService
            .login({
                username: this.username,
                password: this.password,
                rememberMe: this.rememberMe
            })
            .then(() => {
                this.authenticationError = false;

                if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
                    this.router.navigate(['']);
                }

                this.eventManager.broadcast({
                    name: 'authenticationSuccess',
                    content: 'Sending Authentication Success'
                });

                // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                // since login is successful, go to stored previousState and clear previousState
                const redirect = this.stateStorageService.getUrl();
                if (redirect) {
                    this.stateStorageService.storeUrl(null);
                    this.router.navigate([redirect]);
                }
            })
            .catch(() => {
                //aqui añadimos try catch y comprobamos con la otra tabla de usuario.
                this.authenticationError = true;
            });
    }

    public pushFileToStorageExcelftp() {
        var dato_archivo = $('#inputfilecoger').prop('files')[0];
        var res;
        res = dato_archivo.name.replace('Ñ', 'N');
        res = res.replace('Á', 'A');
        res = res.replace('É', 'E');
        res = res.replace('Í', 'I');
        res = res.replace('Ó', 'O');
        res = res.replace('Ú', 'U');
        res = res.replace('ñ', 'n');
        res = res.replace('á', 'a');
        res = res.replace('é', 'e');
        res = res.replace('í', 'i');
        res = res.replace('ó', 'o');
        res = res.replace('ú', 'u');

        this.vistaadminService.pushFileToStorageExcelftp(dato_archivo, res).subscribe(event => {
            if (event['status'] == 200) {
                console.log(event);
                var array = this.arrayNombresArchivos;
                if (event.type == 4) {
                    if (array.length == 0) {
                        array[0] = res;
                    } else {
                        array[array.length] = res;
                    }
                    this.arrayNombresArchivos = array;
                    var adjuntoya = this.adjuntoya;
                    if (adjuntoya == 0) {
                        var cont = 0;
                        for (let i = 1; i <= 100; i++) {
                            var sesion = JSON.parse(sessionStorage.getItem('prod' + i));
                            console.log(sesion);

                            if (sesion != null) {
                                cont++;
                            }
                        }

                        cont++;
                        cont++;
                        $('#modalCesta .modal-body').append(
                            '<div class="primerDivPresu" style="margin-top:50px;float:left;width:100%;margin-bottom:40px;" id="esteDiv' +
                                cont +
                                '"></div>'
                        );
                        $('#modalCesta .modal-body #esteDiv' + cont).append(
                            '<div style="float: left;width: 500px;text-align: center;height:300px;position:relative;float: left;width: 40%;margin-left: 100px;height: 333px;" id="cuerpo' +
                                cont +
                                '"></div>'
                        );
                        $('#modalCesta .modal-body #esteDiv' + cont).append(
                            '<div style="float: right;width: 40%;" id="textoCesta' + cont + '"></div>'
                        );
                        $('#cuerpo' + cont).append('<div id="izquierda"  style="float: left;margin-top:20px"></div>');
                        $('#cuerpo' + cont + ' #izquierda').append(
                            '<img id="imagenPresupues" style="z-index:' +
                                (100 - cont) +
                                ';max-width:400px;max-height:400px;max-width:410px;max-height:410px;position:absolute;top:-10px" width="1000px" height="1000px" src="../../../content/images/1- PARA WEB/DORMITORIO2/ARCHIVOS ADJUNTOS.jpg">'
                        );
                        $('#textoCesta' + cont).append(
                            '<p style="letter-spacing: 1px;font-weight: 300;margin-left: 28%;"><strong style="font-weight:600">ARCHIVOS ADJUNTOS</strong></p>'
                        );
                        $('#textoCesta' + cont).append(
                            '<p style="letter-spacing: 1px;font-weight: 500;font-size: 12px;margin-left: 28%;color:red" id="textobserdiv2">Archivo 1: ' +
                                res +
                                '</p>'
                        );
                        $('#textoCesta' + cont).append(
                            '<p style="letter-spacing: 1px;font-weight: 500;font-size: 16px;margin-left: 28%;" id="textobserdiv" class="eliminarArchivosAdjuntosP"><a onclick="quitarArchivosPedido()"><u style="font-size:16px">ELIMINAR<u></a></p>'
                        );
                        this.adjuntoya = 1;
                        var nombrearch = '';
                        for (let n = 0; n < this.arrayNombresArchivos.length; n++) {
                            if (n == 0) {
                                nombrearch = nombrearch + '' + this.arrayNombresArchivos[n];
                            } else {
                                nombrearch = nombrearch + '%' + this.arrayNombresArchivos[n];
                            }
                        }
                        var sesion = JSON.parse(sessionStorage.getItem('prod1'));
                        sesion[1]['archivosAdjuntos'] = nombrearch;
                        sessionStorage.setItem('prod1', JSON.stringify(sesion));
                    } else {
                        var cont = 0;
                        for (let i = 1; i <= 100; i++) {
                            var sesion = JSON.parse(sessionStorage.getItem('prod' + i));
                            console.log(sesion);

                            if (sesion != null) {
                                cont++;
                            }
                        }

                        cont++;
                        cont++;

                        var nombrearch = '';
                        for (let n = 0; n < this.arrayNombresArchivos.length; n++) {
                            if (n == 0) {
                                nombrearch = nombrearch + '' + this.arrayNombresArchivos[n];
                            } else {
                                nombrearch = nombrearch + '%' + this.arrayNombresArchivos[n];
                                $('#textoCesta' + cont + ' .eliminarArchivosAdjuntosP').remove();
                                $('#textoCesta' + cont).append(
                                    '<p style="letter-spacing: 1px;font-weight: 500;font-size: 12px;margin-left: 28%;color:red" id="textobserdiv2">Archivo ' +
                                        (n + 1) +
                                        ': ' +
                                        res +
                                        '</p>'
                                );
                                $('#textoCesta' + cont).append(
                                    '<p style="letter-spacing: 1px;font-weight: 500;font-size: 16px;margin-left: 28%;" id="textobserdiv" class="eliminarArchivosAdjuntosP"><a onclick="quitarArchivosPedido()"><u style="font-size:16px">ELIMINAR</u></a></p>'
                                );
                            }
                            var sesion = JSON.parse(sessionStorage.getItem('prod1'));
                            sesion[1]['archivosAdjuntos'] = nombrearch;
                            sessionStorage.setItem('prod1', JSON.stringify(sesion));
                        }
                    }
                }
            }
        });
    }
    public simpleprueba() {
        alert(1);
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

    ngAfterViewInit() {
        this.arrayNombresArchivos = [];
        this.adjuntoya = 0;
        var cont = 0;
        this.estaobservacion = 0;
        var es = 0;
        var es1 = 0;
        for (let i = 1; i <= 100; i++) {
            var sesion = JSON.parse(sessionStorage.getItem('prod' + i));
            console.log(sesion);
            if (i == 1) {
                if (sesion != null) {
                    if (sesion[1]['observaciones'] != undefined && sesion[1]['observaciones'] != null) {
                        es = 1;
                        var texto = sesion[1]['observaciones'];
                        this.estaobservacion = 1;
                    }
                    if (sesion[1]['archivosAdjuntos'] != undefined && sesion[1]['archivosAdjuntos'] != null) {
                        es1 = 1;
                        var pruearra = [];
                        var pruearra1 = [];
                        pruearra = sesion[1]['archivosAdjuntos'].split('%');
                        this.arrayNombresArchivos = pruearra;
                        this.adjuntoya = 1;
                    }
                }
            }
            if (sesion != null) {
                cont++;
            }
        }
        if (es == 1) {
            cont++;
            $('#modalCesta .modal-body').append(
                '<div class="primerDivPresu" style="margin-top:50px;float:left;width:100%;margin-bottom:40px;" id="esteDiv' +
                    cont +
                    '"></div>'
            );
            $('#modalCesta .modal-body #esteDiv' + cont).append(
                '<div style="float: left;width: 500px;text-align: center;height:300px;position:relative;float: left;width: 40%;margin-left: 100px;height: 333px;" id="cuerpo' +
                    cont +
                    '"></div>'
            );
            $('#modalCesta .modal-body #esteDiv' + cont).append('<div style="float: right;width: 40%;" id="textoCesta' + cont + '"></div>');
            $('#cuerpo' + cont).append('<div id="izquierda"  style="float: left;margin-top:20px"></div>');
            $('#cuerpo' + cont + ' #izquierda').append(
                '<img id="imagenPresupues" style="z-index:' +
                    (100 - cont) +
                    ';max-width:400px;max-height:400px;max-width:410px;max-height:410px;position:absolute;top:-10px" width="1000px" height="1000px" src="../../../content/images/1- PARA WEB/DORMITORIO2/OBSERVACIONES.jpg">'
            );
            $('#textoCesta' + cont).append(
                '<p style="letter-spacing: 1px;font-weight: 300;margin-left: 28%;"><strong style="font-weight:600">OBSERVACIONES</strong></p>'
            );
            $('#textoCesta' + cont).append(
                '<p style="letter-spacing: 1px;font-weight: 500;font-size: 12px;margin-left: 28%;color:red" id="textobserdiv">' +
                    texto +
                    '</p>'
            );
            $('#textAreaObs').val(texto);
            $('#textoCesta' + cont).append(
                '<p style="letter-spacing: 1px;font-weight: 500;font-size: 12px;margin-left: 28%;" id="textobserdiv"><a onclick="quitarObservacionesPedido()"><u style="font-size:16px">ELIMINAR</u></a></p>'
            );
        }
        if (es1 == 1) {
            cont++;
            cont++;
            $('#modalCesta .modal-body').append(
                '<div class="primerDivPresu" style="margin-top:50px;float:left;width:100%;margin-bottom:40px;" id="esteDiv' +
                    cont +
                    '"></div>'
            );
            $('#modalCesta .modal-body #esteDiv' + cont).append(
                '<div style="float: left;width: 500px;text-align: center;height:300px;position:relative;float: left;width: 40%;margin-left: 100px;height: 333px;" id="cuerpo' +
                    cont +
                    '"></div>'
            );
            $('#modalCesta .modal-body #esteDiv' + cont).append('<div style="float: right;width: 40%;" id="textoCesta' + cont + '"></div>');
            $('#cuerpo' + cont).append('<div id="izquierda"  style="float: left;margin-top:20px"></div>');
            $('#cuerpo' + cont + ' #izquierda').append(
                '<img id="imagenPresupues" style="z-index:' +
                    (100 - cont) +
                    ';max-width:400px;max-height:400px;max-width:410px;max-height:410px;position:absolute;top:-10px" width="1000px" height="1000px" src="../../../content/images/1- PARA WEB/DORMITORIO2/ARCHIVOS ADJUNTOS.jpg">'
            );
            $('#textoCesta' + cont).append(
                '<p style="letter-spacing: 1px;font-weight: 300;margin-left: 28%;"><strong style="font-weight:600">ARCHIVOS ADJUNTOS</strong></p>'
            );

            for (let r = 0; r < this.arrayNombresArchivos.length; r++) {
                $('#textoCesta' + cont).append(
                    '<p style="letter-spacing: 1px;font-weight: 500;font-size: 12px;margin-left: 28%;color:red" id="textobserdiv">Archivo ' +
                        (r + 1) +
                        ': ' +
                        this.arrayNombresArchivos[r] +
                        '</p>'
                );
            }
            $('#textoCesta' + cont).append(
                '<p style="letter-spacing: 1px;font-weight: 500;font-size: 16px;margin-left: 28%;" id="textobserdiv"><a onclick="quitarArchivosPedido()"><u style="font-size:16px">ELIMINAR</u></a></p>'
            );
            $('#textAreaObs').val(texto);
        }
    }
}

import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationCancel } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService } from 'ng-jhipster';
import { SessionStorageService } from 'ngx-webstorage';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { VERSION } from 'app/app.constants';
import { JhiLanguageHelper, Account, AccountService, LoginModalService, LoginService, UserService, User } from 'app/core';
import { ProfileService } from '../profiles/profile.service';
import { DatosUsuarioService } from '../../entities/datos-usuario/datos-usuario.service';
import * as $ from 'jquery';
import { AcaProdService } from '../../entities/aca-prod/aca-prod.service';
import { IAcaProd } from 'app/shared/model/aca-prod.model';
import { DimensionesProductoTipoService } from '../../entities/dimensiones-producto-tipo/dimensiones-producto-tipo.service';
import { InterioresService } from '../../entities/interiores/interiores.service';
import { MedidasEspecialesService } from '../../entities/medidas-especiales/medidas-especiales.service';
import { ProductosDormitorioService } from '../../entities/productos-dormitorio/productos-dormitorio.service';
import { PresupuestoPedidoService } from '../../entities/presupuesto-pedido/presupuesto-pedido.service';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RepresentanteTiendaService } from '../../entities/representante-tienda/representante-tienda.service';
import { IRepresentanteTienda } from 'app/shared/model/representante-tienda.model';
import { IPresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';
import { AcabadosProductosPresupuestoPedidoService } from '../../entities/acabados-productos-presupuesto-pedido/acabados-productos-presupuesto-pedido.service';
import { ProductosPresupuestoPedidosService } from '../../entities/productos-presupuesto-pedidos/productos-presupuesto-pedidos.service';
import { MedEspProductoPedidoPresuService } from '../../entities/med-esp-producto-pedido-presu/med-esp-producto-pedido-presu.service';
import { IAcabadosProductosPresupuestoPedido } from 'app/shared/model/acabados-productos-presupuesto-pedido.model';
import { IProductosPresupuestoPedidos } from 'app/shared/model/productos-presupuesto-pedidos.model';
import { RepresenTorgaService } from '../../entities/represen-torga/represen-torga.service';
import { IRepresenTorga } from 'app/shared/model/represen-torga.model';
import { IluminacionProdPrePedService } from '../../entities/iluminacion-prod-pre-ped/iluminacion-prod-pre-ped.service';
import { ICategoriasDormi } from 'app/shared/model/categorias-dormi.model';
import { Observable } from 'rxjs';

import { IPresupuestoArmario } from 'app/shared/model/presupuesto-armario.model';
import { PresupuestoArmarioService } from '../../entities/presupuesto-armario/presupuesto-armario.service';
import { IPresupuestoArmarioInteriores } from 'app/shared/model/presupuesto-armario-interiores.model';
import { PresupuestoArmarioInterioresService } from '../../entities/presupuesto-armario-interiores/presupuesto-armario-interiores.service';
import { IPresupuestoArmarioPuertas } from 'app/shared/model/presupuesto-armario-puertas.model';
import { PresupuestoArmarioPuertasService } from '../../entities/presupuesto-armario-puertas/presupuesto-armario-puertas.service';
@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['navbar.css']
})
export class NavbarComponent implements AfterViewInit, OnInit {
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    isSaving: boolean;
    ruta: any;
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
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
    account: Account;
    link: string;
    settingsAccount: any;
    contador: any;
    bottomModulos: any;
    predicate: any;
    reverse: any;
    routeData: any;
    constructor(
        protected presupuestoArmarioPuertasService: PresupuestoArmarioPuertasService,
        private loginService: LoginService,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        protected dimensionesProductoTipoService: DimensionesProductoTipoService,
        private sessionStorage: SessionStorageService,
        protected datosUsuarioService: DatosUsuarioService,
        private accountService: AccountService,
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
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        protected interioresService: InterioresService,
        protected medidasEspecialesService: MedidasEspecialesService,
        protected jhiAlertService: JhiAlertService,
        protected presupuestoArmarioService: PresupuestoArmarioService,
        private router: Router,
        private modalService: NgbModal,
        public productosDormitorioService: ProductosDormitorioService,
        private eventManager: JhiEventManager,
        protected activatedRoute: ActivatedRoute
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    ngAfterViewInit() {
        setTimeout(function() {
            var prueba = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
            if (prueba['logo'] != undefined) {
                $('#logoImagen').remove();
                $('.logo-img').append('<img id="logoImagen"  src="data:image/gif;base64,' + prueba['logo'] + '"/>');
                $('.logo-img').css({ background: 'none' });
            }
        }, 10);
    }
    public comprobarContrase() {
        var valor = $('#contIdMaqui').val();
        if (valor == '1234') {
            $('#contraseModalMen').css({ display: 'none' });
            $('#contIdMaqui').val('');
            this.open('productos-precio', 'false', 'myModel');
            $('#modalContrase').attr('class', 'modal fade'); //ocultamos el modal
            $('body').removeClass('modal-open'); //eliminamos la clase del body para poder hacer scroll
            $('.modal-backdrop').remove(); //eliminamos el backdrop del modal
        } else {
            $('#contraseModalMen').css({ display: 'block' });
        }
    }

    public comprobarContrase1() {
        var valor = $('#contIdMaqui1').val();
        if (valor == '1234') {
            $('#contraseModalMen1').css({ display: 'none' });
            $('#contIdMaqui1').val('');
            this.open('gestion-tienda', 'false', 'myModel');
            $('#modalContrase1').attr('class', 'modal fade'); //ocultamos el modal
            $('body').removeClass('modal-open'); //eliminamos la clase del body para poder hacer scroll
            $('.modal-backdrop').remove(); //eliminamos el backdrop del modal
        } else {
            $('#contraseModalMen1').css({ display: 'block' });
        }
    }
    public comprobarContrase2() {
        var valor = $('#contIdMaqui2').val();
        if (valor == '1234') {
            $('#contraseModalMen2').css({ display: 'none' });
            $('#contIdMaqui2').val('');
            this.open('password', 'false', 'myModel');
            $('#modalContrase2').attr('class', 'modal fade'); //ocultamos el modal
            $('body').removeClass('modal-open'); //eliminamos la clase del body para poder hacer scroll
            $('.modal-backdrop').remove(); //eliminamos el backdrop del modal
        } else {
            $('#contraseModalMen2').css({ display: 'block' });
        }
    }

    open(ruta, bool, content) {
        var prod = $('#calculadoraCarrito #nombreMesita').text();
        var idsArray = [];
        idsArray[0] = 'composicionesSpan1';
        idsArray[1] = 'mesasSpan';
        idsArray[2] = 'panelesSpan';
        idsArray[3] = 'suplementosTv';
        idsArray[4] = 'estanteriasSpan';
        idsArray[5] = 'colHorizontales';
        idsArray[6] = 'colVertEstant';
        idsArray[7] = 'colVerticalesSpan';
        idsArray[8] = 'estantColgantesSpan';
        idsArray[9] = 'apoyoSistemaSpan1';
        idsArray[10] = 'escritoriosSpan';
        idsArray[11] = 'singularesSpan';
        idsArray[12] = 'vitrinasSpan';
        idsArray[13] = 'aparadoresSpan';
        idsArray[14] = 'modulosBajos';
        idsArray[15] = 'armariosSpan';
        idsArray[16] = 'banerascanapes';
        idsArray[17] = 'apoyoSistema2';
        idsArray[18] = 'chifonieresSpan';
        idsArray[19] = 'mesitasSpan';
        idsArray[20] = 'cabecerosSpan';

        for (let x = 0; x < 21; x++) {
            $('#' + idsArray[x]).css({ 'font-weight': 'normal' });
        }

        if (prod != '') {
            if (bool == false) {
                this.ruta = ruta;
                $('#modalPreguntarSalida').attr('style');
                this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
                    result => {
                        this.closeResult = `Closed with: ${result}`;
                    },
                    reason => {
                        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                    }
                );
            } else {
                this.productosDormitorioService.todos = undefined;
                this.router.navigate(['/' + ruta]);
                this.modalService.dismissAll();
                $('#menuPrincipal').css({ display: 'none' });
                $('#botonEsconder').removeAttr('onclick');
                $('#botonEsconder').attr('onclick', 'apareceMenu()');
                $('#rayasNavegador').attr('src', '../../../content/images/LINEAS-min.png');
            }
        } else {
            this.router.navigate(['/' + ruta]);
            this.productosDormitorioService.todos = undefined;
            $('#menuPrincipal').css({ display: 'none' });
            $('#botonEsconder').removeAttr('onclick');
            $('#botonEsconder').attr('onclick', 'apareceMenu()');
            $('#rayasNavegador').attr('src', '../../../content/images/LINEAS-min.png');
        }
    }

    public generarPresupuesto() {
        this.todasDimensiones = this.dimensionesProductoTipoService.todos;

        var numeroProductos = [];
        this.productosPresupuestoPedidosService
            .query({
                size: 100000,
                sort: this.sort()
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
                        contAcab = 0;
                        numeroAcaProd[j] = acab;
                        acab = [];
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
                        var idUsu = account['id'];
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
                            var idUsu = account['id'];
                            for (let i = 0; i < usuarios.length; i++) {
                                if (usuarios[i]['id'] == idUsu) {
                                    usuarioCreado = usuarios[i];
                                }
                            }
                        } else {
                            this.isSaving = true;
                            var usuarios = this.user;
                            var usuario;
                            var idUsu = account['id'];
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
                                codigo: 'PR-' + usuarioCreado['id'],
                                pedido: 0,
                                user: usuario,
                                fecha_presupuesto: output,
                                usuarioCreadoPre: usuarioCreado
                            };
                            usuario = usuarioCreado;
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

                    this.presupuestoPedidoService
                        .query({
                            size: 100000
                        })
                        .subscribe((res: HttpResponse<IPresupuestoPedido[]>) => {
                            this.subscribeToSaveResponse(this.presupuestoPedidoService.create(this.presupuestoPedido));
                            var presupuesto = this.presupuesto;
                            var id = localStorage.getItem('ultimoPresupuesto');
                            var id1 = parseFloat(id);
                            id1 = id1 + 1;
                            localStorage.setItem('ultimoPresupuesto', JSON.stringify(id1));
                            var idDefinitiva;

                            var aux = [];
                            for (let w = 0; w < res.body.length; w++) {
                                if (aux.length == 0 || aux[0]['id'] < res.body[w]['id']) {
                                    aux[0] = res.body[w];
                                }
                            }
                            var idAux = parseFloat(aux[0]['id']);
                            idDefinitiva = idAux + 1;
                            const prueba1 = {
                                id: idDefinitiva,
                                codigo: 'PR-' + usuario['id'],
                                pedido: 0,
                                user: usuario,
                                fecha_presupuesto: output
                            };
                            var prodPrePed;
                            var idProdCar = 0;
                            for (let m = 0; m < prodCarr.length; m++) {
                                if (prodCarr[m][1]['productosDormitorio']['categoriasDormi']['id'] == 9) {
                                    for (let k = 0; k < numeroProductos.length; k++) {
                                        if (idProdCar < numeroProductos[k]['id']) {
                                            idProdCar = numeroProductos[k]['id'];
                                        }
                                    }
                                    idProdCar;
                                    prodPrePed = {
                                        productosDormitorio: prodCarr[m][1]['productosDormitorio'],
                                        presupuestoPedido: prueba1
                                    };

                                    this.productosPresupuestoPedidos = prodPrePed;
                                    this.subscribeToSaveResponse1(
                                        this.productosPresupuestoPedidosService.create(this.productosPresupuestoPedidos)
                                    );
                                    prodPrePed['id'] = idProdCar + 1;
                                    var armario;
                                    armario = {
                                        id: prodCarr[m][1]['id'],
                                        anchoMax: prodCarr[m][1]['anchoMax'],
                                        anchoMin: prodCarr[m][1]['anchoMin'],
                                        imagen: prodCarr[m][1]['imagen'],
                                        imagenContentType: prodCarr[m][1]['imagenContentType'],
                                        mensaje: prodCarr[m][1]['mensaje'],
                                        numCostado: prodCarr[m][1]['numCostado'],
                                        numeroPuertas: prodCarr[m][1]['numeroPuertas'],
                                        productosDormitorio: prodCarr[m][1]['productosDormitorio']
                                    };
                                    var presupuestoArmario;
                                    presupuestoArmario = {
                                        productosPresupuestoPedidos: prodPrePed,
                                        acabadosInterior: prodCarr[m][1]['acabadoInterior'],
                                        acabados: prodCarr[m][1]['acabadoTrasera'],
                                        acabadosCasco: prodCarr[m][1]['acabadoCasco'],
                                        armario: armario,
                                        cascoPrecio: prodCarr[m][1]['precioCasco'],
                                        fondo: prodCarr[m][1]['fondo'],
                                        alto: prodCarr[m][1]['alto'],
                                        ancho: prodCarr[m][1]['ancho']
                                    };
                                    this.subscribeToSaveResponse1(this.presupuestoArmarioService.create(presupuestoArmario));

                                    this.presupuestoArmarioService
                                        .query({
                                            size: 10000000
                                        })
                                        .subscribe(data => {
                                            var idArmario = 0;
                                            for (let v = 0; v < data.body.length; v++) {
                                                if (data.body[v]['id'] > idArmario) {
                                                    idArmario = data.body[v]['id'];
                                                }
                                            }
                                            presupuestoArmario['id'] = idArmario;

                                            for (let x = 0; x < prodCarr[m][1]['interiores'].length; x++) {
                                                var interiores;
                                                interiores = {
                                                    precio: prodCarr[m][1]['interiores'][x]['precio'],
                                                    presupuestoArmario: presupuestoArmario,
                                                    productosDormitorio: prodCarr[m][1]['interiores'][x]
                                                };

                                                this.subscribeToSaveResponse1(this.presupuestoArmarioInterioresService.create(interiores));
                                            }

                                            for (let x = 0; x < prodCarr[m][1]['puertas'].length; x++) {
                                                var puertas;
                                                puertas = {
                                                    precio: prodCarr[m][1]['puertas'][x]['precio'],
                                                    presupuestoArmario: presupuestoArmario,
                                                    productosDormitorio: prodCarr[m][1]['puertas'][x],
                                                    acabados: prodCarr[m][1]['puertas'][x]['acabado' + x]
                                                };

                                                this.subscribeToSaveResponse1(this.presupuestoArmarioPuertasService.create(puertas));
                                            }
                                        });
                                } else {
                                    if (prodCarr[m][1]['productosDormitorio']['categoriasDormi']['id'] != 2) {
                                        var dimen = {
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
                                        if (dimen['mensaje'] == 'Medidas Especiales') {
                                            var anchoEspecial = dimensionesFinal['ancho'].split(':')[1];
                                            anchoEspecial = anchoEspecial.split(' ')[1];
                                            var altoEspecial = dimensionesFinal['alto'].split(':')[1];
                                            altoEspecial = altoEspecial.split(' ')[1];
                                            var fondoEspecial = dimensionesFinal['fondo'].split(':')[1];
                                            fondoEspecial = fondoEspecial.split(' ')[1];
                                            dimen['ancho'] = parseFloat(anchoEspecial);
                                            dimen['alto'] = parseFloat(altoEspecial);
                                            dimen['fondo'] = parseFloat(fondoEspecial);
                                        }
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
                                        for (let ve = 0; ve <= 10000000; ve++) {
                                            if (ve == 10000000) {
                                                this.subscribeToSaveResponse1(
                                                    this.productosPresupuestoPedidosService.create(this.productosPresupuestoPedidos)
                                                );
                                            }
                                        }

                                        if (numeroAcaProd[m].length != 0) {
                                            var acaPedProd = this.acaProdPed.length;
                                            acaPedProd = this.acaProdPed[acaPedProd - 1];
                                            prodAca[m]['id'] = acaPedProd['id'] + m + 1;
                                            for (let b = 0; b < numeroAcaProd[m].length; b++) {
                                                for (let ve = 0; ve <= 1000000000; ve++) {
                                                    if (ve == 1000000000) {
                                                        const acabados1 = {
                                                            acabados: numeroAcaProd[m][b],
                                                            productosPresupuestoPedidos: prodAca[m],
                                                            orden: b + 1
                                                        };
                                                        this.subscribeToSaveResponse(
                                                            this.acabadosProductosPresupuestoPedidoService.create(acabados1)
                                                        );
                                                    }
                                                }
                                            }
                                        }

                                        if (dimensionesFinal['mensaje'] == 'Medidas Especiales') {
                                            var acaPedProd = this.acaProdPed.length;
                                            acaPedProd = this.acaProdPed[acaPedProd - 1];
                                            dimensionEspecialBien[m]['id'] = acaPedProd['id'] + m + 1;

                                            const medEsp = {
                                                productosPresupuestoPedidos: dimensionEspecialBien[m],
                                                ancho: anchoEspecial,
                                                fondo: fondoEspecial,
                                                alto: altoEspecial,
                                                precio: dimensionesFinal['precio']
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
                                    } else {
                                        prodPrePed = {
                                            productosDormitorio: prodCarr[m][1]['apoyo']['productoApoyo'],
                                            presupuestoPedido: prueba1,
                                            tiposApoyo: prodCarr[m][1]['apoyo']
                                        };
                                        numeroAcaProd[m]['prod'] = prodPrePed;
                                        prodAca[m] = prodPrePed;
                                        prodIlu[m] = prodPrePed;
                                        dimensionEspecialBien[m] = prodPrePed;
                                        this.productosPresupuestoPedidos = prodPrePed;
                                        for (let ve = 0; ve <= 10000000; ve++) {
                                            if (ve == 10000000) {
                                                this.subscribeToSaveResponse1(
                                                    this.productosPresupuestoPedidosService.create(this.productosPresupuestoPedidos)
                                                );
                                            }
                                        }

                                        if (numeroAcaProd[m].length != 0) {
                                            var acaPedProd = this.acaProdPed.length;
                                            acaPedProd = this.acaProdPed[acaPedProd - 1];
                                            prodAca[m]['id'] = acaPedProd['id'] + m + 1;
                                            for (let b = 0; b < numeroAcaProd[m].length; b++) {
                                                for (let ve = 0; ve <= 1000000000; ve++) {
                                                    if (ve == 1000000000) {
                                                        const acabados1 = {
                                                            acabados: numeroAcaProd[m][b],
                                                            productosPresupuestoPedidos: prodAca[m],
                                                            orden: b + 1
                                                        };
                                                        this.subscribeToSaveResponse(
                                                            this.acabadosProductosPresupuestoPedidoService.create(acabados1)
                                                        );
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                                this.presupuestoPedidoService
                                    .query({
                                        size: 100000
                                    })
                                    .subscribe(data => {
                                        for (let h = 0; h < data.body.length; h++) {
                                            if (h == 0) {
                                                var prod = data.body[h];
                                            }

                                            if (prod['id'] <= data.body[h]['id']) {
                                                prod = data.body[h];
                                            }
                                        }

                                        var id = prod['id'];
                                        sessionStorage.setItem('presupuesto', '' + id);
                                        sessionStorage.setItem('vengoDe', 'pruebaaaaaa');
                                        $('.modal-backdrop').remove(); //eliminamos el backdrop del modal
                                        $('body').removeClass('modal-open'); //eliminamos la clase del body para poder hacer scroll
                                        $('#todometerFondo').css({ display: 'none' });
                                        this.router.navigate(['/presupuesto-producto']);
                                    });
                            }
                        });
                }
            });
        this.productosDormitorioService.numeroCesta = 0;
    }
    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    public cargarComposicionNT(id) {
        $('#menuPrincipal').css({ display: 'none' });
        for (let i = 1; i < 49; i++) {
            $('#composicionNt' + i).css({ 'font-weight': '400' });
        }
        $('#composicionNt' + id).css({ 'font-weight': '600' });
        $('#botonEsconder').removeAttr('onclick');
        $('#botonEsconder').attr('onclick', 'apareceMenu()');
        $('#rayasNavegador').attr('src', '../../../content/images/LINEAS-min.png');
        sessionStorage.setItem('composicion', '' + id);
        if (this.router.url == '/composicion-ver') {
            location.reload();
        } else {
            this.router.navigate(['/composicion-ver']);
        }
    }

    public abrirCesta() {
        var productosArrayNombres = this.productosArrayNombre;
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
        for (let i = 1; i <= 100; i++) {
            var sesion = JSON.parse(sessionStorage.getItem('prod' + i));
            console.log(sesion);

            if (sesion != null) {
                if (sesion[1]['productosDormitorio'] != undefined) {
                    var nombre = productosArrayNombres[sesion[1]['productosDormitorio']['id']];
                    console.log(nombre);
                    if (sesion[1]['productosDormitorio']['categoriasDormi']['id'] == 9) {
                        $('#modalCesta .modal-body').append(
                            '<div style="float: left;width: 100%;text-align: center;height:250px;position:relative" class="cuerpoArmario" id="cuerpo' +
                                i +
                                '"></div>'
                        );

                        var nombreArmario = sesion[1]['mensaje'];
                        var casco = sesion[1]['acabadoCasco']['nombre'];
                        var trasera = sesion[1]['acabadoTrasera']['nombre'];
                        var interiores = 'blanco';

                        $('#cuerpo' + i).append(
                            '<p style="letter-spacing: 1px;font-weight: 300;font-size:30px;position:absolute;width:97%;text-align:center">' +
                                sesion[1]['productosDormitorio']['nombre'].toUpperCase() +
                                '</p>'
                        );

                        if (nombreArmario == '1 PUERTA') {
                            $('#cuerpo' + i).append(
                                '<img class="armarioCalculadora" style="width:100px;position:absolute;z-index:2" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i).append(
                                '<img class="armarioCalculadora" style="width:100px;position:absolute;z-index:2" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i).append(
                                '<img class="armarioCalculadora" style="width:100px;position:absolute;z-index:2" src="../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
                            );
                        }
                        if (nombreArmario == '3 PUERTAS IZQUIERDA') {
                            var interior1 = sesion[1]['interiores'][0];
                            var interior2 = sesion[1]['interiores'][1];
                            var puerta1 = sesion[1]['puertas'][0];
                            var puerta2 = sesion[1]['puertas'][1];
                            var puerta3 = sesion[1]['puertas'][2];
                            $('#cuerpo' + i).append(
                                '<div id="izquierda" class="armarioIzquierda" style="margin-left: 555px;margin-top: 110px;float: left;"></div>'
                            );
                            $('#cuerpo' + i).append(
                                '<div id="derecha" class="armarioDerecha" style="float:left;margin-left: 125px;margin-top:515px;"></div>'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:2;margin-left: -120px;z-index: 1;margin-top: 26px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="armarioCalculadora" style="width:200px;position:absolute;z-index:2;margin-left: -120px;z-index: 1;margin-top: 26px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertasIzquierda3" style="width:200px;position:absolute" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );

                            if (puerta1['nombre'] == 'Puerta Madera') {
                                var src =
                                    '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_' +
                                    puerta1['acabado0']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:2;margin-left: -120px;z-index: 1;margin-top: 26px;" src="' +
                                        src +
                                        '">'
                                );
                            } else {
                                if (puerta1['acabado0']['nombre'] == 'Cristal Bronce') {
                                    var src = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:2;margin-left: -120px;z-index: 1;margin-top: 26px;opacity:0.6" src="' +
                                            src +
                                            '">'
                                    );
                                } else {
                                    var src =
                                        '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:2;margin-left: -120px;z-index: 1;margin-top: 26px;opacity:0.5" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta2['nombre'] == 'Puerta Madera') {
                                var src1 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                    puerta1['acabado1']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertasIzquierda3"  style="width:200px;position:absolute;" src="' + src1 + '">'
                                );
                            } else {
                                var src1 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta3['nombre'] == 'Puerta Madera') {
                                var src2 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_' +
                                    puerta1['acabado2']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertasIzquierda3"  style="width:200px;position:absolute;" src="' + src2 + '">'
                                );
                            } else {
                                var src2 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:2" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:2" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:2" src="../../../content/images/ar/peque/3. INTERIORES/6/peque_interior_6_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda" style="width:200px;position:absolute;margin-left: 120px;z-index: 1;margin-top: -26px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda" style="width:200px;position:absolute;margin-left: 120px;z-index: 1;margin-top: -26px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda" style="width:200px;position:absolute;margin-left: 120px;z-index: 1;margin-top: -26px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                    interior2['nombre'] +
                                    '/grande_interior_' +
                                    interior2['nombre'] +
                                    '_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
                            );
                        }

                        if (nombreArmario == '3 PUERTAS DERECHA') {
                            var interior1 = sesion[1]['interiores'][0];
                            var interior2 = sesion[1]['interiores'][1];
                            var puerta1 = sesion[1]['puertas'][0];
                            var puerta2 = sesion[1]['puertas'][1];
                            var puerta3 = sesion[1]['puertas'][2];
                            $('#cuerpo' + i).append(
                                '<div id="izquierda" class="armarioIzquierda1" style="margin-left: 590px;margin-top: 110px;float: left;"></div>'
                            );
                            $('#cuerpo' + i).append(
                                '<div id="derecha" class="armarioDerecha" style="float:left;margin-left: 125px;margin-top:515px;"></div>'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertasDerecha3" style="width:199px;position:absolute;z-index:1"  src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertasDerecha3" style="width:199px;position:absolute;z-index:1" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="armarioCalculadora" style="width:200px;position:absolute;z-index:2;margin-left: -120px;z-index: 1;margin-top: 24px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );

                            if (puerta3['nombre'] == 'Puerta Madera') {
                                var src =
                                    '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_' +
                                    puerta3['acabado2']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertasDerecha3" style="width:199px;position:absolute;z-index:1" src="' + src + '">'
                                );
                            } else {
                                if (puerta3['acabado2']['nombre'] == 'Cristal Bronce') {
                                    var src = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="puertasDerecha3" style="width:199px;position:absolute;z-index:1;opacity:0.6" src="' +
                                            src +
                                            '">'
                                    );
                                } else {
                                    var src =
                                        '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="puertasDerecha3" style="width:199px;position:absolute;z-index:1;opacity:0.5" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta1['nombre'] == 'Puerta Madera') {
                                var src1 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                    puerta1['acabado0']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="armarioCalculadora" style="width:200px;position:absolute;z-index:2;margin-left: -120px;z-index: 1;margin-top: 24px;" src="' +
                                        src1 +
                                        '">'
                                );
                            } else {
                                var src1 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta2['nombre'] == 'Puerta Madera') {
                                var src2 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_' +
                                    puerta2['acabado1']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="armarioCalculadora" style="width:200px;position:absolute;z-index:2;margin-left: -120px;z-index: 1;margin-top: 24px;" src="' +
                                        src2 +
                                        '">'
                                );
                            } else {
                                var src2 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Derecha" style="width:199px;position:absolute;z-index:2;margin-left: 120px;z-index: 1;margin-top: -24px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Derecha" style="width:199px;position:absolute;z-index:2;margin-left: 120px;z-index: 1;margin-top: -24px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Derecha" style="width:199px;position:absolute;z-index:2;margin-left: 120px;z-index: 1;margin-top: -24px;" src="../../../content/images/ar/peque/3. INTERIORES/6/peque_interior_6_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:200px;position:absolute;z-index: 3;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:200px;position:absolute;z-index: 3;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:200px;position:absolute;z-index: 3;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                    interior2['nombre'] +
                                    '/grande_interior_' +
                                    interior2['nombre'] +
                                    '_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
                            );
                        }

                        if (nombreArmario == '4 PUERTAS ASIMETRICAS') {
                            var interior1 = sesion[1]['interiores'][0];
                            var interior2 = sesion[1]['interiores'][1];
                            var interior3 = sesion[1]['interiores'][2];
                            var puerta1 = sesion[1]['puertas'][0];
                            var puerta2 = sesion[1]['puertas'][1];
                            var puerta3 = sesion[1]['puertas'][2];
                            var puerta4 = sesion[1]['puertas'][3];
                            $('#cuerpo' + i).append(
                                '<div id="izquierda" class="armarioIzquierda2" style="margin-left: 515px;margin-top: 110px;float: left;"></div>'
                            );
                            $('#cuerpo' + i).append(
                                '<div id="derecha" class="armarioDerecha" style="float:left;margin-left: 125px;margin-top:515px;"></div>'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 3;margin-top: 26px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 3;margin-top: 26px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertasIzquierda3" style="width:200px;position:absolute;z-index:2" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertasAsi4" style="width:199px;position:absolute;z-index:3;margin-left: 120px;z-index: 1;margin-top: -24px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertasAsi4" style="width:199px;position:absolute;z-index:3;margin-left: 120px;z-index: 1;margin-top: -24px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );

                            if (puerta1['nombre'] == 'Puerta Madera') {
                                var src =
                                    '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_' +
                                    puerta1['acabado0']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:2;margin-left: -120px;z-index: 3;margin-top: 26px;" src="' +
                                        src +
                                        '">'
                                );
                            } else {
                                if (puerta1['acabado0']['nombre'] == 'Cristal Bronce') {
                                    var src = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:2;margin-left: -120px;z-index: 3;margin-top: 26px;opacity:0.6" src="' +
                                            src +
                                            '">'
                                    );
                                } else {
                                    var src =
                                        '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:2;margin-left: -120px;z-index: 3;margin-top: 26px;opacity:0.5" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta2['nombre'] == 'Puerta Madera') {
                                var src1 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                    puerta2['acabado1']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertasIzquierda3" style="width:200px;position:absolute;z-index:3" src="' + src1 + '">'
                                );
                            } else {
                                var src1 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta3['nombre'] == 'Puerta Madera') {
                                var src2 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_' +
                                    puerta3['acabado2']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertasIzquierda3" style="width:200px;position:absolute;z-index:3" src="' + src2 + '">'
                                );
                            } else {
                                var src2 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta4['nombre'] == 'Puerta Madera') {
                                var src =
                                    '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_' +
                                    puerta4['acabado3']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertasAsi4" style="width:199px;position:absolute;z-index:2;margin-left: 120px;z-index: 3;margin-top: -24px;" src="' +
                                        src +
                                        '">'
                                );
                            } else {
                                if (puerta4['acabado3']['nombre'] == 'Cristal Bronce') {
                                    var src = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="puertasAsi4" style="width:199px;position:absolute;z-index:2;margin-left: 120px;z-index: 3;margin-top: -24px;opacity:0.6" src="' +
                                            src +
                                            '">'
                                    );
                                } else {
                                    var src =
                                        '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="puertasAsi4" style="width:199px;position:absolute;z-index:2;margin-left: 120px;z-index: 3;margin-top: -24px;opacity:0.5" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:3" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:3" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:3" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                    interior1['nombre'] +
                                    '/peque_interior_' +
                                    interior1['nombre'] +
                                    '_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda" style="width:200px;position:absolute;margin-left: 120px;z-index: 2;margin-top: -26px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda" style="width:200px;position:absolute;margin-left: 120px;z-index: 2;margin-top: -26px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda" style="width:200px;position:absolute;margin-left: 120px;z-index: 2;margin-top: -26px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                    interior2['nombre'] +
                                    '/grande_interior_' +
                                    interior2['nombre'] +
                                    '_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas4Asi" style="width:200px;position:absolute;margin-left: 240px;z-index: 1;margin-top: -50px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas4Asi" style="width:200px;position:absolute;margin-left: 240px;z-index: 1;margin-top: -50px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas4Asi" style="width:200px;position:absolute;margin-left: 240px;z-index: 1;margin-top: -50px;" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                    interior3['nombre'] +
                                    '/peque_interior_' +
                                    interior3['nombre'] +
                                    '_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
                            );
                        }

                        if (nombreArmario == '5 PUERTAS CENTRAL') {
                            var interior1 = sesion[1]['interiores'][0];
                            var interior2 = sesion[1]['interiores'][1];
                            var interior3 = sesion[1]['interiores'][2];
                            var puerta1 = sesion[1]['puertas'][0];
                            var puerta2 = sesion[1]['puertas'][1];
                            var puerta3 = sesion[1]['puertas'][2];
                            var puerta4 = sesion[1]['puertas'][3];
                            var puerta5 = sesion[1]['puertas'][4];
                            $('#cuerpo' + i).append(
                                '<div id="izquierda" class="armarioIzquierda2" style="margin-left: 530px;margin-top: 110px;float: left;"></div>'
                            );
                            $('#cuerpo' + i).append(
                                '<div id="derecha" class="armarioDerecha" style="float:left;margin-left: 125px;margin-top:515px;"></div>'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertasDerecha3" style="width:199px;position:absolute;z-index:2" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertasDerecha3" style="width:199px;position:absolute;z-index:2" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="armarioCalculadora" style="width:200px;position:absolute;z-index:2;margin-left: -120px;z-index: 3;margin-top: 24px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puestasCentral5" style="width:200px;position:absolute;z-index:2;margin-left: 120px;z-index: 1;margin-top: -26px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png" title="' +
                                    casco +
                                    '">'
                            );

                            if (puerta3['nombre'] == 'Puerta Madera') {
                                var src =
                                    '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_' +
                                    puerta3['acabado2']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertasDerecha3" style="width:199px;position:absolute;z-index:3" src="' + src + '">'
                                );
                            } else {
                                if (puerta3['acabado2']['nombre'] == 'Cristal Bronce') {
                                    var src = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="puertasDerecha3" style="width:199px;position:absolute;z-index:3;opacity:0.6" src="' +
                                            src +
                                            '">'
                                    );
                                } else {
                                    var src =
                                        '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="puertasDerecha3" style="width:199px;position:absolute;z-index:3;opacity:0.5" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta1['nombre'] == 'Puerta Madera') {
                                var src1 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                    puerta1['acabado0']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="armarioCalculadora" style="width:200px;position:absolute;z-index:2;margin-left: -120px;z-index: 3;margin-top: 24px;" src="' +
                                        src1 +
                                        '">'
                                );
                            } else {
                                var src1 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta2['nombre'] == 'Puerta Madera') {
                                var src2 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_' +
                                    puerta2['acabado1']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="armarioCalculadora" style="width:200px;position:absolute;z-index:2;margin-left: -120px;z-index: 3;margin-top: 24px;" src="' +
                                        src2 +
                                        '">'
                                );
                            } else {
                                var src2 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta4['nombre'] == 'Puerta Madera') {
                                var src1 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                    puerta4['acabado3']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puestasCentral5" style="width:200px;position:absolute;z-index:2;margin-left: 120px;z-index: 3;margin-top: -26px;" src="' +
                                        src1 +
                                        '">'
                                );
                            } else {
                                var src1 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta5['nombre'] == 'Puerta Madera') {
                                var src2 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_' +
                                    puerta5['acabado4']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puestasCentral5" style="width:200px;position:absolute;z-index:2;margin-left: 120px;z-index: 3;margin-top: -26px;" src="' +
                                        src2 +
                                        '">'
                                );
                            } else {
                                var src2 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Derecha" style="width:199px;position:absolute;z-index:2;margin-left: 120px;margin-top: -24px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Derecha" style="width:199px;position:absolute;z-index:2;margin-left: 120px;margin-top: -24px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Derecha" style="width:199px;position:absolute;z-index:2;margin-left: 120px;margin-top: -24px;" src="../../../content/images/ar/peque/3. INTERIORES/6/peque_interior_6_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:200px;position:absolute;z-index: 3;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:200px;position:absolute;z-index: 3;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:200px;position:absolute;z-index: 3;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                    interior2['nombre'] +
                                    '/grande_interior_' +
                                    interior2['nombre'] +
                                    '_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puestas5Central" style="width:200px;position:absolute;z-index: 1;margin-left: 240px;margin-top: -50px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puestas5Central" style="width:200px;position:absolute;z-index: 1;margin-left: 240px;margin-top: -50px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puestas5Central" style="width:200px;position:absolute;z-index: 1;margin-left: 240px;margin-top: -50px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                    interior3['nombre'] +
                                    '/grande_interior_' +
                                    interior3['nombre'] +
                                    '_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
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
                                '<div id="izquierda" class="armarioIzquierda3" style="margin-left: 490px;margin-top: 110px;float: left;"></div>'
                            );
                            $('#cuerpo' + i).append(
                                '<div id="derecha" class="armarioDerecha" style="float:left;margin-left: 125px;margin-top:515px;"></div>'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 3;margin-top: 26px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 3;margin-top: 26px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertasIzquierda3" style="width:200px;position:absolute;z-index:2;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertasIzquierda5" style="width:200px;position:absolute;z-index:2;margin-left: 160px;z-index: 1;margin-top: -33px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png" title="' +
                                    casco.toLowerCase() +
                                    '">'
                            );

                            if (puerta1['nombre'] == 'Puerta Madera') {
                                var src =
                                    '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_' +
                                    puerta1['acabado0']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 3;margin-top: 26px;" src="' +
                                        src +
                                        '">'
                                );
                            } else {
                                if (puerta1['acabado0']['nombre'] == 'Cristal Bronce') {
                                    var src = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 3;margin-top: 26px;opacity:0.6" src="' +
                                            src +
                                            '">'
                                    );
                                } else {
                                    var src =
                                        '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 3;margin-top: 26px;opacity:0.5" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta2['nombre'] == 'Puerta Madera') {
                                var src1 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                    puerta2['acabado1']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertasIzquierda3" style="width:200px;position:absolute;z-index: 3;" src="' + src1 + '">'
                                );
                            } else {
                                var src1 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta3['nombre'] == 'Puerta Madera') {
                                var src2 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_' +
                                    puerta3['acabado2']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertasIzquierda3" style="width:200px;position:absolute;z-index: 3;" src="' + src2 + '">'
                                );
                            } else {
                                var src2 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta4['nombre'] == 'Puerta Madera') {
                                var src1 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                    puerta4['acabado3']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertasIzquierda5" style="width:200px;position:absolute;margin-left: 160px;z-index: 3;margin-top: -33px;" src="' +
                                        src1 +
                                        '">'
                                );
                            } else {
                                var src1 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta5['nombre'] == 'Puerta Madera') {
                                var src2 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_' +
                                    puerta5['acabado4']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertasIzquierda5" style="width:200px;position:absolute;z-index:2;margin-left: 160px;z-index: 3;margin-top: -33px;" src="' +
                                        src2 +
                                        '">'
                                );
                            } else {
                                var src2 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:3;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:3;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:3;" src="../../../content/images/ar/peque/3. INTERIORES/6/peque_interior_6_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda" style="width:200px;position:absolute;z-index: 2;margin-left: 120px;margin-top: -25px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda" style="width:200px;position:absolute;z-index: 2;margin-left: 120px;margin-top: -25px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda" style="width:200px;position:absolute;z-index: 2;margin-left: 120px;margin-top: -25px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                    interior2['nombre'] +
                                    '/grande_interior_' +
                                    interior2['nombre'] +
                                    '_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas5Izquierda" style="width:200px;position:absolute;z-index: 1;margin-left: 280px;margin-top: -58px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas5Izquierda" style="width:200px;position:absolute;z-index: 1;margin-left: 280px;margin-top: -58px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas5Izquierda" style="width:200px;position:absolute;z-index: 1;margin-left: 280px;margin-top: -58px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                    interior3['nombre'] +
                                    '/grande_interior_' +
                                    interior3['nombre'] +
                                    '_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
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
                                '<div id="izquierda" class="armarioIzquierda4" style="margin-left: 445px;margin-top: 130px;float: left;"></div>'
                            );
                            $('#cuerpo' + i).append(
                                '<div id="derecha" class="armarioDerecha" style="float:left;margin-left: 125px;margin-top:515px;"></div>'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 4;margin-top: 26px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 4;margin-top: 26px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertasIzquierda3" style="width:200px;position:absolute;z-index:3;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertasIzquierda5" style="width:200px;position:absolute;z-index:2;margin-left: 160px;z-index: 2;margin-top: -33px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puestasAsi6" style="width:199px;position:absolute;z-index:3;margin-left: 280px;z-index: 1;margin-top: -57px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );

                            if (puerta1['nombre'] == 'Puerta Madera') {
                                var src =
                                    '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_' +
                                    puerta1['acabado0']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 4;margin-top: 26px;" src="' +
                                        src +
                                        '">'
                                );
                            } else {
                                if (puerta1['acabado0']['nombre'] == 'Cristal Bronce') {
                                    var src = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 3;margin-top: 26px;opacity:0.6" src="' +
                                            src +
                                            '">'
                                    );
                                } else {
                                    var src =
                                        '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 3;margin-top: 26px;opacity:0.5" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta2['nombre'] == 'Puerta Madera') {
                                var src1 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                    puerta2['acabado1']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertasIzquierda3" style="width:200px;position:absolute;z-index: 3;" src="' + src1 + '">'
                                );
                            } else {
                                var src1 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta3['nombre'] == 'Puerta Madera') {
                                var src2 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_' +
                                    puerta3['acabado2']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertasIzquierda3" style="width:200px;position:absolute;z-index: 3;" src="' + src2 + '">'
                                );
                            } else {
                                var src2 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta4['nombre'] == 'Puerta Madera') {
                                var src1 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                    puerta4['acabado3']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertasIzquierda5" style="width:200px;position:absolute;margin-left: 160px;z-index: 3;margin-top: -33px;" src="' +
                                        src1 +
                                        '">'
                                );
                            } else {
                                var src1 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta5['nombre'] == 'Puerta Madera') {
                                var src2 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_' +
                                    puerta5['acabado4']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puertasIzquierda5" style="width:200px;position:absolute;z-index:2;margin-left: 160px;z-index: 3;margin-top: -33px;" src="' +
                                        src2 +
                                        '">'
                                );
                            } else {
                                var src2 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta6['nombre'] == 'Puerta Madera') {
                                var src =
                                    '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_' +
                                    puerta6['acabado5']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img class="puestasAsi6" style="width:200px;position:absolute;z-index:3;margin-left: 280px;z-index: 3;margin-top: -57px;" src="' +
                                        src +
                                        '">'
                                );
                            } else {
                                if (puerta6['acabado5']['nombre'] == 'Cristal Bronce') {
                                    var src = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="puestasAsi6" style="width:200px;position:absolute;z-index:3;margin-left: 280px;z-index: 3;margin-top: -57px;opacity:0.6" src="' +
                                            src +
                                            '">'
                                    );
                                } else {
                                    var src =
                                        '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="puestasAsi6" style="width:200px;position:absolute;z-index:3;margin-left: 280px;z-index: 3;margin-top: -57px;opacity:0.5" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:4;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:4;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:199px;position:absolute;z-index:4;" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                    interior1['nombre'] +
                                    '/peque_interior_' +
                                    interior1['nombre'] +
                                    '_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda" style="width:200px;position:absolute;z-index: 3;margin-left: 120px;margin-top: -26px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda" style="width:200px;position:absolute;z-index: 3;margin-left: 120px;margin-top: -26px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda" style="width:200px;position:absolute;z-index: 3;margin-left: 120px;margin-top: -26px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                    interior2['nombre'] +
                                    '/grande_interior_' +
                                    interior2['nombre'] +
                                    '_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas5Izquierda" style="width:200px;position:absolute;z-index: 2;margin-left: 280px;margin-top: -59px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas5Izquierda" style="width:200px;position:absolute;z-index: 2;margin-left: 280px;margin-top: -59px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas5Izquierda" style="width:200px;position:absolute;z-index: 2;margin-left: 280px;margin-top: -59px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                    interior3['nombre'] +
                                    '/grande_interior_' +
                                    interior3['nombre'] +
                                    '_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puestas6Asi" style="width:199px;position:absolute;z-index:1;margin-left: 400px;margin-top: -83px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puestas6Asi" style="width:199px;position:absolute;z-index:1;margin-left: 400px;margin-top: -83px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puestas6Asi" style="width:199px;position:absolute;z-index:1;margin-left: 400px;margin-top: -83px;" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                    interior4['nombre'] +
                                    '/peque_interior_' +
                                    interior4['nombre'] +
                                    '_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
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
                            $('#cuerpo' + i).append('<div id="izquierda" style="margin-left: 400px;margin-top: 130px;float: left;"></div>');
                            $('#cuerpo' + i).append('<div id="derecha" style="float:left;margin-left: 125px;margin-top:515px;"></div>');
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 4;margin-top: 26px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 4;margin-top: 26px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:200px;position:absolute;z-index:3;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:200px;position:absolute;z-index:2;margin-left: 160px;margin-top: -33px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:200px;position:absolute;z-index:2;margin-left: 320px;z-index: 1;margin-top: -66px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );

                            if (puerta1['nombre'] == 'Puerta Madera') {
                                var src =
                                    '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_' +
                                    puerta1['acabado']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 5;margin-top: 26px;" src="' +
                                        src +
                                        '">'
                                );
                            } else {
                                if (puerta1['acabado']['nombre'] == 'Cristal Bronce') {
                                    var src = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 5;margin-top: 26px;opacity:0.6" src="' +
                                            src +
                                            '">'
                                    );
                                } else {
                                    var src =
                                        '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 5;margin-top: 26px;opacity:0.5" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta2['nombre'] == 'Puerta Madera') {
                                var src1 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                    puerta1['acabado']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:200px;position:absolute;z-index: 3;" src="' + src1 + '">'
                                );
                            } else {
                                var src1 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta3['nombre'] == 'Puerta Madera') {
                                var src2 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_' +
                                    puerta1['acabado']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:200px;position:absolute;z-index: 3;" src="' + src2 + '">'
                                );
                            } else {
                                var src2 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta4['nombre'] == 'Puerta Madera') {
                                var src1 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                    puerta4['acabado']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:200px;position:absolute;margin-left: 160px;z-index: 3;margin-top: -33px;" src="' +
                                        src1 +
                                        '">'
                                );
                            } else {
                                var src1 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta5['nombre'] == 'Puerta Madera') {
                                var src2 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_' +
                                    puerta5['acabado']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:200px;position:absolute;z-index:2;margin-left: 160px;z-index: 3;margin-top: -33px;" src="' +
                                        src2 +
                                        '">'
                                );
                            } else {
                                var src2 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta6['nombre'] == 'Puerta Madera') {
                                var src1 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                    puerta6['acabado']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:200px;position:absolute;margin-left: 320px;z-index: 3;margin-top: -66px;" src="' +
                                        src1 +
                                        '">'
                                );
                            } else {
                                var src1 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta7['nombre'] == 'Puerta Madera') {
                                var src2 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_' +
                                    puerta7['acabado']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:200px;position:absolute;z-index:2;margin-left: 320px;z-index: 3;margin-top: -66px;" src="' +
                                        src2 +
                                        '">'
                                );
                            } else {
                                var src2 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:199px;position:absolute;z-index:4;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:199px;position:absolute;z-index:4;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:199px;position:absolute;z-index:4;" src="../../../content/images/ar/peque/3. INTERIORES/6/peque_interior_6_' +
                                    interiores.toLowerCase() +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 3;margin-left: 120px;margin-top: -25px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 3;margin-left: 120px;margin-top: -25px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 3;margin-left: 120px;margin-top: -25px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                    interior2['nombre'] +
                                    '/grande_interior_' +
                                    interior2['nombre'] +
                                    '_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 2;margin-left: 280px;margin-top: -58px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 2;margin-left: 280px;margin-top: -58px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 2;margin-left: 280px;margin-top: -58px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                    interior3['nombre'] +
                                    '/grande_interior_' +
                                    interior3['nombre'] +
                                    '_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 1;margin-left: 440px;margin-top: -91px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 1;margin-left: 440px;margin-top: -91px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 1;margin-left: 440px;margin-top: -91px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                    interior4['nombre'] +
                                    '/grande_interior_' +
                                    interior4['nombre'] +
                                    '_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
                            );
                        }

                        if (nombreArmario == '8 PUERTAS ASIMETRICAS') {
                            var interior1 = sesion[1]['interiores'][0];
                            var interior2 = sesion[1]['interiores'][1];
                            var interior3 = sesion[1]['interiores'][2];
                            var interior4 = sesion[1]['interiores'][3];
                            var interior5 = sesion[1]['interiores'][4];
                            var puerta1 = sesion[1]['puertas'][0];
                            var puerta2 = sesion[1]['puertas'][1];
                            var puerta3 = sesion[1]['puertas'][2];
                            var puerta4 = sesion[1]['puertas'][3];
                            var puerta5 = sesion[1]['puertas'][4];
                            var puerta6 = sesion[1]['puertas'][5];
                            var puerta7 = sesion[1]['puertas'][6];
                            var puerta8 = sesion[1]['puertas'][7];
                            $('#cuerpo' + i).append('<div id="izquierda" style="margin-left: 360px;margin-top: 150px;float: left;"></div>');
                            $('#cuerpo' + i).append('<div id="derecha" style="float:left;margin-left: 125px;margin-top:535px;"></div>');
                            $('#cuerpo' + i).css({ 'margin-bottom': '1%' });
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:199px;position:absolute;z-index:5;margin-left: -120px;z-index: 5;margin-top: 26px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:199px;position:absolute;z-index:5;margin-left: -120px;z-index: 5;margin-top: 26px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:200px;position:absolute;z-index:4;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:200px;position:absolute;z-index:2;margin-left: 160px;z-index: 3;margin-top: -34px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:200px;position:absolute;z-index:2;margin-left: 320px;z-index: 2;margin-top: -68px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:199px;position:absolute;z-index:3;margin-left: 440px;z-index: 1;margin-top: -94px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );

                            if (puerta1['nombre'] == 'Puerta Madera') {
                                var src =
                                    '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_' +
                                    puerta1['acabado']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 10;margin-top: 26px;" src="' +
                                        src +
                                        '">'
                                );
                            } else {
                                if (puerta1['acabado']['nombre'] == 'Cristal Bronce') {
                                    var src = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 10;margin-top: 26px;opacity:0.6" src="' +
                                            src +
                                            '">'
                                    );
                                } else {
                                    var src =
                                        '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 10;margin-top: 26px;opacity:0.5" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta2['nombre'] == 'Puerta Madera') {
                                var src1 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                    puerta1['acabado']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:200px;position:absolute;z-index: 10;" src="' + src1 + '">'
                                );
                            } else {
                                var src1 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta3['nombre'] == 'Puerta Madera') {
                                var src2 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_' +
                                    puerta1['acabado']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:200px;position:absolute;z-index: 10;" src="' + src2 + '">'
                                );
                            } else {
                                var src2 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta4['nombre'] == 'Puerta Madera') {
                                var src1 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                    puerta4['acabado']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:200px;position:absolute;margin-left: 160px;z-index: 10;margin-top: -34px;" src="' +
                                        src1 +
                                        '">'
                                );
                            } else {
                                var src1 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta5['nombre'] == 'Puerta Madera') {
                                var src2 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_' +
                                    puerta5['acabado']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:200px;position:absolute;z-index:2;margin-left: 160px;z-index: 10;margin-top: -34px;" src="' +
                                        src2 +
                                        '">'
                                );
                            } else {
                                var src2 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta6['nombre'] == 'Puerta Madera') {
                                var src2 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                    puerta6['acabado']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:200px;position:absolute;z-index:2;margin-left: 320px;z-index: 10;margin-top: -68px;" src="' +
                                        src2 +
                                        '">'
                                );
                            } else {
                                var src2 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }
                            if (puerta7['nombre'] == 'Puerta Madera') {
                                var src2 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_' +
                                    puerta7['acabado']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:200px;position:absolute;z-index:2;margin-left: 320px;z-index: 10;margin-top: -68px;" src="' +
                                        src2 +
                                        '">'
                                );
                            } else {
                                var src2 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta8['nombre'] == 'Puerta Madera') {
                                var src =
                                    '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_' +
                                    puerta6['acabado']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:199px;position:absolute;z-index:3;margin-left: 440px;z-index: 10;margin-top: -94px;" src="' +
                                        src +
                                        '">'
                                );
                            } else {
                                if (puerta1['acabado']['nombre'] == 'Cristal Bronce') {
                                    var src = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img style="width:199px;position:absolute;z-index:3;margin-left: 440px;z-index: 10;margin-top: -94px;opacity:0.6" src="' +
                                            src +
                                            '">'
                                    );
                                } else {
                                    var src =
                                        '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img style="width:199px;position:absolute;z-index:3;margin-left: 440px;z-index: 10;margin-top: -94px;opacity:0.5" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:199px;position:absolute;z-index:5;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:199px;position:absolute;z-index:5;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:199px;position:absolute;z-index:5;" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                    interior1['nombre'] +
                                    '/peque_interior_' +
                                    interior1['nombre'] +
                                    '_' +
                                    interiores.toLowerCase() +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 4;margin-left: 120px;margin-top: -26px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 4;margin-left: 120px;margin-top: -26px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 4;margin-left: 120px;margin-top: -26px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                    interior2['nombre'] +
                                    '/grande_interior_' +
                                    interior2['nombre'] +
                                    '_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 3;margin-left: 280px;margin-top: -60px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 3;margin-left: 280px;margin-top: -60px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 3;margin-left: 280px;margin-top: -60px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                    interior3['nombre'] +
                                    '/grande_interior_' +
                                    interior3['nombre'] +
                                    '_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 2;margin-left: 440px;margin-top: -94px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 2;margin-left: 440px;margin-top: -94px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 2;margin-left: 440px;margin-top: -94px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                    interior4['nombre'] +
                                    '/grande_interior_' +
                                    interior4['nombre'] +
                                    '_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:199px;position:absolute;z-index:1;margin-left: 560px;margin-top: -120px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:199px;position:absolute;z-index:1;margin-left: 560px;margin-top: -120px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:199px;position:absolute;z-index:1;margin-left: 560px;margin-top: -120px;" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                    interior5['nombre'] +
                                    '/peque_interior_' +
                                    interior5['nombre'] +
                                    '_' +
                                    interiores.toLowerCase() +
                                    '.png">'
                            );
                        }

                        if (nombreArmario == '12 PUERTAS ASIMETRICAS') {
                            var interior1 = sesion[1]['interiores'][0];
                            var interior2 = sesion[1]['interiores'][1];
                            var interior3 = sesion[1]['interiores'][2];
                            var interior4 = sesion[1]['interiores'][3];
                            var interior5 = sesion[1]['interiores'][4];
                            var interior6 = sesion[1]['interiores'][5];
                            var interior7 = sesion[1]['interiores'][6];
                            var puerta1 = sesion[1]['puertas'][0];
                            var puerta2 = sesion[1]['puertas'][1];
                            var puerta3 = sesion[1]['puertas'][2];
                            var puerta4 = sesion[1]['puertas'][3];
                            var puerta5 = sesion[1]['puertas'][4];
                            var puerta6 = sesion[1]['puertas'][5];
                            var puerta7 = sesion[1]['puertas'][6];
                            var puerta8 = sesion[1]['puertas'][7];
                            var puerta9 = sesion[1]['puertas'][8];
                            var puerta10 = sesion[1]['puertas'][9];
                            var puerta11 = sesion[1]['puertas'][10];

                            var puerta12 = sesion[1]['puertas'][11];
                            $('#cuerpo' + i).append('<div id="izquierda" style="margin-left: 210px;margin-top: 200px;float: left;"></div>');
                            $('#cuerpo' + i).append('<div id="derecha" style="float:left;margin-left: 125px;margin-top:585px;"></div>');
                            $('#cuerpo' + i).css({ 'margin-bottom': '5%' });
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:199px;position:absolute;z-index:5;margin-left: -120px;z-index: 7;margin-top: 26px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:199px;position:absolute;z-index:5;margin-left: -120px;z-index: 7;margin-top: 26px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:200px;position:absolute;z-index:6;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:200px;position:absolute;z-index:2;margin-left: 160px;z-index: 5;margin-top: -33px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:200px;position:absolute;z-index:2;margin-left: 320px;z-index: 4;margin-top: -66px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:200px;position:absolute;z-index:2;margin-left: 480px;z-index: 3;margin-top: -99px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:200px;position:absolute;z-index:2;margin-left: 640px;z-index: 2;margin-top: -132px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:199px;position:absolute;z-index:3;margin-left: 760px;z-index: 1;margin-top: -156px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );

                            if (puerta1['nombre'] == 'Puerta Madera') {
                                var src =
                                    '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_' +
                                    puerta1['acabado']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:200px;position:absolute;z-index:3;margin-left: -120px;z-index: 10;margin-top: 26px;" src="' +
                                        src +
                                        '">'
                                );
                            } else {
                                if (puerta1['acabado']['nombre'] == 'Cristal Bronce') {
                                    var src = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img style="width:200px;position:absolute;z-index:3;margin-left: -120px;z-index: 10;margin-top: 26px;opacity:0.6" src="' +
                                            src +
                                            '">'
                                    );
                                } else {
                                    var src =
                                        '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img style="width:200px;position:absolute;z-index:3;margin-left: -120px;z-index: 10;margin-top: 26px;opacity:0.5" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta2['nombre'] == 'Puerta Madera') {
                                var src1 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                    puerta1['acabado']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:200px;position:absolute;z-index: 10;" src="' + src1 + '">'
                                );
                            } else {
                                var src1 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta3['nombre'] == 'Puerta Madera') {
                                var src2 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_' +
                                    puerta1['acabado']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:200px;position:absolute;z-index: 10;" src="' + src2 + '">'
                                );
                            } else {
                                var src2 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta4['nombre'] == 'Puerta Madera') {
                                var src1 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                    puerta4['acabado']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:200px;position:absolute;margin-left: 160px;z-index: 10;margin-top: -33px;" src="' +
                                        src1 +
                                        '">'
                                );
                            } else {
                                var src1 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta5['nombre'] == 'Puerta Madera') {
                                var src2 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_' +
                                    puerta5['acabado']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:200px;position:absolute;z-index:2;margin-left: 160px;z-index: 10;margin-top: -33px;" src="' +
                                        src2 +
                                        '">'
                                );
                            } else {
                                var src2 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta6['nombre'] == 'Puerta Madera') {
                                var src2 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                    puerta6['acabado']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:200px;position:absolute;z-index:2;margin-left: 320px;z-index: 10;margin-top: -66px;" src="' +
                                        src2 +
                                        '">'
                                );
                            } else {
                                var src2 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }
                            if (puerta7['nombre'] == 'Puerta Madera') {
                                var src2 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_' +
                                    puerta7['acabado']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:200px;position:absolute;z-index:2;margin-left: 320px;z-index: 10;margin-top: -66px;" src="' +
                                        src2 +
                                        '">'
                                );
                            } else {
                                var src2 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta8['nombre'] == 'Puerta Madera') {
                                var src2 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                    puerta8['acabado']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:200px;position:absolute;z-index:2;margin-left: 480px;z-index: 10;margin-top: -99px;" src="' +
                                        src2 +
                                        '">'
                                );
                            } else {
                                var src2 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }
                            if (puerta9['nombre'] == 'Puerta Madera') {
                                var src2 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_' +
                                    puerta9['acabado']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:200px;position:absolute;z-index:20;margin-left: 480px;z-index: 100;margin-top: -99px;" src="' +
                                        src2 +
                                        '">'
                                );
                            } else {
                                var src2 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta10['nombre'] == 'Puerta Madera') {
                                var src2 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                    puerta10['acabado']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:200px;position:absolute;z-index:20;margin-left: 640px;z-index: 100;margin-top: -132px;" src="' +
                                        src2 +
                                        '">'
                                );
                            } else {
                                var src2 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }
                            if (puerta11['nombre'] == 'Puerta Madera') {
                                var src2 =
                                    '../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_' +
                                    puerta11['acabado']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:200px;position:absolute;z-index:20;margin-left: 640px;z-index: 100;margin-top: -132px;" src="' +
                                        src2 +
                                        '">'
                                );
                            } else {
                                var src2 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                            }

                            if (puerta12['nombre'] == 'Puerta Madera') {
                                var src =
                                    '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_' +
                                    puerta12['acabado']['nombre'].toLowerCase() +
                                    '_optimized.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:200px;position:absolute;z-index:30;margin-left: 760px;z-index: 100;margin-top: -156px;" src="' +
                                        src +
                                        '">'
                                );
                            } else {
                                if (puerta1['acabado']['nombre'] == 'Cristal Bronce') {
                                    var src = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img style="width:200px;position:absolute;z-index:30;margin-left: 760px;z-index: 10;margin-top: -156px;opacity:0.6" src="' +
                                            src +
                                            '">'
                                    );
                                } else {
                                    var src =
                                        '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img style="width:200px;position:absolute;z-index:30;margin-left: 760px;z-index: 10;margin-top: -156px;opacity:0.5" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:199px;position:absolute;z-index:7;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:199px;position:absolute;z-index:7;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:199px;position:absolute;z-index:7;" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                    interior1['nombre'] +
                                    '/peque_interior_' +
                                    interior1['nombre'] +
                                    '_' +
                                    interiores.toLowerCase() +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 6;margin-left: 120px;margin-top: -26px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 6;margin-left: 120px;margin-top: -26px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 6;margin-left: 120px;margin-top: -26px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                    interior2['nombre'] +
                                    '/grande_interior_' +
                                    interior2['nombre'] +
                                    '_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 5;margin-left: 280px;margin-top: -59px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 5;margin-left: 280px;margin-top: -59px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 5;margin-left: 280px;margin-top: -59px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                    interior3['nombre'] +
                                    '/grande_interior_' +
                                    interior3['nombre'] +
                                    '_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 4;margin-left: 440px;margin-top: -92px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 4;margin-left: 440px;margin-top: -92px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 4;margin-left: 440px;margin-top: -92px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                    interior4['nombre'] +
                                    '/grande_interior_' +
                                    interior4['nombre'] +
                                    '_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 3;margin-left: 600px;margin-top: -125px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 3;margin-left: 600px;margin-top: -125px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 3;margin-left: 600px;margin-top: -125px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                    interior5['nombre'] +
                                    '/grande_interior_' +
                                    interior5['nombre'] +
                                    '_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 2;margin-left: 760px;margin-top: -158px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 2;margin-left: 760px;margin-top: -158px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:200px;position:absolute;z-index: 2;margin-left: 760px;margin-top: -158px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                    interior6['nombre'] +
                                    '/grande_interior_' +
                                    interior6['nombre'] +
                                    '_' +
                                    interiores.toLowerCase() +
                                    '_optimized.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:199px;position:absolute;z-index:1;margin-left: 880px;margin-top: -182px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                    casco.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:199px;position:absolute;z-index:1;margin-left: 880px;margin-top: -182px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                    trasera.toLowerCase() +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="width:199px;position:absolute;z-index:1;margin-left: 880px;margin-top: -182px;" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                    interior7['nombre'] +
                                    '/peque_interior_' +
                                    interior7['nombre'] +
                                    '_' +
                                    interiores.toLowerCase() +
                                    '.png">'
                            );
                        }

                        $('#modalCesta .modal-body').append(
                            '<div style="float: left;width: 100%;margin-top:50%" id="textoCesta' + i + '"></div>'
                        );
                        $('#textoCesta' + i).append(
                            '<p style="letter-spacing: 1px;font-weight: 300;margin-left:28%;">' +
                                sesion[1]['productosDormitorio']['nombre'].toUpperCase() +
                                '<i style="float:right;margin-right:40%">&euro; ' +
                                sesion[1]['precioCasco'] +
                                '</i></p>'
                        );

                        $('#textoCesta' + i).append(
                            '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;">Ancho: ' +
                                sesion[1]['ancho'] +
                                '</p>'
                        );
                        $('#textoCesta' + i).append(
                            '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;">Alto: ' +
                                sesion[1]['alto'] +
                                '</p>'
                        );
                        $('#textoCesta' + i).append(
                            '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;">Fondo: ' +
                                sesion[1]['fondo'] +
                                '</p>'
                        );
                        $('#textoCesta' + i).append('<hr style="100%"></hr>');
                    } else {
                        $('#modalCesta .modal-body').append(
                            '<div style="float: left;width: 500px;text-align: center;height:300px;position:relative" id="cuerpo' +
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
                        var bottomModulos = this.bottomModulos;
                        if (nombre == 'mb1') {
                            $('#cuerpo' + i).append(
                                '<div id="izquierda" class="marginIzquierda" style="float: left;margin-top:20px"></div>'
                            );
                            if (i == 1) {
                                this.acaProdService.findAca(sesion[1]['productosDormitorio']['id']).subscribe(data => {
                                    if (data.body[0]['imagen'] != null) {
                                        $('#cuerpo' + i + ' #izquierda').append(
                                            '<img style="z-index:' +
                                                (100 - i) +
                                                ';max-width:400px;max-height:400px;;max-width:400px;max-height:250px;position:absolute;top:0px" width="1000px" height="1000px" src="data:image/gif;base64,' +
                                                data.body[0]['imagen'] +
                                                '>'
                                        );
                                    }
                                });
                            }

                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:400px;max-height:250px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );

                            for (let k = 0; k < acabados.length; k++) {
                                if (acabados[k].toLowerCase() == 'marmol blanco') {
                                    acabados[k] = 'marmolblanco';
                                }
                                if (acabados[k].toLowerCase() == 'marmol negro') {
                                    acabados[k] = 'marmolnegro';
                                }
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                        var left = prodMed.split(';')[0];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                            var left = prodMed.split(';')[0];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                            var left = prodMed.split(';')[0];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    }
                                }
                            }
                        } else {
                            contAca = 1;
                            $('#cuerpo' + i).append(
                                '<div id="izquierda" class="marginIzquierda" style="float: left;margin-top:20px"></div>'
                            );

                            if (nombre == 'mb6') {
                                var prodMed = this.medidasModal[nombre];
                                var height = prodMed.split(';')[3];
                                var width = prodMed.split(';')[2];
                                var left = prodMed.split(';')[0];
                                $('#cuerpo' + i + ' #izquierda').append(
                                    '<img style="z-index:' +
                                        (100 - i) +
                                        ';max-width:400px;max-height:400px;' +
                                        left +
                                        ';' +
                                        height +
                                        ';' +
                                        width +
                                        ';max-width:400px;max-height:250px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                        nombreCarpeta +
                                        '/0 NUMEROS/' +
                                        nombreCarpeta +
                                        '_numeros_optimized.png">'
                                );

                                for (let k = 0; k < acabados.length; k++) {
                                    if (k == 0) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (k == 1) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                                $('#cuerpo' + i + ' #izquierda').append(
                                                    '<img style="z-index:100;margin-left:-60px;top:20px;max-width:400px;max-height:400px;' +
                                                        height +
                                                        ';' +
                                                        width +
                                                        ';max-width:400px;max-height:250px;" id="' +
                                                        nombre +
                                                        '" class="' +
                                                        acabados[k].toLowerCase() +
                                                        'Modal" width="1000px" height="1000px" src="../../../content/images/' +
                                                        nombreCarpeta +
                                                        '/' +
                                                        (k + 1) +
                                                        '/' +
                                                        nombreCarpeta +
                                                        '_' +
                                                        (k + 1) +
                                                        '_' +
                                                        acabados[k].toLowerCase() +
                                                        '_optimized.png">'
                                                );
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        } else {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'ap2') {
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:400px;max-height:250px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );

                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'sg1') {
                            $('#cuerpo' + i).css({ height: '400px' });
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:200px;max-height:350px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );

                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    }
                                }
                            }
                        }
                        if (nombre == 'sg2') {
                            $('#cuerpo' + i).css({ height: '400px' });
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:200px;max-height:350px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'sg3') {
                            $('#cuerpo' + i).css({ height: '400px' });
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:200px;max-height:350px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                            $('#cuerpo' + i + ' #izquierda').append(
                                                '<img style="z-index:100;margin-left:0px;top:20px;max-width:400px;max-height:400px;' +
                                                    height +
                                                    ';' +
                                                    width +
                                                    ';max-width:200px;max-height:350px;" id="' +
                                                    nombre +
                                                    '" class="' +
                                                    acabados[k].toLowerCase() +
                                                    'Modal" width="1000px" height="1000px" src="../../../content/images/' +
                                                    nombre +
                                                    ' apertura izquierda/' +
                                                    (k + 1) +
                                                    '/' +
                                                    nombre +
                                                    '_' +
                                                    (k + 1) +
                                                    '_' +
                                                    acabados[k].toLowerCase() +
                                                    '_optimized.png">'
                                            );
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (k == 2) {
                                            var acaCristal = acabados[k].toLowerCase();
                                            if (acaCristal == 'cristal bronce') {
                                                acaCristal = 'bronce';
                                            } else {
                                                acaCristal = 'transparente';
                                            }
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }

                                        if (k == 3) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'sg4') {
                            $('#cuerpo' + i).css({ height: '400px' });
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:200px;max-height:350px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (k == 3) {
                                            var acaCristal = acabados[k].toLowerCase();
                                            if (acaCristal == 'cristal bronce') {
                                                acaCristal = 'bronce';
                                            } else {
                                                acaCristal = 'transparente';
                                            }
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }

                                        if (k == 2) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }
                                        if (k == 4) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'sg5') {
                            $('#cuerpo' + i).css({ height: '400px' });
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:200px;max-height:350px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (k == 3) {
                                            var acaCristal = acabados[k].toLowerCase();
                                            if (acaCristal == 'cristal bronce') {
                                                acaCristal = 'bronce';
                                            } else {
                                                acaCristal = 'transparente';
                                            }
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }

                                        if (k == 2) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }
                                        if (k == 4) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'sg6') {
                            $('#cuerpo' + i).css({ height: '400px' });
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:200px;max-height:350px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );

                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (k == 4) {
                                            var acaCristal = acabados[k].toLowerCase();
                                            if (acaCristal == 'cristal bronce') {
                                                acaCristal = 'bronce';
                                            } else {
                                                acaCristal = 'transparente';
                                            }
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }

                                        if (k == 2) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }
                                        if (k == 3) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }

                                        if (k == 5) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (
                            nombre == 'cv27' ||
                            nombre == 'cv25' ||
                            nombre == 'cv6' ||
                            nombre == 'cv19' ||
                            nombre == 'cv10' ||
                            nombre == 'cv12'
                        ) {
                            $('#cuerpo' + i).css({ height: '400px' });
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:200px;max-height:350px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (k == 2) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }
                                        if (k == 3) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }

                                        if (k == 4) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'sg7') {
                            $('#cuerpo' + i).css({ height: '400px' });
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:200px;max-height:350px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (k == 4) {
                                            var acaCristal = acabados[k].toLowerCase();
                                            if (acaCristal == 'cristal bronce') {
                                                acaCristal = 'bronce';
                                            } else {
                                                acaCristal = 'transparente';
                                            }
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }

                                        if (k == 2) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }
                                        if (k == 3) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }

                                        if (k == 5) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'sg9') {
                            $('#cuerpo' + i).css({ height: '400px' });
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:200px;max-height:350px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (k == 3) {
                                            var acaCristal = acabados[k].toLowerCase();
                                            if (acaCristal == 'cristal bronce') {
                                                acaCristal = 'bronce';
                                            } else {
                                                acaCristal = 'transparente';
                                            }
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }

                                        if (k == 2) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }
                                        if (k == 4) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'sg14') {
                            $('#cuerpo' + i).css({ height: '400px' });
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:200px;max-height:350px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (k == 2) {
                                            var acaCristal = acabados[k].toLowerCase();
                                            if (acaCristal == 'cristal bronce') {
                                                acaCristal = 'bronce';
                                            } else {
                                                acaCristal = 'transparente';
                                            }
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'sg11') {
                            $('#cuerpo' + i).css({ height: '400px' });
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:200px;max-height:350px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (k == 4) {
                                            var acaCristal = acabados[k].toLowerCase();
                                            if (acaCristal == 'cristal bronce') {
                                                acaCristal = 'bronce';
                                            } else {
                                                acaCristal = 'transparente';
                                            }
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }

                                        if (k == 2) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }
                                        if (k == 3) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }
                                        if (k == 5) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'sg15') {
                            $('#cuerpo' + i).css({ height: '400px' });
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:200px;max-height:350px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (k == 2) {
                                            var acaCristal = acabados[k].toLowerCase();
                                            if (acaCristal == 'cristal bronce') {
                                                acaCristal = 'bronce';
                                            } else {
                                                acaCristal = 'transparente';
                                            }
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }

                                        if (k == 3) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (nombre == 'sg16') {
                            $('#cuerpo' + i).css({ height: '400px' });
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:200px;max-height:350px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        var acaCristal = acabados[k].toLowerCase();
                                        if (acaCristal == 'cristal bronce') {
                                            acaCristal = 'bronce';
                                        } else {
                                            acaCristal = 'transparente';
                                        }
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'sg12') {
                            $('#cuerpo' + i).css({ height: '400px' });
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:200px;max-height:350px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        var acaCristal = acabados[k].toLowerCase();
                                        if (acaCristal == 'cristal bronce') {
                                            acaCristal = 'bronce';
                                        } else {
                                            acaCristal = 'transparente';
                                        }
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'sg13') {
                            $('#cuerpo' + i).css({ height: '400px' });
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:200px;max-height:350px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        var acaCristal = acabados[k].toLowerCase();
                                        if (acaCristal == 'cristal bronce') {
                                            acaCristal = 'bronce';
                                        } else {
                                            acaCristal = 'transparente';
                                        }
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    }
                                    if (k == 2) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'sg8') {
                            $('#cuerpo' + i).css({ height: '400px' });
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:200px;max-height:350px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (k == 2) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }
                                        if (k == 3) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }

                                        if (k == 4) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'sg10') {
                            $('#cuerpo' + i).css({ height: '400px' });
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:200px;max-height:350px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (k == 2) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }
                                        if (k == 3) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }

                                        if (k == 4) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'ap4') {
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:400px;max-height:250px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'ap7') {
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:400px;max-height:250px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'ap10') {
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:400px;max-height:250px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'ap5') {
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:400px;max-height:250px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                        var acabadoCasco = acabados[k].toLowerCase();
                                    } else {
                                        var acabadoCasco = acabados[k].toLowerCase();
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (k != 4) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        } else {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                                var aca1Nombre = acabados[k].toLowerCase();
                                                if (aca1Nombre == 'cristal bronce') {
                                                }

                                                if (aca1Nombre == 'cristal transparente') {
                                                }
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];

                                                var aca1Nombre = acabados[k].toLowerCase();
                                                if (aca1Nombre == 'cristal bronce') {
                                                }

                                                if (aca1Nombre == 'cristal transparente') {
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'ap6') {
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:400px;max-height:250px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                        var acabadoCasco = acabados[k].toLowerCase();
                                    } else {
                                        var acabadoCasco = acabados[k].toLowerCase();
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (k != 4) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        } else {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                                var aca1Nombre = acabados[k].toLowerCase();
                                                if (aca1Nombre == 'cristal bronce') {
                                                }

                                                if (aca1Nombre == 'cristal transparente') {
                                                }
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];

                                                var aca1Nombre = acabados[k].toLowerCase();
                                                if (aca1Nombre == 'cristal bronce') {
                                                }

                                                if (aca1Nombre == 'cristal transparente') {
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'ap9') {
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:400px;max-height:250px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                        var acabadoCasco = acabados[k].toLowerCase();
                                    } else {
                                        var acabadoCasco = acabados[k].toLowerCase();
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (k != 5) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        } else {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                                var aca1Nombre = acabados[k].toLowerCase();
                                                if (aca1Nombre == 'cristal bronce') {
                                                }

                                                if (aca1Nombre == 'cristal transparente') {
                                                }
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];

                                                var aca1Nombre = acabados[k].toLowerCase();
                                                if (aca1Nombre == 'cristal bronce') {
                                                }

                                                if (aca1Nombre == 'cristal transparente') {
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'ap8') {
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:400px;max-height:250px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                        var acabadoCasco = acabados[k].toLowerCase();
                                    } else {
                                        var acabadoCasco = acabados[k].toLowerCase();
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (k != 10) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        } else {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                                var aca1Nombre = acabados[k].toLowerCase();
                                                if (aca1Nombre == 'cristal bronce') {
                                                }

                                                if (aca1Nombre == 'cristal transparente') {
                                                }
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];

                                                var aca1Nombre = acabados[k].toLowerCase();
                                                if (aca1Nombre == 'cristal bronce') {
                                                }

                                                if (aca1Nombre == 'cristal transparente') {
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'ap3') {
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:400px;max-height:250px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'mb9') {
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:400px;max-height:250px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    }
                                }
                            }
                        }
                        if (nombre == 'mb10') {
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:400px;max-height:250px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    }
                                }
                            }
                        }
                        if (nombre == 'mb11') {
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:400px;max-height:250px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'mb14') {
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:400px;max-height:250px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'mb5') {
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:400px;max-height:250px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'mb4') {
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:400px;max-height:250px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'mb8') {
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:400px;max-height:250px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );

                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (k == 2) {
                                            var acaCristal = acabados[k].toLowerCase();
                                            if (acaCristal == 'cristal bronce') {
                                                acaCristal = 'bronce';
                                            } else {
                                                acaCristal = 'transparente';
                                            }
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }

                                        if (k == 3) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'mb13') {
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:400px;max-height:250px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (k == 2) {
                                            var acaCristal = acabados[k].toLowerCase();
                                            if (acaCristal == 'cristal bronce') {
                                                acaCristal = 'bronce';
                                            } else {
                                                acaCristal = 'transparente';
                                            }
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }

                                        if (k == 3) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }

                                        if (k == 4) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'mb12') {
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:400px;max-height:250px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (k == 4) {
                                            var acaCristal = acabados[k].toLowerCase();
                                            if (acaCristal == 'cristal bronce') {
                                                acaCristal = 'bronce';
                                            } else {
                                                acaCristal = 'transparente';
                                            }
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }

                                        if (k == 2) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }

                                        if (k == 3) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'mb7') {
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:400px;max-height:250px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (k == 4) {
                                            var acaCristal = acabados[k].toLowerCase();
                                            if (acaCristal == 'cristal bronce') {
                                                acaCristal = 'bronce';
                                            } else {
                                                acaCristal = 'transparente';
                                            }
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }

                                        if (k == 2) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }

                                        if (k == 3) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (nombre == 'mb7') {
                            var prodMed = this.medidasModal[nombre];
                            var height = prodMed.split(';')[3];
                            var width = prodMed.split(';')[2];
                            var left = prodMed.split(';')[0];
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;' +
                                    left +
                                    ';' +
                                    height +
                                    ';' +
                                    width +
                                    ';max-width:400px;max-height:250px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/' +
                                    nombreCarpeta +
                                    '/0 NUMEROS/' +
                                    nombreCarpeta +
                                    '_numeros_optimized.png">'
                            );
                            for (let k = 0; k < acabados.length; k++) {
                                if (k == 0) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                    }
                                } else {
                                    if (k == 1) {
                                        if (i == 1) {
                                            var prodMed = this.medidasModal[nombre];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        } else {
                                            var prodMed = this.medidasModal[nombre];
                                            var left = prodMed.split(';')[0];
                                            var bottom = prodMed.split(';')[1];
                                            var height = prodMed.split(';')[3];
                                            var width = prodMed.split(';')[2];
                                        }
                                    } else {
                                        if (k == 3) {
                                            var acaCristal = acabados[k].toLowerCase();
                                            if (acaCristal == 'cristal bronce') {
                                                acaCristal = 'bronce';
                                            } else {
                                                acaCristal = 'transparente';
                                            }
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }

                                        if (k == 2) {
                                            if (i == 1) {
                                                var prodMed = this.medidasModal[nombre];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            } else {
                                                var prodMed = this.medidasModal[nombre];
                                                var left = prodMed.split(';')[0];
                                                var bottom = prodMed.split(';')[1];
                                                var height = prodMed.split(';')[3];
                                                var width = prodMed.split(';')[2];
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        $('#modalCesta .modal-body').append(
                            '<div style="float: left;width: 100%;height:180px:margin-bottom:50px;" id="textoCesta' + i + '"></div>'
                        );
                        $('#textoCesta' + i).append(
                            '<p style="letter-spacing: 1px;font-weight: 300;margin-left: 28%;">' +
                                sesion[1]['productosDormitorio']['nombre'].toUpperCase() +
                                '<i style="float:right;margin-right:40%"><span id="precioTodoProd' +
                                i +
                                '">' +
                                sesion[1]['todoSumadoPrecio'] +
                                '</span> &euro; </i></p>'
                        );
                        $('#textoCesta' + i).append(
                            '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;">Ancho: ' +
                                sesion[1]['ancho'] +
                                '</p>'
                        );
                        if (
                            sesion[1]['productosDormitorio']['categoriasDormi']['id'] != 8 &&
                            sesion[1]['productosDormitorio']['categoriasDormi']['id'] != 9 &&
                            sesion[1]['productosDormitorio']['categoriasDormi']['id'] != 11 &&
                            sesion[1]['productosDormitorio']['categoriasDormi']['id'] != 12 &&
                            sesion[1]['productosDormitorio']['categoriasDormi']['id'] != 13 &&
                            sesion[1]['productosDormitorio']['categoriasDormi']['id'] != 16
                        ) {
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;;max-width:400px;max-height:250px;position:absolute;top:0px" width="1000px" height="1000px" src="../../../content/images/numeros' +
                                    sesion[1]['productosDormitorio']['id'] +
                                    '.png">'
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
                            '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;">Alto: ' +
                                sesion[1]['alto'] +
                                '</p>'
                        );
                        $('#textoCesta' + i).append(
                            '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;">Fondo: ' +
                                sesion[1]['fondo'] +
                                '</p>'
                        );

                        for (let o = 0; o < acabados.length; o++) {
                            $('#textoCesta' + i).append(
                                '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;">Acabado ' +
                                    (o + 1) +
                                    ': ' +
                                    acabados[o] +
                                    '</p>'
                            );
                        }

                        if (sesion[1]['apoyo'] != undefined) {
                            $('#textoCesta' + i).append(
                                '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;">Apoyo: ' +
                                    sesion[1]['apoyo']['productoApoyo']['nombre'] +
                                    '<i style="float:right;font-size:15px;margin-right:40%">+ ' +
                                    sesion[1]['apoyo']['precio'] +
                                    ' &euro;</i></p>'
                            );
                        }
                        if (sesion[1]['iluminacion'] != undefined) {
                            $('#textoCesta' + i).append(
                                '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;">Iluminacion: <i style="float:right;font-size:15px;margin-right:40%">+ ' +
                                    sesion[1]['iluminacion']['precio'] +
                                    ' &euro;</i></p>'
                            );
                        }

                        $('#textoCesta' + i).append(
                            '<p style="letter-spacing: 1px;font-weight: 300;margin-left:28%;font-size: 16px;"><span onclick="borrarProdCesta(' +
                                i +
                                ')" style=""><a><u>ELIMINAR</u></a></span> </p>'
                        );
                        $('#textoCesta' + i).append('<hr style="100%"></hr>');
                        acabados = [];
                    }
                } else {
                    console.log(acabados);
                    $('#modalCesta .modal-body').append(
                        '<div style="float: left;width: 500px;text-align: center;height:300px;position:relative" id="cuerpo' +
                            i +
                            '"></div>'
                    );
                    $('#modalCesta .modal-body').append(
                        '<div style="float: left;width: 100%;height:180px:margin-bottom:50px;" id="textoCesta' + i + '"></div>'
                    );
                    $('#textoCesta' + i).append(
                        '<p style="letter-spacing: 1px;font-weight: 300;margin-left: 28%;">' +
                            sesion[1]['apoyo']['productoApoyo']['nombre'].toUpperCase() +
                            '<i style="float:right;margin-right:40%"><span id="precioTodoProd' +
                            i +
                            '">' +
                            sesion[1]['todoSumadoPrecio'] +
                            '</span> &euro; </i></p>'
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

                    $('#textoCesta' + i).append(
                        '<p style="letter-spacing: 1px;font-weight: 300;margin-left:28%;font-size: 16px;"><span onclick="borrarProdCesta(' +
                            i +
                            ')" style=""><a><u>ELIMINAR</u></a></span> </p>'
                    );
                    $('#textoCesta' + i).append('<hr style="100%"></hr>');
                    acabados = [];
                }
            }
        }
    }
    open1(ruta, bool, content, id, nombreId) {
        var prod = $('#nombreMesita').text();
        //$('#' + nombreId).css({ 'font-weight': 'bold' });
        var idsArray = [];
        idsArray[0] = 'composicionesSpan1';
        idsArray[1] = 'mesasSpan';
        idsArray[2] = 'panelesSpan';
        idsArray[3] = 'suplementosTv';
        idsArray[4] = 'estanteriasSpan';
        idsArray[5] = 'colHorizontales';
        idsArray[6] = 'colVertEstant';
        idsArray[7] = 'colVerticalesSpan';
        idsArray[8] = 'estantColgantesSpan';
        idsArray[9] = 'apoyoSistemaSpan1';
        idsArray[10] = 'escritoriosSpan';
        idsArray[11] = 'singularesSpan';
        idsArray[12] = 'vitrinasSpan';
        idsArray[13] = 'aparadoresSpan';
        idsArray[14] = 'modulosBajos';
        idsArray[15] = 'armariosSpan';
        idsArray[16] = 'banerascanapes';
        idsArray[17] = 'apoyoSistema2';
        idsArray[18] = 'chifonieresSpan';
        idsArray[19] = 'mesitasSpan';
        idsArray[20] = 'cabecerosSpan';

        for (let x = 0; x < 21; x++) {
            if (idsArray[x] != nombreId) {
                $('#' + idsArray[x]).css({ 'font-weight': 'normal' });
            }
        }

        if (prod != '') {
            if (bool == false) {
                this.ruta = ruta;
                this.id = id;
                $('#modalPreguntarSalida').attr('style');
                this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
                    result => {
                        this.closeResult = `Closed with: ${result}`;
                    },
                    reason => {
                        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                    }
                );
            } else {
                this.productosDormitorioService.todos = undefined;
                this.cargarProductosCategoria(id, ruta);
                this.modalService.dismissAll();
                $('#menuPrincipal').css({ display: 'none' });
                $('#botonEsconder').removeAttr('onclick');
                $('#botonEsconder').attr('onclick', 'apareceMenu()');
                $('#rayasNavegador').attr('src', '../../../content/images/LINEAS-min.png');
            }
        } else {
            this.productosDormitorioService.todos = undefined;
            this.cargarProductosCategoria(id, ruta);
            $('#menuPrincipal').css({ display: 'none' });
            $('#botonEsconder').removeAttr('onclick');
            $('#botonEsconder').attr('onclick', 'apareceMenu()');
            $('#rayasNavegador').attr('src', '../../../content/images/LINEAS-min.png');
        }
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    public funcionQuitarRaya(id) {
        var divs = [];
        divs[1] = 'torgaTarifaComedores';
        divs[2] = 'torgaTarifaDormitorios';
        divs[3] = 'menuComercial';
        divs[4] = 'menuContacto';
        divs[5] = 'menuFabricantesTorgaDentro';
        divs[6] = 'menuTienda';
        divs[7] = 'menuGestionUsuario';
        var usuarios = [];
        this.userService
            .query({
                size: 100000
            })
            .subscribe(data => {
                for (let i = 0; i < data.body.length; i++) {
                    usuarios[i] = data.body[i];
                }
            });
        this.user = usuarios;
        for (let g = 1; g <= 7; g++) {
            if (divs[g] != divs[id]) {
                $('#' + divs[g]).attr('class', 'collapse');
                $('#mas' + g).text('+');
            }
        }
        var mas = $('#mas' + id).text();
        if (mas == '+') {
            $('#mas' + id).text('x');
            $('#liTitulo' + id).css({ 'border-bottom': '0' });
        } else {
            $('#mas' + id).text('+');
            $('#liTitulo' + id).css({ 'border-bottom': '1px solid #D9D9D9' });
        }
    }
    public presupuestosCargar() {
        var account = this.accountService.userIdentity;

        var autoBueno;

        if (account.authorities.indexOf('ROLE_ADMIN') >= 0) {
            autoBueno = 'admin';
        } else {
            if (account.authorities.indexOf('ROLE_REPRESENTATE') >= 0) {
                autoBueno = 'repre';
            }
        }

        this.presupuestoPedidoService
            .query({
                size: 10000000
            })
            .subscribe((res: HttpResponse<IPresupuestoPedido[]>) => {
                var numero = 0;
                var numeroPedidos = 0;
                var d = new Date();
                var month = d.getMonth() + 1;
                var day = d.getDate();
                var output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
                for (let i = 0; i < res.body.length; i++) {
                    if (autoBueno == 'admin') {
                        if (res.body[i]['fecha_presupuesto'] == output) {
                            numero++;
                        }
                        if (res.body[i]['fecha_pedido'] == output) {
                            numeroPedidos++;
                        }
                    } else {
                        if (autoBueno == 'repre') {
                            var todos = this.representanteTiendaService.todos;
                            for (let K = 0; K < todos.length; K++) {
                                var usuario = todos[K]['datosUsuario']['user']['id'];
                                if (res.body[i]['user']['id'] == usuario && res.body[i]['fecha_presupuesto'] == output) {
                                    numero++;
                                }
                                if (res.body[i]['user']['id'] == usuario && res.body[i]['fecha_pedido'] == output) {
                                    numeroPedidos++;
                                }
                            }
                        }
                    }
                }
                this.numeroPresupuestos = numero;
                this.numeroPedidos = numeroPedidos;
            });
    }
    ngOnInit() {
        this.predicate = 'id';

        this.reverse = true;
        this.languageHelper.getAll().then(languages => {
            this.languages = languages;
        });

        var contCesta = 0;
        for (let i = 1; i < 20; i++) {
            if (JSON.parse(sessionStorage.getItem('prod' + i)) != null) {
                contCesta++;
            }
        }
        this.productosDormitorioService.numeroCesta = contCesta;
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

        if (this.representanteTiendaService.todos == undefined) {
            var account = this.accountService.userIdentity;
            if (account.authorities.indexOf('ROLE_REPRESENTATE') >= 0) {
                this.represenTorgaService.findUsu(account.id).subscribe(data => {
                    this.representanteTiendaService.findUsu(data.body[0]['id']).subscribe(data => {
                        this.representanteTiendaService.todos = data.body;
                        this.representanteTiendaService.representante = data.body[0]['represenTorga'];
                    });
                });
            }
        }
        this.profileService.getProfileInfo().then(profileInfo => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });

        this.accountService.identity().then(account => {
            this.account = account;
        });

        var usuarios = [];
        this.userService
            .query({
                size: 100000
            })
            .subscribe(data => {
                for (let i = 0; i < data.body.length; i++) {
                    usuarios[i] = data.body[i];
                }
            });
        this.user = usuarios;

        this.registerAuthenticationSuccess();
        var cont = 0;
        this.contador = 0;
        this.datosUsuarioService
            .query({
                size: 10000
            })
            .subscribe(data => {
                for (let i = 0; i < data['body'].length; i++) {
                    if (
                        data['body'][i]['direccion'] == null ||
                        (data['body'][i]['direccion'] == '' && data['body'][i]['codPostal'] == null) ||
                        (data['body'][i]['codPostal'] == '' && data['body'][i]['cif'] == null) ||
                        (data['body'][i]['cif'] == '' && data['body'][i]['nombreFiscal'] == null) ||
                        data['body'][i]['nombreFiscal'] == ''
                    ) {
                        cont++;
                        this.contador = cont;
                        if (this.contador > 0) {
                            $('#contadorDatos').css({ color: 'red' });
                            $('#contadorDatos').css({ 'font-size': '36px' });
                        }
                    }
                }
            });
    }
    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.accountService.identity().then(account => {
                this.account = account;
            });
            var usuarios = [];
            this.userService
                .query({
                    size: 1000000
                })
                .subscribe(data => {
                    for (let i = 0; i < data.body.length; i++) {
                        usuarios[i] = data.body[i];
                    }
                });
            this.user = usuarios;
            setTimeout(function() {
                var prueba = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
                if (prueba['logo'] != undefined) {
                    this.logo = prueba;
                    $('#logoImagen').remove();
                    $('.logo-img').append('<img id="logoImagen"  src="data:image/gif;base64,' + prueba['logo'] + '"/>');
                }
            }, 10);
        });
    }

    public cargarProductosCategoria(id, url) {
        if (url == 'productos-aparadores' || url == 'productos-singulares') {
            this.productosDormitorioService.categoria1(id).subscribe(data => {
                this.productosDormitorioService.todos = data.body;
                this.router.navigate(['/' + url + '']);
            });
        } else {
            this.productosDormitorioService.categoria(id).subscribe(data => {
                this.productosDormitorioService.todos = data.body;
                this.router.navigate(['/' + url + '']);
            });
        }
    }

    changeLanguage(languageKey: string) {
        this.sessionStorage.store('locale', languageKey);
        this.languageService.changeLanguage(languageKey);
    }
    public cargarEditarLink() {
        $('#modalCesta').attr('class', 'modal fade');
        $('#modalCesta').css({ display: 'none' });
        $('#modalConfirmarEditar').attr('class', 'modal fade');
        $('#modalConfirmarEditar').css({ display: 'none' });
        $('.modal-backdrop').remove();
        $('body').removeAttr('class');
        this.router.navigate(['/productos-editar']);
    }
    public tarifa() {
        $('#menuComercialTorga').attr('class', 'collapse');
        $('#menuTienda').attr('class', 'collapse');
        $('#menuFabricanteTorga').attr('class', 'collapse');
        $('#menuFabricanteTorgaDentro').attr('class', 'collapse');
        $('#menuContactoTorga').attr('class', 'collapse');
        $('#menuComercial').attr('class', 'collapse');
    }

    public comercial() {
        $('#menuComercialTorga').attr('class', 'collapse');
        $('#menuTienda').attr('class', 'collapse');
        $('#menuFabricanteTorga').attr('class', 'collapse');
        $('#menuFabricanteTorgaDentro').attr('class', 'collapse');
        $('#menuContactoTorga').attr('class', 'collapse');
        $('#menuTarifa').attr('class', 'collapse');
        $('#menuTarifaTorga').attr('class', 'collapse');
        $('#menuTarifaComedores').attr('class', 'collapse');
        $('#menuTarifaDormitorios').attr('class', 'collapse');
    }

    public contacto() {
        $('#menuComercialTorga').attr('class', 'collapse');
        $('#menuTienda').attr('class', 'collapse');
        $('#menuFabricanteTorga').attr('class', 'collapse');
        $('#menuComercial').attr('class', 'collapse');
        $('#menuFabricanteTorgaDentro').attr('class', 'collapse');
        $('#menuTarifa').attr('class', 'collapse');
        $('#menuTarifaTorga').attr('class', 'collapse');
        $('#menuTarifaComedores').attr('class', 'collapse');
        $('#menuTarifaDormitorios').attr('class', 'collapse');
    }

    public fabricantes() {
        $('#menuComercialTorga').attr('class', 'collapse');
        $('#menuTienda').attr('class', 'collapse');
        $('#menuComercial').attr('class', 'collapse');
        $('#menuTarifa').attr('class', 'collapse');
        $('#menuContactoTorga').attr('class', 'collapse');
        $('#menuTarifaTorga').attr('class', 'collapse');
        $('#menuTarifaComedores').attr('class', 'collapse');
        $('#menuTarifaDormitorios').attr('class', 'collapse');
    }
    public gestionTienda() {
        $('#menuComercial').attr('class', 'collapse');
        $('#menuTarifa').attr('class', 'collapse');
        $('#menuContactoTorga').attr('class', 'collapse');
        $('#menuTarifaTorga').attr('class', 'collapse');
        $('#menuTarifaComedores').attr('class', 'collapse');
        $('#menuTarifaDormitorios').attr('class', 'collapse');
        $('#menuFabricanteTorga').attr('class', 'collapse');
        $('#menuFabricanteTorgaDentro').attr('class', 'collapse');
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }
    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        $('#menuPrincipal').css({ display: 'none' });
        $('#botonEsconder').removeAttr('onclick');
        $('#botonEsconder').attr('onclick', 'apareceMenu()');
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
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

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.accountService.getImageUrl() : null;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

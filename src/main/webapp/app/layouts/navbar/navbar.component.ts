import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
    constructor(
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
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        protected interioresService: InterioresService,
        protected medidasEspecialesService: MedidasEspecialesService,
        protected jhiAlertService: JhiAlertService,
        private router: Router,
        private modalService: NgbModal,
        public productosDormitorioService: ProductosDormitorioService,
        private eventManager: JhiEventManager
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
    }

    ngAfterViewInit() {
        setTimeout(function() {
            var prueba = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
            if (prueba['logo'] != undefined) {
                this.logo = prueba;
                $('#logoImagen').remove();
                $('.logo-img').append('<img id="logoImagen"  src="data:image/gif;base64,' + prueba['logo'] + '"/>');
            }
        }, 10);
    }

    open(ruta, bool, content) {
        var prod = $('#calculadoraCarrito #nombreMesita').text();
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
            }
        } else {
            this.router.navigate(['/' + ruta]);
            this.productosDormitorioService.todos = undefined;
            $('#menuPrincipal').css({ display: 'none' });
            $('#botonEsconder').removeAttr('onclick');
            $('#botonEsconder').attr('onclick', 'apareceMenu()');
        }
    }

    public generarPresupuesto() {
        this.todasDimensiones = this.dimensionesProductoTipoService.todos;

        var numeroProductos = [];
        this.productosPresupuestoPedidosService
            .query({
                size: 100000
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
                        var idUsu = this.account['id'];
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
                            var idUsu = this.account['id'];
                            for (let i = 0; i < usuarios.length; i++) {
                                if (usuarios[i]['id'] == idUsu) {
                                    usuarioCreado = usuarios[i];
                                }
                            }
                        } else {
                            this.isSaving = true;
                            var usuarios = this.user;
                            var usuario;
                            var idUsu = this.account['id'];
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
                            size: 100000
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
                                    id: idDefinitiva,
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
        this.productosDormitorioService.numeroCesta = 0;
    }

    public abrirCesta() {
        var productosArrayNombres = this.productosArrayNombre;
        $('#modalCesta .modal-body').empty();
        var medidas = this.medidasModal;
        var acabados = [];
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
                var nombre = productosArrayNombres[sesion[1]['productosDormitorio']['id']];
                console.log(nombre);
                if (sesion[1]['productosDormitorio']['categoriasDormi']['id'] == 9) {
                    $('#modalCesta .modal-body').append(
                        '<div style="float: left;width: 100%;text-align: center;height:250px" id="cuerpo' + i + '"></div>'
                    );

                    var nombreArmario = sesion[1]['mensaje'];
                    var casco = sesion[1]['acabadoCasco']['nombre'];
                    var trasera = sesion[1]['acabadoTrasera']['nombre'];
                    var interiores = sesion[1]['acabadoInterior']['nombre'];

                    $('#cuerpo' + i).append(
                        '<p style="letter-spacing: 1px;font-weight: 300;font-size:30px;position:absolute;width:97%;text-align:center">' +
                            sesion[1]['productosDormitorio']['nombre'].toUpperCase() +
                            '</p>'
                    );

                    if (nombreArmario == '1 PUERTA') {
                        $('#cuerpo' + i).append(
                            '<img style="width:100px;position:absolute;z-index:2" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i).append(
                            '<img style="width:100px;position:absolute;z-index:2" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                trasera.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i).append(
                            '<img style="width:100px;position:absolute;z-index:2" src="../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_' +
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
                        $('#cuerpo' + i).append('<div id="izquierda" style="margin-left: 555px;margin-top: 110px;float: left;"></div>');
                        $('#cuerpo' + i).append('<div id="derecha" style="float:left;margin-left: 125px;margin-top:515px;"></div>');
                        $('#cuerpo' + i + ' #derecha').append(
                            '<img style="width:199px;position:absolute;z-index:2;margin-left: -120px;z-index: 1;margin-top: 26px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #derecha').append(
                            '<img style="width:200px;position:absolute;z-index:2;margin-left: -120px;z-index: 1;margin-top: 26px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                trasera.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #derecha').append(
                            '<img style="width:200px;position:absolute" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );

                        if (puerta1['nombre'] == 'Puerta Madera') {
                            var src =
                                '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_' +
                                puerta1['acabado']['nombre'].toLowerCase() +
                                '_optimized.png';
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:199px;position:absolute;z-index:2;margin-left: -120px;z-index: 1;margin-top: 26px;" src="' +
                                    src +
                                    '">'
                            );
                        } else {
                            if (puerta1['acabado']['nombre'] == 'Cristal Bronce') {
                                var src = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:199px;position:absolute;z-index:2;margin-left: -120px;z-index: 1;margin-top: 26px;opacity:0.6" src="' +
                                        src +
                                        '">'
                                );
                            } else {
                                var src =
                                    '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:199px;position:absolute;z-index:2;margin-left: -120px;z-index: 1;margin-top: 26px;opacity:0.5" src="' +
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
                            $('#cuerpo' + i + ' #derecha').append('<img style="width:200px;position:absolute;" src="' + src1 + '">');
                        } else {
                            var src1 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                        }

                        if (puerta3['nombre'] == 'Puerta Madera') {
                            var src2 =
                                '../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_' +
                                puerta1['acabado']['nombre'].toLowerCase() +
                                '_optimized.png';
                            $('#cuerpo' + i + ' #derecha').append('<img style="width:200px;position:absolute;" src="' + src2 + '">');
                        } else {
                            var src2 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                        }

                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:199px;position:absolute;z-index:2" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:199px;position:absolute;z-index:2" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                trasera.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:199px;position:absolute;z-index:2" src="../../../content/images/ar/peque/3. INTERIORES/6/peque_interior_6_' +
                                interiores.toLowerCase() +
                                '.png">'
                        );

                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;margin-left: 120px;z-index: 1;margin-top: -26px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;margin-left: 120px;z-index: 1;margin-top: -26px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                trasera.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;margin-left: 120px;z-index: 1;margin-top: -26px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
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
                        $('#cuerpo' + i).append('<div id="izquierda" style="margin-left: 590px;margin-top: 110px;float: left;"></div>');
                        $('#cuerpo' + i).append('<div id="derecha" style="float:left;margin-left: 125px;margin-top:515px;"></div>');
                        $('#cuerpo' + i + ' #derecha').append(
                            '<img style="width:199px;position:absolute;z-index:1" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #derecha').append(
                            '<img style="width:199px;position:absolute;z-index:1" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                trasera.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #derecha').append(
                            '<img style="width:200px;position:absolute;z-index:2;margin-left: -120px;z-index: 1;margin-top: 24px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );

                        if (puerta1['nombre'] == 'Puerta Madera') {
                            var src =
                                '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_' +
                                puerta1['acabado']['nombre'].toLowerCase() +
                                '_optimized.png';
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:199px;position:absolute;z-index:1" src="' + src + '">'
                            );
                        } else {
                            if (puerta1['acabado']['nombre'] == 'Cristal Bronce') {
                                var src = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:199px;position:absolute;z-index:1;opacity:0.6" src="' + src + '">'
                                );
                            } else {
                                var src =
                                    '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:199px;position:absolute;z-index:1;opacity:0.5" src="' + src + '">'
                                );
                            }
                        }

                        if (puerta2['nombre'] == 'Puerta Madera') {
                            var src1 =
                                '../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                puerta1['acabado']['nombre'].toLowerCase() +
                                '_optimized.png';
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:200px;position:absolute;z-index:2;margin-left: -120px;z-index: 1;margin-top: 24px;" src="' +
                                    src1 +
                                    '">'
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
                                '<img style="width:200px;position:absolute;z-index:2;margin-left: -120px;z-index: 1;margin-top: 24px;" src="' +
                                    src2 +
                                    '">'
                            );
                        } else {
                            var src2 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                        }

                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:199px;position:absolute;z-index:2;margin-left: 120px;z-index: 1;margin-top: -24px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:199px;position:absolute;z-index:2;margin-left: 120px;z-index: 1;margin-top: -24px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                trasera.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:199px;position:absolute;z-index:2;margin-left: 120px;z-index: 1;margin-top: -24px;" src="../../../content/images/ar/peque/3. INTERIORES/6/peque_interior_6_' +
                                interiores.toLowerCase() +
                                '.png">'
                        );

                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;z-index: 3;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;z-index: 3;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                trasera.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;z-index: 3;" src="../../../content/images/ar/grande/3. INTERIORES/' +
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
                        $('#cuerpo' + i).append('<div id="izquierda" style="margin-left: 515px;margin-top: 110px;float: left;"></div>');
                        $('#cuerpo' + i).append('<div id="derecha" style="float:left;margin-left: 125px;margin-top:515px;"></div>');
                        $('#cuerpo' + i + ' #derecha').append(
                            '<img style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 3;margin-top: 26px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #derecha').append(
                            '<img style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 3;margin-top: 26px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                trasera.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #derecha').append(
                            '<img style="width:200px;position:absolute;z-index:2" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #derecha').append(
                            '<img style="width:199px;position:absolute;z-index:3;margin-left: 120px;z-index: 1;margin-top: -24px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #derecha').append(
                            '<img style="width:199px;position:absolute;z-index:3;margin-left: 120px;z-index: 1;margin-top: -24px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                trasera.toLowerCase() +
                                '.png">'
                        );

                        if (puerta1['nombre'] == 'Puerta Madera') {
                            var src =
                                '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_' +
                                puerta1['acabado']['nombre'].toLowerCase() +
                                '_optimized.png';
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:199px;position:absolute;z-index:2;margin-left: -120px;z-index: 3;margin-top: 26px;" src="' +
                                    src +
                                    '">'
                            );
                        } else {
                            if (puerta1['acabado']['nombre'] == 'Cristal Bronce') {
                                var src = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:199px;position:absolute;z-index:2;margin-left: -120px;z-index: 3;margin-top: 26px;opacity:0.6" src="' +
                                        src +
                                        '">'
                                );
                            } else {
                                var src =
                                    '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:199px;position:absolute;z-index:2;margin-left: -120px;z-index: 3;margin-top: 26px;opacity:0.5" src="' +
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
                                '<img style="width:200px;position:absolute;z-index:3" src="' + src1 + '">'
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
                                '<img style="width:200px;position:absolute;z-index:3" src="' + src2 + '">'
                            );
                        } else {
                            var src2 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                        }

                        if (puerta4['nombre'] == 'Puerta Madera') {
                            var src =
                                '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_' +
                                puerta4['acabado']['nombre'].toLowerCase() +
                                '_optimized.png';
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:199px;position:absolute;z-index:2;margin-left: 120px;z-index: 3;margin-top: -24px;" src="' +
                                    src +
                                    '">'
                            );
                        } else {
                            if (puerta4['acabado']['nombre'] == 'Cristal Bronce') {
                                var src = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:199px;position:absolute;z-index:2;margin-left: 120px;z-index: 3;margin-top: -24px;opacity:0.6" src="' +
                                        src +
                                        '">'
                                );
                            } else {
                                var src =
                                    '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:199px;position:absolute;z-index:2;margin-left: 120px;z-index: 3;margin-top: -24px;opacity:0.5" src="' +
                                        src +
                                        '">'
                                );
                            }
                        }

                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:199px;position:absolute;z-index:3" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:199px;position:absolute;z-index:3" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                trasera.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:199px;position:absolute;z-index:3" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                interior1['nombre'] +
                                '/peque_interior_' +
                                interior1['nombre'] +
                                '_' +
                                interiores.toLowerCase() +
                                '.png">'
                        );

                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;margin-left: 120px;z-index: 2;margin-top: -26px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;margin-left: 120px;z-index: 2;margin-top: -26px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                trasera.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;margin-left: 120px;z-index: 2;margin-top: -26px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                interior2['nombre'] +
                                '/grande_interior_' +
                                interior2['nombre'] +
                                '_' +
                                interiores.toLowerCase() +
                                '_optimized.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;margin-left: 240px;z-index: 1;margin-top: -50px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;margin-left: 240px;z-index: 1;margin-top: -50px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                trasera.toLowerCase() +
                                '.png">'
                        );

                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;margin-left: 240px;z-index: 1;margin-top: -50px;" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                interior3['nombre'] +
                                '/peque_interior_' +
                                interior3['nombre'] +
                                '_' +
                                interiores.toLowerCase() +
                                '.png">'
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
                        $('#cuerpo' + i).append('<div id="izquierda" style="margin-left: 530px;margin-top: 110px;float: left;"></div>');
                        $('#cuerpo' + i).append('<div id="derecha" style="float:left;margin-left: 125px;margin-top:515px;"></div>');
                        $('#cuerpo' + i + ' #derecha').append(
                            '<img style="width:199px;position:absolute;z-index:2" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #derecha').append(
                            '<img style="width:199px;position:absolute;z-index:2" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                trasera.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #derecha').append(
                            '<img style="width:200px;position:absolute;z-index:2;margin-left: -120px;z-index: 3;margin-top: 24px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #derecha').append(
                            '<img style="width:200px;position:absolute;z-index:2;margin-left: 120px;z-index: 1;margin-top: -26px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                casco.toLowerCase() +
                                '.png" title="' +
                                casco +
                                '">'
                        );

                        if (puerta1['nombre'] == 'Puerta Madera') {
                            var src =
                                '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_' +
                                puerta1['acabado']['nombre'].toLowerCase() +
                                '_optimized.png';
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:199px;position:absolute;z-index:3" src="' + src + '">'
                            );
                        } else {
                            if (puerta1['acabado']['nombre'] == 'Cristal Bronce') {
                                var src = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:199px;position:absolute;z-index:3;opacity:0.6" src="' + src + '">'
                                );
                            } else {
                                var src =
                                    '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:199px;position:absolute;z-index:3;opacity:0.5" src="' + src + '">'
                                );
                            }
                        }

                        if (puerta2['nombre'] == 'Puerta Madera') {
                            var src1 =
                                '../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                puerta1['acabado']['nombre'].toLowerCase() +
                                '_optimized.png';
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:200px;position:absolute;z-index:2;margin-left: -120px;z-index: 3;margin-top: 24px;" src="' +
                                    src1 +
                                    '">'
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
                                '<img style="width:200px;position:absolute;z-index:2;margin-left: -120px;z-index: 3;margin-top: 24px;" src="' +
                                    src2 +
                                    '">'
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
                                '<img style="width:200px;position:absolute;z-index:2;margin-left: 120px;z-index: 3;margin-top: -26px;" src="' +
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
                                '<img style="width:200px;position:absolute;z-index:2;margin-left: 120px;z-index: 3;margin-top: -26px;" src="' +
                                    src2 +
                                    '">'
                            );
                        } else {
                            var src2 = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                        }

                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:199px;position:absolute;z-index:2;margin-left: 120px;margin-top: -24px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:199px;position:absolute;z-index:2;margin-left: 120px;margin-top: -24px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                trasera.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:199px;position:absolute;z-index:2;margin-left: 120px;margin-top: -24px;" src="../../../content/images/ar/peque/3. INTERIORES/6/peque_interior_6_' +
                                interiores.toLowerCase() +
                                '.png">'
                        );

                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;z-index: 3;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;z-index: 3;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                trasera.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;z-index: 3;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                interior2['nombre'] +
                                '/grande_interior_' +
                                interior2['nombre'] +
                                '_' +
                                interiores.toLowerCase() +
                                '_optimized.png">'
                        );

                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;z-index: 1;margin-left: 240px;margin-top: -50px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;z-index: 1;margin-left: 240px;margin-top: -50px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                trasera.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;z-index: 1;margin-left: 240px;margin-top: -50px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
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
                        $('#cuerpo' + i).append('<div id="izquierda" style="margin-left: 490px;margin-top: 110px;float: left;"></div>');
                        $('#cuerpo' + i).append('<div id="derecha" style="float:left;margin-left: 125px;margin-top:515px;"></div>');
                        $('#cuerpo' + i + ' #derecha').append(
                            '<img style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 3;margin-top: 26px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #derecha').append(
                            '<img style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 3;margin-top: 26px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                trasera.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #derecha').append(
                            '<img style="width:200px;position:absolute;z-index:2;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #derecha').append(
                            '<img style="width:200px;position:absolute;z-index:2;margin-left: 160px;z-index: 1;margin-top: -33px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                casco.toLowerCase() +
                                '.png" title="' +
                                casco.toLowerCase() +
                                '">'
                        );

                        if (puerta1['nombre'] == 'Puerta Madera') {
                            var src =
                                '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_' +
                                puerta1['acabado']['nombre'].toLowerCase() +
                                '_optimized.png';
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 3;margin-top: 26px;" src="' +
                                    src +
                                    '">'
                            );
                        } else {
                            if (puerta1['acabado']['nombre'] == 'Cristal Bronce') {
                                var src = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 3;margin-top: 26px;opacity:0.6" src="' +
                                        src +
                                        '">'
                                );
                            } else {
                                var src =
                                    '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 3;margin-top: 26px;opacity:0.5" src="' +
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

                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:199px;position:absolute;z-index:3;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:199px;position:absolute;z-index:3;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                trasera.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:199px;position:absolute;z-index:3;" src="../../../content/images/ar/peque/3. INTERIORES/6/peque_interior_6_' +
                                interiores.toLowerCase() +
                                '.png">'
                        );

                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;z-index: 2;margin-left: 120px;margin-top: -25px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;z-index: 2;margin-left: 120px;margin-top: -25px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                trasera.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;z-index: 2;margin-left: 120px;margin-top: -25px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                interior2['nombre'] +
                                '/grande_interior_' +
                                interior2['nombre'] +
                                '_' +
                                interiores.toLowerCase() +
                                '_optimized.png">'
                        );

                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;z-index: 1;margin-left: 280px;margin-top: -58px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;z-index: 1;margin-left: 280px;margin-top: -58px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                trasera.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;z-index: 1;margin-left: 280px;margin-top: -58px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
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
                        $('#cuerpo' + i).append('<div id="izquierda" style="margin-left: 445px;margin-top: 130px;float: left;"></div>');
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
                            '<img style="width:200px;position:absolute;z-index:2;margin-left: 160px;z-index: 2;margin-top: -33px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #derecha').append(
                            '<img style="width:199px;position:absolute;z-index:3;margin-left: 280px;z-index: 1;margin-top: -57px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );

                        if (puerta1['nombre'] == 'Puerta Madera') {
                            var src =
                                '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_' +
                                puerta1['acabado']['nombre'].toLowerCase() +
                                '_optimized.png';
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 4;margin-top: 26px;" src="' +
                                    src +
                                    '">'
                            );
                        } else {
                            if (puerta1['acabado']['nombre'] == 'Cristal Bronce') {
                                var src = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 3;margin-top: 26px;opacity:0.6" src="' +
                                        src +
                                        '">'
                                );
                            } else {
                                var src =
                                    '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:199px;position:absolute;z-index:3;margin-left: -120px;z-index: 3;margin-top: 26px;opacity:0.5" src="' +
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
                            var src =
                                '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_' +
                                puerta6['acabado']['nombre'].toLowerCase() +
                                '_optimized.png';
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img style="width:200px;position:absolute;z-index:3;margin-left: 280px;z-index: 3;margin-top: -57px;" src="' +
                                    src +
                                    '">'
                            );
                        } else {
                            if (puerta1['acabado']['nombre'] == 'Cristal Bronce') {
                                var src = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:200px;position:absolute;z-index:3;margin-left: 280px;z-index: 3;margin-top: -57px;opacity:0.6" src="' +
                                        src +
                                        '">'
                                );
                            } else {
                                var src =
                                    '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente.png';
                                $('#cuerpo' + i + ' #derecha').append(
                                    '<img style="width:200px;position:absolute;z-index:3;margin-left: 280px;z-index: 3;margin-top: -57px;opacity:0.5" src="' +
                                        src +
                                        '">'
                                );
                            }
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
                            '<img style="width:199px;position:absolute;z-index:4;" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                interior1['nombre'] +
                                '/peque_interior_' +
                                interior1['nombre'] +
                                '_' +
                                interiores.toLowerCase() +
                                '.png">'
                        );

                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;z-index: 3;margin-left: 120px;margin-top: -26px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;z-index: 3;margin-left: 120px;margin-top: -26px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                trasera.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;z-index: 3;margin-left: 120px;margin-top: -26px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                interior2['nombre'] +
                                '/grande_interior_' +
                                interior2['nombre'] +
                                '_' +
                                interiores.toLowerCase() +
                                '_optimized.png">'
                        );

                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;z-index: 2;margin-left: 280px;margin-top: -59px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;z-index: 2;margin-left: 280px;margin-top: -59px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                trasera.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:200px;position:absolute;z-index: 2;margin-left: 280px;margin-top: -59px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                interior3['nombre'] +
                                '/grande_interior_' +
                                interior3['nombre'] +
                                '_' +
                                interiores.toLowerCase() +
                                '_optimized.png">'
                        );

                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:199px;position:absolute;z-index:1;margin-left: 400px;margin-top: -83px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                casco.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:199px;position:absolute;z-index:1;margin-left: 400px;margin-top: -83px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                trasera.toLowerCase() +
                                '.png">'
                        );
                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="width:199px;position:absolute;z-index:1;margin-left: 400px;margin-top: -83px;" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                interior4['nombre'] +
                                '/peque_interior_' +
                                interior4['nombre'] +
                                '_' +
                                interiores.toLowerCase() +
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
                        '<p style="letter-spacing: 1px;font-weight: 300;">' +
                            sesion[1]['productosDormitorio']['nombre'].toUpperCase() +
                            '<i style="float:right">&euro; ' +
                            sesion[1]['precioCasco'] +
                            '</i></p>'
                    );

                    $('#textoCesta' + i).append(
                        '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;">Ancho: ' + sesion[1]['ancho'] + '</p>'
                    );
                    $('#textoCesta' + i).append(
                        '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;">Alto: ' + sesion[1]['alto'] + '</p>'
                    );
                    $('#textoCesta' + i).append(
                        '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;">Fondo: ' + sesion[1]['fondo'] + '</p>'
                    );
                    $('#textoCesta' + i).append('<hr style="100%"></hr>');
                } else {
                    $('#modalCesta .modal-body').append(
                        '<div style="float: left;width: 500px;text-align: center;" id="cuerpo' + i + '"></div>'
                    );

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
                    if (nombre == 'mb1') {
                        $('#cuerpo' + i).append('<div id="izquierda" style="margin-left: 610px;float: left;margin-top:20px"></div>');
                        $('#cuerpo' + i).append(
                            '<p style="letter-spacing: 1px;font-weight: 300;position: absolute;width: 98%;font-size: 30px;">' +
                                sesion[1]['productosDormitorio']['nombre'].toUpperCase() +
                                '</p>'
                        );
                        for (let k = 1; k < acabados.length; k++) {
                            if (k == 1) {
                                if (i == 1) {
                                    var prodMed = this.medidasModal[nombre];
                                    var height = prodMed.split(';')[3];
                                    var width = prodMed.split(';')[2];
                                    $('#cuerpo' + i + ' #izquierda').append(
                                        '<img style="z-index:100;margin-left:-400px;top:10px;max-width:400px;max-height:400px;' +
                                            height +
                                            ';' +
                                            width +
                                            ';max-width:400px;max-height:250px;position:relative" id="' +
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
                                            '_optimized.png" title="' +
                                            acabados[k] +
                                            '">'
                                    );
                                } else {
                                    var prodMed = this.medidasModal[nombre];
                                    var left = prodMed.split(';')[0];
                                    var bottom = prodMed.split(';')[1];
                                    var height = prodMed.split(';')[3];
                                    var width = prodMed.split(';')[2];
                                    $('#cuerpo' + i + ' #izquierda').append(
                                        '<img style="z-index:' +
                                            (100 - i) +
                                            ';margin-left:-400px;top:10px;max-width:400px;max-height:400px;' +
                                            left +
                                            ';' +
                                            bottom +
                                            ';' +
                                            height +
                                            ';' +
                                            width +
                                            ';max-width:400px;max-height:250px;position:relative"  class="' +
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
                                            '_optimized.png">'
                                    );
                                }
                            } else {
                                if (k == 2) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                        $('#cuerpo' + i + ' #izquierda').append(
                                            '<img style="margin-top:-19px;z-index:100;margin-left:-400px;top:30px;max-width:400px;max-height:400px;' +
                                                height +
                                                ';' +
                                                width +
                                                ';max-width:400px;max-height:250px;position:relative;margin-top:-318px" id="' +
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
                                                '_optimized.png">'
                                        );
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                        $('#cuerpo' + i + ' #izquierda').append(
                                            '<img style="z-index:' +
                                                (100 - i) +
                                                ';margin-top:-19px;margin-left:-400px;top:30px;max-width:400px;max-height:400px;' +
                                                left +
                                                ';' +
                                                bottom +
                                                ';' +
                                                height +
                                                ';' +
                                                width +
                                                ';max-width:400px;max-height:250px;position:relative;margin-top:-318px" class="' +
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
                                                '_optimized.png">'
                                        );
                                    }
                                } else {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                        $('#cuerpo' + i + ' #izquierda').append(
                                            '<img style="margin-top:-19px;z-index:100;margin-left:-400px;top:30px;max-width:400px;max-height:400px;' +
                                                height +
                                                ';' +
                                                width +
                                                ';max-width:400px;max-height:250px;position:relative;margin-top:-366px" id="' +
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
                                                '_optimized.png">'
                                        );
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                        $('#cuerpo' + i + ' #izquierda').append(
                                            '<img style="z-index:' +
                                                (100 - i) +
                                                ';margin-top:-19px;margin-left:-400px;top:30px;' +
                                                left +
                                                ';' +
                                                bottom +
                                                ';' +
                                                height +
                                                ';' +
                                                width +
                                                ';max-width:400px;max-height:250px;position:relative;margin-top:-366px" class="' +
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
                                                '_optimized.png">'
                                        );
                                    }
                                }
                            }
                        }
                    } else {
                        contAca = 1;
                        $('#cuerpo' + i).append('<div id="izquierda" style="margin-left: 610px;float: left;margin-top:20px"></div>');
                        $('#cuerpo' + i).append(
                            '<p style="letter-spacing: 1px;font-weight: 300;position: absolute;width: 98%;font-size: 30px;">' +
                                sesion[1]['productosDormitorio']['nombre'].toUpperCase() +
                                '</p>'
                        );
                        for (let k = 1; k < acabados.length; k++) {
                            if (k == 1) {
                                if (i == 1) {
                                    var prodMed = this.medidasModal[nombre];
                                    var height = prodMed.split(';')[3];
                                    var width = prodMed.split(';')[2];
                                    $('#cuerpo' + i + ' #izquierda').append(
                                        '<img style="z-index:100;margin-left:-400px;top:10px;max-width:400px;max-height:400px;' +
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
                                            k +
                                            '/' +
                                            nombreCarpeta +
                                            '_' +
                                            k +
                                            '_' +
                                            acabados[k].toLowerCase() +
                                            '_optimized.png" title="' +
                                            acabados[k] +
                                            '">'
                                    );
                                } else {
                                    var prodMed = this.medidasModal[nombre];
                                    var left = prodMed.split(';')[0];
                                    var bottom = prodMed.split(';')[1];
                                    var height = prodMed.split(';')[3];
                                    var width = prodMed.split(';')[2];
                                    $('#cuerpo' + i + ' #izquierda').append(
                                        '<img style="z-index:' +
                                            (100 - i) +
                                            ';margin-left:-400px;top:10px;max-width:400px;max-height:400px;' +
                                            left +
                                            ';' +
                                            bottom +
                                            ';' +
                                            height +
                                            ';' +
                                            width +
                                            ';max-width:400px;max-height:250px;"  class="' +
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
                                            '_optimized.png">'
                                    );
                                }
                            } else {
                                if (k == 2) {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                        $('#cuerpo' + i + ' #izquierda').append(
                                            '<img style="margin-top:-19px;z-index:100;margin-left:-400px;top:30px;max-width:400px;max-height:400px;' +
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
                                                k +
                                                '/' +
                                                nombreCarpeta +
                                                '_' +
                                                k +
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
                                        $('#cuerpo' + i + ' #izquierda').append(
                                            '<img style="z-index:' +
                                                (100 - i) +
                                                ';margin-top:-19px;margin-left:-400px;top:30px;max-width:400px;max-height:400px;' +
                                                left +
                                                ';' +
                                                bottom +
                                                ';' +
                                                height +
                                                ';' +
                                                width +
                                                ';max-width:400px;max-height:250px;" class="' +
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
                                                '_optimized.png">'
                                        );
                                    }
                                } else {
                                    if (i == 1) {
                                        var prodMed = this.medidasModal[nombre];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                        $('#cuerpo' + i + ' #izquierda').append(
                                            '<img style="margin-top:-19px;z-index:100;margin-left:-400px;top:30px;max-width:400px;max-height:400px;' +
                                                height +
                                                ';' +
                                                width +
                                                ';max-width:400px;max-height:250px;" id="' +
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
                                                '_optimized.png">'
                                        );
                                    } else {
                                        var prodMed = this.medidasModal[nombre];
                                        var left = prodMed.split(';')[0];
                                        var bottom = prodMed.split(';')[1];
                                        var height = prodMed.split(';')[3];
                                        var width = prodMed.split(';')[2];
                                        $('#cuerpo' + i + ' #izquierda').append(
                                            '<img style="z-index:' +
                                                (100 - i) +
                                                ';margin-top:-19px;margin-left:-400px;top:30px;' +
                                                left +
                                                ';' +
                                                bottom +
                                                ';' +
                                                height +
                                                ';' +
                                                width +
                                                ';max-width:400px;max-height:250px;" class="' +
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
                                                '_optimized.png">'
                                        );
                                    }
                                }
                            }
                        }
                    }
                    $('#modalCesta .modal-body').append('<div style="float: left;width: 100%;" id="textoCesta' + i + '"></div>');
                    $('#textoCesta' + i).append(
                        '<p style="letter-spacing: 1px;font-weight: 300;">' +
                            sesion[1]['productosDormitorio']['nombre'].toUpperCase() +
                            '<i style="float:right">&euro; ' +
                            sesion[1]['precio'] +
                            '</i></p>'
                    );
                    $('#textoCesta' + i).append(
                        '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;">Ancho: ' + sesion[1]['ancho'] + '</p>'
                    );
                    $('#textoCesta' + i).append(
                        '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;">Alto: ' + sesion[1]['alto'] + '</p>'
                    );
                    $('#textoCesta' + i).append(
                        '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;">Fondo: ' + sesion[1]['fondo'] + '</p>'
                    );
                    $('#textoCesta' + i).append(
                        '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;">Apoyo: ' +
                            sesion[1]['apoyo']['productoApoyo']['nombre'] +
                            '<i style="float:right;font-size:15px">+ &euro; ' +
                            sesion[1]['apoyo']['precio'] +
                            '</i></p>'
                    );
                    $('#textoCesta' + i).append('<hr style="100%"></hr>');
                    acabados = [];
                }
            }
        }
    }
    open1(ruta, bool, content, id) {
        var prod = $('#nombreMesita').text();
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
            }
        } else {
            this.productosDormitorioService.todos = undefined;
            this.cargarProductosCategoria(id, ruta);
            $('#menuPrincipal').css({ display: 'none' });
            $('#botonEsconder').removeAttr('onclick');
            $('#botonEsconder').attr('onclick', 'apareceMenu()');
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
        this.productosDormitorioService.categoria(id).subscribe(data => {
            this.productosDormitorioService.todos = data.body;
            this.router.navigate(['/' + url + '']);
        });
    }

    changeLanguage(languageKey: string) {
        this.sessionStorage.store('locale', languageKey);
        this.languageService.changeLanguage(languageKey);
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

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
import { PrecioTiendaService } from '../../entities/precio-tienda/precio-tienda.service';

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
    precioPunto: any;
    todasLasTiendas: any;
    acabadosPresupuesto: any;
    productoPresupuesto: any;
    presupuestoArmarioTodoLOL: any;
    mGuardar: any;
    constructor(
        protected presupuestoArmarioPuertasService: PresupuestoArmarioPuertasService,
        private loginService: LoginService,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        protected dimensionesProductoTipoService: DimensionesProductoTipoService,
        private sessionStorage: SessionStorageService,
        protected datosUsuarioService: DatosUsuarioService,
        protected precioTiendaService: PrecioTiendaService,
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

    cargarTodasTiendas() {
        this.datosUsuarioService
            .query({
                size: 100000
            })
            .subscribe(data => {
                this.todasLasTiendas = data.body;
                for (let o = 0; o < data.body['length']; o++) {
                    $('#modalConfirmarCreacionPresu').append('<datalist id="listaTiendas"></datalist>');
                    $('#listaTiendas').append('<option value="' + data.body[o]['id'] + '">' + data.body[o]['nombreFiscal'] + '</option>');
                }
            });
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
        var memo = document.getElementsByName('estado');
        var item = JSON.parse(sessionStorage.getItem('seccionPrecios'));
        var puntos = null;
        if (item == 'C') {
            puntos = JSON.parse(sessionStorage.getItem(item));
        }
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

                    this.productoPresupuesto = prodCarr;
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
                    this.acabadosPresupuesto = numeroAcaProd;
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
                            puntos: puntos,
                            fecha_presupuesto: output,
                            usuarioCreadoPre: usuarioCreado
                        };
                    } else {
                        if (account.authorities.indexOf('ROLE_REPRESENTATE') >= 0) {
                            prueba = {
                                codigo: 'PR-' + usuarioCreado['id'],
                                pedido: 0,
                                puntos: puntos,
                                user: usuario,
                                fecha_presupuesto: output,
                                usuarioCreadoPre: usuarioCreado
                            };
                            usuario = usuarioCreado;
                        } else {
                            prueba = {
                                codigo: 'PR-' + usuario['id'],
                                pedido: 0,
                                puntos: puntos,
                                user: usuario,
                                fecha_presupuesto: output
                            };
                        }
                    }
                    var tiendaElegida = $('#selectTiendas').val();
                    var referenciaCliente = $('#referenciaCliente').val();
                    var todasTiendaBuenas = this.todasLasTiendas;
                    if (tiendaElegida != null && tiendaElegida != '' && referenciaCliente != null && referenciaCliente != '') {
                        for (let q = 0; q < todasTiendaBuenas.length; q++) {
                            if (todasTiendaBuenas[q]['id'] == tiendaElegida) {
                                var usuGG = todasTiendaBuenas[q]['user'];
                            }
                        }
                        prueba['user'] = usuGG;
                        prueba['codigo'] = referenciaCliente;
                    }
                    if (memo[1]['checked'] == true) {
                        prueba['pedido'] = 1;
                        prueba['fecha_pedido'] = output;
                    }
                    console.log(prueba);
                    this.presupuestoPedido = prueba;

                    this.subscribeToSaveResponse4(this.presupuestoPedidoService.create(this.presupuestoPedido));
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
                            var interior1 = sesion[1]['interiores'][0];
                            var puerta1 = sesion[1]['puertas'][0];
                            $('#cuerpo' + i).append(
                                '<div id="izquierda" class="armarioIzquierda" style="margin-left: 470px;margin-top: 110px;float: left;"></div>'
                            );
                            $('#cuerpo' + i).append('<div id="derecha" class="armarioDerecha" style="float:left;margin-top:515px;"></div>');

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:2" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                    interior1['nombre'] +
                                    '.png">'
                            );

                            if (puerta1 != undefined) {
                                if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:2" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                    interior1['nombre'] +
                                    '.png">'
                            );
                        }

                        if (nombreArmario == '3 PUERTAS IZQUIERDA') {
                            var interior1 = sesion[1]['interiores'][0];
                            var interior2 = sesion[1]['interiores'][1];
                            var puerta1 = sesion[1]['puertas'][0];
                            var puerta2 = sesion[1]['puertas'][1];
                            var puerta3 = sesion[1]['puertas'][2];
                            $('#cuerpo' + i).append(
                                '<div id="izquierda" class="armarioIzquierda" style="margin-left: 420px;margin-top: 110px;float: left;"></div>'
                            );
                            $('#cuerpo' + i).append('<div id="derecha" class="armarioDerecha" style="float:left;margin-top:515px;"></div>');

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:2" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                    interior1['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 98px;z-index: 1;margin-top: -33px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior2['nombre'] +
                                    '.png">'
                            );
                            console.log(puerta1);
                            console.log(puerta2);
                            console.log(puerta3);
                            if (puerta1 != undefined) {
                                if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta2 != undefined) {
                                if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta3 != undefined) {
                                if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:2" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                    interior1['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 98px;z-index: 1;margin-top: -33px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior2['nombre'] +
                                    '.png">'
                            );
                        }

                        if (nombreArmario == '1 CUERPO TIPO 1') {
                            var interior1 = sesion[1]['interiores'][0];

                            $('#cuerpo' + i).append(
                                '<div id="izquierda" class="armarioIzquierda" style="margin-left: 420px;margin-top: 110px;float: left;"></div>'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 98px;z-index: 1;margin-top: -33px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior1['nombre'] +
                                    '.png">'
                            );
                        }

                        if (nombreArmario == '1 CUERPO TIPO 2') {
                            var interior1 = sesion[1]['interiores'][0];

                            $('#cuerpo' + i).append(
                                '<div id="izquierda" class="armarioIzquierda" style="margin-left: 420px;margin-top: 110px;float: left;"></div>'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 98px;z-index: 1;margin-top: -33px;" src="../../../content/images/1- PARA WEB/VESTIDOR REMETIDO/' +
                                    interior1['nombre'] +
                                    '.png">'
                            );
                        }

                        if (nombreArmario == '1 CUERPO TIPO 3') {
                            var interior1 = sesion[1]['interiores'][0];

                            $('#cuerpo' + i).append(
                                '<div id="izquierda" class="armarioIzquierda" style="margin-left: 420px;margin-top: 110px;float: left;"></div>'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 98px;z-index: 1;margin-top: -33px;" src="../../../content/images/1- PARA WEB/VESTIDOR REMETIDO SIN TRASERA/' +
                                    interior1['nombre'] +
                                    '.png">'
                            );
                        }

                        if (nombreArmario == '2 PUERTAS') {
                            var interior1 = sesion[1]['interiores'][0];
                            var puerta1 = sesion[1]['puertas'][0];
                            var puerta2 = sesion[1]['puertas'][1];
                            $('#cuerpo' + i).append(
                                '<div id="izquierda" class="armarioIzquierda" style="margin-left: 420px;margin-top: 110px;float: left;"></div>'
                            );
                            $('#cuerpo' + i).append('<div id="derecha" class="armarioDerecha" style="float:left;margin-top:515px;"></div>');

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 98px;z-index: 1;margin-top: -33px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior1['nombre'] +
                                    '.png">'
                            );

                            console.log(puerta1);
                            console.log(puerta2);

                            if (puerta2 != undefined) {
                                if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta1 != undefined) {
                                if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 98px;z-index: 1;margin-top: -33px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
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
                                '<div id="izquierda" class="armarioIzquierda" style="margin-left: 420px;margin-top: 110px;float: left;"></div>'
                            );
                            $('#cuerpo' + i).append('<div id="derecha" class="armarioDerecha" style="float:left;margin-top:515px;"></div>');

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:1;margin-top: -13px;margin-left: 119px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                    interior2['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;z-index: 2;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior1['nombre'] +
                                    '.png">'
                            );

                            if (puerta3 != undefined) {
                                if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4;margin-top: -13px;margin-left: 119px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -13px;margin-left: 119px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4;margin-top: -13px;margin-left: 119px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -13px;margin-left: 119px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -13px;margin-left: 119px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -13px;margin-left: 119px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -13px;margin-left: 119px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -13px;margin-left: 119px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta2 != undefined) {
                                if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta1 != undefined) {
                                if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:465px;position:absolute;margin-top: -13px;margin-left: 119px;z-index:1;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                    interior2['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;z-index:2;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
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
                                '<div id="izquierda" class="armarioIzquierda" style="margin-left: 420px;margin-top: 110px;float: left;"></div>'
                            );
                            $('#cuerpo' + i).append('<div id="derecha" class="armarioDerecha" style="float:left;margin-top:515px;"></div>');

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:1;margin-top: -30px;margin-left: 145px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior2['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;z-index: 2;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior1['nombre'] +
                                    '.png">'
                            );

                            if (puerta2 != undefined) {
                                if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta1 != undefined) {
                                if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta3 != undefined) {
                                if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta4 != undefined) {
                                if (puerta4['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:485px;position:absolute;margin-top: -30px;margin-left: 145px; z-index:1;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior2['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;z-index:2;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior1['nombre'] +
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
                                '<div id="izquierda" class="armarioIzquierda" style="margin-left: 420px;margin-top: 110px;float: left;"></div>'
                            );
                            $('#cuerpo' + i).append('<div id="derecha" class="armarioDerecha" style="float:left;margin-top:515px;"></div>');

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:2" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                    interior1['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 98px;z-index: 1;margin-top: -33px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior2['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:0;margin-left: 217px;margin-top: -46px;  " src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                    interior3['nombre'] +
                                    '.png">'
                            );

                            if (puerta2 != undefined) {
                                if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top:-33px" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top:-33px" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top:-33px" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top:-33px" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top:-33px" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top:-33px" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top:-33px" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top:-33px" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top:-33px" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top:-33px" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top:-33px" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top:-33px" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta1 != undefined) {
                                if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/10.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta3 != undefined) {
                                if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top:-33px" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top:-33px" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top:-33px" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top:-33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top:-33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top:-33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top:-33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top:-33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top:-33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top:-33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top:-33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top:-33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta4 != undefined) {
                                if (puerta4['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4;margin-left: 217px;margin-top: -46px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-left: 217px;margin-top: -46px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == 'Puerta Aluminio Gris') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4;margin-left: 217px;margin-top: -46px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-left: 217px;margin-top: -46px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-left: 217px;margin-top: -46px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-left: 217px;margin-top: -46px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-left: 217px;margin-top: -46px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-left: 217px;margin-top: -46px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:2" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                    interior1['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 98px;z-index: 1;margin-top: -33px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior2['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:0;margin-left: 217px;margin-top: -46px;  " src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
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
                                '<div id="izquierda" class="armarioIzquierda" style="margin-left: 420px;margin-top: 110px;float: left;"></div>'
                            );
                            $('#cuerpo' + i).append('<div id="derecha" class="armarioDerecha" style="float:left;margin-top:515px;"></div>');

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:1;margin-top: -13px;margin-left: 119px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                    interior2['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;z-index: 2;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior1['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;z-index: 0;margin-left:217px;margin-top:-47px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior3['nombre'] +
                                    '.png">'
                            );

                            if (puerta3 != undefined) {
                                if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4;margin-top: -13px;margin-left: 119px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -13px;margin-left: 119px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4;margin-top: -13px;margin-left: 119px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -13px;margin-left: 119px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -13px;margin-left: 119px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -13px;margin-left: 119px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -13px;margin-left: 119px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -13px;margin-left: 119px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta2 != undefined) {
                                if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta1 != undefined) {
                                if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta5 != undefined) {
                                if (puerta5['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta5['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta5['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta5['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta4 != undefined) {
                                if (puerta4['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:465px;position:absolute;margin-top: -13px;margin-left: 119px;z-index:1;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                    interior2['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;z-index:2;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior1['nombre'] +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;z-index:0;margin-left:217px;margin-top:-47px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
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
                                '<div id="izquierda" class="armarioIzquierda" style="margin-left: 300px;margin-top: 110px;float: left;"></div>'
                            );
                            $('#cuerpo' + i).append('<div id="derecha" class="armarioDerecha" style="float:left;margin-top:515px;"></div>');

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:2;margin-top: -13px;margin-left: 119px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                    interior2['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;z-index: 3;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior1['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;z-index: 1;margin-left:217px;margin-top:-47px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior3['nombre'] +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;z-index: 0;margin-left:362PX;margin-top:-77px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior4['nombre'] +
                                    '.png">'
                            );

                            if (puerta3 != undefined) {
                                if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4;margin-top: -13px;margin-left: 119px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -13px;margin-left: 119px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4;margin-top: -13px;margin-left: 119px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -13px;margin-left: 119px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -13px;margin-left: 119px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -13px;margin-left: 119px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -13px;margin-left: 119px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -13px;margin-left: 119px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta2 != undefined) {
                                if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta1 != undefined) {
                                if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta5 != undefined) {
                                if (puerta5['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta5['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta5['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta5['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta4 != undefined) {
                                if (puerta4['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:217px;margin-top:-47px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta7 != undefined) {
                                if (puerta7['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left:362px;margin-top:-77px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:362px;margin-top:-77px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta7['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left:362px;margin-top:-77px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:362px;margin-top:-77px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta7['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:362px;margin-top:-77px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta7['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:362px;margin-top:-77px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta7['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:362px;margin-top:-77px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta7['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:362px;margin-top:-77px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta7['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:362px;margin-top:-77px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta7['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:362px;margin-top:-77px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta7['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:362px;margin-top:-77px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta7['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:362px;margin-top:-77px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta6 != undefined) {
                                if (puerta6['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left:362px;margin-top:-77px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:362px;margin-top:-77px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta6['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left:362px;margin-top:-77px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:362px;margin-top:-77px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta6['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:362px;margin-top:-77px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta6['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:362px;margin-top:-77px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta6['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:362px;margin-top:-77px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta6['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:362px;margin-top:-77px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta6['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:362px;margin-top:-77px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta6['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:362px;margin-top:-77px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta6['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:362px;margin-top:-77px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta6['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left:362px;margin-top:-77px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:465px;position:absolute;margin-top: -13px;margin-left: 119px;z-index:2;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                    interior2['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;z-index:3;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior1['nombre'] +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;z-index:1;margin-left:217px;margin-top:-47px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior3['nombre'] +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;z-index:0;margin-left:362px;margin-top:-77px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
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
                                '<div id="izquierda" class="armarioIzquierda" style="margin-left: 355px;margin-top: 110px;float: left;"></div>'
                            );
                            $('#cuerpo' + i).append('<div id="derecha" class="armarioDerecha" style="float:left;margin-top:515px;"></div>');

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:2" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                    interior1['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 98px;z-index: 1;margin-top: -33px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior2['nombre'] +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 243px;z-index: 0;margin-top: -63px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior3['nombre'] +
                                    '.png">'
                            );
                            console.log(puerta1);
                            console.log(puerta2);
                            console.log(puerta3);
                            if (puerta1 != undefined) {
                                if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta2 != undefined) {
                                if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta3 != undefined) {
                                if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta4 != undefined) {
                                if (puerta4['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta5 != undefined) {
                                if (puerta5['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta5['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta5['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta5['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:2" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                    interior1['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 98px;z-index: 1;margin-top: -33px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior2['nombre'] +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 243px;z-index: 0;margin-top: -63px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
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
                                '<div id="izquierda" class="armarioIzquierda" style="margin-left: 420px;margin-top: 110px;float: left;"></div>'
                            );
                            $('#cuerpo' + i).append('<div id="derecha" class="armarioDerecha" style="float:left;margin-top:515px;"></div>');

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:1;margin-top: -30px;margin-left: 145px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior2['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;z-index: 2;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior1['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:0;margin-top: -43px;margin-left: 260px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                    interior3['nombre'] +
                                    '.png">'
                            );

                            if (puerta5 != undefined) {
                                if (puerta5['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4;margin-top: -43px;margin-left: 260px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -43px;margin-left: 260px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta5['nombre'] == 'Puerta Aluminio Gris') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4;margin-top: -43px;margin-left: 260px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -43px;margin-left: 260px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta5['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -43px;margin-left: 260px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -43px;margin-left: 260px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -43px;margin-left: 260px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -43px;margin-left: 260px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta2 != undefined) {
                                if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta1 != undefined) {
                                if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta3 != undefined) {
                                if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta4 != undefined) {
                                if (puerta4['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:485px;position:absolute;margin-top: -30px;margin-left: 145px; z-index:1;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior2['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;z-index:2;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior1['nombre'] +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:0;margin-top: -43px;margin-left: 260px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
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
                                '<div id="izquierda" class="armarioIzquierda" style="margin-left: 355px;margin-top: 110px;float: left;"></div>'
                            );
                            $('#cuerpo' + i).append('<div id="derecha" class="armarioDerecha" style="float:left;margin-top:515px;"></div>');

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:3" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                    interior1['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 98px;z-index: 2;margin-top: -33px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior2['nombre'] +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 243px;z-index: 1;margin-top: -63px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior3['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:0;margin-left: 362px;margin-top:-76px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                    interior4['nombre'] +
                                    '.png">'
                            );
                            console.log(puerta1);
                            console.log(puerta2);
                            console.log(puerta3);
                            if (puerta1 != undefined) {
                                if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }
                            if (puerta6 != undefined) {
                                if (puerta6['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4;margin-left: 362px;margin-top:-76px" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-left: 362px;margin-top:-76px" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta6['nombre'] == 'Puerta Aluminio Gris') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4;margin-left: 362px;margin-top:-76px" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-left: 362px;margin-top:-76px" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta6['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-left: 362px;margin-top:-76px" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta6['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-left: 362px;margin-top:-76px" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta6['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-left: 362px;margin-top:-76px" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta6['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-left: 362px;margin-top:-76px" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta2 != undefined) {
                                if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta3 != undefined) {
                                if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta4 != undefined) {
                                if (puerta4['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta5 != undefined) {
                                if (puerta5['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta5['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta5['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta5['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:3" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                    interior1['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 98px;z-index: 2;margin-top: -33px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior2['nombre'] +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 243px;z-index: 1;margin-top: -63px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior3['nombre'] +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:0;margin-left: 362px;margin-top:-76px" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
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
                                '<div id="izquierda" class="armarioIzquierda" style="margin-left: 355px;margin-top: 110px;float: left;"></div>'
                            );
                            $('#cuerpo' + i).append('<div id="derecha" class="armarioDerecha" style="float:left;margin-top:515px;"></div>');

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:2" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                    interior1['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 98px;z-index: 1;margin-top: -33px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior2['nombre'] +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 243px;z-index: 0;margin-top: -63px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior3['nombre'] +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 388px;z-index: 0;margin-top: -93px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior4['nombre'] +
                                    '.png">'
                            );
                            console.log(puerta1);
                            console.log(puerta2);
                            console.log(puerta3);
                            if (puerta1 != undefined) {
                                if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta2 != undefined) {
                                if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta3 != undefined) {
                                if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta4 != undefined) {
                                if (puerta4['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta5 != undefined) {
                                if (puerta5['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta5['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta5['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta5['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta6 != undefined) {
                                if (puerta6['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta6['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta6['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta6['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta6['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta6['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta6['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta6['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta6['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta6['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta7 != undefined) {
                                if (puerta7['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta7['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta7['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta7['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta7['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta7['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta7['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta7['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta7['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta7['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:3" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                    interior1['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 98px;z-index: 2;margin-top: -33px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior2['nombre'] +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 243px;z-index: 1;margin-top: -63px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior3['nombre'] +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 388px;z-index: 0;margin-top: -93px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
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
                                '<div id="izquierda" class="armarioIzquierda" style="margin-left: 270px;margin-top: 110px;float: left;"></div>'
                            );
                            $('#cuerpo' + i).append('<div id="derecha" class="armarioDerecha" style="float:left;margin-top:515px;"></div>');

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:0;margin-left: 508px;margin-top: -106px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                    interior1['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 98px;z-index: 3;margin-top: -33px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior2['nombre'] +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 243px;z-index: 2;margin-top: -63px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior3['nombre'] +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 388px;z-index: 1;margin-top: -93px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior4['nombre'] +
                                    '.png">'
                            );

                            if (puerta1 != undefined) {
                                if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4;margin-left: 508px;margin-top: -106px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-left: 508px;margin-top: -106px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4;margin-left: 508px;margin-top: -106px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-left: 508px;margin-top: -106px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-left: 508px;margin-top: -106px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-left: 508px;margin-top: -106px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-left: 508px;margin-top: -106px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-left: 508px;margin-top: -106px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta2 != undefined) {
                                if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta3 != undefined) {
                                if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta4 != undefined) {
                                if (puerta4['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta5 != undefined) {
                                if (puerta5['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta5['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta5['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta5['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta6 != undefined) {
                                if (puerta6['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta6['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta6['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta6['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta6['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta6['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta6['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta6['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta6['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta6['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta7 != undefined) {
                                if (puerta7['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta7['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta7['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta7['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta7['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta7['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta7['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta7['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta7['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta7['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:0;margin-left: 508px;margin-top: -106px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/INTERIORES/' +
                                    interior1['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 98px;z-index: 3;margin-top: -33px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior2['nombre'] +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 243px;z-index: 2;margin-top: -63px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior3['nombre'] +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 388px;z-index: 1;margin-top: -93px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
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
                            $('#cuerpo' + i).append(
                                '<div id="izquierda" class="armarioIzquierda" style="margin-left: 270px;margin-top: 110px;float: left;"></div>'
                            );
                            $('#cuerpo' + i).append('<div id="derecha" class="armarioDerecha" style="float:left;margin-top:515px;"></div>');

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 388px;z-index: 1;margin-top: -93px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior3['nombre'] +
                                    '.png">'
                            );

                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 98px;z-index: 3;margin-top: -33px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior1['nombre'] +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #derecha').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 243px;z-index: 2;margin-top: -63px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior2['nombre'] +
                                    '.png">'
                            );

                            if (puerta2 != undefined) {
                                if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta3 != undefined) {
                                if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta4 != undefined) {
                                if (puerta4['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta5 != undefined) {
                                if (puerta5['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta5['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta5['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta5['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta5['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta6 != undefined) {
                                if (puerta6['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta6['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta6['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta6['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta6['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta6['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta6['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta6['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta6['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta6['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            if (puerta7 != undefined) {
                                if (puerta7['nombre'] == 'Puerta Aluminio Transparente') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta7['nombre'] == 'Puerta Aluminio Gris') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                    var src1 =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src1 +
                                            '">'
                                    );
                                }

                                if (puerta7['nombre'] == 'Puerta Batiente sin tirador') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta7['nombre'] == 'Puerta Batiente tirador TIM') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta7['nombre'] == 'Puerta Batiente tirador NYE') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta7['nombre'] == 'Puerta Batiente tirador DRAW') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta7['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta7['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }

                                if (puerta7['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                                if (puerta7['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                                    var src =
                                        '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                                    $('#cuerpo' + i + ' #derecha').append(
                                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;" src="' +
                                            src +
                                            '">'
                                    );
                                }
                            }

                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 98px;z-index: 3;margin-top: -33px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior1['nombre'] +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 243px;z-index: 2;margin-top: -63px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior2['nombre'] +
                                    '.png">'
                            );
                            $('#cuerpo' + i + ' #izquierda').append(
                                '<img class="puertas3Izquierda"  style="width:485px;position:absolute;margin-left: 388px;z-index: 1;margin-top: -93px;" src="../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/INTERIORES/' +
                                    interior3['nombre'] +
                                    '.png">'
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
                                '<i style="float:right;margin-right:40%">' +
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
                        $('#textoCesta' + i).append(
                            '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;">Codigo: ' +
                                sesion[1]['codigo'] +
                                '<i style="float:right;margin-right:40%">+ ' +
                                sesion[1]['precioCasco'] +
                                ' pp</i></p>'
                        );
                        if (sesion[1]['niveladores'] != undefined) {
                            $('#textoCesta' + i).append(
                                '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;">Niveladores: <i style="float:right;margin-right:40%">+ ' +
                                    sesion[1]['niveladores']['precio'] +
                                    ' pp</i></p>'
                            );
                        }
                        if (sesion[1]['cajeado'] != undefined) {
                            $('#textoCesta' + i).append(
                                '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;">Cajeado: ' +
                                    sesion[1]['cajeado']['tipo'] +
                                    '<i style="float:right;margin-right:40%">+ ' +
                                    sesion[1]['cajeado']['precio'] +
                                    ' pp</i></p>'
                            );
                        }
                        if (sesion[1]['enmarcado'] != undefined) {
                            $('#textoCesta' + i).append(
                                '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;">Enmarcado: ' +
                                    sesion[1]['enmarcado']['codigo'] +
                                    '<i style="float:right;margin-right:40%">+ ' +
                                    sesion[1]['enmarcado']['precio'] +
                                    ' pp</i></p>'
                            );
                        }
                        $('#textoCesta' + i).append(
                            '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;">Acabado Casco: ' +
                                sesion[1]['acabadoCasco']['nombre'] +
                                '</p>'
                        );
                        $('#textoCesta' + i).append(
                            '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;">Acabado Trasera: ' +
                                sesion[1]['acabadoTrasera']['nombre'] +
                                '</p>'
                        );
                        $('#textoCesta' + i).append(
                            '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;">Acabado Interiores: ' +
                                sesion[1]['acabadoInterior']['nombre'] +
                                '</p>'
                        );
                        if (sesion[1]['acabadoTirador'] != undefined) {
                            $('#textoCesta' + i).append(
                                '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;">Acabado Tirador: ' +
                                    sesion[1]['acabadoTirador']['nombre'] +
                                    '</p>'
                            );
                        }

                        for (let w = 0; w < sesion[1]['interiores']['length']; w++) {
                            $('#textoCesta' + i).append(
                                '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;">Interior ' +
                                    (w + 1) +
                                    ': ' +
                                    sesion[1]['interiores'][w]['nombre'] +
                                    '<i style="float:right;margin-right:40%">+ ' +
                                    sesion[1]['interiores'][w]['precio'] +
                                    ' pp</i></p>'
                            );
                        }
                        if (sesion[1]['puertas'] != undefined) {
                            for (let w = 0; w < sesion[1]['puertas']['length']; w++) {
                                $('#textoCesta' + i).append(
                                    '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left:28%;">Puerta ' +
                                        (w + 1) +
                                        ': ' +
                                        sesion[1]['puertas'][w]['nombre'] +
                                        '<i style="float:right;margin-right:40%">+ ' +
                                        sesion[1]['puertas'][w]['precio'] +
                                        ' pp</i></p>'
                                );
                            }
                        }

                        var cestaTodo = parseFloat($('#cestaTotal').text());

                        if ($('#cestaTotal').text() == '') {
                            cestaTodo = 0;
                        }
                        cestaTodo = cestaTodo + parseFloat(sesion[1]['todoSumadoPrecio']);

                        $('#cestaTotal').text(cestaTodo.toFixed(2));

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

                        contAca = 1;
                        $('#cuerpo' + i).append('<div id="izquierda" class="marginIzquierda" style="float: left;margin-top:20px"></div>');

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
                                    '</span> pp </i></p>'
                            );
                        } else {
                            $('#textoCesta' + i).append(
                                '<p style="letter-spacing: 1px;font-weight: 300;margin-left: 28%;">' +
                                    sesion[1]['productosDormitorio']['nombre'].toUpperCase() +
                                    '<i style="float:right;margin-right:40%"><span id="precioTodoProd' +
                                    i +
                                    '">' +
                                    sesion[1]['todoSumadoPrecio'] +
                                    '</span> pp </i></p>'
                            );
                        }

                        $('#textoCesta' + i).append(
                            '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;">Ancho: ' +
                                sesion[1]['ancho'] +
                                '</p>'
                        );

                        var nombreCargarImagen;
                        if (sesion[1]['productosDormitorio']['id'] == 277) {
                            nombreCargarImagen = 'NT007_NT022';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 275) {
                            nombreCargarImagen = 'NT001_NT004';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 276) {
                            nombreCargarImagen = 'NT005_NT006';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 278) {
                            nombreCargarImagen = 'NT023_NT038';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 279) {
                            nombreCargarImagen = 'NT039_NT054';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 280) {
                            nombreCargarImagen = 'NT055_NT070';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 281) {
                            nombreCargarImagen = 'NT071_NT078';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 246) {
                            nombreCargarImagen = 'NT079_NT094';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 282) {
                            nombreCargarImagen = 'NT095_NT110';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 247) {
                            nombreCargarImagen = 'NT111_NT115';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 249) {
                            nombreCargarImagen = 'NT116_NT123';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 250) {
                            nombreCargarImagen = 'NT116_NT123';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 248) {
                            nombreCargarImagen = 'NT124_NT143';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 251) {
                            nombreCargarImagen = 'NT144_NT148';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 253) {
                            nombreCargarImagen = 'NT149_NT156';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 254) {
                            nombreCargarImagen = 'NT149_NT156';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 252) {
                            nombreCargarImagen = 'NT157_NT176';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 255) {
                            nombreCargarImagen = 'NT177_NT181';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 257) {
                            nombreCargarImagen = 'NT182_NT189';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 258) {
                            nombreCargarImagen = 'NT182_NT189';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 256) {
                            nombreCargarImagen = 'NT190_NT209';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 259) {
                            nombreCargarImagen = 'NT210_NT211';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 261) {
                            nombreCargarImagen = 'NT212_NT219';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 262) {
                            nombreCargarImagen = 'NT212_NT219';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 260) {
                            nombreCargarImagen = 'NT220_NT227';
                        }

                        if (sesion[1]['productosDormitorio']['id'] == 263) {
                            nombreCargarImagen = 'NT228_NT229';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 266) {
                            nombreCargarImagen = 'NT230_NT237';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 265) {
                            nombreCargarImagen = 'NT230_NT237';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 264) {
                            nombreCargarImagen = 'NT238_NT245';
                        }

                        if (sesion[1]['productosDormitorio']['id'] == 271) {
                            nombreCargarImagen = 'NT246_NT250';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 274) {
                            nombreCargarImagen = 'NT251_NT258';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 273) {
                            nombreCargarImagen = 'NT251_NT258';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 272) {
                            nombreCargarImagen = 'NT259_NT278';
                        }

                        if (sesion[1]['productosDormitorio']['id'] == 267) {
                            nombreCargarImagen = 'NT279_NT280';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 269) {
                            nombreCargarImagen = 'NT281_NT288';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 270) {
                            nombreCargarImagen = 'NT281_NT288';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 268) {
                            nombreCargarImagen = 'NT289_NT296';
                        }

                        if (sesion[1]['productosDormitorio']['id'] == 283) {
                            nombreCargarImagen = 'NT297_NT314';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 284) {
                            nombreCargarImagen = 'NT315_NT332';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 285) {
                            nombreCargarImagen = 'NT333_NT350';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 1) {
                            nombreCargarImagen = 'NX009_NX012';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 2) {
                            nombreCargarImagen = 'NX009_NX012';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 3) {
                            nombreCargarImagen = 'NX009_NX012';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 4) {
                            nombreCargarImagen = 'NX013_NX016';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 5) {
                            nombreCargarImagen = 'NX017_NX020';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 6) {
                            nombreCargarImagen = 'NX021_NX024';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 7) {
                            nombreCargarImagen = 'NX025_NX028';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 8) {
                            nombreCargarImagen = 'NX029_NX032';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 9) {
                            nombreCargarImagen = 'NX033_NX036';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 10) {
                            nombreCargarImagen = 'NX037_NX040';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 11) {
                            nombreCargarImagen = 'NX041_NX044';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 12) {
                            nombreCargarImagen = 'NX045_NX048';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 13) {
                            nombreCargarImagen = 'NX049_NX052';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 229) {
                            nombreCargarImagen = 'NX053';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 239) {
                            nombreCargarImagen = 'NX058_NX061';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 240) {
                            nombreCargarImagen = 'NX062_NX065';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 241) {
                            nombreCargarImagen = 'NX066_NX069';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 107) {
                            nombreCargarImagen = 'NH001-NH006';
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
                            nombreCargarImagen = 'NH025_NH028';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 113) {
                            nombreCargarImagen = 'NH029_NH032';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 112) {
                            nombreCargarImagen = 'NH033_NH036';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 114) {
                            nombreCargarImagen = 'NH037_NH041';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 116) {
                            nombreCargarImagen = 'NH042_NH045';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 115) {
                            nombreCargarImagen = 'NH046_NH049';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 298) {
                            nombreCargarImagen = 'NH050_NH051';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 297) {
                            nombreCargarImagen = 'NH052_NH053';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 118) {
                            nombreCargarImagen = 'NH054_NH057';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 117) {
                            nombreCargarImagen = 'NH058_NH061';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 119) {
                            nombreCargarImagen = 'NH062_NH066';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 299) {
                            nombreCargarImagen = 'NH067_NH069';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 301) {
                            nombreCargarImagen = 'NH070_NH071';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 300) {
                            nombreCargarImagen = 'NH072_NH073';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 302) {
                            nombreCargarImagen = 'NH074_NH077';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 334) {
                            nombreCargarImagen = 'NH078_NH079';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 303) {
                            nombreCargarImagen = 'NH080_NH081';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 14) {
                            nombreCargarImagen = 'NH082_NH083';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 304) {
                            nombreCargarImagen = 'NH084';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 53) {
                            nombreCargarImagen = 'NH085';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 305) {
                            nombreCargarImagen = 'NH086_NH088';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 62) {
                            nombreCargarImagen = 'NH089_NH091';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 306) {
                            nombreCargarImagen = 'NH092_NH094';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 63) {
                            nombreCargarImagen = 'NH095_NH097';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 307) {
                            nombreCargarImagen = 'NH098_NH100';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 64) {
                            nombreCargarImagen = 'NH101_NH103';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 308) {
                            nombreCargarImagen = 'NH104_NH106';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 65) {
                            nombreCargarImagen = 'NH107_NH109';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 308) {
                            nombreCargarImagen = 'NH104_NH106';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 65) {
                            nombreCargarImagen = 'NH107_NH109';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 309) {
                            nombreCargarImagen = 'NH110_NH112';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 66) {
                            nombreCargarImagen = 'NH113_NH115';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 310) {
                            nombreCargarImagen = 'NH116_NH118';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 67) {
                            nombreCargarImagen = 'NH119_NH121';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 311) {
                            nombreCargarImagen = 'NH122_NH124';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 68) {
                            nombreCargarImagen = 'NH125_NH127';
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
                            nombreCargarImagen = 'NH139_NH140';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 72) {
                            nombreCargarImagen = 'NH141_NH142';
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
                        if (sesion[1]['productosDormitorio']['id'] == 79) {
                            nombreCargarImagen = 'NH152';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 319) {
                            nombreCargarImagen = 'NH154';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 320) {
                            nombreCargarImagen = 'NH156';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 325) {
                            nombreCargarImagen = 'NH168';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 320) {
                            nombreCargarImagen = 'NH179';
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
                        if (sesion[1]['productosDormitorio']['id'] == 165) {
                            nombreCargarImagen = 'NH258';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 164) {
                            nombreCargarImagen = 'NH259';
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
                        if (sesion[1]['productosDormitorio']['id'] == 180) {
                            nombreCargarImagen = 'NH279_NH280';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 181) {
                            nombreCargarImagen = 'NH281_NH282';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 182) {
                            nombreCargarImagen = 'NH283';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 183) {
                            nombreCargarImagen = 'NH284';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 184) {
                            nombreCargarImagen = 'NH289_NH293';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 185) {
                            nombreCargarImagen = 'NH294_NH298';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 186) {
                            nombreCargarImagen = 'NH299_NH303';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 188) {
                            nombreCargarImagen = 'NH304_NH308';
                        }

                        if (sesion[1]['productosDormitorio']['id'] == 187) {
                            nombreCargarImagen = 'NH309_NH313';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 189) {
                            nombreCargarImagen = 'NH314_NH318';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 194) {
                            nombreCargarImagen = 'NH319_NH320';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 190) {
                            nombreCargarImagen = 'NH321_NH322';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 195) {
                            nombreCargarImagen = 'NH323_NH324';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 191) {
                            nombreCargarImagen = 'NH325_NH326';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 196) {
                            nombreCargarImagen = 'NH327_NH331';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 200) {
                            nombreCargarImagen = 'NH332_NH336';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 192) {
                            nombreCargarImagen = 'NH337_NH341';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 198) {
                            nombreCargarImagen = 'NH342_NH346';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 197) {
                            nombreCargarImagen = 'NH347_NH351';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 201) {
                            nombreCargarImagen = 'NH352_NH356';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 193) {
                            nombreCargarImagen = 'NH357_NH361';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 199) {
                            nombreCargarImagen = 'NH362_NH366';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 203) {
                            nombreCargarImagen = 'NH372_NH373';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 204) {
                            nombreCargarImagen = 'NH455_NH458';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 333) {
                            nombreCargarImagen = 'NH461';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 206) {
                            nombreCargarImagen = 'NH462';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 207) {
                            nombreCargarImagen = 'NH463_NH468';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 208) {
                            nombreCargarImagen = 'NH469_NH474';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 209) {
                            nombreCargarImagen = 'NH475_NH480';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 210) {
                            nombreCargarImagen = 'NH481_NH486';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 211) {
                            nombreCargarImagen = 'NH487_NH492';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 213) {
                            nombreCargarImagen = 'NH493_NH496';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 214) {
                            nombreCargarImagen = 'NH493_NH496';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 215) {
                            nombreCargarImagen = 'NH497_NH500';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 216) {
                            nombreCargarImagen = 'NH497_NH500';
                        }
                        if (sesion[1]['productosDormitorio']['id'] == 217) {
                            nombreCargarImagen = 'NH501_NH502';
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

                        if (sesion[1]['productosDormitorio']['id'] == 222) {
                            nombreCargarImagen = 'NH507_NH510';
                        }

                        $('#cuerpo' + i + ' #izquierda').append(
                            '<img style="z-index:' +
                                (100 - i) +
                                ';max-width:400px;max-height:400px;;max-width:410px;max-height:350px;position:absolute;top:-10px" width="1000px" height="1000px" src="../../../content/images/1- PARA WEB/DORMITORIO/' +
                                nombreCargarImagen +
                                '.jpg">'
                        );
                        $('#textoCesta' + i).css({ 'margin-top': '50px' });
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
                        if (saberlo != 'A') {
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

                            if (sesion[1]['usb'] != undefined) {
                                $('#textoCesta' + i).append(
                                    '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;">' +
                                        sesion[1]['usb']['mensaje'] +
                                        ': <i style="float:right;font-size:15px;margin-right:40%">+ ' +
                                        sesion[1]['usb']['precio'] +
                                        ' &euro;</i></p>'
                                );
                            }
                        } else {
                            if (sesion[1]['apoyo'] != undefined) {
                                $('#textoCesta' + i).append(
                                    '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;">Apoyo: ' +
                                        sesion[1]['apoyo']['productoApoyo']['nombre'] +
                                        '<i style="float:right;font-size:15px;margin-right:40%">+ ' +
                                        sesion[1]['apoyo']['precio'] +
                                        ' PP</i></p>'
                                );
                            }
                            if (sesion[1]['iluminacion'] != undefined) {
                                $('#textoCesta' + i).append(
                                    '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;">Iluminacion: <i style="float:right;font-size:15px;margin-right:40%">+ ' +
                                        sesion[1]['iluminacion']['precio'] +
                                        ' PP</i></p>'
                                );
                            }
                            if (sesion[1]['usb'] != undefined) {
                                $('#textoCesta' + i).append(
                                    '<p style="letter-spacing: 1px;font-weight: 300;font-size: 12px;margin-left: 28%;">' +
                                        sesion[1]['usb']['mensaje'] +
                                        ': <i style="float:right;font-size:15px;margin-right:40%">+ ' +
                                        sesion[1]['usb']['precio'] +
                                        ' PP</i></p>'
                                );
                            }
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
                    } else {
                        if (sesion[1]['especial'] == 0) {
                            $('#modalCesta .modal-body').append(
                                '<div style="float: left;width: 500px;text-align: center;height:300px;position:relative" id="cuerpo' +
                                    i +
                                    '"></div>'
                            );

                            $('#cuerpo' + i).append(
                                '<img style="z-index:' +
                                    (100 - i) +
                                    ';max-width:400px;max-height:400px;;max-width:400px;max-height:250px;position:absolute;top:0px;margin-left:270px" width="1000px" height="1000px" src="../../../content/images/especial.png">'
                            );
                            $('#modalCesta .modal-body').append(
                                '<div style="float: left;width: 100%;height:180px:margin-bottom:50px;" id="textoCesta' + i + '"></div>'
                            );

                            var saberlo = JSON.parse(sessionStorage.getItem('seccionPrecios'));
                            if (saberlo != 'A') {
                                $('#textoCesta' + i).append(
                                    '<p style="letter-spacing: 1px;font-weight: 300;margin-left: 28%;">Articulo Especial<i style="float:right;margin-right:40%"><span id="precioTodoProd' +
                                        i +
                                        '">' +
                                        sesion[1]['precio'] +
                                        '</span> &euro; </i></p>'
                                );
                            } else {
                                $('#textoCesta' + i).append(
                                    '<p style="letter-spacing: 1px;font-weight: 300;margin-left: 28%;">Articulo Especial<i style="float:right;margin-right:40%"><span id="precioTodoProd' +
                                        i +
                                        '">' +
                                        sesion[1]['precio'] +
                                        '</span> PP </i></p>'
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

                            $('#textoCesta' + i).append(
                                '<p style="letter-spacing: 1px;font-weight: 300;margin-left:28%;font-size: 16px;"><span onclick="borrarProdCesta(' +
                                    i +
                                    ')" style=""><a><u>ELIMINAR</u></a></span> </p>'
                            );

                            $('#textoCesta' + i).append('<hr style="100%"></hr>');
                        }
                    }
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

    public siEsCambiarB() {
        var tienda = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
        $('#modalCambiar1A').css({ 'background-color': 'black' });
        $('#modalCambiar1B').css({ 'background-color': 'black' });
        $('#modalCambiar1C').css({ 'background-color': 'black' });
        $('#modalCambiar1A').css({ color: 'white' });
        $('#modalCambiar1B').css({ color: 'white' });
        $('#modalCambiar1C').css({ color: 'white' });
        this.precioTiendaService.findBus(tienda.id).subscribe(data => {
            this.precioPunto = data.body;
            sessionStorage.setItem('B', JSON.stringify(this.precioPunto[0]));
            sessionStorage.setItem('seccionPrecios', JSON.stringify('B'));
        });
        sessionStorage.removeItem('C');
        sessionStorage.removeItem('A');
        $('#siEsIva').css({ display: 'block' });
        $('#modalCambiar1B').css({ 'background-color': '#D8E8C6' });
        $('#modalCambiar1B').css({ color: 'black' });
        this.router.navigate(['/inicio']);
        $('#modalCambiarC #textoRojoCarrito').css({ display: 'none' });
        this.productosDormitorioService.numeroCesta = 0;
        for (let i = 1; i <= 100; i++) {
            sessionStorage.removeItem('prod' + i);
        }
    }
    public textoRojoMostrarA() {
        var cesta = this.productosDormitorioService.numeroCesta;
        if (cesta != 0) {
            $('#modalCambiarA #textoRojoCarrito').css({ display: 'block' });
        }
    }
    public textoRojoMostrarB() {
        var cesta = this.productosDormitorioService.numeroCesta;
        if (cesta != 0) {
            $('#modalCambiarB #textoRojoCarrito').css({ display: 'block' });
        }
    }
    public textoRojoMostrarC() {
        var cesta = this.productosDormitorioService.numeroCesta;
        if (cesta != 0) {
            $('#modalCambiarC #textoRojoCarrito').css({ display: 'block' });
        }
    }
    public siEsCambiarA() {
        var tienda = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
        $('#modalCambiar1A').css({ 'background-color': 'black' });
        $('#modalCambiar1B').css({ 'background-color': 'black' });
        $('#modalCambiar1C').css({ 'background-color': 'black' });
        $('#modalCambiar1A').css({ color: 'white' });
        $('#modalCambiar1B').css({ color: 'white' });
        $('#modalCambiar1C').css({ color: 'white' });
        sessionStorage.setItem('A', JSON.stringify(1));
        sessionStorage.setItem('seccionPrecios', JSON.stringify('A'));
        sessionStorage.removeItem('C');
        sessionStorage.removeItem('B');
        $('#siEsIva').css({ display: 'none' });
        this.router.navigate(['/inicio']);
        $('#modalCambiar1A').css({ 'background-color': '#D8E8C6' });
        $('#modalCambiar1A').css({ color: 'black' });
        sessionStorage.setItem('IVA', JSON.stringify(0));
        $('#modalCambiarC #textoRojoCarrito').css({ display: 'none' });
        this.productosDormitorioService.numeroCesta = 0;
        for (let i = 1; i <= 100; i++) {
            sessionStorage.removeItem('prod' + i);
        }
    }

    public siEsCambiarC() {
        var tienda = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
        $('#modalCambiar1A').css({ 'background-color': 'black' });
        $('#modalCambiar1B').css({ 'background-color': 'black' });
        $('#modalCambiar1C').css({ 'background-color': 'black' });
        $('#modalCambiar1A').css({ color: 'white' });
        $('#modalCambiar1B').css({ color: 'white' });
        $('#modalCambiar1C').css({ color: 'white' });
        var valorInput = $('#inputPrecioTienda').val();
        sessionStorage.setItem('C', JSON.stringify(valorInput));
        sessionStorage.setItem('seccionPrecios', JSON.stringify('C'));
        sessionStorage.removeItem('A');
        sessionStorage.removeItem('B');
        $('#modalCambiar1C').css({ 'background-color': '#D8E8C6' });
        $('#modalCambiar1C').css({ color: 'black' });
        $('#siEsIva').css({ display: 'block' });
        this.router.navigate(['/inicio']);
        var cesta = this.productosDormitorioService.numeroCesta;
        $('#modalCambiarC #textoRojoCarrito').css({ display: 'none' });
        this.productosDormitorioService.numeroCesta = 0;
        for (let i = 1; i <= 100; i++) {
            sessionStorage.removeItem('prod' + i);
        }
    }

    public siEsCambiarD() {
        var tienda = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
        $('#modalCambiar1D').css({ 'background-color': 'black' });
        $('#modalCambiar1D').css({ color: 'white' });
        $('#modalCambiar1E').css({ 'background-color': 'black' });
        $('#modalCambiar1E').css({ color: 'white' });
        sessionStorage.setItem('IVA', JSON.stringify(1));
        this.router.navigate(['/inicio']);
        $('#modalCambiar1D').css({ 'background-color': '#D8E8C6' });
        $('#modalCambiar1D').css({ color: 'black' });
    }

    public siEsCambiarE() {
        var tienda = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
        $('#modalCambiar1D').css({ 'background-color': 'black' });
        $('#modalCambiar1D').css({ color: 'white' });
        $('#modalCambiar1E').css({ 'background-color': 'black' });
        $('#modalCambiar1E').css({ color: 'white' });
        sessionStorage.setItem('IVA', JSON.stringify(0));
        this.router.navigate(['/inicio']);
        $('#modalCambiar1E').css({ 'background-color': '#D8E8C6' });
        $('#modalCambiar1E').css({ color: 'black' });
    }

    public comprobarCambiar() {
        var text = $('#inputVerContra').val();
        if (text == '1234') {
            $('#modalCambiarB #conContrasena').css({ display: 'block' });
            $('#modalCambiarB #sinContrasena').css({ display: 'none' });
        } else {
            $('#modalCambiarB #sinContrasena').css({ border: '1px solid red' });
        }
    }

    ngOnInit() {
        this.predicate = 'id';

        this.reverse = true;
        this.languageHelper.getAll().then(languages => {
            this.languages = languages;
        });
        sessionStorage.setItem('A', JSON.stringify(1));
        sessionStorage.setItem('seccionPrecios', JSON.stringify('A'));

        var item = JSON.parse(sessionStorage.getItem('seccionPrecios'));
        var item1 = JSON.parse(sessionStorage.getItem('IVA'));
        $('#modalCambiar1A').css({ 'background-color': 'black' });
        $('#modalCambiar1B').css({ 'background-color': 'black' });
        $('#modalCambiar1C').css({ 'background-color': 'black' });
        $('#modalCambiar1A').css({ color: 'white' });
        $('#modalCambiar1B').css({ color: 'white' });
        $('#modalCambiar1C').css({ color: 'white' });
        $('#modalCambiar1' + item).css({ 'background-color': '#D8E8C6' });
        $('#modalCambiar1' + item).css({ color: 'black' });
        if (item != undefined && item != null) {
            if (item != 'A') {
                $('#siEsIva').css({ display: 'block' });
            }
        }
        if (item1 == 1) {
            $('#modalCambiar1D').css({ 'background-color': '#D8E8C6' });
            $('#modalCambiar1D').css({ color: 'black' });
            $('#modalCambiar1E').css({ 'background-color': 'black' });
            $('#modalCambiar1E').css({ color: 'white' });
        }
        if (item1 == 0) {
            $('#modalCambiar1E').css({ 'background-color': '#D8E8C6' });
            $('#modalCambiar1E').css({ color: 'black' });
            $('#modalCambiar1D').css({ 'background-color': 'black' });
            $('#modalCambiar1D').css({ color: 'white' });
        }

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
        result.subscribe((res: HttpResponse<IPresupuestoPedido>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected subscribeToSaveResponse4(result: Observable<HttpResponse<ICategoriasDormi>>) {
        result.subscribe((res: HttpResponse<IPresupuestoPedido>) => this.onSaveSuccess4(), (res: HttpErrorResponse) => this.onSaveError());
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

    protected subscribeToSaveResponse10(result: Observable<HttpResponse<IPresupuestoArmarioPuertas>>) {
        result.subscribe(
            (res: HttpResponse<IPresupuestoArmarioPuertas>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    protected subscribeToSaveResponse6(result: Observable<HttpResponse<IProductosPresupuestoPedidos>>) {
        result.subscribe(
            (res: HttpResponse<IProductosPresupuestoPedidos>) => this.onSaveSuccess6(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    protected onSaveSuccess() {
        this.isSaving = false;
    }

    protected onSaveSuccess6() {
        this.isSaving = false;
        var presupuestoArmario = this.presupuestoArmarioTodoLOL;
        var prodCarr = this.productoPresupuesto;
        var m = this.mGuardar;
        var memo = document.getElementsByName('estado');
        var item = JSON.parse(sessionStorage.getItem('seccionPrecios'));
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
                    for (let ve = 0; ve <= 10000500; ve++) {
                        if (ve == 10000500) {
                            if (prodCarr[m][1]['interiores'][x]['luz'] == undefined) {
                                interiores = {
                                    precio: prodCarr[m][1]['interiores'][x]['precio'],
                                    presupuestoArmario: presupuestoArmario,
                                    productosDormitorio: prodCarr[m][1]['interiores'][x],
                                    orden: x
                                };
                            } else {
                                interiores = {
                                    precio: prodCarr[m][1]['interiores'][x]['precio'],
                                    presupuestoArmario: presupuestoArmario,
                                    productosDormitorio: prodCarr[m][1]['interiores'][x],
                                    orden: x,
                                    mensajeLuz: prodCarr[m][1]['interiores'][x]['luz']
                                };
                            }
                            this.subscribeToSaveResponse10(this.presupuestoArmarioInterioresService.create(interiores));
                        }
                    }
                }
                if (prodCarr[m][1]['puertas'] != undefined) {
                    for (let x = 0; x < prodCarr[m][1]['puertas'].length; x++) {
                        var puertas;
                        for (let ve = 0; ve <= 10000500; ve++) {
                            if (ve == 10000500) {
                                puertas = {
                                    precio: prodCarr[m][1]['puertas'][x]['precio'],
                                    presupuestoArmario: presupuestoArmario,
                                    productosDormitorio: prodCarr[m][1]['puertas'][x],
                                    acabados: prodCarr[m][1]['puertas'][x]['acabado' + x],
                                    orden: x
                                };

                                this.subscribeToSaveResponse1(this.presupuestoArmarioPuertasService.create(puertas));
                            }
                        }
                    }
                }

                for (let h = 0; h < data.body.length; h++) {
                    if (h == 0) {
                        var prod = data.body[h];
                    }

                    if (prod['id'] <= data.body[h]['id']) {
                        prod = data.body[h];
                    }
                }
                this.presupuestoPedidoService.query1().subscribe(data => {
                    var id = data.body;
                    sessionStorage.setItem('presupuesto', '' + id);
                    sessionStorage.setItem('vengoDe', 'pruebaaaaaa');
                    $('.modal-backdrop').remove(); //eliminamos el backdrop del modal
                    $('body').removeClass('modal-open'); //eliminamos la clase del body para poder hacer scroll
                    $('#todometerFondo').css({ display: 'none' });
                    this.productosDormitorioService.numeroCesta = 0;
                    for (let i = 1; i <= 100; i++) {
                        sessionStorage.removeItem('prod' + i);
                    }

                    alert('enviado');
                    if (item == 'A') {
                        this.router.navigate(['/presupuesto-producto']);
                    }
                    if (item == 'B') {
                        this.router.navigate(['/presupuesto-precios']);
                    }
                    if (item == 'C') {
                        this.router.navigate(['/presupuesto-puntos']);
                    }
                });
            });
    }

    protected onSaveSuccess4() {
        this.isSaving = false;
        var memo = document.getElementsByName('estado');
        var item = JSON.parse(sessionStorage.getItem('seccionPrecios'));
        var esArmario = 0;
        var prodCarr = this.productoPresupuesto;
        for (let m = 0; m < prodCarr.length; m++) {
            if (prodCarr[m][1]['productosDormitorio']['categoriasDormi']['id'] == 9) {
                esArmario = 1;
            }
        }
        var armario;
        this.presupuestoPedidoService
            .query({
                size: 1000000
            })
            .subscribe((res: HttpResponse<IPresupuestoPedido[]>) => {
                var presupuesto = this.presupuesto;
                var id = localStorage.getItem('ultimoPresupuesto');
                var id1 = parseFloat(id);
                id1 = id1;
                localStorage.setItem('ultimoPresupuesto', JSON.stringify(id1));
                var idDefinitiva;

                var numeroAcaProd = this.acabadosPresupuesto;
                var aux = [];
                var prodAca = [];
                var prodIlu = [];
                var dimensionEspecialBien = [];
                var numeroProductos = this.acaProdPed;
                for (let w = 0; w < res.body.length; w++) {
                    if (aux.length == 0 || aux[0]['id'] < res.body[w]['id']) {
                        aux[0] = res.body[w];
                    }
                }
                var idAux = parseFloat(aux[0]['id']);
                idDefinitiva = idAux;
                const prueba1 = {
                    id: idDefinitiva,
                    codigo: 'PR-' + idDefinitiva,
                    pedido: 0
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
                        prodPrePed = {
                            productosDormitorio: prodCarr[m][1]['productosDormitorio'],
                            presupuestoPedido: prueba1
                        };

                        this.productosPresupuestoPedidos = prodPrePed;
                        this.subscribeToSaveResponse1(this.productosPresupuestoPedidosService.create(this.productosPresupuestoPedidos));
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

                        if (prodCarr[m][1]['niveladores'] == undefined) {
                            var arrayNive = {
                                id: 25000
                            };
                            prodCarr[m][1]['niveladores'] = arrayNive;
                        }
                        if (prodCarr[m][1]['enmarcado'] == undefined) {
                            var arrayEnmar = {
                                id: 25000
                            };
                            prodCarr[m][1]['enmarcado'] = arrayEnmar;
                        }
                        if (prodCarr[m][1]['cajeado'] == undefined) {
                            var arrayCaje = {
                                id: 25000
                            };
                            prodCarr[m][1]['cajeado'] = arrayCaje;
                        }
                        presupuestoArmario = {
                            productosPresupuestoPedidos: prodPrePed,
                            acabadosInterior: prodCarr[m][1]['acabadoInterior'],
                            acabados: prodCarr[m][1]['acabadoTrasera'],
                            acabadosCasco: prodCarr[m][1]['acabadoCasco'],
                            acabadosTirador: prodCarr[m][1]['acabadoTirador'],
                            niveladores: prodCarr[m][1]['niveladores'],
                            enmarcados: prodCarr[m][1]['enmarcado'],
                            cajeado: prodCarr[m][1]['cajeado'],
                            medACaj: 0,
                            medBCaj: 0,
                            medCCaj: 0,
                            medAEnm: 0,
                            medBEnm: 0,
                            medCEnm: 0,
                            armario: armario,
                            precioTotal: prodCarr[m][1]['todoSumadoPrecio'],
                            cascoPrecio: prodCarr[m][1]['precioCasco'],
                            fondo: prodCarr[m][1]['fondo'],
                            alto: prodCarr[m][1]['alto'],
                            ancho: prodCarr[m][1]['ancho']
                        };
                        if (prodCarr[m][1]['enmarcado'] != undefined) {
                            if (prodCarr[m][1]['enmarcado']['codigo'] == 'A') {
                                presupuestoArmario['medAEnm'] = parseFloat(prodCarr[m][1]['enmarcado']['medA']);
                            }
                            if (prodCarr[m][1]['enmarcado']['codigo'] == 'B') {
                                presupuestoArmario['medAEnm'] = parseFloat(prodCarr[m][1]['enmarcado']['medA']);
                            }
                            if (prodCarr[m][1]['enmarcado']['codigo'] == 'C') {
                                presupuestoArmario['medAEnm'] = parseFloat(prodCarr[m][1]['enmarcado']['medA']);
                                presupuestoArmario['medBEnm'] = parseFloat(prodCarr[m][1]['enmarcado']['medB']);
                            }
                            if (prodCarr[m][1]['enmarcado']['codigo'] == 'D') {
                                presupuestoArmario['medAEnm'] = parseFloat(prodCarr[m][1]['enmarcado']['medA']);
                                presupuestoArmario['medBEnm'] = parseFloat(prodCarr[m][1]['enmarcado']['medB']);
                                presupuestoArmario['medCEnm'] = parseFloat(prodCarr[m][1]['enmarcado']['medC']);
                            }
                        }

                        if (prodCarr[m][1]['cajeado'] != undefined) {
                            if (prodCarr[m][1]['cajeado']['tipo'] == 'TIPO A') {
                                presupuestoArmario['medACaj'] = parseFloat(prodCarr[m][1]['cajeado']['medA']);
                                presupuestoArmario['medBCaj'] = parseFloat(prodCarr[m][1]['cajeado']['medB']);
                            }
                            if (prodCarr[m][1]['cajeado']['tipo'] == 'TIPO B') {
                                presupuestoArmario['medACaj'] = parseFloat(prodCarr[m][1]['cajeado']['medA']);
                                presupuestoArmario['medBCaj'] = parseFloat(prodCarr[m][1]['cajeado']['medB']);
                            }
                            if (prodCarr[m][1]['cajeado']['tipo'] == 'TIPO C') {
                                presupuestoArmario['medACaj'] = parseFloat(prodCarr[m][1]['cajeado']['medA']);
                                presupuestoArmario['medBCaj'] = parseFloat(prodCarr[m][1]['cajeado']['medB']);
                                presupuestoArmario['medCCaj'] = parseFloat(prodCarr[m][1]['cajeado']['medC']);
                            }
                            if (prodCarr[m][1]['cajeado']['tipo'] == 'TIPO D') {
                                presupuestoArmario['medACaj'] = parseFloat(prodCarr[m][1]['cajeado']['medA']);
                                presupuestoArmario['medBCaj'] = parseFloat(prodCarr[m][1]['cajeado']['medB']);
                            }
                        }

                        this.presupuestoArmarioTodoLOL = presupuestoArmario;
                        this.mGuardar = m;
                        this.subscribeToSaveResponse6(this.presupuestoArmarioService.create(presupuestoArmario));
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
                                    dimensionesProductoTipo: dimen,
                                    precioTotal: prodCarr[m][1]['todoSumadoPrecio']
                                };
                            } else {
                                prodPrePed = {
                                    productosDormitorio: prodCarr[m][1]['productosDormitorio'],
                                    presupuestoPedido: prueba1,
                                    dimensionesProductoTipo: dimen,
                                    tiposApoyo: prodCarr[m][1]['apoyo'],
                                    precioTotal: prodCarr[m][1]['todoSumadoPrecio']
                                };
                            }
                            if (prodCarr[m][1]['usb'] != undefined) {
                                prodPrePed = {
                                    productosDormitorio: prodCarr[m][1]['productosDormitorio'],
                                    presupuestoPedido: prueba1,
                                    dimensionesProductoTipo: dimen,
                                    tiposApoyo: prodCarr[m][1]['apoyo'],
                                    usb: prodCarr[m][1]['usb'],
                                    precioTotal: prodCarr[m][1]['todoSumadoPrecio']
                                };
                            }
                            if (prodCarr[m][1]['iluminacion'] != undefined) {
                                prodPrePed['iluminacion'] = prodCarr[m][1]['iluminacion'];
                            }
                            numeroAcaProd[m]['prod'] = prodPrePed;
                            prodAca[m] = prodPrePed;
                            prodIlu[m] = prodPrePed;
                            dimensionEspecialBien[m] = prodPrePed;
                            this.productosPresupuestoPedidos = prodPrePed;
                            for (let ve = 0; ve <= 10050000; ve++) {
                                if (ve == 10050000) {
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
                                    for (let ve = 0; ve <= 1000050000; ve++) {
                                        if (ve == 1000050000) {
                                            const acabados1 = {
                                                acabados: numeroAcaProd[m][b],
                                                productosPresupuestoPedidos: prodAca[m],
                                                orden: b + 1
                                            };
                                            this.subscribeToSaveResponse2(this.acabadosProductosPresupuestoPedidoService.create(acabados1));
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
                        } else {
                            prodPrePed = {
                                productosDormitorio: prodCarr[m][1]['apoyo']['productoApoyo'],
                                presupuestoPedido: prueba1,
                                tiposApoyo: prodCarr[m][1]['apoyo'],
                                precioTotal: prodCarr[m][1]['todoSumadoPrecio']
                            };
                            numeroAcaProd[m]['prod'] = prodPrePed;
                            prodAca[m] = prodPrePed;
                            prodIlu[m] = prodPrePed;
                            dimensionEspecialBien[m] = prodPrePed;
                            this.productosPresupuestoPedidos = prodPrePed;
                            for (let ve = 0; ve <= 10050000; ve++) {
                                if (ve == 10050000) {
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
                                    for (let ve = 0; ve <= 1000050000; ve++) {
                                        if (ve == 1000050000) {
                                            const acabados1 = {
                                                acabados: numeroAcaProd[m][b],
                                                productosPresupuestoPedidos: prodAca[m],
                                                orden: b + 1
                                            };
                                            this.subscribeToSaveResponse(this.acabadosProductosPresupuestoPedidoService.create(acabados1));
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (esArmario != 1) {
                    this.presupuestoPedidoService.query1().subscribe(data => {
                        var id = data.body;
                        sessionStorage.setItem('presupuesto', '' + id);
                        sessionStorage.setItem('vengoDe', 'pruebaaaaaa');
                        $('.modal-backdrop').remove(); //eliminamos el backdrop del modal
                        $('body').removeClass('modal-open'); //eliminamos la clase del body para poder hacer scroll
                        $('#todometerFondo').css({ display: 'none' });
                        this.productosDormitorioService.numeroCesta = 0;
                        for (let i = 1; i <= 100; i++) {
                            sessionStorage.removeItem('prod' + i);
                        }

                        if (item == 'A') {
                            this.router.navigate(['/presupuesto-producto']);
                        }
                        if (item == 'B') {
                            this.router.navigate(['/presupuesto-precios']);
                        }
                        if (item == 'C') {
                            this.router.navigate(['/presupuesto-puntos']);
                        }
                    });
                }
            });
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

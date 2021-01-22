import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { JhiEventManager } from 'ng-jhipster';
import * as $ from 'jquery';
import { Observable } from 'rxjs';
import { IDatosUsuario } from 'app/shared/model/datos-usuario.model';
import { ActivatedRoute } from '@angular/router';
import { IContactoFabrica } from 'app/shared/model/contacto-fabrica.model';
import { LoginModalService, AccountService, Account } from 'app/core';
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
import { NavbarComponent } from '../../layouts/navbar/navbar.component';

@Component({
    providers: [NavbarComponent],
    selector: 'jhi-inicio',
    templateUrl: './inicio.component.html'
})
export class inicioComponent implements OnInit, AfterViewInit {
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

    constructor(
        private accountService: AccountService,
        protected ivaProductoTiendaService: IvaProductoTiendaService,
        protected vendedoresService: VendedoresService,
        private loginModalService: LoginModalService,
        protected contactoFabricaService: ContactoFabricaService,
        private eventManager: JhiEventManager,
        protected mensajesService: MensajesService,
        protected precioTiendaService: PrecioTiendaService,
        private loginService: LoginService,
        private router: Router,
        protected navbarComponent: NavbarComponent,
        protected activatedRoute: ActivatedRoute,
        protected pagosTiendaService: PagosTiendaService,
        protected datosUsuarioService: DatosUsuarioService,
        private stateStorageService: StateStorageService
    ) {}

    ngOnInit() {
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        var item = JSON.parse(sessionStorage.getItem('seccionPrecios'));
        this.navbarComponent.presupuestoPedidoService.fecha().subscribe(data => {
            var fecha = data.body[0];
            var hola;
            hola = fecha.toString();
            var fechaPartes = hola.split('/');
            var date2 = new Date(fechaPartes[2] + '-' + fechaPartes[1] + '-' + fechaPartes[0] + 'T03:24:00');
            const week = [];
            const weekFormat = [];

            if (date2.getDay() == 0) {
                //En los casos en que es domingo, restar como si fuera septimo dia y no cero
                date2.setDate(date2.getDate() - 7 + 1);
            } else {
                date2.setDate(date2.getDate() - date2.getDay() + 1);
            }

            for (let i = 0; i < 7; i++) {
                week.push(new Date(date2));
                date2.setDate(date2.getDate() + 1);
            }
            console.log(week[0]);
            let year = week[0].getFullYear();
            let month = (1 + week[0].getMonth()).toString().padStart(2, '0');
            let day = week[0]
                .getDate()
                .toString()
                .padStart(2, '0');
            this.navbarComponent.presupuestoPedidoService.fechaBarraAzul = day + '/' + month + '/' + year;
        });
        $('#modalCambiar1A').css({ 'background-color': 'black' });
        $('#modalCambiar1B').css({ 'background-color': 'black' });
        $('#modalCambiar1C').css({ 'background-color': 'black' });
        $('#modalCambiar1A').css({ color: 'white' });
        $('#modalCambiar1B').css({ color: 'white' });
        $('#modalCambiar1C').css({ color: 'white' });
        $('#modalCambiar1' + item).css({ 'background-color': '#D8E8C6' });
        $('#modalCambiar1' + item).css({ color: 'black' });

        var usuarioContacto = this.accountService.userIdentity;
        var usuarioBuscado;
        var cliente;
        var tiendaUsuario;
        var pagos = [];
        var vendedores = [];
        var dato = 0;
        var contacto = [];
        var mensajes = [];

        this.contactoFabricaService
            .query({
                size: 1000000
            })
            .subscribe(
                (res: HttpResponse<IContactoFabrica[]>) => {
                    for (let w = 0; w < res.body.length; w++) {
                        contacto[w] = res.body[w];
                    }
                    this.mensajesService
                        .query({
                            size: 100000
                        })
                        .subscribe(
                            (res: HttpResponse<IMensajes[]>) => {
                                for (let w = 0; w < res.body.length; w++) {
                                    mensajes[w] = res.body[w];
                                }

                                if (contacto[0] != undefined) {
                                    for (let i = 0; i < contacto.length; i++) {
                                        if (usuarioContacto['firstName'] == 'Administrator') {
                                            for (let j = 0; j < mensajes.length; j++) {
                                                if (mensajes[j]['contactoFabrica']['id'] == contacto[i]['id']) {
                                                    if (mensajes[j]['user']['id'] != usuarioContacto['id']) {
                                                        sessionStorage.setItem('alertaChat', JSON.stringify(contacto[i]));
                                                        $('#textoContactoFabrica').css({ color: 'red' });
                                                    }
                                                }
                                            }
                                        } else {
                                            if (contacto[i]['user']['id'] == usuarioContacto['id']) {
                                                for (let j = 0; j < mensajes.length; j++) {
                                                    if (mensajes[j]['contactoFabrica']['id'] == contacto[i]['id']) {
                                                        if (
                                                            mensajes[j]['user']['id'] != usuarioContacto['id'] &&
                                                            mensajes[j]['fechaVisto'] == null
                                                        ) {
                                                            sessionStorage.setItem('alertaChat', JSON.stringify(contacto[i]));
                                                            $('#textoContactoFabrica').css({ color: 'red' });
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            (res: HttpErrorResponse) => this.onError(res.message)
                        );
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.contacto = contacto;

        this.mensajes = mensajes;
        this.pagosTiendaService
            .query({
                size: 10000000
            })
            .subscribe(
                (res: HttpResponse<IPagosTienda[]>) => {
                    for (let j = 0; j < res.body.length; j++) {
                        pagos[j] = res.body[j];
                    }

                    var authorities = this.accountService.userIdentity.authorities;
                    for (let i = 0; i < authorities.length; i++) {
                        if (authorities[i] != 'ROLE_CLIENTE') {
                            usuarioBuscado = this.accountService.userIdentity;
                        } else {
                            cliente = this.accountService.userIdentity;
                        }
                    }
                    if (authorities[0] != 'ROLE_REPRESENTATE') {
                        if (usuarioBuscado != undefined) {
                            this.datosUsuarioService.findCoger12(usuarioBuscado.id).subscribe(
                                (res: HttpResponse<IDatosUsuario[]>) => {
                                    for (let k = 0; k < res.body.length; k++) {
                                        if (res.body[k]['user'] != null) {
                                            if (res.body[k]['user']['id'] == usuarioBuscado['id']) {
                                                tiendaUsuario = res.body[k];
                                                sessionStorage.setItem('tiendaUsuario', JSON.stringify(tiendaUsuario));
                                                var prueba = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
                                                if (prueba['logo'] != undefined) {
                                                    $('#logoImagen').remove();
                                                    $('.logo-img').append(
                                                        '<img id="logoImagen"  src="data:image/gif;base64,' + prueba['logo'] + '"/>'
                                                    );
                                                    $('.logo-img').css({ background: 'none' });
                                                }
                                            }
                                        }
                                    }
                                    for (let h = 0; h < pagos.length; h++) {
                                        if (pagos[h]['datosUsuario']['id'] == tiendaUsuario['id']) {
                                            sessionStorage.setItem('precioTienda', JSON.stringify(pagos[h]['precioTienda']));
                                            dato = 1;
                                        } else {
                                            if (dato == 0) {
                                                sessionStorage.setItem('precioTienda', JSON.stringify(1));
                                            }
                                        }
                                    }
                                },
                                (res: HttpErrorResponse) => this.onError(res.message)
                            );
                        } else {
                            if (cliente != undefined) {
                                this.datosUsuarioService
                                    .query({
                                        size: 10000000
                                    })
                                    .subscribe(
                                        (res: HttpResponse<IDatosUsuario[]>) => {
                                            for (let k = 0; k < res.body.length; k++) {
                                                for (let d = 0; d < vendedores.length; d++) {
                                                    if (res.body[k]['user'] != null) {
                                                        if (cliente['id'] == vendedores[d]['user']['id']) {
                                                            tiendaUsuario = vendedores[d]['datosUsuario'];
                                                            sessionStorage.setItem('tiendaUsuario', JSON.stringify(tiendaUsuario));
                                                            var prueba = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
                                                            if (prueba['logo'] != undefined) {
                                                                $('#logoImagen').remove();
                                                                $('.logo-img').append(
                                                                    '<img id="logoImagen"  src="data:image/gif;base64,' +
                                                                        prueba['logo'] +
                                                                        '"/>'
                                                                );
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            for (let h = 0; h < pagos.length; h++) {
                                                if (pagos[h]['datosUsuario']['id'] == tiendaUsuario['id']) {
                                                    sessionStorage.setItem('precioTienda', JSON.stringify(pagos[h]['precioTienda']));
                                                    dato = 1;
                                                } else {
                                                    if (dato == 0) {
                                                        sessionStorage.setItem('precioTienda', JSON.stringify(pagos[h]['precioTienda']));
                                                    }
                                                }
                                            }
                                        },
                                        (res: HttpErrorResponse) => this.onError(res.message)
                                    );
                            }
                        }
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );

        this.vendedoresService
            .query({
                size: 10000000
            })
            .subscribe(
                (res: HttpResponse<IVendedores[]>) => {
                    for (let j = 0; j < res.body.length; j++) {
                        vendedores[j] = res.body[j];
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
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

    ngAfterViewInit() {
        var usuarioContacto = this.accountService.userIdentity;
        var contacto = this.contacto;
        var mensajes = this.mensajes;
        var tiendaUsuario = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
        var preciosTiendas;
        this.precioTiendaService
            .query({
                size: 100000
            })
            .subscribe(
                (res: HttpResponse<IPrecioTienda[]>) => {
                    for (let a = 0; a < res.body.length; a++) {
                        if (tiendaUsuario['id'] == res.body[a]['datosUsuario']['id']) {
                            preciosTiendas = res.body[a]['precio'];
                        }
                    }
                    localStorage.setItem('preciosTiendas', JSON.stringify(preciosTiendas));
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        setTimeout(function() {
            var prueba = JSON.parse(sessionStorage.getItem('tiendaUsuario'));

            if (prueba['logo'] != undefined) {
                this.logo = prueba;
                $('#logoImagen').remove();
                $('.logo-img').append('<img id="logoImagen"  src="data:image/gif;base64,' + prueba['logo'] + '"/>');
            }
        }, 10);
        if (contacto[0] != undefined) {
            for (let i = 0; i < contacto.length; i++) {
                if (contacto[i]['firstName'] == 'Administrator') {
                    alert('pito');
                } else {
                    if (contacto[i]['user']['id'] == usuarioContacto['id']) {
                        for (let j = 0; j < mensajes.length; j++) {
                            if (mensajes[j]['contactoFabrica']['id'] == contacto[i]['id']) {
                                if (mensajes[j]['user']['id'] != usuarioContacto['id']) {
                                    $('#textoContactoFabrica').css({ color: 'red' });
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

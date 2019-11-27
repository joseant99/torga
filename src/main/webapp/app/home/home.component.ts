import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { JhiEventManager } from 'ng-jhipster';
import * as $ from 'jquery';
import { Observable } from 'rxjs';

import { LoginModalService, AccountService, Account } from 'app/core';

import { MunicipiosService } from '../entities/municipios/municipios.service';

import { LoginService } from 'app/core/login/login.service';
import { Router } from '@angular/router';
import { StateStorageService } from 'app/core/auth/state-storage.service';
import { ProvinciasService } from '../entities/provincias/provincias.service';
import { DatosUsuarioService } from '../entities/datos-usuario/datos-usuario.service';
import { IMunicipios } from 'app/shared/model/municipios.model';
import { IDatosUsuario } from 'app/shared/model/datos-usuario.model';
import { RepresenTorgaService } from '../entities/represen-torga/represen-torga.service';
import { IRepresenTorga } from 'app/shared/model/represen-torga.model';
import { RepresentanteTiendaService } from '../entities/representante-tienda/representante-tienda.service';
import { IRepresentanteTienda } from 'app/shared/model/representante-tienda.model';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    isSaving: boolean;
    provincias: any;
    municipios: any;
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;

    constructor(
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        protected datosUsuarioService: DatosUsuarioService,
        protected provinciasService: ProvinciasService,
        protected municipiosService: MunicipiosService,
        protected representanteTiendaService: RepresentanteTiendaService,
        protected represenTorgaService: RepresenTorgaService,
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private router: Router,
        private stateStorageService: StateStorageService
    ) {}

    ngOnInit() {
        var municipios = [];
        var provincias = [];
        $('body').attr('id', 'bodyInicio');
        $('#botonEsconder').css({ display: 'none' });
        $('#cestaImagen').css({ display: 'none' });
        $('#menuFijoArriba').attr('style');
        $('#menuFijoArriba').css({ display: 'none' });
        this.accountService.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();

        this.municipiosService.query1({}).subscribe(data => {
            for (let i = 0; i < data['body'].length; i++) {
                municipios[i] = data[i];
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
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.accountService.identity().then(account => {
                $('body').removeAttr('id');
                $('#cestaImagen').removeAttr('style');
                $('#cestaImagen').attr('style');
                $('#cestaImagen').css({ 'max-width': '100%' });
                $('#cestaImagen').css({ right: '50px' });
                $('#botonEsconder').removeAttr('style');
                $('#botonEsconder').attr('style');
                $('#botonEsconder').css({ 'max-width': '100%' });
                $('#menuFijoArriba').removeAttr('style');
                var cont = 0;
                for (let i = 1; i < 20; i++) {
                    if (JSON.parse(sessionStorage.getItem('prod' + i)) != null) {
                        cont++;
                    }
                }
                if (account.authorities.indexOf('ROLE_CLIENTE') >= 0) {
                    this.router.navigate(['/inicio']);
                } else if (account.authorities.indexOf('ROLE_ADMIN') >= 0) {
                    this.router.navigate(['/inicio']);
                } else if (account.authorities.indexOf('ROLE_REPRESENTATE') >= 0) {
                    this.represenTorgaService.findUsu(account.id).subscribe(data => {
                        this.representanteTiendaService.findUsu(data.body[0]['id']).subscribe(data => {
                            this.representanteTiendaService.todos = data.body;
                            this.representanteTiendaService.representante = data.body[0]['represenTorga'];
                        });
                    });

                    this.router.navigate(['/inicio']);
                } else if (account.authorities.indexOf('ROLE_USER') >= 0) {
                    this.router.navigate(['/inicio']);
                } else {
                    this.account = account;
                }
            });
        });
    }
    public iniciarSesion() {
        $('.form').removeAttr('style');
        $('.form1').attr('style');
        $('.form').attr('style');
        $('.form1').css({ display: 'none' });
        $('.form').css({ 'margin-top': '115px' });
    }

    public registro() {
        $('.form1').removeAttr('style');
        $('.form').attr('style');
        $('.form1').attr('style');
        $('.form').css({ display: 'none' });
        $('.form1').css({ 'margin-top': '115px' });
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

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    // login() {
    //     this.modalRef = this.loginModalService.open();
    // }

    register() {
        this.router.navigate(['/register']);
    }

    solicitarClaves() {
        var municipio;
        var provincia;
        var idProv = $('#provincia').val();
        var idMun = $('#municipios').val();
        var nombre = $('#nombre').val();
        var nombreBueno = nombre.toString();
        var telefono = $('#telefono').val();
        var telefonoInt = telefono.toString();
        var comercial = $('#comercial').val();
        var comercialBueno = comercial.toString();
        var email = $('#email').val();
        var emailBueno = email.toString();
        if (idMun != '') {
            for (let i = 0; i < this.municipios.length; i++) {
                if (this.municipios[i]['id'] == idMun) {
                    municipio = this.municipios[i];
                }
            }
        }
        if (idProv != '') {
            for (let h = 0; h < this.provincias.length; h++) {
                if (this.provincias[h]['id'] == idProv) {
                    provincia = this.provincias[h];
                }
            }
        }

        if (idProv != '' && idMun != '' && nombre != '' && telefono != '' && comercial != '' && email != '') {
            const datos: {
                nombreCompleto: string;
                email: string;
                telefono: string;
                nombreComercial: string;
                provincias: object;
                municipios: object;
            } = {
                nombreCompleto: nombreBueno,
                email: emailBueno,
                telefono: telefonoInt,
                nombreComercial: comercialBueno,
                provincias: provincia,
                municipios: municipio
            };
            this.subscribeToSaveResponse(this.datosUsuarioService.create(datos));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDatosUsuario>>) {
        result.subscribe((res: HttpResponse<IDatosUsuario>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }
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
}

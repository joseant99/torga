import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService } from 'ng-jhipster';
import { SessionStorageService } from 'ngx-webstorage';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { VERSION } from 'app/app.constants';
import { JhiLanguageHelper, Account, AccountService, LoginModalService, LoginService } from 'app/core';
import { ProfileService } from '../profiles/profile.service';
import { DatosUsuarioService } from '../../entities/datos-usuario/datos-usuario.service';
import * as $ from 'jquery';
import { AcaProdService } from '../../entities/aca-prod/aca-prod.service';
import { IAcaProd } from 'app/shared/model/aca-prod.model';
import { DimensionesProductoTipoService } from '../../entities/dimensiones-producto-tipo/dimensiones-producto-tipo.service';
import { InterioresService } from '../../entities/interiores/interiores.service';
import { MedidasEspecialesService } from '../../entities/medidas-especiales/medidas-especiales.service';
import { ProductosDormitorioService } from '../../entities/productos-dormitorio/productos-dormitorio.service';

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['navbar.css']
})
export class NavbarComponent implements AfterViewInit, OnInit {
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    acaProdSer: any;
    version: string;
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
        protected acaProdService: AcaProdService,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        protected interioresService: InterioresService,
        protected medidasEspecialesService: MedidasEspecialesService,
        protected jhiAlertService: JhiAlertService,
        private router: Router,
        protected productosDormitorioService: ProductosDormitorioService,
        private eventManager: JhiEventManager
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
    }

    ngAfterViewInit() {
        var productos = [];
        this.productosDormitorioService
            .query({
                size: 1000000
            })
            .subscribe(
                (res: HttpResponse<IProductosDormitorio[]>) => {
                    for (let i = 0; i < res.body.length; i++) {
                        productos[i] = res.body[i];
                    }

                    this.productosDormitorioService.query1({
                        productos
                    });
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        var todasDimensiones = [];
        this.dimensionesProductoTipoService
            .query({
                size: 1000000
            })
            .subscribe(data => {
                for (let k = 0; k < data.body.length; k++) {
                    todasDimensiones[k] = data.body[k];
                }
                this.dimensionesProductoTipoService.query1({
                    todasDimensiones
                });
            });

        setTimeout(function() {
            var prueba = JSON.parse(sessionStorage.getItem('tiendaUsuario'));

            if (prueba['logo'] != undefined) {
                this.logo = prueba;
                $('#logoImagen').remove();
                $('.logo-img').append('<img id="logoImagen"  src="data:image/gif;base64,' + prueba['logo'] + '"/>');
            }
        }, 10);

        var acaProdSer = [];
        this.acaProdService
            .query({
                size: 1000
            })
            .subscribe(data => {
                for (let i = 0; i < data.body.length; i++) {
                    acaProdSer[i] = data.body[i];
                }
                this.acaProdSer = acaProdSer;
                this.acaProdService.query1({
                    acaProdSer
                });
            });

        var interiores = [];
        this.interioresService
            .query({
                size: 100000
            })
            .subscribe(data => {
                for (let i = 0; i < data.body.length; i++) {
                    interiores[i] = data.body[i];
                }
                sessionStorage.setItem('interiores', JSON.stringify(interiores));
            });

        var especiales = [];
        this.medidasEspecialesService
            .query({
                size: 1000000
            })
            .subscribe(data => {
                for (let w = 0; w < data.body.length; w++) {
                    especiales[w] = data.body[w];
                }
                this.medidasEspecialesService.query1({
                    especiales
                });
            });
    }
    ngOnInit() {
        this.languageHelper.getAll().then(languages => {
            this.languages = languages;
        });

        this.profileService.getProfileInfo().then(profileInfo => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });

        this.accountService.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        var cont = 0;
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
            var productos = [];
            this.productosDormitorioService
                .query({
                    size: 1000000
                })
                .subscribe(
                    (res: HttpResponse<IProductosDormitorio[]>) => {
                        for (let i = 0; i < res.body.length; i++) {
                            productos[i] = res.body[i];
                        }

                        this.productosDormitorioService.query1({
                            productos
                        });
                    },
                    (res: HttpErrorResponse) => this.onError(res.message)
                );

            var todasDimensiones = [];
            this.dimensionesProductoTipoService
                .query({
                    size: 1000000
                })
                .subscribe(data => {
                    for (let k = 0; k < data.body.length; k++) {
                        todasDimensiones[k] = data.body[k];
                    }
                    this.dimensionesProductoTipoService.query1({
                        todasDimensiones
                    });
                });

            setTimeout(function() {
                var prueba = JSON.parse(sessionStorage.getItem('tiendaUsuario'));

                if (prueba['logo'] != undefined) {
                    this.logo = prueba;
                    $('#logoImagen').remove();
                    $('.logo-img').append('<img id="logoImagen"  src="data:image/gif;base64,' + prueba['logo'] + '"/>');
                }
            }, 10);

            var acaProdSer = [];
            this.acaProdService
                .query({
                    size: 1000
                })
                .subscribe(data => {
                    for (let i = 0; i < data.body.length; i++) {
                        acaProdSer[i] = data.body[i];
                    }
                    this.acaProdSer = acaProdSer;
                    this.acaProdService.query1({
                        acaProdSer
                    });
                });

            var interiores = [];
            this.interioresService
                .query({
                    size: 100000
                })
                .subscribe(data => {
                    for (let i = 0; i < data.body.length; i++) {
                        interiores[i] = data.body[i];
                    }
                    sessionStorage.setItem('interiores', JSON.stringify(interiores));
                });

            var especiales = [];
            this.medidasEspecialesService
                .query({
                    size: 1000000
                })
                .subscribe(data => {
                    for (let w = 0; w < data.body.length; w++) {
                        especiales[w] = data.body[w];
                    }
                    this.medidasEspecialesService.query1({
                        especiales
                    });
                });
        });
    }
    changeLanguage(languageKey: string) {
        this.sessionStorage.store('locale', languageKey);
        this.languageService.changeLanguage(languageKey);
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

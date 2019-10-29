import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { IDatosUsuario } from 'app/shared/model/datos-usuario.model';

import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/shared';
import { IVendedores } from 'app/shared/model/vendedores.model';
import { AccountService } from 'app/core';
import { Register } from '../../account/register/register.service';
import { ITEMS_PER_PAGE } from 'app/shared';
import { VendedoresService } from './vendedores.service';
import { DatosUsuarioService } from '../datos-usuario/datos-usuario.service';
import { JhiLanguageHelper, User, UserService } from 'app/core';
import { JhiLanguageService } from 'ng-jhipster';

@Component({
    selector: 'jhi-vendedores',
    templateUrl: './vendedores-usuario.component.html'
})
export class VendedoresUsuarioComponent implements OnInit, OnDestroy {
    currentAccount: any;
    vendedores: any;
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    isSaving: boolean;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    authorities: any[];
    page: any;
    tiendas: any;
    doNotMatch: string;
    predicate: any;
    previousPage: any;
    reverse: any;
    registerAccount: any;
    confirmPassword: string;
    errorEmailExists: string;
    errorUserExists: string;
    modalRef: NgbModalRef;

    constructor(
        protected vendedoresService: VendedoresService,
        protected datosUsuarioService: DatosUsuarioService,
        protected parseLinks: JhiParseLinks,
        private userService: UserService,
        private languageService: JhiLanguageService,
        private registerService: Register,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
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

    loadAll() {
        var vendedoresCuenta = [];
        var tiendaBuena = [];
        var contador = 0;
        this.datosUsuarioService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IDatosUsuario[]>) => {
                    var idCuenta = this.currentAccount['id'];

                    for (let i = 0; i < res.body.length; i++) {
                        if (res.body[i]['user'] != null) {
                            if (res.body[i]['user']['id'] == idCuenta) {
                                tiendaBuena[0] = res.body[i];
                            }
                        }
                    }
                    this.tiendas = tiendaBuena[0];
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );

        this.vendedoresService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IVendedores[]>) => {
                    for (let i = 0; i < res.body.length; i++) {
                        if (res.body[i]['user'] != null) {
                            if (res.body[i]['datosUsuario']['id'] == tiendaBuena[0]['id']) {
                                vendedoresCuenta[contador] = res.body[i];
                                contador++;
                            }
                        }
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.vendedores = vendedoresCuenta;
        this.authorities = [];
        this.userService.authorities().subscribe(authorities => {
            this.authorities = authorities;
        });
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/vendedores'], {
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
            '/vendedores',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.success = false;
        this.registerAccount = {};
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInVendedores();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    register() {
        if (this.registerAccount.password !== this.confirmPassword) {
            this.doNotMatch = 'ERROR';
        } else {
            this.doNotMatch = null;
            this.error = null;
            this.errorUserExists = null;
            this.errorEmailExists = null;
            this.registerAccount.langKey = 'es';
            this.registerService.save(this.registerAccount).subscribe(
                () => {
                    this.success = true;
                    $('.form-control-label #password').empty();
                    if (this.success == true) {
                        this.crearUsuTienda();
                    }
                },
                response => this.processError(response)
            );
        }
    }

    public crearUsuTienda() {
        var tienda = this.tiendas;
        var auth = this.authorities;
        var cuentaNueva = this.registerAccount;
        var usuario;
        var vendedores;
        this.userService
            .query({
                size: 1000000
            })
            .subscribe(
                (res: HttpResponse<User[]>) => {
                    for (let i = 0; i < res.body.length; i++) {
                        if (res.body[i]['login'] == cuentaNueva['login'].toLowerCase()) {
                            vendedores = {
                                user: res.body[i],
                                datosUsuario: tienda
                            };
                            this.subscribeToSaveResponse(this.vendedoresService.create(vendedores));
                        }
                    }
                },
                (res: HttpResponse<any>) => this.onError(res.body)
            );
    }
    trackId(index: number, item: IVendedores) {
        return item.id;
    }

    protected subscribeToSaveResponse(result) {}

    registerChangeInVendedores() {
        this.eventSubscriber = this.eventManager.subscribe('vendedoresListModification', response => this.loadAll());
    }
    private processError(response: HttpErrorResponse) {
        this.success = null;
        if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
            this.errorUserExists = 'ERROR';
        } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
            this.errorEmailExists = 'ERROR';
        } else {
            this.error = 'ERROR';
        }
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateVendedores(data: IVendedores[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.vendedores = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
    private onSaveSuccess(result) {
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

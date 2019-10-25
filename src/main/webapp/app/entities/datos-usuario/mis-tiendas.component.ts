import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IDatosUsuario } from 'app/shared/model/datos-usuario.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { DatosUsuarioService } from './datos-usuario.service';
import { RepresentanteTiendaService } from '../representante-tienda/representante-tienda.service';
import { IRepresentanteTienda } from 'app/shared/model/representante-tienda.model';
import { RepresenTorgaService } from '../represen-torga/represen-torga.service';
import { IRepresenTorga } from 'app/shared/model/represen-torga.model';
import { PagosTorgaTiendasService } from '../pagos-torga-tiendas/pagos-torga-tiendas.service';
import { IPagosTorgaTiendas } from 'app/shared/model/pagos-torga-tiendas.model';

@Component({
    selector: 'jhi-datos-usuario',
    templateUrl: './mis-tiendas.component.html'
})
export class MisTiendasComponent implements OnInit, OnDestroy {
    currentAccount: any;
    datosUsuarios: any;
    error: any;
    success: any;
    torga: any;
    grupo: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    tiendas: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        protected datosUsuarioService: DatosUsuarioService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected pagosTorgaTiendasService: PagosTorgaTiendasService,
        protected representanteTiendaService: RepresentanteTiendaService,
        protected represenTorgaService: RepresenTorgaService,
        protected dataUtils: JhiDataUtils,
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
        var tiendas = [];
        if (this.representanteTiendaService.todos == undefined) {
            var account = this.accountService.userIdentity;
            if (account.authorities.indexOf('ROLE_REPRESENTATE') >= 0) {
                this.represenTorgaService.findUsu(account.id).subscribe(data => {
                    this.representanteTiendaService.findUsu(data.body[0]['id']).subscribe(data => {
                        this.representanteTiendaService.todos = data.body;
                        this.representanteTiendaService.representante = data.body[0]['represenTorga'];
                        for (let i = 0; i < data.body['length']; i++) {
                            tiendas[i] = data.body[i]['datosUsuario'];
                        }
                        this.tiendas = tiendas.sort();
                    });
                });
            }
        } else {
            var todos = this.representanteTiendaService.todos;
            for (let i = 0; i < todos.length; i++) {
                tiendas[i] = todos[i]['datosUsuario'];
            }
            this.tiendas = tiendas.sort();
        }
    }
    public cargarTienda() {
        var val = $('#tiendaSelect').val();
        var tiendas = this.tiendas;
        var cont1 = 0;
        for (let i = 0; i < tiendas.length; i++) {
            if (tiendas[i]['id'] == val) {
                this.datosUsuarios = tiendas[i];
            }
        }
        var torga = [];
        var grupo;
        this.pagosTorgaTiendasService
            .query({
                size: 10000000
            })
            .subscribe(
                (res: HttpResponse<IPagosTorgaTiendas[]>) => {
                    for (let j = 0; j < res.body.length; j++) {
                        if (val == res.body[j]['datosUsuario']['id']) {
                            torga[cont1] = res.body[j]['pagosTiendas'];
                            grupo = res.body[j]['grupo'];
                            cont1++;
                        }
                    }
                    this.torga = torga[0];
                    this.grupo = grupo;
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
        this.router.navigate(['/datos-usuario'], {
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
            '/datos-usuario',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDatosUsuarios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDatosUsuario) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInDatosUsuarios() {
        this.eventSubscriber = this.eventManager.subscribe('datosUsuarioListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateDatosUsuarios(data: IDatosUsuario[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.datosUsuarios = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

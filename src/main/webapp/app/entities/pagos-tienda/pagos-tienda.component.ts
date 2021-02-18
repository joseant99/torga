import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IPagosTienda } from 'app/shared/model/pagos-tienda.model';
import { AccountService } from 'app/core';
import { Observable } from 'rxjs';
import { ITEMS_PER_PAGE } from 'app/shared';
import { PagosTiendaService } from './pagos-tienda.service';
import { PresupuestoPedidoService } from '../presupuesto-pedido/presupuesto-pedido.service';
import { DatosUsuarioService } from '../datos-usuario/datos-usuario.service';
@Component({
    selector: 'jhi-pagos-tienda',
    templateUrl: './pagos-tienda.component.html'
})
export class PagosTiendaComponent implements OnInit, OnDestroy {
    currentAccount: any;
    pagosTiendas: IPagosTienda[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    isSaving: any;

    constructor(
        protected pagosTiendaService: PagosTiendaService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        public datosUsuarioService: DatosUsuarioService,
        public presupuestoPedidoService: PresupuestoPedidoService,
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
        this.pagosTiendaService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IPagosTienda[]>) => {
                    this.paginatePagosTiendas(res.body, res.headers);
                    var d = new Date();
                    var month = d.getMonth() + 1;
                    var day = d.getDate();
                    var prueba;
                    var crear = 0;
                    var output = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear();
                    console.log(output);
                    for (let i = 0; i < res.body.length; i++) {
                        if (res.body[i]['fecha'] == output) {
                            crear = 0;
                        } else {
                            crear = 1;
                        }
                    }
                    if (crear == 1) {
                        var meterla = {
                            fecha: output,
                            numero: 0,
                            valoracion: 0
                        };
                        this.subscribeToSaveResponse(this.pagosTiendaService.create(meterla));
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPagosTienda>>) {
        result.subscribe((res: HttpResponse<IPagosTienda>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
    }

    public actualizarNumeros() {
        console.log(this.pagosTiendas);
    }

    protected onSaveError() {
        this.isSaving = false;
    }
    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/pagos-tienda'], {
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
            '/pagos-tienda',
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
        this.registerChangeInPagosTiendas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPagosTienda) {
        return item.id;
    }

    registerChangeInPagosTiendas() {
        this.eventSubscriber = this.eventManager.subscribe('pagosTiendaListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginatePagosTiendas(data: IPagosTienda[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.pagosTiendas = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

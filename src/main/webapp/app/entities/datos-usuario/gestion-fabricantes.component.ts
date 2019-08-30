import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IDatosUsuario } from 'app/shared/model/datos-usuario.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { DatosUsuarioService } from './datos-usuario.service';

@Component({
    selector: 'jhi-gestion-fabricantes',
    templateUrl: './gestion-fabricantes.component.html'
})
export class GestionFabricantesComponent implements OnInit, OnDestroy {
    currentAccount: any;
    datosUsuarios: IDatosUsuario[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    tiendaAdmin: any;
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
        this.datosUsuarioService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IDatosUsuario[]>) => {
                    var idCuenta = this.currentAccount['id'];
                    var tiendaBuena = [];
                    var tiendaBuenaAdmin = [];
                    for (let i = 0; i < res.body.length; i++) {
                        if (res.body[i]['user'] != null) {
                            if (res.body[i]['user']['id'] == idCuenta) {
                                tiendaBuena[0] = res.body[i];
                            }
                            if (res.body[i]['user']['id'] == 3) {
                                tiendaBuenaAdmin[1] = res.body[i];
                            }
                        }
                    }
                    this.tiendaAdmin = tiendaBuenaAdmin[1];
                    this.paginateDatosUsuarios(tiendaBuena, res.headers);
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

    public precioTienda() {
        var precioTienda = $('#precioTienda').val();
        $('#precioTiendaCalculado').val(precioTienda + '%');
    }

    public nuevoPago(id) {
        var pagoTienda = $('#pagoTienda' + id).val();
        var descuento = $('#descuentoTienda' + id).val();
        if (pagoTienda != '' && descuento != '') {
            $('#pagos').append('<br><br>');
            $('#pagos').append(
                '<div style="margin-left:0%" class="form-group row"><label for="pagoComercial" class="col-sm-1 col-form-label">PAGO</label><div class="col-sm-2"><input type="text" style="text-align:center;height:70px" class="form-control" id="pagoTienda' +
                    (id + 1) +
                    '" value="" onchange="nuevoPago(' +
                    (id + 1) +
                    ')"></div><label for="pagoComercial" class="col-sm-4 col-form-label">PUEDE CONLLEVAR UN DESCUENTO MÁXIMO DEL</label><div class="col-sm-2"><input type="text" style="text-align:center;height:70px" class="form-control" id="descuentoTienda' +
                    (id + 1) +
                    '" value="" onchange="nuevoPago(' +
                    (id + 1) +
                    ')"></div></div>'
            );
            var altura = $(document).height();
            $('html, body').animate({ scrollTop: altura + 'px' });
        }
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

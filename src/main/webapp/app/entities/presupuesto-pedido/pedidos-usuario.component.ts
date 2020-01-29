import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IPresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { PresupuestoPedidoService } from './presupuesto-pedido.service';

@Component({
    selector: 'jhi-pedidos-usuario',
    templateUrl: './pedidos-usuario.component.html'
})
export class PedidosUsuarioComponent implements OnInit, OnDestroy {
    currentAccount: any;
    presupuestoPedidos: IPresupuestoPedido[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    tamano: any;
    todos: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        protected presupuestoPedidoService: PresupuestoPedidoService,
        protected parseLinks: JhiParseLinks,
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
        var idUsu = this.accountService['userIdentity']['id'];
        var cogidos = [];
        var contador = 0;
        this.presupuestoPedidoService
            .query({
                page: this.page - 1,
                size: 1000000,
                sort: this.sort()
            })
            .subscribe((res: HttpResponse<IPresupuestoPedido[]>) => {
                $.each(res['body'], function(index, value) {
                    if (value['user']['id'] == parseFloat(idUsu) && value['pedido'] == 1) {
                        cogidos[index] = value;
                        contador++;
                    }
                });
                if (res['body']['0'] != 'undefined') {
                    this.tamano = contador;
                    this.todos = cogidos;
                    this.paginatePresupuestoPedidos(cogidos, res.headers);
                }
                (res: HttpErrorResponse) => this.onError(res.message);
            });
    }

    public cogerIdPresupuesto(id) {
        sessionStorage.setItem('presupuesto', id);
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/presupuesto-usuario'], {
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
            '/presupuesto-usuario',
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
        this.registerChangeInPresupuestoPedidos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPresupuestoPedidos() {
        this.eventSubscriber = this.eventManager.subscribe('presupuestoPedidoListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginatePresupuestoPedidos(data: IPresupuestoPedido[], headers: HttpHeaders) {
        var tamano = headers.get('X-Total-Count');
        tamano = this.tamano;
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(tamano, 10);
        this.queryCount = this.totalItems;
        this.presupuestoPedidos = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IPresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { PresupuestoPedidoService } from './presupuesto-pedido.service';
import { RepresentanteTiendaService } from '../representante-tienda/representante-tienda.service';
import { IRepresentanteTienda } from 'app/shared/model/representante-tienda.model';
import { RepresenTorgaService } from '../represen-torga/represen-torga.service';
import { IRepresenTorga } from 'app/shared/model/represen-torga.model';
@Component({
    selector: 'jhi-presupuesto-usuario',
    templateUrl: './presupuesto-usuario.component.html'
})
export class PresupuestoUsuarioComponent implements OnInit, OnDestroy {
    currentAccount: any;
    presupuestoPedidos: IPresupuestoPedido[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    tamano: any;
    todos: any;
    tiendas: any;
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
        protected represenTorgaService: RepresenTorgaService,
        protected representanteTiendaService: RepresentanteTiendaService,
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
        console.log(sessionStorage);
        var idUsu = this.accountService['userIdentity']['id'];
        var auto = this.accountService['userIdentity']['authorities'][1];
        var cogidos = [];
        var account = this.accountService['userIdentity'];
        var contador = 0;
        var todos = this.representanteTiendaService.todos;
        this.presupuestoPedidoService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe((res: HttpResponse<IPresupuestoPedido[]>) => {
                $.each(res['body'], function(index, value) {
                    if (auto == 'ROLE_ADMIN') {
                        if (value['pedido'] == 0) {
                            cogidos[index] = value;
                            contador++;
                        }
                    } else {
                        if (account.authorities.indexOf('ROLE_REPRESENTATE') >= 0) {
                            for (let k = 0; k < todos.length; k++) {
                                if (todos[k]['datosUsuario']['user']['id'] == value['user']['id'] && value['pedido'] == 0) {
                                    cogidos[index] = value;
                                    contador++;
                                }
                            }
                        } else {
                            if (value['user']['id'] == idUsu && value['pedido'] == 0) {
                                cogidos[index] = value;
                                contador++;
                            }
                        }
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

    public sacarPresupuestos() {
        var val = $('#tiendaSelect').val();
        var presu = [];
        var cont = 0;
        this.presupuestoPedidoService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe((res: HttpResponse<IPresupuestoPedido[]>) => {
                for (let i = 0; i < res.body.length; i++) {
                    if (res.body[i]['user']['id'] == val) {
                        presu[cont] = res.body[i];
                        cont++;
                    }
                }
                this.presupuestoPedidos = presu;
            });
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
        if (this.representanteTiendaService.todos == undefined) {
            var account = this.accountService.userIdentity;
            if (account.authorities.indexOf('ROLE_REPRESENTATE') >= 0) {
                this.represenTorgaService.findUsu(account.id).subscribe(data => {
                    this.representanteTiendaService.findUsu(data.body[0]['id']).subscribe(data => {
                        this.representanteTiendaService.todos = data.body;
                        var tiendas = [];
                        for (let m = 0; m < data.body['length']; m++) {
                            tiendas[m] = data.body[m]['datosUsuario'];
                        }
                        this.tiendas = tiendas;
                        this.representanteTiendaService.representante = data.body[0]['represenTorga'];
                        this.loadAll();
                    });
                });
            } else {
                this.loadAll();
            }
        } else {
            var todos = this.representanteTiendaService.todos;
            var tiendas = [];
            for (let m = 0; m < todos['length']; m++) {
                tiendas[m] = todos[m]['datosUsuario'];
            }
            this.tiendas = tiendas;
            this.loadAll();
        }

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

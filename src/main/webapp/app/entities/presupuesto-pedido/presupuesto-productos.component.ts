import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { Observable } from 'rxjs';

import { IPresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';
import { AccountService } from 'app/core';
import { IProductosPresupuestoPedidos } from 'app/shared/model/productos-presupuesto-pedidos.model';
import { AcabadosProductosPresupuestoPedidoService } from '../acabados-productos-presupuesto-pedido/acabados-productos-presupuesto-pedido.service';

import { ITEMS_PER_PAGE } from 'app/shared';
import { PresupuestoPedidoService } from './presupuesto-pedido.service';
import { ProductosPresupuestoPedidosService } from '../productos-presupuesto-pedidos/productos-presupuesto-pedidos.service';

@Component({
    selector: 'jhi-presupuesto-productos',
    templateUrl: './presupuesto-productos.component.html'
})
export class PresupuestoProductosComponent implements OnInit, OnDestroy, AfterViewInit {
    currentAccount: any;
    productosPresupuestoPedidos: any;
    error: any;
    isSaving: boolean;
    success: any;
    presupuestoPedidos: IPresupuestoPedido[];
    eventSubscriber: Subscription;
    productos: any;
    acabados: any;
    routeData: any;
    presupuestos = [];
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        protected productosPresupuestoPedidosService: ProductosPresupuestoPedidosService,
        protected presupuestoPedidoService: PresupuestoPedidoService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected acabadosProductosPresupuestoPedidoService: AcabadosProductosPresupuestoPedidoService,
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

    public imprimir() {
        var divToPrint = document.getElementById('imprimir');
        var newWin = window.open('');
        newWin.document.write(divToPrint.outerHTML);
        newWin.print();
        newWin.close();
    }

    public eliminar() {
        var id = parseFloat(sessionStorage.getItem('presupuesto'));
        this.presupuestoPedidoService.delete(id).subscribe();
        var actualizar;
        var todosPresupuestos = this.presupuestos;
        for (let i = 0; i < todosPresupuestos.length; i++) {
            if (todosPresupuestos[i]['presupuestoPedido'] != null) {
                if (todosPresupuestos[i]['presupuestoPedido']['id'] == sessionStorage.getItem('presupuesto')) {
                    actualizar = todosPresupuestos[i];
                    this.productosPresupuestoPedidosService.delete(actualizar['id']).subscribe();
                }
            }
        }
    }

    public pedido() {
        console.log(this.presupuestos);
        var actualizar;
        var todosPresupuestos = this.presupuestos;
        for (let i = 0; i < todosPresupuestos.length; i++) {
            if (todosPresupuestos[i]['presupuestoPedido'] != null) {
                if (todosPresupuestos[i]['presupuestoPedido']['id'] == sessionStorage.getItem('presupuesto')) {
                    actualizar = todosPresupuestos[i];
                }
            }
        }
        var d = new Date();

        var month = d.getMonth() + 1;
        var day = d.getDate();

        var output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;

        actualizar['presupuestoPedido']['pedido'] = 1;
        actualizar['presupuestoPedido']['fecha_pedido'] = output;
        var presupuestoActualizado = actualizar['presupuestoPedido'];
        console.log(actualizar);
        console.log(presupuestoActualizado);

        this.subscribeToSaveResponse(this.presupuestoPedidoService.update(presupuestoActualizado));
        this.subscribeToSaveResponse1(this.productosPresupuestoPedidosService.update(actualizar));
    }
    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPresupuestoPedido>>) {
        result.subscribe((res: HttpResponse<IPresupuestoPedido>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }
    protected subscribeToSaveResponse1(result: Observable<HttpResponse<IProductosPresupuestoPedidos>>) {
        result.subscribe(
            (res: HttpResponse<IProductosPresupuestoPedidos>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    ngAfterViewInit() {}
    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }
    previousState() {
        window.history.back();
    }
    protected onSaveError() {
        this.isSaving = false;
    }
    loadAll() {
        var productosPresupuesto = [];
        var acabados = [];
        var cont = 0;
        var presu = sessionStorage.getItem('presupuesto');
        this.productosPresupuestoPedidosService
            .query({
                size: 1000000
            })
            .subscribe(
                (res: HttpResponse<IProductosPresupuestoPedidos[]>) => {
                    for (let i = 0; i < res.body.length; i++) {
                        if (res.body[i]['presupuestoPedido'] != null) {
                            if (parseFloat(presu) == res.body[i]['presupuestoPedido']['id']) {
                                productosPresupuesto[cont] = res.body[i];
                                cont++;
                            }
                        }
                    }

                    this.paginateProductosPresupuestoPedidos(productosPresupuesto, res.headers);
                    this.productos = productosPresupuesto;

                    var productos = this.productos;
                    var acabados = this.acabados;
                    var apoyo;
                    setTimeout(function() {
                        if (productos != undefined && acabados != []) {
                            for (let i = 0; i < productos.length; i++) {
                                var contador = 1;
                                apoyo = undefined;
                                for (let k = 0; k < acabados.length; k++) {
                                    if (productos[i]['id'] == acabados[k]['productosPresupuestoPedidos']['id']) {
                                        $('.' + productos[i]['id']).append(
                                            '<p>Acabado ' + contador + '&nbsp;&nbsp;&nbsp; ' + acabados[k]['acabados']['nombre'] + '</p>'
                                        );
                                        if (contador == 1 && acabados[k]['productosPresupuestoPedidos']['tiposApoyo'] != undefined) {
                                            apoyo = acabados[k];
                                        }

                                        contador++;
                                    }
                                }
                                if (apoyo != undefined) {
                                    $('.' + productos[i]['id']).append(
                                        '<p>' +
                                            apoyo['productosPresupuestoPedidos']['tiposApoyo']['productoApoyo']['nombre'] +
                                            '&nbsp;&nbsp;&nbsp; ' +
                                            apoyo['productosPresupuestoPedidos']['tiposApoyo']['precio'] +
                                            '&euro;</p>'
                                    );
                                    var precioTotal = $('.' + productos[i]['id'] + ' #precioTotal').text();
                                    var precioFloat = parseFloat(precioTotal);
                                    precioFloat = precioFloat + apoyo['productosPresupuestoPedidos']['tiposApoyo']['precio'];
                                    $('.' + productos[i]['id'] + ' #precioTotal').text(precioFloat);
                                }
                            }
                        }
                    }, 100);
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        console.log(this.paginateProductosPresupuestoPedidos);
        this.acabadosProductosPresupuestoPedidoService
            .query({
                size: 1000000
            })
            .subscribe(data => {
                $.each(data['body'], function(index, value) {
                    acabados[index] = value;
                });
            });
        this.acabados = acabados;
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/productos-presupuesto-pedidos'], {
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
            '/productos-presupuesto-pedidos',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        var presupuestos = [];
        var acabados = [];
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProductosPresupuestoPedidos();

        this.productosPresupuestoPedidosService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                $.each(data['body'], function(index, value) {
                    presupuestos[index] = value;
                });
            });
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProductosPresupuestoPedidos) {
        return item.id;
    }

    registerChangeInProductosPresupuestoPedidos() {
        this.eventSubscriber = this.eventManager.subscribe('productosPresupuestoPedidosListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateProductosPresupuestoPedidos(data: IProductosPresupuestoPedidos[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.productosPresupuestoPedidos = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

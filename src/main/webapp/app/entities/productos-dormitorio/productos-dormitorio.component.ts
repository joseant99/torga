import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { AccountService } from 'app/core';
import { ICategoriasDormi } from 'app/shared/model/categorias-dormi.model';

import { ITEMS_PER_PAGE } from 'app/shared';
import { ProductosDormitorioService } from './productos-dormitorio.service';
import { CategoriasDormiService } from '../categorias-dormi/categorias-dormi.service';

@Component({
    selector: 'jhi-productos-dormitorio',
    templateUrl: './productos-dormitorio.component.html'
})
export class ProductosDormitorioComponent implements OnInit, OnDestroy {
    currentAccount: any;
    productosDormitorios: IProductosDormitorio[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    productosFiltro: any;
    categorias: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        protected productosDormitorioService: ProductosDormitorioService,
        protected categoriasDormiService: CategoriasDormiService,
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
        this.productosDormitorioService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IProductosDormitorio[]>) => this.paginateProductosDormitorios(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );

        this.categoriasDormiService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<ICategoriasDormi[]>) => {
                    this.categorias = res.body;
                    console.log(this.categorias);
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
    public filtroCategorias() {
        var valor;
        valor = $('#filtroCategoriasSelect').val();
        if (valor == 'todas') {
            $('#filtroCategorias').empty();
            $('#filtroCategorias').attr('style');
            $('#filtroCategorias').css({ display: 'none' });
            $('#filtro').removeAttr('style');
        } else {
            $('#filtro').attr('style');
            $('#filtro').css({ display: 'none' });
            $('#filtroCategorias').empty();
            $('#filtroCategorias').removeAttr('style');
            this.productosDormitorioService
                .query({
                    size: 100000
                })
                .subscribe(
                    (res: HttpResponse<IProductosDormitorio[]>) => {
                        for (let i = 0; i < res.body.length; i++) {
                            if (res.body[i]['categoriasDormiId'] == valor) {
                                $('#filtroCategorias').append(
                                    '<tr><td><a [routerLink]="["/productos-dormitorio", ' +
                                        res.body[i]['id'] +
                                        ', "view" ]">' +
                                        res.body[i]['id'] +
                                        '</a></td><td>' +
                                        res.body[i]['nombre'] +
                                        '</td></tr>'
                                );
                            }
                        }
                    },
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
        }
    }
    transition() {
        this.router.navigate(['/productos-dormitorio'], {
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
            '/productos-dormitorio',
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
        this.registerChangeInProductosDormitorios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProductosDormitorio) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInProductosDormitorios() {
        this.eventSubscriber = this.eventManager.subscribe('productosDormitorioListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateProductosDormitorios(data: IProductosDormitorio[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.productosDormitorios = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

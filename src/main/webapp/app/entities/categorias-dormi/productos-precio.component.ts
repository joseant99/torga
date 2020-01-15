import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ICategoriasDormi } from 'app/shared/model/categorias-dormi.model';
import { AccountService } from 'app/core';
import { Observable } from 'rxjs';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { IPrecioTiendaProductos } from 'app/shared/model/precio-tienda-productos.model';

import { ITEMS_PER_PAGE } from 'app/shared';
import { CategoriasDormiService } from './categorias-dormi.service';
import { ProductosDormitorioService } from '../productos-dormitorio/productos-dormitorio.service';
import { PrecioTiendaProductosService } from '../precio-tienda-productos/precio-tienda-productos.service';
import { IvaProductoTiendaService } from '../iva-producto-tienda/iva-producto-tienda.service';

@Component({
    selector: 'jhi-categorias-dormi',
    templateUrl: './productos-precio.component.html'
})
export class ProductosPrecioComponent implements OnInit, OnDestroy {
    currentAccount: any;
    categoriasDormis: ICategoriasDormi[];
    categoriasDormiPrueba: ICategoriasDormi;
    error: any;
    success: any;
    comedores: any;
    dormitorio: any;
    isSaving: boolean;
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
    iva: any;

    constructor(
        protected categoriasDormiService: CategoriasDormiService,
        protected ivaProductoTiendaService: IvaProductoTiendaService,
        protected parseLinks: JhiParseLinks,
        protected precioTiendaProductosService: PrecioTiendaProductosService,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        public productosDormitorioService: ProductosDormitorioService,
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
        this.productosDormitorioService.todos = undefined;
        this.categoriasDormiService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe((res: HttpResponse<ICategoriasDormi[]>) => {
                var comedores = [];
                var contComedores = 0;
                var dormitorio = [];
                var contDormitorio = 0;
                for (let i = 0; i < res.body.length; i++) {
                    if (res.body[i]['id'] == 8 || (res.body[i]['id'] >= 11 && res.body[i]['id'] <= 22)) {
                        comedores[contComedores] = res.body[i];
                        contComedores++;
                    } else {
                        dormitorio[contDormitorio] = res.body[i];
                        contDormitorio++;
                    }
                }
                this.comedores = comedores;
                this.dormitorio = dormitorio;
                (res: HttpErrorResponse) => this.onError(res.message);
            });
        this.iva = 'no';
    }

    public productosCategoria(id) {
        var tienda = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
        this.productosDormitorioService.categoria(id).subscribe(data => {
            var productos = data.body;
            this.precioTiendaProductosService.findProdId(id, tienda.id).subscribe(data => {
                this.precioTiendaProductosService.todos = data.body;
                if (data.body['length'] != 0) {
                    for (let i = 0; i < productos['length']; i++) {
                        if (data.body[i][2] == productos[i]['id']) {
                            productos[i]['porcentaje'] = data.body[i][1];
                        }
                    }
                    this.productosDormitorioService.todos = productos;
                } else {
                    this.productosDormitorioService.todos = productos;
                }
            });
        });
    }
    public mostrarIva() {
        $('#ivaDiv').removeAttr('class');
        var tienda = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
        this.ivaProductoTiendaService.bus(tienda['id']).subscribe(data => {
            console.log(data.body);
            if (data.body[0] != null) {
                if (data.body[0]['iva'] == 1) {
                    $('#ivaSi').css({ 'background-color': 'gray' });
                } else {
                    $('#ivaNo').css({ 'background-color': 'gray' });
                }
            }
        });
    }
    public todasCategorias() {
        var porcen = $('#porcentajeTotal').val();
        var productos = this.productosDormitorioService.todos;
        var precioProd;
        for (let i = 0; i < productos.length; i++) {
            precioProd = $('#porcentaje' + i).val();
            if (precioProd == '') {
                $('#porcentaje' + i).val(porcen);
            }
        }
    }
    public guardarIva(id) {
        $('#iva' + id).css({ 'background-color': 'gray' });
        var tienda = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
        if (id == 'Si') {
            $('#ivaNo').css({ 'background-color': 'white' });
            this.ivaProductoTiendaService.bus(tienda['id']).subscribe(data => {
                if (data.body[0] != null) {
                    if (data.body[0]['iva'] == 0) {
                        data.body[0]['iva'] = null;
                        data.body[0]['iva'] = 1;
                        this.subscribeToSaveResponse(this.ivaProductoTiendaService.update(data.body[0]));
                    }
                } else {
                    var ivaProductoTienda = {
                        datosUsuario: tienda,
                        iva: 1
                    };
                    this.subscribeToSaveResponse(this.ivaProductoTiendaService.create(ivaProductoTienda));
                }
            });
        } else {
            $('#ivaSi').css({ 'background-color': 'white' });
            this.ivaProductoTiendaService.bus(tienda['id']).subscribe(data => {
                if (data.body[0] != null) {
                    if (data.body[0]['iva'] == 1) {
                        var dato = {
                            id: data.body[0]['id'],
                            datosUsuario: data.body[0]['datosUsuario'],
                            iva: 0
                        };
                        this.subscribeToSaveResponse(this.ivaProductoTiendaService.update(dato));
                    }
                }
            });
        }
    }

    public guardar() {
        var precioProd;
        var tienda = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
        var productos = this.productosDormitorioService.todos;
        for (let i = 0; i < productos.length; i++) {
            var clase = $('#porcentaje' + i).attr('class');
            if (clase == '') {
                precioProd = $('#porcentaje' + i).val();
                const precio = {
                    porcentaje: precioProd,
                    productosDormitorio: productos[i],
                    datosUsuario: tienda
                };
                this.subscribeToSaveResponse(this.precioTiendaProductosService.create(precio));
            } else {
                var todos = this.precioTiendaProductosService.todos;
                precioProd = $('#porcentaje' + i).val();
                precioProd = parseFloat(precioProd);
                if (precioProd != parseFloat(clase)) {
                    for (let u = 0; u < todos.length; u++) {
                        if (todos[u][2] == productos[i]['id']) {
                            todos[u][1] = precioProd;
                            const bueno = {
                                id: todos[u][0],
                                porcentaje: todos[u][1],
                                productosDormitorio: productos[i],
                                datosUsuario: tienda
                            };
                            this.subscribeToSaveResponse(this.precioTiendaProductosService.update(bueno));
                        }
                    }
                }
            }
        }
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/categorias-dormi'], {
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
            '/categorias-dormi',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        localStorage.setItem('prueba', JSON.stringify('hola'));
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCategoriasDormis();
    }

    ngOnDestroy() {
        this.productosDormitorioService.todos = undefined;
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICategoriasDormi) {
        return item.id;
    }

    registerChangeInCategoriasDormis() {
        this.eventSubscriber = this.eventManager.subscribe('categoriasDormiListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrecioTiendaProductos>>) {
        result.subscribe(
            (res: HttpResponse<IPrecioTiendaProductos>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    protected onSaveSuccess() {
        this.isSaving = false;
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

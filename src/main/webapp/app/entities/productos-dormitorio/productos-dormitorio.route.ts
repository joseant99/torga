import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { ProductosDormitorioService } from './productos-dormitorio.service';
import { ProductosDormitorioComponent } from './productos-dormitorio.component';
import { ProductosDormitorioDetailComponent } from './productos-dormitorio-detail.component';
import { ProductosDormitorioCategoriaComponent } from './productos-dormitorio-categoria.component';
import { ProductosDormitorioChinfonierComponent } from './productos-dormitorio-chinfonier.component';
import { ProductosDormitorioCabecerosComponent } from './productos-dormitorio-cabeceros.component';
import { ProductosDormitorioApoyoComponent } from './productos-dormitorio-apoyo.component';
import { ProductosDormitorioCanapeComponent } from './productos-dormitorio-canape.component';
import { ProductosModulosBajosComponent } from './productos-modulos-bajos.component';
import { ProductosDormitorioUpdateComponent } from './productos-dormitorio-update.component';
import { ProductosDormitorioDeletePopupComponent } from './productos-dormitorio-delete-dialog.component';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';

@Injectable({ providedIn: 'root' })
export class ProductosDormitorioResolve implements Resolve<IProductosDormitorio> {
    constructor(private service: ProductosDormitorioService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductosDormitorio> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ProductosDormitorio>) => response.ok),
                map((productosDormitorio: HttpResponse<ProductosDormitorio>) => productosDormitorio.body)
            );
        }
        return of(new ProductosDormitorio());
    }
}

export const productosDormitorioRoute: Routes = [
    {
        path: 'productos-dormitorio',
        component: ProductosDormitorioComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-modulos-bajos',
        component: ProductosModulosBajosComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-dormitorio/categoria/:id',
        component: ProductosDormitorioCategoriaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-dormitorio/apoyo',
        component: ProductosDormitorioApoyoComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-dormitorio/canape',
        component: ProductosDormitorioCanapeComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-dormitorio/chinfonier',
        component: ProductosDormitorioChinfonierComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-dormitorio/cabeceros',
        component: ProductosDormitorioCabecerosComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-dormitorio/:id/view',
        component: ProductosDormitorioDetailComponent,
        resolve: {
            productosDormitorio: ProductosDormitorioResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE'],
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-dormitorio/new',
        component: ProductosDormitorioUpdateComponent,
        resolve: {
            productosDormitorio: ProductosDormitorioResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE'],
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-dormitorio/:id/edit',
        component: ProductosDormitorioUpdateComponent,
        resolve: {
            productosDormitorio: ProductosDormitorioResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE'],
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productosDormitorioPopupRoute: Routes = [
    {
        path: 'productos-dormitorio/:id/delete',
        component: ProductosDormitorioDeletePopupComponent,
        resolve: {
            productosDormitorio: ProductosDormitorioResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE'],
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

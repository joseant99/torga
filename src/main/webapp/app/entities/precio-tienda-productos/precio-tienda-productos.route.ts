import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PrecioTiendaProductos } from 'app/shared/model/precio-tienda-productos.model';
import { PrecioTiendaProductosService } from './precio-tienda-productos.service';
import { PrecioTiendaProductosComponent } from './precio-tienda-productos.component';
import { PrecioTiendaProductosDetailComponent } from './precio-tienda-productos-detail.component';
import { PrecioTiendaProductosUpdateComponent } from './precio-tienda-productos-update.component';
import { PrecioTiendaProductosDeletePopupComponent } from './precio-tienda-productos-delete-dialog.component';
import { IPrecioTiendaProductos } from 'app/shared/model/precio-tienda-productos.model';

@Injectable({ providedIn: 'root' })
export class PrecioTiendaProductosResolve implements Resolve<IPrecioTiendaProductos> {
    constructor(private service: PrecioTiendaProductosService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PrecioTiendaProductos> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PrecioTiendaProductos>) => response.ok),
                map((precioTiendaProductos: HttpResponse<PrecioTiendaProductos>) => precioTiendaProductos.body)
            );
        }
        return of(new PrecioTiendaProductos());
    }
}

export const precioTiendaProductosRoute: Routes = [
    {
        path: 'precio-tienda-productos',
        component: PrecioTiendaProductosComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.precioTiendaProductos.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'precio-tienda-productos/:id/view',
        component: PrecioTiendaProductosDetailComponent,
        resolve: {
            precioTiendaProductos: PrecioTiendaProductosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.precioTiendaProductos.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'precio-tienda-productos/new',
        component: PrecioTiendaProductosUpdateComponent,
        resolve: {
            precioTiendaProductos: PrecioTiendaProductosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.precioTiendaProductos.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'precio-tienda-productos/:id/edit',
        component: PrecioTiendaProductosUpdateComponent,
        resolve: {
            precioTiendaProductos: PrecioTiendaProductosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.precioTiendaProductos.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const precioTiendaProductosPopupRoute: Routes = [
    {
        path: 'precio-tienda-productos/:id/delete',
        component: PrecioTiendaProductosDeletePopupComponent,
        resolve: {
            precioTiendaProductos: PrecioTiendaProductosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.precioTiendaProductos.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

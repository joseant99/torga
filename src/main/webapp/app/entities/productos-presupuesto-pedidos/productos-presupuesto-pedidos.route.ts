import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProductosPresupuestoPedidos } from 'app/shared/model/productos-presupuesto-pedidos.model';
import { ProductosPresupuestoPedidosService } from './productos-presupuesto-pedidos.service';
import { ProductosPresupuestoPedidosComponent } from './productos-presupuesto-pedidos.component';
import { ProductosPresupuestoPedidosDetailComponent } from './productos-presupuesto-pedidos-detail.component';
import { ProductosPresupuestoPedidosUpdateComponent } from './productos-presupuesto-pedidos-update.component';
import { ProductosPresupuestoPedidosDeletePopupComponent } from './productos-presupuesto-pedidos-delete-dialog.component';
import { IProductosPresupuestoPedidos } from 'app/shared/model/productos-presupuesto-pedidos.model';

@Injectable({ providedIn: 'root' })
export class ProductosPresupuestoPedidosResolve implements Resolve<IProductosPresupuestoPedidos> {
    constructor(private service: ProductosPresupuestoPedidosService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductosPresupuestoPedidos> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ProductosPresupuestoPedidos>) => response.ok),
                map((productosPresupuestoPedidos: HttpResponse<ProductosPresupuestoPedidos>) => productosPresupuestoPedidos.body)
            );
        }
        return of(new ProductosPresupuestoPedidos());
    }
}

export const productosPresupuestoPedidosRoute: Routes = [
    {
        path: 'productos-presupuesto-pedidos',
        component: ProductosPresupuestoPedidosComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosPresupuestoPedidos.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-presupuesto-pedidos/:id/view',
        component: ProductosPresupuestoPedidosDetailComponent,
        resolve: {
            productosPresupuestoPedidos: ProductosPresupuestoPedidosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.productosPresupuestoPedidos.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-presupuesto-pedidos/new',
        component: ProductosPresupuestoPedidosUpdateComponent,
        resolve: {
            productosPresupuestoPedidos: ProductosPresupuestoPedidosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.productosPresupuestoPedidos.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-presupuesto-pedidos/:id/edit',
        component: ProductosPresupuestoPedidosUpdateComponent,
        resolve: {
            productosPresupuestoPedidos: ProductosPresupuestoPedidosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.productosPresupuestoPedidos.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productosPresupuestoPedidosPopupRoute: Routes = [
    {
        path: 'productos-presupuesto-pedidos/:id/delete',
        component: ProductosPresupuestoPedidosDeletePopupComponent,
        resolve: {
            productosPresupuestoPedidos: ProductosPresupuestoPedidosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.productosPresupuestoPedidos.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

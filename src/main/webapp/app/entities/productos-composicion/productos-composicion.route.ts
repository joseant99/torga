import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProductosComposicion } from 'app/shared/model/productos-composicion.model';
import { ProductosComposicionService } from './productos-composicion.service';
import { ProductosComposicionComponent } from './productos-composicion.component';
import { ProductosComposicionDetailComponent } from './productos-composicion-detail.component';
import { ProductosComposicionUpdateComponent } from './productos-composicion-update.component';
import { ProductosComposicionDeletePopupComponent } from './productos-composicion-delete-dialog.component';
import { IProductosComposicion } from 'app/shared/model/productos-composicion.model';

@Injectable({ providedIn: 'root' })
export class ProductosComposicionResolve implements Resolve<IProductosComposicion> {
    constructor(private service: ProductosComposicionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductosComposicion> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ProductosComposicion>) => response.ok),
                map((productosComposicion: HttpResponse<ProductosComposicion>) => productosComposicion.body)
            );
        }
        return of(new ProductosComposicion());
    }
}

export const productosComposicionRoute: Routes = [
    {
        path: 'productos-composicion',
        component: ProductosComposicionComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosComposicion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-composicion/:id/view',
        component: ProductosComposicionDetailComponent,
        resolve: {
            productosComposicion: ProductosComposicionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.productosComposicion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-composicion/new',
        component: ProductosComposicionUpdateComponent,
        resolve: {
            productosComposicion: ProductosComposicionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.productosComposicion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-composicion/:id/edit',
        component: ProductosComposicionUpdateComponent,
        resolve: {
            productosComposicion: ProductosComposicionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.productosComposicion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productosComposicionPopupRoute: Routes = [
    {
        path: 'productos-composicion/:id/delete',
        component: ProductosComposicionDeletePopupComponent,
        resolve: {
            productosComposicion: ProductosComposicionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.productosComposicion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

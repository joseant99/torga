import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DimensionesProducto } from 'app/shared/model/dimensiones-producto.model';
import { DimensionesProductoService } from './dimensiones-producto.service';
import { DimensionesProductoComponent } from './dimensiones-producto.component';
import { DimensionesProductoDetailComponent } from './dimensiones-producto-detail.component';
import { DimensionesProductoUpdateComponent } from './dimensiones-producto-update.component';
import { DimensionesProductoDeletePopupComponent } from './dimensiones-producto-delete-dialog.component';
import { IDimensionesProducto } from 'app/shared/model/dimensiones-producto.model';

@Injectable({ providedIn: 'root' })
export class DimensionesProductoResolve implements Resolve<IDimensionesProducto> {
    constructor(private service: DimensionesProductoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DimensionesProducto> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DimensionesProducto>) => response.ok),
                map((dimensionesProducto: HttpResponse<DimensionesProducto>) => dimensionesProducto.body)
            );
        }
        return of(new DimensionesProducto());
    }
}

export const dimensionesProductoRoute: Routes = [
    {
        path: 'dimensiones-producto',
        component: DimensionesProductoComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.dimensionesProducto.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dimensiones-producto/:id/view',
        component: DimensionesProductoDetailComponent,
        resolve: {
            dimensionesProducto: DimensionesProductoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.dimensionesProducto.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dimensiones-producto/new',
        component: DimensionesProductoUpdateComponent,
        resolve: {
            dimensionesProducto: DimensionesProductoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.dimensionesProducto.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dimensiones-producto/:id/edit',
        component: DimensionesProductoUpdateComponent,
        resolve: {
            dimensionesProducto: DimensionesProductoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.dimensionesProducto.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dimensionesProductoPopupRoute: Routes = [
    {
        path: 'dimensiones-producto/:id/delete',
        component: DimensionesProductoDeletePopupComponent,
        resolve: {
            dimensionesProducto: DimensionesProductoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.dimensionesProducto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

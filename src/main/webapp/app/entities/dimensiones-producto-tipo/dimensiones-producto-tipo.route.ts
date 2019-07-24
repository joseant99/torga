import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DimensionesProductoTipo } from 'app/shared/model/dimensiones-producto-tipo.model';
import { DimensionesProductoTipoService } from './dimensiones-producto-tipo.service';
import { DimensionesProductoTipoComponent } from './dimensiones-producto-tipo.component';
import { DimensionesProductoTipoDetailComponent } from './dimensiones-producto-tipo-detail.component';
import { DimensionesProductoTipoUpdateComponent } from './dimensiones-producto-tipo-update.component';
import { DimensionesProductoTipoDeletePopupComponent } from './dimensiones-producto-tipo-delete-dialog.component';
import { IDimensionesProductoTipo } from 'app/shared/model/dimensiones-producto-tipo.model';

@Injectable({ providedIn: 'root' })
export class DimensionesProductoTipoResolve implements Resolve<IDimensionesProductoTipo> {
    constructor(private service: DimensionesProductoTipoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DimensionesProductoTipo> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DimensionesProductoTipo>) => response.ok),
                map((dimensionesProductoTipo: HttpResponse<DimensionesProductoTipo>) => dimensionesProductoTipo.body)
            );
        }
        return of(new DimensionesProductoTipo());
    }
}

export const dimensionesProductoTipoRoute: Routes = [
    {
        path: 'dimensiones-producto-tipo',
        component: DimensionesProductoTipoComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.dimensionesProductoTipo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dimensiones-producto-tipo/:id/view',
        component: DimensionesProductoTipoDetailComponent,
        resolve: {
            dimensionesProductoTipo: DimensionesProductoTipoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.dimensionesProductoTipo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dimensiones-producto-tipo/new',
        component: DimensionesProductoTipoUpdateComponent,
        resolve: {
            dimensionesProductoTipo: DimensionesProductoTipoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.dimensionesProductoTipo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dimensiones-producto-tipo/:id/edit',
        component: DimensionesProductoTipoUpdateComponent,
        resolve: {
            dimensionesProductoTipo: DimensionesProductoTipoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.dimensionesProductoTipo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dimensionesProductoTipoPopupRoute: Routes = [
    {
        path: 'dimensiones-producto-tipo/:id/delete',
        component: DimensionesProductoTipoDeletePopupComponent,
        resolve: {
            dimensionesProductoTipo: DimensionesProductoTipoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.dimensionesProductoTipo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

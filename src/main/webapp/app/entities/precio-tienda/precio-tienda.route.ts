import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PrecioTienda } from 'app/shared/model/precio-tienda.model';
import { PrecioTiendaService } from './precio-tienda.service';
import { PrecioTiendaComponent } from './precio-tienda.component';
import { PrecioTiendaDetailComponent } from './precio-tienda-detail.component';
import { PrecioTiendaUpdateComponent } from './precio-tienda-update.component';
import { PrecioTiendaDeletePopupComponent } from './precio-tienda-delete-dialog.component';
import { IPrecioTienda } from 'app/shared/model/precio-tienda.model';

@Injectable({ providedIn: 'root' })
export class PrecioTiendaResolve implements Resolve<IPrecioTienda> {
    constructor(private service: PrecioTiendaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PrecioTienda> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PrecioTienda>) => response.ok),
                map((precioTienda: HttpResponse<PrecioTienda>) => precioTienda.body)
            );
        }
        return of(new PrecioTienda());
    }
}

export const precioTiendaRoute: Routes = [
    {
        path: 'precio-tienda',
        component: PrecioTiendaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.precioTienda.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'precio-tienda/:id/view',
        component: PrecioTiendaDetailComponent,
        resolve: {
            precioTienda: PrecioTiendaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.precioTienda.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'precio-tienda/new',
        component: PrecioTiendaUpdateComponent,
        resolve: {
            precioTienda: PrecioTiendaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.precioTienda.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'precio-tienda/:id/edit',
        component: PrecioTiendaUpdateComponent,
        resolve: {
            precioTienda: PrecioTiendaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.precioTienda.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const precioTiendaPopupRoute: Routes = [
    {
        path: 'precio-tienda/:id/delete',
        component: PrecioTiendaDeletePopupComponent,
        resolve: {
            precioTienda: PrecioTiendaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.precioTienda.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

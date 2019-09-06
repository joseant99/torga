import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PagosTorgaTiendas } from 'app/shared/model/pagos-torga-tiendas.model';
import { PagosTorgaTiendasService } from './pagos-torga-tiendas.service';
import { PagosTorgaTiendasComponent } from './pagos-torga-tiendas.component';
import { PagosTorgaTiendasDetailComponent } from './pagos-torga-tiendas-detail.component';
import { PagosTorgaTiendasUpdateComponent } from './pagos-torga-tiendas-update.component';
import { PagosTorgaTiendasDeletePopupComponent } from './pagos-torga-tiendas-delete-dialog.component';
import { IPagosTorgaTiendas } from 'app/shared/model/pagos-torga-tiendas.model';

@Injectable({ providedIn: 'root' })
export class PagosTorgaTiendasResolve implements Resolve<IPagosTorgaTiendas> {
    constructor(private service: PagosTorgaTiendasService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PagosTorgaTiendas> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PagosTorgaTiendas>) => response.ok),
                map((pagosTorgaTiendas: HttpResponse<PagosTorgaTiendas>) => pagosTorgaTiendas.body)
            );
        }
        return of(new PagosTorgaTiendas());
    }
}

export const pagosTorgaTiendasRoute: Routes = [
    {
        path: 'pagos-torga-tiendas',
        component: PagosTorgaTiendasComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.pagosTorgaTiendas.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pagos-torga-tiendas/:id/view',
        component: PagosTorgaTiendasDetailComponent,
        resolve: {
            pagosTorgaTiendas: PagosTorgaTiendasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.pagosTorgaTiendas.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pagos-torga-tiendas/new',
        component: PagosTorgaTiendasUpdateComponent,
        resolve: {
            pagosTorgaTiendas: PagosTorgaTiendasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.pagosTorgaTiendas.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pagos-torga-tiendas/:id/edit',
        component: PagosTorgaTiendasUpdateComponent,
        resolve: {
            pagosTorgaTiendas: PagosTorgaTiendasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.pagosTorgaTiendas.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pagosTorgaTiendasPopupRoute: Routes = [
    {
        path: 'pagos-torga-tiendas/:id/delete',
        component: PagosTorgaTiendasDeletePopupComponent,
        resolve: {
            pagosTorgaTiendas: PagosTorgaTiendasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.pagosTorgaTiendas.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

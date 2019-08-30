import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PagosTienda } from 'app/shared/model/pagos-tienda.model';
import { PagosTiendaService } from './pagos-tienda.service';
import { PagosTiendaComponent } from './pagos-tienda.component';
import { PagosTiendaDetailComponent } from './pagos-tienda-detail.component';
import { PagosTiendaUpdateComponent } from './pagos-tienda-update.component';
import { PagosTiendaDeletePopupComponent } from './pagos-tienda-delete-dialog.component';
import { IPagosTienda } from 'app/shared/model/pagos-tienda.model';

@Injectable({ providedIn: 'root' })
export class PagosTiendaResolve implements Resolve<IPagosTienda> {
    constructor(private service: PagosTiendaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PagosTienda> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PagosTienda>) => response.ok),
                map((pagosTienda: HttpResponse<PagosTienda>) => pagosTienda.body)
            );
        }
        return of(new PagosTienda());
    }
}

export const pagosTiendaRoute: Routes = [
    {
        path: 'pagos-tienda',
        component: PagosTiendaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.pagosTienda.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pagos-tienda/:id/view',
        component: PagosTiendaDetailComponent,
        resolve: {
            pagosTienda: PagosTiendaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.pagosTienda.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pagos-tienda/new',
        component: PagosTiendaUpdateComponent,
        resolve: {
            pagosTienda: PagosTiendaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.pagosTienda.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pagos-tienda/:id/edit',
        component: PagosTiendaUpdateComponent,
        resolve: {
            pagosTienda: PagosTiendaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.pagosTienda.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pagosTiendaPopupRoute: Routes = [
    {
        path: 'pagos-tienda/:id/delete',
        component: PagosTiendaDeletePopupComponent,
        resolve: {
            pagosTienda: PagosTiendaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.pagosTienda.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RepresentanteTienda } from 'app/shared/model/representante-tienda.model';
import { RepresentanteTiendaService } from './representante-tienda.service';
import { RepresentanteTiendaComponent } from './representante-tienda.component';
import { RepresentanteTiendaDetailComponent } from './representante-tienda-detail.component';
import { RepresentanteTiendaUpdateComponent } from './representante-tienda-update.component';
import { RepresentanteTiendaDeletePopupComponent } from './representante-tienda-delete-dialog.component';
import { IRepresentanteTienda } from 'app/shared/model/representante-tienda.model';

@Injectable({ providedIn: 'root' })
export class RepresentanteTiendaResolve implements Resolve<IRepresentanteTienda> {
    constructor(private service: RepresentanteTiendaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RepresentanteTienda> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<RepresentanteTienda>) => response.ok),
                map((representanteTienda: HttpResponse<RepresentanteTienda>) => representanteTienda.body)
            );
        }
        return of(new RepresentanteTienda());
    }
}

export const representanteTiendaRoute: Routes = [
    {
        path: 'representante-tienda',
        component: RepresentanteTiendaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.representanteTienda.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'representante-tienda/:id/view',
        component: RepresentanteTiendaDetailComponent,
        resolve: {
            representanteTienda: RepresentanteTiendaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.representanteTienda.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'representante-tienda/new',
        component: RepresentanteTiendaUpdateComponent,
        resolve: {
            representanteTienda: RepresentanteTiendaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.representanteTienda.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'representante-tienda/:id/edit',
        component: RepresentanteTiendaUpdateComponent,
        resolve: {
            representanteTienda: RepresentanteTiendaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.representanteTienda.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const representanteTiendaPopupRoute: Routes = [
    {
        path: 'representante-tienda/:id/delete',
        component: RepresentanteTiendaDeletePopupComponent,
        resolve: {
            representanteTienda: RepresentanteTiendaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.representanteTienda.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

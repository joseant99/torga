import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Fecha_entrega } from 'app/shared/model/fecha-entrega.model';
import { Fecha_entregaService } from './fecha-entrega.service';
import { Fecha_entregaComponent } from './fecha-entrega.component';
import { Fecha_entregaDetailComponent } from './fecha-entrega-detail.component';
import { Fecha_entregaUpdateComponent } from './fecha-entrega-update.component';
import { Fecha_entregaDeletePopupComponent } from './fecha-entrega-delete-dialog.component';
import { IFecha_entrega } from 'app/shared/model/fecha-entrega.model';

@Injectable({ providedIn: 'root' })
export class Fecha_entregaResolve implements Resolve<IFecha_entrega> {
    constructor(private service: Fecha_entregaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Fecha_entrega> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Fecha_entrega>) => response.ok),
                map((fecha_entrega: HttpResponse<Fecha_entrega>) => fecha_entrega.body)
            );
        }
        return of(new Fecha_entrega());
    }
}

export const fecha_entregaRoute: Routes = [
    {
        path: 'fecha-entrega',
        component: Fecha_entregaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.fecha_entrega.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fecha-entrega/:id/view',
        component: Fecha_entregaDetailComponent,
        resolve: {
            fecha_entrega: Fecha_entregaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.fecha_entrega.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fecha-entrega/new',
        component: Fecha_entregaUpdateComponent,
        resolve: {
            fecha_entrega: Fecha_entregaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.fecha_entrega.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fecha-entrega/:id/edit',
        component: Fecha_entregaUpdateComponent,
        resolve: {
            fecha_entrega: Fecha_entregaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.fecha_entrega.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fecha_entregaPopupRoute: Routes = [
    {
        path: 'fecha-entrega/:id/delete',
        component: Fecha_entregaDeletePopupComponent,
        resolve: {
            fecha_entrega: Fecha_entregaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.fecha_entrega.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

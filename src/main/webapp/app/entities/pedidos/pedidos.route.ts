import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Pedidos } from 'app/shared/model/pedidos.model';
import { PedidosService } from './pedidos.service';
import { PedidosComponent } from './pedidos.component';
import { PedidosDetailComponent } from './pedidos-detail.component';
import { PedidosUpdateComponent } from './pedidos-update.component';
import { PedidosDeletePopupComponent } from './pedidos-delete-dialog.component';
import { IPedidos } from 'app/shared/model/pedidos.model';

@Injectable({ providedIn: 'root' })
export class PedidosResolve implements Resolve<IPedidos> {
    constructor(private service: PedidosService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Pedidos> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Pedidos>) => response.ok),
                map((pedidos: HttpResponse<Pedidos>) => pedidos.body)
            );
        }
        return of(new Pedidos());
    }
}

export const pedidosRoute: Routes = [
    {
        path: 'pedidos',
        component: PedidosComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.pedidos.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pedidos/:id/view',
        component: PedidosDetailComponent,
        resolve: {
            pedidos: PedidosResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'torgaPedidosApp.pedidos.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pedidos/new',
        component: PedidosUpdateComponent,
        resolve: {
            pedidos: PedidosResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'torgaPedidosApp.pedidos.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pedidos/:id/edit',
        component: PedidosUpdateComponent,
        resolve: {
            pedidos: PedidosResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'torgaPedidosApp.pedidos.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pedidosPopupRoute: Routes = [
    {
        path: 'pedidos/:id/delete',
        component: PedidosDeletePopupComponent,
        resolve: {
            pedidos: PedidosResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'torgaPedidosApp.pedidos.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

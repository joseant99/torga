import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';
import { PresupuestoPedidoService } from './presupuesto-pedido.service';
import { PresupuestoPedidoComponent } from './presupuesto-pedido.component';
import { PresupuestoPedidoDetailComponent } from './presupuesto-pedido-detail.component';
import { PresupuestoPedidoUpdateComponent } from './presupuesto-pedido-update.component';
import { PresupuestoUsuarioComponent } from './presupuesto-usuario.component';
import { PresupuestoProductosComponent } from './presupuesto-productos.component';
import { PedidosProductosComponent } from './pedidos-productos.component';
import { PedidosFabricaComponent } from './pedidos-fabrica.component';
import { PresupuestoEdicionComponent } from './presupuesto-edicion.component';
import { PedidosUsuarioComponent } from './pedidos-usuario.component';
import { PresupuestoPedidoDeletePopupComponent } from './presupuesto-pedido-delete-dialog.component';
import { IPresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';

@Injectable({ providedIn: 'root' })
export class PresupuestoPedidoResolve implements Resolve<IPresupuestoPedido> {
    constructor(private service: PresupuestoPedidoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PresupuestoPedido> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PresupuestoPedido>) => response.ok),
                map((presupuestoPedido: HttpResponse<PresupuestoPedido>) => presupuestoPedido.body)
            );
        }
        return of(new PresupuestoPedido());
    }
}

export const presupuestoPedidoRoute: Routes = [
    {
        path: 'presupuesto-pedido',
        component: PresupuestoPedidoComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.presupuestoPedido.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'presupuesto-usuario',
        component: PresupuestoUsuarioComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_REPRESENTATE', 'ROLE_CLIENTE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.presupuestoPedido.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'presupuesto-edicion',
        component: PresupuestoEdicionComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_REPRESENTATE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.presupuestoPedido.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pedidos-usuario',
        component: PedidosUsuarioComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_REPRESENTATE', 'ROLE_CLIENTE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.presupuestoPedido.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'presupuesto-producto',
        component: PresupuestoProductosComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_REPRESENTATE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.presupuestoPedido.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pedidos-producto',
        component: PedidosProductosComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_REPRESENTATE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.presupuestoPedido.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pedidos-fabrica',
        component: PedidosFabricaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_REPRESENTATE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.presupuestoPedido.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'presupuesto-pedido/:id/view',
        component: PresupuestoPedidoDetailComponent,
        resolve: {
            presupuestoPedido: PresupuestoPedidoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.presupuestoPedido.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'presupuesto-pedido/new',
        component: PresupuestoPedidoUpdateComponent,
        resolve: {
            presupuestoPedido: PresupuestoPedidoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.presupuestoPedido.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'presupuesto-pedido/:id/edit',
        component: PresupuestoPedidoUpdateComponent,
        resolve: {
            presupuestoPedido: PresupuestoPedidoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.presupuestoPedido.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const presupuestoPedidoPopupRoute: Routes = [
    {
        path: 'presupuesto-pedido/:id/delete',
        component: PresupuestoPedidoDeletePopupComponent,
        resolve: {
            presupuestoPedido: PresupuestoPedidoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.presupuestoPedido.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

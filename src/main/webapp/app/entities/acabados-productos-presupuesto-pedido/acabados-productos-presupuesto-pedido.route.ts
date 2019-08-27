import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AcabadosProductosPresupuestoPedido } from 'app/shared/model/acabados-productos-presupuesto-pedido.model';
import { AcabadosProductosPresupuestoPedidoService } from './acabados-productos-presupuesto-pedido.service';
import { AcabadosProductosPresupuestoPedidoComponent } from './acabados-productos-presupuesto-pedido.component';
import { AcabadosProductosPresupuestoPedidoDetailComponent } from './acabados-productos-presupuesto-pedido-detail.component';
import { AcabadosProductosPresupuestoPedidoUpdateComponent } from './acabados-productos-presupuesto-pedido-update.component';
import { AcabadosProductosPresupuestoPedidoDeletePopupComponent } from './acabados-productos-presupuesto-pedido-delete-dialog.component';
import { IAcabadosProductosPresupuestoPedido } from 'app/shared/model/acabados-productos-presupuesto-pedido.model';

@Injectable({ providedIn: 'root' })
export class AcabadosProductosPresupuestoPedidoResolve implements Resolve<IAcabadosProductosPresupuestoPedido> {
    constructor(private service: AcabadosProductosPresupuestoPedidoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AcabadosProductosPresupuestoPedido> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<AcabadosProductosPresupuestoPedido>) => response.ok),
                map(
                    (acabadosProductosPresupuestoPedido: HttpResponse<AcabadosProductosPresupuestoPedido>) =>
                        acabadosProductosPresupuestoPedido.body
                )
            );
        }
        return of(new AcabadosProductosPresupuestoPedido());
    }
}

export const acabadosProductosPresupuestoPedidoRoute: Routes = [
    {
        path: 'acabados-productos-presupuesto-pedido',
        component: AcabadosProductosPresupuestoPedidoComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.acabadosProductosPresupuestoPedido.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'acabados-productos-presupuesto-pedido/:id/view',
        component: AcabadosProductosPresupuestoPedidoDetailComponent,
        resolve: {
            acabadosProductosPresupuestoPedido: AcabadosProductosPresupuestoPedidoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.acabadosProductosPresupuestoPedido.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'acabados-productos-presupuesto-pedido/new',
        component: AcabadosProductosPresupuestoPedidoUpdateComponent,
        resolve: {
            acabadosProductosPresupuestoPedido: AcabadosProductosPresupuestoPedidoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.acabadosProductosPresupuestoPedido.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'acabados-productos-presupuesto-pedido/:id/edit',
        component: AcabadosProductosPresupuestoPedidoUpdateComponent,
        resolve: {
            acabadosProductosPresupuestoPedido: AcabadosProductosPresupuestoPedidoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.acabadosProductosPresupuestoPedido.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const acabadosProductosPresupuestoPedidoPopupRoute: Routes = [
    {
        path: 'acabados-productos-presupuesto-pedido/:id/delete',
        component: AcabadosProductosPresupuestoPedidoDeletePopupComponent,
        resolve: {
            acabadosProductosPresupuestoPedido: AcabadosProductosPresupuestoPedidoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.acabadosProductosPresupuestoPedido.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

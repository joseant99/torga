import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MedEspProductoPedidoPresu } from 'app/shared/model/med-esp-producto-pedido-presu.model';
import { MedEspProductoPedidoPresuService } from './med-esp-producto-pedido-presu.service';
import { MedEspProductoPedidoPresuComponent } from './med-esp-producto-pedido-presu.component';
import { MedEspProductoPedidoPresuDetailComponent } from './med-esp-producto-pedido-presu-detail.component';
import { MedEspProductoPedidoPresuUpdateComponent } from './med-esp-producto-pedido-presu-update.component';
import { MedEspProductoPedidoPresuDeletePopupComponent } from './med-esp-producto-pedido-presu-delete-dialog.component';
import { IMedEspProductoPedidoPresu } from 'app/shared/model/med-esp-producto-pedido-presu.model';

@Injectable({ providedIn: 'root' })
export class MedEspProductoPedidoPresuResolve implements Resolve<IMedEspProductoPedidoPresu> {
    constructor(private service: MedEspProductoPedidoPresuService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MedEspProductoPedidoPresu> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MedEspProductoPedidoPresu>) => response.ok),
                map((medEspProductoPedidoPresu: HttpResponse<MedEspProductoPedidoPresu>) => medEspProductoPedidoPresu.body)
            );
        }
        return of(new MedEspProductoPedidoPresu());
    }
}

export const medEspProductoPedidoPresuRoute: Routes = [
    {
        path: 'med-esp-producto-pedido-presu',
        component: MedEspProductoPedidoPresuComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.medEspProductoPedidoPresu.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'med-esp-producto-pedido-presu/:id/view',
        component: MedEspProductoPedidoPresuDetailComponent,
        resolve: {
            medEspProductoPedidoPresu: MedEspProductoPedidoPresuResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.medEspProductoPedidoPresu.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'med-esp-producto-pedido-presu/new',
        component: MedEspProductoPedidoPresuUpdateComponent,
        resolve: {
            medEspProductoPedidoPresu: MedEspProductoPedidoPresuResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.medEspProductoPedidoPresu.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'med-esp-producto-pedido-presu/:id/edit',
        component: MedEspProductoPedidoPresuUpdateComponent,
        resolve: {
            medEspProductoPedidoPresu: MedEspProductoPedidoPresuResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.medEspProductoPedidoPresu.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const medEspProductoPedidoPresuPopupRoute: Routes = [
    {
        path: 'med-esp-producto-pedido-presu/:id/delete',
        component: MedEspProductoPedidoPresuDeletePopupComponent,
        resolve: {
            medEspProductoPedidoPresu: MedEspProductoPedidoPresuResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.medEspProductoPedidoPresu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

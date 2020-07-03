import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RepreGCompra } from 'app/shared/model/repre-g-compra.model';
import { RepreGCompraService } from './repre-g-compra.service';
import { RepreGCompraComponent } from './repre-g-compra.component';
import { RepreGCompraDetailComponent } from './repre-g-compra-detail.component';
import { RepreGCompraUpdateComponent } from './repre-g-compra-update.component';
import { RepreGCompraDeletePopupComponent } from './repre-g-compra-delete-dialog.component';
import { IRepreGCompra } from 'app/shared/model/repre-g-compra.model';

@Injectable({ providedIn: 'root' })
export class RepreGCompraResolve implements Resolve<IRepreGCompra> {
    constructor(private service: RepreGCompraService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RepreGCompra> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<RepreGCompra>) => response.ok),
                map((repreGCompra: HttpResponse<RepreGCompra>) => repreGCompra.body)
            );
        }
        return of(new RepreGCompra());
    }
}

export const repreGCompraRoute: Routes = [
    {
        path: 'repre-g-compra',
        component: RepreGCompraComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.repreGCompra.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'repre-g-compra/:id/view',
        component: RepreGCompraDetailComponent,
        resolve: {
            repreGCompra: RepreGCompraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.repreGCompra.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'repre-g-compra/new',
        component: RepreGCompraUpdateComponent,
        resolve: {
            repreGCompra: RepreGCompraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.repreGCompra.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'repre-g-compra/:id/edit',
        component: RepreGCompraUpdateComponent,
        resolve: {
            repreGCompra: RepreGCompraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.repreGCompra.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const repreGCompraPopupRoute: Routes = [
    {
        path: 'repre-g-compra/:id/delete',
        component: RepreGCompraDeletePopupComponent,
        resolve: {
            repreGCompra: RepreGCompraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.repreGCompra.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

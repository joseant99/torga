import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Acabados_Productos } from 'app/shared/model/acabados-productos.model';
import { Acabados_ProductosService } from './acabados-productos.service';
import { Acabados_ProductosComponent } from './acabados-productos.component';
import { Acabados_ProductosDetailComponent } from './acabados-productos-detail.component';
import { Acabados_ProductosUpdateComponent } from './acabados-productos-update.component';
import { Acabados_ProductosDeletePopupComponent } from './acabados-productos-delete-dialog.component';
import { IAcabados_Productos } from 'app/shared/model/acabados-productos.model';

@Injectable({ providedIn: 'root' })
export class Acabados_ProductosResolve implements Resolve<IAcabados_Productos> {
    constructor(private service: Acabados_ProductosService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Acabados_Productos> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Acabados_Productos>) => response.ok),
                map((acabados_Productos: HttpResponse<Acabados_Productos>) => acabados_Productos.body)
            );
        }
        return of(new Acabados_Productos());
    }
}

export const acabados_ProductosRoute: Routes = [
    {
        path: 'acabados-productos',
        component: Acabados_ProductosComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.acabados_Productos.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'acabados-productos/:id/view',
        component: Acabados_ProductosDetailComponent,
        resolve: {
            acabados_Productos: Acabados_ProductosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.acabados_Productos.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'acabados-productos/new',
        component: Acabados_ProductosUpdateComponent,
        resolve: {
            acabados_Productos: Acabados_ProductosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.acabados_Productos.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'acabados-productos/:id/edit',
        component: Acabados_ProductosUpdateComponent,
        resolve: {
            acabados_Productos: Acabados_ProductosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.acabados_Productos.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const acabados_ProductosPopupRoute: Routes = [
    {
        path: 'acabados-productos/:id/delete',
        component: Acabados_ProductosDeletePopupComponent,
        resolve: {
            acabados_Productos: Acabados_ProductosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.acabados_Productos.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

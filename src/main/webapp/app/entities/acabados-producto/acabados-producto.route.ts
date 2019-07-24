import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AcabadosProducto } from 'app/shared/model/acabados-producto.model';
import { AcabadosProductoService } from './acabados-producto.service';
import { AcabadosProductoComponent } from './acabados-producto.component';
import { AcabadosProductoDetailComponent } from './acabados-producto-detail.component';
import { AcabadosProductoUpdateComponent } from './acabados-producto-update.component';
import { AcabadosProductoDeletePopupComponent } from './acabados-producto-delete-dialog.component';
import { IAcabadosProducto } from 'app/shared/model/acabados-producto.model';

@Injectable({ providedIn: 'root' })
export class AcabadosProductoResolve implements Resolve<IAcabadosProducto> {
    constructor(private service: AcabadosProductoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AcabadosProducto> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<AcabadosProducto>) => response.ok),
                map((acabadosProducto: HttpResponse<AcabadosProducto>) => acabadosProducto.body)
            );
        }
        return of(new AcabadosProducto());
    }
}

export const acabadosProductoRoute: Routes = [
    {
        path: 'acabados-producto',
        component: AcabadosProductoComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.acabadosProducto.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'acabados-producto/:id/view',
        component: AcabadosProductoDetailComponent,
        resolve: {
            acabadosProducto: AcabadosProductoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.acabadosProducto.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'acabados-producto/new',
        component: AcabadosProductoUpdateComponent,
        resolve: {
            acabadosProducto: AcabadosProductoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.acabadosProducto.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'acabados-producto/:id/edit',
        component: AcabadosProductoUpdateComponent,
        resolve: {
            acabadosProducto: AcabadosProductoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.acabadosProducto.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const acabadosProductoPopupRoute: Routes = [
    {
        path: 'acabados-producto/:id/delete',
        component: AcabadosProductoDeletePopupComponent,
        resolve: {
            acabadosProducto: AcabadosProductoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.acabadosProducto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

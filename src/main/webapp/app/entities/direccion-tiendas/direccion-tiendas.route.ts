import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DireccionTiendas } from 'app/shared/model/direccion-tiendas.model';
import { DireccionTiendasService } from './direccion-tiendas.service';
import { DireccionTiendasComponent } from './direccion-tiendas.component';
import { DireccionTiendasUsuComponent } from './direccion-tiendas-usu.component';
import { DireccionTiendasDetailComponent } from './direccion-tiendas-detail.component';
import { DireccionTiendasUpdateComponent } from './direccion-tiendas-update.component';
import { DireccionTiendasDeletePopupComponent } from './direccion-tiendas-delete-dialog.component';
import { IDireccionTiendas } from 'app/shared/model/direccion-tiendas.model';

@Injectable({ providedIn: 'root' })
export class DireccionTiendasResolve implements Resolve<IDireccionTiendas> {
    constructor(private service: DireccionTiendasService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DireccionTiendas> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DireccionTiendas>) => response.ok),
                map((direccionTiendas: HttpResponse<DireccionTiendas>) => direccionTiendas.body)
            );
        }
        return of(new DireccionTiendas());
    }
}

export const direccionTiendasRoute: Routes = [
    {
        path: 'direccion-tiendas',
        component: DireccionTiendasComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.direccionTiendas.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'direccion-tiendas-usu',
        component: DireccionTiendasUsuComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.direccionTiendas.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'direccion-tiendas/:id/view',
        component: DireccionTiendasDetailComponent,
        resolve: {
            direccionTiendas: DireccionTiendasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.direccionTiendas.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'direccion-tiendas/new',
        component: DireccionTiendasUpdateComponent,
        resolve: {
            direccionTiendas: DireccionTiendasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.direccionTiendas.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'direccion-tiendas/:id/edit',
        component: DireccionTiendasUpdateComponent,
        resolve: {
            direccionTiendas: DireccionTiendasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.direccionTiendas.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const direccionTiendasPopupRoute: Routes = [
    {
        path: 'direccion-tiendas/:id/delete',
        component: DireccionTiendasDeletePopupComponent,
        resolve: {
            direccionTiendas: DireccionTiendasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.direccionTiendas.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

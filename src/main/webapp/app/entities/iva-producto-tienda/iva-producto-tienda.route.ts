import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IvaProductoTienda } from 'app/shared/model/iva-producto-tienda.model';
import { IvaProductoTiendaService } from './iva-producto-tienda.service';
import { IvaProductoTiendaComponent } from './iva-producto-tienda.component';
import { IvaProductoTiendaDetailComponent } from './iva-producto-tienda-detail.component';
import { IvaProductoTiendaUpdateComponent } from './iva-producto-tienda-update.component';
import { IvaProductoTiendaDeletePopupComponent } from './iva-producto-tienda-delete-dialog.component';
import { IIvaProductoTienda } from 'app/shared/model/iva-producto-tienda.model';

@Injectable({ providedIn: 'root' })
export class IvaProductoTiendaResolve implements Resolve<IIvaProductoTienda> {
    constructor(private service: IvaProductoTiendaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IvaProductoTienda> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<IvaProductoTienda>) => response.ok),
                map((ivaProductoTienda: HttpResponse<IvaProductoTienda>) => ivaProductoTienda.body)
            );
        }
        return of(new IvaProductoTienda());
    }
}

export const ivaProductoTiendaRoute: Routes = [
    {
        path: 'iva-producto-tienda',
        component: IvaProductoTiendaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.ivaProductoTienda.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'iva-producto-tienda/:id/view',
        component: IvaProductoTiendaDetailComponent,
        resolve: {
            ivaProductoTienda: IvaProductoTiendaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.ivaProductoTienda.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'iva-producto-tienda/new',
        component: IvaProductoTiendaUpdateComponent,
        resolve: {
            ivaProductoTienda: IvaProductoTiendaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.ivaProductoTienda.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'iva-producto-tienda/:id/edit',
        component: IvaProductoTiendaUpdateComponent,
        resolve: {
            ivaProductoTienda: IvaProductoTiendaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.ivaProductoTienda.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ivaProductoTiendaPopupRoute: Routes = [
    {
        path: 'iva-producto-tienda/:id/delete',
        component: IvaProductoTiendaDeletePopupComponent,
        resolve: {
            ivaProductoTienda: IvaProductoTiendaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.ivaProductoTienda.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

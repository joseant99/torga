import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PuertasPrecios } from 'app/shared/model/puertas-precios.model';
import { PuertasPreciosService } from './puertas-precios.service';
import { PuertasPreciosComponent } from './puertas-precios.component';
import { PuertasPreciosDetailComponent } from './puertas-precios-detail.component';
import { PuertasPreciosUpdateComponent } from './puertas-precios-update.component';
import { PuertasPreciosDeletePopupComponent } from './puertas-precios-delete-dialog.component';
import { IPuertasPrecios } from 'app/shared/model/puertas-precios.model';

@Injectable({ providedIn: 'root' })
export class PuertasPreciosResolve implements Resolve<IPuertasPrecios> {
    constructor(private service: PuertasPreciosService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PuertasPrecios> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PuertasPrecios>) => response.ok),
                map((puertasPrecios: HttpResponse<PuertasPrecios>) => puertasPrecios.body)
            );
        }
        return of(new PuertasPrecios());
    }
}

export const puertasPreciosRoute: Routes = [
    {
        path: 'puertas-precios',
        component: PuertasPreciosComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.puertasPrecios.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'puertas-precios/:id/view',
        component: PuertasPreciosDetailComponent,
        resolve: {
            puertasPrecios: PuertasPreciosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.puertasPrecios.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'puertas-precios/new',
        component: PuertasPreciosUpdateComponent,
        resolve: {
            puertasPrecios: PuertasPreciosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.puertasPrecios.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'puertas-precios/:id/edit',
        component: PuertasPreciosUpdateComponent,
        resolve: {
            puertasPrecios: PuertasPreciosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.puertasPrecios.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const puertasPreciosPopupRoute: Routes = [
    {
        path: 'puertas-precios/:id/delete',
        component: PuertasPreciosDeletePopupComponent,
        resolve: {
            puertasPrecios: PuertasPreciosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.puertasPrecios.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

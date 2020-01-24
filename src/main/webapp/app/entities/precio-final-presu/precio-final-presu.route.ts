import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PrecioFinalPresu } from 'app/shared/model/precio-final-presu.model';
import { PrecioFinalPresuService } from './precio-final-presu.service';
import { PrecioFinalPresuComponent } from './precio-final-presu.component';
import { PrecioFinalPresuDetailComponent } from './precio-final-presu-detail.component';
import { PrecioFinalPresuUpdateComponent } from './precio-final-presu-update.component';
import { PrecioFinalPresuDeletePopupComponent } from './precio-final-presu-delete-dialog.component';
import { IPrecioFinalPresu } from 'app/shared/model/precio-final-presu.model';

@Injectable({ providedIn: 'root' })
export class PrecioFinalPresuResolve implements Resolve<IPrecioFinalPresu> {
    constructor(private service: PrecioFinalPresuService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PrecioFinalPresu> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PrecioFinalPresu>) => response.ok),
                map((precioFinalPresu: HttpResponse<PrecioFinalPresu>) => precioFinalPresu.body)
            );
        }
        return of(new PrecioFinalPresu());
    }
}

export const precioFinalPresuRoute: Routes = [
    {
        path: 'precio-final-presu',
        component: PrecioFinalPresuComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.precioFinalPresu.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'precio-final-presu/:id/view',
        component: PrecioFinalPresuDetailComponent,
        resolve: {
            precioFinalPresu: PrecioFinalPresuResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.precioFinalPresu.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'precio-final-presu/new',
        component: PrecioFinalPresuUpdateComponent,
        resolve: {
            precioFinalPresu: PrecioFinalPresuResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.precioFinalPresu.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'precio-final-presu/:id/edit',
        component: PrecioFinalPresuUpdateComponent,
        resolve: {
            precioFinalPresu: PrecioFinalPresuResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.precioFinalPresu.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const precioFinalPresuPopupRoute: Routes = [
    {
        path: 'precio-final-presu/:id/delete',
        component: PrecioFinalPresuDeletePopupComponent,
        resolve: {
            precioFinalPresu: PrecioFinalPresuResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.precioFinalPresu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

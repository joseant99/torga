import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Puertas } from 'app/shared/model/puertas.model';
import { PuertasService } from './puertas.service';
import { PuertasComponent } from './puertas.component';
import { PuertasDetailComponent } from './puertas-detail.component';
import { PuertasUpdateComponent } from './puertas-update.component';
import { PuertasDeletePopupComponent } from './puertas-delete-dialog.component';
import { IPuertas } from 'app/shared/model/puertas.model';

@Injectable({ providedIn: 'root' })
export class PuertasResolve implements Resolve<IPuertas> {
    constructor(private service: PuertasService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Puertas> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Puertas>) => response.ok),
                map((puertas: HttpResponse<Puertas>) => puertas.body)
            );
        }
        return of(new Puertas());
    }
}

export const puertasRoute: Routes = [
    {
        path: 'puertas',
        component: PuertasComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.puertas.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'puertas/:id/view',
        component: PuertasDetailComponent,
        resolve: {
            puertas: PuertasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.puertas.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'puertas/new',
        component: PuertasUpdateComponent,
        resolve: {
            puertas: PuertasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.puertas.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'puertas/:id/edit',
        component: PuertasUpdateComponent,
        resolve: {
            puertas: PuertasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.puertas.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const puertasPopupRoute: Routes = [
    {
        path: 'puertas/:id/delete',
        component: PuertasDeletePopupComponent,
        resolve: {
            puertas: PuertasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.puertas.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

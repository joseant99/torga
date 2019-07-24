import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Logistica } from 'app/shared/model/logistica.model';
import { LogisticaService } from './logistica.service';
import { LogisticaComponent } from './logistica.component';
import { LogisticaDetailComponent } from './logistica-detail.component';
import { LogisticaUpdateComponent } from './logistica-update.component';
import { LogisticaDeletePopupComponent } from './logistica-delete-dialog.component';
import { ILogistica } from 'app/shared/model/logistica.model';

@Injectable({ providedIn: 'root' })
export class LogisticaResolve implements Resolve<ILogistica> {
    constructor(private service: LogisticaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Logistica> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Logistica>) => response.ok),
                map((logistica: HttpResponse<Logistica>) => logistica.body)
            );
        }
        return of(new Logistica());
    }
}

export const logisticaRoute: Routes = [
    {
        path: 'logistica',
        component: LogisticaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.logistica.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'logistica/:id/view',
        component: LogisticaDetailComponent,
        resolve: {
            logistica: LogisticaResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'torgaPedidosApp.logistica.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'logistica/new',
        component: LogisticaUpdateComponent,
        resolve: {
            logistica: LogisticaResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'torgaPedidosApp.logistica.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'logistica/:id/edit',
        component: LogisticaUpdateComponent,
        resolve: {
            logistica: LogisticaResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'torgaPedidosApp.logistica.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const logisticaPopupRoute: Routes = [
    {
        path: 'logistica/:id/delete',
        component: LogisticaDeletePopupComponent,
        resolve: {
            logistica: LogisticaResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'torgaPedidosApp.logistica.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

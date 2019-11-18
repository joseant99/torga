import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { InterioresArmarioNuevos } from 'app/shared/model/interiores-armario-nuevos.model';
import { InterioresArmarioNuevosService } from './interiores-armario-nuevos.service';
import { InterioresArmarioNuevosComponent } from './interiores-armario-nuevos.component';
import { InterioresArmarioNuevosDetailComponent } from './interiores-armario-nuevos-detail.component';
import { InterioresArmarioNuevosUpdateComponent } from './interiores-armario-nuevos-update.component';
import { InterioresArmarioNuevosDeletePopupComponent } from './interiores-armario-nuevos-delete-dialog.component';
import { IInterioresArmarioNuevos } from 'app/shared/model/interiores-armario-nuevos.model';

@Injectable({ providedIn: 'root' })
export class InterioresArmarioNuevosResolve implements Resolve<IInterioresArmarioNuevos> {
    constructor(private service: InterioresArmarioNuevosService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InterioresArmarioNuevos> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<InterioresArmarioNuevos>) => response.ok),
                map((interioresArmarioNuevos: HttpResponse<InterioresArmarioNuevos>) => interioresArmarioNuevos.body)
            );
        }
        return of(new InterioresArmarioNuevos());
    }
}

export const interioresArmarioNuevosRoute: Routes = [
    {
        path: 'interiores-armario-nuevos',
        component: InterioresArmarioNuevosComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.interioresArmarioNuevos.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'interiores-armario-nuevos/:id/view',
        component: InterioresArmarioNuevosDetailComponent,
        resolve: {
            interioresArmarioNuevos: InterioresArmarioNuevosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.interioresArmarioNuevos.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'interiores-armario-nuevos/new',
        component: InterioresArmarioNuevosUpdateComponent,
        resolve: {
            interioresArmarioNuevos: InterioresArmarioNuevosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.interioresArmarioNuevos.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'interiores-armario-nuevos/:id/edit',
        component: InterioresArmarioNuevosUpdateComponent,
        resolve: {
            interioresArmarioNuevos: InterioresArmarioNuevosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.interioresArmarioNuevos.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const interioresArmarioNuevosPopupRoute: Routes = [
    {
        path: 'interiores-armario-nuevos/:id/delete',
        component: InterioresArmarioNuevosDeletePopupComponent,
        resolve: {
            interioresArmarioNuevos: InterioresArmarioNuevosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.interioresArmarioNuevos.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

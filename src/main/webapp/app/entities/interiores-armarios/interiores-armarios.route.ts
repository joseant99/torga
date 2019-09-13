import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { InterioresArmarios } from 'app/shared/model/interiores-armarios.model';
import { InterioresArmariosService } from './interiores-armarios.service';
import { InterioresArmariosComponent } from './interiores-armarios.component';
import { InterioresArmariosDetailComponent } from './interiores-armarios-detail.component';
import { InterioresArmariosUpdateComponent } from './interiores-armarios-update.component';
import { InterioresArmariosDeletePopupComponent } from './interiores-armarios-delete-dialog.component';
import { IInterioresArmarios } from 'app/shared/model/interiores-armarios.model';

@Injectable({ providedIn: 'root' })
export class InterioresArmariosResolve implements Resolve<IInterioresArmarios> {
    constructor(private service: InterioresArmariosService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InterioresArmarios> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<InterioresArmarios>) => response.ok),
                map((interioresArmarios: HttpResponse<InterioresArmarios>) => interioresArmarios.body)
            );
        }
        return of(new InterioresArmarios());
    }
}

export const interioresArmariosRoute: Routes = [
    {
        path: 'interiores-armarios',
        component: InterioresArmariosComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.interioresArmarios.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'interiores-armarios/:id/view',
        component: InterioresArmariosDetailComponent,
        resolve: {
            interioresArmarios: InterioresArmariosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.interioresArmarios.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'interiores-armarios/new',
        component: InterioresArmariosUpdateComponent,
        resolve: {
            interioresArmarios: InterioresArmariosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.interioresArmarios.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'interiores-armarios/:id/edit',
        component: InterioresArmariosUpdateComponent,
        resolve: {
            interioresArmarios: InterioresArmariosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.interioresArmarios.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const interioresArmariosPopupRoute: Routes = [
    {
        path: 'interiores-armarios/:id/delete',
        component: InterioresArmariosDeletePopupComponent,
        resolve: {
            interioresArmarios: InterioresArmariosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.interioresArmarios.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

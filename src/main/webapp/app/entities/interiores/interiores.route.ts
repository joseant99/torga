import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Interiores } from 'app/shared/model/interiores.model';
import { InterioresService } from './interiores.service';
import { InterioresComponent } from './interiores.component';
import { InterioresDetailComponent } from './interiores-detail.component';
import { InterioresUpdateComponent } from './interiores-update.component';
import { InterioresDeletePopupComponent } from './interiores-delete-dialog.component';
import { IInteriores } from 'app/shared/model/interiores.model';

@Injectable({ providedIn: 'root' })
export class InterioresResolve implements Resolve<IInteriores> {
    constructor(private service: InterioresService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Interiores> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Interiores>) => response.ok),
                map((interiores: HttpResponse<Interiores>) => interiores.body)
            );
        }
        return of(new Interiores());
    }
}

export const interioresRoute: Routes = [
    {
        path: 'interiores',
        component: InterioresComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.interiores.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'interiores/:id/view',
        component: InterioresDetailComponent,
        resolve: {
            interiores: InterioresResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.interiores.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'interiores/new',
        component: InterioresUpdateComponent,
        resolve: {
            interiores: InterioresResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.interiores.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'interiores/:id/edit',
        component: InterioresUpdateComponent,
        resolve: {
            interiores: InterioresResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.interiores.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const interioresPopupRoute: Routes = [
    {
        path: 'interiores/:id/delete',
        component: InterioresDeletePopupComponent,
        resolve: {
            interiores: InterioresResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.interiores.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

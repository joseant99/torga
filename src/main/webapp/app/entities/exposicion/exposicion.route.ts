import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Exposicion } from 'app/shared/model/exposicion.model';
import { ExposicionService } from './exposicion.service';
import { ExposicionComponent } from './exposicion.component';
import { ExposicionDetailComponent } from './exposicion-detail.component';
import { ExposicionUpdateComponent } from './exposicion-update.component';
import { ExposicionDeletePopupComponent } from './exposicion-delete-dialog.component';
import { IExposicion } from 'app/shared/model/exposicion.model';

@Injectable({ providedIn: 'root' })
export class ExposicionResolve implements Resolve<IExposicion> {
    constructor(private service: ExposicionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Exposicion> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Exposicion>) => response.ok),
                map((exposicion: HttpResponse<Exposicion>) => exposicion.body)
            );
        }
        return of(new Exposicion());
    }
}

export const exposicionRoute: Routes = [
    {
        path: 'exposicion',
        component: ExposicionComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.exposicion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'exposicion/:id/view',
        component: ExposicionDetailComponent,
        resolve: {
            exposicion: ExposicionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.exposicion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'exposicion/new',
        component: ExposicionUpdateComponent,
        resolve: {
            exposicion: ExposicionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.exposicion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'exposicion/:id/edit',
        component: ExposicionUpdateComponent,
        resolve: {
            exposicion: ExposicionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.exposicion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const exposicionPopupRoute: Routes = [
    {
        path: 'exposicion/:id/delete',
        component: ExposicionDeletePopupComponent,
        resolve: {
            exposicion: ExposicionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.exposicion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

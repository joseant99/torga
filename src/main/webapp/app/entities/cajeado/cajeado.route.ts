import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Cajeado } from 'app/shared/model/cajeado.model';
import { CajeadoService } from './cajeado.service';
import { CajeadoComponent } from './cajeado.component';
import { CajeadoDetailComponent } from './cajeado-detail.component';
import { CajeadoUpdateComponent } from './cajeado-update.component';
import { CajeadoDeletePopupComponent } from './cajeado-delete-dialog.component';
import { ICajeado } from 'app/shared/model/cajeado.model';

@Injectable({ providedIn: 'root' })
export class CajeadoResolve implements Resolve<ICajeado> {
    constructor(private service: CajeadoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cajeado> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Cajeado>) => response.ok),
                map((cajeado: HttpResponse<Cajeado>) => cajeado.body)
            );
        }
        return of(new Cajeado());
    }
}

export const cajeadoRoute: Routes = [
    {
        path: 'cajeado',
        component: CajeadoComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.cajeado.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cajeado/:id/view',
        component: CajeadoDetailComponent,
        resolve: {
            cajeado: CajeadoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.cajeado.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cajeado/new',
        component: CajeadoUpdateComponent,
        resolve: {
            cajeado: CajeadoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.cajeado.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cajeado/:id/edit',
        component: CajeadoUpdateComponent,
        resolve: {
            cajeado: CajeadoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.cajeado.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cajeadoPopupRoute: Routes = [
    {
        path: 'cajeado/:id/delete',
        component: CajeadoDeletePopupComponent,
        resolve: {
            cajeado: CajeadoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.cajeado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

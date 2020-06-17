import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Enmarcados } from 'app/shared/model/enmarcados.model';
import { EnmarcadosService } from './enmarcados.service';
import { EnmarcadosComponent } from './enmarcados.component';
import { EnmarcadosDetailComponent } from './enmarcados-detail.component';
import { EnmarcadosUpdateComponent } from './enmarcados-update.component';
import { EnmarcadosDeletePopupComponent } from './enmarcados-delete-dialog.component';
import { IEnmarcados } from 'app/shared/model/enmarcados.model';

@Injectable({ providedIn: 'root' })
export class EnmarcadosResolve implements Resolve<IEnmarcados> {
    constructor(private service: EnmarcadosService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Enmarcados> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Enmarcados>) => response.ok),
                map((enmarcados: HttpResponse<Enmarcados>) => enmarcados.body)
            );
        }
        return of(new Enmarcados());
    }
}

export const enmarcadosRoute: Routes = [
    {
        path: 'enmarcados',
        component: EnmarcadosComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.enmarcados.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'enmarcados/:id/view',
        component: EnmarcadosDetailComponent,
        resolve: {
            enmarcados: EnmarcadosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.enmarcados.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'enmarcados/new',
        component: EnmarcadosUpdateComponent,
        resolve: {
            enmarcados: EnmarcadosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.enmarcados.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'enmarcados/:id/edit',
        component: EnmarcadosUpdateComponent,
        resolve: {
            enmarcados: EnmarcadosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.enmarcados.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const enmarcadosPopupRoute: Routes = [
    {
        path: 'enmarcados/:id/delete',
        component: EnmarcadosDeletePopupComponent,
        resolve: {
            enmarcados: EnmarcadosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.enmarcados.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

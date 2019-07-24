import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Acabados } from 'app/shared/model/acabados.model';
import { AcabadosService } from './acabados.service';
import { AcabadosComponent } from './acabados.component';
import { AcabadosDetailComponent } from './acabados-detail.component';
import { AcabadosUpdateComponent } from './acabados-update.component';
import { AcabadosDeletePopupComponent } from './acabados-delete-dialog.component';
import { IAcabados } from 'app/shared/model/acabados.model';

@Injectable({ providedIn: 'root' })
export class AcabadosResolve implements Resolve<IAcabados> {
    constructor(private service: AcabadosService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Acabados> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Acabados>) => response.ok),
                map((acabados: HttpResponse<Acabados>) => acabados.body)
            );
        }
        return of(new Acabados());
    }
}

export const acabadosRoute: Routes = [
    {
        path: 'acabados',
        component: AcabadosComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.acabados.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'acabados/:id/view',
        component: AcabadosDetailComponent,
        resolve: {
            acabados: AcabadosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.acabados.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'acabados/new',
        component: AcabadosUpdateComponent,
        resolve: {
            acabados: AcabadosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.acabados.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'acabados/:id/edit',
        component: AcabadosUpdateComponent,
        resolve: {
            acabados: AcabadosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.acabados.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const acabadosPopupRoute: Routes = [
    {
        path: 'acabados/:id/delete',
        component: AcabadosDeletePopupComponent,
        resolve: {
            acabados: AcabadosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.acabados.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

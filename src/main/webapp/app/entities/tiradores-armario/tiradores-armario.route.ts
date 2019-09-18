import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TiradoresArmario } from 'app/shared/model/tiradores-armario.model';
import { TiradoresArmarioService } from './tiradores-armario.service';
import { TiradoresArmarioComponent } from './tiradores-armario.component';
import { TiradoresArmarioDetailComponent } from './tiradores-armario-detail.component';
import { TiradoresArmarioUpdateComponent } from './tiradores-armario-update.component';
import { TiradoresArmarioDeletePopupComponent } from './tiradores-armario-delete-dialog.component';
import { ITiradoresArmario } from 'app/shared/model/tiradores-armario.model';

@Injectable({ providedIn: 'root' })
export class TiradoresArmarioResolve implements Resolve<ITiradoresArmario> {
    constructor(private service: TiradoresArmarioService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TiradoresArmario> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TiradoresArmario>) => response.ok),
                map((tiradoresArmario: HttpResponse<TiradoresArmario>) => tiradoresArmario.body)
            );
        }
        return of(new TiradoresArmario());
    }
}

export const tiradoresArmarioRoute: Routes = [
    {
        path: 'tiradores-armario',
        component: TiradoresArmarioComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.tiradoresArmario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tiradores-armario/:id/view',
        component: TiradoresArmarioDetailComponent,
        resolve: {
            tiradoresArmario: TiradoresArmarioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.tiradoresArmario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tiradores-armario/new',
        component: TiradoresArmarioUpdateComponent,
        resolve: {
            tiradoresArmario: TiradoresArmarioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.tiradoresArmario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tiradores-armario/:id/edit',
        component: TiradoresArmarioUpdateComponent,
        resolve: {
            tiradoresArmario: TiradoresArmarioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.tiradoresArmario.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tiradoresArmarioPopupRoute: Routes = [
    {
        path: 'tiradores-armario/:id/delete',
        component: TiradoresArmarioDeletePopupComponent,
        resolve: {
            tiradoresArmario: TiradoresArmarioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.tiradoresArmario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

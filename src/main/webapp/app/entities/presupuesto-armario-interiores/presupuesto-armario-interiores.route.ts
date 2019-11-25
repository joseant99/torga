import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PresupuestoArmarioInteriores } from 'app/shared/model/presupuesto-armario-interiores.model';
import { PresupuestoArmarioInterioresService } from './presupuesto-armario-interiores.service';
import { PresupuestoArmarioInterioresComponent } from './presupuesto-armario-interiores.component';
import { PresupuestoArmarioInterioresDetailComponent } from './presupuesto-armario-interiores-detail.component';
import { PresupuestoArmarioInterioresUpdateComponent } from './presupuesto-armario-interiores-update.component';
import { PresupuestoArmarioInterioresDeletePopupComponent } from './presupuesto-armario-interiores-delete-dialog.component';
import { IPresupuestoArmarioInteriores } from 'app/shared/model/presupuesto-armario-interiores.model';

@Injectable({ providedIn: 'root' })
export class PresupuestoArmarioInterioresResolve implements Resolve<IPresupuestoArmarioInteriores> {
    constructor(private service: PresupuestoArmarioInterioresService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PresupuestoArmarioInteriores> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PresupuestoArmarioInteriores>) => response.ok),
                map((presupuestoArmarioInteriores: HttpResponse<PresupuestoArmarioInteriores>) => presupuestoArmarioInteriores.body)
            );
        }
        return of(new PresupuestoArmarioInteriores());
    }
}

export const presupuestoArmarioInterioresRoute: Routes = [
    {
        path: 'presupuesto-armario-interiores',
        component: PresupuestoArmarioInterioresComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.presupuestoArmarioInteriores.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'presupuesto-armario-interiores/:id/view',
        component: PresupuestoArmarioInterioresDetailComponent,
        resolve: {
            presupuestoArmarioInteriores: PresupuestoArmarioInterioresResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.presupuestoArmarioInteriores.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'presupuesto-armario-interiores/new',
        component: PresupuestoArmarioInterioresUpdateComponent,
        resolve: {
            presupuestoArmarioInteriores: PresupuestoArmarioInterioresResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.presupuestoArmarioInteriores.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'presupuesto-armario-interiores/:id/edit',
        component: PresupuestoArmarioInterioresUpdateComponent,
        resolve: {
            presupuestoArmarioInteriores: PresupuestoArmarioInterioresResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.presupuestoArmarioInteriores.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const presupuestoArmarioInterioresPopupRoute: Routes = [
    {
        path: 'presupuesto-armario-interiores/:id/delete',
        component: PresupuestoArmarioInterioresDeletePopupComponent,
        resolve: {
            presupuestoArmarioInteriores: PresupuestoArmarioInterioresResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.presupuestoArmarioInteriores.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

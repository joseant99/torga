import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PresupuestoArmario } from 'app/shared/model/presupuesto-armario.model';
import { PresupuestoArmarioService } from './presupuesto-armario.service';
import { PresupuestoArmarioComponent } from './presupuesto-armario.component';
import { PresupuestoArmarioDetailComponent } from './presupuesto-armario-detail.component';
import { PresupuestoArmarioUpdateComponent } from './presupuesto-armario-update.component';
import { PresupuestoArmarioDeletePopupComponent } from './presupuesto-armario-delete-dialog.component';
import { IPresupuestoArmario } from 'app/shared/model/presupuesto-armario.model';

@Injectable({ providedIn: 'root' })
export class PresupuestoArmarioResolve implements Resolve<IPresupuestoArmario> {
    constructor(private service: PresupuestoArmarioService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PresupuestoArmario> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PresupuestoArmario>) => response.ok),
                map((presupuestoArmario: HttpResponse<PresupuestoArmario>) => presupuestoArmario.body)
            );
        }
        return of(new PresupuestoArmario());
    }
}

export const presupuestoArmarioRoute: Routes = [
    {
        path: 'presupuesto-armario',
        component: PresupuestoArmarioComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.presupuestoArmario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'presupuesto-armario/:id/view',
        component: PresupuestoArmarioDetailComponent,
        resolve: {
            presupuestoArmario: PresupuestoArmarioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.presupuestoArmario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'presupuesto-armario/new',
        component: PresupuestoArmarioUpdateComponent,
        resolve: {
            presupuestoArmario: PresupuestoArmarioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.presupuestoArmario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'presupuesto-armario/:id/edit',
        component: PresupuestoArmarioUpdateComponent,
        resolve: {
            presupuestoArmario: PresupuestoArmarioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.presupuestoArmario.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const presupuestoArmarioPopupRoute: Routes = [
    {
        path: 'presupuesto-armario/:id/delete',
        component: PresupuestoArmarioDeletePopupComponent,
        resolve: {
            presupuestoArmario: PresupuestoArmarioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.presupuestoArmario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

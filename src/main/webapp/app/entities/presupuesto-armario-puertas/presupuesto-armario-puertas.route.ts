import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PresupuestoArmarioPuertas } from 'app/shared/model/presupuesto-armario-puertas.model';
import { PresupuestoArmarioPuertasService } from './presupuesto-armario-puertas.service';
import { PresupuestoArmarioPuertasComponent } from './presupuesto-armario-puertas.component';
import { PresupuestoArmarioPuertasDetailComponent } from './presupuesto-armario-puertas-detail.component';
import { PresupuestoArmarioPuertasUpdateComponent } from './presupuesto-armario-puertas-update.component';
import { PresupuestoArmarioPuertasDeletePopupComponent } from './presupuesto-armario-puertas-delete-dialog.component';
import { IPresupuestoArmarioPuertas } from 'app/shared/model/presupuesto-armario-puertas.model';

@Injectable({ providedIn: 'root' })
export class PresupuestoArmarioPuertasResolve implements Resolve<IPresupuestoArmarioPuertas> {
    constructor(private service: PresupuestoArmarioPuertasService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PresupuestoArmarioPuertas> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PresupuestoArmarioPuertas>) => response.ok),
                map((presupuestoArmarioPuertas: HttpResponse<PresupuestoArmarioPuertas>) => presupuestoArmarioPuertas.body)
            );
        }
        return of(new PresupuestoArmarioPuertas());
    }
}

export const presupuestoArmarioPuertasRoute: Routes = [
    {
        path: 'presupuesto-armario-puertas',
        component: PresupuestoArmarioPuertasComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.presupuestoArmarioPuertas.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'presupuesto-armario-puertas/:id/view',
        component: PresupuestoArmarioPuertasDetailComponent,
        resolve: {
            presupuestoArmarioPuertas: PresupuestoArmarioPuertasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.presupuestoArmarioPuertas.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'presupuesto-armario-puertas/new',
        component: PresupuestoArmarioPuertasUpdateComponent,
        resolve: {
            presupuestoArmarioPuertas: PresupuestoArmarioPuertasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.presupuestoArmarioPuertas.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'presupuesto-armario-puertas/:id/edit',
        component: PresupuestoArmarioPuertasUpdateComponent,
        resolve: {
            presupuestoArmarioPuertas: PresupuestoArmarioPuertasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.presupuestoArmarioPuertas.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const presupuestoArmarioPuertasPopupRoute: Routes = [
    {
        path: 'presupuesto-armario-puertas/:id/delete',
        component: PresupuestoArmarioPuertasDeletePopupComponent,
        resolve: {
            presupuestoArmarioPuertas: PresupuestoArmarioPuertasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.presupuestoArmarioPuertas.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

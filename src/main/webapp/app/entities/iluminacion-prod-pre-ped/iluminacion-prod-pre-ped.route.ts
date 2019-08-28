import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IluminacionProdPrePed } from 'app/shared/model/iluminacion-prod-pre-ped.model';
import { IluminacionProdPrePedService } from './iluminacion-prod-pre-ped.service';
import { IluminacionProdPrePedComponent } from './iluminacion-prod-pre-ped.component';
import { IluminacionProdPrePedDetailComponent } from './iluminacion-prod-pre-ped-detail.component';
import { IluminacionProdPrePedUpdateComponent } from './iluminacion-prod-pre-ped-update.component';
import { IluminacionProdPrePedDeletePopupComponent } from './iluminacion-prod-pre-ped-delete-dialog.component';
import { IIluminacionProdPrePed } from 'app/shared/model/iluminacion-prod-pre-ped.model';

@Injectable({ providedIn: 'root' })
export class IluminacionProdPrePedResolve implements Resolve<IIluminacionProdPrePed> {
    constructor(private service: IluminacionProdPrePedService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IluminacionProdPrePed> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<IluminacionProdPrePed>) => response.ok),
                map((iluminacionProdPrePed: HttpResponse<IluminacionProdPrePed>) => iluminacionProdPrePed.body)
            );
        }
        return of(new IluminacionProdPrePed());
    }
}

export const iluminacionProdPrePedRoute: Routes = [
    {
        path: 'iluminacion-prod-pre-ped',
        component: IluminacionProdPrePedComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.iluminacionProdPrePed.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'iluminacion-prod-pre-ped/:id/view',
        component: IluminacionProdPrePedDetailComponent,
        resolve: {
            iluminacionProdPrePed: IluminacionProdPrePedResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.iluminacionProdPrePed.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'iluminacion-prod-pre-ped/new',
        component: IluminacionProdPrePedUpdateComponent,
        resolve: {
            iluminacionProdPrePed: IluminacionProdPrePedResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.iluminacionProdPrePed.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'iluminacion-prod-pre-ped/:id/edit',
        component: IluminacionProdPrePedUpdateComponent,
        resolve: {
            iluminacionProdPrePed: IluminacionProdPrePedResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.iluminacionProdPrePed.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const iluminacionProdPrePedPopupRoute: Routes = [
    {
        path: 'iluminacion-prod-pre-ped/:id/delete',
        component: IluminacionProdPrePedDeletePopupComponent,
        resolve: {
            iluminacionProdPrePed: IluminacionProdPrePedResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.iluminacionProdPrePed.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

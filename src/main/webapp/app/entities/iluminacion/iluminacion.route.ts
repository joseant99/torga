import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Iluminacion } from 'app/shared/model/iluminacion.model';
import { IluminacionService } from './iluminacion.service';
import { IluminacionComponent } from './iluminacion.component';
import { IluminacionDetailComponent } from './iluminacion-detail.component';
import { IluminacionUpdateComponent } from './iluminacion-update.component';
import { IluminacionDeletePopupComponent } from './iluminacion-delete-dialog.component';
import { IIluminacion } from 'app/shared/model/iluminacion.model';

@Injectable({ providedIn: 'root' })
export class IluminacionResolve implements Resolve<IIluminacion> {
    constructor(private service: IluminacionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Iluminacion> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Iluminacion>) => response.ok),
                map((iluminacion: HttpResponse<Iluminacion>) => iluminacion.body)
            );
        }
        return of(new Iluminacion());
    }
}

export const iluminacionRoute: Routes = [
    {
        path: 'iluminacion',
        component: IluminacionComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.iluminacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'iluminacion/:id/view',
        component: IluminacionDetailComponent,
        resolve: {
            iluminacion: IluminacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.iluminacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'iluminacion/new',
        component: IluminacionUpdateComponent,
        resolve: {
            iluminacion: IluminacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.iluminacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'iluminacion/:id/edit',
        component: IluminacionUpdateComponent,
        resolve: {
            iluminacion: IluminacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.iluminacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const iluminacionPopupRoute: Routes = [
    {
        path: 'iluminacion/:id/delete',
        component: IluminacionDeletePopupComponent,
        resolve: {
            iluminacion: IluminacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.iluminacion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

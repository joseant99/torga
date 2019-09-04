import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MedidasEspeciales } from 'app/shared/model/medidas-especiales.model';
import { MedidasEspecialesService } from './medidas-especiales.service';
import { MedidasEspecialesComponent } from './medidas-especiales.component';
import { MedidasEspecialesDetailComponent } from './medidas-especiales-detail.component';
import { MedidasEspecialesUpdateComponent } from './medidas-especiales-update.component';
import { MedidasEspecialesDeletePopupComponent } from './medidas-especiales-delete-dialog.component';
import { IMedidasEspeciales } from 'app/shared/model/medidas-especiales.model';

@Injectable({ providedIn: 'root' })
export class MedidasEspecialesResolve implements Resolve<IMedidasEspeciales> {
    constructor(private service: MedidasEspecialesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MedidasEspeciales> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MedidasEspeciales>) => response.ok),
                map((medidasEspeciales: HttpResponse<MedidasEspeciales>) => medidasEspeciales.body)
            );
        }
        return of(new MedidasEspeciales());
    }
}

export const medidasEspecialesRoute: Routes = [
    {
        path: 'medidas-especiales',
        component: MedidasEspecialesComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.medidasEspeciales.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'medidas-especiales/:id/view',
        component: MedidasEspecialesDetailComponent,
        resolve: {
            medidasEspeciales: MedidasEspecialesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.medidasEspeciales.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'medidas-especiales/new',
        component: MedidasEspecialesUpdateComponent,
        resolve: {
            medidasEspeciales: MedidasEspecialesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.medidasEspeciales.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'medidas-especiales/:id/edit',
        component: MedidasEspecialesUpdateComponent,
        resolve: {
            medidasEspeciales: MedidasEspecialesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.medidasEspeciales.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const medidasEspecialesPopupRoute: Routes = [
    {
        path: 'medidas-especiales/:id/delete',
        component: MedidasEspecialesDeletePopupComponent,
        resolve: {
            medidasEspeciales: MedidasEspecialesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.medidasEspeciales.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

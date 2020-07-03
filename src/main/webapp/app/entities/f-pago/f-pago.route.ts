import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FPago } from 'app/shared/model/f-pago.model';
import { FPagoService } from './f-pago.service';
import { FPagoComponent } from './f-pago.component';
import { FPagoDetailComponent } from './f-pago-detail.component';
import { FPagoUpdateComponent } from './f-pago-update.component';
import { FPagoDeletePopupComponent } from './f-pago-delete-dialog.component';
import { IFPago } from 'app/shared/model/f-pago.model';

@Injectable({ providedIn: 'root' })
export class FPagoResolve implements Resolve<IFPago> {
    constructor(private service: FPagoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FPago> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<FPago>) => response.ok),
                map((fPago: HttpResponse<FPago>) => fPago.body)
            );
        }
        return of(new FPago());
    }
}

export const fPagoRoute: Routes = [
    {
        path: 'f-pago',
        component: FPagoComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.fPago.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'f-pago/:id/view',
        component: FPagoDetailComponent,
        resolve: {
            fPago: FPagoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.fPago.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'f-pago/new',
        component: FPagoUpdateComponent,
        resolve: {
            fPago: FPagoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.fPago.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'f-pago/:id/edit',
        component: FPagoUpdateComponent,
        resolve: {
            fPago: FPagoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.fPago.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fPagoPopupRoute: Routes = [
    {
        path: 'f-pago/:id/delete',
        component: FPagoDeletePopupComponent,
        resolve: {
            fPago: FPagoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.fPago.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

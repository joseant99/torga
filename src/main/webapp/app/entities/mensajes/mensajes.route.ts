import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Mensajes } from 'app/shared/model/mensajes.model';
import { MensajesService } from './mensajes.service';
import { MensajesComponent } from './mensajes.component';
import { MensajesDetailComponent } from './mensajes-detail.component';
import { MensajesUpdateComponent } from './mensajes-update.component';
import { MensajesDeletePopupComponent } from './mensajes-delete-dialog.component';
import { IMensajes } from 'app/shared/model/mensajes.model';

@Injectable({ providedIn: 'root' })
export class MensajesResolve implements Resolve<IMensajes> {
    constructor(private service: MensajesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Mensajes> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Mensajes>) => response.ok),
                map((mensajes: HttpResponse<Mensajes>) => mensajes.body)
            );
        }
        return of(new Mensajes());
    }
}

export const mensajesRoute: Routes = [
    {
        path: 'mensajes',
        component: MensajesComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.mensajes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mensajes/:id/view',
        component: MensajesDetailComponent,
        resolve: {
            mensajes: MensajesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.mensajes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mensajes/new',
        component: MensajesUpdateComponent,
        resolve: {
            mensajes: MensajesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.mensajes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mensajes/:id/edit',
        component: MensajesUpdateComponent,
        resolve: {
            mensajes: MensajesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.mensajes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mensajesPopupRoute: Routes = [
    {
        path: 'mensajes/:id/delete',
        component: MensajesDeletePopupComponent,
        resolve: {
            mensajes: MensajesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.mensajes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

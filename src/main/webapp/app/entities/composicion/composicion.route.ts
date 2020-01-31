import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Composicion } from 'app/shared/model/composicion.model';
import { ComposicionService } from './composicion.service';
import { ComposicionComponent } from './composicion.component';
import { ComposicionNtTodasComponent } from './composicion-nt-todas.component';
import { ComposicionDetailComponent } from './composicion-detail.component';
import { ComposicionUpdateComponent } from './composicion-update.component';
import { ComposicionDeletePopupComponent } from './composicion-delete-dialog.component';
import { ComposicionVerComponent } from './composicion-ver.component';
import { IComposicion } from 'app/shared/model/composicion.model';

@Injectable({ providedIn: 'root' })
export class ComposicionResolve implements Resolve<IComposicion> {
    constructor(private service: ComposicionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Composicion> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Composicion>) => response.ok),
                map((composicion: HttpResponse<Composicion>) => composicion.body)
            );
        }
        return of(new Composicion());
    }
}

export const composicionRoute: Routes = [
    {
        path: 'composicion',
        component: ComposicionComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.composicion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ComposicionNtTodasComponent',
        component: ComposicionNtTodasComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE', 'ROLE_REPRESENTANTE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.composicion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'composicion/:id/view',
        component: ComposicionDetailComponent,
        resolve: {
            composicion: ComposicionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.composicion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'composicion-ver',
        component: ComposicionVerComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.composicion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'composicion/new',
        component: ComposicionUpdateComponent,
        resolve: {
            composicion: ComposicionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.composicion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'composicion/:id/edit',
        component: ComposicionUpdateComponent,
        resolve: {
            composicion: ComposicionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.composicion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const composicionPopupRoute: Routes = [
    {
        path: 'composicion/:id/delete',
        component: ComposicionDeletePopupComponent,
        resolve: {
            composicion: ComposicionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.composicion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

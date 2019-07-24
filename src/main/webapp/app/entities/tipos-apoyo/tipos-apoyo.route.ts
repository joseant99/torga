import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TiposApoyo } from 'app/shared/model/tipos-apoyo.model';
import { TiposApoyoService } from './tipos-apoyo.service';
import { TiposApoyoComponent } from './tipos-apoyo.component';
import { TiposApoyoDetailComponent } from './tipos-apoyo-detail.component';
import { TiposApoyoUpdateComponent } from './tipos-apoyo-update.component';
import { TiposApoyoDeletePopupComponent } from './tipos-apoyo-delete-dialog.component';
import { ITiposApoyo } from 'app/shared/model/tipos-apoyo.model';

@Injectable({ providedIn: 'root' })
export class TiposApoyoResolve implements Resolve<ITiposApoyo> {
    constructor(private service: TiposApoyoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TiposApoyo> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TiposApoyo>) => response.ok),
                map((tiposApoyo: HttpResponse<TiposApoyo>) => tiposApoyo.body)
            );
        }
        return of(new TiposApoyo());
    }
}

export const tiposApoyoRoute: Routes = [
    {
        path: 'tipos-apoyo',
        component: TiposApoyoComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.tiposApoyo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipos-apoyo/:id/view',
        component: TiposApoyoDetailComponent,
        resolve: {
            tiposApoyo: TiposApoyoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.tiposApoyo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipos-apoyo/new',
        component: TiposApoyoUpdateComponent,
        resolve: {
            tiposApoyo: TiposApoyoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.tiposApoyo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipos-apoyo/:id/edit',
        component: TiposApoyoUpdateComponent,
        resolve: {
            tiposApoyo: TiposApoyoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.tiposApoyo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tiposApoyoPopupRoute: Routes = [
    {
        path: 'tipos-apoyo/:id/delete',
        component: TiposApoyoDeletePopupComponent,
        resolve: {
            tiposApoyo: TiposApoyoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.tiposApoyo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

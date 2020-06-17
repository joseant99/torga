import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Niveladores } from 'app/shared/model/niveladores.model';
import { NiveladoresService } from './niveladores.service';
import { NiveladoresComponent } from './niveladores.component';
import { NiveladoresDetailComponent } from './niveladores-detail.component';
import { NiveladoresUpdateComponent } from './niveladores-update.component';
import { NiveladoresDeletePopupComponent } from './niveladores-delete-dialog.component';
import { INiveladores } from 'app/shared/model/niveladores.model';

@Injectable({ providedIn: 'root' })
export class NiveladoresResolve implements Resolve<INiveladores> {
    constructor(private service: NiveladoresService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Niveladores> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Niveladores>) => response.ok),
                map((niveladores: HttpResponse<Niveladores>) => niveladores.body)
            );
        }
        return of(new Niveladores());
    }
}

export const niveladoresRoute: Routes = [
    {
        path: 'niveladores',
        component: NiveladoresComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.niveladores.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'niveladores/:id/view',
        component: NiveladoresDetailComponent,
        resolve: {
            niveladores: NiveladoresResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.niveladores.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'niveladores/new',
        component: NiveladoresUpdateComponent,
        resolve: {
            niveladores: NiveladoresResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.niveladores.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'niveladores/:id/edit',
        component: NiveladoresUpdateComponent,
        resolve: {
            niveladores: NiveladoresResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.niveladores.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const niveladoresPopupRoute: Routes = [
    {
        path: 'niveladores/:id/delete',
        component: NiveladoresDeletePopupComponent,
        resolve: {
            niveladores: NiveladoresResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.niveladores.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

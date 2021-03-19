import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Coordenadas } from 'app/shared/model/coordenadas.model';
import { CoordenadasService } from './coordenadas.service';
import { CoordenadasComponent } from './coordenadas.component';
import { CoordenadasDetailComponent } from './coordenadas-detail.component';
import { CoordenadasUpdateComponent } from './coordenadas-update.component';
import { CoordenadasDeletePopupComponent } from './coordenadas-delete-dialog.component';
import { ICoordenadas } from 'app/shared/model/coordenadas.model';

@Injectable({ providedIn: 'root' })
export class CoordenadasResolve implements Resolve<ICoordenadas> {
    constructor(private service: CoordenadasService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Coordenadas> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Coordenadas>) => response.ok),
                map((coordenadas: HttpResponse<Coordenadas>) => coordenadas.body)
            );
        }
        return of(new Coordenadas());
    }
}

export const coordenadasRoute: Routes = [
    {
        path: 'coordenadas',
        component: CoordenadasComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.coordenadas.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'coordenadas/:id/view',
        component: CoordenadasDetailComponent,
        resolve: {
            coordenadas: CoordenadasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.coordenadas.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'coordenadas/new',
        component: CoordenadasUpdateComponent,
        resolve: {
            coordenadas: CoordenadasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.coordenadas.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'coordenadas/:id/edit',
        component: CoordenadasUpdateComponent,
        resolve: {
            coordenadas: CoordenadasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.coordenadas.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const coordenadasPopupRoute: Routes = [
    {
        path: 'coordenadas/:id/delete',
        component: CoordenadasDeletePopupComponent,
        resolve: {
            coordenadas: CoordenadasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.coordenadas.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

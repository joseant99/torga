import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Provincias } from 'app/shared/model/provincias.model';
import { ProvinciasService } from './provincias.service';
import { ProvinciasComponent } from './provincias.component';
import { ProvinciasDetailComponent } from './provincias-detail.component';
import { ProvinciasUpdateComponent } from './provincias-update.component';
import { ProvinciasDeletePopupComponent } from './provincias-delete-dialog.component';
import { IProvincias } from 'app/shared/model/provincias.model';

@Injectable({ providedIn: 'root' })
export class ProvinciasResolve implements Resolve<IProvincias> {
    constructor(private service: ProvinciasService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Provincias> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Provincias>) => response.ok),
                map((provincias: HttpResponse<Provincias>) => provincias.body)
            );
        }
        return of(new Provincias());
    }
}

export const provinciasRoute: Routes = [
    {
        path: 'provincias',
        component: ProvinciasComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.provincias.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'provincias/:id/view',
        component: ProvinciasDetailComponent,
        resolve: {
            provincias: ProvinciasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.provincias.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'provincias/new',
        component: ProvinciasUpdateComponent,
        resolve: {
            provincias: ProvinciasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.provincias.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'provincias/:id/edit',
        component: ProvinciasUpdateComponent,
        resolve: {
            provincias: ProvinciasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.provincias.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const provinciasPopupRoute: Routes = [
    {
        path: 'provincias/:id/delete',
        component: ProvinciasDeletePopupComponent,
        resolve: {
            provincias: ProvinciasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.provincias.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

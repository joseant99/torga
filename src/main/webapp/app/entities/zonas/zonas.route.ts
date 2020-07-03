import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Zonas } from 'app/shared/model/zonas.model';
import { ZonasService } from './zonas.service';
import { ZonasComponent } from './zonas.component';
import { ZonasDetailComponent } from './zonas-detail.component';
import { ZonasUpdateComponent } from './zonas-update.component';
import { ZonasDeletePopupComponent } from './zonas-delete-dialog.component';
import { IZonas } from 'app/shared/model/zonas.model';

@Injectable({ providedIn: 'root' })
export class ZonasResolve implements Resolve<IZonas> {
    constructor(private service: ZonasService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Zonas> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Zonas>) => response.ok),
                map((zonas: HttpResponse<Zonas>) => zonas.body)
            );
        }
        return of(new Zonas());
    }
}

export const zonasRoute: Routes = [
    {
        path: 'zonas',
        component: ZonasComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.zonas.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'zonas/:id/view',
        component: ZonasDetailComponent,
        resolve: {
            zonas: ZonasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.zonas.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'zonas/new',
        component: ZonasUpdateComponent,
        resolve: {
            zonas: ZonasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.zonas.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'zonas/:id/edit',
        component: ZonasUpdateComponent,
        resolve: {
            zonas: ZonasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.zonas.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const zonasPopupRoute: Routes = [
    {
        path: 'zonas/:id/delete',
        component: ZonasDeletePopupComponent,
        resolve: {
            zonas: ZonasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.zonas.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

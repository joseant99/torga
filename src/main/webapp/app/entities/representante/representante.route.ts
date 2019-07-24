import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Representante } from 'app/shared/model/representante.model';
import { RepresentanteService } from './representante.service';
import { RepresentanteComponent } from './representante.component';
import { RepresentanteDetailComponent } from './representante-detail.component';
import { RepresentanteUpdateComponent } from './representante-update.component';
import { RepresentanteDeletePopupComponent } from './representante-delete-dialog.component';
import { IRepresentante } from 'app/shared/model/representante.model';

@Injectable({ providedIn: 'root' })
export class RepresentanteResolve implements Resolve<IRepresentante> {
    constructor(private service: RepresentanteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Representante> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Representante>) => response.ok),
                map((representante: HttpResponse<Representante>) => representante.body)
            );
        }
        return of(new Representante());
    }
}

export const representanteRoute: Routes = [
    {
        path: 'representante',
        component: RepresentanteComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'torgaPedidosApp.representante.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'representante/:id/view',
        component: RepresentanteDetailComponent,
        resolve: {
            representante: RepresentanteResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'torgaPedidosApp.representante.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'representante/new',
        component: RepresentanteUpdateComponent,
        resolve: {
            representante: RepresentanteResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'torgaPedidosApp.representante.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'representante/:id/edit',
        component: RepresentanteUpdateComponent,
        resolve: {
            representante: RepresentanteResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'torgaPedidosApp.representante.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const representantePopupRoute: Routes = [
    {
        path: 'representante/:id/delete',
        component: RepresentanteDeletePopupComponent,
        resolve: {
            representante: RepresentanteResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'torgaPedidosApp.representante.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Transportistas } from 'app/shared/model/transportistas.model';
import { TransportistasService } from './transportistas.service';
import { TransportistasComponent } from './transportistas.component';
import { TransportistasDetailComponent } from './transportistas-detail.component';
import { TransportistasUpdateComponent } from './transportistas-update.component';
import { TransportistasDeletePopupComponent } from './transportistas-delete-dialog.component';
import { ITransportistas } from 'app/shared/model/transportistas.model';

@Injectable({ providedIn: 'root' })
export class TransportistasResolve implements Resolve<ITransportistas> {
    constructor(private service: TransportistasService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Transportistas> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Transportistas>) => response.ok),
                map((transportistas: HttpResponse<Transportistas>) => transportistas.body)
            );
        }
        return of(new Transportistas());
    }
}

export const transportistasRoute: Routes = [
    {
        path: 'transportistas',
        component: TransportistasComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'torgaPedidosApp.transportistas.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transportistas/:id/view',
        component: TransportistasDetailComponent,
        resolve: {
            transportistas: TransportistasResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'torgaPedidosApp.transportistas.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transportistas/new',
        component: TransportistasUpdateComponent,
        resolve: {
            transportistas: TransportistasResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'torgaPedidosApp.transportistas.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transportistas/:id/edit',
        component: TransportistasUpdateComponent,
        resolve: {
            transportistas: TransportistasResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'torgaPedidosApp.transportistas.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transportistasPopupRoute: Routes = [
    {
        path: 'transportistas/:id/delete',
        component: TransportistasDeletePopupComponent,
        resolve: {
            transportistas: TransportistasResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'torgaPedidosApp.transportistas.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

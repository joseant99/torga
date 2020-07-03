import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TransportistaTabla } from 'app/shared/model/transportista-tabla.model';
import { TransportistaTablaService } from './transportista-tabla.service';
import { TransportistaTablaComponent } from './transportista-tabla.component';
import { TransportistaTablaDetailComponent } from './transportista-tabla-detail.component';
import { TransportistaTablaUpdateComponent } from './transportista-tabla-update.component';
import { TransportistaTablaDeletePopupComponent } from './transportista-tabla-delete-dialog.component';
import { ITransportistaTabla } from 'app/shared/model/transportista-tabla.model';

@Injectable({ providedIn: 'root' })
export class TransportistaTablaResolve implements Resolve<ITransportistaTabla> {
    constructor(private service: TransportistaTablaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TransportistaTabla> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TransportistaTabla>) => response.ok),
                map((transportistaTabla: HttpResponse<TransportistaTabla>) => transportistaTabla.body)
            );
        }
        return of(new TransportistaTabla());
    }
}

export const transportistaTablaRoute: Routes = [
    {
        path: 'transportista-tabla',
        component: TransportistaTablaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.transportistaTabla.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transportista-tabla/:id/view',
        component: TransportistaTablaDetailComponent,
        resolve: {
            transportistaTabla: TransportistaTablaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.transportistaTabla.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transportista-tabla/new',
        component: TransportistaTablaUpdateComponent,
        resolve: {
            transportistaTabla: TransportistaTablaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.transportistaTabla.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transportista-tabla/:id/edit',
        component: TransportistaTablaUpdateComponent,
        resolve: {
            transportistaTabla: TransportistaTablaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.transportistaTabla.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transportistaTablaPopupRoute: Routes = [
    {
        path: 'transportista-tabla/:id/delete',
        component: TransportistaTablaDeletePopupComponent,
        resolve: {
            transportistaTabla: TransportistaTablaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.transportistaTabla.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

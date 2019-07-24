import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AcabadosComposicion } from 'app/shared/model/acabados-composicion.model';
import { AcabadosComposicionService } from './acabados-composicion.service';
import { AcabadosComposicionComponent } from './acabados-composicion.component';
import { AcabadosComposicionDetailComponent } from './acabados-composicion-detail.component';
import { AcabadosComposicionUpdateComponent } from './acabados-composicion-update.component';
import { AcabadosComposicionDeletePopupComponent } from './acabados-composicion-delete-dialog.component';
import { IAcabadosComposicion } from 'app/shared/model/acabados-composicion.model';

@Injectable({ providedIn: 'root' })
export class AcabadosComposicionResolve implements Resolve<IAcabadosComposicion> {
    constructor(private service: AcabadosComposicionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AcabadosComposicion> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<AcabadosComposicion>) => response.ok),
                map((acabadosComposicion: HttpResponse<AcabadosComposicion>) => acabadosComposicion.body)
            );
        }
        return of(new AcabadosComposicion());
    }
}

export const acabadosComposicionRoute: Routes = [
    {
        path: 'acabados-composicion',
        component: AcabadosComposicionComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.acabadosComposicion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'acabados-composicion/:id/view',
        component: AcabadosComposicionDetailComponent,
        resolve: {
            acabadosComposicion: AcabadosComposicionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.acabadosComposicion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'acabados-composicion/new',
        component: AcabadosComposicionUpdateComponent,
        resolve: {
            acabadosComposicion: AcabadosComposicionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.acabadosComposicion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'acabados-composicion/:id/edit',
        component: AcabadosComposicionUpdateComponent,
        resolve: {
            acabadosComposicion: AcabadosComposicionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.acabadosComposicion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const acabadosComposicionPopupRoute: Routes = [
    {
        path: 'acabados-composicion/:id/delete',
        component: AcabadosComposicionDeletePopupComponent,
        resolve: {
            acabadosComposicion: AcabadosComposicionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.acabadosComposicion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

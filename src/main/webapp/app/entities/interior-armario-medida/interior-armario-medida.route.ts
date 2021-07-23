import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { InteriorArmarioMedida } from 'app/shared/model/interior-armario-medida.model';
import { InteriorArmarioMedidaService } from './interior-armario-medida.service';
import { InteriorArmarioMedidaComponent } from './interior-armario-medida.component';
import { InteriorArmarioMedidaDetailComponent } from './interior-armario-medida-detail.component';
import { InteriorArmarioMedidaUpdateComponent } from './interior-armario-medida-update.component';
import { InteriorArmarioMedidaDeletePopupComponent } from './interior-armario-medida-delete-dialog.component';
import { IInteriorArmarioMedida } from 'app/shared/model/interior-armario-medida.model';

@Injectable({ providedIn: 'root' })
export class InteriorArmarioMedidaResolve implements Resolve<IInteriorArmarioMedida> {
    constructor(private service: InteriorArmarioMedidaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InteriorArmarioMedida> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<InteriorArmarioMedida>) => response.ok),
                map((interiorArmarioMedida: HttpResponse<InteriorArmarioMedida>) => interiorArmarioMedida.body)
            );
        }
        return of(new InteriorArmarioMedida());
    }
}

export const interiorArmarioMedidaRoute: Routes = [
    {
        path: 'interior-armario-medida',
        component: InteriorArmarioMedidaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.interiorArmarioMedida.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'interior-armario-medida/:id/view',
        component: InteriorArmarioMedidaDetailComponent,
        resolve: {
            interiorArmarioMedida: InteriorArmarioMedidaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.interiorArmarioMedida.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'interior-armario-medida/new',
        component: InteriorArmarioMedidaUpdateComponent,
        resolve: {
            interiorArmarioMedida: InteriorArmarioMedidaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.interiorArmarioMedida.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'interior-armario-medida/:id/edit',
        component: InteriorArmarioMedidaUpdateComponent,
        resolve: {
            interiorArmarioMedida: InteriorArmarioMedidaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.interiorArmarioMedida.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const interiorArmarioMedidaPopupRoute: Routes = [
    {
        path: 'interior-armario-medida/:id/delete',
        component: InteriorArmarioMedidaDeletePopupComponent,
        resolve: {
            interiorArmarioMedida: InteriorArmarioMedidaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.interiorArmarioMedida.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

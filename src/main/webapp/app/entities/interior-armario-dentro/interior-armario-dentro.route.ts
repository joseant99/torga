import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { InteriorArmarioDentro } from 'app/shared/model/interior-armario-dentro.model';
import { InteriorArmarioDentroService } from './interior-armario-dentro.service';
import { InteriorArmarioDentroComponent } from './interior-armario-dentro.component';
import { InteriorArmarioDentroDetailComponent } from './interior-armario-dentro-detail.component';
import { InteriorArmarioDentroUpdateComponent } from './interior-armario-dentro-update.component';
import { InteriorArmarioDentroDeletePopupComponent } from './interior-armario-dentro-delete-dialog.component';
import { IInteriorArmarioDentro } from 'app/shared/model/interior-armario-dentro.model';

@Injectable({ providedIn: 'root' })
export class InteriorArmarioDentroResolve implements Resolve<IInteriorArmarioDentro> {
    constructor(private service: InteriorArmarioDentroService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InteriorArmarioDentro> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<InteriorArmarioDentro>) => response.ok),
                map((interiorArmarioDentro: HttpResponse<InteriorArmarioDentro>) => interiorArmarioDentro.body)
            );
        }
        return of(new InteriorArmarioDentro());
    }
}

export const interiorArmarioDentroRoute: Routes = [
    {
        path: 'interior-armario-dentro',
        component: InteriorArmarioDentroComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.interiorArmarioDentro.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'interior-armario-dentro/:id/view',
        component: InteriorArmarioDentroDetailComponent,
        resolve: {
            interiorArmarioDentro: InteriorArmarioDentroResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.interiorArmarioDentro.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'interior-armario-dentro/new',
        component: InteriorArmarioDentroUpdateComponent,
        resolve: {
            interiorArmarioDentro: InteriorArmarioDentroResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.interiorArmarioDentro.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'interior-armario-dentro/:id/edit',
        component: InteriorArmarioDentroUpdateComponent,
        resolve: {
            interiorArmarioDentro: InteriorArmarioDentroResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.interiorArmarioDentro.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const interiorArmarioDentroPopupRoute: Routes = [
    {
        path: 'interior-armario-dentro/:id/delete',
        component: InteriorArmarioDentroDeletePopupComponent,
        resolve: {
            interiorArmarioDentro: InteriorArmarioDentroResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.interiorArmarioDentro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Armario } from 'app/shared/model/armario.model';
import { ArmarioService } from './armario.service';
import { ArmarioComponent } from './armario.component';
import { ArmarioDetailComponent } from './armario-detail.component';
import { ArmarioUpdateComponent } from './armario-update.component';
import { ArmarioDeletePopupComponent } from './armario-delete-dialog.component';
import { IArmario } from 'app/shared/model/armario.model';

@Injectable({ providedIn: 'root' })
export class ArmarioResolve implements Resolve<IArmario> {
    constructor(private service: ArmarioService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Armario> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Armario>) => response.ok),
                map((armario: HttpResponse<Armario>) => armario.body)
            );
        }
        return of(new Armario());
    }
}

export const armarioRoute: Routes = [
    {
        path: 'armario',
        component: ArmarioComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.armario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'armario/:id/view',
        component: ArmarioDetailComponent,
        resolve: {
            armario: ArmarioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.armario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'armario/new',
        component: ArmarioUpdateComponent,
        resolve: {
            armario: ArmarioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.armario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'armario/:id/edit',
        component: ArmarioUpdateComponent,
        resolve: {
            armario: ArmarioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.armario.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const armarioPopupRoute: Routes = [
    {
        path: 'armario/:id/delete',
        component: ArmarioDeletePopupComponent,
        resolve: {
            armario: ArmarioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.armario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

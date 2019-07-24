import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Categorias_Dormitorio } from 'app/shared/model/categorias-dormitorio.model';
import { Categorias_DormitorioService } from './categorias-dormitorio.service';
import { Categorias_DormitorioComponent } from './categorias-dormitorio.component';
import { Categorias_DormitorioDetailComponent } from './categorias-dormitorio-detail.component';
import { Categorias_DormitorioUpdateComponent } from './categorias-dormitorio-update.component';
import { Categorias_DormitorioDeletePopupComponent } from './categorias-dormitorio-delete-dialog.component';
import { ICategorias_Dormitorio } from 'app/shared/model/categorias-dormitorio.model';

@Injectable({ providedIn: 'root' })
export class Categorias_DormitorioResolve implements Resolve<ICategorias_Dormitorio> {
    constructor(private service: Categorias_DormitorioService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Categorias_Dormitorio> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Categorias_Dormitorio>) => response.ok),
                map((categorias_Dormitorio: HttpResponse<Categorias_Dormitorio>) => categorias_Dormitorio.body)
            );
        }
        return of(new Categorias_Dormitorio());
    }
}

export const categorias_DormitorioRoute: Routes = [
    {
        path: 'categorias-dormitorio',
        component: Categorias_DormitorioComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.categorias_Dormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'categorias-dormitorio/:id/view',
        component: Categorias_DormitorioDetailComponent,
        resolve: {
            categorias_Dormitorio: Categorias_DormitorioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.categorias_Dormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'categorias-dormitorio/new',
        component: Categorias_DormitorioUpdateComponent,
        resolve: {
            categorias_Dormitorio: Categorias_DormitorioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.categorias_Dormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'categorias-dormitorio/:id/edit',
        component: Categorias_DormitorioUpdateComponent,
        resolve: {
            categorias_Dormitorio: Categorias_DormitorioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.categorias_Dormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const categorias_DormitorioPopupRoute: Routes = [
    {
        path: 'categorias-dormitorio/:id/delete',
        component: Categorias_DormitorioDeletePopupComponent,
        resolve: {
            categorias_Dormitorio: Categorias_DormitorioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.categorias_Dormitorio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

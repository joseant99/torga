import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RepresenTorga } from 'app/shared/model/represen-torga.model';
import { RepresenTorgaService } from './represen-torga.service';
import { RepresenTorgaComponent } from './represen-torga.component';
import { RepresenTorgaDetailComponent } from './represen-torga-detail.component';
import { RepresenTorgaUpdateComponent } from './represen-torga-update.component';
import { RepresenTorgaDeletePopupComponent } from './represen-torga-delete-dialog.component';
import { IRepresenTorga } from 'app/shared/model/represen-torga.model';

@Injectable({ providedIn: 'root' })
export class RepresenTorgaResolve implements Resolve<IRepresenTorga> {
    constructor(private service: RepresenTorgaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RepresenTorga> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<RepresenTorga>) => response.ok),
                map((represenTorga: HttpResponse<RepresenTorga>) => represenTorga.body)
            );
        }
        return of(new RepresenTorga());
    }
}

export const represenTorgaRoute: Routes = [
    {
        path: 'represen-torga',
        component: RepresenTorgaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.represenTorga.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'represen-torga/:id/view',
        component: RepresenTorgaDetailComponent,
        resolve: {
            represenTorga: RepresenTorgaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.represenTorga.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'represen-torga/new',
        component: RepresenTorgaUpdateComponent,
        resolve: {
            represenTorga: RepresenTorgaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.represenTorga.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'represen-torga/:id/edit',
        component: RepresenTorgaUpdateComponent,
        resolve: {
            represenTorga: RepresenTorgaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.represenTorga.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const represenTorgaPopupRoute: Routes = [
    {
        path: 'represen-torga/:id/delete',
        component: RepresenTorgaDeletePopupComponent,
        resolve: {
            represenTorga: RepresenTorgaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.represenTorga.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

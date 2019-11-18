import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Casco } from 'app/shared/model/casco.model';
import { CascoService } from './casco.service';
import { CascoComponent } from './casco.component';
import { CascoDetailComponent } from './casco-detail.component';
import { CascoUpdateComponent } from './casco-update.component';
import { CascoDeletePopupComponent } from './casco-delete-dialog.component';
import { ICasco } from 'app/shared/model/casco.model';

@Injectable({ providedIn: 'root' })
export class CascoResolve implements Resolve<ICasco> {
    constructor(private service: CascoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Casco> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Casco>) => response.ok),
                map((casco: HttpResponse<Casco>) => casco.body)
            );
        }
        return of(new Casco());
    }
}

export const cascoRoute: Routes = [
    {
        path: 'casco',
        component: CascoComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.casco.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'casco/:id/view',
        component: CascoDetailComponent,
        resolve: {
            casco: CascoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.casco.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'casco/new',
        component: CascoUpdateComponent,
        resolve: {
            casco: CascoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.casco.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'casco/:id/edit',
        component: CascoUpdateComponent,
        resolve: {
            casco: CascoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.casco.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cascoPopupRoute: Routes = [
    {
        path: 'casco/:id/delete',
        component: CascoDeletePopupComponent,
        resolve: {
            casco: CascoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.casco.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AcaProd } from 'app/shared/model/aca-prod.model';
import { AcaProdService } from './aca-prod.service';
import { AcaProdComponent } from './aca-prod.component';
import { AcaProdDetailComponent } from './aca-prod-detail.component';
import { AcaProdUpdateComponent } from './aca-prod-update.component';
import { AcaProdDeletePopupComponent } from './aca-prod-delete-dialog.component';
import { IAcaProd } from 'app/shared/model/aca-prod.model';

@Injectable({ providedIn: 'root' })
export class AcaProdResolve implements Resolve<IAcaProd> {
    constructor(private service: AcaProdService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AcaProd> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<AcaProd>) => response.ok),
                map((acaProd: HttpResponse<AcaProd>) => acaProd.body)
            );
        }
        return of(new AcaProd());
    }
}

export const acaProdRoute: Routes = [
    {
        path: 'aca-prod',
        component: AcaProdComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.acaProd.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'aca-prod/:id/view',
        component: AcaProdDetailComponent,
        resolve: {
            acaProd: AcaProdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.acaProd.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'aca-prod/new',
        component: AcaProdUpdateComponent,
        resolve: {
            acaProd: AcaProdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.acaProd.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'aca-prod/:id/edit',
        component: AcaProdUpdateComponent,
        resolve: {
            acaProd: AcaProdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.acaProd.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const acaProdPopupRoute: Routes = [
    {
        path: 'aca-prod/:id/delete',
        component: AcaProdDeletePopupComponent,
        resolve: {
            acaProd: AcaProdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.acaProd.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

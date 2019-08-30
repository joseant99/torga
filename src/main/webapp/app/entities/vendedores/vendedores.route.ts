import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Vendedores } from 'app/shared/model/vendedores.model';
import { VendedoresService } from './vendedores.service';
import { VendedoresComponent } from './vendedores.component';
import { VendedoresUsuarioComponent } from './vendedores-usuario.component';
import { VendedoresDetailComponent } from './vendedores-detail.component';
import { VendedoresUpdateComponent } from './vendedores-update.component';
import { VendedoresDeletePopupComponent } from './vendedores-delete-dialog.component';
import { IVendedores } from 'app/shared/model/vendedores.model';

@Injectable({ providedIn: 'root' })
export class VendedoresResolve implements Resolve<IVendedores> {
    constructor(private service: VendedoresService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Vendedores> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Vendedores>) => response.ok),
                map((vendedores: HttpResponse<Vendedores>) => vendedores.body)
            );
        }
        return of(new Vendedores());
    }
}

export const vendedoresRoute: Routes = [
    {
        path: 'vendedores',
        component: VendedoresComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.vendedores.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vendedores-usuario',
        component: VendedoresUsuarioComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.vendedores.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vendedores/:id/view',
        component: VendedoresDetailComponent,
        resolve: {
            vendedores: VendedoresResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.vendedores.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vendedores/new',
        component: VendedoresUpdateComponent,
        resolve: {
            vendedores: VendedoresResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.vendedores.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vendedores/:id/edit',
        component: VendedoresUpdateComponent,
        resolve: {
            vendedores: VendedoresResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.vendedores.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vendedoresPopupRoute: Routes = [
    {
        path: 'vendedores/:id/delete',
        component: VendedoresDeletePopupComponent,
        resolve: {
            vendedores: VendedoresResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.vendedores.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

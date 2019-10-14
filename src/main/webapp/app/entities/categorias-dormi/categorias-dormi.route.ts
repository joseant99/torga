import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CategoriasDormi } from 'app/shared/model/categorias-dormi.model';
import { CategoriasDormiService } from './categorias-dormi.service';
import { CategoriasDormiComponent } from './categorias-dormi.component';
import { ProductosPrecioComponent } from './productos-precio.component';
import { CategoriasDormiFormularioComponent } from './categorias-dormi-formulario.component';
import { CategoriasDormiDetailComponent } from './categorias-dormi-detail.component';
import { CategoriasDormiUpdateComponent } from './categorias-dormi-update.component';
import { CategoriasDormiDeletePopupComponent } from './categorias-dormi-delete-dialog.component';
import { ICategoriasDormi } from 'app/shared/model/categorias-dormi.model';

@Injectable({ providedIn: 'root' })
export class CategoriasDormiResolve implements Resolve<ICategoriasDormi> {
    constructor(private service: CategoriasDormiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CategoriasDormi> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CategoriasDormi>) => response.ok),
                map((categoriasDormi: HttpResponse<CategoriasDormi>) => categoriasDormi.body)
            );
        }
        return of(new CategoriasDormi());
    }
}

export const categoriasDormiRoute: Routes = [
    {
        path: 'categorias-dormi',
        component: CategoriasDormiComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.categoriasDormi.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-precio',
        component: ProductosPrecioComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.categoriasDormi.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'categorias-dormi/formulario',
        component: CategoriasDormiFormularioComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.categoriasDormi.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'categorias-dormi/:id/view',
        component: CategoriasDormiDetailComponent,
        resolve: {
            categoriasDormi: CategoriasDormiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.categoriasDormi.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'categorias-dormi/new',
        component: CategoriasDormiUpdateComponent,
        resolve: {
            categoriasDormi: CategoriasDormiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.categoriasDormi.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'categorias-dormi/:id/edit',
        component: CategoriasDormiUpdateComponent,
        resolve: {
            categoriasDormi: CategoriasDormiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.categoriasDormi.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const categoriasDormiPopupRoute: Routes = [
    {
        path: 'categorias-dormi/:id/delete',
        component: CategoriasDormiDeletePopupComponent,
        resolve: {
            categoriasDormi: CategoriasDormiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.categoriasDormi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { ProductosDormitorioService } from './productos-dormitorio.service';
import { ProductosDormitorioComponent } from './productos-dormitorio.component';
import { ProductosColgantesComponent } from './productos-colgantes.component';
import { ArmariosDormitorioComponent } from './armarios-dormitorio.component';
import { ProductosDormitorioDetailComponent } from './productos-dormitorio-detail.component';
import { ProductosDormitorioCategoriaComponent } from './productos-dormitorio-categoria.component';
import { ProductosDormitorioChinfonierComponent } from './productos-dormitorio-chinfonier.component';
import { ProductosDormitorioCabecerosComponent } from './productos-dormitorio-cabeceros.component';
import { ProductosDormitorioApoyoComponent } from './productos-dormitorio-apoyo.component';
import { ProductosDormitorioCanapeComponent } from './productos-dormitorio-canape.component';
import { ProductosModulosBajosComponent } from './productos-modulos-bajos.component';
import { ProductosColgantesEstanteriaComponent } from './productos-colgantes-estanteria.component';
import { ProductosEscritoriosComponent } from './productos-escritorios.component';
import { ProductosMesasComponent } from './productos-mesas.component';
import { ProductosAuxComponent } from './productos-aux.component';
import { ProductosComodaComponent } from './productos-comoda.component';
import { ProductosVitrinasComponent } from './productos-vitrinas.component';
import { ProductosPanelesComponent } from './productos-paneles.component';
import { ProductosSuplementosTvComponent } from './productos-suplementos-tv.component';
import { ProductosAparadoresComponent } from './productos-aparadores.component';
import { ProductosColgantesEstantesComponent } from './productos-colgantes-estantes.component';
import { ProductosColgantesHorizontalesComponent } from './productos-colgantes-horizontales.component';
import { ProductosSingularesComponent } from './productos-singulares.component';
import { ProductosBuscadorComponent } from './productos-buscador.component';
import { ProductosEditarComponent } from './productos-editar.component';
import { ProductosDormitorioUpdateComponent } from './productos-dormitorio-update.component';
import { ProductosDormitorioDeletePopupComponent } from './productos-dormitorio-delete-dialog.component';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';

@Injectable({ providedIn: 'root' })
export class ProductosDormitorioResolve implements Resolve<IProductosDormitorio> {
    constructor(private service: ProductosDormitorioService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductosDormitorio> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ProductosDormitorio>) => response.ok),
                map((productosDormitorio: HttpResponse<ProductosDormitorio>) => productosDormitorio.body)
            );
        }
        return of(new ProductosDormitorio());
    }
}

export const productosDormitorioRoute: Routes = [
    {
        path: 'productos-dormitorio',
        component: ProductosDormitorioComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'armarios-dormitorio',
        component: ArmariosDormitorioComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE', 'ROLE_REPRESENTATE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-modulos-bajos',
        component: ProductosModulosBajosComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE', 'ROLE_REPRESENTATE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-comoda',
        component: ProductosComodaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE', 'ROLE_REPRESENTATE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-aux',
        component: ProductosAuxComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE', 'ROLE_REPRESENTATE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-mesas',
        component: ProductosMesasComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE', 'ROLE_REPRESENTATE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-paneles',
        component: ProductosPanelesComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE', 'ROLE_REPRESENTATE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-suplementos-tv',
        component: ProductosSuplementosTvComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE', 'ROLE_REPRESENTATE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-colgantes-horizontales',
        component: ProductosColgantesHorizontalesComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE', 'ROLE_REPRESENTATE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-colgantes-estanteria',
        component: ProductosColgantesEstanteriaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE', 'ROLE_REPRESENTATE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-colgantes-estantes',
        component: ProductosColgantesEstantesComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE', 'ROLE_REPRESENTATE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-escritorios',
        component: ProductosEscritoriosComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE', 'ROLE_REPRESENTATE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-vitrinas',
        component: ProductosVitrinasComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE', 'ROLE_REPRESENTATE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-colgadores',
        component: ProductosColgantesComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE', 'ROLE_REPRESENTATE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-editar',
        component: ProductosEditarComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE', 'ROLE_REPRESENTATE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-buscador',
        component: ProductosBuscadorComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE', 'ROLE_REPRESENTATE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-singulares',
        component: ProductosSingularesComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE', 'ROLE_REPRESENTATE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-aparadores',
        component: ProductosAparadoresComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE', 'ROLE_REPRESENTATE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-dormitorio/categoria/:id',
        component: ProductosDormitorioCategoriaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE', 'ROLE_REPRESENTATE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-dormitorio/apoyo',
        component: ProductosDormitorioApoyoComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE', 'ROLE_REPRESENTATE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-dormitorio/canape',
        component: ProductosDormitorioCanapeComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE', 'ROLE_REPRESENTATE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-dormitorio/chinfonier',
        component: ProductosDormitorioChinfonierComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE', 'ROLE_REPRESENTATE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-dormitorio/cabeceros',
        component: ProductosDormitorioCabecerosComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE', 'ROLE_REPRESENTATE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-dormitorio/:id/view',
        component: ProductosDormitorioDetailComponent,
        resolve: {
            productosDormitorio: ProductosDormitorioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-dormitorio/new',
        component: ProductosDormitorioUpdateComponent,
        resolve: {
            productosDormitorio: ProductosDormitorioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'productos-dormitorio/:id/edit',
        component: ProductosDormitorioUpdateComponent,
        resolve: {
            productosDormitorio: ProductosDormitorioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productosDormitorioPopupRoute: Routes = [
    {
        path: 'productos-dormitorio/:id/delete',
        component: ProductosDormitorioDeletePopupComponent,
        resolve: {
            productosDormitorio: ProductosDormitorioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.productosDormitorio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

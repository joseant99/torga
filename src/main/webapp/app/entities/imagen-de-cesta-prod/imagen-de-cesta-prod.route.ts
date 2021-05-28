import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ImagenDeCestaProd } from 'app/shared/model/imagen-de-cesta-prod.model';
import { ImagenDeCestaProdService } from './imagen-de-cesta-prod.service';
import { ImagenDeCestaProdComponent } from './imagen-de-cesta-prod.component';
import { ImagenDeCestaProdDetailComponent } from './imagen-de-cesta-prod-detail.component';
import { ImagenDeCestaProdUpdateComponent } from './imagen-de-cesta-prod-update.component';
import { ImagenDeCestaProdDeletePopupComponent } from './imagen-de-cesta-prod-delete-dialog.component';
import { IImagenDeCestaProd } from 'app/shared/model/imagen-de-cesta-prod.model';

@Injectable({ providedIn: 'root' })
export class ImagenDeCestaProdResolve implements Resolve<IImagenDeCestaProd> {
    constructor(private service: ImagenDeCestaProdService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ImagenDeCestaProd> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ImagenDeCestaProd>) => response.ok),
                map((imagenDeCestaProd: HttpResponse<ImagenDeCestaProd>) => imagenDeCestaProd.body)
            );
        }
        return of(new ImagenDeCestaProd());
    }
}

export const imagenDeCestaProdRoute: Routes = [
    {
        path: 'imagen-de-cesta-prod',
        component: ImagenDeCestaProdComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.imagenDeCestaProd.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'imagen-de-cesta-prod/:id/view',
        component: ImagenDeCestaProdDetailComponent,
        resolve: {
            imagenDeCestaProd: ImagenDeCestaProdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.imagenDeCestaProd.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'imagen-de-cesta-prod/new',
        component: ImagenDeCestaProdUpdateComponent,
        resolve: {
            imagenDeCestaProd: ImagenDeCestaProdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.imagenDeCestaProd.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'imagen-de-cesta-prod/:id/edit',
        component: ImagenDeCestaProdUpdateComponent,
        resolve: {
            imagenDeCestaProd: ImagenDeCestaProdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.imagenDeCestaProd.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const imagenDeCestaProdPopupRoute: Routes = [
    {
        path: 'imagen-de-cesta-prod/:id/delete',
        component: ImagenDeCestaProdDeletePopupComponent,
        resolve: {
            imagenDeCestaProd: ImagenDeCestaProdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.imagenDeCestaProd.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

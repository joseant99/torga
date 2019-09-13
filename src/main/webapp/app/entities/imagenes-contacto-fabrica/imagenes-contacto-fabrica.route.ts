import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ImagenesContactoFabrica } from 'app/shared/model/imagenes-contacto-fabrica.model';
import { ImagenesContactoFabricaService } from './imagenes-contacto-fabrica.service';
import { ImagenesContactoFabricaComponent } from './imagenes-contacto-fabrica.component';
import { ImagenesContactoFabricaDetailComponent } from './imagenes-contacto-fabrica-detail.component';
import { ImagenesContactoFabricaUpdateComponent } from './imagenes-contacto-fabrica-update.component';
import { ImagenesContactoFabricaDeletePopupComponent } from './imagenes-contacto-fabrica-delete-dialog.component';
import { IImagenesContactoFabrica } from 'app/shared/model/imagenes-contacto-fabrica.model';

@Injectable({ providedIn: 'root' })
export class ImagenesContactoFabricaResolve implements Resolve<IImagenesContactoFabrica> {
    constructor(private service: ImagenesContactoFabricaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ImagenesContactoFabrica> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ImagenesContactoFabrica>) => response.ok),
                map((imagenesContactoFabrica: HttpResponse<ImagenesContactoFabrica>) => imagenesContactoFabrica.body)
            );
        }
        return of(new ImagenesContactoFabrica());
    }
}

export const imagenesContactoFabricaRoute: Routes = [
    {
        path: 'imagenes-contacto-fabrica',
        component: ImagenesContactoFabricaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.imagenesContactoFabrica.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'imagenes-contacto-fabrica/:id/view',
        component: ImagenesContactoFabricaDetailComponent,
        resolve: {
            imagenesContactoFabrica: ImagenesContactoFabricaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.imagenesContactoFabrica.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'imagenes-contacto-fabrica/new',
        component: ImagenesContactoFabricaUpdateComponent,
        resolve: {
            imagenesContactoFabrica: ImagenesContactoFabricaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.imagenesContactoFabrica.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'imagenes-contacto-fabrica/:id/edit',
        component: ImagenesContactoFabricaUpdateComponent,
        resolve: {
            imagenesContactoFabrica: ImagenesContactoFabricaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.imagenesContactoFabrica.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const imagenesContactoFabricaPopupRoute: Routes = [
    {
        path: 'imagenes-contacto-fabrica/:id/delete',
        component: ImagenesContactoFabricaDeletePopupComponent,
        resolve: {
            imagenesContactoFabrica: ImagenesContactoFabricaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.imagenesContactoFabrica.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DatosUsuario } from 'app/shared/model/datos-usuario.model';
import { DatosUsuarioService } from './datos-usuario.service';
import { DatosUsuarioComponent } from './datos-usuario.component';
import { DatosGeneralesComponent } from './datos-generales.component';
import { DatosUsuarioDetailComponent } from './datos-usuario-detail.component';
import { DatosUsuarioUpdateComponent } from './datos-usuario-update.component';
DatosGeneralesComponent;
import { DatosUsuarioDeletePopupComponent } from './datos-usuario-delete-dialog.component';
import { IDatosUsuario } from 'app/shared/model/datos-usuario.model';

@Injectable({ providedIn: 'root' })
export class DatosUsuarioResolve implements Resolve<IDatosUsuario> {
    constructor(private service: DatosUsuarioService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DatosUsuario> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DatosUsuario>) => response.ok),
                map((datosUsuario: HttpResponse<DatosUsuario>) => datosUsuario.body)
            );
        }
        return of(new DatosUsuario());
    }
}

export const datosUsuarioRoute: Routes = [
    {
        path: 'datos-usuario',
        component: DatosUsuarioComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.datosUsuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'datos-generales',
        component: DatosGeneralesComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.datosUsuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'datos-usuario/:id/view',
        component: DatosUsuarioDetailComponent,
        resolve: {
            datosUsuario: DatosUsuarioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.datosUsuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'datos-usuario/new',
        component: DatosUsuarioUpdateComponent,
        resolve: {
            datosUsuario: DatosUsuarioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.datosUsuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'datos-usuario/:id/edit',
        component: DatosUsuarioUpdateComponent,
        resolve: {
            datosUsuario: DatosUsuarioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.datosUsuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const datosUsuarioPopupRoute: Routes = [
    {
        path: 'datos-usuario/:id/delete',
        component: DatosUsuarioDeletePopupComponent,
        resolve: {
            datosUsuario: DatosUsuarioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.datosUsuario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

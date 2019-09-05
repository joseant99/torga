import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DatosCliente } from 'app/shared/model/datos-cliente.model';
import { DatosClienteService } from './datos-cliente.service';
import { DatosClienteComponent } from './datos-cliente.component';
import { DatosClienteDetailComponent } from './datos-cliente-detail.component';
import { DatosClienteUpdateComponent } from './datos-cliente-update.component';
import { DatosClienteDeletePopupComponent } from './datos-cliente-delete-dialog.component';
import { IDatosCliente } from 'app/shared/model/datos-cliente.model';

@Injectable({ providedIn: 'root' })
export class DatosClienteResolve implements Resolve<IDatosCliente> {
    constructor(private service: DatosClienteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DatosCliente> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DatosCliente>) => response.ok),
                map((datosCliente: HttpResponse<DatosCliente>) => datosCliente.body)
            );
        }
        return of(new DatosCliente());
    }
}

export const datosClienteRoute: Routes = [
    {
        path: 'datos-cliente',
        component: DatosClienteComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.datosCliente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'datos-cliente/:id/view',
        component: DatosClienteDetailComponent,
        resolve: {
            datosCliente: DatosClienteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.datosCliente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'datos-cliente/new',
        component: DatosClienteUpdateComponent,
        resolve: {
            datosCliente: DatosClienteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.datosCliente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'datos-cliente/:id/edit',
        component: DatosClienteUpdateComponent,
        resolve: {
            datosCliente: DatosClienteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.datosCliente.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const datosClientePopupRoute: Routes = [
    {
        path: 'datos-cliente/:id/delete',
        component: DatosClienteDeletePopupComponent,
        resolve: {
            datosCliente: DatosClienteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.datosCliente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

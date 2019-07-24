import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Cliente } from 'app/shared/model/cliente.model';
import { ClienteService } from './cliente.service';
import { ClienteComponent } from './cliente.component';
import { ClienteDetailComponent } from './cliente-detail.component';
import { ClienteUpdateComponent } from './cliente-update.component';
import { ClienteDeletePopupComponent } from './cliente-delete-dialog.component';
import { ICliente } from 'app/shared/model/cliente.model';

@Injectable({ providedIn: 'root' })
export class ClienteResolve implements Resolve<ICliente> {
    constructor(private service: ClienteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cliente> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Cliente>) => response.ok),
                map((cliente: HttpResponse<Cliente>) => cliente.body)
            );
        }
        return of(new Cliente());
    }
}

export const clienteRoute: Routes = [
    {
        path: 'cliente',
        component: ClienteComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.cliente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cliente/:id/view',
        component: ClienteDetailComponent,
        resolve: {
            cliente: ClienteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.cliente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cliente/new',
        component: ClienteUpdateComponent,
        resolve: {
            cliente: ClienteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.cliente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cliente/:id/edit',
        component: ClienteUpdateComponent,
        resolve: {
            cliente: ClienteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.cliente.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const clientePopupRoute: Routes = [
    {
        path: 'cliente/:id/delete',
        component: ClienteDeletePopupComponent,
        resolve: {
            cliente: ClienteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.cliente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

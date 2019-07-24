import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ReferenciaClientes } from 'app/shared/model/referencia-clientes.model';
import { ReferenciaClientesService } from './referencia-clientes.service';
import { ReferenciaClientesComponent } from './referencia-clientes.component';
import { ReferenciaClientesDetailComponent } from './referencia-clientes-detail.component';
import { ReferenciaClientesUpdateComponent } from './referencia-clientes-update.component';
import { ReferenciaClientesDeletePopupComponent } from './referencia-clientes-delete-dialog.component';
import { IReferenciaClientes } from 'app/shared/model/referencia-clientes.model';

@Injectable({ providedIn: 'root' })
export class ReferenciaClientesResolve implements Resolve<IReferenciaClientes> {
    constructor(private service: ReferenciaClientesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ReferenciaClientes> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ReferenciaClientes>) => response.ok),
                map((referenciaClientes: HttpResponse<ReferenciaClientes>) => referenciaClientes.body)
            );
        }
        return of(new ReferenciaClientes());
    }
}

export const referenciaClientesRoute: Routes = [
    {
        path: 'referencia-clientes',
        component: ReferenciaClientesComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'torgaPedidosApp.referenciaClientes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'referencia-clientes/:id/view',
        component: ReferenciaClientesDetailComponent,
        resolve: {
            referenciaClientes: ReferenciaClientesResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'torgaPedidosApp.referenciaClientes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'referencia-clientes/new',
        component: ReferenciaClientesUpdateComponent,
        resolve: {
            referenciaClientes: ReferenciaClientesResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'torgaPedidosApp.referenciaClientes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'referencia-clientes/:id/edit',
        component: ReferenciaClientesUpdateComponent,
        resolve: {
            referenciaClientes: ReferenciaClientesResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'torgaPedidosApp.referenciaClientes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const referenciaClientesPopupRoute: Routes = [
    {
        path: 'referencia-clientes/:id/delete',
        component: ReferenciaClientesDeletePopupComponent,
        resolve: {
            referenciaClientes: ReferenciaClientesResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'torgaPedidosApp.referenciaClientes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

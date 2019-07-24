import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Cliente } from 'app/shared/model/cliente.model';
import { ICliente } from 'app/shared/model/cliente.model';
import { VistaClienteComponent } from './vista-cliente.component';
import { VistaClienteService } from './vista-cliente.service';

@Injectable({ providedIn: 'root' })
export class VistaClienteResolve {
    constructor(private service: VistaClienteService) {}
}

export const vistaclienteRoute: Routes = [
    {
        path: 'clientetorga',
        component: VistaClienteComponent,
        data: {
            authorities: ['ROLE_CLIENTE'],
            pageTitle: 'torgaPedidosApp.cliente.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
    // {
    //     path: 'cliente/:id/view',
    //     component: ClienteDetailComponent,
    //     resolve: {
    //         cliente: ClienteResolve
    //     },
    //     data: {
    //         authorities: ['ROLE_USER', 'ROLE_CLIENTE'],
    //         pageTitle: 'torgaPedidosApp.cliente.home.title'
    //     },
    //     canActivate: [UserRouteAccessService]
    // },
    // {
    //     path: 'cliente/new',
    //     component: ClienteUpdateComponent,
    //     resolve: {
    //         cliente: ClienteResolve
    //     },
    //     data: {
    //         authorities: ['ROLE_USER', 'ROLE_CLIENTE'],
    //         pageTitle: 'torgaPedidosApp.cliente.home.title'
    //     },
    //     canActivate: [UserRouteAccessService]
    // },
    // {
    //     path: 'cliente/:id/edit',
    //     component: ClienteUpdateComponent,
    //     resolve: {
    //         cliente: ClienteResolve
    //     },
    //     data: {
    //         authorities: ['ROLE_USER', 'ROLE_CLIENTE'],
    //         pageTitle: 'torgaPedidosApp.cliente.home.title'
    //     },
    //     canActivate: [UserRouteAccessService]
    // }
];

// export const clientePopupRoute: Routes = [
//     {
//         path: 'cliente/:id/delete',
//         component: ClienteDeletePopupComponent,
//         resolve: {
//             cliente: ClienteResolve
//         },
//         data: {
//             authorities: ['ROLE_USER', 'ROLE_CLIENTE'],
//             pageTitle: 'torgaPedidosApp.cliente.home.title'
//         },
//         canActivate: [UserRouteAccessService],
//         outlet: 'popup'
//     }
// ];

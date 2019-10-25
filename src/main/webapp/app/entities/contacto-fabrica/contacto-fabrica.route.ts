import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ContactoFabrica } from 'app/shared/model/contacto-fabrica.model';
import { ContactoFabricaService } from './contacto-fabrica.service';
import { ContactoFabricaComponent } from './contacto-fabrica.component';
import { ContactoChatComponent } from './contacto-chat.component';
import { ContactoProyectosComponent } from './contacto-proyectos.component';
import { ContactoIncidenciasComponent } from './contacto-incidencias.component';
import { ContactoPresupuestosComponent } from './contacto-presupuestos.component';
import { ContactoSugerenciasComponent } from './contacto-sugerencias.component';
import { ContactoPedidosComponent } from './contacto-pedidos.component';
import { ContactoFabricaClientesComponent } from './contacto-fabrica-clientes.component';
import { ContactoFabricaDetailComponent } from './contacto-fabrica-detail.component';
import { ContactoFabricaUpdateComponent } from './contacto-fabrica-update.component';
import { ContactoFabricaDeletePopupComponent } from './contacto-fabrica-delete-dialog.component';
import { IContactoFabrica } from 'app/shared/model/contacto-fabrica.model';

@Injectable({ providedIn: 'root' })
export class ContactoFabricaResolve implements Resolve<IContactoFabrica> {
    constructor(private service: ContactoFabricaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ContactoFabrica> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ContactoFabrica>) => response.ok),
                map((contactoFabrica: HttpResponse<ContactoFabrica>) => contactoFabrica.body)
            );
        }
        return of(new ContactoFabrica());
    }
}

export const contactoFabricaRoute: Routes = [
    {
        path: 'contacto-fabrica',
        component: ContactoFabricaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.contactoFabrica.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contacto-fabrica-clientes',
        component: ContactoFabricaClientesComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.contactoFabrica.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contacto-sugerencias',
        component: ContactoSugerenciasComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.contactoFabrica.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contacto-pedidos',
        component: ContactoPedidosComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.contactoFabrica.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contacto-presupuestos',
        component: ContactoPresupuestosComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_CLIENTE'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.contactoFabrica.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contacto-incidencias',
        component: ContactoIncidenciasComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.contactoFabrica.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contacto-proyectos',
        component: ContactoProyectosComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.contactoFabrica.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contacto-fabrica/:id/view',
        component: ContactoFabricaDetailComponent,
        resolve: {
            contactoFabrica: ContactoFabricaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.contactoFabrica.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contacto-fabrica/:id/chat',
        component: ContactoChatComponent,
        resolve: {
            contactoFabrica: ContactoFabricaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.contactoFabrica.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contacto-fabrica/new',
        component: ContactoFabricaUpdateComponent,
        resolve: {
            contactoFabrica: ContactoFabricaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.contactoFabrica.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contacto-fabrica/:id/edit',
        component: ContactoFabricaUpdateComponent,
        resolve: {
            contactoFabrica: ContactoFabricaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.contactoFabrica.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contactoFabricaPopupRoute: Routes = [
    {
        path: 'contacto-fabrica/:id/delete',
        component: ContactoFabricaDeletePopupComponent,
        resolve: {
            contactoFabrica: ContactoFabricaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.contactoFabrica.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

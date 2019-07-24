import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { VistaAdminComponent } from './vista-admin.component';
import { VistaAdminService } from './vista-admin.service';
import { UploadPopupComponent } from './vista-admin-upload.component';

@Injectable({ providedIn: 'root' })
export class VistaAdminResolve {
    constructor(private service: VistaAdminService) {}
}

export const vistadminRoute: Routes = [
    {
        path: 'admintorga',
        component: VistaAdminComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'torgaPedidosApp.admin.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const adminPopupRoute: Routes = [
    {
        path: 'admintorga/upload',
        component: UploadPopupComponent,

        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'torgaPedidosApp.admin.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

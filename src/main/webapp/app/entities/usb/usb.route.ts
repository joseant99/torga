import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Usb } from 'app/shared/model/usb.model';
import { UsbService } from './usb.service';
import { UsbComponent } from './usb.component';
import { UsbDetailComponent } from './usb-detail.component';
import { UsbUpdateComponent } from './usb-update.component';
import { UsbDeletePopupComponent } from './usb-delete-dialog.component';
import { IUsb } from 'app/shared/model/usb.model';

@Injectable({ providedIn: 'root' })
export class UsbResolve implements Resolve<IUsb> {
    constructor(private service: UsbService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Usb> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Usb>) => response.ok),
                map((usb: HttpResponse<Usb>) => usb.body)
            );
        }
        return of(new Usb());
    }
}

export const usbRoute: Routes = [
    {
        path: 'usb',
        component: UsbComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.usb.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'usb/:id/view',
        component: UsbDetailComponent,
        resolve: {
            usb: UsbResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.usb.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'usb/new',
        component: UsbUpdateComponent,
        resolve: {
            usb: UsbResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.usb.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'usb/:id/edit',
        component: UsbUpdateComponent,
        resolve: {
            usb: UsbResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.usb.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const usbPopupRoute: Routes = [
    {
        path: 'usb/:id/delete',
        component: UsbDeletePopupComponent,
        resolve: {
            usb: UsbResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.usb.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

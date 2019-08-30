import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import { TorgaPedidosAdminModule } from 'app/admin/admin.module';
import {
    VendedoresComponent,
    VendedoresUsuarioComponent,
    VendedoresDetailComponent,
    VendedoresUpdateComponent,
    VendedoresDeletePopupComponent,
    VendedoresDeleteDialogComponent,
    vendedoresRoute,
    vendedoresPopupRoute
} from './';

const ENTITY_STATES = [...vendedoresRoute, ...vendedoresPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, TorgaPedidosAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        VendedoresComponent,
        VendedoresUsuarioComponent,
        VendedoresDetailComponent,
        VendedoresUpdateComponent,
        VendedoresDeleteDialogComponent,
        VendedoresDeletePopupComponent
    ],
    entryComponents: [VendedoresComponent, VendedoresUpdateComponent, VendedoresDeleteDialogComponent, VendedoresDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosVendedoresModule {}

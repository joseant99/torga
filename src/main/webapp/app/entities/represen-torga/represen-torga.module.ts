import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import { TorgaPedidosAdminModule } from 'app/admin/admin.module';
import {
    RepresenTorgaComponent,
    RepresenTorgaDetailComponent,
    RepresenTorgaUpdateComponent,
    RepresenTorgaDeletePopupComponent,
    RepresenTorgaDeleteDialogComponent,
    represenTorgaRoute,
    represenTorgaPopupRoute
} from './';

const ENTITY_STATES = [...represenTorgaRoute, ...represenTorgaPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, TorgaPedidosAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RepresenTorgaComponent,
        RepresenTorgaDetailComponent,
        RepresenTorgaUpdateComponent,
        RepresenTorgaDeleteDialogComponent,
        RepresenTorgaDeletePopupComponent
    ],
    entryComponents: [
        RepresenTorgaComponent,
        RepresenTorgaUpdateComponent,
        RepresenTorgaDeleteDialogComponent,
        RepresenTorgaDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosRepresenTorgaModule {}

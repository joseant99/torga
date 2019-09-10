import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import { TorgaPedidosAdminModule } from 'app/admin/admin.module';
import {
    MensajesComponent,
    MensajesDetailComponent,
    MensajesUpdateComponent,
    MensajesDeletePopupComponent,
    MensajesDeleteDialogComponent,
    mensajesRoute,
    mensajesPopupRoute
} from './';

const ENTITY_STATES = [...mensajesRoute, ...mensajesPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, TorgaPedidosAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MensajesComponent,
        MensajesDetailComponent,
        MensajesUpdateComponent,
        MensajesDeleteDialogComponent,
        MensajesDeletePopupComponent
    ],
    entryComponents: [MensajesComponent, MensajesUpdateComponent, MensajesDeleteDialogComponent, MensajesDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosMensajesModule {}

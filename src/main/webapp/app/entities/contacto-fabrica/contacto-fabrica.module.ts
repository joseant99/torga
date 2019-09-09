import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import { TorgaPedidosAdminModule } from 'app/admin/admin.module';
import {
    ContactoFabricaComponent,
    ContactoChatComponent,
    ContactoFabricaClientesComponent,
    ContactoFabricaDetailComponent,
    ContactoFabricaUpdateComponent,
    ContactoFabricaDeletePopupComponent,
    ContactoFabricaDeleteDialogComponent,
    contactoFabricaRoute,
    contactoFabricaPopupRoute
} from './';

const ENTITY_STATES = [...contactoFabricaRoute, ...contactoFabricaPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, TorgaPedidosAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ContactoFabricaComponent,
        ContactoChatComponent,
        ContactoFabricaClientesComponent,
        ContactoFabricaDetailComponent,
        ContactoFabricaUpdateComponent,
        ContactoFabricaDeleteDialogComponent,
        ContactoFabricaDeletePopupComponent
    ],
    entryComponents: [
        ContactoFabricaComponent,
        ContactoFabricaClientesComponent,
        ContactoChatComponent,
        ContactoFabricaUpdateComponent,
        ContactoFabricaDeleteDialogComponent,
        ContactoFabricaDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosContactoFabricaModule {}

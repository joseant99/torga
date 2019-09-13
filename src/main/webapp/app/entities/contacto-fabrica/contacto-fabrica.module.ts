import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import { TorgaPedidosAdminModule } from 'app/admin/admin.module';
import {
    ContactoFabricaComponent,
    ContactoChatComponent,
    ContactoSugerenciasComponent,
    ContactoProyectosComponent,
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
        ContactoFabricaDetailComponent,
        ContactoSugerenciasComponent,
        ContactoProyectosComponent,
        ContactoFabricaUpdateComponent,
        ContactoFabricaClientesComponent,
        ContactoChatComponent,
        ContactoFabricaDeleteDialogComponent,
        ContactoFabricaDeletePopupComponent
    ],
    entryComponents: [
        ContactoFabricaComponent,
        ContactoFabricaUpdateComponent,
        ContactoSugerenciasComponent,
        ContactoProyectosComponent,
        ContactoFabricaDeleteDialogComponent,
        ContactoChatComponent,
        ContactoFabricaClientesComponent,
        ContactoFabricaDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosContactoFabricaModule {}

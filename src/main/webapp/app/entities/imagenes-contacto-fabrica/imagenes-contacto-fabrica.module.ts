import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import { TorgaPedidosAdminModule } from 'app/admin/admin.module';
import {
    ImagenesContactoFabricaComponent,
    ImagenesContactoFabricaDetailComponent,
    ImagenesContactoFabricaUpdateComponent,
    ImagenesContactoFabricaDeletePopupComponent,
    ImagenesContactoFabricaDeleteDialogComponent,
    imagenesContactoFabricaRoute,
    imagenesContactoFabricaPopupRoute
} from './';

const ENTITY_STATES = [...imagenesContactoFabricaRoute, ...imagenesContactoFabricaPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, TorgaPedidosAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ImagenesContactoFabricaComponent,
        ImagenesContactoFabricaDetailComponent,
        ImagenesContactoFabricaUpdateComponent,
        ImagenesContactoFabricaDeleteDialogComponent,
        ImagenesContactoFabricaDeletePopupComponent
    ],
    entryComponents: [
        ImagenesContactoFabricaComponent,
        ImagenesContactoFabricaUpdateComponent,
        ImagenesContactoFabricaDeleteDialogComponent,
        ImagenesContactoFabricaDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosImagenesContactoFabricaModule {}

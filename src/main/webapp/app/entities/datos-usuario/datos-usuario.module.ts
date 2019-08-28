import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import { TorgaPedidosAdminModule } from 'app/admin/admin.module';
import {
    DatosUsuarioComponent,
    DatosGeneralesComponent,
    DatosUsuarioDetailComponent,
    DatosUsuarioUpdateComponent,
    DatosUsuarioDeletePopupComponent,
    DatosUsuarioDeleteDialogComponent,
    datosUsuarioRoute,
    datosUsuarioPopupRoute
} from './';

const ENTITY_STATES = [...datosUsuarioRoute, ...datosUsuarioPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, TorgaPedidosAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DatosUsuarioComponent,
        DatosUsuarioDetailComponent,
        DatosGeneralesComponent,
        DatosUsuarioUpdateComponent,
        DatosUsuarioDeleteDialogComponent,
        DatosUsuarioDeletePopupComponent
    ],
    entryComponents: [
        DatosUsuarioComponent,
        DatosUsuarioUpdateComponent,
        DatosGeneralesComponent,
        DatosUsuarioDeleteDialogComponent,
        DatosUsuarioDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosDatosUsuarioModule {}

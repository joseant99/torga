import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    DatosClienteComponent,
    DatosClienteDetailComponent,
    DatosClienteUpdateComponent,
    DatosClienteDeletePopupComponent,
    DatosClienteDeleteDialogComponent,
    datosClienteRoute,
    datosClientePopupRoute
} from './';

const ENTITY_STATES = [...datosClienteRoute, ...datosClientePopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DatosClienteComponent,
        DatosClienteDetailComponent,
        DatosClienteUpdateComponent,
        DatosClienteDeleteDialogComponent,
        DatosClienteDeletePopupComponent
    ],
    entryComponents: [
        DatosClienteComponent,
        DatosClienteUpdateComponent,
        DatosClienteDeleteDialogComponent,
        DatosClienteDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosDatosClienteModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    PagosTorgaTiendasComponent,
    PagosTorgaTiendasDetailComponent,
    PagosTorgaTiendasUpdateComponent,
    PagosTorgaTiendasDeletePopupComponent,
    PagosTorgaTiendasDeleteDialogComponent,
    pagosTorgaTiendasRoute,
    pagosTorgaTiendasPopupRoute
} from './';

const ENTITY_STATES = [...pagosTorgaTiendasRoute, ...pagosTorgaTiendasPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PagosTorgaTiendasComponent,
        PagosTorgaTiendasDetailComponent,
        PagosTorgaTiendasUpdateComponent,
        PagosTorgaTiendasDeleteDialogComponent,
        PagosTorgaTiendasDeletePopupComponent
    ],
    entryComponents: [
        PagosTorgaTiendasComponent,
        PagosTorgaTiendasUpdateComponent,
        PagosTorgaTiendasDeleteDialogComponent,
        PagosTorgaTiendasDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosPagosTorgaTiendasModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    PrecioFinalPresuComponent,
    PrecioFinalPresuDetailComponent,
    PrecioFinalPresuUpdateComponent,
    PrecioFinalPresuDeletePopupComponent,
    PrecioFinalPresuDeleteDialogComponent,
    precioFinalPresuRoute,
    precioFinalPresuPopupRoute
} from './';

const ENTITY_STATES = [...precioFinalPresuRoute, ...precioFinalPresuPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PrecioFinalPresuComponent,
        PrecioFinalPresuDetailComponent,
        PrecioFinalPresuUpdateComponent,
        PrecioFinalPresuDeleteDialogComponent,
        PrecioFinalPresuDeletePopupComponent
    ],
    entryComponents: [
        PrecioFinalPresuComponent,
        PrecioFinalPresuUpdateComponent,
        PrecioFinalPresuDeleteDialogComponent,
        PrecioFinalPresuDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosPrecioFinalPresuModule {}

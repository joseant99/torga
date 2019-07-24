import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    DimensionesProductoComponent,
    DimensionesProductoDetailComponent,
    DimensionesProductoUpdateComponent,
    DimensionesProductoDeletePopupComponent,
    DimensionesProductoDeleteDialogComponent,
    dimensionesProductoRoute,
    dimensionesProductoPopupRoute
} from './';

const ENTITY_STATES = [...dimensionesProductoRoute, ...dimensionesProductoPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DimensionesProductoComponent,
        DimensionesProductoDetailComponent,
        DimensionesProductoUpdateComponent,
        DimensionesProductoDeleteDialogComponent,
        DimensionesProductoDeletePopupComponent
    ],
    entryComponents: [
        DimensionesProductoComponent,
        DimensionesProductoUpdateComponent,
        DimensionesProductoDeleteDialogComponent,
        DimensionesProductoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosDimensionesProductoModule {}

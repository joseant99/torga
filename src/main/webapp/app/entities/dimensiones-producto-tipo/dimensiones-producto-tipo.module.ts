import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    DimensionesProductoTipoComponent,
    DimensionesProductoTipoDetailComponent,
    DimensionesProductoTipoUpdateComponent,
    DimensionesProductoTipoDeletePopupComponent,
    DimensionesProductoTipoDeleteDialogComponent,
    dimensionesProductoTipoRoute,
    dimensionesProductoTipoPopupRoute
} from './';

const ENTITY_STATES = [...dimensionesProductoTipoRoute, ...dimensionesProductoTipoPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DimensionesProductoTipoComponent,
        DimensionesProductoTipoDetailComponent,
        DimensionesProductoTipoUpdateComponent,
        DimensionesProductoTipoDeleteDialogComponent,
        DimensionesProductoTipoDeletePopupComponent
    ],
    entryComponents: [
        DimensionesProductoTipoComponent,
        DimensionesProductoTipoUpdateComponent,
        DimensionesProductoTipoDeleteDialogComponent,
        DimensionesProductoTipoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosDimensionesProductoTipoModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    TipoProductoComponent,
    TipoProductoDetailComponent,
    TipoProductoUpdateComponent,
    TipoProductoDeletePopupComponent,
    TipoProductoDeleteDialogComponent,
    tipoProductoRoute,
    tipoProductoPopupRoute
} from './';

const ENTITY_STATES = [...tipoProductoRoute, ...tipoProductoPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TipoProductoComponent,
        TipoProductoDetailComponent,
        TipoProductoUpdateComponent,
        TipoProductoDeleteDialogComponent,
        TipoProductoDeletePopupComponent
    ],
    entryComponents: [
        TipoProductoComponent,
        TipoProductoUpdateComponent,
        TipoProductoDeleteDialogComponent,
        TipoProductoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosTipoProductoModule {}

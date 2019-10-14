import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    PrecioTiendaProductosComponent,
    PrecioTiendaProductosDetailComponent,
    PrecioTiendaProductosUpdateComponent,
    PrecioTiendaProductosDeletePopupComponent,
    PrecioTiendaProductosDeleteDialogComponent,
    precioTiendaProductosRoute,
    precioTiendaProductosPopupRoute
} from './';

const ENTITY_STATES = [...precioTiendaProductosRoute, ...precioTiendaProductosPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PrecioTiendaProductosComponent,
        PrecioTiendaProductosDetailComponent,
        PrecioTiendaProductosUpdateComponent,
        PrecioTiendaProductosDeleteDialogComponent,
        PrecioTiendaProductosDeletePopupComponent
    ],
    entryComponents: [
        PrecioTiendaProductosComponent,
        PrecioTiendaProductosUpdateComponent,
        PrecioTiendaProductosDeleteDialogComponent,
        PrecioTiendaProductosDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosPrecioTiendaProductosModule {}
